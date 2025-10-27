"use client";

import { Fragment, useEffect, useRef } from "react";
import LandingPage from "./pages/LandingPage";
import GalleryPage from "./Gallery/page";
import EventsPage from "./Events/page";
import DevelopersPage from "./Developers/page";
import TeamsPage from "./Teams/page";
import SponsorsPage from "./Sponsors/page";
import { useActiveSection } from "./components/ActiveSectionContext";

const SECTION_COMPONENTS = [
  { id: "gallery", Component: GalleryPage },
  { id: "events", Component: EventsPage },
  { id: "developers", Component: DevelopersPage },
  { id: "teams", Component: TeamsPage },
  { id: "sponsors", Component: SponsorsPage },
] as const;

type SectionId = (typeof SECTION_COMPONENTS)[number]["id"];

export default function Home() {
  const { setActiveSection } = useActiveSection();
  const sectionRefs = useRef<Record<SectionId, HTMLElement | null>>({
    gallery: null,
    events: null,
    developers: null,
    teams: null,
    sponsors: null,
  });
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isUserScrollingRef = useRef(false);

  useEffect(() => {
    const updateActiveSection = () => {
      const scrollY = window.scrollY;

      // If near the top (first ~80vh), consider it the landing/home page
      if (scrollY < window.innerHeight * 0.8) {
        setActiveSection("home");
        return;
      }

      // Use scroll position to determine which section should be active
      const scrollPosition = scrollY + window.innerHeight / 3; // Check at 1/3 from top
      let activeId: SectionId = "gallery";

      // Find the section that contains the scroll position
      (
        Object.entries(sectionRefs.current) as [SectionId, HTMLElement | null][]
      ).forEach(([id, element]) => {
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const elementTop = scrollY + rect.top;
        const elementBottom = elementTop + rect.height;

        // If scroll position is within this section
        if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
          activeId = id;
        }
      });

      setActiveSection(activeId);
    };

    // Debounced scroll handler - waits for scroll to settle
    const handleScroll = () => {
      isUserScrollingRef.current = true;

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set new timeout - update after scroll settles (150ms of no scrolling)
      scrollTimeoutRef.current = setTimeout(() => {
        updateActiveSection();
        isUserScrollingRef.current = false;
      }, 150);
    };

    // Initial update
    setTimeout(updateActiveSection, 100);

    // Listen to scroll
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [setActiveSection]);

  return (
    <div className="relative flex min-h-screen w-full flex-col text-white">
      {/* Fixed background for entire site except during landing video */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: 'url("/bg-wallpaper.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <LandingPage />

      {SECTION_COMPONENTS.map(({ id, Component }, index) => (
        <Fragment key={id}>
          <section
            id={id}
            ref={(node) => {
              sectionRefs.current[id] = node;
            }}
            className="relative scroll-mt-[120px]"
          >
            <Component />
          </section>
        </Fragment>
      ))}
    </div>
  );
}
