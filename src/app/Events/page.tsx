"use client";

import { useMemo, useState, KeyboardEvent, useRef } from "react";
import { motion } from "framer-motion";
import AnimatedDropdown from "../components/AnimatedDropdown";
import {
  CARD_OUTER_RADIUS_PX,
  CARD_PADDING_PX,
  cardGlassBackground,
  cardSurfaceClasses,
} from "../components/cardTokens";
import { contentContainerClass } from "../components/layoutTokens";
import OptimizedImage from "../components/OptimizedImage";
import Pagination, { usePagination } from "../components/Pagination";

type Event = {
  eventName: string;
  image: string;
  venue?: string;
  clubName?: string;
  description?: string;
};

const clubNames = [
  "All Clubs",
  "Photography Club",
  "Managing & Directing Club",
  "Fine Arts & Modelling",
  "Audio Visual Club ",
  "Colours",
  "Hiking & Trekking Club",
  "Spicmacay",
  "Post Graduate Club",
  "Lit & Deb Club"
];

const allEvents: Event[] = [
  {
    eventName: "Cosmic Dance Battle",
    image: "https://res.cloudinary.com/dwuy4lzhb/image/upload/v1761593956/Dj_Night_o74sry.jpg",
    venue: "Main Arena",
    clubName: "Dance Club",
    description: "Intergalactic dance-off under the stars",
  },
  {
    eventName: "Stellar DJ Night",
    image: "/Photog_Poster1.jpg",
    venue: "Open Air Stage",
    clubName: "Dance Club",
    description: "Electronic beats from another dimension",
  },
  {
    eventName: "Nebula Fashion Show",
    image: "",
    venue: "Galaxy Hall",
    clubName: "Dance Club",
    description: "Runway show featuring cosmic couture",
  },
  {
    eventName: "Asteroid Art Exhibition",
    image: "/sadf.jpg",
    venue: "Creative Space",
    clubName: "Fine Arts",
    description: "Visual art from across the universe",
  },
  {
    eventName: "Lunar Poetry Slam",
    image: "/sadf.jpg",
    venue: "Amphitheatre",
    clubName: "Literary Society",
    description: "Spoken word under moonlight",
  },
  {
    eventName: "Meteor Gaming Tournament",
    image: "/sadf.jpg",
    venue: "Tech Hub",
    clubName: "Gaming Club",
    description: "Compete in the ultimate esports challenge",
  },
  {
    eventName: "Galaxy Groove",
    image: "/sadf.jpg",
    venue: "Main Arena",
    clubName: "Dance Club",
    description: "Contemporary and hip-hop fusion",
  },
  {
    eventName: "Cosmic Comedy Night",
    image: "/sadf.jpg",
    venue: "Auditorium",
    clubName: "Drama Club",
    description: "Stand-up comedy from the stars",
  },
  {
    eventName: "Quantum Quiz Bowl",
    image: "/sadf.jpg",
    venue: "Tech Hub",
    clubName: "Tech Society",
    description: "Test your knowledge across dimensions",
  },
  {
    eventName: "Stardust Street Play",
    image: "/sadf.jpg",
    venue: "Open Courtyard",
    clubName: "Drama Club",
    description: "Interactive theater under open skies",
  },
  {
    eventName: "Orbital Beatbox Battle",
    image: "/sadf.jpg",
    venue: "Open Air Stage",
    clubName: "Music Society",
    description: "Vocal percussion from the cosmos",
  },
  {
    eventName: "Celestial Canvas",
    image: "/sadf.jpg",
    venue: "Creative Space",
    clubName: "Fine Arts",
    description: "Live painting inspired by the universe",
  },
];

