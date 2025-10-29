// components/TeamSection.tsx

import Image from "next/image";
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
                <a
                  href="#"
                  aria-label="LinkedIn profile"
                  className="inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/Social Media Logos/Linkedin.png"
                    alt="LinkedIn"
                    width={28}
                    height={28}
                    className="object-contain dev-social-icon"
                  />
                </a>

                <a
                  href="#"
                  aria-label="GitHub profile"
                  className="inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/Social Media Logos/GitHub.png"
                    alt="GitHub"
                    width={28}
                    height={28}
                    className="object-contain dev-social-icon"
                  />
                </a>

                <a
                  href="#"
                  aria-label="Instagram profile"
                  className="inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/Social Media Logos/instagram.png"
                    alt="Instagram"
                    width={28}
                    height={28}
                    className="object-contain dev-social-icon"
                  />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
