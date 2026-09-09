import { 
  ProfileThemeConfig, 
  ButtonStyle, 
  HeadingFontFamily, 
  BodyFontFamily, 
  BackgroundPatternType 
} from "@/types/builder";
import React from "react";

// ==========================================
// 1. TYPOGRAPHY & FONT HELPERS
// ==========================================

export const HEADING_FONT_OPTIONS: Array<{
  id: HeadingFontFamily;
  name: string;
  category: string;
  cssFamily: string;
  previewSample: string;
}> = [
  // Luxury & Editorial Serifs
  { id: "Playfair Display", name: "Playfair Display", category: "Editorial Serif", cssFamily: "'Playfair Display', Georgia, serif", previewSample: "Maison & Haute Horlogerie" },
  { id: "Cinzel", name: "Cinzel", category: "Imperial Luxury", cssFamily: "'Cinzel', serif", previewSample: "ATELIER ROIALE MCMXCIV" },
  { id: "Cormorant Garamond", name: "Cormorant Garamond", category: "Classical Atelier", cssFamily: "'Cormorant Garamond', Garamond, serif", previewSample: "Private Client Atelier Drops" },
  { id: "Bodoni Moda", name: "Bodoni Moda", category: "High Fashion", cssFamily: "'Bodoni Moda', serif", previewSample: "Vogue Milano Editorial" },
  { id: "DM Serif Display", name: "DM Serif Display", category: "Bold Editorial", cssFamily: "'DM Serif Display', serif", previewSample: "Curated Autumn Issue" },
  { id: "Fraunces", name: "Fraunces", category: "Vintage Serif", cssFamily: "'Fraunces', serif", previewSample: "Warm Boutique Heritage" },
  { id: "Prata", name: "Prata", category: "Didone Elegance", cssFamily: "'Prata', serif", previewSample: "Haute Joaillerie Paris" },
  { id: "Marcellus", name: "Marcellus", category: "Classical Trajan", cssFamily: "'Marcellus', serif", previewSample: "Monaco Grand Yacht Club" },
  { id: "Abril Fatface", name: "Abril Fatface", category: "Bold Serif Display", cssFamily: "'Abril Fatface', serif", previewSample: "SUMMER DROP LIVE" },
  { id: "Lora", name: "Lora", category: "Literary Serif", cssFamily: "'Lora', serif", previewSample: "Curated Stories & Essays" },

  // Avant-Garde & High Fashion
  { id: "Syne", name: "Syne", category: "Avant-Garde", cssFamily: "'Syne', sans-serif", previewSample: "Avant-Garde Studio '26" },
  { id: "Italiana", name: "Italiana", category: "Italian Chic", cssFamily: "'Italiana', serif", previewSample: "Dolce Vita Alta Sartoria" },
  { id: "Tenor Sans", name: "Tenor Sans", category: "Editorial Sans", cssFamily: "'Tenor Sans', sans-serif", previewSample: "Minimalist Fashion Lookbook" },

  // Bold Headlines & Display
  { id: "Bebas Neue", name: "Bebas Neue", category: "Bold Display", cssFamily: "'Bebas Neue', cursive, sans-serif", previewSample: "EXCLUSIVE DROP LIVE NOW" },
  { id: "Anton", name: "Anton", category: "Heavy Impact", cssFamily: "'Anton', sans-serif", previewSample: "NEW ALBUM STREAMING" },
  { id: "Oswald", name: "Oswald", category: "Condensed Bold", cssFamily: "'Oswald', sans-serif", previewSample: "WORLD TOUR TICKETS" },
  { id: "Righteous", name: "Righteous", category: "Retro Future", cssFamily: "'Righteous', cursive", previewSample: "SYNTHWAVE NIGHTS '84" },
  { id: "Unbounded", name: "Unbounded", category: "Ultra-Wide Modern", cssFamily: "'Unbounded', sans-serif", previewSample: "METAVERSE PROTOCOL" },

  // Tech, Monospace & Brutalist
  { id: "Space Grotesk", name: "Space Grotesk", category: "Neo-Brutalist", cssFamily: "'Space Grotesk', monospace, sans-serif", previewSample: "HyperScale Terminal 3.0" },
  { id: "JetBrains Mono", name: "JetBrains Mono", category: "Developer Mono", cssFamily: "'JetBrains Mono', monospace", previewSample: "npm run deploy --prod" },

  // Handwritten & Script
  { id: "Caveat", name: "Caveat", category: "Handwritten", cssFamily: "'Caveat', cursive", previewSample: "Made with love & coffee" },
  { id: "Pacifico", name: "Pacifico", category: "Brush Script", cssFamily: "'Pacifico', cursive", previewSample: "Endless Summer Vibes" },
  { id: "Great Vibes", name: "Great Vibes", category: "Calligraphic Script", cssFamily: "'Great Vibes', cursive", previewSample: "The Signature Collection" },

  // Clean Modern Sans-Serifs
  { id: "Outfit", name: "Outfit", category: "Modern Minimalist", cssFamily: "'Outfit', sans-serif", previewSample: "Curated Creator Portfolios" },
  { id: "Plus Jakarta Sans", name: "Plus Jakarta Sans", category: "Executive Premium", cssFamily: "'Plus Jakarta Sans', sans-serif", previewSample: "Executive Advisory Brief" },
  { id: "Poppins", name: "Poppins", category: "Geometric Rounded", cssFamily: "'Poppins', sans-serif", previewSample: "Friendly Digital Experiences" },
  { id: "DM Sans", name: "DM Sans", category: "Swiss Precision", cssFamily: "'DM Sans', sans-serif", previewSample: "Design Systems & Architecture" },
  { id: "Raleway", name: "Raleway", category: "Elegant Sans", cssFamily: "'Raleway', sans-serif", previewSample: "Refined Modern Aesthetics" },
  { id: "Manrope", name: "Manrope", category: "Modern Tech Sans", cssFamily: "'Manrope', sans-serif", previewSample: "Next-Gen Fintech App" },
  { id: "Urbanist", name: "Urbanist", category: "Contemporary Clean", cssFamily: "'Urbanist', sans-serif", previewSample: "Architectural Studio Portfolios" },
  { id: "Montserrat", name: "Montserrat", category: "Modern Grotesque", cssFamily: "'Montserrat', sans-serif", previewSample: "Urban Atelier & Co." },
  { id: "Inter", name: "Inter", category: "Swiss Modern", cssFamily: "'Inter', sans-serif", previewSample: "Universal Creator Profile" },
];

