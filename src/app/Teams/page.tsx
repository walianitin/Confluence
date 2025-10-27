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
      img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761594920/DSC_5233_edsxqj.jpg",
    },
    {
      name: "Nisha Rao",
      role: "Secretary",
      img: "/sadf.jpg",
    },
    {
      name: "Kabir Sen",
      role: "Photographer",
  
      img: "/sadf.jpg",
    },
    {
      name: "Ananya Verma",
      role: "Editor",
      img: "/sadf.jpg",
    },
  ],
  "Mad":[
     {
      name: "1",
      role: "Director",
      img: "/sadf.jpg",
    },
  ], "FineArts":[
     {
      name: "1",
      role: "Director",
      img: "/sadf.jpg",
    },
  ] ,"Hindi Literature and Debating Club":[
     {
      name: "1",
      role: "Director",
      img: "/sadf.jpg",
    },
  ], "Made":[
     {
      name: "1",
      role: "Director",
      img: "/sadf.jpg",
    },
  ]
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

  // Pagination: 9 items per page
  const {
    currentItems: paginatedMembers,
    currentPage,
    totalPages,
    setCurrentPage,
  } = usePagination(currentTeamMembers, 9);

  return (
    <section ref={sectionRef} className="relative w-full py-12">
      <div
        className={`${contentContainerClass} flex flex-col items-center gap-10`}
      >
        <h1 className="mb-12 text-center text-5xl font-bold tracking-tight text-white sm:text-6xl">
          TEAMS
        </h1>

        <AnimatedDropdown
          items={teamOptions}
          selectedId={selectedClub}
          onSelect={(item) => setSelectedClub(item.id as keyof typeof teams)}
          placeholder="Choose a team"
          className="w-full max-w-xs"
        />

        <div className="flex w-full flex-wrap justify-center gap-8 md:justify-between xl:gap-12">
          {paginatedMembers.map(
            (
              member: { name: string; role: string; img: string },
              index: Key | null | undefined
            ) => (
              <SecyCard
                key={index}
                name={member.name}
                role={member.role}
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
