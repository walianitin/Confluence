// components/TeamSection.tsx

import Image from "next/image";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import {
  cardGlassBackground,
  cardOuterRadiusClass,
  cardSurfaceClasses,
} from "./cardTokens";
import { contentContainerClass } from "./layoutTokens";

const teamMembers = [
  {
    name: "William Foster",
    role: "Co-Founder & CEO",
    img: "/sadf.jpg",
  },
  {
    name: "Emily Jonson",
    role: "CEO",
    img: "/sadf.jpg",
  },
  {
    name: "Harshita Patel",
    role: "HR",
    img: "/sadf.jpg",
  },
  {
    name: "Eleanor Morales",
    role: "HR",
    img: "/sadf.jpg",
  },
  {
    name: "Sophia Monic",
    role: "Product Manager",
    img: "/sadf.jpg",
  },
  {
    name: "James Miller",
    role: "Marketing Lead",
    img: "/sadf.jpg",
  },
];

export default function TeamSection() {
  return (
    <section className="bg-[#0F1114] py-20 text-gray-200">
      <div
        className={`${contentContainerClass} flex flex-col items-center gap-12 text-center`}
      >
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
          Developers
        </h1>

        <div className="grid w-full gap-10 sm:grid-cols-2 md:grid-cols-3">
          {teamMembers.map((member, i) => (
            <div
              key={i}
              className={`${cardOuterRadiusClass} ${cardSurfaceClasses} ${cardGlassBackground} p-6 transition hover:border-sky-400/50 hover:bg-white/10`}
            >
              <div className="flex justify-center">
                <Image
                  src={member.img}
                  width={130}
                  height={130}
                  alt={member.name}
                  className="h-[140px] w-[140px] rounded-full object-cover ring-2 ring-gray-700"
                />
              </div>

              <h3 className="mt-4 text-xl font-semibold">{member.name}</h3>
              <p className="text-sm text-gray-400">{member.role}</p>

              <div className="mt-4 flex justify-center gap-4 text-lg text-gray-400">
                <FaLinkedinIn className="cursor-pointer hover:text-white" />
                <FaInstagram className="cursor-pointer hover:text-white" />
                <FaFacebookF className="cursor-pointer hover:text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