export const BODY_FONT_OPTIONS: Array<{
  id: BodyFontFamily;
  name: string;
  category: string;
  cssFamily: string;
  previewSample: string;
}> = [
  { id: "Inter", name: "Inter", category: "Crisp & Clean", cssFamily: "'Inter', sans-serif", previewSample: "Clean readable body text for all mobile screens." },
  { id: "Outfit", name: "Outfit", category: "Warm Modern", cssFamily: "'Outfit', sans-serif", previewSample: "Warm and friendly modern sans-serif." },
  { id: "Plus Jakarta Sans", name: "Plus Jakarta Sans", category: "Executive Tech", cssFamily: "'Plus Jakarta Sans', sans-serif", previewSample: "Executive modern rhythm with crisp legibility." },
  { id: "Poppins", name: "Poppins", category: "Geometric Rounded", cssFamily: "'Poppins', sans-serif", previewSample: "Smooth and friendly rounded geometry." },
  { id: "DM Sans", name: "DM Sans", category: "Geometric Swiss", cssFamily: "'DM Sans', sans-serif", previewSample: "Balanced proportions and humanistic touches." },
  { id: "Raleway", name: "Raleway", category: "Elegant Sans", cssFamily: "'Raleway', sans-serif", previewSample: "Refined geometric sans-serif styling." },
  { id: "Manrope", name: "Manrope", category: "Modern Tech Sans", cssFamily: "'Manrope', sans-serif", previewSample: "Clean open grotesque with high legibility." },
  { id: "Urbanist", name: "Urbanist", category: "Contemporary Clean", cssFamily: "'Urbanist', sans-serif", previewSample: "Low-contrast geometric neutral text." },
  { id: "Space Grotesk", name: "Space Grotesk", category: "Tech Monospace", cssFamily: "'Space Grotesk', monospace", previewSample: "Distinct technical flavor and digital vibe." },
  { id: "JetBrains Mono", name: "JetBrains Mono", category: "Code Monospace", cssFamily: "'JetBrains Mono', monospace", previewSample: "Engineered for maximum character distinction." },
  { id: "Lora", name: "Lora", category: "Literary Serif", cssFamily: "'Lora', serif", previewSample: "Refined editorial serif for articles and stories." },
  { id: "Montserrat", name: "Montserrat", category: "Urban Grotesque", cssFamily: "'Montserrat', sans-serif", previewSample: "Solid structural geometry and clear presence." },
];

