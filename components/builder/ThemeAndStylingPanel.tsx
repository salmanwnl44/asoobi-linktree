"use client";

import React, { useState } from "react";
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
  SlidersHorizontal
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

  const theme = profile.theme;
  const palette = theme.palette;
  const currentCardDesign = profile.cardDesign || DEFAULT_CARD_DESIGN;

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
            <span>Theme Presets</span>
            <span className="text-[10px] text-[#918355] font-normal">Click to apply palette</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {CURATED_PLATFORM_THEMES.map((themePreset) => {
              const isSelected = theme.id === themePreset.id;
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
                  className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between gap-2 group ${
                    isSelected
                      ? "border-[#D4AF37] bg-amber-50/50 shadow-xs ring-1 ring-[#D4AF37]/40"
                      : "border-[#E5E0D2] bg-white hover:border-[#D4AF37]/50"
                  }`}
                >
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[#1A1C20] truncate group-hover:text-[#D4AF37] transition-colors">
                      {themePreset.name}
                    </div>
                    <div className="text-[9px] text-[#918355] truncate font-medium">
                      {themePreset.typography.headingFont}
                    </div>
                  </div>

                  <div className="flex items-center -space-x-1 shrink-0">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-xs"
                      style={{ backgroundColor: themePreset.palette.accentGold }}
                      title="Accent"
                    />
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-xs"
                      style={{ backgroundColor: themePreset.palette.background }}
                      title="Background"
                    />
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-xs"
                      style={{ backgroundColor: themePreset.palette.buttonBackground || themePreset.palette.cardBackground }}
                      title="Button/Contrast"
                    />
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

          {/* Pattern Chips Grid with Height and Live Animations */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              { id: "canvas_constellation", label: "Constellation", icon: "✨", tag: "GSAP / 3JS" },
              { id: "canvas_aurora_waves", label: "Aurora Waves", icon: "🌊", tag: "Fluid" },
              { id: "canvas_stardust", label: "Twinkling Stardust", icon: "⭐", tag: "Celestial" },
              { id: "dot_grid", label: "Luxury Dot Grid", icon: "▦", tag: "Minimal" },
              { id: "isometric_grid", label: "Isometric Grid", icon: "📐", tag: "Blueprint" },
              { id: "gradient_mesh", label: "Fluid Mesh Glow", icon: "🌈", tag: "Ambient" },
              { id: "gradient_radial", label: "Radial Spotlight", icon: "🔦", tag: "Focus" },
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
                onClick={() => updateBackground({ type: p.id as BackgroundPatternType })}
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
              onChange={(id) => updateTypography({ headingFont: id as HeadingFontFamily })}
            />

            {/* Body Font Custom Luxury Dropdown */}
            <AsoobiFontSelector
              label="Body Font"
              value={theme.typography.bodyFont}
              options={BODY_FONT_OPTIONS}
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

          {/* Button Style Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {BUTTON_STYLE_OPTIONS.map((bStyle) => {
              const isSelected = (theme.geometry.buttonStyle || "solid") === bStyle.id;
              return (
                <button
                  key={bStyle.id}
                  type="button"
                  onClick={() => updateGeometry({ buttonStyle: bStyle.id })}
                  className={`py-1.5 px-2.5 rounded-xl border text-xs font-bold transition-all truncate ${
                    isSelected
                      ? "bg-[#D4AF37] text-white border-[#D4AF37] shadow-2xs"
                      : "bg-[#FAF9F5] border-[#E5E0D2] text-[#1A1C20] hover:border-[#D4AF37]/50"
                  }`}
                >
                  {bStyle.name.split(" ")[0]}
                </button>
              );
            })}
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
        <div className="p-4 rounded-2xl bg-white border border-[#E5E0D2] shadow-2xs space-y-3.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1C20] flex items-center gap-1.5">
              <LayoutTemplate className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Card Architecture & Presets</span>
            </h3>

            <button
              type="button"
              onClick={() => setIsFineTuningCard((p) => !p)}
              className="text-xs font-semibold text-[#D4AF37] hover:underline flex items-center gap-1"
            >
              <span>{isFineTuningCard ? "Hide Fine-Tune" : "Fine-Tune Details"}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isFineTuningCard ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Styled Preset Dropdown (Categorized by optgroup) */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1A1C20] block">
              Active Card Preset ({CARD_DESIGN_PRESETS.length} Styles)
            </label>
            <select
              value={currentCardDesign.presetId}
              onChange={(e) => {
                const found = CARD_DESIGN_PRESETS.find((p) => p.id === e.target.value);
                if (found) {
                  setProfile((prev) => ({
                    ...prev,
                    cardDesign: { ...found.config, accentColor: palette.accentGold },
                  }));
                }
              }}
              className="w-full text-xs font-bold p-2.5 rounded-xl border border-[#E5E0D2] bg-[#FAF9F5] text-[#1A1C20] focus:outline-none focus:border-[#D4AF37]"
            >
              {[
                "Luxury & Atelier",
                "Modern & Bento",
                "Creative & 3D",
                "Minimal & Technical",
              ].map((category) => (
                <optgroup key={category} label={category} className="font-bold text-[#918355]">
                  {CARD_DESIGN_PRESETS.filter((p) => p.category === category).map((preset) => (
                    <option key={preset.id} value={preset.id} className="text-[#1A1C20] font-normal">
                      {preset.name} — {preset.tagline}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
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
                      className={`text-[11px] font-semibold px-2 py-0.8 rounded-lg border transition-all ${
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
                      className={`text-[11px] font-semibold px-2 py-0.8 rounded-lg border transition-all ${
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

              {/* Surface & Hover */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-[#918355] block">Surface Finish</span>
                  <select
                    value={currentCardDesign.surfaceStyle}
                    onChange={(e) => updateCardDesign({ surfaceStyle: e.target.value as any })}
                    className="w-full text-xs font-semibold p-1.5 rounded-lg border border-[#E5E0D2] bg-[#FAF9F5] text-[#1A1C20]"
                  >
                    {["solid", "glass", "translucent", "gradient", "inset", "clay", "metallic", "linen"].map((sf) => (
                      <option key={sf} value={sf}>{sf}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-[#918355] block">Hover Physics</span>
                  <select
                    value={currentCardDesign.hoverEffect}
                    onChange={(e) => updateCardDesign({ hoverEffect: e.target.value as any })}
                    className="w-full text-xs font-semibold p-1.5 rounded-lg border border-[#E5E0D2] bg-[#FAF9F5] text-[#1A1C20]"
                  >
                    {["lift", "scale", "glow", "invert", "shimmer", "bounce", "tilt"].map((hv) => (
                      <option key={hv} value={hv}>{hv}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
