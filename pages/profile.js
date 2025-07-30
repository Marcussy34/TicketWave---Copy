import React, { useState } from "react";
import { Tabs, Tab, Skeleton, Card } from "@nextui-org/react";
import { useActiveAccount } from "thirdweb/react";
import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";
import ProfileHeader from "../components/ProfileHeader";
import TicketCard from "../components/TicketCard";
import concertData from "../data/data.json";

const url = "https://api.studio.thegraph.com/query/90400/ticket/version/latest";

const GET_USER_TICKETS = gql`
  query GetUserTickets($buyer: Bytes!) {
    ticketMinteds(where: { buyer: $buyer }) {
      id
      concertId
      buyer
      tokenId
      timestamp
      seatType
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`;

const Portfolio = () => {
  const address = useActiveAccount();

  // Use React Query to fetch tickets from The Graph
  const {
    data: ticketData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userTickets", address?.address],
    queryFn: async () => {
      if (!address?.address) throw new Error("No wallet connected");

      console.log("Fetching tickets for address:", address.address);
      const result = await request(url, GET_USER_TICKETS, {
        buyer: address.address.toLowerCase(),
      });

      console.log("GraphQL response:", result);
      return result;
    },
    enabled: !!address?.address, // Only run query when address is available
    staleTime: 30 * 1000, // Consider data fresh for 30 seconds
  });

  // Process the raw ticket data into the format needed by the UI
  const processedData = React.useMemo(() => {
    if (!ticketData?.ticketMinteds) return { tickets: [], certificates: [] };

    const allItems = ticketData.ticketMinteds
      .map((ticket) => {
        const concertId = parseInt(ticket.concertId);
        const concert = concertData.concerts.find((c) => c.id === concertId);

        if (!concert) {
          console.warn("Concert not found for ID:", concertId);
          return null;
        }

        const isCertificate = concert.title
          .toLowerCase()
          .includes("certificate");

        return {
          tokenId: Number(ticket.tokenId),
          concertId,
          title: concert.title,
          date: concert.date,
          venue: concert.venue.name,
          image: concert.imgCard,
          hasEntered: false, // This would need to be determined by checking TicketScanned events
          purchaseDate: new Date(Number(ticket.timestamp) * 1000),
          seatType: ticket.seatType,
          isCertificate,
          description: concert.description,
        };
      })
      .filter(Boolean); // Remove null entries

    // Sort all items by purchase date (most recent first)
    allItems.sort((a, b) => b.purchaseDate - a.purchaseDate);

    // Separate tickets and certificates (maintaining sort order)
    const tickets = allItems.filter((item) => !item.isCertificate);
    const certificates = allItems.filter((item) => item.isCertificate);

    return { tickets, certificates };
  }, [ticketData]);

  const { tickets, certificates } = processedData;

  console.log("Processed tickets:", tickets);
  console.log("Processed certificates:", certificates);

  if (!address) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Please connect your wallet</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4 text-red-500">
          Error loading tickets
        </h1>
        <p className="text-gray-600">{error.message}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        {/* Skeleton for ProfileHeader */}
        <div className="mb-8">
          <Card className="p-10 space-y-4">
            <div className="flex items-center gap-6">
              <Skeleton className="rounded-full w-24 h-24" />
              <div className="space-y-4 flex-1">
                <Skeleton className="h-4 w-3/5 rounded-lg" />
                <Skeleton className="h-4 w-4/5 rounded-lg" />
              </div>
            </div>
          </Card>
        </div>

        {/* Skeleton for Tabs */}
        <div className="mb-8">
          <Skeleton className="h-12 rounded-lg mb-4 w-full" />

          {/* Skeleton grid for tickets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, index) => (
              <Card key={index} className="space-y-5 p-4">
                <Skeleton className="rounded-lg">
                  <div className="h-40 rounded-lg bg-default-300" />
                </Skeleton>
                <div className="space-y-3">
                  <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-3 rounded-lg bg-default-200" />
                  </Skeleton>
                  <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-3 rounded-lg bg-default-200" />
                  </Skeleton>
                  <Skeleton className="w-2/5 rounded-lg">
                    <div className="h-3 rounded-lg bg-default-200" />
                  </Skeleton>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const upcomingTickets = tickets.filter((ticket) => !ticket.hasEntered);
  const pastTickets = tickets.filter((ticket) => ticket.hasEntered);
  const totalItems = tickets.length + certificates.length;

  return (
    <div className="container mx-auto px-4 py-8">
      <ProfileHeader
        ticketCount={totalItems}
        attendedCount={pastTickets.length}
        address={address?.address}
      />

      <Tabs
        aria-label="Ticket and Certificate Options"
        className="mb-8"
        color="primary"
      >
        <Tab key="all" title={`All Items (${totalItems})`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tickets.map((ticket) => (
              <TicketCard key={`ticket-${ticket.tokenId}`} ticket={ticket} />
            ))}
            {certificates.map((certificate) => (
              <TicketCard
                key={`cert-${certificate.tokenId}`}
                ticket={certificate}
              />
            ))}
          </div>
        </Tab>
        <Tab key="tickets" title={`Tickets (${tickets.length})`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tickets.map((ticket) => (
              <TicketCard key={ticket.tokenId} ticket={ticket} />
            ))}
          </div>
        </Tab>
        <Tab key="certificates" title={`Certificates (${certificates.length})`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {certificates.map((certificate) => (
              <TicketCard key={certificate.tokenId} ticket={certificate} />
            ))}
          </div>
        </Tab>
        <Tab
          key="upcoming"
          title={`Upcoming Events (${upcomingTickets.length})`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {upcomingTickets.map((ticket) => (
              <TicketCard key={ticket.tokenId} ticket={ticket} />
            ))}
          </div>
        </Tab>
        <Tab key="past" title={`Past Events (${pastTickets.length})`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pastTickets.map((ticket) => (
              <TicketCard key={ticket.tokenId} ticket={ticket} />
            ))}
          </div>
        </Tab>
      </Tabs>

      {totalItems === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">
            No tickets or certificates found
          </h3>
          <p className="text-default-500">
            You haven&apos;t purchased any tickets or earned any certificates
            yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
