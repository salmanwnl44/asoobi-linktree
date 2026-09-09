import { CardDesignConfig, CardDesignPresetId, ProfileThemeConfig } from "@/types/builder";

export type CardCategoryType = 
  | "All"
  | "Luxury & Atelier"
  | "Modern & Bento"
  | "Creative & 3D"
  | "Minimal & Technical";

export interface CardDesignPreset {
  id: CardDesignPresetId;
  name: string;
  category: "Luxury & Atelier" | "Modern & Bento" | "Creative & 3D" | "Minimal & Technical";
  tagline: string;
  description: string;
  config: CardDesignConfig;
  preview: {
    badge: string;
    sampleTitle: string;
    sampleSubtitle: string;
    accentColor: string;
    surfaceBg: string;
  };
}

export const DEFAULT_CARD_DESIGN: CardDesignConfig = {
  presetId: "luxury_gold",
  name: "Asoobi Imperial Gold",
  borderRadius: "rounded-2xl",
  borderStyle: "gold_accent",
  shadowStyle: "gold_glow",
  surfaceStyle: "solid",
  hoverEffect: "lift",
  padding: "normal",
  accentColor: "#D4AF37",
};

export const CARD_DESIGN_PRESETS: CardDesignPreset[] = [
  // ==========================================
  // 1. LUXURY & ATELIER
  // ==========================================
  {
    id: "luxury_gold",
    name: "Asoobi Imperial Gold",
    category: "Luxury & Atelier",
    tagline: "Signature gilded border with champagne warmth",
    description: "Delicate gilded hairline border with warm champagne highlights and subtle gold ambient elevation.",
    config: {
      presetId: "luxury_gold",
      name: "Asoobi Imperial Gold",
      borderRadius: "rounded-2xl",
      borderStyle: "gold_accent",
      shadowStyle: "gold_glow",
      surfaceStyle: "solid",
      hoverEffect: "lift",
      padding: "normal",
      accentColor: "#D4AF37",
    },
    preview: {
      badge: "SIGNATURE",
      sampleTitle: "Editorial Lookbook '26",
      sampleSubtitle: "Curated Milan & Paris Drops",
      accentColor: "#D4AF37",
      surfaceBg: "#FFFFFF",
    },
  },
  {
    id: "retro_editorial",
    name: "Monograph Double-Line",
    category: "Luxury & Atelier",
    tagline: "Museum monograph with double gilded lines",
    description: "Classic double-line gilded framing inspired by vintage Paris lookbooks and luxury monograph prints.",
    config: {
      presetId: "retro_editorial",
      name: "Monograph Double-Line",
      borderRadius: "rounded-md",
      borderStyle: "double_editorial",
      shadowStyle: "soft",
      surfaceStyle: "solid",
      hoverEffect: "lift",
      padding: "normal",
      accentColor: "#9A7B38",
    },
    preview: {
      badge: "EDITORIAL",
      sampleTitle: "Maison de Couture",
      sampleSubtitle: "Private Client Atelier Appointments",
      accentColor: "#9A7B38",
      surfaceBg: "#FCFBF8",
    },
  },
  {
    id: "midnight_velvet",
    name: "Midnight Velvet Noir",
    category: "Luxury & Atelier",
    tagline: "Onyx matte texture with metallic gilded trim",
    description: "Deep obsidian backdrop with gold metallic edge glow and luxurious velvet matte finish.",
    config: {
      presetId: "midnight_velvet",
      name: "Midnight Velvet Noir",
      borderRadius: "rounded-2xl",
      borderStyle: "gold_accent",
      shadowStyle: "gold_glow",
      surfaceStyle: "glass",
      hoverEffect: "lift",
      padding: "normal",
      accentColor: "#F59E0B",
    },
    preview: {
      badge: "NOIR",
      sampleTitle: "Midnight Collection VIP",
      sampleSubtitle: "Private Access Catalog",
      accentColor: "#F59E0B",
      surfaceBg: "#121316",
    },
  },
  {
    id: "leather_stitch",
    name: "Parisian Saddle-Stitch",
    category: "Luxury & Atelier",
    tagline: "Cognac leather grain with fine saddle stitch",
    description: "Embossed luxury leather aesthetic featuring dashed artisan saddle-stitching and subtle gold foil stamping.",
    config: {
      presetId: "leather_stitch",
      name: "Parisian Saddle-Stitch",
      borderRadius: "rounded-2xl",
      borderStyle: "leather_stitch",
      shadowStyle: "soft",
      surfaceStyle: "solid",
      hoverEffect: "lift",
      padding: "normal",
      accentColor: "#C2844B",
    },
    preview: {
      badge: "ARTISAN",
      sampleTitle: "Craft & Leather Goods",
      sampleSubtitle: "Handmade Florentine Goods",
      accentColor: "#C2844B",
      surfaceBg: "#FAF6F0",
    },
  },
  {
    id: "horology_gilded",
    name: "Swiss Horology Brass",
    category: "Luxury & Atelier",
    tagline: "Precision watchmaker chamfer & brushed gold",
    description: "Inspired by haute horology dials with chamfered metallic borders, satin brass reflections, and chronometer elegance.",
    config: {
      presetId: "horology_gilded",
      name: "Swiss Horology Brass",
      borderRadius: "rounded-xl",
      borderStyle: "gold_accent",
      shadowStyle: "gold_glow",
      surfaceStyle: "translucent",
      hoverEffect: "scale",
      padding: "normal",
      accentColor: "#E5C158",
    },
    preview: {
      badge: "CHRONO",
      sampleTitle: "Chronometer Atelier",
      sampleSubtitle: "Geneva Watchmaking Masterpieces",
      accentColor: "#E5C158",
      surfaceBg: "#1E1F24",
    },
  },

  // ==========================================
  // 2. MODERN & BENTO
  // ==========================================
  {
    id: "bento_tile",
    name: "Bento Modular Tile",
    category: "Modern & Bento",
    tagline: "Trend-forward modular Bento box architecture",
    description: "The 2026 industry standard Bento UI layout with clean compartmentalized squircle curves and structured hierarchy.",
    config: {
      presetId: "bento_tile",
      name: "Bento Modular Tile",
      borderRadius: "rounded-3xl",
      borderStyle: "subtle",
      shadowStyle: "ambient_spread",
      surfaceStyle: "solid",
      hoverEffect: "scale",
      padding: "normal",
      accentColor: "#6366F1",
    },
    preview: {
      badge: "BENTO",
      sampleTitle: "Modular Workspace",
      sampleSubtitle: "All-in-one Notion & Figma Stack",
      accentColor: "#6366F1",
      surfaceBg: "#FFFFFF",
    },
  },
  {
    id: "glassmorphism",
    name: "Frosted Glassmorphism",
    category: "Modern & Bento",
    tagline: "Translucent frosted acrylic with depth",
    description: "Translucent frosted acrylic panel with backdrop blur, light refraction border, and floating depth.",
    config: {
      presetId: "glassmorphism",
      name: "Frosted Glassmorphism",
      borderRadius: "rounded-2xl",
      borderStyle: "subtle",
      shadowStyle: "floating",
      surfaceStyle: "glass",
      hoverEffect: "scale",
      padding: "normal",
      accentColor: "#818CF8",
    },
    preview: {
      badge: "GLASS",
      sampleTitle: "Studio Soundscapes",
      sampleSubtitle: "Ambient Sessions & Mixes",
      accentColor: "#818CF8",
      surfaceBg: "rgba(255,255,255,0.65)",
    },
  },
  {
    id: "cupertino_glass",
    name: "Cupertino Spatial Glass",
    category: "Modern & Bento",
    tagline: "VisionOS-inspired ultra-pure spatial glass",
    description: "Refined spatial glass with prismatic edge sheen, ambient depth refraction, and ultra-fluid spring physics.",
    config: {
      presetId: "cupertino_glass",
      name: "Cupertino Spatial Glass",
      borderRadius: "rounded-3xl",
      borderStyle: "subtle",
      shadowStyle: "floating",
      surfaceStyle: "glass",
      hoverEffect: "scale",
      padding: "normal",
      accentColor: "#38BDF8",
    },
    preview: {
      badge: "SPATIAL",
      sampleTitle: "Spatial Audio Releases",
      sampleSubtitle: "Immersive Dolby Atmos Mixes",
      accentColor: "#38BDF8",
      surfaceBg: "rgba(255,255,255,0.78)",
    },
  },
  {
    id: "floating_elevation",
    name: "Floating High-Rise",
    category: "Modern & Bento",
    tagline: "Cinematic layered diffuse drop shadow",
    description: "Multi-tier diffuse shadow that makes cards appear suspended effortlessly above the profile backdrop.",
    config: {
      presetId: "floating_elevation",
      name: "Floating High-Rise",
      borderRadius: "rounded-2xl",
      borderStyle: "none",
      shadowStyle: "floating",
      surfaceStyle: "solid",
      hoverEffect: "lift",
      padding: "normal",
      accentColor: "#D4AF37",
    },
    preview: {
      badge: "ELEVATED",
      sampleTitle: "Architectural Portfolio",
      sampleSubtitle: "Minimalist Residences 2026",
      accentColor: "#D4AF37",
      surfaceBg: "#FFFFFF",
    },
  },
  {
    id: "soft_neumorphic",
    name: "Tactile Neumorphic",
    category: "Modern & Bento",
    tagline: "Pillowy clay embossed squircle card",
    description: "Ultra-soft dual shadow highlights giving an organic embossed tactile button feel on your profile.",
    config: {
      presetId: "soft_neumorphic",
      name: "Tactile Neumorphic",
      borderRadius: "rounded-3xl",
      borderStyle: "none",
      shadowStyle: "neumorphic",
      surfaceStyle: "inset",
      hoverEffect: "lift",
      padding: "normal",
      accentColor: "#D97706",
    },
    preview: {
      badge: "TACTILE",
      sampleTitle: "Spatial Audio Works",
      sampleSubtitle: "Interactive 3D Environments",
      accentColor: "#D97706",
      surfaceBg: "#F6F5F2",
    },
  },

  // ==========================================
  // 3. CREATIVE & 3D
  // ==========================================
  {
    id: "neo_brutalist",
    name: "Neo-Brutalist Pop",
    category: "Creative & 3D",
    tagline: "High-contrast bold stroke & hard drop shadow",
    description: "Graphic design-forward aesthetic with crisp 2.5px solid border and high-contrast offset block shadow.",
    config: {
      presetId: "neo_brutalist",
      name: "Neo-Brutalist Pop",
      borderRadius: "rounded-xl",
      borderStyle: "brutalist_bold",
      shadowStyle: "hard_brutalist",
      surfaceStyle: "solid",
      hoverEffect: "bounce",
      padding: "normal",
      accentColor: "#1A1C20",
    },
    preview: {
      badge: "BOLD",
      sampleTitle: "Graphic Art Capsule",
      sampleSubtitle: "Limited Edition Silkscreen Prints",
      accentColor: "#1A1C20",
      surfaceBg: "#FFFDF9",
    },
  },
  {
    id: "claymorphism",
    name: "Claymorphism 3D Puff",
    category: "Creative & 3D",
    tagline: "Playful inflated 3D clay cushion surface",
    description: "Trending tactile clay aesthetic with soft puffed curvature, gentle inner highlights, and approachable warmth.",
    config: {
      presetId: "claymorphism",
      name: "Claymorphism 3D Puff",
      borderRadius: "rounded-3xl",
      borderStyle: "none",
      shadowStyle: "clay_3d",
      surfaceStyle: "clay",
      hoverEffect: "lift",
      padding: "normal",
      accentColor: "#F472B6",
    },
    preview: {
      badge: "CLAY 3D",
      sampleTitle: "Playful 3D Assets Pack",
      sampleSubtitle: "120+ Rendered Clay Icons",
      accentColor: "#F472B6",
      surfaceBg: "#FFF5F7",
    },
  },
  {
    id: "y2k_chrome",
    name: "Y2K Liquid Chrome",
    category: "Creative & 3D",
    tagline: "Metallic chrome shimmer with cyberpunk pop",
    description: "Nostalgic Y2K metallic liquid silver borders with iridescent reflections, high-gloss accents, and rebellious grit.",
    config: {
      presetId: "y2k_chrome",
      name: "Y2K Liquid Chrome",
      borderRadius: "rounded-2xl",
      borderStyle: "chrome_metallic",
      shadowStyle: "neon",
      surfaceStyle: "metallic",
      hoverEffect: "scale",
      padding: "normal",
      accentColor: "#A78BFA",
    },
    preview: {
      badge: "Y2K CHROME",
      sampleTitle: "Cyber Pop EP Drop",
      sampleSubtitle: "Limited Metallic Cassettes",
      accentColor: "#A78BFA",
      surfaceBg: "#16161E",
    },
  },
  {
    id: "aurora_glow",
    name: "Aurora Ambient Glow",
    category: "Creative & 3D",
    tagline: "Multi-spectrum iridescent perimeter aura",
    description: "Radiant ambient lighting edge with shimmering gradient transitions inspired by Northern Lights.",
    config: {
      presetId: "aurora_glow",
      name: "Aurora Ambient Glow",
      borderRadius: "rounded-2xl",
      borderStyle: "glow",
      shadowStyle: "neon",
      surfaceStyle: "gradient",
      hoverEffect: "glow",
      padding: "normal",
      accentColor: "#EC4899",
    },
    preview: {
      badge: "AURORA",
      sampleTitle: "Cyber Symphony",
      sampleSubtitle: "Live Stream Concert Drops",
      accentColor: "#EC4899",
      surfaceBg: "rgba(255,255,255,0.92)",
    },
  },
  {
    id: "holographic_foil",
    name: "Holographic Rainbow Foil",
    category: "Creative & 3D",
    tagline: "Prismatic rainbow diffraction foil edge",
    description: "Spectral rainbow diffraction borders that shift colors with light, giving cards a collectible trading card luster.",
    config: {
      presetId: "holographic_foil",
      name: "Holographic Rainbow Foil",
      borderRadius: "rounded-2xl",
      borderStyle: "rainbow_prism",
      shadowStyle: "gold_glow",
      surfaceStyle: "translucent",
      hoverEffect: "scale",
      padding: "normal",
      accentColor: "#10B981",
    },
    preview: {
      badge: "HOLO FOIL",
      sampleTitle: "Collector's First Edition",
      sampleSubtitle: "Numbered Digital Pass #042",
      accentColor: "#10B981",
      surfaceBg: "#FFFFFF",
    },
  },
  {
    id: "cyber_neon",
    name: "Cyberpunk Amber Glow",
    category: "Creative & 3D",
    tagline: "Electric neon perimeter with tech HUD vibe",
    description: "Futuristic neon amber aura with high-contrast badge accents, heads-up display lines, and electric presence.",
    config: {
      presetId: "cyber_neon",
      name: "Cyberpunk Amber Glow",
      borderRadius: "rounded-xl",
      borderStyle: "glow",
      shadowStyle: "neon",
      surfaceStyle: "solid",
      hoverEffect: "glow",
      padding: "normal",
      accentColor: "#EAB308",
    },
    preview: {
      badge: "NEON HUD",
      sampleTitle: "Web3 Protocol Vault",
      sampleSubtitle: "Decentralized Liquidity Vaults",
      accentColor: "#EAB308",
      surfaceBg: "#18181B",
    },
  },

  // ==========================================
  // 4. MINIMAL & TECHNICAL
  // ==========================================
  {
    id: "technical_mono",
    name: "Technical Monospace CLI",
    category: "Minimal & Technical",
    tagline: "Command-line precision for developers & founders",
    description: "Stark monospace typography, terminal prompt '>_' indicators, 1px engineered dividers, and code-forward rigor.",
    config: {
      presetId: "technical_mono",
      name: "Technical Monospace CLI",
      borderRadius: "rounded-md",
      borderStyle: "subtle",
      shadowStyle: "none",
      surfaceStyle: "solid",
      hoverEffect: "bounce",
      padding: "compact",
      accentColor: "#10B981",
    },
    preview: {
      badge: "CLI // DEV",
      sampleTitle: "> open_source_repo.git",
      sampleSubtitle: "14.2k stars • MIT License",
      accentColor: "#10B981",
      surfaceBg: "#13151A",
    },
  },
  {
    id: "swiss_grid",
    name: "Swiss Typographic Grid",
    category: "Minimal & Technical",
    tagline: "Bauhaus international asymmetric black rule",
    description: "Rooted in Swiss International Typographic style with bold asymmetric black left rules and disciplined whitespace.",
    config: {
      presetId: "swiss_grid",
      name: "Swiss Typographic Grid",
      borderRadius: "rounded-none",
      borderStyle: "brutalist_bold",
      shadowStyle: "none",
      surfaceStyle: "solid",
      hoverEffect: "shimmer",
      padding: "normal",
      accentColor: "#1A1C20",
    },
    preview: {
      badge: "SWISS STYLE",
      sampleTitle: "Zürich Design Biennale",
      sampleSubtitle: "Monochrome Exhibition Catalog",
      accentColor: "#1A1C20",
      surfaceBg: "#FFFFFF",
    },
  },
  {
    id: "wabi_sabi",
    name: "Wabi-Sabi Zen Linen",
    category: "Minimal & Technical",
    tagline: "Organic oatmeal linen texture & calm serenity",
    description: "Natural organic warmth with soft linen surface tones, gentle tactile borders, and soothing wabi-sabi balance.",
    config: {
      presetId: "wabi_sabi",
      name: "Wabi-Sabi Zen Linen",
      borderRadius: "rounded-2xl",
      borderStyle: "subtle",
      shadowStyle: "soft",
      surfaceStyle: "linen",
      hoverEffect: "lift",
      padding: "normal",
      accentColor: "#A38B78",
    },
    preview: {
      badge: "ZEN LINEN",
      sampleTitle: "Slow Living Journal",
      sampleSubtitle: "Ceramics & Mindful Living",
      accentColor: "#A38B78",
      surfaceBg: "#F7F5F0",
    },
  },
  {
    id: "minimal_flat",
    name: "Pure Hairline Minimal",
    category: "Minimal & Technical",
    tagline: "Ultra-clean hairline divider with no shadow",
    description: "Featherweight hairline border with no shadow, generous breathing room, and whisper micro-transitions.",
    config: {
      presetId: "minimal_flat",
      name: "Pure Hairline Minimal",
      borderRadius: "rounded-xl",
      borderStyle: "subtle",
      shadowStyle: "none",
      surfaceStyle: "solid",
      hoverEffect: "shimmer",
      padding: "normal",
      accentColor: "#52525B",
    },
    preview: {
      badge: "MINIMAL",
      sampleTitle: "Writing & Essays",
      sampleSubtitle: "Substack Monthly Dispatches",
      accentColor: "#52525B",
      surfaceBg: "#FFFFFF",
    },
  },
  {
    id: "outline_pill",
    name: "Capsule Pill",
    category: "Minimal & Technical",
    tagline: "Aerodynamic full-pill curve with colored trim",
    description: "Full pill rounded curvature with crisp accent border and centered aerodynamic flow.",
    config: {
      presetId: "outline_pill",
      name: "Capsule Pill",
      borderRadius: "rounded-full",
      borderStyle: "subtle",
      shadowStyle: "none",
      surfaceStyle: "translucent",
      hoverEffect: "scale",
      padding: "compact",
      accentColor: "#2563EB",
    },
    preview: {
      badge: "CAPSULE",
      sampleTitle: "Daily Podcast Feed",
      sampleSubtitle: "Episode 142 Available Now",
      accentColor: "#2563EB",
      surfaceBg: "rgba(255,255,255,0.8)",
    },
  },
  {
    id: "compact_tile",
    name: "Compact Tile Grid",
    category: "Minimal & Technical",
    tagline: "High-density layout for 10+ links",
    description: "Space-optimized micro padding with crisp edges for high-density portfolios with 10+ links.",
    config: {
      presetId: "compact_tile",
      name: "Compact Tile Grid",
      borderRadius: "rounded-lg",
      borderStyle: "subtle",
      shadowStyle: "soft",
      surfaceStyle: "solid",
      hoverEffect: "lift",
      padding: "compact",
      accentColor: "#059669",
    },
    preview: {
      badge: "COMPACT",
      sampleTitle: "Quick Resources & Guides",
      sampleSubtitle: "Cheat sheets & downloadable tools",
      accentColor: "#059669",
      surfaceBg: "#FFFFFF",
    },
  },
];


