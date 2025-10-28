"use client";

import React, { useEffect, useState } from "react";

interface FixedBackgroundProps {
  imageUrl: string;
  mobileImageUrl?: string;
  alt?: string;
  opacity?: number; // 0 to 1 (default: 1)
  brightness?: number; // 0 to 2 (default: 1, where 1 = normal)
  blur?: number; // in pixels (default: 0)
  contrast?: number; // 0 to 2 (default: 1)
  saturate?: number; // 0 to 2 (default: 1)
  rotateOnMobile?: boolean;
  mobileBreakpoint?: number; // px breakpoint for mobile rotation (default: 768)
}

/**
 * Fixed background component for the entire site
 * Stays in place while content scrolls over it
 */
export default function FixedBackground({
  imageUrl,
  mobileImageUrl,
  alt = "Background",
  opacity = 1,
  brightness = 0.7,
  blur = 0,
  contrast = 1,
  saturate = 1,
  rotateOnMobile = false,
  mobileBreakpoint = 768,
}: FixedBackgroundProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const shouldDetectMobile = rotateOnMobile || Boolean(mobileImageUrl);

    if (!shouldDetectMobile) {
      setIsMobile(false);
      return;
    }

    let mounted = true;
    const query = window.matchMedia(`(max-width: ${mobileBreakpoint}px)`);

    const updateMatch = (matches: boolean) => {
      if (mounted) {
        setIsMobile(matches);
      }
    };

    updateMatch(query.matches);

    const listener = (event: MediaQueryListEvent) => updateMatch(event.matches);

    if (typeof query.addEventListener === "function") {
      query.addEventListener("change", listener);
    } else if (typeof query.addListener === "function") {
      query.addListener(listener);
    }

    return () => {
      mounted = false;
      if (typeof query.removeEventListener === "function") {
        query.removeEventListener("change", listener);
      } else if (typeof query.removeListener === "function") {
        query.removeListener(listener);
      }
    };
  }, [mobileBreakpoint, mobileImageUrl, rotateOnMobile]);

  const filterStyles = [
    blur > 0 && `blur(${blur}px)`,
    brightness !== 1 && `brightness(${brightness})`,
    contrast !== 1 && `contrast(${contrast})`,
    saturate !== 1 && `saturate(${saturate})`,
  ]
    .filter(Boolean)
    .join(" ");

  const transform =
    rotateOnMobile && isMobile && !mobileImageUrl
      ? "rotate(90deg) scale(1.15)"
      : undefined;

  const activeImageUrl = isMobile && mobileImageUrl ? mobileImageUrl : imageUrl;

  return (
    <div
      className="fixed inset-0 -z-10"
      style={{
        backgroundImage: `url("${activeImageUrl}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        opacity,
        filter: filterStyles || undefined,
        transform,
        transformOrigin: transform ? "center center" : undefined,
        willChange: transform ? "transform" : undefined,
      }}
      role="img"
      aria-label={alt}
    />
  );
}
