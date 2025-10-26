"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import PrismaticBurst from "../components/PrismaticBurst";

// Prismatic Burst Animation Configuration
// Customize these values to adjust the cosmic background effect
const ANIMATION_CONFIG = {
  // Animation type: 'rotate' | 'rotate3d' | 'hover'
  // - rotate: 2D rotation in the XZ plane
  // - rotate3d: Full 3D rotation (recommended for cosmic effect)
  // - hover: Interactive, follows mouse movement
  animationType: "rotate3d" as const,

  // Brightness/visibility (0.5 to 3.0, default: 1.5)
  // Higher = brighter, more visible rays
  intensity: 3.5,

  // Animation speed (0.1 to 2.0, default: 0.3)
  // Lower = slower, more subtle movement
  speed: 0.4,

  // Wave distortion amount (0 to 5.0, default: 2.5)
  // Higher = more organic, flowing movement
  distort: 2.5,

  // Number of rays radiating from center (8 to 64, default: 32)
  rayCount: 32,

  // Blend mode: how the animation mixes with background
  // 'screen' = lighter, 'lighten' = softer, 'normal' = opaque
  mixBlendMode: "lighten" as const,

  // Color gradient from center to outer edge
  // Use hex color codes for cosmic/nebula palette
  colors: [
    "#FF0080", // Vivid magenta
    "#FF00FF", // Bright magenta/pink
    "#8B00FF", // Vivid purple
    "#4169E1", // Royal blue
    "#00BFFF", // Deep sky blue
    "#00FFFF", // Cyan
    "#FFFFFF", // White for brightness
  ],

  // Mouse interaction dampness (0 to 1, only for 'hover' mode)
  // Lower = more responsive to mouse movement
  hoverDampness: 0.15,

  // Center offset {x, y} in pixels or percentage
  // Use to shift the burst origin point
  offset: { x: 0, y: 0 },

  // Pause animation (useful for debugging)
  paused: false,
};

export default function LandingPage() {
  const [introComplete, setIntroComplete] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  // Animation plays on every page load/refresh (no persistence)

  const handleVideoComplete = () => {
    console.log("Video completed, showing logo");
    setIntroComplete(true);
    setShowBackground(true);
    setLogoVisible(true);
  };

  useEffect(() => {
    if (!logoVisible) return;

    const timer = setTimeout(() => {
      setLogoVisible(false);
      setHeroVisible(true);
    }, 2400);

    return () => clearTimeout(timer);
  }, [logoVisible]);

  useEffect(() => {
    if (introComplete) {
      setHeroVisible(true);
    }
  }, [introComplete]);

  // Fallback: if video doesn't load, skip after 1 second
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!introComplete) {
        console.log("Video timeout, skipping to animation");
        handleVideoComplete();
      }
    }, 10000); // 10 second timeout

    return () => clearTimeout(timeout);
  }, [introComplete]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Big Bang intro video - only show on first visit */}
      {!introComplete && (
        <div className="fixed inset-0 z-50 bg-black">
          <video
            className="h-full w-full object-cover"
            src="/Loading_Video.mp4"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoComplete}
            onError={handleVideoComplete}
          />
        </div>
      )}

      {/* Prismatic Burst background */}
      <AnimatePresence>
        {showBackground && (
          <motion.div
            className="absolute inset-0 z-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <PrismaticBurst
              animationType={ANIMATION_CONFIG.animationType}
              intensity={ANIMATION_CONFIG.intensity}
              speed={ANIMATION_CONFIG.speed}
              distort={ANIMATION_CONFIG.distort}
              paused={ANIMATION_CONFIG.paused}
              offset={ANIMATION_CONFIG.offset}
              hoverDampness={ANIMATION_CONFIG.hoverDampness}
              rayCount={ANIMATION_CONFIG.rayCount}
              mixBlendMode={ANIMATION_CONFIG.mixBlendMode}
              colors={ANIMATION_CONFIG.colors}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {heroVisible && (
        <section className="relative z-10 flex min-h-screen items-center justify-center px-6 py-24">
          <motion.div
            className="flex max-w-3xl flex-col items-center gap-6 text-center"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src="/conflu25White.png"
              alt="Confluence 2025"
              width={360}
              height={180}
              className="h-auto w-[min(80vw,360px)]"
              priority
            />

            <p className="max-w-xl text-lg text-slate-200">
              Cosmic Carnival returns with a stellar line-up of galactic
              showcases, immersive installations, and performances that bend the
              fabric of reality.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm uppercase tracking-[0.3em] text-sky-200/90">
              <span>3 Days</span>
              <span className="hidden sm:inline">•</span>
              <span>20+ Clubs</span>
              <span className="hidden sm:inline">•</span>
              <span>Limitless Energy</span>
            </div>
          </motion.div>
        </section>
      )}

      {/* Logo zoom animation */}
      <AnimatePresence>
        {logoVisible && (
          <motion.div
            className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none"
            initial={{ scale: 1 }}
            animate={{ scale: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.1 }}
          >
            <div
              className="relative w-full max-w-[90vw]"
              style={{
                aspectRatio: "1",
              }}
            >
              <Image
                src="/conflu25White.png"
                alt="Confluence 2025"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
