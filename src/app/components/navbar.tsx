"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { glassPanel } from "./glassTokens";
import { useActiveSection } from "./ActiveSectionContext";

const navLinks = [
  { name: "Home", id: "home", link: "/" },
  { name: "Gallery", id: "gallery", link: "/Gallery" },
  { name: "Events", id: "events", link: "/Events" },
  { name: "Developers", id: "developers", link: "/Developers" },
  { name: "Teams", id: "teams", link: "/Teams" },
  { name: "Sponsors", id: "sponsors", link: "/Sponsors" },
];

const GlassNavBar: React.FC = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, height: 0 });
  const [indicatorReady, setIndicatorReady] = useState(false);
  const pathname = usePathname();
  const { activeSection, setActiveSection } = useActiveSection();
  const tabsContainerRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const isHome = pathname === "/";

  const getActiveLink = () => {
    if (isHome) {
      const activeFromSection = navLinks.find(
        (link) => link.id === activeSection
      );
      return activeFromSection ?? navLinks[0];
    }

    const active = navLinks.find((link) => link.link === pathname);
    return active ?? navLinks[0];
  };

  const updateIndicator = (linkId: string) => {
    const tabElement = tabRefs.current[linkId];
    const container = tabsContainerRef.current;

    if (!tabElement || !container) {
      return;
    }

    const tabRect = tabElement.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const left = tabRect.left - containerRect.left;
    const width = tabRect.width;
    const height = tabRect.height;

    setIndicator({ left, width, height });
    setIndicatorReady(true);
  };

  useEffect(() => {
    const active = getActiveLink();
    if (!active) return;

    const raf = requestAnimationFrame(() => {
      updateIndicator(active.id);
    });

    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, activeSection, isHome]);

  useEffect(() => {
    const handleResize = () => {
      const active = getActiveLink();
      if (!active) return;
      updateIndicator(active.id);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, activeSection, isHome]);

  return (
    <>
      <nav
        onMouseLeave={() => setHoveredLink(null)}
        className={`fixed top-2 left-1/2 z-50 w-[min(96vw,800px)] -translate-x-1/2 flex flex-col items-center gap-2 overflow-hidden rounded-2xl px-3 py-2 text-xs whitespace-nowrap sm:top-4 sm:flex-row sm:justify-between sm:gap-1.5 sm:rounded-full sm:px-3 sm:py-1.5 sm:text-sm md:gap-2 md:px-4 md:py-2 ${glassPanel}`}
        style={{ scrollbarGutter: "stable both-edges" }}
      >
        <Link
          href="/"
          className="flex shrink-0 items-center justify-center px-1 py-1 sm:px-2 sm:py-0 md:px-3"
          onClick={(event) => {
            if (isHome) {
              event.preventDefault();
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
              setActiveSection("home");
              updateIndicator("home");
            }
          }}
        >
          <Image
            src="/conflu25White.png"
            width={120}
            height={40}
            alt="Confluence Logo"
            className="h-6 w-auto sm:h-8 md:h-10"
            priority
          />
        </Link>
        <div
          ref={tabsContainerRef}
          className="tabs-scroll relative flex flex-1 w-full items-center justify-center gap-0.5 overflow-x-auto overflow-y-hidden sm:gap-1 md:gap-1.5"
          style={{
            minHeight: indicatorReady ? indicator.height : undefined,
            scrollbarWidth: "none",
          }}
        >
          {indicatorReady && (
            <motion.div
              aria-hidden
              initial={false}
              animate={{
                left: indicator.left,
                width: indicator.width,
              }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 30,
                mass: 0.8,
                restDelta: 0.001,
              }}
              className="pointer-events-none absolute top-1/2 -z-10 border border-sky-400/40 bg-sky-500/30"
              style={{
                transform: "translateY(-50%)",
                height: `${indicator.height}px`,
                borderRadius: indicator.height
                  ? `${indicator.height / 2}px`
                  : "999px",
              }}
            />
          )}

          {navLinks.map((link) => {
            const isActive = isHome
              ? activeSection === link.id
              : pathname === link.link;

            return (
              <Link
                key={link.id}
                href={link.link}
                ref={(el) => {
                  tabRefs.current[link.id] = el;
                }}
                onMouseEnter={() => setHoveredLink(link.id)}
                onFocus={() => setHoveredLink(link.id)}
                onMouseLeave={() => setHoveredLink(null)}
                onBlur={() => setHoveredLink(null)}
                onClick={(event) => {
                  if (isHome) {
                    event.preventDefault();

                    // Special handling for Home - scroll to top
                    if (link.id === "home") {
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    } else {
                      const section = document.getElementById(link.id);
                      if (section) {
                        section.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }
                    }
                  }

                  updateIndicator(link.id);

                  if (isHome) {
                    setActiveSection(link.id);
                  }
                }}
                className={`relative flex items-center justify-center rounded-full px-2.5 py-1.5 transition-colors capitalize text-[11px] sm:text-xs sm:px-3 sm:py-1.5 md:text-sm md:px-4 md:py-2 ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-slate-100/90 hover:text-white"
                }`}
              >
                {hoveredLink === link.id && !isActive && (
                  <motion.span
                    layoutId="hover-pill"
                    className="pointer-events-none absolute inset-0 rounded-full bg-white/10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
      <style jsx>{`
        .tabs-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default GlassNavBar;
