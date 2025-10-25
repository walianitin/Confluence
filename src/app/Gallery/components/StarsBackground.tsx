"use client";
import React from "react";

const StarsBackground: React.FC<{ count?: number }> = ({ count = 150 }) => {
  return (
    <div className="fixed inset-0 -z-10 bg-black overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const size = Math.random() * 2 + 1; // 1px to 3px
        const brightness = Math.random() * 0.8 + 0.2; // 0.2 to 1
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const animationDuration = 1.5 + Math.random() * 2.5;

        return (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-70"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              top: `${top}%`,
              left: `${left}%`,
              animation: `twinkle ${animationDuration}s infinite ease-in-out alternate`,
              opacity: brightness,
            }}
          ></div>
        );
      })}

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

export default StarsBackground;
