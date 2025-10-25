"use client";
import { Key, useState } from "react";
import SecyCard from "../components/SecyCard";
import Navbar from "../components/navbar";

const teams = {
  "Photog": [
    { name: "John Doe", role: "Secretary", desc: "Passionate", img: "/prakhar.jpg" },
    { name: "Alex", role: "Vice Secy", desc: "Leadership", img: "/prakhar.jpg" }
  ],
  "Tech Team": [
    { name: "Raj", role: "Tech Lead", desc: "Innovator", img: "/prakhar.jpg" },
    { name: "Priya", role: "Developer", desc: "Coder", img: "/prakhar.jpg" }
  ],
  "Design Team": [
    { name: "Ria", role: "Designer", desc: "Creative", img: "/prakhar.jpg" },
    { name: "Sam", role: "UI/UX", desc: "Artistic Vision", img: "/prakhar.jpg" }
  ],
};

export default function TeamSection() {
  const [selectedClub, setSelectedClub] = useState<keyof typeof teams>("Photog");

  const handleTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClub(e.target.value as keyof typeof teams);
  };

  return (
    <>
      <Navbar />

      <section className="w-full py-12 flex flex-col items-center">
        
        {/* ✅ Dynamic Title */}
        <h1 className="text-5xl font-bold mb-6">
          {selectedClub}
        </h1>

        {/* ✅ Styled Dropdown */}
        <select
          onChange={handleTeamChange}
          value={selectedClub}
          className="mb-10 px-5 py-3 text-lg text-black border rounded-lg cursor-pointer bg-white shadow-md outline-none"
        >
          {Object.keys(teams).map((clubName) => (
            <option key={clubName} value={clubName}>
              {clubName}
            </option>
          ))}
        </select>

        {/* ✅ Cards Render */}
        <div className="flex flex-wrap justify-center gap-25">
          {teams[selectedClub].map((member: { name: string; role: string; desc: string; img: string; }, index: Key | null | undefined) => (
            <SecyCard
              key={index}
              name={member.name}
              role={member.role}
              desc={member.desc}
              img={member.img}
            />
          ))}
        </div>

      </section>
    </>
  );
}
