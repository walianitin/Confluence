"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// 1. Define the shape of our vector state
interface SpaceVector {
  id: number;
  src: string;
  top: string;
  left: string;
  rotate: string;
  animationDelay: string;
}

export default function CosmicBackground() {
  const starsRef = useRef<HTMLDivElement>(null);
  
  // 2. State to hold scroll percentage and vector positions
  const [scrollPercent, setScrollPercent] = useState(0);
  const [vectors, setVectors] = useState<SpaceVector[]>([]);

  // 3. This effect runs ONCE to create stars and vector positions
  useEffect(() => {
    // --- Create stars dynamically ---
    const starsContainer = starsRef.current;
    if (starsContainer) {
      const numStars = 100;
      for (let i = 0; i < numStars; i++) {
        const star = document.createElement("div");
        star.className = "star"; // Style is in <style jsx> below
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        starsContainer.appendChild(star);
      }
    }

    // --- Create and save vector positions ---
    // We do this ONCE and store it in state.
    // This stops Math.random() from re-running on every render.
    const spaceVectorIds = [1, 2, 3, 4, 5];
    const newVectors = spaceVectorIds.map((i) => ({
      id: i,
      src: `/spacevector${i}.svg`,
      top: `${Math.random() * 60}%`, // Only show in top 60%
      left: `${Math.random() * 90}%`,
      rotate: `${Math.random() * 360}deg`,
      animationDelay: `${Math.random() * 5}s`, // Random start for floating
    }));
    setVectors(newVectors);
  }, []); // Empty array [] means this runs only once on mount

  // 4. This effect adds a scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      const percent = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollPercent(percent);
    };

    window.addEventListener("scroll", handleScroll);
    // Cleanup function to remove the listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 5. Calculate opacities based on scroll
  // Vectors fade out as you scroll down (fully transparent by 80% scroll)
  const vectorOpacity = Math.max(0, 1 - scrollPercent * 1.25);
  // Black hole fades in *after* 50% scroll (full opacity at 100%)
  const blackHoleOpacity = Math.max(0, (scrollPercent - 0.5) * 2);

  return (
    // Added -z-10 to make sure this is always in the background
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-b from-[#020105] via-[#024f3d53] to-black -z-10">
      {/* Stars */}
      <div ref={starsRef} className="absolute inset-0"></div>

      {/* Randomly positioned space vectors */}
      {/* {vectors.map((vec) => (
        <Image
          key={vec.id}
          src={vec.src}
          alt={`space object ${vec.id}`}
          width={100}
          height={100}
          className="absolute object-contain floating-vector" // Added class for animation
          style={{
            top: vec.top,
            left: vec.left,
            transform: `rotate(${vec.rotate})`,
            animationDelay: vec.animationDelay,
            opacity: vectorOpacity, // 6. Apply dynamic opacity
            transition: "opacity 0.3s ease-out", // Smooth fade
          }}
        />
      ))} */}

      {/* Half blackhole at bottom */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px]"
        style={{
          opacity: blackHoleOpacity, // 6. Apply dynamic opacity
          transition: "opacity 0.3s ease-out", // Smooth fade
        }}
      >
        {/* <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black via-green-800 to-transparent blur-2xl opacity-70"></div> */}
        {/* <Image
          src="/blackhole.svg"
          alt="blackhole"
          fill
          className="object-contain opacity-80"
        /> */}
      </div>

      {/* 7. Added styles for star and floating animations */}
      <style jsx>{`
        @keyframes twinkle {
          0% {
            opacity: 0.2;
          }
          100% {
            opacity: 1;
          }
        }
        
        /* This style was missing from your original code */
        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          animation: twinkle 2s infinite ease-in-out alternate;
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        /* This applies the float animation */
        .floating-vector {
          animation: float 6s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}