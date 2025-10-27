"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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
      className={`flex items-center justify-center gap-4 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="rounded-lg bg-white/10 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white/10"
        aria-label="Previous page"
      >
        Previous
      </button>

      {/* Page Indicators (dots) */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageClick(i + 1)}
            className={`h-2.5 rounded-full transition-all ${
              currentPage === i + 1
                ? "w-8 bg-white"
                : "w-2.5 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to page ${i + 1}`}
            aria-current={currentPage === i + 1 ? "page" : undefined}
          />
        ))}
      </div>

      {/* Page Counter */}
      <div className="text-sm font-medium text-white/80">
        {currentPage} / {totalPages}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="rounded-lg bg-white/10 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white/10"
        aria-label="Next page"
      >
        Next
      </button>
    </motion.div>
  );
}

/**
 * Hook to manage pagination state
 * @param items - Array of items to paginate
 * @param itemsPerPage - Number of items per page (default: 9)
 * @returns { currentItems, currentPage, totalPages, setCurrentPage }
 */
export function usePagination<T>(items: T[], itemsPerPage: number = 9) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  // Reset to page 1 if items change
  const itemsRef = useRef(items.length);
  useEffect(() => {
    if (items.length !== itemsRef.current) {
      setCurrentPage(1);
      itemsRef.current = items.length;
    }
  }, [items.length]);

  return {
    currentItems,
    currentPage,
    totalPages,
    setCurrentPage,
  };
}
