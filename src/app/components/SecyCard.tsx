"use client";
import Image from "next/image";
import { cardOuterRadiusClass, cardSurfaceClasses } from "./cardTokens";

interface SecyCardProps {
  name: string;
  role: string;
  img: string;
}

export default function SecyCard({ name, role, img }: SecyCardProps) {
  return (
    <div className="group relative h-72 w-full cursor-pointer [perspective:1000px] sm:h-80 sm:w-64">
      <div className="relative w-full h-full transition-transform duration-1500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front */}
        <div
          className={`absolute h-full w-full overflow-hidden ${cardOuterRadiusClass} [backface-visibility:hidden] shadow-xl`}
        >
          <Image src={img} alt={name} fill className="object-cover" />
        </div>

        {/* Back */}
        <div
          className={`absolute flex h-full w-full flex-col items-center justify-center bg-gray-900 p-4 text-white sm:p-6 ${cardOuterRadiusClass} ${cardSurfaceClasses} [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-2xl`}
        >
          <h2 className="font-semibold text-lg mb-1 sm:text-xl">{name}</h2>
          <p className="text-xs opacity-80 sm:text-sm">{role}</p>
          <p className="text-xs opacity-70 mt-2 sm:text-sm">{desc}</p>
        </div>
      </div>
    </div>
  );
}
