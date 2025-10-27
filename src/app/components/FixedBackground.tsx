import React from "react";

interface FixedBackgroundProps {
  imageUrl: string;
  alt?: string;
}

/**
 * Fixed background component for the entire site
 * Stays in place while content scrolls over it
 */
export default function FixedBackground({
  imageUrl,
  alt = "Background",
}: FixedBackgroundProps) {
  return (
    <div
      className="fixed inset-0 -z-10"
      style={{
        backgroundImage: `url("${imageUrl}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      role="img"
      aria-label={alt}
    />
  );
}
