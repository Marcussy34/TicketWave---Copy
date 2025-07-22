import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardFooter, Image, Chip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import QRCode from 'qrcode';

const TicketCard = ({ ticket }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [qrCodeUrl, setQrCodeUrl] = useState('');

    const handleTicketClick = () => {
        onOpen();
    };

    const isCertificate = ticket.isCertificate || ticket.title.toLowerCase().includes('certificate');

    useEffect(() => {
        const generateQrCode = async () => {
            try {
                const qrData = `tokenId=${ticket.tokenId}`;
                const qrCodeDataUrl = await QRCode.toDataURL(qrData, { width: 200 });
                setQrCodeUrl(qrCodeDataUrl);
            } catch (error) {
                console.error('Error generating QR code', error);
            }
        };

        if (isOpen && !isCertificate) {
            generateQrCode();
        }
    }, [isOpen, ticket.tokenId, isCertificate]);

    return (
        <>
            <Card 
                shadow="sm" 
                isPressable
                onPress={handleTicketClick}
                className="hover:scale-105 transition-transform duration-200"
            >
                <CardBody className="p-0">
                    <Image
                        shadow="sm"
                        radius="lg"
                        width="100%"
                        alt={ticket.title}
                        className="w-full object-cover h-[250px] object-top"
                        src={ticket.image}
                    />
                    {ticket.hasEntered && (
                        <div className="absolute top-2 right-2">
                            <Chip color="success" variant="solid">Attended</Chip>
                        </div>
                    )}
                    {isCertificate && (
                        <div className="absolute top-2 left-2">
                            <Chip color="warning" variant="solid">Certificate</Chip>
                        </div>
                    )}
                </CardBody>
                <CardFooter className="flex-col items-start">
                    <h4 className="font-bold text-large">{ticket.title}</h4>
                    <p className="text-default-500">{ticket.date}</p>
                    <p className="text-default-500 text-small">{ticket.venue}</p>
                    <div className="mt-2 flex gap-2">
                        <Chip color="primary" variant="flat">
                            {isCertificate ? `Certificate#${ticket.tokenId}` : `Ticket#${ticket.tokenId}`}
                        </Chip>
                        <Chip color="secondary" variant="flat">{ticket.seatType}</Chip>
                    </div>
                </CardFooter>
            </Card>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" size={isCertificate ? "lg" : "md"}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                {isCertificate ? "Certificate Details" : "Ticket Details"}
                            </ModalHeader>
                            <ModalBody>
                                <div className="space-y-3">
                                    <h3 className="text-xl font-semibold">{ticket.title}</h3>
                                    <p><strong>Date:</strong> {ticket.date}</p>
                                    <p><strong>Venue:</strong> {ticket.venue}</p>
                                    {!isCertificate && <p><strong>Seat Type:</strong> {ticket.seatType}</p>}
                                    
                                    {isCertificate ? (
                                        <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                                            <div className="text-center space-y-3">
                                                <div className="text-2xl">🏆</div>
                                                <h4 className="text-lg font-semibold text-blue-800">Certificate of Achievement</h4>
                                                <p className="text-gray-700">
                                                    This certificate serves as proof that you have successfully participated in and completed the requirements for:
                                                </p>
                                                <p className="font-semibold text-blue-700">{ticket.title}</p>
                                                {ticket.description && (
                                                    <p className="text-sm text-gray-600 mt-2">
                                                        {ticket.description}
                                                    </p>
                                                )}
                                                <div className="mt-4 pt-4 border-t border-blue-200">
                                                    <p className="text-sm text-gray-600">
                                                        Certificate ID: #{ticket.tokenId}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        Issued on: {ticket.purchaseDate ? ticket.purchaseDate.toLocaleDateString() : ticket.date}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="mt-4 flex justify-center">
                                            {qrCodeUrl && (
                                                <div className="text-center">
                                                    <img src={qrCodeUrl} alt="Ticket QR Code" />
                                                    <p className="text-sm text-gray-500 mt-2">
                                                        Show this QR code at the venue entrance
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default TicketCard;