export const getHeadingFontCss = (font: HeadingFontFamily): string => {
  const match = HEADING_FONT_OPTIONS.find((f) => f.id === font);
  return match ? match.cssFamily : "'Inter', sans-serif";
};

export const getBodyFontCss = (font: BodyFontFamily): string => {
  const match = BODY_FONT_OPTIONS.find((f) => f.id === font);
  return match ? match.cssFamily : "'Inter', sans-serif";
};

// ==========================================
// 2. BACKGROUND PATTERN OPTIONS
// ==========================================

export interface BackgroundPatternOption {
  id: BackgroundPatternType;
  name: string;
  category: "Dynamic Canvas (GSAP/3JS)" | "Geometric Patterns" | "Gradients & Blocks";
  description: string;
  tag: string;
}

export const BACKGROUND_PATTERN_OPTIONS: BackgroundPatternOption[] = [
  {
    id: "canvas_constellation",
    name: "Constellation Particles (GSAP / 3JS)",
    category: "Dynamic Canvas (GSAP/3JS)",
    description: "Interactive particle network with glowing nodes and distance-connected hairlines. Reacts dynamically to motion.",
    tag: "INTERACTIVE CANVAS",
  },
  {
    id: "canvas_aurora_waves",
    name: "Harmonic Aurora Waves",
    category: "Dynamic Canvas (GSAP/3JS)",
    description: "Flowing sinusoidal fluid ribbons undulating smoothly across the viewport with radiant crest lines.",
    tag: "SMOOTH FLOW",
  },
  {
    id: "canvas_stardust",
    name: "Ascending Twinkling Stardust",
    category: "Dynamic Canvas (GSAP/3JS)",
    description: "Luminous micro-particles gently floating upwards with pulsing ambient halos.",
    tag: "CELESTIAL",
  },
  {
    id: "dot_grid",
    name: "Luxury Dot Grid",
    category: "Geometric Patterns",
    description: "Crisp micro-dot pattern offering architectural precision and timeless atelier framing.",
    tag: "MINIMALIST",
  },
  {
    id: "isometric_grid",
    name: "Technical Isometric Grid",
    category: "Geometric Patterns",
    description: "Three-dimensional geometric grid inspired by architectural blueprints and Swiss design.",
    tag: "ARCHITECTURAL",
  },
  {
    id: "art_deco_lattice",
    name: "Art Deco Gilded Lattice",
    category: "Geometric Patterns",
    description: "Gilded diamond lattice inspired by 1920s Paris jewelry salons and luxury packaging.",
    tag: "HERITAGE",
  },
  {
    id: "subtle_noise",
    name: "Analog Film Grain",
    category: "Geometric Patterns",
    description: "High-end analog film grain texture imparting organic paper depth and tactile warmth.",
    tag: "TACTILE",
  },
  {
    id: "gradient_mesh",
    name: "Animated Fluid Mesh",
    category: "Gradients & Blocks",
    description: "Multi-point pulsing ambient color blobs softly blending into the background palette.",
    tag: "ATMOSPHERIC",
  },
  {
    id: "gradient_radial",
    name: "Radial Spotlight Glow",
    category: "Gradients & Blocks",
    description: "Cinematic focal spotlight centered beneath the creator avatar, highlighting the profile stack.",
    tag: "CINEMATIC",
  },
  {
    id: "solid_block",
    name: "Pure Solid Color Block",
    category: "Gradients & Blocks",
    description: "Ultra-clean, uncluttered solid color block for absolute focus on typography and cards.",
    tag: "CLEAN FLAT",
  },
];

// ==========================================
// 3. BUTTON STYLES & PRESETS
// ==========================================

export interface ButtonStyleOption {
  id: ButtonStyle;
  name: string;
  description: string;
}

