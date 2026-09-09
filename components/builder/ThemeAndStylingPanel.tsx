"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  AsoobiProfileDocument, 
  ProfileThemeConfig, 
  HeadingFontFamily, 
  BodyFontFamily, 
  ButtonStyle, 
  BackgroundPatternType, 
  CardDesignConfig,
  CardDesignPresetId
} from "@/types/builder";
import { 
  Palette, 
  Sparkles, 
  Type, 
  Square, 
  Sliders, 
  Check, 
  RotateCcw, 
  ChevronDown,
  LayoutTemplate,
  Sun,
  Moon,
  Zap,
  Waves,
  Grid,
  Box,
  SlidersHorizontal,
  Search
} from "lucide-react";
import { CURATED_PLATFORM_THEMES } from "@/lib/blockTemplates";
import { 
  HEADING_FONT_OPTIONS, 
  BODY_FONT_OPTIONS, 
  BACKGROUND_PATTERN_OPTIONS, 
  BUTTON_STYLE_OPTIONS, 
  BUTTON_RADIUS_OPTIONS,
  getProfileButtonStyles
} from "@/lib/themeUtils";
import { 
  CARD_DESIGN_PRESETS, 
  DEFAULT_CARD_DESIGN, 
  getCardWrapperClasses, 
  getCardWrapperStyle 
} from "@/lib/cardDesigns";
import { AsoobiColorPicker } from "@/components/ui/AsoobiColorPicker";
import { PatternThumbnailBox } from "./PatternThumbnailBox";
import { AsoobiFontSelector } from "@/components/ui/AsoobiFontSelector";

export type ThemeSubTab = "all" | "colors" | "background" | "typography" | "buttons" | "cards";

interface ThemeAndStylingPanelProps {
  profile: AsoobiProfileDocument;
  setProfile: React.Dispatch<React.SetStateAction<AsoobiProfileDocument>>;
  activeSubTab?: ThemeSubTab;
  onSubTabChange?: (tab: ThemeSubTab) => void;
  selectedBlockTitle?: string | null;
  onDeselectBlock?: () => void;
}

// Exact color theme matching each pattern box thumbnail
export const PATTERN_THEME_MAP: Record<
  BackgroundPatternType,
  {
    bg: string;
    cardBg: string;
    accent: string;
    text: string;
    secondaryText: string;
    border: string;
  }
> = {
  canvas_constellation: {
    bg: "#FAF7EE",
    cardBg: "#FFFFFF",
    accent: "#D4AF37",
    text: "#1A1C20",
    secondaryText: "#918355",
    border: "#E5E0D2",
  },
  canvas_aurora_waves: {
    bg: "#EBFBF5",
    cardBg: "#FFFFFF",
    accent: "#10B981",
    text: "#0F291E",
    secondaryText: "#3A7D63",
    border: "#CEF0E2",
  },
  canvas_stardust: {
    bg: "#FFF9F2",
    cardBg: "#FFFFFF",
    accent: "#F59E0B",
    text: "#2B1D0C",
    secondaryText: "#9A7138",
    border: "#F7E6D0",
  },
  dot_grid: {
    bg: "#FAF9F5",
    cardBg: "#FFFFFF",
    accent: "#D4AF37",
    text: "#1A1C20",
    secondaryText: "#8F8155",
    border: "#E8E2D5",
  },
  isometric_grid: {
    bg: "#F0F7FB",
    cardBg: "#FFFFFF",
    accent: "#0284C7",
    text: "#0C2338",
    secondaryText: "#42769E",
    border: "#D0E5F2",
  },
  gradient_mesh: {
    bg: "#FFF5F5",
    cardBg: "#FFFFFF",
    accent: "#F43F5E",
    text: "#2B1117",
    secondaryText: "#964556",
    border: "#FED7DE",
  },
  gradient_radial: {
    bg: "#FFFDF5",
    cardBg: "#FFFFFF",
    accent: "#F59E0B",
    text: "#281D0A",
    secondaryText: "#96753A",
    border: "#FBECC4",
  },
  iridescent_hologram: {
    bg: "#FAF8FF",
    cardBg: "#FFFFFF",
    accent: "#8B5CF6",
    text: "#1F1638",
    secondaryText: "#7C6A9E",
    border: "#E6DDFA",
  },
  floating_bubbles: {
    bg: "#FDFBF7",
    cardBg: "#FFFFFF",
    accent: "#F472B6",
    text: "#291522",
    secondaryText: "#995C85",
    border: "#F7E0EE",
  },
  neon_horizon: {
    bg: "#FFF3EC",
    cardBg: "#FFFFFF",
    accent: "#FB923C",
    text: "#33180B",
    secondaryText: "#A05F37",
    border: "#FED7C2",
  },
  liquid_marble: {
    bg: "#FFF1EB",
    cardBg: "#FFFFFF",
    accent: "#EC4899",
    text: "#2E1322",
    secondaryText: "#99557C",
    border: "#FED1E4",
  },
  art_deco_lattice: {
    bg: "#FDFBF5",
    cardBg: "#FFFFFF",
    accent: "#D4AF37",
    text: "#1C1B18",
    secondaryText: "#8C8360",
    border: "#EAE3CD",
  },
  cyber_matrix: {
    bg: "#F0FDF4",
    cardBg: "#FFFFFF",
    accent: "#059669",
    text: "#0E291C",
    secondaryText: "#357A59",
    border: "#C7F2DC",
  },
  subtle_noise: {
    bg: "#F6F2E9",
    cardBg: "#FFFFFF",
    accent: "#918355",
    text: "#242017",
    secondaryText: "#7E7358",
    border: "#E0D7C5",
  },
  solid_block: {
    bg: "#FAF9F5",
    cardBg: "#FFFFFF",
    accent: "#D4AF37",
    text: "#1A1C20",
    secondaryText: "#918355",
    border: "#E5E0D2",
  },
};

