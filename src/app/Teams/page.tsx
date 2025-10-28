"use client";
import { Key, useMemo, useState, useRef } from "react";
import SecyCard from "../components/SecyCard";
import AnimatedDropdown from "../components/AnimatedDropdown";
import { contentContainerClass } from "../components/layoutTokens";
import Pagination, { usePagination } from "../components/Pagination";

const teams = {
  Photog: [
    {
      name: "Arjun Kapoor",
      role: "Director",
      desc: "Crafts cinematic stories through still frames.",
      img: "/sadf.jpg",
    },
    {
      name: "Nisha Rao",
      role: "Secretary",
      desc: "Curates event coverage with precision.",
      img: "/sadf.jpg",
    },
    {
      name: "Kabir Sen",
      role: "Photographer",
      desc: "Loves experimenting with long-exposure shots.",
      img: "/sadf.jpg",
    },
    {
      name: "Ananya Verma",
      role: "Editor",
      desc: "Grades every frame for that cosmic glow.",
      img: "/sadf.jpg",
    },
  ],
  "Tech Team": [
    {
      name: "Raj Mehta",
      role: "Tech Lead",
      desc: "Architects the fest website and deployments.",
      img: "/sadf.jpg",
    },
    {
      name: "Priya Singh",
      role: "Developer",
      desc: "Turns wild ideas into slick UI flows.",
      img: "/sadf.jpg",
    },
    {
      name: "Tanay Gupta",
      role: "Backend Engineer",
      desc: "Keeps APIs humming during peak traffic.",
      img: "/sadf.jpg",
    },
    {
      name: "Lisa George",
      role: "QA Analyst",
      desc: "Bottles sneaky bugs before launch night.",
      img: "/sadf.jpg",
    },
  ],
  "Design Team": [
    {
      name: "Ria D'Souza",
      role: "Lead Designer",
      desc: "Sets the visual language for every poster.",
      img: "/sadf.jpg",
    },
    {
      name: "Sam Malhotra",
      role: "UI/UX Artist",
      desc: "Sketches immersive journeys for attendees.",
      img: "/sadf.jpg",
    },
    {
      name: "Isha Kapoor",
      role: "Illustrator",
      desc: "Adds playful motion to our cosmos.",
      img: "/sadf.jpg",
    },
    {
      name: "Zara Khan",
      role: "Brand Strategist",
      desc: "Keeps every asset on-theme and on-brand.",
      img: "/sadf.jpg",
    },
  ],
};

export default function TeamSection() {
  const [selectedClub, setSelectedClub] =
    useState<keyof typeof teams>("Photog");
  const sectionRef = useRef<HTMLElement>(null);

  const teamOptions = useMemo(
    () => Object.keys(teams).map((club) => ({ id: club, label: club })),
    []
  );

  const currentTeamMembers = teams[selectedClub];

  // Pagination: 5 items on mobile, 9 on desktop
  const {
    currentItems: paginatedMembers,
    currentPage,
    totalPages,
    setCurrentPage,
  } = usePagination(currentTeamMembers, { mobile: 5, desktop: 9 });

  return (
    <section
      ref={sectionRef}
      className="relative w-full max-w-[100vw] overflow-x-hidden py-12 sm:py-16 lg:py-20"
    >
      <div
        className={`${contentContainerClass} flex flex-col items-center gap-8 sm:gap-10`}
      >
        <h1 className="mb-8 text-center text-3xl font-bold tracking-tight text-white sm:mb-12 sm:text-5xl lg:text-6xl">
          TEAMS
        </h1>

        <AnimatedDropdown
          items={teamOptions}
          selectedId={selectedClub}
          onSelect={(item) => setSelectedClub(item.id as keyof typeof teams)}
          placeholder="Choose a team"
          className="w-full max-w-xs"
        />

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 sm:justify-items-center lg:grid-cols-3 xl:gap-8">
          {paginatedMembers.map(
            (
              member: { name: string; role: string; desc: string; img: string },
              index: Key | null | undefined
            ) => (
              <SecyCard
                key={index}
                name={member.name}
                role={member.role}
                desc={member.desc}
                img={member.img}
              />
            )
          )}
        </div>

        {/* Pagination Controls */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          sectionRef={sectionRef}
          className="mt-8"
        />
      </div>
    </section>
  );
}
