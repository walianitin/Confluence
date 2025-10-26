"use client";

import Image from "next/image";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MutableRefObject,
  type ReactNode,
} from "react";
import { gsap } from "gsap";

export interface BentoCardProps {
  color?: string;
  title?: string;
  description?: string;
  label?: string;
  image?: string;
  textAutoHide?: boolean;
  disableAnimations?: boolean;
}

export interface BentoProps {
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  enableTilt?: boolean;
  glowColor?: string;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
  cards?: BentoCardProps[];
  layoutVariant?: number;
  className?: string;
}

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = "132, 0, 255";
const MOBILE_BREAKPOINT = 768;

const cardData: BentoCardProps[] = [
  {
    color: "#060010",
    title: "Analytics",
    description: "Track user behavior",
    label: "Insights",
    image: "/sadf.jpg",
  },
  {
    color: "#060010",
    title: "Dashboard",
    description: "Centralized data view",
    label: "Overview",
    image: "/sadf.jpg",
  },
  {
    color: "#060010",
    title: "Collaboration",
    description: "Work together seamlessly",
    label: "Teamwork",
    image: "/sadf.jpg",
  },
  {
    color: "#060010",
    title: "Automation",
    description: "Streamline workflows",
    label: "Efficiency",
    image: "/sadf.jpg",
  },
  {
    color: "#060010",
    title: "Integration",
    description: "Connect favorite tools",
    label: "Connectivity",
    image: "/sadf.jpg",
  },
  {
    color: "#060010",
    title: "Security",
    description: "Enterprise-grade protection",
    label: "Protection",
    image: "/sadf.jpg",
  },
];

type TimeoutHandle = ReturnType<typeof setTimeout>;

const createParticleElement = (
  x: number,
  y: number,
  color: string = DEFAULT_GLOW_COLOR
): HTMLDivElement => {
  const el = document.createElement("div");
  el.className = "particle";
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75,
});

const updateCardGlowProperties = (
  card: HTMLElement,
  mouseX: number,
  mouseY: number,
  glow: number,
  radius: number
) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty("--glow-x", `${relativeX}%`);
  card.style.setProperty("--glow-y", `${relativeY}%`);
  card.style.setProperty("--glow-intensity", glow.toString());
  card.style.setProperty("--glow-radius", `${radius}px`);
};

interface ParticleCardProps {
  children: ReactNode;
  className?: string;
  disableAnimations?: boolean;
  style?: CSSProperties;
  particleCount?: number;
  glowColor?: string;
  enableTilt?: boolean;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}

const ParticleCard = ({
  children,
  className = "",
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false,
}: ParticleCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<TimeoutHandle[]>([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef<HTMLDivElement[]>([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(
        Math.random() * width,
        Math.random() * height,
        glowColor
      )
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();

    particlesRef.current.forEach((particle) => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "back.in(1.7)",
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        },
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;

    if (!particlesInitialized.current) {
      initializeParticles();
    }

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const clone = particle.cloneNode(true) as HTMLDivElement;
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(
          clone,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
        );

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });

        gsap.to(clone, {
          opacity: 0.3,
          duration: 1.5,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        });
      }, index * 100);

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;

    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 5,
          rotateY: 5,
          duration: 0.3,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      if (enableMagnetism) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.05;
        const magnetY = (y - centerY) * 0.05;

        magnetismAnimationRef.current = gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement("div");
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        {
          scale: 0,
          opacity: 1,
        },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => ripple.remove(),
        }
      );
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("click", handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("click", handleClick);
      clearAllParticles();
    };
  }, [
    animateParticles,
    clearAllParticles,
    disableAnimations,
    enableTilt,
    enableMagnetism,
    clickEffect,
    glowColor,
  ]);

  return (
    <div
      ref={cardRef}
      className={`${className} relative overflow-hidden`}
      style={{ ...style, position: "relative", overflow: "hidden" }}
    >
      {children}
    </div>
  );
};

interface GlobalSpotlightProps {
  gridRef: MutableRefObject<HTMLDivElement | null>;
  disableAnimations?: boolean;
  enabled?: boolean;
  spotlightRadius?: number;
  glowColor?: string;
}