function EventCard({ event }: { event: Event }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleExpanded();
    }
  };

  const overlayRadius = CARD_OUTER_RADIUS_PX - CARD_PADDING_PX;

  return (
    <motion.div
      className={`relative flex cursor-pointer flex-col overflow-hidden ${cardSurfaceClasses} ${cardGlassBackground}`}
      style={{
        aspectRatio: "3 / 4",
        borderRadius: `${CARD_OUTER_RADIUS_PX}px`,
      }}
      role="button"
      tabIndex={0}
      aria-pressed={isExpanded}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      whileTap={{ scale: 0.98 }}
      onClick={toggleExpanded}
      onKeyDown={handleKeyDown}
    >
      <motion.div
        className="relative h-full w-full"
        animate={{ scale: isExpanded ? 1.04 : 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <OptimizedImage
          src={event.image}
          alt={event.eventName}
          fill
          className="object-cover"
        />
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center border-t border-white/30 bg-black/20 px-5 text-center text-white backdrop-blur-lg"
        style={{
          borderBottomLeftRadius: `${overlayRadius}px`,
          borderBottomRightRadius: `${overlayRadius}px`,
        }}
        animate={{
          height: isExpanded ? "100%" : "18%",
          paddingTop: isExpanded ? "2rem" : "0.75rem",
          paddingBottom: isExpanded ? "2rem" : "0.75rem",
          backdropFilter: isExpanded ? "blur(24px)" : "blur(12px)",
          backgroundColor: isExpanded
            ? "rgba(8, 11, 26, 0.72)"
            : "rgba(8, 11, 26, 0.35)",
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div
          className="flex w-full items-center justify-center"
          style={{
            position: isExpanded ? "relative" : "absolute",
            top: isExpanded ? "0" : "50%",
            left: 0,
            right: 0,
            transform: isExpanded ? "none" : "translateY(-50%)",
          }}
        >
          <h3 className="text-lg font-semibold uppercase tracking-wide">
            {event.eventName}
          </h3>
        </div>

        {isExpanded && (
          <motion.div
            className="mt-4 flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, delay: 0.12 }}
          >
            {event.description && (
              <p className="text-sm text-slate-200">{event.description}</p>
            )}

            <div className="flex flex-col items-center gap-2 text-sm">
              {event.venue && (
                <p className="text-slate-300">Venue: {event.venue}</p>
              )}
              {event.clubName && (
                <p className="text-slate-300">{event.clubName}</p>
              )}
            </div>

            <button className="rounded-md border border-white bg-transparent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40">
              Learn More
            </button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function EventsPage() {
  const [selectedClub, setSelectedClub] = useState("All Clubs");
  const sectionRef = useRef<HTMLElement>(null);

  const dropdownItems = useMemo(
    () => clubNames.map((club) => ({ id: club, label: club })),
    []
  );

  const handleSelectClub = (clubId: string) => {
    setSelectedClub(clubId);
  };

  const filteredEvents =
    selectedClub === "All Clubs"
      ? allEvents
      : allEvents.filter((event) => event.clubName === selectedClub);

  // Pagination: 9 items per page
  const {
    currentItems: paginatedEvents,
    currentPage,
    totalPages,
    setCurrentPage,
  } = usePagination(filteredEvents, 9);

  return (
    <main
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden py-24 text-white"
    >
      <div className={`${contentContainerClass}`}>
        <motion.h1
          className="mb-12 text-center text-5xl font-bold tracking-tight text-white sm:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          EVENTS
        </motion.h1>

        <div className="mb-8 flex justify-center">
          <AnimatedDropdown
            items={dropdownItems}
            selectedId={selectedClub}
            onSelect={(item) => handleSelectClub(item.id)}
            placeholder="Filter by club"
            className="w-full sm:w-64"
          />
        </div>

        {/* {selectedClub !== "All Clubs" && (
          <motion.div
            className="mb-8 text-center text-4xl font-bold sm:text-5xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {selectedClub}
          </motion.div>
        )}
 */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedEvents.map((event) => (
            <EventCard key={event.eventName} event={event} />
          ))}
        </div>

        {/* Pagination Controls */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          sectionRef={sectionRef}
          className="mt-12"
        />
      </div>
    </main>
  );
}
