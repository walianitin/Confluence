import {
  Geist,
  Geist_Mono,
  Inter,
  Manrope,
  Plus_Jakarta_Sans,
  Space_Grotesk,
} from "next/font/google";

const GEIST_CSS_VAR = "--font-geist-sans";
const INTER_CSS_VAR = "--font-inter";
const MANROPE_CSS_VAR = "--font-manrope";
const PLUS_JAKARTA_CSS_VAR = "--font-plus-jakarta";
const SPACE_GROTESK_CSS_VAR = "--font-space-grotesk";
const GEIST_MONO_CSS_VAR = "--font-geist-mono";

const geist = Geist({
  subsets: ["latin"],
  variable: GEIST_CSS_VAR,
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: INTER_CSS_VAR,
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: MANROPE_CSS_VAR,
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: PLUS_JAKARTA_CSS_VAR,
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: SPACE_GROTESK_CSS_VAR,
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: GEIST_MONO_CSS_VAR,
  display: "swap",
});

export const sansFontDefinitions = {
  geist: {
    label: "Geist",
    font: geist,
    cssVariable: GEIST_CSS_VAR,
  },
  inter: {
    label: "Inter",
    font: inter,
    cssVariable: INTER_CSS_VAR,
  },
  manrope: {
    label: "Manrope",
    font: manrope,
    cssVariable: MANROPE_CSS_VAR,
  },
  plusJakarta: {
    label: "Plus Jakarta Sans",
    font: plusJakarta,
    cssVariable: PLUS_JAKARTA_CSS_VAR,
  },
  spaceGrotesk: {
    label: "Space Grotesk",
    font: spaceGrotesk,
    cssVariable: SPACE_GROTESK_CSS_VAR,
  },
} as const;

export type SansFontKey = keyof typeof sansFontDefinitions;

export const DEFAULT_SANS_FONT: SansFontKey = "geist";

export const monoFontDefinition = {
  label: "Geist Mono",
  font: geistMono,
  cssVariable: GEIST_MONO_CSS_VAR,
} as const;

export const sansFontOptions = Object.entries(sansFontDefinitions).map(
  ([key, definition]) => ({
    key: key as SansFontKey,
    label: definition.label,
    variableClassName: definition.font.variable,
    className: definition.font.className,
    cssVariable: definition.cssVariable,
  })
);

export const sansFontClassMap = Object.fromEntries(
  sansFontOptions.map((option) => [option.key, option])
) as Record<
  SansFontKey,
  {
    key: SansFontKey;
    label: string;
    variableClassName: string;
    className: string;
    cssVariable: string;
  }
>;

export const sansFontVariableClasses = sansFontOptions
  .map((option) => option.variableClassName)
  .join(" ");

export const sansFontClassNames = sansFontOptions
  .map((option) => option.className)
  .join(" ");

export const defaultSansClassName =
  sansFontDefinitions[DEFAULT_SANS_FONT].font.className;

export const defaultSansCssVariable =
  sansFontDefinitions[DEFAULT_SANS_FONT].cssVariable;

export const monoFontVariableClass = monoFontDefinition.font.variable;
export const monoFontClassName = monoFontDefinition.font.className;
export const monoFontCssVariable = monoFontDefinition.cssVariable;
