"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  CARD_OUTER_RADIUS_PX,
  cardGlassBackground,
  cardSurfaceClasses,
} from "../components/cardTokens";
import { contentContainerClass } from "../components/layoutTokens";

type Sponsor = {
  name: string;
  logo: string;
};

type SponsorSection = {
  heading: string;
  sponsors: Sponsor[];
};

const sponsorSections: SponsorSection[] = [
  {
    heading: "Title Sponsors",
    sponsors: [
      { name: "Stellar Motors", logo: "/sadf.jpg" },
      { name: "Nova FinCorp", logo: "/sadf.jpg" },
    ],
  },
  {
    heading: "Associate Sponsors",
    sponsors: [
      { name: "Orbit Beverages", logo: "/sadf.jpg" },
      { name: "Nebula Networks", logo: "/sadf.jpg" },
      { name: "Galaxy Grocers", logo: "/sadf.jpg" },
    ],
  },
  {
    heading: "Fashion Partner",
    sponsors: [{ name: "Cosmic Couture", logo: "/sadf.jpg" }],
  },
  {
    heading: "Hospitality Partners",
    sponsors: [
      { name: "Aurora Resorts", logo: "/sadf.jpg" },
      { name: "Lunar Lounge", logo: "/sadf.jpg" },
    ],
  },
  {
    heading: "Media & Outreach",
    sponsors: [
      { name: "Celestial FM", logo: "/sadf.jpg" },
      { name: "Zenith Times", logo: "/sadf.jpg" },
      { name: "Meteor Media", logo: "/sadf.jpg" },
    ],
  },
];

const pageStyles = {
  main: "relative isolate overflow-hidden py-24 text-white",
  container: `${contentContainerClass} flex flex-col gap-16`,
  headerShell: "mx-auto max-w-3xl text-center",
  headerBadge: "text-sm uppercase tracking-[0.35em] text-sky-300/80",
  headerTitle: "mt-4 text-4xl font-semibold leading-tight sm:text-5xl",
  headerCopy: "mt-4 text-base text-slate-300",
  sections: "flex flex-col gap-14",
  sectionCluster: "space-y-6",
  sectionHeadingWrap:
    "mx-auto flex w-full max-w-xl items-center justify-center gap-3",
  sectionHeadingText:
    "text-center text-lg font-medium uppercase tracking-[0.3em] text-sky-200/90",
  grid: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
  logoBox: "relative w-full pb-[100%]",
  logoImage: "object-cover",
  sponsorName: "text-sm font-medium text-slate-100",
} as const;

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  const outerRadius = CARD_OUTER_RADIUS_PX;

  return (
    <motion.article
      className={`group relative flex w-full flex-col overflow-hidden text-center shadow-2xl transition duration-200 ease-out ${cardSurfaceClasses} ${cardGlassBackground} hover:border-sky-400/80`}
      style={{
        borderRadius: `${outerRadius}px`,
      }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        className="relative w-full overflow-hidden"
        initial={{ opacity: 0.6, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className={pageStyles.logoBox}>
          <Image
            src={sponsor.logo}
            alt={`${sponsor.name} logo`}
            fill
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 28vw, 220px"
            quality={90}
            className={`${pageStyles.logoImage} transition duration-300 group-hover:scale-[1.02]`}
          />
        </div>
      </motion.div>
      <div className="px-4 py-4">
        <p className={pageStyles.sponsorName}>{sponsor.name}</p>
      </div>
    </motion.article>
  );
}

function SponsorSection({ heading, sponsors }: SponsorSection) {
  return (
    <section className={pageStyles.sectionCluster}>
      <div className={pageStyles.sectionHeadingWrap}>
        <h2 className={pageStyles.sectionHeadingText}>{heading}</h2>
      </div>
      <div className={pageStyles.grid}>
        {sponsors.map((sponsor) => (
          <SponsorCard key={sponsor.name} sponsor={sponsor} />
        ))}
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <main className={pageStyles.main}>
      <div className={pageStyles.container}>
        <header className={`${pageStyles.headerShell} mb-12`}>
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            SPONSORS
          </h1>
        </header>

        <div className={pageStyles.sections}>
          {sponsorSections.map((section) => (
            <SponsorSection
              key={section.heading}
              heading={section.heading}
              sponsors={section.sponsors}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
