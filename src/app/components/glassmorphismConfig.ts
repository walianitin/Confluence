/* ====================================
   GLASSMORPHISM CONFIGURATION
   Centralized settings for all glass effects
   ==================================== */

// ===== BLUR SETTINGS =====
// Options: none, sm (4px), (8px), md (12px), lg (16px), xl (24px), 2xl (40px), 3xl (64px)
export const GLASS_BLUR = {
  navbar: "backdrop-blur-md",      // Navbar blur
  dropdown: "backdrop-blur-md",    // Dropdown/panel blur
  button: "backdrop-blur-md",      // Button/element blur
  footer: "backdrop-blur-md",      // Footer blur
  card: "backdrop-blur-md",        // Card blur
};

// ===== BORDER SETTINGS =====
// Tweak thickness with border utilities (border, border-[1.5px], border-2, etc.)
// Tweak opacity with Tailwind's color modifiers (!border-white/70, /85, etc.)
export const GLASS_BORDER = {
  default: "border-[1.5px] !border-white/85",  // Balanced thickness/opacity used everywhere
  subtle: "border !border-white/30",          // Slightly thinner + softer
  bold: "border-2 !border-white",             // Thick + bright outline
  footer: "border-t-[1.5px] !border-white/85",// Top-only border for footer strip
};

// ===== BACKGROUND GRADIENTS =====
export const GLASS_GRADIENT = {
  // Navbar/Panel gradient (blue tones, medium opacity)
  panel: "bg-[linear-gradient(140deg,_rgba(36,61,112,0.68)_0%,_rgba(20,38,84,0.56)_48%,_rgba(13,25,55,0.52)_100%)]",
  
  // Button/Element gradient (slightly lighter)
  element: "bg-[linear-gradient(140deg,_rgba(36,61,112,0.6)_0%,_rgba(22,41,82,0.52)_50%,_rgba(12,24,54,0.46)_100%)]",
  
  // Footer gradient (vertical)
  footer: "bg-[linear-gradient(180deg,_rgba(24,42,80,0.66)_0%,_rgba(16,32,66,0.54)_60%,_rgba(11,24,55,0.48)_100%)]",
  
  // Card background (simple transparency)
  card: "bg-white/5",
};

// ===== SHADOW SETTINGS =====
export const GLASS_SHADOW = {
  panel: "shadow-[0_24px_55px_rgba(8,18,48,0.45)]",     // Large shadow for panels
  element: "shadow-[0_18px_38px_rgba(8,17,46,0.35)]",   // Medium shadow for elements
  footer: "shadow-[0_-20px_50px_rgba(6,14,40,0.35)]",   // Upward shadow for footer
  card: "shadow-xl",                                     // Standard XL shadow for cards
};

// ===== COMPOSED GLASS STYLES =====
// These combine the above settings into ready-to-use classes

export const glassPanel = `${GLASS_BORDER.subtle} ${GLASS_GRADIENT.panel} ${GLASS_BLUR.navbar} ${GLASS_SHADOW.panel}`;

export const glassElement = `${GLASS_BORDER.subtle} ${GLASS_GRADIENT.element} ${GLASS_BLUR.button} ${GLASS_SHADOW.element}`;

export const glassFooter = `${GLASS_BORDER.subtle} ${GLASS_GRADIENT.footer} ${GLASS_BLUR.footer} ${GLASS_SHADOW.footer}`;

// Card-specific glass settings
export const cardSurfaceClasses = `${GLASS_BORDER.subtle} ${GLASS_SHADOW.card} ${GLASS_BLUR.card}`;

export const cardGlassBackground = GLASS_GRADIENT.card;

// Button-specific glass settings
export const glassPaginationButton = `${GLASS_BORDER.subtle} ${GLASS_GRADIENT.element} ${GLASS_BLUR.button} shadow-lg transition-all hover:bg-[linear-gradient(140deg,_rgba(46,71,122,0.7)_0%,_rgba(32,51,92,0.62)_50%,_rgba(22,34,64,0.56)_100%)] hover:!border-white/20 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[linear-gradient(140deg,_rgba(36,61,112,0.6)_0%,_rgba(22,41,82,0.52)_50%,_rgba(12,24,54,0.46)_100%)]`;

/* ====================================
   USAGE INSTRUCTIONS
   ==================================== */
/*
To adjust blur for all elements at once:
1. Change GLASS_BLUR values above

To adjust blur for specific element:
1. Change individual GLASS_BLUR property (e.g., navbar, button, card)

To adjust opacity/colors:
1. Modify GLASS_GRADIENT values

To adjust borders:
1. Edit the class strings inside GLASS_BORDER (default, subtle, bold, footer)
2. Swap the preset used by a component (e.g., use GLASS_BORDER.bold for cards)

To adjust shadows:
1. Modify GLASS_SHADOW values
*/
