import { useEffect, useRef } from "react";

type SectionId = string;

interface UseScrollSectionDetectionProps {
  sectionIds: SectionId[];
  setActiveSection: (id: string) => void;
  homeThreshold?: number; // Viewport height multiplier for home detection
  scrollDebounce?: number; // Debounce time in ms
}

/**
 * Hook to detect which section is currently visible based on scroll position
 * Automatically sets active section as user scrolls
 */
export function useScrollSectionDetection({
  sectionIds,
  setActiveSection,
  homeThreshold = 0.8,
  scrollDebounce = 150,
}: UseScrollSectionDetectionProps) {
  const sectionRefs = useRef<Record<string, HTMLElement | null>>(
    Object.fromEntries(sectionIds.map((id) => [id, null]))
  );
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isUserScrollingRef = useRef(false);

  useEffect(() => {
    const updateActiveSection = () => {
      const scrollY = window.scrollY;

      // If near the top (within threshold), consider it the landing/home page
      if (scrollY < window.innerHeight * homeThreshold) {
        setActiveSection("home");
        return;
      }

      // Calculate navbar offset (mobile: 80px, desktop: 96px)
      const isMobile = window.innerWidth < 640;
      const navbarOffset = isMobile ? 80 : 96;

      // Use scroll position to determine which section should be active
      // Check at navbar height + some extra space from top
      const scrollPosition = scrollY + navbarOffset + 50;
      let activeId: string = sectionIds[0] || "home";

      // Find the section that contains the scroll position
      Object.entries(sectionRefs.current).forEach(([id, element]) => {
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

      // Set new timeout - update after scroll settles
      scrollTimeoutRef.current = setTimeout(() => {
        updateActiveSection();
        isUserScrollingRef.current = false;
      }, scrollDebounce);
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
  }, [sectionIds, setActiveSection, homeThreshold, scrollDebounce]);

  return sectionRefs;
}
