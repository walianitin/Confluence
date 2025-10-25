"use client";

import React from "react";
import Image from "next/image";
import Navbar from "@/app/components/navbar";
import Card from "./components/card"; // your existing card component
import StarsBackground from "@/app/Gallery/components/StarsBackground";
import Card2 from "./components/Card2";

const Gallery: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <Navbar />
      <StarsBackground />


      {/* 🌌 Animated star background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="stars"></div>
        <div className="twinkling"></div>
      </div>

      {/* 🌀 Blackhole Section */}
      <div className="relative z-10 flex justify-center items-center pt-20 pb-24">
        <Image
          src="/blackhole.jpg" // Replace with your blackhole image later
          alt="Blackhole"
          width={600}
          height={400}
          priority
          className="rounded-full "
        />
      </div>

      {/* 🌠 Cards + Astronaut Combined Section */}
      <div className="relative z-20 flex justify-between items-stretch ">
        {/* Left: Event Cards */}
        <div className="flex flex-col items-start gap-8 w-1/2 min-h-[60vh]">
          <Card eventName="photog" eventDescription="ksdjflkjhseihfsdjhfisdhf uhsdoifhoisdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdjslksdgof "  eventImage="/moon.svg"/>
          <Card eventName="skit" eventDescription="dskjhfpsheoihesipfhpiwefpoes"eventImage="/tanish.png" />
          <Card eventName="nukkad" eventDescription="djshfisuhefiohseifiosehf" />
          <Card eventName="debate" eventDescription="dsfhiosdhfiosdhfoishfoishfoishfoishfoishfoishfoishfoishfoishf" />
        </div>

        {/* Right: Astronaut that scales with card list height */}
        {/* <div className="relative w-1/2 flex justify-center items-center">
          <div className="absolute inset-0 flex justify-center items-center animate-float">
            <Image
              src="/astronaut.svg"
              alt="Astronaut"
              fill
              style={{ objectFit: "contain" }}
              className="pointer-events-none select-none opacity-15 -z-30 scale-0.9 "
            />
          </div>
        </div> */}
      </div>


      <Card2/>
    </div>
  );
};

export default Gallery;
