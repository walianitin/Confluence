"use client";

import Image from "next/image";
import { motion } from "framer-motion";

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
  main: "relative isolate overflow-hidden bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 py-24 text-white",
  aurora:
    "absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.2),_transparent_55%)]",
  container: "mx-auto flex max-w-6xl flex-col gap-16 px-6 sm:px-10 lg:px-12",
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
  card: "group relative flex w-full flex-col rounded-3xl border border-white/10 bg-white/5 p-2 text-center shadow-2xl backdrop-blur transition duration-200 ease-out hover:border-sky-400/80",
  logoWrap:
    "relative w-full overflow-hidden rounded-[1rem] border border-white/10 bg-slate-900/80",
  logoBox: "relative w-full pb-[100%]",
  logoImage: "object-cover",
  sponsorName: "pt-1 text-sm font-medium text-slate-100",
} as const;

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  // Outer Radius = Inner Radius + Padding
  // Card: outer radius = 1.5rem, padding = 0.5rem
  // Logo: inner radius = 1rem (1.5rem - 0.5rem)
  const cardPadding = 8; // 0.5rem = 8px
  const outerRadius = 24; // 1.5rem = 24px
  const innerRadius = outerRadius - cardPadding; // 16px = 1rem

  return (
    <motion.article
      className="group relative flex w-full flex-col border border-white/10 bg-white/5 text-center shadow-2xl backdrop-blur transition duration-200 ease-out hover:border-sky-400/80"
      style={{
        borderRadius: `${outerRadius}px`,
        padding: `${cardPadding}px`,
      }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        className="relative w-full overflow-hidden border border-white/10 bg-slate-900/80"
        style={{ borderRadius: `${innerRadius}px` }}
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className={pageStyles.logoBox}>
          <Image
            src={sponsor.logo}
            alt={`${sponsor.name} logo`}
            fill
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 28vw, 220px"
            quality={90}
            className={pageStyles.logoImage}
          />
        </div>
      </motion.div>
      <p className={pageStyles.sponsorName}>{sponsor.name}</p>
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
      <div className={pageStyles.aurora} />
      <div className={pageStyles.container}>
        <header className={pageStyles.headerShell}>
          <p className={pageStyles.headerBadge}>Confluence 2025</p>
          <h1 className={pageStyles.headerTitle}>Cosmic Carnival Sponsors</h1>
          <p className={pageStyles.headerCopy}>
            Celebrating the stellar brands that power our annual cultural fest.
            Each partner brings a unique spark to the cosmos of Confluence.
          </p>
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
