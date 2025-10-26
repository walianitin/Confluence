"use client";
import { Key, useMemo, useState } from "react";
import SecyCard from "../components/SecyCard";
import AnimatedDropdown from "../components/AnimatedDropdown";

const teams = {
  Photog: [
    {
      name: "John Doe",
      role: "Secretary",
      desc: "Passionate",
      img: "/prakhar.jpg",
    },
    {
      name: "Alex",
      role: "Vice Secy",
      desc: "Leadership",
      img: "/prakhar.jpg",
    },
  ],
  "Tech Team": [
    { name: "Raj", role: "Tech Lead", desc: "Innovator", img: "/prakhar.jpg" },
    { name: "Priya", role: "Developer", desc: "Coder", img: "/prakhar.jpg" },
  ],
  "Design Team": [
    { name: "Ria", role: "Designer", desc: "Creative", img: "/prakhar.jpg" },
    {
      name: "Sam",
      role: "UI/UX",
      desc: "Artistic Vision",
      img: "/prakhar.jpg",
    },
  ],
};

export default function TeamSection() {
  const [selectedClub, setSelectedClub] =
    useState<keyof typeof teams>("Photog");
  const teamOptions = useMemo(
    () => Object.keys(teams).map((club) => ({ id: club, label: club })),
    []
  );

  return (
    <section className="w-full py-12 flex flex-col items-center">
      {/* ✅ Dynamic Title */}
      <h1 className="text-5xl font-bold mb-6">{selectedClub}</h1>

      {/* ✅ Styled Dropdown */}
      <AnimatedDropdown
        items={teamOptions}
        selectedId={selectedClub}
        onSelect={(item) => setSelectedClub(item.id as keyof typeof teams)}
        placeholder="Choose a team"
        className="mb-10 w-full max-w-xs"
      />

      {/* ✅ Cards Render */}
      <div className="flex flex-wrap justify-center gap-25">
        {teams[selectedClub].map(
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
    </section>
  );
}
