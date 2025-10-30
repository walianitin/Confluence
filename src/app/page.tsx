"use client";

import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import { useActiveSection } from "./components/ActiveSectionContext";
import { useScrollSectionDetection } from "./hooks/useScrollSectionDetection";
import FixedBackground from "./components/FixedBackground";
import ScrollableSections from "./components/ScrollableSections";
import { SECTION_COMPONENTS, SECTION_IDS } from "./config/sections";
import Preloader from "./components/Preloader";

export default function Home() {
  const { setActiveSection } = useActiveSection();
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  // Automatic section detection based on scroll position
  const sectionRefs = useScrollSectionDetection({
    sectionIds: SECTION_IDS,
    setActiveSection,
    homeThreshold: 0.8, // Consider "home" if within first 80% of viewport
    scrollDebounce: 150, // Wait 150ms after scroll stops before updating
  });

  return (
    <>
      {/* Preloader - shown until all assets are loaded */}
      {!assetsLoaded && <Preloader onComplete={() => setAssetsLoaded(true)} />}

      {/* Main content - rendered but hidden until assets loaded */}
      <div
        className={`relative flex min-h-screen w-full max-w-[100vw] flex-col overflow-x-hidden text-white transition-opacity duration-500 ${
          assetsLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Fixed background wallpaper */}
        <FixedBackground
          imageUrl="/bg-wallpaper.jpg"
          mobileImageUrl="/bg-wallpaper-vertical.jpg"
          alt="Confluence background"
        />

        {/* Landing page with intro video and animation */}
        <LandingPage />

        {/* Scrollable page sections */}
        <ScrollableSections
          sections={SECTION_COMPONENTS}
          sectionRefs={sectionRefs}
        />
      </div>
    </>
  );
}
