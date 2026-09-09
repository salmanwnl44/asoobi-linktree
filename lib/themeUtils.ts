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
  {
    id: "Playfair Display",
    name: "Playfair Display",
    category: "Luxury Editorial Serif",
    cssFamily: "'Playfair Display', Georgia, serif",
    previewSample: "Maison & Haute Horlogerie",
  },
  {
    id: "Cinzel",
    name: "Cinzel",
    category: "Imperial Roman Luxury",
    cssFamily: "'Cinzel', serif",
    previewSample: "ATELIER ROIALE MCMXCIV",
  },
  {
    id: "Syne",
    name: "Syne Avant-Garde",
    category: "High Fashion / Art",
    cssFamily: "'Syne', sans-serif",
    previewSample: "Avant-Garde Studio '26",
  },
  {
    id: "Cormorant Garamond",
    name: "Cormorant Garamond",
    category: "Classical Atelier",
    cssFamily: "'Cormorant Garamond', Garamond, serif",
    previewSample: "Private Client Atelier Drops",
  },
  {
    id: "Lora",
    name: "Lora",
    category: "Contemporary Literary",
    cssFamily: "'Lora', serif",
    previewSample: "Curated Stories & Essays",
  },
  {
    id: "Bebas Neue",
    name: "Bebas Neue",
    category: "Bold Headline Display",
    cssFamily: "'Bebas Neue', cursive, sans-serif",
    previewSample: "EXCLUSIVE DROP LIVE NOW",
  },
  {
    id: "Outfit",
    name: "Outfit Contemporary",
    category: "Modern Minimalist",
    cssFamily: "'Outfit', sans-serif",
    previewSample: "Curated Creator Portfolios",
  },
  {
    id: "Space Grotesk",
    name: "Space Grotesk",
    category: "Neo-Brutalist / Tech",
    cssFamily: "'Space Grotesk', monospace, sans-serif",
    previewSample: "HyperScale Terminal 3.0",
  },
  {
    id: "Plus Jakarta Sans",
    name: "Plus Jakarta Sans",
    category: "Clean Premium",
    cssFamily: "'Plus Jakarta Sans', sans-serif",
    previewSample: "Executive Advisory Brief",
  },
  {
    id: "DM Sans",
    name: "DM Sans",
    category: "Geometric Swiss Precision",
    cssFamily: "'DM Sans', sans-serif",
    previewSample: "Design Systems & Architecture",
  },
  {
    id: "Montserrat",
    name: "Montserrat",
    category: "Modern Architectural",
    cssFamily: "'Montserrat', sans-serif",
    previewSample: "Urban Atelier & Co.",
  },
  {
    id: "Inter",
    name: "Inter Modernist",
    category: "Swiss Modern",
    cssFamily: "'Inter', sans-serif",
    previewSample: "Universal Creator Profile",
  },
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
  { id: "DM Sans", name: "DM Sans", category: "Geometric Swiss", cssFamily: "'DM Sans', sans-serif", previewSample: "Balanced proportions and humanistic touches." },
  { id: "Space Grotesk", name: "Space Grotesk", category: "Tech Monospace", cssFamily: "'Space Grotesk', monospace", previewSample: "Distinct technical flavor and digital vibe." },
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

export const BUTTON_STYLE_OPTIONS: ButtonStyleOption[] = [
  {
    id: "shadow_gold",
    name: "Gilded Shadow (Signature)",
    description: "Rich solid color with warm elevated color-matched ambient glow shadow.",
  },
  {
    id: "solid",
    name: "Solid Clean",
    description: "Crisp uniform background with crisp high-contrast text.",
  },
  {
    id: "outline",
    name: "Modern Outline",
    description: "Transparent surface with a sharp hairline border in accent color.",
  },
  {
    id: "soft",
    name: "Soft Pastel Tint",
    description: "Translucent tinted wash with high-contrast accent text.",
  },
  {
    id: "glass",
    name: "Frosted Glassmorphism",
    description: "Ultra-modern translucent glass with backdrop blur and delicate edge lighting.",
  },
  {
    id: "brutalist",
    name: "Neo-Brutalist Hard",
    description: "High-contrast thick border with a solid 3px drop-shadow offset.",
  },
  {
    id: "pill",
    name: "Smooth Pill",
    description: "Full pill rounded geometry with fluid active scale click dynamics.",
  },
  {
    id: "neon",
    name: "Cyber Neon Glow",
    description: "Dark surface with electric neon border and vivid outward glow shadow.",
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
 * Computes live button CSSProperties for any button in the profile based on theme settings
 */
export const getProfileButtonStyles = (
  theme: ProfileThemeConfig,
  overrides?: { isSelected?: boolean; isSecondary?: boolean }
): React.CSSProperties => {
  const { palette, geometry } = theme;
  const buttonStyle = geometry.buttonStyle || "solid";
  const btnBg = palette.buttonBackground || palette.accentGold;
  const btnText = palette.buttonText || "#1A1C20";
  const accent = palette.accentGold;

  let backgroundColor = btnBg;
  let color = btnText;
  let border = "none";
  let boxShadow = "none";
  let backdropFilter = "none";

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
    boxShadow = "0 2px 6px rgba(0,0,0,0.06)";
  } else if (buttonStyle === "shadow_gold") {
    backgroundColor = btnBg;
    color = btnText;
    boxShadow = `0 8px 20px -3px ${accent}55, 0 2px 6px -1px ${accent}33`;
  } else if (buttonStyle === "outline") {
    backgroundColor = "transparent";
    color = btnBg;
    border = `1.5px solid ${btnBg}`;
  } else if (buttonStyle === "soft") {
    backgroundColor = `${btnBg}22`;
    color = btnBg;
    border = `1px solid ${btnBg}33`;
  } else if (buttonStyle === "glass") {
    backgroundColor = "rgba(255, 255, 255, 0.12)";
    color = palette.primaryText;
    border = "1px solid rgba(255, 255, 255, 0.25)";
    backdropFilter = "blur(12px)";
    boxShadow = "0 4px 16px rgba(0, 0, 0, 0.08)";
  } else if (buttonStyle === "brutalist") {
    backgroundColor = btnBg;
    color = btnText;
    border = "2px solid #1A1C20";
    boxShadow = "3px 3px 0px #1A1C20";
  } else if (buttonStyle === "pill") {
    backgroundColor = btnBg;
    color = btnText;
    boxShadow = `0 4px 14px ${accent}33`;
  } else if (buttonStyle === "neon") {
    backgroundColor = "#0E0E12";
    color = accent;
    border = `1.5px solid ${accent}`;
    boxShadow = `0 0 16px ${accent}66, inset 0 0 8px ${accent}22`;
  }

  // Handle selected state in toggle groups (like support banner amounts)
  if (overrides?.isSelected) {
    boxShadow = `0 0 0 2px ${palette.background}, 0 0 0 4px ${accent}`;
  }

  return {
    backgroundColor,
    color,
    border,
    boxShadow,
    borderRadius: buttonStyle === "pill" ? "9999px" : borderRadius,
    backdropFilter,
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  };
};
