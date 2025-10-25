"use client";
import Image from "next/image";

interface SecyCardProps {
  name: string;
  role: string;
  desc: string;
  img: string;
}

export default function SecyCard({ name, role, desc, img }: SecyCardProps) {
  return (
    <div className="group w-64 h-80 [perspective:1000px] cursor-pointer relative">
      <div className="relative w-full h-full transition-transform duration-1500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

        {/* Front */}
        <div className="absolute w-full h-full [backface-visibility:hidden] rounded-xl overflow-hidden shadow-xl">
          <Image src={img} alt={name} fill className="object-cover" />
        </div>

        {/* Back */}
        <div className="absolute w-full h-full bg-gray-900 text-white p-6 rounded-xl [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-center items-center shadow-2xl">
          <h2 className="font-semibold text-xl mb-1">{name}</h2>
          <p className="text-sm opacity-80">{role}</p>
          <p className="text-sm opacity-70 mt-2">{desc}</p>
        </div>

      </div>
    </div>
  );
}
