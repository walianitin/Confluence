"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import AnimatedDropdown from "../components/AnimatedDropdown";

type Event = {
  eventName: string;
  image: string;
  venue?: string;
  clubName?: string;
  description?: string;
};

const clubNames = [
  "All Clubs",
  "Dance Club",
  "Music Society",
  "Fashion Club",
  "Fine Arts",
  "Literary Society",
  "Gaming Club",
  "Drama Club",
  "Tech Society",
];

const allEvents: Event[] = [
  {
    eventName: "Cosmic Dance Battle",
    image: "/sadf.jpg",
    venue: "Main Arena",
    clubName: "Dance Club",
    description: "Intergalactic dance-off under the stars",
  },
  {
    eventName: "Stellar DJ Night",
    image: "/sadf.jpg",
    venue: "Open Air Stage",
    clubName: "Music Society",
    description: "Electronic beats from another dimension",
  },
  {
    eventName: "Nebula Fashion Show",
    image: "/sadf.jpg",
    venue: "Galaxy Hall",
    clubName: "Fashion Club",
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
];

function EventCard({ event }: { event: Event }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleInteraction = () => {
    // For touch devices, toggle the expanded state
    setIsExpanded(!isExpanded);
  };

  const showDetails = isHovered || isExpanded;

  // Outer Radius = Inner Radius + Padding rule
  // Standardized to match Sponsors page: 24px outer, 8px padding, 16px inner
  const cardRadius = 24; // 1.5rem outer radius
  const cardPadding = 8; // 0.5rem padding (not visible but conceptual)
  const overlayRadius = cardRadius - cardPadding; // 16px = 1rem inner radius

  return (
    <motion.div
      className="group relative overflow-hidden border border-white/20 bg-white/5 backdrop-blur-md cursor-pointer"
      style={{
        aspectRatio: "3 / 4",
        borderRadius: `${cardRadius}px`,
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleInteraction}
      onTap={handleInteraction}
      whileHover={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)" }}
    >
      <div className="relative h-full w-full">
        <Image
          src={event.image}
          alt={event.eventName}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center border-t border-white/30 bg-black/10 px-5 text-center text-white backdrop-blur-lg"
        style={{
          borderBottomLeftRadius: `${overlayRadius}px`,
          borderBottomRightRadius: `${overlayRadius}px`,
        }}
        animate={{
          height: showDetails ? "100%" : "15%",
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* Title positioning changes based on hover */}
        <div
          className="flex w-full items-center justify-center"
          style={{
            position: showDetails ? "relative" : "absolute",
            top: showDetails ? "0" : "50%",
            left: 0,
            right: 0,
            transform: showDetails ? "none" : "translateY(-50%)",
          }}
        >
          <h3 className="text-lg font-semibold uppercase tracking-wide">
            {event.eventName}
          </h3>
        </div>

        {/* Details that appear on hover */}
        {showDetails && (
          <motion.div
            className="mt-4 flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
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

            <button className="rounded-md border border-white bg-transparent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20">
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

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 py-24 text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.2),_transparent_55%)]" />

      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <header className="mb-12 text-center">
          <motion.p
            className="text-sm uppercase tracking-[0.4em] text-sky-300/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Confluence 2025
          </motion.p>
          <motion.h1
            className="mt-4 text-5xl font-bold leading-tight sm:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Cosmic Carnival Events
          </motion.h1>
          <motion.p
            className="mt-4 text-base text-slate-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Experience the universe of entertainment, art, and culture
          </motion.p>
        </header>

        {/* Filter Dropdown */}
        <div className="mb-8 flex justify-center">
          <AnimatedDropdown
            items={dropdownItems}
            selectedId={selectedClub}
            onSelect={(item) => handleSelectClub(item.id)}
            placeholder="Filter by club"
            className="w-full sm:w-64"
          />
        </div>

        {/* Selected Club Title */}
        {selectedClub !== "All Clubs" && (
          <motion.div
            className="mb-8 text-center text-4xl font-bold sm:text-5xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {selectedClub}
          </motion.div>
        )}

        {/* Events Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <EventCard key={event.eventName} event={event} />
          ))}
        </div>
      </div>
    </main>
  );
}
