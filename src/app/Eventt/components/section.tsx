"use client";

import React from "react";
import Image from "next/image";

interface EventSectionProps {
  
  eventName: string;
  eventDescription: string;
  eventImage: string; // path to image in /public (e.g. "/event.jpg")
}

const EventSection: React.FC<EventSectionProps> = ({
  
  eventName,
  eventDescription,
  eventImage,
}) => {
  return (
    <div className=" border-0 p-0 rounded-2xl bg-black/60 w-2/3 ">
      <section className="m-0 p-0 relative flex items-center justify-between  min-h-[40px] bg-transparent overflow-hidden">
      {/* Planet SVG (half visible on left) */}
      <div className=" flex items-center absolute left -0 top-1/2 -translate-y-1/2 w-[300px] h-[300px] overflow-hidden ">
        {/* <div className="relative w-full h-full -translate-x-1/2"> */}
          {/* <Image
            src={planetSvg}
            alt="Planet"
            fill
            className="object-contain opacity-90"
          /> */}
        {/* </div> */}

        <div className=" relative -translate-x-1/2 w-75 h-75 rounded-full shadow-[0_0_105px_55px] shadow-cyan-500/70"></div>
      </div>

      {/* Text Content */}
      <div className="relative z-10 w-[40%] ml-[180px] text-white">
        <h2 className="text-4xl font-bold mb-3">{eventName}</h2>
        <p className="text-gray-300 text-lg leading-relaxed">
          {eventDescription}
        </p>
      </div>

      {/* Event Image (fixed height, smooth fade left + right) */}
      <div className=" m-1 relative w-[50%] h-[320px] overflow-hidden rounded-l-2xl feathered-edge  ">
        <Image
          src={eventImage}
          alt={eventName}
          fill
          className="object-cover rounded-l-2xl"
        />

        {/* --- THIS IS THE UPDATED LINE --- */}
        {/* This creates a fade from black -> transparent -> black */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black pointer-events-none" /> */}

      </div>
    </section>
    </div>
  );
};

export default EventSection;