export const ThemeAndStylingPanel: React.FC<ThemeAndStylingPanelProps> = ({
  profile,
  setProfile,
  activeSubTab: activeSubTabProp,
  onSubTabChange,
  selectedBlockTitle,
  onDeselectBlock,
}) => {
  const [internalSubTab, setInternalSubTab] = useState<ThemeSubTab>(activeSubTabProp || "all");
  const activeSubTab = activeSubTabProp !== undefined ? activeSubTabProp : internalSubTab;
  const setActiveSubTab = (tab: ThemeSubTab) => {
    setInternalSubTab(tab);
    onSubTabChange?.(tab);
  };

  const [isFineTuningCard, setIsFineTuningCard] = useState(false);
  const [isCardPresetDropdownOpen, setIsCardPresetDropdownOpen] = useState(false);
  const cardDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cardDropdownRef.current && !cardDropdownRef.current.contains(e.target as Node)) {
        setIsCardPresetDropdownOpen(false);
      }
    };
    if (isCardPresetDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCardPresetDropdownOpen]);

  const theme = profile.theme;
  const palette = theme.palette;
  const currentCardDesign = profile.cardDesign || DEFAULT_CARD_DESIGN;
  const activePreset = CARD_DESIGN_PRESETS.find((p) => p.id === currentCardDesign.presetId) || CARD_DESIGN_PRESETS[0];

  // Update theme helper
  const updateTheme = (updater: (prev: ProfileThemeConfig) => ProfileThemeConfig) => {
    setProfile((prev) => ({
      ...prev,
      theme: updater(prev.theme),
    }));
  };

  // Update palette helper
  const updatePalette = (key: keyof ProfileThemeConfig["palette"], value: string) => {
    updateTheme((t) => ({
      ...t,
      palette: {
        ...t.palette,
        [key]: value,
      },
    }));
  };

  // Update typography helper
  const updateTypography = (updater: Partial<ProfileThemeConfig["typography"]>) => {
    updateTheme((t) => ({
      ...t,
      typography: {
        ...t.typography,
        ...updater,
      },
    }));
  };

  // Update geometry helper
  const updateGeometry = (updater: Partial<ProfileThemeConfig["geometry"]>) => {
    updateTheme((t) => ({
      ...t,
      geometry: {
        ...t.geometry,
        ...updater,
      },
    }));
  };

  // Update background config helper
  const updateBackground = (updater: Partial<NonNullable<ProfileThemeConfig["backgroundConfig"]>>) => {
    updateTheme((t) => ({
      ...t,
      backgroundConfig: {
        type: t.backgroundConfig?.type || "canvas_constellation",
        patternColor: t.backgroundConfig?.patternColor || t.palette.accentGold,
        patternOpacity: typeof t.backgroundConfig?.patternOpacity === "number" ? t.backgroundConfig.patternOpacity : 0.75,
        particleSpeed: typeof t.backgroundConfig?.particleSpeed === "number" ? t.backgroundConfig.particleSpeed : 1,
        ...updater,
      },
    }));
  };

  // Select pattern and instantly synchronize the matching background color and accent
  const selectPatternWithThemeColors = (patternId: BackgroundPatternType) => {
    const patternTheme = PATTERN_THEME_MAP[patternId] || PATTERN_THEME_MAP.canvas_constellation;
    setProfile((prev) => ({
      ...prev,
      theme: {
        ...prev.theme,
        palette: {
          ...prev.theme.palette,
          background: patternTheme.bg,
          accentGold: patternTheme.accent,
          border: patternTheme.border,
          primaryText: patternTheme.text,
          secondaryText: patternTheme.secondaryText,
          cardBackground: patternTheme.cardBg,
          buttonBackground: patternTheme.accent,
        },
        backgroundConfig: {
          type: patternId,
          patternColor: patternTheme.accent,
          patternOpacity: typeof prev.theme.backgroundConfig?.patternOpacity === "number" ? prev.theme.backgroundConfig.patternOpacity : 0.75,
          particleSpeed: typeof prev.theme.backgroundConfig?.particleSpeed === "number" ? prev.theme.backgroundConfig.particleSpeed : 1,
        },
      },
      cardDesign: prev.cardDesign
        ? { ...prev.cardDesign, accentColor: patternTheme.accent }
        : prev.cardDesign,
    }));
  };

  // Update card design helper
  const updateCardDesign = (updater: Partial<CardDesignConfig>) => {
    setProfile((prev) => ({
      ...prev,
      cardDesign: {
        ...(prev.cardDesign || DEFAULT_CARD_DESIGN),
        ...updater,
      },
    }));
  };

  const currentBgConfig = {
    type: theme.backgroundConfig?.type || ("canvas_constellation" as BackgroundPatternType),
    patternColor: theme.backgroundConfig?.patternColor || palette.accentGold,
    patternOpacity: typeof theme.backgroundConfig?.patternOpacity === "number" ? theme.backgroundConfig.patternOpacity : 0.75,
    particleSpeed: typeof theme.backgroundConfig?.particleSpeed === "number" ? theme.backgroundConfig.particleSpeed : 1,
  };

  const isDark = palette.background === "#0A0A0C" || palette.background === "#0F1115" || palette.background === "#121214";

  return (
    <div className="p-4 sm:p-6 max-w-2xl w-full mx-auto space-y-5 pb-24">
      {/* 1. Header & Quick Controls */}
      <div className="flex items-center justify-between pb-3.5 border-b border-[#E5E0D2]">
        <div>
          <h2 className="text-base font-display font-bold text-[#1A1C20] flex items-center gap-2">
            <span>Themes & Styling</span>
            <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-[#D4AF37]/15 text-[#918355]">
              Inspector
            </span>
          </h2>
          <p className="text-[11px] text-[#918355] mt-0.5">
            Configure colors, dynamic canvas background, typography, button styles, & cards.
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => {
              if (isDark) {
                setProfile((p) => ({ ...p, theme: CURATED_PLATFORM_THEMES[0] }));
              } else {
                setProfile((p) => ({ ...p, theme: CURATED_PLATFORM_THEMES[1] }));
              }
            }}
            className="p-2 rounded-xl border border-[#E5E0D2] bg-white text-xs text-[#1A1C20] hover:border-[#D4AF37] transition-all shadow-2xs"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun className="w-3.5 h-3.5 text-[#D4AF37]" /> : <Moon className="w-3.5 h-3.5 text-[#D4AF37]" />}
          </button>

          <button
            type="button"
            onClick={() => {
              setProfile((p) => ({
                ...p,
                theme: CURATED_PLATFORM_THEMES[0],
                cardDesign: DEFAULT_CARD_DESIGN,
              }));
            }}
            className="p-2 rounded-xl border border-[#E5E0D2] bg-white text-xs text-[#918355] hover:text-[#1A1C20] hover:border-[#D4AF37] transition-all shadow-2xs"
            title="Reset to Signature Gold Default"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Compact Filter Navigation Chips */}
      <div className="flex items-center gap-1 p-1 bg-[#F0EFE9]/80 rounded-xl border border-[#E5E0D2] overflow-x-auto">
        {[
          { id: "all", label: "All Controls" },
          { id: "colors", label: "Colors" },
          { id: "background", label: "Background & 3JS" },
          { id: "typography", label: "Typography" },
          { id: "buttons", label: "Buttons" },
          { id: "cards", label: "Cards" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveSubTab(tab.id as ThemeSubTab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
              activeSubTab === tab.id
                ? "bg-white text-[#1A1C20] shadow-xs border border-[#E5E0D2]"
                : "text-[#918355] hover:text-[#1A1C20] hover:bg-white/40"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Selected Block Banner (if a block is active) */}
      {selectedBlockTitle && (
        <div className="p-2.5 bg-amber-50/90 border border-amber-200/80 rounded-xl flex items-center justify-between gap-2 shadow-2xs text-xs">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
            <span className="font-bold text-amber-900 shrink-0">Selected Block:</span>
            <span className="text-[#1A1C20] truncate font-medium">{selectedBlockTitle}</span>
          </div>
          {onDeselectBlock && (
            <button
              type="button"
              onClick={onDeselectBlock}
              className="text-[11px] font-bold text-amber-700 underline hover:text-black shrink-0"
            >
              Deselect
            </button>
          )}
        </div>
      )}

      {/* =========================================================================
          SECTION 1: CURATED THEME PALETTE PRESETS (Compact Chips)
          ========================================================================= */}
      {(activeSubTab === "all" || activeSubTab === "colors") && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold text-[#1A1C20]">
            <div className="flex items-center gap-2">
              <span>Theme Presets</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#918355]">
                {CURATED_PLATFORM_THEMES.length} Aesthetic Styles
              </span>
            </div>
            <span className="text-[10px] text-[#918355] font-normal">Scroll to explore • 1-Click apply</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[300px] overflow-y-auto pr-1">
            {CURATED_PLATFORM_THEMES.map((themePreset) => {
              const isSelected = theme.id === themePreset.id;
              const tag = 
                themePreset.id.includes("gold") || themePreset.id.includes("money") || themePreset.id.includes("alabaster") 
                  ? "Classic" 
                  : themePreset.id.includes("rose") || themePreset.id.includes("vanilla") || themePreset.id.includes("lavender") || themePreset.id.includes("sunset") 
                  ? "Aesthetic" 
                  : themePreset.id.includes("monograph") || themePreset.id.includes("espresso") || themePreset.id.includes("terracotta") 
                  ? "Editorial" 
                  : themePreset.id.includes("azur") || themePreset.id.includes("matcha") || themePreset.id.includes("sage") 
                  ? "Serene" 
                  : "Velvet";

              return (
                <button
                  key={themePreset.id}
                  type="button"
                  onClick={() =>
                    setProfile((p) => ({
                      ...p,
                      theme: {
                        ...themePreset,
                        backgroundConfig: themePreset.backgroundConfig || p.theme.backgroundConfig,
                      },
                      cardDesign: p.cardDesign
                        ? { ...p.cardDesign, accentColor: themePreset.palette.accentGold }
                        : p.cardDesign,
                    }))
                  }
                  className={`p-2.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between gap-2 group cursor-pointer relative ${
                    isSelected
                      ? "border-[#D4AF37] bg-amber-50/60 shadow-xs ring-1.5 ring-[#D4AF37]"
                      : "border-[#E5E0D2] bg-white hover:border-[#D4AF37]/60 hover:shadow-2xs"
                  }`}
                >
                  <div className="flex items-start justify-between gap-1 w-full">
                    <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-[#F4F3ED] text-[#918355] group-hover:bg-[#D4AF37]/15 group-hover:text-[#918355] transition-colors">
                      {tag}
                    </span>

                    {/* 3 Color Dots */}
                    <div className="flex items-center -space-x-1 shrink-0">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-2xs"
                        style={{ backgroundColor: themePreset.palette.accentGold }}
                        title="Accent"
                      />
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-2xs"
                        style={{ backgroundColor: themePreset.palette.background }}
                        title="Background"
                      />
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-2xs"
                        style={{ backgroundColor: themePreset.palette.buttonBackground || themePreset.palette.cardBackground }}
                        title="Button/Contrast"
                      />
                    </div>
                  </div>

                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[#1A1C20] truncate group-hover:text-[#D4AF37] transition-colors">
                      {themePreset.name}
                    </div>
                    <div className="text-[10px] text-[#918355] truncate font-medium mt-0.5">
                      {themePreset.typography.headingFont}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 2: COMPACT COLOR TOKEN ROWS
          ========================================================================= */}
      {(activeSubTab === "all" || activeSubTab === "colors") && (
        <div className="p-4 rounded-2xl bg-white border border-[#E5E0D2] shadow-2xs space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1C20]">
            Color Tokens
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
            {[
              { label: "Background", key: "background", val: palette.background },
              { label: "Card Surface", key: "cardBackground", val: palette.cardBackground },
              { label: "Accent Gold / Brand", key: "accentGold", val: palette.accentGold },
              { label: "Primary Text", key: "primaryText", val: palette.primaryText },
              { label: "Secondary Text", key: "secondaryText", val: palette.secondaryText },
              { label: "Hairline Borders", key: "border", val: palette.border },
            ].map((token) => (
              <div
                key={token.key}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF9F5] border border-[#E5E0D2]/70 hover:border-[#D4AF37]/30 transition-all"
              >
                <span className="text-xs font-semibold text-[#1A1C20]">{token.label}</span>
                <AsoobiColorPicker
                  value={token.val}
                  label={token.label}
                  onChange={(newHex) => {
                    updatePalette(token.key as keyof ProfileThemeConfig["palette"], newHex);
                    if (token.key === "accentGold" && currentCardDesign) {
                      updateCardDesign({ accentColor: newHex });
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 3: BACKGROUND & CANVAS ENGINE (GSAP / 3JS & Blocks)
          ========================================================================= */}
      {(activeSubTab === "all" || activeSubTab === "background") && (
        <div className="p-4 rounded-2xl bg-white border border-[#E5E0D2] shadow-2xs space-y-3.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1C20] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Background & Canvas Engine</span>
            </h3>
            <span className="text-[10px] text-[#918355] font-semibold">60fps Simulation</span>
          </div>

          {/* Pattern Chips Scrollable 3x3 Grid with Live Light & Colorful Animations */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[276px] overflow-y-auto pr-1">
            {[
              { id: "canvas_constellation", label: "Constellation", icon: "✨", tag: "GSAP / 3JS" },
              { id: "canvas_aurora_waves", label: "Aurora Waves", icon: "🌊", tag: "Fluid" },
              { id: "canvas_stardust", label: "Twinkling Stardust", icon: "⭐", tag: "Celestial" },
              { id: "dot_grid", label: "Luxury Dot Grid", icon: "▦", tag: "Minimal" },
              { id: "isometric_grid", label: "Isometric Grid", icon: "📐", tag: "Blueprint" },
              { id: "gradient_mesh", label: "Fluid Mesh Glow", icon: "🌈", tag: "Ambient" },
              { id: "gradient_radial", label: "Radial Spotlight", icon: "🔦", tag: "Focus" },
              { id: "iridescent_hologram", label: "Iridescent Prism", icon: "💎", tag: "Prismatic" },
              { id: "floating_bubbles", label: "Floating Orbs", icon: "🫧", tag: "Bokeh" },
              { id: "neon_horizon", label: "Sunset Horizon", icon: "🌅", tag: "Twilight" },
              { id: "liquid_marble", label: "Liquid Marble", icon: "🏛", tag: "Organic" },
              { id: "art_deco_lattice", label: "Art Deco Lattice", icon: "⚜️", tag: "Vintage" },
              { id: "cyber_matrix", label: "Cyber Matrix", icon: "⚡", tag: "Digital" },
              { id: "subtle_noise", label: "Analog Film Grain", icon: "🎞", tag: "Paper" },
              { id: "solid_block", label: "Solid Clean Block", icon: "⬛", tag: "Clean" },
            ].map((p) => (
              <PatternThumbnailBox
                key={p.id}
                id={p.id as BackgroundPatternType}
                label={p.label}
                icon={p.icon}
                tag={p.tag}
                isSelected={currentBgConfig.type === p.id}
                accentColor={palette.accentGold}
                onClick={() => selectPatternWithThemeColors(p.id as BackgroundPatternType)}
              />
            ))}
          </div>

          {/* Inline Sliders: Opacity & Speed */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-[#E5E0D2]/70">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold text-[#1A1C20]">
                <span>Pattern Opacity</span>
                <span className="text-[#918355] font-mono text-[11px]">
                  {Math.round(currentBgConfig.patternOpacity * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={currentBgConfig.patternOpacity}
                onChange={(e) => updateBackground({ patternOpacity: parseFloat(e.target.value) })}
                className="w-full accent-[#D4AF37] cursor-pointer h-1.5"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold text-[#1A1C20]">
                <span>Particle Speed</span>
                <span className="text-[#918355] font-mono text-[11px]">
                  {currentBgConfig.particleSpeed?.toFixed(1) || "1.0"}x
                </span>
              </div>
              <input
                type="range"
                min="0.3"
                max="2.5"
                step="0.1"
                value={currentBgConfig.particleSpeed || 1}
                onChange={(e) => updateBackground({ particleSpeed: parseFloat(e.target.value) })}
                className="w-full accent-[#D4AF37] cursor-pointer h-1.5"
              />
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 4: COMPACT TYPOGRAPHY & FONTS
          ========================================================================= */}
      {(activeSubTab === "all" || activeSubTab === "typography") && (
        <div className="p-4 rounded-2xl bg-white border border-[#E5E0D2] shadow-2xs space-y-3.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1C20] flex items-center gap-1.5">
            <Type className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Typography & Font Pairings</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Heading Font Custom Luxury Dropdown */}
            <AsoobiFontSelector
              label="Heading Font"
              value={theme.typography.headingFont}
              options={HEADING_FONT_OPTIONS}
              align="left"
              onChange={(id) => updateTypography({ headingFont: id as HeadingFontFamily })}
            />

            {/* Body Font Custom Luxury Dropdown */}
            <AsoobiFontSelector
              label="Body Font"
              value={theme.typography.bodyFont}
              options={BODY_FONT_OPTIONS}
              align="right"
              onChange={(id) => updateTypography({ bodyFont: id as BodyFontFamily })}
            />
          </div>

          {/* Inline Letter Spacing & Transform */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-[#E5E0D2]/70">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-[#918355] block">Letter Spacing</span>
              <div className="flex items-center gap-1">
                {["tight", "normal", "wide", "widest"].map((sp) => (
                  <button
                    key={sp}
                    type="button"
                    onClick={() => updateTypography({ headingLetterSpacing: sp as any })}
                    className={`flex-1 py-1 rounded-lg text-xs font-bold transition-all ${
                      (theme.typography.headingLetterSpacing || "normal") === sp
                        ? "bg-[#D4AF37] text-white shadow-2xs"
                        : "bg-[#FAF9F5] border border-[#E5E0D2] text-[#1A1C20] hover:border-[#D4AF37]/50"
                    }`}
                  >
                    {sp}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-[#918355] block">Text Transform</span>
              <div className="flex items-center gap-1">
                {[
                  { id: "none", label: "Normal" },
                  { id: "uppercase", label: "UPPER" },
                  { id: "capitalize", label: "Title" },
                ].map((tr) => (
                  <button
                    key={tr.id}
                    type="button"
                    onClick={() => updateTypography({ headingTransform: tr.id as any })}
                    className={`flex-1 py-1 rounded-lg text-xs font-bold transition-all ${
                      (theme.typography.headingTransform || "none") === tr.id
                        ? "bg-[#D4AF37] text-white shadow-2xs"
                        : "bg-[#FAF9F5] border border-[#E5E0D2] text-[#1A1C20] hover:border-[#D4AF37]/50"
                    }`}
                  >
                    {tr.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 5: COMPACT BUTTON STUDIO
          ========================================================================= */}
      {(activeSubTab === "all" || activeSubTab === "buttons") && (
        <div className="p-4 rounded-2xl bg-white border border-[#E5E0D2] shadow-2xs space-y-3.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1C20] flex items-center gap-1.5">
              <Square className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Button Studio</span>
            </h3>
            {/* Live miniature button test */}
            <button
              type="button"
              className="py-1 px-3 text-[10px] font-bold uppercase tracking-wider active:scale-95 transition-all"
              style={getProfileButtonStyles(theme)}
            >
              Test Action
            </button>
          </div>

          {/* Button Style Scrollable 2x4 Area with Real Live Button Rendering */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-[#1A1C20]">
              <span>Button Geometry & Surface Styles</span>
              <span className="text-[10px] text-[#918355] font-normal">Scrollable 2×4 Area • {BUTTON_STYLE_OPTIONS.length} Styles</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-[146px] overflow-y-auto p-1 pr-1.5">
              {BUTTON_STYLE_OPTIONS.map((bStyle) => {
                const isSelected = (theme.geometry.buttonStyle || "solid") === bStyle.id;
                const buttonStyle = getProfileButtonStyles({
                  ...theme,
                  geometry: {
                    ...theme.geometry,
                    buttonStyle: bStyle.id,
                  },
                });

                return (
                  <button
                    key={bStyle.id}
                    type="button"
                    onClick={() => updateGeometry({ buttonStyle: bStyle.id })}
                    style={buttonStyle}
                    className={`h-11 px-2.5 flex items-center justify-center gap-1.5 text-xs font-bold transition-all duration-200 cursor-pointer select-none active:scale-95 ${
                      isSelected
                        ? "ring-2 ring-[#D4AF37] ring-offset-2 ring-offset-white scale-[1.02] z-10 shadow-sm"
                        : "opacity-90 hover:opacity-100 hover:scale-[1.01]"
                    }`}
                    title={bStyle.description}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3] shrink-0" />}
                    <span className="truncate text-center">{bStyle.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Corner Radius & Button Colors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-[#E5E0D2]/70">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-[#918355] block">Corner Radius</span>
              <div className="flex items-center gap-1">
                {[
                  { id: "rounded-none", label: "0" },
                  { id: "rounded-md", label: "6" },
                  { id: "rounded-xl", label: "12" },
                  { id: "rounded-2xl", label: "16" },
                  { id: "rounded-full", label: "Pill" },
                ].map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => updateGeometry({ buttonRadius: r.id })}
                    className={`flex-1 py-1 rounded-lg text-xs font-bold transition-all ${
                      theme.geometry.buttonRadius === r.id
                        ? "bg-[#D4AF37] text-white shadow-2xs"
                        : "bg-[#FAF9F5] border border-[#E5E0D2] text-[#1A1C20] hover:border-[#D4AF37]/50"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-[#918355] block">Button Colors</span>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center justify-between p-2 rounded-xl bg-[#FAF9F5] border border-[#E5E0D2] text-xs">
                  <span className="text-xs font-semibold text-[#1A1C20]">Button Bg</span>
                  <AsoobiColorPicker
                    value={palette.buttonBackground || palette.accentGold}
                    label="Button Background"
                    compact
                    onChange={(newHex) => updatePalette("buttonBackground", newHex)}
                  />
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-[#FAF9F5] border border-[#E5E0D2] text-xs">
                  <span className="text-xs font-semibold text-[#1A1C20]">Button Text</span>
                  <AsoobiColorPicker
                    value={palette.buttonText || "#1A1C20"}
                    label="Button Text"
                    compact
                    onChange={(newHex) => updatePalette("buttonText", newHex)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 6: COMPACT CARD & BLOCK DESIGN
          ========================================================================= */}
      {(activeSubTab === "all" || activeSubTab === "cards") && (
        <div className="p-4 rounded-2xl bg-white border border-[#E5E0D2] shadow-2xs space-y-3.5" ref={cardDropdownRef}>
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1C20] flex items-center gap-1.5">
              <LayoutTemplate className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Card Architecture & Presets</span>
            </h3>

            <button
              type="button"
              onClick={() => setIsFineTuningCard((p) => !p)}
              className="text-xs font-semibold text-[#D4AF37] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{isFineTuningCard ? "Hide Fine-Tune" : "Fine-Tune Details"}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isFineTuningCard ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Simple Thin Card Preset Dropdown */}
          <div className="space-y-1 relative">
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#1A1C20]">
              <span>Active Card Preset</span>
              <span className="text-[10px] text-[#918355] font-normal">{CARD_DESIGN_PRESETS.length} Styles</span>
            </div>

            {/* Simple Thin Trigger Button */}
            <button
              type="button"
              onClick={() => setIsCardPresetDropdownOpen((prev) => !prev)}
              className={`w-full h-9 flex items-center justify-between px-3 rounded-lg border transition-all text-left cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.03)] ${
                isCardPresetDropdownOpen
                  ? "border-[#D4AF37] bg-white ring-2 ring-[#D4AF37]/15 shadow-sm"
                  : "border-[#E5E0D2] bg-[#FAF9F5] hover:border-[#D4AF37]/60 hover:bg-white"
              }`}
            >
              <div className="flex items-center gap-2 min-w-0 pr-2">
                <span
                  className="w-2 h-2 rounded-full shrink-0 shadow-2xs"
                  style={{ backgroundColor: activePreset.preview.accentColor || "#D4AF37" }}
                />
                <span className="text-xs font-semibold text-[#1A1C20] shrink-0">
                  {activePreset.name}
                </span>
                <span className="text-[#D4AF37]/60 text-[10px] shrink-0">•</span>
                <span className="text-[11px] text-[#8A7E68] truncate font-normal">
                  {activePreset.tagline}
                </span>
              </div>

              <ChevronDown
                className={`w-3.5 h-3.5 text-[#918355] shrink-0 transition-transform duration-200 ${
                  isCardPresetDropdownOpen ? "rotate-180 text-[#D4AF37]" : ""
                }`}
              />
            </button>

            {/* Refined Luxury Dropdown Menu */}
            {isCardPresetDropdownOpen && (
              <div className="absolute left-0 right-0 top-[calc(100%+4px)] w-full max-h-72 overflow-y-auto rounded-xl bg-white border border-[#E5E0D2] shadow-[0_12px_36px_-6px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.04)] py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                {[
                  "Luxury & Atelier",
                  "Modern & Bento",
                  "Creative & 3D",
                  "Minimal & Technical",
                ].map((category, idx) => {
                  const categoryPresets = CARD_DESIGN_PRESETS.filter((p) => p.category === category);
                  if (categoryPresets.length === 0) return null;
                  return (
                    <div key={category} className={idx > 0 ? "pt-1.5" : ""}>
                      {/* Section Header with Subtle Accent Line */}
                      <div className="px-3 pt-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-[#918355] flex items-center gap-2">
                        <span>{category}</span>
                        <span className="h-px flex-1 bg-[#E5E0D2]/60" />
                      </div>

                      {/* Items */}
                      <div className="px-1.5 space-y-0.5">
                        {categoryPresets.map((preset) => {
                          const isSelected = currentCardDesign.presetId === preset.id;
                          return (
                            <button
                              key={preset.id}
                              type="button"
                              onClick={() => {
                                setProfile((prev) => ({
                                  ...prev,
                                  cardDesign: { ...preset.config, accentColor: palette.accentGold },
                                }));
                                setIsCardPresetDropdownOpen(false);
                              }}
                              className={`w-full px-2.5 py-1.5 rounded-lg text-left flex items-center justify-between text-xs transition-all duration-150 cursor-pointer ${
                                isSelected
                                  ? "bg-[#D4AF37]/10 text-[#1A1C20] font-semibold"
                                  : "text-[#1A1C20] hover:bg-[#FAF7F0] hover:text-[#1A1C20]"
                              }`}
                            >
                              <div className="flex items-center gap-2 min-w-0 pr-2">
                                <span
                                  className="w-1.5 h-1.5 rounded-full shrink-0"
                                  style={{ backgroundColor: preset.preview.accentColor || "#D4AF37" }}
                                />
                                <div className="min-w-0">
                                  <span className={`text-xs ${isSelected ? "font-bold text-[#1A1C20]" : "font-medium"}`}>
                                    {preset.name}
                                  </span>
                                  <span className="text-[10.5px] text-[#8A7E68] font-normal block truncate leading-tight">
                                    {preset.tagline}
                                  </span>
                                </div>
                              </div>
                              {isSelected && <Check className="w-3.5 h-3.5 text-[#D4AF37] stroke-[2.5] shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Fine-Tuning Drawer (compact rows) */}
          {isFineTuningCard && (
            <div className="pt-3 border-t border-[#E5E0D2] space-y-2.5 animate-in fade-in duration-200">
              {/* Border Style */}
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-[#918355] block">Border Treatment</span>
                <div className="flex flex-wrap gap-1">
                  {[
                    "none",
                    "subtle",
                    "gold_accent",
                    "brutalist_bold",
                    "double_editorial",
                    "glow",
                    "dashed",
                  ].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => updateCardDesign({ borderStyle: b as any })}
                      className={`text-[11px] font-semibold px-2 py-0.8 rounded-lg border transition-all cursor-pointer ${
                        currentCardDesign.borderStyle === b
                          ? "bg-[#D4AF37] text-white border-[#D4AF37]"
                          : "bg-[#FAF9F5] border-[#E5E0D2] text-[#1A1C20] hover:border-[#D4AF37]/50"
                      }`}
                    >
                      {b.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shadow Elevation */}
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-[#918355] block">Shadow Elevation</span>
                <div className="flex flex-wrap gap-1">
                  {[
                    "none",
                    "soft",
                    "floating",
                    "gold_glow",
                    "hard_brutalist",
                    "neumorphic",
                    "neon",
                  ].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => updateCardDesign({ shadowStyle: s as any })}
                      className={`text-[11px] font-semibold px-2 py-0.8 rounded-lg border transition-all cursor-pointer ${
                        currentCardDesign.shadowStyle === s
                          ? "bg-[#D4AF37] text-white border-[#D4AF37]"
                          : "bg-[#FAF9F5] border-[#E5E0D2] text-[#1A1C20] hover:border-[#D4AF37]/50"
                      }`}
                    >
                      {s.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Surface & Hover Chips (No native select!) */}
              <div className="space-y-2 pt-1">
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-[#918355] block">Surface Finish</span>
                  <div className="flex flex-wrap gap-1">
                    {["solid", "glass", "translucent", "gradient", "inset", "clay", "metallic", "linen"].map((sf) => (
                      <button
                        key={sf}
                        type="button"
                        onClick={() => updateCardDesign({ surfaceStyle: sf as any })}
                        className={`text-[11px] font-semibold px-2 py-0.8 rounded-lg border transition-all capitalize cursor-pointer ${
                          currentCardDesign.surfaceStyle === sf
                            ? "bg-[#D4AF37] text-white border-[#D4AF37]"
                            : "bg-[#FAF9F5] border-[#E5E0D2] text-[#1A1C20] hover:border-[#D4AF37]/50"
                        }`}
                      >
                        {sf}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-[#918355] block">Hover Physics</span>
                  <div className="flex flex-wrap gap-1">
                    {["lift", "scale", "glow", "invert", "shimmer", "bounce", "tilt"].map((hv) => (
                      <button
                        key={hv}
                        type="button"
                        onClick={() => updateCardDesign({ hoverEffect: hv as any })}
                        className={`text-[11px] font-semibold px-2 py-0.8 rounded-lg border transition-all capitalize cursor-pointer ${
                          currentCardDesign.hoverEffect === hv
                            ? "bg-[#D4AF37] text-white border-[#D4AF37]"
                            : "bg-[#FAF9F5] border-[#E5E0D2] text-[#1A1C20] hover:border-[#D4AF37]/50"
                        }`}
                      >
                        {hv}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
