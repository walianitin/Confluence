"use client";
import Image from "next/image";

export default function SecyCard() {
  return (
    <div className="group w-64 h-80 [perspective:1000px] cursor-pointer relative">
      <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        
        {/* Front Side */}
        <div className="absolute w-full h-full [backface-visibility:hidden] rounded-xl overflow-hidden shadow-xl">
          <Image
            src="/secy.jpg"
            alt="Secretary"
            fill
            className="object-cover"
          />
        </div>

        {/* Back Side */}
        <div className="absolute w-full h-full bg-gray-900 text-white p-6 rounded-xl [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-center items-center shadow-2xl">
          <h2 className="font-semibold text-xl mb-1">John Doe</h2>
          <p className="text-sm opacity-80">Secretary</p>
          <p className="text-sm opacity-70 mt-2">Passionate</p>
        </div>

      </div>
    </div>
  );
}
