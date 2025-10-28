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
    <div className="relative max-w-[100vw] overflow-x-hidden text-gray-200">
      <div
        className={`${contentContainerClass} section-content flex flex-col items-center text-center`}
      >
        <h1 className="section-heading text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          DEVELOPERS
        </h1>

        <div className="grid w-full gap-6 grid-cols-1 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-8">
          {teamMembers.map((member, i) => (
            <div
              key={i}
              className={`w-full max-w-xs mx-auto ${cardOuterRadiusClass} ${cardSurfaceClasses} ${cardGlassBackground} p-4 transition hover:border-sky-400/50 hover:bg-white/10 sm:p-6`}
            >
              <div className="flex justify-center">
                <Image
                  src={member.img}
                  width={130}
                  height={130}
                  alt={member.name}
                  className="h-28 w-28 rounded-full object-cover ring-2 ring-gray-700 sm:h-[140px] sm:w-[140px]"
                />
              </div>

              <h3 className="mt-3 text-lg font-semibold sm:mt-4 sm:text-xl">
                {member.name}
              </h3>
              <p className="text-xs text-gray-400 sm:text-sm">{member.role}</p>

              <div className="mt-3 flex justify-center gap-3 text-base text-gray-400 sm:mt-4 sm:gap-4 sm:text-lg">
                <FaLinkedinIn className="cursor-pointer hover:text-white" />
                <FaInstagram className="cursor-pointer hover:text-white" />
                <FaFacebookF className="cursor-pointer hover:text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