export const BUTTON_STYLE_OPTIONS: Array<{ id: ButtonStyle; name: string; description: string }> = [
  {
    id: "solid",
    name: "Solid",
    description: "Pure solid fill in selected color with clean modern elevation.",
  },
  {
    id: "gradient_luxe",
    name: "Luxe Gradient",
    description: "Dynamic metallic sheen gradient blending selected color with light luster.",
  },
  {
    id: "shadow_gold",
    name: "Glow Shadow",
    description: "Deep diffused colored drop-shadow emanating from selected color.",
  },
  {
    id: "clay_3d",
    name: "Tactile 3D",
    description: "Push-button depth with extruded physical bottom bevel and 3D shadow.",
  },
  {
    id: "velvet_matte",
    name: "Inset Bevel",
    description: "Pressed inner bevel with tactile engraved depth.",
  },
  {
    id: "pill",
    name: "Smooth Pill",
    description: "Full pill rounded geometry with subtle elevation.",
  },
  {
    id: "metallic_chrome",
    name: "Chrome Trim",
    description: "Specular metallic reflection gradient with highlighted top edge.",
  },
  {
    id: "prism_holo",
    name: "Gloss Sheen",
    description: "Apple-style glass reflection sheen over the selected color.",
  },
  {
    id: "brutalist",
    name: "Brutalist Pop",
    description: "High-contrast thick border with a solid offset drop-shadow.",
  },
  {
    id: "glow_pulse",
    name: "Aura Halo",
    description: "Radiant ambient glowing halo in selected color surrounding the button.",
  },
  {
    id: "retro_double",
    name: "Double Rim",
    description: "Gilded double-line luxury framing on selected color.",
  },
  {
    id: "leather_stitch",
    name: "Stitched",
    description: "Bespoke dashed contrast border reminiscent of luxury tailor goods.",
  },
  {
    id: "neon",
    name: "Neon Flare",
    description: "High-intensity neon edge flare with intense outer luminescence.",
  },
  {
    id: "outline",
    name: "Etched Frame",
    description: "Crisp inlaid border frame etched into selected color.",
  },
  {
    id: "soft",
    name: "Soft Satin",
    description: "Subtle velvet satin inner glow with smooth tactile surface.",
  },
  {
    id: "glass",
    name: "Frosted Luxe",
    description: "Frosted glass luster with specular top shine on selected color.",
  },
];

export const BUTTON_RADIUS_OPTIONS: Array<{ id: string; name: string; cssRadius: string }> = [
  { id: "rounded-none", name: "Sharp (0px)", cssRadius: "0px" },
  { id: "rounded-md", name: "Subtle (6px)", cssRadius: "6px" },
  { id: "rounded-xl", name: "Modern (12px)", cssRadius: "12px" },
  { id: "rounded-2xl", name: "Luxe (16px)", cssRadius: "16px" },
  { id: "rounded-full", name: "Pill (9999px)", cssRadius: "9999px" },
];

/**
 * Computes live button CSSProperties for any button in the profile based on theme settings.
 * ALL styles strictly inherit from the user's selected button color (palette.buttonBackground || palette.accentGold)!
 */
