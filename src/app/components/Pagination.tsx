"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  getPaginationConfig,
  type SectionType,
} from "../utils/paginationConfig";
import { glassPaginationButton } from "./glassTokens";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  scrollToTopOnChange?: boolean;
  sectionRef?: React.RefObject<HTMLElement | null>;
}

/**
 * Pagination component with Previous/Next buttons and page indicators
 * Only renders if totalPages > 1
 */
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
  scrollToTopOnChange = true,
  sectionRef,
}: PaginationProps) {
  // Don't render if only one page
  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      if (scrollToTopOnChange) {
        // Delay scroll to allow content to update
        setTimeout(() => scrollToSection(), 50);
      }
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      if (scrollToTopOnChange) {
        // Delay scroll to allow content to update
        setTimeout(() => scrollToSection(), 50);
      }
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
    if (scrollToTopOnChange) {
      // Delay scroll to allow content to update
      setTimeout(() => scrollToSection(), 50);
    }
  };

  const scrollToSection = () => {
    if (sectionRef?.current) {
      // Get the absolute position of the section
      const sectionTop =
        sectionRef.current.getBoundingClientRect().top + window.scrollY;

      // Scroll to the section with a small offset for better UX
      window.scrollTo({
        top: sectionTop - 80, // 80px offset for navbar/spacing
        behavior: "smooth",
      });
    } else {
      // Fallback: scroll to top of the page
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <motion.div
      className={`flex flex-wrap items-center justify-center gap-3 sm:gap-4 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`rounded-lg px-4 sm:px-6 py-2.5 text-sm font-medium !text-white whitespace-nowrap ${glassPaginationButton}`}
        style={{ color: "#ffffff" }}
        aria-label="Previous page"
      >
        Previous
      </button>

      {/* Page Indicators (dots) and Counter - wrapped together */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Page Indicators (dots) */}
        <div className="flex items-center gap-2">
          {totalPages <= 7 ? (
            // Show all dots if 7 or fewer pages
            Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageClick(i + 1)}
                className={`h-2.5 rounded-full transition-all ${
                  currentPage === i + 1
                    ? "w-8 !bg-white"
                    : "w-2.5 !bg-white/40 hover:!bg-white/60"
                }`}
                style={{
                  backgroundColor:
                    currentPage === i + 1 ? "#ffffff" : "rgba(255,255,255,0.4)",
                }}
                aria-label={`Go to page ${i + 1}`}
                aria-current={currentPage === i + 1 ? "page" : undefined}
              />
            ))
          ) : (
            // Show condensed dots with ellipsis for many pages
            <>
              {/* First page */}
              <button
                onClick={() => handlePageClick(1)}
                className={`h-2.5 rounded-full transition-all ${
                  currentPage === 1
                    ? "w-8 !bg-white"
                    : "w-2.5 !bg-white/40 hover:!bg-white/60"
                }`}
                style={{
                  backgroundColor:
                    currentPage === 1 ? "#ffffff" : "rgba(255,255,255,0.4)",
                }}
                aria-label="Go to page 1"
                aria-current={currentPage === 1 ? "page" : undefined}
              />

              {/* Left ellipsis */}
              {currentPage > 3 && (
                <span
                  className="!text-white/60 text-xs"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  ···
                </span>
              )}

              {/* Middle pages */}
              {Array.from({ length: totalPages }, (_, i) => {
                const page = i + 1;
                const showPage =
                  page === currentPage ||
                  (page >= currentPage - 1 && page <= currentPage + 1);

                if (!showPage || page === 1 || page === totalPages) return null;

                return (
                  <button
                    key={i}
                    onClick={() => handlePageClick(page)}
                    className={`h-2.5 rounded-full transition-all ${
                      currentPage === page
                        ? "w-8 !bg-white"
                        : "w-2.5 !bg-white/40 hover:!bg-white/60"
                    }`}
                    style={{
                      backgroundColor:
                        currentPage === page
                          ? "#ffffff"
                          : "rgba(255,255,255,0.4)",
                    }}
                    aria-label={`Go to page ${page}`}
                    aria-current={currentPage === page ? "page" : undefined}
                  />
                );
              })}

              {/* Right ellipsis */}
              {currentPage < totalPages - 2 && (
                <span
                  className="!text-white/60 text-xs"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  ···
                </span>
              )}

              {/* Last page */}
              <button
                onClick={() => handlePageClick(totalPages)}
                className={`h-2.5 rounded-full transition-all ${
                  currentPage === totalPages
                    ? "w-8 !bg-white"
                    : "w-2.5 !bg-white/40 hover:!bg-white/60"
                }`}
                style={{
                  backgroundColor:
                    currentPage === totalPages
                      ? "#ffffff"
                      : "rgba(255,255,255,0.4)",
                }}
                aria-label={`Go to page ${totalPages}`}
                aria-current={currentPage === totalPages ? "page" : undefined}
              />
            </>
          )}
        </div>

        {/* Page Counter */}
        <div
          className="text-sm font-medium !text-white/90 whitespace-nowrap min-w-[3rem] text-center"
          style={{ color: "rgba(255,255,255,0.9)" }}
        >
          {currentPage} / {totalPages}
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`rounded-lg px-4 sm:px-6 py-2.5 text-sm font-medium !text-white whitespace-nowrap ${glassPaginationButton}`}
        style={{ color: "#ffffff" }}
        aria-label="Next page"
      >
        Next
      </button>
    </motion.div>
  );
}

/**
 * Hook to manage pagination state with responsive items per page
 * Reads configuration from CSS variables in globals.css
 *
 * @param items - Array of items to paginate
 * @param section - Section type ('events', 'teams', 'gallery', 'developers', 'default')
 *                 If not provided, uses itemsPerPage parameter
 * @param itemsPerPage - (Optional) Number of items per page or object with mobile/desktop counts
 *                       Only used if section is not specified
 * @returns { currentItems, currentPage, totalPages, setCurrentPage }
 *
 * @example
 * // Using CSS variable configuration (recommended)
 * const pagination = usePagination(allEvents, 'events');
 *
 * // Using manual configuration (legacy)
 * const pagination = usePagination(allEvents, undefined, { mobile: 5, desktop: 9 });
 */
export function usePagination<T>(
  items: T[],
  section?: SectionType,
  itemsPerPage?: number | { mobile: number; desktop: number }
) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [configFromCSS, setConfigFromCSS] = useState({ mobile: 9, desktop: 9 });

  // Load pagination config from CSS variables if section is specified
  useEffect(() => {
    if (section) {
      const config = getPaginationConfig(section);
      setConfigFromCSS(config);
    }
  }, [section]);

  // Detect mobile viewport
  useEffect(() => {
    const shouldDetectMobile =
      section !== undefined || typeof itemsPerPage === "object";

    if (shouldDetectMobile) {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768); // 768px is md breakpoint
      };

      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }
  }, [itemsPerPage, section]);

  // Determine items per page based on screen size
  const currentItemsPerPage = (() => {
    // Priority 1: Use section-based CSS config
    if (section) {
      return isMobile ? configFromCSS.mobile : configFromCSS.desktop;
    }

    // Priority 2: Use manual itemsPerPage parameter
    if (typeof itemsPerPage === "object") {
      return isMobile ? itemsPerPage.mobile : itemsPerPage.desktop;
    }

    // Priority 3: Use simple number
    if (typeof itemsPerPage === "number") {
      return itemsPerPage;
    }

    // Fallback: default value
    return 9;
  })();

  const totalPages = Math.ceil(items.length / currentItemsPerPage);

  const startIndex = (currentPage - 1) * currentItemsPerPage;
  const endIndex = startIndex + currentItemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  // Reset to page 1 if items change
  const itemsRef = useRef(items.length);
  useEffect(() => {
    if (items.length !== itemsRef.current) {
      setCurrentPage(1);
      itemsRef.current = items.length;
    }
  }, [items.length]);

  // Reset to page 1 if items per page changes (mobile/desktop switch)
  const itemsPerPageRef = useRef(currentItemsPerPage);
  useEffect(() => {
    if (currentItemsPerPage !== itemsPerPageRef.current) {
      setCurrentPage(1);
      itemsPerPageRef.current = currentItemsPerPage;
    }
  }, [currentItemsPerPage]);

  return {
    currentItems,
    currentPage,
    totalPages,
    setCurrentPage,
  };
}
