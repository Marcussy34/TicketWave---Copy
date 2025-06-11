import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardFooter, Image, Chip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import QRCode from 'qrcode';

const TicketCard = ({ ticket }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [qrCodeUrl, setQrCodeUrl] = useState('');

    const handleTicketClick = () => {
        onOpen();
    };

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

        if (isOpen) {
            generateQrCode();
        }
    }, [isOpen, ticket.tokenId]);

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
                </CardBody>
                <CardFooter className="flex-col items-start">
                    <h4 className="font-bold text-large">{ticket.title}</h4>
                    <p className="text-default-500">{ticket.date}</p>
                    <p className="text-default-500 text-small">{ticket.venue}</p>
                    <div className="mt-2 flex gap-2">
                        <Chip color="primary" variant="flat">Ticket#{ticket.tokenId}</Chip>
                        <Chip color="secondary" variant="flat">{ticket.seatType}</Chip>
                    </div>
                </CardFooter>
            </Card>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Ticket Details</ModalHeader>
                            <ModalBody>
                                <p>{ticket.title}</p>
                                <p>Date: {ticket.date}</p>
                                <p>Venue: {ticket.venue}</p>
                                <p>Seat Type: {ticket.seatType}</p>
                                <div className="mt-4 flex justify-center">
                                    {qrCodeUrl && (
                                        <img src={qrCodeUrl} alt="Ticket QR Code" />
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