export const getProfileButtonStyles = (
  theme: ProfileThemeConfig,
  overrides?: { isSelected?: boolean; isSecondary?: boolean }
): React.CSSProperties => {
  const { palette, geometry } = theme;
  const buttonStyle = geometry.buttonStyle || "solid";
  const btnBg = palette.buttonBackground || palette.accentGold || "#D4AF37";
  const btnText = palette.buttonText || "#1A1C20";
  const accent = palette.accentGold || btnBg;

  let backgroundColor = btnBg;
  let color = btnText;
  let border = "none";
  let boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
  let backdropFilter = "none";
  let backgroundImage = "none";

  // Check radius
  const radiusMap: Record<string, string> = {
    "rounded-none": "0px",
    "rounded-sm": "4px",
    "rounded-md": "6px",
    "rounded-lg": "8px",
    "rounded-xl": "12px",
    "rounded-2xl": "16px",
    "rounded-3xl": "24px",
    "rounded-full": "9999px",
  };
  const borderRadius = radiusMap[geometry.buttonRadius] || "12px";

  if (buttonStyle === "solid") {
    backgroundColor = btnBg;
    color = btnText;
    boxShadow = "0 2px 8px rgba(0,0,0,0.12)";
  } else if (buttonStyle === "shadow_gold") {
    backgroundColor = btnBg;
    color = btnText;
    boxShadow = `0 8px 22px -3px ${btnBg}88, 0 3px 8px -2px ${btnBg}55`;
  } else if (buttonStyle === "gradient_luxe") {
    backgroundColor = btnBg;
    backgroundImage = `linear-gradient(135deg, ${btnBg} 0%, rgba(255,255,255,0.22) 50%, ${btnBg} 100%)`;
    color = btnText;
    border = "1px solid rgba(255,255,255,0.35)";
    boxShadow = `0 6px 18px -3px ${btnBg}66`;
  } else if (buttonStyle === "clay_3d") {
    backgroundColor = btnBg;
    color = btnText;
    boxShadow = `inset 0 2px 3px rgba(255,255,255,0.45), inset 0 -2px 3px rgba(0,0,0,0.25), 0 4px 0px rgba(0,0,0,0.25), 0 6px 14px rgba(0,0,0,0.15)`;
  } else if (buttonStyle === "velvet_matte") {
    backgroundColor = btnBg;
    color = btnText;
    boxShadow = "inset 0 3px 6px rgba(0,0,0,0.35), inset 0 -1px 2px rgba(255,255,255,0.25)";
  } else if (buttonStyle === "pill") {
    backgroundColor = btnBg;
    color = btnText;
    boxShadow = `0 4px 14px ${btnBg}44`;
  } else if (buttonStyle === "metallic_chrome") {
    backgroundColor = btnBg;
    backgroundImage = `linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.18) 100%)`;
    color = btnText;
    border = "1px solid rgba(255,255,255,0.5)";
    boxShadow = `inset 0 1px 2px rgba(255,255,255,0.7), 0 4px 12px ${btnBg}44`;
  } else if (buttonStyle === "prism_holo") {
    backgroundColor = btnBg;
    backgroundImage = `linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 49%, rgba(0,0,0,0.06) 50%, transparent 100%)`;
    color = btnText;
    border = "1px solid rgba(255,255,255,0.4)";
    boxShadow = `inset 0 1px 1px rgba(255,255,255,0.6), 0 4px 14px ${btnBg}44`;
  } else if (buttonStyle === "brutalist") {
    backgroundColor = btnBg;
    color = btnText;
    border = "2px solid #1A1C20";
    boxShadow = "3px 3px 0px #1A1C20";
  } else if (buttonStyle === "glow_pulse") {
    backgroundColor = btnBg;
    color = btnText;
    boxShadow = `0 0 22px 2px ${btnBg}99, 0 4px 12px ${btnBg}55`;
  } else if (buttonStyle === "neon") {
    backgroundColor = btnBg;
    color = btnText;
    border = "2px solid rgba(255,255,255,0.85)";
    boxShadow = `0 0 18px ${btnBg}, inset 0 0 8px rgba(255,255,255,0.35)`;
  } else if (buttonStyle === "outline") {
    backgroundColor = btnBg;
    color = btnText;
    border = "2px solid rgba(255,255,255,0.8)";
    boxShadow = "inset 0 0 0 1.5px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.1)";
  } else if (buttonStyle === "soft") {
    backgroundColor = btnBg;
    color = btnText;
    boxShadow = "inset 0 0 14px rgba(255,255,255,0.3), 0 2px 8px rgba(0,0,0,0.1)";
  } else if (buttonStyle === "glass") {
    backgroundColor = btnBg;
    backgroundImage = "linear-gradient(135deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.06) 100%)";
    backdropFilter = "blur(12px)";
    border = "1.5px solid rgba(255,255,255,0.45)";
    color = btnText;
    boxShadow = `inset 0 1px 2px rgba(255,255,255,0.5), 0 4px 14px ${btnBg}44`;
  } else if (buttonStyle === "retro_double") {
    backgroundColor = btnBg;
    color = btnText;
    border = "3.5px double rgba(255,255,255,0.85)";
    boxShadow = "0 3px 10px rgba(0,0,0,0.12)";
  } else if (buttonStyle === "leather_stitch") {
    backgroundColor = btnBg;
    color = btnText;
    border = "1.5px dashed rgba(255,255,255,0.8)";
    boxShadow = "inset 0 1px 3px rgba(0,0,0,0.18), 0 3px 8px rgba(0,0,0,0.1)";
  }

  // Handle selected state in toggle groups
  if (overrides?.isSelected) {
    boxShadow = `0 0 0 2px ${palette.background}, 0 0 0 4px ${accent}`;
  }

  return {
    backgroundColor,
    backgroundImage: backgroundImage !== "none" ? backgroundImage : undefined,
    color,
    border,
    boxShadow,
    borderRadius: buttonStyle === "pill" ? "9999px" : borderRadius,
    backdropFilter,
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  };
};
