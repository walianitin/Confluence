"use client";

import React from "react";

const Card2: React.FC = () => {
  return (
    <div >
      <div
        className="group w-[400px] rounded-2xl bg-white/3 backdrop-blur-md 
                   border border-white/20 p-6 shadow-lg transition-all duration-500 
                   hover:shadow-[0_0_25px_5px_rgba(0,170,255,0.6)] hover:border-[#102c3db6]"
      >
        {/* Header Section */}
        <h2
          className="text-3xl font-bold text-white text-center mb-4 
                     group-hover:text-blue-400 transition-colors duration-500"
        >
          About Us
        </h2>

        {/* Description Section */}
        <p className="text-gray-300 text-center leading-relaxed">
          We are a team of passionate developers, designers, and creators
          dedicated to crafting immersive digital experiences. Our goal is to
          blend innovation with simplicity to deliver solutions that inspire and
          engage users worldwide.
        </p>
      </div>
    </div>
  );
};

export default Card2;
