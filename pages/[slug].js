import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Card,
  CardBody,
  Image,
  Button,
  Chip,
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import {
  IoCalendarOutline,
  IoLocationOutline,
  IoTimeOutline,
  IoPeopleOutline,
} from "react-icons/io5";
import concertData from "../data/data.json";
import studentsData from "../data/students.json";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { contract } from "../utils/client";
import { useActiveAccount } from "thirdweb/react";
import { useReadContract } from "thirdweb/react";
import { collection, addDoc, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import ReactMarkdown from "react-markdown";
import { FaDownload } from "react-icons/fa";

const DetailsPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const id = slug ? parseInt(slug.split("-").pop()) : null;
  const wallet = useActiveAccount();
  const [selectedTicketType, setSelectedTicketType] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [concert, setConcert] = useState(null);
  const { mutate: sendTransaction } = useSendTransaction();
  const {
    isOpen: isPurchaseOpen,
    onOpen: onPurchaseOpen,
    onClose: onPurchaseClose,
  } = useDisclosure();
  const [transactionStatus, setTransactionStatus] = useState("pending");
  const [isConfirming, setIsConfirming] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    name: "",
    university: "",
  });

  // Helper function to check if event is a certificate
  const isCertificate =
    concert?.title.toLowerCase().includes("certificate") || false;
  const { data: ticketData, isPending } = useReadContract({
    contract,
    method:
      "function getConcertDetails(uint256 concertId) view returns (uint256 totalCapacity, uint256 ticketsSold)",
    params: [Number(id)],
  });
  const [hasTicket, setHasTicket] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        setDeferredPrompt(e);
      });
    }
  }, []);

  // Monitor wallet connection
  useEffect(() => {
    if (wallet) {
      console.log("Wallet connected:", wallet.address);
    }
  }, [wallet]);

  // Load concert data
  useEffect(() => {
    if (id) {
      const foundConcert = concertData.concerts.find(
        (c) => c.id === Number(id)
      );
      setConcert(foundConcert);
    }
  }, [id]);

  // Calculate tickets remaining
  const ticketsIssued = ticketData ? Number(ticketData[0]) : 0;
  const ticketsSold = ticketData ? Number(ticketData[1]) : 0;
  const ticketsRemaining = ticketsIssued - ticketsSold;

  // Add new useEffect to check for existing ticket
  useEffect(() => {
    const checkExistingTicket = async () => {
      if (wallet?.address && id) {
        try {
          const docRef = doc(db, "purchases", wallet.address);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            // Check if user has tickets array and if this event exists in it
            if (data.tickets && Array.isArray(data.tickets)) {
              const hasTicketForEvent = data.tickets.some(
                (ticket) => ticket.event.id === Number(id)
              );
              setHasTicket(false); // We're allowing multiple tickets now
            }
          }
        } catch (error) {
          console.error("Error checking existing ticket:", error);
        }
      }
    };

    checkExistingTicket();
  }, [wallet?.address, id, shouldRefresh]);

  const handleBuyTickets = async () => {
    if (!wallet?.address) {
      return;
    }

    if (!selectedTicketType || !id || !concert) return;

    // For events 8, 9, and 12, skip the modal and go directly to purchase
    if ([8, 9, 12].includes(Number(id))) {
      await directPurchase();
    } else {
      onPurchaseOpen();
    }
  };

  // Direct purchase function for events that don't require user details
  const directPurchase = async () => {
    try {
      setIsConfirming(true);
      setTransactionStatus("loading");
      const seatTypeFormatted =
        selectedTicketType.charAt(0).toUpperCase() +
        selectedTicketType.slice(1);

      // Handle blockchain transaction
      const transaction = prepareContractCall({
        contract,
        method:
          "function purchaseTicket(uint256 concertId, string imageURI, string seatType)",
        params: [Number(id), concert.imgCard, seatTypeFormatted],
      });

      let transactionHash = null;

      await sendTransaction(transaction, {
        onSubmitted: (hash) => {
          setTransactionStatus("loading");
          transactionHash = hash;
        },
        onSuccess: async (result) => {
          // Store in Firebase without user details for these events
          try {
            const docRef = doc(db, "purchases", wallet.address);
            const docSnap = await getDoc(docRef);

            let existingData = docSnap.exists()
              ? docSnap.data()
              : { tickets: [] };

            const newTicket = {
              timestamp: new Date(),
              user: {
                email: "N/A",
                name: "N/A",
                university: "N/A",
                walletAddress: wallet.address,
              },
              event: {
                id: Number(id),
                name: concert.title,
                ticketType: seatTypeFormatted,
                price: concert.price[selectedTicketType],
                venue: concert.venue.name,
                date: concert.date,
                time: concert.time,
              },
              status: "completed",
              transactionHash: transactionHash,
            };

            await setDoc(
              doc(db, "purchases", wallet.address),
              {
                tickets: [...(existingData.tickets || []), newTicket],
              },
              { merge: true }
            );

            console.log("Purchase document updated with new ticket");
            setTransactionStatus("success");
            setIsConfirming(false);
            setShouldRefresh((prev) => !prev);
            onPurchaseOpen(); // Show success modal
          } catch (firebaseError) {
            console.error("Failed to store purchase data:", firebaseError);
            setTransactionStatus("success");
            setIsConfirming(false);
            onPurchaseOpen(); // Show success modal even if Firebase fails
          }
        },
        onError: (error) => {
          console.error("Blockchain transaction failed:", error);
          setTransactionStatus("error");
          setIsConfirming(false);
          onPurchaseOpen(); // Show error modal
        },
      });
    } catch (error) {
      console.error("Transaction failed:", error);
      setTransactionStatus("error");
      setIsConfirming(false);
      onPurchaseOpen(); // Show error modal
    }
  };

  // Add email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Add student validation function
  const isValidStudent = (email, name, university) => {
    // For events 8, 9, and 12, skip name checking
    const skipNameCheck = [8, 9, 12].includes(Number(id));

    return studentsData.students.some((student) => {
      const emailMatch = student.email.toLowerCase() === email.toLowerCase();
      const universityMatch =
        student.university.toLowerCase() === university.toLowerCase();
      const nameMatch = student.name.toLowerCase() === name.toLowerCase();

      if (skipNameCheck) {
        return emailMatch && universityMatch;
      } else {
        return emailMatch && nameMatch && universityMatch;
      }
    });
  };

  const confirmPurchase = async () => {
    // Add validation checks
    if (!userInfo.email || !userInfo.name || !userInfo.university) {
      alert("Please fill in all fields");
      return;
    }

    // Validate email format
    if (!isValidEmail(userInfo.email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Validate student details against database
    if (!isValidStudent(userInfo.email, userInfo.name, userInfo.university)) {
      alert(
        "Your details do not match our student database. Please ensure your email, name, and university are correct and that you are registered as a student."
      );
      return;
    }

    // Check if wallet is connected
    if (!wallet?.address) {
      console.error("No wallet connected");
      setTransactionStatus("error");
      return;
    }

    try {
      setIsConfirming(true);
      setTransactionStatus("pending");
      const seatTypeFormatted =
        selectedTicketType.charAt(0).toUpperCase() +
        selectedTicketType.slice(1);

      // First handle blockchain transaction
      const transaction = prepareContractCall({
        contract,
        method:
          "function purchaseTicket(uint256 concertId, string imageURI, string seatType)",
        params: [Number(id), concert.imgCard, seatTypeFormatted],
      });

      let transactionHash = null;

      await sendTransaction(transaction, {
        onSubmitted: (hash) => {
          setTransactionStatus("loading");
          transactionHash = hash; // Store the transaction hash
        },
        onSuccess: async (result) => {
          // After blockchain transaction succeeds, store in Firebase
          try {
            const docRef = doc(db, "purchases", wallet.address);
            const docSnap = await getDoc(docRef);

            let existingData = docSnap.exists()
              ? docSnap.data()
              : { tickets: [] };

            // Add new ticket to the tickets array
            const newTicket = {
              timestamp: new Date(),
              user: {
                email: userInfo.email,
                name: userInfo.name,
                university: userInfo.university,
                walletAddress: wallet.address,
              },
              event: {
                id: Number(id),
                name: concert.title,
                ticketType: seatTypeFormatted,
                price: concert.price[selectedTicketType],
                venue: concert.venue.name,
                date: concert.date,
                time: concert.time,
              },
              status: "completed",
              transactionHash: transactionHash,
            };

            // Update the document with the new ticket
            await setDoc(
              doc(db, "purchases", wallet.address),
              {
                tickets: [...(existingData.tickets || []), newTicket],
              },
              { merge: true }
            );

            console.log("Purchase document updated with new ticket");
            setTransactionStatus("success");
            setIsConfirming(false);
            setShouldRefresh((prev) => !prev);
          } catch (firebaseError) {
            console.error("Failed to store purchase data:", firebaseError);
            setTransactionStatus("success");
            setIsConfirming(false);
          }
        },
        onError: (error) => {
          console.error("Blockchain transaction failed:", error);
          setTransactionStatus("error");
          setIsConfirming(false);
        },
      });
    } catch (error) {
      console.error("Transaction failed:", error);
      setTransactionStatus("error");
      setIsConfirming(false);
    }
  };

  if (!concert)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* For mobile screens */}
        <div className="md:hidden">
          <div className="relative h-[700px] w-full overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center filter blur-xl scale-110 brightness-50"
              style={{ backgroundImage: `url(${concert.imgCover})` }}
            />
            <div className="absolute inset-0 container mx-auto flex flex-col items-center px-8">
              <div className="relative w-[200px] h-[200px] mt-16 mb-16">
                <Image
                  src={concert.imgCard}
                  alt={concert.title}
                  className="object-contain rounded-xl shadow-2xl"
                  fill
                  sizes="200px"
                  priority
                />
              </div>
              <div className="flex-1 max-w-full text-center mt-20 relative z-10">
                <h1 className="text-4xl font-bold text-white mb-6">
                  {concert.title}
                </h1>
                <div className="flex flex-wrap justify-center gap-4 text-white text-lg">
                  <div className="flex items-center gap-3">
                    <IoCalendarOutline className="text-2xl" />
                    <span>{concert.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <IoTimeOutline className="text-2xl" />
                    <span>{concert.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <IoLocationOutline className="text-2xl" />
                    <span>{concert.venue.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <IoPeopleOutline className="text-2xl" />
                    {isPending ? (
                      <span>Loading ticket info...</span>
                    ) : (
                      <span>
                        Available: {ticketsRemaining.toLocaleString()} /{" "}
                        {ticketsIssued.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
          </div>
        </div>

        {/* For desktop screens */}
        <div className="hidden md:block">
          <div className="relative h-[650px] w-full overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center filter blur-xl scale-110 brightness-50"
              style={{ backgroundImage: `url(${concert.imgCover})` }}
            />
            <div className="absolute inset-0 container mx-auto flex flex-row items-center px-8 -translate-y-12">
              <div className="relative w-[300px] h-[300px] transform -translate-y-8 transition-transform">
                <Image
                  src={concert.imgCard}
                  alt={concert.title}
                  className="object-contain rounded-xl shadow-2xl"
                  fill
                  sizes="300px"
                  priority
                />
              </div>
              <div className="flex-1 ml-12 max-w-[60%] text-left">
                <h1 className="text-6xl font-bold text-white mb-6">
                  {concert.title}
                </h1>
                <div className="flex flex-wrap justify-start gap-6 text-white text-lg">
                  <div className="flex items-center gap-3">
                    <IoCalendarOutline className="text-2xl" />
                    <span>{concert.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <IoTimeOutline className="text-2xl" />
                    <span>{concert.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <IoLocationOutline className="text-2xl" />
                    <span>{concert.venue.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <IoPeopleOutline className="text-2xl" />
                    {isPending ? (
                      <span>Loading ticket info...</span>
                    ) : (
                      <span>
                        Available: {ticketsRemaining.toLocaleString()} /{" "}
                        {ticketsIssued.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardBody className="space-y-4">
                <h2 className="text-2xl font-bold">
                  {isCertificate ? "Certificate Details" : "Event Details"}
                </h2>
                <p className="text-default-700 leading-relaxed">
                  {isCertificate
                    ? `This certificate is awarded for participation in: ${concert.description}`
                    : concert.description}
                </p>
                <Divider />
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Venue Information</h3>
                  <div className="space-y-2">
                    {concert.venue.detailedLocation && (
                      <div>
                        {/* Mobile view - stacked */}
                        <div className="md:hidden space-y-1">
                          <p className="font-semibold">
                            Detailed Location:&nbsp;
                          </p>
                          <p>{concert.venue.detailedLocation}</p>
                        </div>
                        {/* Desktop view - inline */}
                        <div className="hidden md:flex">
                          <p className="font-semibold">
                            Detailed Location:&nbsp;
                          </p>
                          <p>{concert.venue.detailedLocation}</p>
                        </div>
                      </div>
                    )}
                    <div>
                      {/* Mobile view - stacked */}
                      <div className="md:hidden space-y-1">
                        <p className="font-semibold">Address:&nbsp;</p>
                        <p>{concert.venue.address}</p>
                      </div>
                      {/* Desktop view - inline */}
                      <div className="hidden md:flex">
                        <p className="font-semibold">Address:&nbsp;</p>
                        <p>{concert.venue.address}</p>
                      </div>
                    </div>
                    {concert.venue.parking && (
                      <div>
                        {/* Mobile view - stacked */}
                        <div className="md:hidden space-y-1">
                          <p className="font-semibold">Parking:&nbsp;</p>
                          <p>{concert.venue.parking}</p>
                        </div>
                        {/* Desktop view - inline */}
                        <div className="hidden md:flex">
                          <p className="font-semibold">Parking:&nbsp;</p>
                          <p>{concert.venue.parking}</p>
                        </div>
                      </div>
                    )}
                    {concert.venue.howToGetThere && (
                      <div className="space-y-2">
                        <p className="font-semibold">How to get there:</p>
                        <div className="space-y-2">
                          {typeof concert.venue.howToGetThere === "string" ? (
                            <p>{concert.venue.howToGetThere}</p>
                          ) : (
                            <>
                              {concert.venue.howToGetThere.day1 && (
                                <div>
                                  {/* Mobile view - stacked */}
                                  <div className="md:hidden space-y-1">
                                    <p className="font-medium">Day 1:</p>
                                    <p>{concert.venue.howToGetThere.day1}</p>
                                  </div>
                                  {/* Desktop view - inline */}
                                  <div className="hidden md:flex">
                                    <p className="font-medium">Day 1: </p>
                                    <p>{concert.venue.howToGetThere.day1}</p>
                                  </div>
                                </div>
                              )}
                              {concert.venue.howToGetThere.day2 && (
                                <div>
                                  {/* Mobile view - stacked */}
                                  <div className="md:hidden space-y-1">
                                    <p className="font-medium">Day 2:</p>
                                    <p>{concert.venue.howToGetThere.day2}</p>
                                  </div>
                                  {/* Desktop view - inline */}
                                  <div className="hidden md:flex">
                                    <p className="font-medium">Day 2: </p>
                                    <p>{concert.venue.howToGetThere.day2}</p>
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <Divider />
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">
                    {isCertificate
                      ? "Issued by"
                      : concert.organisers
                      ? "Organizers"
                      : "Featured Artists"}
                  </h3>
                  {concert.organisers ? (
                    // Organizers display with images in 3-column grid
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {concert.organisers.map((organiser, index) => (
                        <div
                          key={organiser}
                          className="flex flex-col items-center p-6 rounded-lg bg-content2 shadow-sm"
                        >
                          <div className="relative w-[250px] h-[250px] flex items-center justify-center">
                            <Image
                              src={concert.organisersImage[index]}
                              alt={organiser}
                              className="object-contain"
                              fill
                              sizes="250px"
                              style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                padding: "20px",
                              }}
                            />
                          </div>
                          <span className="text-sm font-medium text-center mt-2">
                            {organiser}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    // Original artists display
                    <div className="flex flex-wrap gap-2">
                      {concert.artists.map((artist) => (
                        <Chip
                          key={artist}
                          color="primary"
                          variant="flat"
                          className="text-sm"
                        >
                          {artist}
                        </Chip>
                      ))}
                    </div>
                  )}
                </div>

                {/* Sponsors Section */}
                {concert.sponsors && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Sponsors</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {concert.sponsors.map((sponsor, index) => (
                        <div
                          key={sponsor}
                          className="flex flex-col items-center p-6 rounded-lg bg-content2 shadow-sm"
                        >
                          <div className="relative w-[250px] h-[250px] flex items-center justify-center">
                            <Image
                              src={concert.sponsorsImage[index]}
                              alt={sponsor}
                              className="object-contain"
                              fill
                              sizes="250px"
                              style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                padding: "20px",
                              }}
                            />
                          </div>
                          <span className="text-sm font-medium text-center mt-2">
                            {sponsor}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Partnerships Section */}
                {concert.partnerships && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Partnerships</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {concert.partnerships.map((partnership, index) => (
                        <div
                          key={partnership}
                          className="flex flex-col items-center p-4 rounded-lg bg-content2 shadow-sm"
                        >
                          <div className="relative w-[200px] h-[200px] md:w-full md:h-full mb-4">
                            <Image
                              src={concert.partnershipsImage[index]}
                              alt={partnership}
                              className="object-contain"
                              fill
                              sizes="(max-width: 768px) 200px, 33vw"
                              style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                margin: "auto",
                              }}
                            />
                          </div>
                          <span className="text-sm font-medium text-center">
                            {partnership}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <h3 className="text-xl font-semibold mb-4">
                  Additional Information
                </h3>
                <div className="text-default-600 prose prose-sm max-w-none">
                  <ReactMarkdown
                    components={{
                      // Style for bullet points
                      ul: ({ node, ...props }) => (
                        <ul
                          className="list-disc pl-4 space-y-2 mb-4"
                          {...props}
                        />
                      ),
                      // Style for list items
                      li: ({ node, ...props }) => (
                        <li className="text-default-600" {...props} />
                      ),
                      // Style for paragraphs
                      p: ({ node, ...props }) => (
                        <p className="mb-4" {...props} />
                      ),
                      // Style for bold text
                      strong: ({ node, ...props }) => (
                        <strong className="font-semibold" {...props} />
                      ),
                    }}
                  >
                    {isCertificate
                      ? concert.additionalInfo
                          .replace(
                            /Please buy tickets and/gi,
                            "You can claim certificate if you have participated in the event."
                          )
                          .replace(
                            /scan on entry/gi,
                            "You can then access the certificate in your profile"
                          )
                          .replace(/Entry is free./gi, "")
                      : concert.additionalInfo}
                  </ReactMarkdown>
                </div>
              </CardBody>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="sticky top-4">
              <CardBody className="space-y-6">
                <h2 className="text-2xl font-bold">
                  {isCertificate ? "Claim Certificate" : "Select Tickets"}
                </h2>
                <div className="space-y-4">
                  {Object.entries(concert.price).map(([type, price]) => (
                    <div
                      key={type}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedTicketType === type
                          ? "border-primary bg-primary/10"
                          : "border-default-200 hover:border-primary"
                      }`}
                      onClick={() => setSelectedTicketType(type)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold capitalize">{type}</h3>
                          <p className="text-small text-default-500">
                            {isCertificate
                              ? "Limited to 1 certificate per person"
                              : "Limited to 1 ticket per person"}
                          </p>
                        </div>
                        <p className="font-bold text-large">
                          {price === 0 ? "Free" : `$${price.toFixed(2)}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  color="primary"
                  size="lg"
                  className={`w-full ${
                    !selectedTicketType ||
                    !wallet?.address ||
                    ticketsRemaining <= 0
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={
                    !selectedTicketType ||
                    !wallet?.address ||
                    ticketsRemaining <= 0 ||
                    isConfirming
                  }
                  isLoading={isConfirming && [8, 9, 12].includes(Number(id))}
                  onClick={handleBuyTickets}
                >
                  {ticketsRemaining <= 0
                    ? isCertificate
                      ? "Certificate Unavailable"
                      : "Sold Out"
                    : !wallet?.address
                    ? isCertificate
                      ? "Sign in first before claiming certificate"
                      : "Sign in first before buying tickets"
                    : isConfirming && [8, 9, 12].includes(Number(id))
                    ? "Processing Transaction..."
                    : selectedTicketType
                    ? isCertificate
                      ? "Claim Certificate"
                      : "Buy Ticket"
                    : isCertificate
                    ? "Select Certificate Type"
                    : "Select a Ticket Type"}
                </Button>

                <p className="text-tiny text-default-500 text-center">
                  {isCertificate
                    ? "By claiming this certificate, you agree to our Terms of Service"
                    : "By purchasing tickets, you agree to our Terms of Service"}
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isPurchaseOpen}
        onClose={onPurchaseClose}
        isDismissable={!isConfirming} // Prevent closing when confirming
        hideCloseButton={isConfirming} // Hide the X button when confirming
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {transactionStatus === "pending"
                  ? isCertificate
                    ? "Claim Certificate"
                    : "Complete Purchase"
                  : transactionStatus === "success"
                  ? isCertificate
                    ? "Certificate Claimed!"
                    : "Purchase Successful!"
                  : isCertificate
                  ? "Certificate Claim Failed"
                  : "Purchase Failed"}
              </ModalHeader>
              <ModalBody>
                {transactionStatus === "pending" && (
                  <>
                    <p className="mb-4">
                      {isCertificate
                        ? "You are about to claim:"
                        : "You are about to purchase:"}
                    </p>
                    <div className="p-4 bg-default-100 rounded-lg mb-4">
                      <p className="font-semibold">{concert.title}</p>
                      <p>
                        {isCertificate ? "Certificate Type" : "Ticket Type"}:{" "}
                        {selectedTicketType?.charAt(0).toUpperCase() +
                          selectedTicketType?.slice(1)}
                      </p>
                      <p>
                        Price:{" "}
                        {concert.price[selectedTicketType] === 0
                          ? "Free"
                          : `$${concert.price[selectedTicketType].toFixed(2)}`}
                      </p>
                    </div>

                    {/* Only show user input form for events that are NOT 8, 9, or 12 */}
                    {![8, 9, 12].includes(Number(id)) && (
                      <>
                        <div className="space-y-4">
                          <input
                            type="email"
                            placeholder="Email"
                            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-primary ${
                              userInfo.email && !isValidEmail(userInfo.email)
                                ? "border-danger text-danger"
                                : "border-default-200"
                            }`}
                            value={userInfo.email}
                            onChange={(e) =>
                              setUserInfo((prev) => ({
                                ...prev,
                                email: e.target.value,
                              }))
                            }
                          />
                          <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full px-4 py-2 rounded-lg border border-default-200 focus:outline-none focus:border-primary"
                            value={userInfo.name}
                            onChange={(e) =>
                              setUserInfo((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                          />
                          <input
                            type="text"
                            placeholder="University/Workspace"
                            className="w-full px-4 py-2 rounded-lg border border-default-200 focus:outline-none focus:border-primary"
                            value={userInfo.university}
                            onChange={(e) =>
                              setUserInfo((prev) => ({
                                ...prev,
                                university: e.target.value,
                              }))
                            }
                          />

                          {/* Validation Status */}
                          {userInfo.email &&
                            userInfo.name &&
                            userInfo.university && (
                              <div
                                className={`p-3 rounded-lg text-sm ${
                                  isValidStudent(
                                    userInfo.email,
                                    userInfo.name,
                                    userInfo.university
                                  )
                                    ? "bg-success/10 text-success border border-success/20"
                                    : "bg-warning/10 text-warning border border-warning/20"
                                }`}
                              >
                                {isValidStudent(
                                  userInfo.email,
                                  userInfo.name,
                                  userInfo.university
                                )
                                  ? "✅ Student details verified"
                                  : "⚠️ Student details not found in database"}
                              </div>
                            )}

                          {/* Helper Text */}
                          <div className="bg-default-50 p-3 rounded-lg text-sm text-default-600">
                            <p className="font-medium mb-1">
                              📝 Student Verification Required
                            </p>
                            <p>
                              Your email
                              {[8, 9, 12].includes(Number(id))
                                ? ""
                                : ", name,"}{" "}
                              and university must match our student database to
                              {isCertificate
                                ? " claim this certificate"
                                : " purchase tickets"}
                              . Please ensure all details are entered exactly as
                              registered.
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
                {transactionStatus === "success" && (
                  <div className="text-center px-4 py-6">
                    <div className="mb-6">
                      <span className="text-4xl animate-bounce inline-block">
                        {isCertificate ? "🏆" : "🎊"}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">
                      {isCertificate
                        ? "Certificate Claimed!"
                        : "Purchase Successful!"}
                    </h3>
                    <p className="text-xl mb-6">
                      {isCertificate
                        ? "Your certificate has been claimed successfully!"
                        : "Your ticket has been purchased successfully!"}
                    </p>
                    <div className="space-y-4 text-default-600">
                      <p className="text-medium">
                        {isCertificate
                          ? "You can view your certificate in your profile"
                          : "You can view your ticket in your profile"}
                      </p>
                      <div className="bg-default-50 p-4 rounded-lg text-sm leading-relaxed mb-4">
                        {isCertificate
                          ? "Your certificate is now available in your profile. You can download and share your achievement certificate at any time."
                          : "Log in to Ticketwave in browser during the event to scan your ticket for entry. Additionally, you can download ticketwave app to scan your ticket for entry for more easier access."}
                      </div>

                      {/* Download App Button */}
                      <Button
                        onClick={async () => {
                          if (deferredPrompt) {
                            deferredPrompt.prompt();
                            await deferredPrompt.userChoice;
                            setDeferredPrompt(null);
                          }
                        }}
                        className="bg-primary text-white hover:bg-primary/90 w-full"
                        startContent={<FaDownload />}
                        isDisabled={!deferredPrompt}
                      >
                        Download App
                      </Button>
                    </div>
                  </div>
                )}
                {transactionStatus === "error" && (
                  <div className="text-center text-danger">
                    <p>
                      {isCertificate
                        ? "Something went wrong with claiming your certificate."
                        : "Something went wrong with your purchase."}
                    </p>
                    <p className="text-small mt-2">Please try again later.</p>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                {transactionStatus === "pending" &&
                  ![8, 9, 12].includes(Number(id)) && (
                    <Button
                      color="primary"
                      onPress={confirmPurchase}
                      isLoading={isConfirming}
                      disabled={isConfirming}
                      className="w-full"
                    >
                      {isConfirming
                        ? "Processing Transaction..."
                        : isCertificate
                        ? "Confirm Claim"
                        : "Confirm Purchase"}
                    </Button>
                  )}
                {(transactionStatus === "success" ||
                  transactionStatus === "error") && (
                  <Button color="primary" onPress={onClose}>
                    Close
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DetailsPage;
