"use client";
import React, { useState } from "react";
import Image from "next/image";

interface CardProps {
  eventName: string;
  eventImage?: string;
  eventDescription?: string;
}

const Card: React.FC<CardProps> = ({ eventName, eventImage, eventDescription }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`relative rounded-2xl overflow-hidden cursor-pointer flex items-center transition-all duration-700 ease-in-out 
      ${isExpanded ? "w-[800px] h-96" : "w-80 h-96"} 
      bg-gradient-to-b from-[#050816] to-[#0b0f25] shadow-[0_0_25px_rgba(0,0,50,0.4)]`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Twinkling stars */}
      <div className="absolute inset-0 z-0">
        {Array.from({ length: isExpanded ? 40 : 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white rounded-full opacity-60"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${1.5 + Math.random() * 2}s infinite ease-in-out alternate`,
            }}
          ></div>
        ))}
      </div>

      {/* Left section (glowing planet + image) */}
      <div className="relative w-64 h-64 flex-shrink-0 flex items-center justify-center ml-8 z-10">
  <div className="relative w-full h-full rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(80,150,255,0.7)]">
    {/* Event image inside feathered circle */}
    {eventImage && (
      <div className="w-full h-full rounded-full overflow-hidden relative">
        <Image
          src={eventImage}
          alt={eventName}
          fill
          className="object-cover brightness-75"
          style={{
            maskImage:
              "radial-gradient(circle at center, black 70%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(circle at center, black 70%, transparent 100%)",
          }}
        />
      </div>
    )}

    {/* Glow pulse */}
    <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl animate-pulse"></div>

    {/* Event name centered in circle */}
    <div className="absolute inset-0 flex items-center justify-center z-20 text-center px-4">
      <h2
        className="text-white text-xl font-semibold"
        style={{
          textShadow:
            "0 0 6px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.6)",
        }}
      >
        {eventName}
      </h2>
    </div>
  </div>
</div>

      {/* Expanded right section */}
      {isExpanded && (
        <div className="relative flex-1 h-full overflow-hidden">
          {/* Right-side image with black gradient blend */}
          {eventImage && (
            <div className="absolute inset-0">
              <Image
                src={eventImage}
                alt={eventName}
                fill
                className="object-cover brightness-50"
                style={{
                  maskImage:
                    "linear-gradient(to left, black 70%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to left, black 70%, transparent 100%)",
                }}
              />
            </div>
          )}

          {/* Overlay for fade effect */}
          <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/60 to-transparent"></div>

          {/* Description text */}
          <div className="absolute bottom-6 left-6 right-6 text-gray-200 z-20">
            <h3 className="text-xl font-bold mb-2">About {eventName}</h3>
            <p className="text-sm leading-relaxed">
              {eventDescription || "No description available."}
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes twinkle {
          0% {
            opacity: 0.2;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Card;
