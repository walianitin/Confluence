"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
}

export default function PageHeader({
  title,
  subtitle,
  badge = "Confluence 2025",
}: PageHeaderProps) {
  return (
    <header className="mb-12 text-center">
      <motion.p
        className="text-sm uppercase tracking-[0.4em] text-sky-300/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {badge}
      </motion.p>
      <motion.h1
        className="mt-4 text-5xl font-bold leading-tight sm:text-6xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p
          className="mt-4 text-base text-slate-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {subtitle}
        </motion.p>
      )}
    </header>
  );
}
