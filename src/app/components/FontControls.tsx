"use client";

import { useState } from "react";
import { useFontPreferences } from "./FontProvider";
import type { SansFontKey } from "../theme/fonts";

const IS_PRODUCTION = process.env.NODE_ENV === "production";

export default function FontControls() {
  const { options, sansFont, setSansFont } = useFontPreferences();
  const [isOpen, setIsOpen] = useState(false);

  if (IS_PRODUCTION) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-[120] text-sm">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="rounded-full border border-white/20 bg-black/60 px-4 py-1.5 font-medium text-white shadow-lg backdrop-blur transition hover:bg-black/80"
      >
        {isOpen ? "Hide Font Panel" : "Fonts"}
      </button>

      {isOpen && (
        <div className="mt-2 w-56 rounded-2xl border border-white/15 bg-slate-900/85 p-4 text-white shadow-xl backdrop-blur">
          <div className="flex flex-col gap-2 text-xs uppercase tracking-wide text-slate-300">
            <span>Sans Serif</span>
            <select
              value={sansFont}
              onChange={(event) =>
                setSansFont(event.target.value as SansFontKey)
              }
              className="rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm font-medium text-white focus:border-sky-400 focus:outline-none focus:ring-0"
            >
              {options.map((option) => (
                <option key={option.key} value={option.key} className="text-black">
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            Stored locally. Remove this panel by deleting
            <code className="ml-1 rounded bg-white/10 px-1 py-0.5 text-[0.7rem]">FontControls</code>.
          </p>
        </div>
      )}
    </div>
  );
}
