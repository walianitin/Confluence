"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  DEFAULT_SANS_FONT,
  sansFontClassMap,
  sansFontOptions,
  type SansFontKey,
} from "../theme/fonts";

const STORAGE_KEY = "confluence:sans-font";

type FontContextValue = {
  sansFont: SansFontKey;
  setSansFont: (font: SansFontKey) => void;
  options: Array<{ key: SansFontKey; label: string }>; 
};

const FontContext = createContext<FontContextValue | null>(null);

export function FontProvider({ children }: { children: ReactNode }) {
  const [sansFont, setSansFontState] = useState<SansFontKey>(DEFAULT_SANS_FONT);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as
      | SansFontKey
      | null;

    const nextFont = stored && sansFontClassMap[stored]
      ? stored
      : DEFAULT_SANS_FONT;

    setSansFontState(nextFont);
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    const fontDefinition = sansFontClassMap[sansFont];

    if (!fontDefinition) {
      return;
    }

    document.documentElement.style.setProperty(
      "--font-sans",
      `var(${fontDefinition.cssVariable})`
    );
    document.documentElement.setAttribute("data-sans-font", sansFont);
    window.localStorage.setItem(STORAGE_KEY, sansFont);
  }, [sansFont, hasHydrated]);

  const setSansFont = (font: SansFontKey) => {
    if (!sansFontClassMap[font]) {
      return;
    }
    setSansFontState(font);
  };

  const value = useMemo(
    () => ({
      sansFont,
      setSansFont,
      options: sansFontOptions.map(({ key, label }) => ({ key, label })),
    }),
    [sansFont]
  );

  return <FontContext.Provider value={value}>{children}</FontContext.Provider>;
}

export function useFontPreferences(): FontContextValue {
  const context = useContext(FontContext);

  if (!context) {
    throw new Error("useFontPreferences must be used inside FontProvider");
  }

  return context;
}
