"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import PrismaticBurst from "../components/PrismaticBurst";

const ANIMATION_CONFIG = {
  animationType: "rotate3d" as const,
  intensity: 3.5,
  speed: 0.4,
  distort: 2.5,
  rayCount: 32,
  mixBlendMode: "lighten" as const,
  colors: [
    "#FF0080",
    "#FF00FF",
    "#8B00FF",
    "#4169E1",
    "#00BFFF",
    "#00FFFF",
    "#FFFFFF",
  ],
  hoverDampness: 0.15,
  offset: { x: 0, y: 0 },
  paused: false,
};

// Layout configuration for landing page dimensions
const LAYOUT_CONFIG = {
  // Landing page section height (viewport height units)
  // Increase to extend animation visibility before cutoff
  // 100vh = one full screen, 150vh = 1.5 screens, etc.
  sectionHeight: "120vh",

  // Animation background height extension
  // Extends the PrismaticBurst animation beyond the page bounds
  // Use this to avoid abrupt cutoff when scrolling
  animationHeight: "120vh", // Can be larger than sectionHeight

  // Whether animation should be fixed or scroll with content
  // 'absolute' = scrolls naturally with page
  // 'fixed' = stays in place (not recommended for this use case)
  animationPosition: "absolute" as const,
};

// Vignette overlay configuration for smooth transition
const VIGNETTE_CONFIG = {
  // Overall opacity of the animation background (0 to 1)
  // Lower = more transparent, smoother blend with wallpaper
  backgroundOpacity: 0.8,

  // Radial gradient vignette settings
  vignette: {
    // Enable/disable edge fade effect
    enabled: true,

    // Inner radius where fade starts (0 to 100, percentage from center)
    // Higher = smaller bright center area
    innerRadius: 40,

    // Outer radius where fade ends (0 to 100, percentage from center)
    // Higher = fade extends further from center
    outerRadius: 60,

    // Edge darkness/transparency (0 to 1)
    // Higher = darker/more transparent edges
    edgeOpacity: 0,

    // Center brightness (0 to 1)
    // Lower = allows wallpaper to show through center
    centerOpacity: 1,
  },
};

export default function LandingPage() {
  const [introComplete, setIntroComplete] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [showHero, setShowHero] = useState(false);

  const handleVideoComplete = () => {
    setIntroComplete(true);
    setShowBackground(true);
    setShowHero(true);
  };

  // Lock scroll during video playback
  useEffect(() => {
    if (!introComplete) {
      // Prevent scrolling
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      // Reset scroll position to top
      window.scrollTo(0, 0);
    } else {
      // Re-enable scrolling when video completes
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      // Cleanup: ensure scroll is re-enabled
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [introComplete]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!introComplete) {
        handleVideoComplete();
      }
    }, 10000);

    return () => clearTimeout(timeout);
  }, [introComplete]);

  return (
    <div
      className="relative w-full"
      style={{ minHeight: LAYOUT_CONFIG.sectionHeight }}
    >
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

      <AnimatePresence>
        {showBackground && (
          <motion.div
            className="z-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: VIGNETTE_CONFIG.backgroundOpacity }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={
              VIGNETTE_CONFIG.vignette.enabled
                ? {
                    position: LAYOUT_CONFIG.animationPosition,
                    top: 0,
                    left: 0,
                    right: 0,
                    height: LAYOUT_CONFIG.animationHeight,
                    maskImage: `radial-gradient(circle at center, rgba(0,0,0,${VIGNETTE_CONFIG.vignette.centerOpacity}) ${VIGNETTE_CONFIG.vignette.innerRadius}%, rgba(0,0,0,${VIGNETTE_CONFIG.vignette.edgeOpacity}) ${VIGNETTE_CONFIG.vignette.outerRadius}%)`,
                    WebkitMaskImage: `radial-gradient(circle at center, rgba(0,0,0,${VIGNETTE_CONFIG.vignette.centerOpacity}) ${VIGNETTE_CONFIG.vignette.innerRadius}%, rgba(0,0,0,${VIGNETTE_CONFIG.vignette.edgeOpacity}) ${VIGNETTE_CONFIG.vignette.outerRadius}%)`,
                  }
                : {
                    position: LAYOUT_CONFIG.animationPosition,
                    top: 0,
                    left: 0,
                    right: 0,
                    height: LAYOUT_CONFIG.animationHeight,
                  }
            }
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

      <AnimatePresence>
        {showHero && (
          <motion.section
            className="relative z-10 flex min-h-screen w-full items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              className="relative"
              style={{ aspectRatio: "3 / 1" }}
              initial={{ opacity: 0, width: "100vw" }}
              animate={{ opacity: 1, width: "70vw" }}
              exit={{ opacity: 0 }}
              transition={{
                width: { duration: 2, ease: "easeInOut" },
                opacity: { duration: 0.6, ease: "easeOut" },
              }}
            >
              <Image
                src="/conflu25White.png"
                alt="Confluence 2025"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