/**
 * Helper to determine if a theme palette has a dark background.
 */
export function isDarkTheme(palette?: ProfileThemeConfig["palette"]): boolean {
  if (!palette) return false;
  const bg = palette.background || "#FFFFFF";
  if (bg.startsWith("#")) {
    const hex = bg.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16) || 0;
    const g = parseInt(hex.substring(2, 4), 16) || 0;
    const b = parseInt(hex.substring(4, 6), 16) || 0;
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.5;
  }
  return false;
}

/**
 * Helper to compute the CSS class names for a card container based on the card design configuration.
 */
export function getCardWrapperClasses(cardDesign?: CardDesignConfig): string {
  const design = cardDesign || DEFAULT_CARD_DESIGN;
  const radius = design.borderRadius || "rounded-2xl";

  const hoverEffectClasses: Record<string, string> = {
    lift: "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:translate-y-0",
    scale: "transition-all duration-300 hover:scale-[1.015] active:scale-[0.99]",
    glow: "transition-all duration-300 hover:ring-2 hover:ring-current/40 hover:shadow-xl",
    bounce: "transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0",
    shimmer: "transition-all duration-300 hover:brightness-105",
    invert: "transition-all duration-300 hover:invert",
    tilt: "transition-all duration-200 hover:-rotate-0.5 hover:-translate-y-1 active:rotate-0",
  };

  const hoverClass = hoverEffectClasses[design.hoverEffect] || hoverEffectClasses.lift;

  const backdropClass = design.surfaceStyle === "glass" 
    ? "backdrop-blur-xl" 
    : design.surfaceStyle === "translucent" 
    ? "backdrop-blur-md" 
    : "";

  return `w-full overflow-hidden ${radius} ${hoverClass} ${backdropClass}`;
}

