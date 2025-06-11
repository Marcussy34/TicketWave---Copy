import React from 'react';
import { useRouter } from 'next/router';
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import ShinyButton from "../components/ui/shiny-button";
import Slider from '../components/Slider';
import ConcertCard from '../components/ConcertCard';

export default function Home() {
  const router = useRouter();
  
  // Separate configurations for each component
  const config = {
    slider: {
      concertIds: [9,10,11] // IDs for slider
    },
    concertCard: {
      concertIds: [9,10,11] // IDs for concert cards
    },
    events: {
      concertIds: [9,10,11] // IDs for events page
    }
  };

  const handleSeeMore = () => {
    router.push('/events');
  };

  const getEventSlug = (title, id) => {
    return `/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${id}`;
  };

  return (
    <div>
      <Slider concertIds={config.slider.concertIds} urlFormatter={getEventSlug} />
      <ConcertCard concertIds={config.concertCard.concertIds} urlFormatter={getEventSlug} />
      <div className="flex justify-center mt-4 mb-8">
        <div className="z-10 flex min-h-24 items-center justify-center p-8">
          <ShinyButton className="text-xl py-4 px-8" onClick={handleSeeMore}>
            See More Events
          </ShinyButton>
        </div>
      </div>
    </div>
  );
}