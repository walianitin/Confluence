"use client";

import React from "react";
import Image from "next/image";

interface EventSectionProps {
  planetSvg: string; // path to SVG in /public (e.g. "/planet.svg")
  eventName: string;
  eventDescription: string;
  eventImage: string; // path to image in /public (e.g. "/event.jpg")
}

const EventSection: React.FC<EventSectionProps> = ({
  planetSvg,
  eventName,
  eventDescription,
  eventImage,
}) => {
  return (
    <div className="m-5 border-2 p-0 rounded-2xl bg-black ">
      <section className="m-0 p-0 relative flex items-center justify-between  min-h-[40px] bg-transparent overflow-hidden">
      {/* Planet SVG (half visible on left) */}
      <div className="absolute left -0 top-1/2 -translate-y-1/2 w-[300px] h-[300px] overflow-hidden">
        <div className="relative w-full h-full -translate-x-1/2">
          <Image
            src={planetSvg}
            alt="Planet"
            fill
            className="object-contain opacity-90"
          />
        </div>
      </div>

      {/* Text Content */}
      <div className="relative z-10 w-[40%] ml-[180px] text-white">
        <h2 className="text-4xl font-bold mb-3">{eventName}</h2>
        <p className="text-gray-300 text-lg leading-relaxed">
          {eventDescription}
        </p>
      </div>

      {/* Event Image (fixed height, smooth fade left + right) */}
      <div className=" m-1 relative w-[50%] h-[320px] overflow-hidden rounded-l-2xl  ">
        <Image
          src={eventImage}
          alt={eventName}
          fill
          className="object-cover rounded-l-2xl"
        />

        {/* --- THIS IS THE UPDATED LINE --- */}
        {/* This creates a fade from black -> transparent -> black */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black pointer-events-none" />

      </div>
    </section>
    </div>
  );
};

export default EventSection;
