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
  type: string;
  link?: string;
  bg?: string
};

// All sponsors merged into one array
const sponsors: Sponsor[] = [
  { name: "Indian Oil", logo: "/Sponsor/IndianOil.jpg", type: "Title Sponsor" , bg: "bg-white" },
  { name: "Hero", logo: "/Sponsor/Hero_Co-Title.jpg", type: "Co-Title Sponsor" , bg: "bg-white"},
  { name: "Bisleri", logo: "/Sponsor/Bisleri_Hydration_Partner.jpg", type: "Hydration Partner", bg: "bg-emerald-400" },
   { name: "Jio Saavn", logo: "/Sponsor/Jio_Saavn_Music_Streaming_Partner.png", type: "Music Streaming Partner" , bg: "bg-black" },
  { name: "Limonata", logo: "/Sponsor/Limonata_Refreshment_Partner.jpg", type: "Refreshment Partner", bg: "bg-yellow-400" },
  { name: "Palm", logo: "/Sponsor/Palm_Bath_and_Body_Care_Partner.png", type: "Bath and Body Care Partner", bg: "bg-black" },
  { name: "Power Grid", logo: "/Sponsor/Powergrid.jpg", type: "Power Partner(untitled)", bg: "bg-white" },
  { name: "SBAH", logo: "/Sponsor/SBAH Logo_Health_Partner.png", type: "Health Partner", bg: "bg-white" },
  { name: "Haryana Engineering", logo: "/Sponsor/Haryana engineering.jpg", type: "Engineering Partner(untitled)", bg: "bg-white" },
  { name: "APCPL", logo: "/Sponsor/APCPL.png", type: "(untitled)", bg: "bg-sky-500" },
  { name: "Smaaash", logo: "/Sponsor/Smaaash_Gaming_Partner.jpg", type: "Gaming Partner", bg: "bg-white" },
  { name: "Unibic", logo: "/Sponsor/unibic_snacking_partner.png", type: "Snacking Partner", bg: "bg-red-600" },
];

const pageStyles = {
  main: "relative isolate overflow-hidden py-24 text-white",
  container: `${contentContainerClass} flex flex-col gap-16`,
  headerShell: "mx-auto max-w-3xl text-center",
  logoBox: "relative w-full pb-[100%]",
  logoImage: "object-cover",
  sponsorType: "text-xs uppercase tracking-wide text-sky-300 mt-3",
  sponsorName: "text-lg font-semibold text-slate-100 mt-1",
  linkBtn:
    "mt-3 inline-block text-sm text-sky-400 hover:text-sky-300 underline transition",
} as const;

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  const outerRadius = CARD_OUTER_RADIUS_PX;

  return (
    <motion.article
      className={`group relative flex flex-col overflow-hidden text-center shadow-2xl transition duration-200 ease-out ${cardSurfaceClasses} ${cardGlassBackground} hover:border-sky-400/80`}
      style={{
        borderRadius: `${outerRadius}px`,
        width: "clamp(180px, 20vw, 260px)", // 👈 flexible width
        minWidth: "180px",
        maxWidth: "260px",
      }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Image with gradient fade */}
      <div className="p-3 relative w-full aspect-[3/4] overflow-hidden bg-transparent"> {/* 👈 keeps aspect ratio instead of fixed height */}
        <Image
          src={sponsor.logo}
          alt={`${sponsor.name} logo`}
          fill
          quality={90}
          className={`object-contain transition duration-300 group-hover:scale-[1.03] ${sponsor.bg}`} // contain instead of cover
        />

        {/* gradient overlay */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" /> */}
      </div>

      {/* Sponsor info */}
      <div className="px-4 py-5 bg-slate-950/40 backdrop-blur-sm">
        <p className="text-xs uppercase tracking-wide text-sky-300">
          {sponsor.type}
        </p>
        <p className="text-lg font-semibold text-slate-100 mt-1">
          {sponsor.name}
        </p>
        {sponsor.link && (
          <a
            href={sponsor.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm text-sky-400 hover:text-sky-300 underline transition"
          >
            Visit Page →
          </a>
        )}
      </div>
    </motion.article>
  );
}


// Helper to chunk sponsors into 3–2–3–2 layout
function getPatternLayout(sponsors: Sponsor[]) {
  const pattern = [3, 2, 3, 2];
  const rows: Sponsor[][] = [];
  let index = 0;
  while (index < sponsors.length) {
    for (const p of pattern) {
      if (index >= sponsors.length) break;
      rows.push(sponsors.slice(index, index + p));
      index += p;
    }
  }
  return rows;
}

export default function Page() {
  const rows = getPatternLayout(sponsors);

  return (
    <main className={pageStyles.main}>
      <div className={pageStyles.aurora} />

      <div className={pageStyles.container}>
        <header className={`${pageStyles.headerShell} mb-12`}>
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            SPONSORS
          </h1>
        </header>

        {/* Render rows of cards */}
        <div className="flex flex-col items-center gap-12">
          {rows.map((row, i) => (
            <div
              key={i}
              className={`grid gap-6 ${
                row.length === 3
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"
              }`}
            >
              {row.map((sponsor) => (
                <SponsorCard key={sponsor.name} sponsor={sponsor} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