const GlobalSpotlight = ({
  gridRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR,
}: GlobalSpotlightProps) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const isInsideSection = useRef(false);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;

    const spotlight = document.createElement("div");
    spotlight.className = "global-spotlight";
    spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.15) 0%,
        rgba(${glowColor}, 0.08) 15%,
        rgba(${glowColor}, 0.04) 25%,
        rgba(${glowColor}, 0.02) 40%,
        rgba(${glowColor}, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !gridRef.current) return;

      const section = gridRef.current.closest(".bento-section");
      const rect = section?.getBoundingClientRect();
      const mouseInside =
        rect &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      isInsideSection.current = mouseInside || false;
      const cards = gridRef.current.querySelectorAll(".card");

      if (!mouseInside) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
        cards.forEach((card) => {
          (card as HTMLElement).style.setProperty("--glow-intensity", "0");
        });
        return;
      }

      const { proximity, fadeDistance } =
        calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;

      cards.forEach((card) => {
        const cardElement = card as HTMLElement;
        const cardRect = cardElement.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance =
          Math.hypot(e.clientX - centerX, e.clientY - centerY) -
          Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);

        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity =
            (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }

        updateCardGlowProperties(
          cardElement,
          e.clientX,
          e.clientY,
          glowIntensity,
          spotlightRadius
        );
      });

      gsap.to(spotlightRef.current, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      const targetOpacity =
        minDistance <= proximity
          ? 0.8
          : minDistance <= fadeDistance
            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
            : 0;

      gsap.to(spotlightRef.current, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      isInsideSection.current = false;
      gridRef.current?.querySelectorAll(".card").forEach((card) => {
        (card as HTMLElement).style.setProperty("--glow-intensity", "0");
      });
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

interface BentoCardGridProps {
  children: ReactNode;
  gridRef?: MutableRefObject<HTMLDivElement | null>;
  className?: string;
}

const BentoCardGrid = ({
  children,
  gridRef,
  className = "",
}: BentoCardGridProps) => (
  <div
    className={`bento-section w-full ${className}`.trim()}
    style={{ fontSize: "clamp(1rem, 0.9rem + 0.5vw, 1.5rem)" }}
    ref={gridRef}
  >
    {children}
  </div>
);

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () =>
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};

const MagicBento = ({
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = false,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true,
  cards,
  layoutVariant = 0,
  className = "",
}: BentoProps) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetection();

  const shouldDisableAnimations = disableAnimations || isMobile;
  const enhancedGlowColor = useMemo(
    () => glowColor ?? DEFAULT_GLOW_COLOR,
    [glowColor]
  );
  const cardsToRender = useMemo(
    () => (cards && cards.length > 0 ? cards : cardData),
    [cards]
  );

  const renderCardContent = useCallback(
    (card: BentoCardProps, index: number) => {
      const imageSrc = card.image ?? "/sadf.jpg";
      const label = card.label ?? "Gallery";
      const altText = card.title
        ? `${card.title} visual`
        : `Gallery item ${index + 1}`;

      return (
        <div className="relative flex h-full w-full flex-col overflow-hidden">
          <Image
            src={imageSrc}
            alt={altText}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 320px"
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
          <div className="relative z-10 mt-auto flex h-full flex-col justify-end gap-3 p-5 text-white">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
              {label}
            </span>
            {card.title && (
              <h3
                className={`text-lg font-semibold leading-tight ${
                  textAutoHide ? "text-clamp-1" : ""
                }`}
              >
                {card.title}
              </h3>
            )}
            {card.description && (
              <p
                className={`text-sm text-white/80 ${
                  textAutoHide ? "text-clamp-2" : ""
                }`}
              >
                {card.description}
              </p>
            )}
          </div>
        </div>
      );
    },
    [textAutoHide]
  );

  return (
    <>
      <style>
        {`
          .bento-section {
            --glow-x: 50%;
            --glow-y: 50%;
            --glow-intensity: 0;
            --glow-radius: 200px;
            --glow-color: ${enhancedGlowColor};
            --border-color: #392e4e;
            --background-dark: #060010;
            --white: hsl(0, 0%, 100%);
            --purple-primary: rgba(${enhancedGlowColor}, 1);
            --purple-glow: rgba(${enhancedGlowColor}, 0.2);
            --purple-border: rgba(${enhancedGlowColor}, 0.8);
          }

          .card-responsive {
            display: grid;
            width: 100%;
            gap: 0.75rem;
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: repeat(4, 1fr);
            min-height: 800px;
          }

          @media (min-width: 600px) {
            .card-responsive {
              grid-template-columns: repeat(4, 1fr);
              grid-template-rows: repeat(4, 1fr);
              gap: 1rem;
              min-height: 900px;
            }
          }

          @media (min-width: 1024px) {
            .card-responsive {
              grid-template-columns: repeat(4, 1fr);
              grid-template-rows: repeat(4, 1fr);
              gap: 1.5rem;
              min-height: 1000px;
            }

            .layout-0 .card:nth-child(1) {
              grid-column: 1 / 2;
              grid-row: 1 / 2;
            }
            .layout-0 .card:nth-child(2) {
              grid-column: 1 / 2;
              grid-row: 2 / 3;
            }
            .layout-0 .card:nth-child(3) {
              grid-column: 2 / 4;
              grid-row: 1 / 3;
            }
            .layout-0 .card:nth-child(4) {
              grid-column: 4 / 5;
              grid-row: 1 / 2;
            }
            .layout-0 .card:nth-child(5) {
              grid-column: 4 / 5;
              grid-row: 2 / 3;
            }
            .layout-0 .card:nth-child(6) {
              grid-column: 1 / 5;
              grid-row: 3 / 5;
            }

            .layout-1 .card:nth-child(1) {
              grid-column: 1 / 3;
              grid-row: 1 / 2;
            }
            .layout-1 .card:nth-child(2) {
              grid-column: 3 / 5;
              grid-row: 1 / 3;
            }
            .layout-1 .card:nth-child(3) {
              grid-column: 1 / 2;
              grid-row: 2 / 3;
            }
            .layout-1 .card:nth-child(4) {
              grid-column: 2 / 3;
              grid-row: 2 / 3;
            }
            .layout-1 .card:nth-child(5) {
              grid-column: 1 / 3;
              grid-row: 3 / 5;
            }
            .layout-1 .card:nth-child(6) {
              grid-column: 3 / 5;
              grid-row: 3 / 5;
            }

            .layout-2 .card:nth-child(1) {
              grid-column: 1 / 3;
              grid-row: 1 / 3;
            }
            .layout-2 .card:nth-child(2) {
              grid-column: 3 / 5;
              grid-row: 1 / 2;
            }
            .layout-2 .card:nth-child(3) {
              grid-column: 3 / 4;
              grid-row: 2 / 3;
            }
            .layout-2 .card:nth-child(4) {
              grid-column: 4 / 5;
              grid-row: 2 / 3;
            }
            .layout-2 .card:nth-child(5) {
              grid-column: 1 / 3;
              grid-row: 3 / 5;
            }
            .layout-2 .card:nth-child(6) {
              grid-column: 3 / 5;
              grid-row: 3 / 5;
            }

            .layout-3 .card:nth-child(1) {
              grid-column: 1 / 2;
              grid-row: 1 / 3;
            }
            .layout-3 .card:nth-child(2) {
              grid-column: 2 / 4;
              grid-row: 1 / 2;
            }
            .layout-3 .card:nth-child(3) {
              grid-column: 4 / 5;
              grid-row: 1 / 3;
            }
            .layout-3 .card:nth-child(4) {
              grid-column: 2 / 3;
              grid-row: 2 / 3;
            }
            .layout-3 .card:nth-child(5) {
              grid-column: 3 / 4;
              grid-row: 2 / 3;
            }
            .layout-3 .card:nth-child(6) {
              grid-column: 1 / 5;
              grid-row: 3 / 5;
            }

            .layout-4 .card:nth-child(1) {
              grid-column: 1 / 3;
              grid-row: 1 / 3;
            }
            .layout-4 .card:nth-child(2) {
              grid-column: 3 / 5;
              grid-row: 1 / 2;
            }
            .layout-4 .card:nth-child(3) {
              grid-column: 3 / 4;
              grid-row: 2 / 3;
            }
            .layout-4 .card:nth-child(4) {
              grid-column: 4 / 5;
              grid-row: 2 / 3;
            }
            .layout-4 .card:nth-child(5) {
              grid-column: 1 / 3;
              grid-row: 3 / 5;
            }
            .layout-4 .card:nth-child(6) {
              grid-column: 3 / 5;
              grid-row: 3 / 5;
            }
          }

          .card--border-glow::after {
            content: "";
            position: absolute;
            inset: 0;
            padding: 6px;
            background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
                rgba(${enhancedGlowColor}, calc(var(--glow-intensity) * 0.8)) 0%,
                rgba(${enhancedGlowColor}, calc(var(--glow-intensity) * 0.4)) 30%,
                transparent 60%);
            border-radius: inherit;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: subtract;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            pointer-events: none;
            transition: opacity 0.3s ease;
            z-index: 1;
          }

          .card--border-glow:hover::after {
            opacity: 1;
          }

          .card--border-glow:hover {
            box-shadow: 0 4px 20px rgba(46, 24, 78, 0.4), 0 0 30px rgba(${enhancedGlowColor}, 0.2);
          }

          .particle::before {
            content: "";
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: rgba(${enhancedGlowColor}, 0.2);
            border-radius: 50%;
            z-index: -1;
          }

          .text-clamp-1 {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            line-clamp: 1;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .text-clamp-2 {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          @media (max-width: 599px) {
            .card-responsive {
              grid-template-columns: 1fr;
              grid-template-rows: repeat(6, 200px);
              min-height: auto;
              gap: 1rem;
            }
            .card-responsive .card {
              grid-column: 1 !important;
              grid-row: auto !important;
            }
          }

          @media (min-width: 600px) and (max-width: 1023px) {
            .card-responsive {
              grid-template-columns: repeat(2, 1fr);
              grid-template-rows: repeat(4, 200px);
              min-height: auto;
              gap: 1rem;
            }
            .card-responsive .card {
              grid-column: auto !important;
              grid-row: auto !important;
            }
          }
        `}
      </style>

      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={shouldDisableAnimations}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={enhancedGlowColor}
        />
      )}

      <BentoCardGrid gridRef={gridRef} className={className}>
        <div className={`card-responsive layout-${layoutVariant}`}>
          {cardsToRender.map((card, index) => {
            const key = card.title ? `${card.title}-${index}` : `card-${index}`;
            const baseClassName = `card group relative flex w-full flex-col justify-between overflow-hidden rounded-[24px] border border-solid p-0 font-light transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(8,18,40,0.35)] ${
              enableBorderGlow ? "card--border-glow" : ""
            }`;

            const cardStyle: CSSProperties & Record<string, string | number> = {
              backgroundColor: card.color || "var(--background-dark)",
              borderColor: "var(--border-color)",
              color: "var(--white)",
              "--glow-x": "50%",
              "--glow-y": "50%",
              "--glow-intensity": "0",
              "--glow-radius": "200px",
            };

            const content = renderCardContent(card, index);

            if (enableStars) {
              return (
                <ParticleCard
                  key={key}
                  className={baseClassName}
                  style={cardStyle}
                  disableAnimations={shouldDisableAnimations}
                  particleCount={particleCount}
                  glowColor={enhancedGlowColor}
                  enableTilt={enableTilt}
                  clickEffect={clickEffect}
                  enableMagnetism={enableMagnetism}
                >
                  {content}
                </ParticleCard>
              );
            }

            return (
              <InteractiveCard
                key={key}
                className={baseClassName}
                style={cardStyle}
                enableTilt={enableTilt}
                enableMagnetism={enableMagnetism}
                clickEffect={clickEffect}
                disableAnimations={shouldDisableAnimations}
                glowColor={enhancedGlowColor}
              >
                {content}
              </InteractiveCard>
            );
          })}
        </div>
      </BentoCardGrid>
    </>
  );
};

interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  enableTilt: boolean;
  enableMagnetism: boolean;
  clickEffect: boolean;
  disableAnimations: boolean;
  glowColor: string;
}

const InteractiveCard = ({
  children,
  className = "",
  style,
  enableTilt,
  enableMagnetism,
  clickEffect,
  disableAnimations,
  glowColor,
}: InteractiveCardProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = cardRef.current;
    if (!element || disableAnimations) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.05;
        const magnetY = (y - centerY) * 0.05;

        gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleMouseLeave = () => {
      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      if (enableMagnetism) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement("div");
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        {
          scale: 0,
          opacity: 1,
        },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => ripple.remove(),
        }
      );
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("click", handleClick);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("click", handleClick);
    };
  }, [enableTilt, enableMagnetism, clickEffect, disableAnimations, glowColor]);

  return (
    <div ref={cardRef} className={`${className}`} style={style}>
      {children}
    </div>
  );
};

export default MagicBento;
