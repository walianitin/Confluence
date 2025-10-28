"use client";

import { type CSSProperties, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import PrismaticBurst from "../components/PrismaticBurst";

const ANIMATION_CONFIG = {
  animationType: "rotate3d" as const,
  intensity: 4.5,
  speed: 0.4,
  distort: 0,
  rayCount: 30,
  mixBlendMode: "lighten" as const,
  colors: ["#ff0000ff", "#ffdd00ff", "#8B00FF"],
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
  animationHeight: "160vh", // Can be larger than sectionHeight

  // Width multiplier to keep burst visible on tall portrait breakpoints
  // Clipped to viewport width to prevent horizontal scroll
  animationWidth: "min(100vw, max(100vw, 140vh))",

  // Whether animation should be fixed or scroll with content
  // 'absolute' = scrolls naturally with page
  // 'fixed' = stays in place (not recommended for this use case)
  animationPosition: "absolute" as const,
};

// Vignette overlay configuration for smooth transition
const VIGNETTE_CONFIG = {
  // Overall opacity of the animation background (0 to 1)
  // Lower = more transparent, smoother blend with wallpaper
  backgroundOpacity: 0.9,

  // Radial gradient vignette settings
  vignette: {
    // Enable/disable edge fade effect
    enabled: true,

    // Inner radius where fade starts (0 to 100, percentage from center)
    // Higher = smaller bright center area
    innerRadius: 40,

    // Outer radius where fade ends (0 to 100, percentage from center)
    // Higher = fade extends further from center
    outerRadius: 50,

    // Edge darkness/transparency (0 to 1)
    // Higher = darker/more transparent edges
    edgeOpacity: 0,

    // Center brightness (0 to 1)
    // Lower = allows wallpaper to show through center
    centerOpacity: 1,
  },
};

// ===== FINE-TUNING CONFIGURATION =====
// Adjust these values to customize the intro animation timing and appearance
const INTRO_ANIMATION_CONFIG = {
  // === TIMING ===
  // Duration logo stays at full width before shrinking (milliseconds)
  logoHoldDuration: 50, // 2 seconds

  // Duration of logo shrinking animation (milliseconds)
  logoShrinkDuration: 50, // 2 seconds

  // Fallback timeout if video doesn't play (milliseconds)
  videoTimeout: 15000, // 15 seconds

  // === LOGO SIZES ===
  // Initial logo width (full screen)
  logoInitialWidth: "150vw",

  // Final logo width on MOBILE (after shrinking)
  logoFinalWidthMobile: "80vw", // 80% of viewport width

  // Final logo width on DESKTOP (after shrinking)
  logoFinalWidthDesktop: "70vw", // 70% of viewport width

  // Intermediate keyframe during shrink (for smoother animation)
  // Mobile: goes 100vw → this → logoFinalWidthMobile
  logoMidWidthMobile: "90vw",

  // Desktop: goes 100vw → this → logoFinalWidthDesktop
  logoMidWidthDesktop: "80vw",

  // === ANIMATION EFFECTS ===
  // Animation easing curve for logo shrink
  // Options: "linear", "easeIn", "easeOut", "easeInOut", "circIn", "circOut",
  // "circInOut", "backIn", "backOut", "backInOut", "anticipate"
  shrinkEasing: "backOut" as const, // Subtle bounce/overshoot effect

  // Scale animation during shrink (1 = no scale)
  // Creates zoom effect independent of width change
  scaleAnimation: {
    enabled: true,
    initial: 1,
    mid: 1.05, // Slight grow before shrink
    final: 1,
  },

  // Rotation animation during shrink (degrees)
  rotationAnimation: {
    enabled: false,
    degrees: 0, // Try small values like 2 or -2 for subtle tilt
  },

  // === VERTICAL OFFSET ===
  // Vertical offset from center (positive = down, negative = up)
  // Can use px, vh, or % units
  verticalOffset: "0vh", // No offset by default (perfectly centered)

  // Example values to try:
  // "5vh"    - move 5% of viewport down
  // "-10vh"  - move 10% of viewport up
  // "50px"   - move 50 pixels down
  // "-3%"    - move 3% up
};

export default function LandingPage() {
  const [videoComplete, setVideoComplete] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [logoShrinking, setLogoShrinking] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const baseBackgroundStyle: CSSProperties = {
    position: LAYOUT_CONFIG.animationPosition,
    top: "50%",
    left: "50%",
    height: LAYOUT_CONFIG.animationHeight,
    width: LAYOUT_CONFIG.animationWidth,
    transform: "translate(-50%, -50%)",
    overflow: "hidden",
  };

  const handleVideoComplete = () => {
    setVideoComplete(true);
    // Show logo immediately after video ends
    setShowLogo(true);

    // After configured hold duration, start shrinking logo and show animation
    setTimeout(() => {
      setLogoShrinking(true);
      setShowBackground(true);
    }, INTRO_ANIMATION_CONFIG.logoHoldDuration);
  };

  // Lock scroll until logo finishes shrinking
  useEffect(() => {
    if (!videoComplete || !logoShrinking) {
      // Prevent scrolling
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      // Reset scroll position to top
      window.scrollTo(0, 0);
    } else {
      // Re-enable scrolling when logo starts shrinking
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      // Cleanup: ensure scroll is re-enabled
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [videoComplete, logoShrinking]);

  // Fallback timeout in case video doesn't load/play
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!videoComplete) {
        handleVideoComplete();
      }
    }, INTRO_ANIMATION_CONFIG.videoTimeout);

    return () => clearTimeout(timeout);
  }, [videoComplete]);

  return (
    <div
      className="relative w-full max-w-[100vw] overflow-x-hidden overflow-y-hidden"
      style={{ minHeight: LAYOUT_CONFIG.sectionHeight }}
    >
      {/* Container for centering both animation and logo */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          transform: `translateY(${INTRO_ANIMATION_CONFIG.verticalOffset})`,
        }}
      >
        <AnimatePresence>
          {showBackground && (
            <motion.div
              className="absolute inset-0 z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: VIGNETTE_CONFIG.backgroundOpacity }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={
                VIGNETTE_CONFIG.vignette.enabled
                  ? {
                      ...baseBackgroundStyle,
                      maskImage: `radial-gradient(circle at center, rgba(0,0,0,${VIGNETTE_CONFIG.vignette.centerOpacity}) ${VIGNETTE_CONFIG.vignette.innerRadius}%, rgba(0,0,0,${VIGNETTE_CONFIG.vignette.edgeOpacity}) ${VIGNETTE_CONFIG.vignette.outerRadius}%)`,
                      WebkitMaskImage: `radial-gradient(circle at center, rgba(0,0,0,${VIGNETTE_CONFIG.vignette.centerOpacity}) ${VIGNETTE_CONFIG.vignette.innerRadius}%, rgba(0,0,0,${VIGNETTE_CONFIG.vignette.edgeOpacity}) ${VIGNETTE_CONFIG.vignette.outerRadius}%)`,
                    }
                  : baseBackgroundStyle
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
          {showLogo && (
            <motion.div
              className="absolute z-10 flex items-center justify-center"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <motion.div
                className="relative"
                style={{ aspectRatio: "3 / 1" }}
                initial={{
                  width: INTRO_ANIMATION_CONFIG.logoInitialWidth,
                  scale: INTRO_ANIMATION_CONFIG.scaleAnimation.enabled
                    ? INTRO_ANIMATION_CONFIG.scaleAnimation.initial
                    : 1,
                  rotate: INTRO_ANIMATION_CONFIG.rotationAnimation.enabled
                    ? 0
                    : 0,
                }}
                animate={{
                  width: logoShrinking
                    ? isMobile
                      ? [
                          INTRO_ANIMATION_CONFIG.logoInitialWidth,
                          INTRO_ANIMATION_CONFIG.logoMidWidthMobile,
                          INTRO_ANIMATION_CONFIG.logoFinalWidthMobile,
                        ]
                      : [
                          INTRO_ANIMATION_CONFIG.logoInitialWidth,
                          INTRO_ANIMATION_CONFIG.logoMidWidthDesktop,
                          INTRO_ANIMATION_CONFIG.logoFinalWidthDesktop,
                        ]
                    : INTRO_ANIMATION_CONFIG.logoInitialWidth,
                  scale:
                    logoShrinking &&
                    INTRO_ANIMATION_CONFIG.scaleAnimation.enabled
                      ? [
                          INTRO_ANIMATION_CONFIG.scaleAnimation.initial,
                          INTRO_ANIMATION_CONFIG.scaleAnimation.mid,
                          INTRO_ANIMATION_CONFIG.scaleAnimation.final,
                        ]
                      : INTRO_ANIMATION_CONFIG.scaleAnimation.initial,
                  rotate:
                    logoShrinking &&
                    INTRO_ANIMATION_CONFIG.rotationAnimation.enabled
                      ? [
                          0,
                          INTRO_ANIMATION_CONFIG.rotationAnimation.degrees / 2,
                          INTRO_ANIMATION_CONFIG.rotationAnimation.degrees,
                        ]
                      : 0,
                }}
                transition={{
                  duration: logoShrinking
                    ? INTRO_ANIMATION_CONFIG.logoShrinkDuration / 1000
                    : 0,
                  ease: INTRO_ANIMATION_CONFIG.shrinkEasing,
                  times: logoShrinking ? [0, 0.6, 1] : undefined,
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!videoComplete && (
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
    </div>
  );
}
