import React from "react";

interface FixedBackgroundProps {
  imageUrl: string;
  alt?: string;
  opacity?: number; // 0 to 1 (default: 1)
  brightness?: number; // 0 to 2 (default: 1, where 1 = normal)
  blur?: number; // in pixels (default: 0)
  contrast?: number; // 0 to 2 (default: 1)
  saturate?: number; // 0 to 2 (default: 1)
}

/**
 * Fixed background component for the entire site
 * Stays in place while content scrolls over it
 */
export default function FixedBackground({
  imageUrl,
  alt = "Background",
  opacity = 1,
  brightness = 1,
  blur = 0,
  contrast = 1,
  saturate = 1,
}: FixedBackgroundProps) {
  const filterStyles = [
    blur > 0 && `blur(${blur}px)`,
    brightness !== 1 && `brightness(${brightness})`,
    contrast !== 1 && `contrast(${contrast})`,
    saturate !== 1 && `saturate(${saturate})`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className="fixed inset-0 -z-10"
      style={{
        backgroundImage: `url("${imageUrl}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        opacity,
        filter: filterStyles || undefined,
      }}
      role="img"
      aria-label={alt}
    />
  );
}