/**
 * Helper to compute inline styles for a card container based on card design and theme palette.
 * Automatically adapts all borders, shadows, backgrounds, and text colors to the current theme!
 */
export function getCardWrapperStyle(
  cardDesign?: CardDesignConfig,
  themePalette?: ProfileThemeConfig["palette"]
): React.CSSProperties {
  const design = cardDesign || DEFAULT_CARD_DESIGN;
  const isDark = isDarkTheme(themePalette);

  // Theme palette accentGold takes precedence so changing theme immediately shifts the card's accent highlights!
  const accent = themePalette?.accentGold || design.accentColor || "#D4AF37";
  const fallbackBg = themePalette?.cardBackground || (isDark ? "#141418" : "#FFFFFF");
  const fallbackBorder = themePalette?.border || (isDark ? "#2A2A35" : "#E5E0D2");

  // Dynamic background matching both design texture and theme luminance
  let backgroundColor = fallbackBg;
  if (design.surfaceStyle === "glass") {
    backgroundColor = isDark
      ? (fallbackBg.startsWith("#") ? `${fallbackBg}CC` : "rgba(20, 20, 26, 0.75)")
      : (fallbackBg.startsWith("#") ? `${fallbackBg}B3` : "rgba(255, 255, 255, 0.72)");
  } else if (design.surfaceStyle === "translucent") {
    backgroundColor = isDark
      ? (fallbackBg.startsWith("#") ? `${fallbackBg}E6` : "rgba(24, 24, 32, 0.88)")
      : (fallbackBg.startsWith("#") ? `${fallbackBg}E6` : "rgba(255, 255, 255, 0.90)");
  } else if (design.surfaceStyle === "clay") {
    backgroundColor = isDark ? "#1C1D26" : "#FFF5F7";
  } else if (design.surfaceStyle === "linen") {
    backgroundColor = isDark ? "#181922" : "#F8F5EE";
  } else if (design.surfaceStyle === "metallic") {
    backgroundColor = isDark ? "#14151E" : "#F1F3F9";
  } else if (design.surfaceStyle === "gradient") {
    backgroundColor = fallbackBg;
  }

  // Border treatment adapting to light/dark themes
  let borderStyle = "solid";
  let borderWidth = "1px";
  let borderColor = fallbackBorder;

  if (design.borderStyle === "none") {
    borderWidth = "0px";
  } else if (design.borderStyle === "gold_accent") {
    borderWidth = "1.5px";
    borderColor = isDark ? `${accent}AA` : `${accent}88`;
  } else if (design.borderStyle === "brutalist_bold") {
    borderWidth = "2.5px";
    borderColor = isDark ? (themePalette?.primaryText || "#EDEDED") : "#1A1C20";
  } else if (design.borderStyle === "double_editorial") {
    borderStyle = "double";
    borderWidth = "4px";
    borderColor = isDark ? `${accent}DD` : `${accent}BB`;
  } else if (design.borderStyle === "leather_stitch") {
    borderStyle = "dashed";
    borderWidth = "1.5px";
    borderColor = isDark ? `${accent}AA` : `${accent}99`;
  } else if (design.borderStyle === "chrome_metallic") {
    borderWidth = "1.5px";
    borderColor = isDark ? "#64748B" : "#CBD5E1";
  } else if (design.borderStyle === "rainbow_prism") {
    borderWidth = "1.5px";
    borderColor = accent;
  } else if (design.borderStyle === "glow") {
    borderWidth = "1.5px";
    borderColor = accent;
  } else if (design.borderStyle === "dashed") {
    borderStyle = "dashed";
    borderWidth = "1.5px";
    borderColor = fallbackBorder;
  }

  // Shadow treatment with contrast-aware lighting
  let boxShadow = "none";
  if (design.shadowStyle === "soft") {
    boxShadow = isDark
      ? "0 4px 20px -2px rgba(0,0,0,0.45)"
      : "0 4px 20px -2px rgba(0,0,0,0.05)";
  } else if (design.shadowStyle === "floating") {
    boxShadow = isDark
      ? "0 18px 36px -6px rgba(0,0,0,0.65), 0 6px 14px -4px rgba(0,0,0,0.45)"
      : "0 18px 36px -6px rgba(0,0,0,0.09), 0 6px 14px -4px rgba(0,0,0,0.04)";
  } else if (design.shadowStyle === "gold_glow") {
    boxShadow = isDark
      ? `0 10px 28px -4px ${accent}44, 0 2px 8px -2px ${accent}2A`
      : `0 10px 28px -4px ${accent}2A, 0 2px 8px -2px ${accent}18`;
  } else if (design.shadowStyle === "hard_brutalist") {
    boxShadow = `4px 4px 0px ${isDark ? (themePalette?.primaryText || "#EDEDED") : "#1A1C20"}`;
  } else if (design.shadowStyle === "neumorphic") {
    boxShadow = isDark
      ? "6px 6px 16px rgba(0,0,0,0.65), -4px -4px 12px rgba(255,255,255,0.04)"
      : "6px 6px 16px rgba(0,0,0,0.06), -6px -6px 16px rgba(255,255,255,0.85)";
  } else if (design.shadowStyle === "clay_3d") {
    boxShadow = isDark
      ? `0 14px 28px rgba(0,0,0,0.55), inset 0 1.5px 3px rgba(255,255,255,0.08), inset 0 -1.5px 3px rgba(0,0,0,0.5)`
      : `0 14px 28px ${accent}22, inset 0 2px 4px rgba(255,255,255,0.9), inset 0 -2px 4px rgba(0,0,0,0.05)`;
  } else if (design.shadowStyle === "ambient_spread") {
    boxShadow = isDark
      ? `0 12px 32px -4px ${accent}33, 0 2px 8px rgba(0,0,0,0.5)`
      : `0 10px 30px -5px ${accent}22, 0 2px 6px rgba(0,0,0,0.03)`;
  } else if (design.shadowStyle === "neon") {
    boxShadow = `0 0 20px -2px ${accent}66, 0 4px 12px -2px rgba(0,0,0,0.35)`;
  }

  const textColor = themePalette?.primaryText || (isDark ? "#F3F4F6" : "#1A1C20");

  return {
    backgroundColor,
    borderStyle,
    borderWidth,
    borderColor,
    boxShadow,
    color: textColor,
  };
}
