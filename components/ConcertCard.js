import React from "react";
import { useRouter } from "next/router";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Button,
  Chip,
} from "@nextui-org/react";
import concertData from "../data/data.json";

const UpcomingEvents = ({ concertIds }) => {
  const router = useRouter();
  const eventData =
    concertIds && !concertIds.includes(-1)
      ? concertIds
          .map((id) =>
            concertData.concerts.find((concert) => concert.id === id)
          )
          .filter(Boolean)
      : concertData.concerts;

  const getEventSlug = (title, id) => {
    return `/${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${id}`;
  };

  const handleEventClick = (event) => {
    const slug = getEventSlug(event.title, event.id);
    router.push(slug);
  };

  // Check if event is a certificate
  const isCertificate = (event) => {
    return event.title.toLowerCase().includes("certificate");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Upcoming Events</h2>
        <div className="flex gap-4">
          {/* <Button color="default" variant="flat">
                        Concerts
                    </Button>
                    <Button color="default" variant="flat">
                        Sports
                    </Button>
                    <Button color="default" variant="flat">
                        Festivals
                    </Button> */}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ml-5">
        {eventData.map((event) => (
          <Card
            shadow="sm"
            key={event.id}
            isPressable
            onPress={() => handleEventClick(event)}
            className="hover:scale-105 transition-transform duration-200"
          >
            <CardBody className="p-0 relative">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={event.title}
                className="w-full object-cover h-[250px] object-top"
                src={event.imgCard}
              />
              {/* Event type label */}
              <div className="absolute top-2 left-2">
                <Chip
                  color={isCertificate(event) ? "secondary" : "primary"}
                  variant="solid"
                  className="text-xs shadow-lg border-2 border-black/40 backdrop-blur-sm"
                >
                  {isCertificate(event) ? "Certificate" : "Ticket"}
                </Chip>
              </div>
            </CardBody>
            <CardFooter className="flex-col items-start">
              <h4 className="font-bold text-large">{event.title}</h4>
              <p className="text-default-500">{event.date}</p>
              <p className="text-default-500">{event.time}</p>
              <p className="text-default-500 text-small">{event.venue.name}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-default-600 font-semibold">
                  {Math.min(...Object.values(event.price)) === 0
                    ? "Free"
                    : `From $${Math.min(...Object.values(event.price))}`}
                </span>
                <Chip
                  color={isCertificate(event) ? "secondary" : "primary"}
                  variant="flat"
                  size="sm"
                  className="text-xs shadow-md border border-black/30 bg-white/20 backdrop-blur-sm"
                >
                  {isCertificate(event) ? "Certificate" : "Ticket"}
                </Chip>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
