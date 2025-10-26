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

const sectionObserverOptions: IntersectionObserverInit = {
  threshold: [0.15, 0.35, 0.55],
  rootMargin: "-20% 0px -20% 0px",
};

export default function Home() {
  const { setActiveSection } = useActiveSection();
  const sectionRefs = useRef<Record<SectionId, HTMLElement | null>>({
    gallery: null,
    events: null,
    developers: null,
    teams: null,
    sponsors: null,
  });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      let activeId: SectionId | null = null;
      let highestRatio = 0;

      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.intersectionRatio <= highestRatio) {
          return;
        }

        if (entry.target instanceof HTMLElement && entry.target.id) {
          activeId = entry.target.id as SectionId;
          highestRatio = entry.intersectionRatio;
        }
      });

      if (activeId) {
        setActiveSection(activeId);
      }
    }, sectionObserverOptions);

    const elements = Object.values(sectionRefs.current).filter(
      (node): node is HTMLElement => Boolean(node)
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      elements.forEach((element) => observer.unobserve(element));
      observer.disconnect();
    };
  }, [setActiveSection]);

  useEffect(() => {
    setActiveSection("gallery");
  }, [setActiveSection]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-black text-white">
      <LandingPage />

      {SECTION_COMPONENTS.map(({ id, Component }, index) => (
        <Fragment key={id}>
          <div
            aria-hidden
            className={`h-24 w-full bg-gradient-to-b ${
              index === 0
                ? "from-black via-indigo-950/80 to-transparent"
                : "from-transparent via-slate-900/70 to-transparent"
            }`}
          />

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
