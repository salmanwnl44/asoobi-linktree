"use client";

import React, { useState, useMemo } from "react";
import { 
  Sparkles, 
  Check, 
  Search, 
  Layers, 
  Eye, 
  ArrowRight, 
  Wand2, 
  CheckCircle2,
  ExternalLink,
  Crown,
  Type,
  Maximize2,
  Sliders,
  BadgeCheck
} from "lucide-react";
import { AsoobiProfileDocument } from "@/types/builder";
import { FULL_PAGE_TEMPLATES, FullPageTemplate, TemplateCategory } from "@/lib/fullPageTemplates";

interface PageTemplatesPanelProps {
  profile: AsoobiProfileDocument;
  setProfile: React.Dispatch<React.SetStateAction<AsoobiProfileDocument>>;
  onPreviewOpen?: () => void;
}

export const PageTemplatesPanel: React.FC<PageTemplatesPanelProps> = ({
  profile,
  setProfile,
  onPreviewOpen,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [appliedAlert, setAppliedAlert] = useState<{ id: string; message: string; type: "full" | "style" } | null>(null);

  const categories: (string)[] = [
    "All",
    "Haute Couture & Runway",
    "Quiet Luxury & Heritage",
    "Tech & AI Founders",
    "Art Direction & Editorial",
    "Nightlife & Cyber Chic",
    "Artisanal & Atelier",
    "Wellness & High Living",
    "Entertainment & Film",
  ];

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: FULL_PAGE_TEMPLATES.length };
    FULL_PAGE_TEMPLATES.forEach((tmpl) => {
      counts[tmpl.category] = (counts[tmpl.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredTemplates = useMemo(() => {
    return FULL_PAGE_TEMPLATES.filter((tmpl) => {
      const matchCategory = selectedCategory === "All" || tmpl.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        tmpl.name.toLowerCase().includes(q) ||
        tmpl.tagline.toLowerCase().includes(q) ||
        tmpl.description.toLowerCase().includes(q) ||
        tmpl.theme.typography.headingFont.toLowerCase().includes(q) ||
        tmpl.theme.name.toLowerCase().includes(q) ||
        tmpl.demoMeta.displayName.toLowerCase().includes(q) ||
        tmpl.demoMeta.location.toLowerCase().includes(q);
      return matchCategory && matchQuery;
    });
  }, [searchQuery, selectedCategory]);

  // Apply Full Template (Theme + Card Design + Banner + Sample Blocks + Bio)
  const handleApplyFull = (tmpl: FullPageTemplate) => {
    setProfile((prev) => ({
      ...prev,
      meta: {
        ...prev.meta,
        title: tmpl.demoMeta.displayName,
        bio: tmpl.demoMeta.bio,
        location: tmpl.demoMeta.location,
        avatarUrl: tmpl.avatarUrl,
        heroCoverUrl: tmpl.heroCoverUrl,
      },
      theme: {
        ...tmpl.theme,
      },
      cardDesign: {
        ...tmpl.cardDesign,
      },
      blocks: tmpl.sampleBlocks.map((b, i) => ({
        ...b,
        id: `block-${Date.now()}-${i}`,
        position: i,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })),
    }));

    setAppliedAlert({
      id: tmpl.id,
      message: `Applied full "${tmpl.name}" preset with theme, styling & curated blocks!`,
      type: "full",
    });
    setTimeout(() => setAppliedAlert(null), 3500);
  };

  // Apply Styles Only (Theme + Card Design + Animations + Typography WITHOUT changing user's blocks or bio)
  const handleApplyStylesOnly = (tmpl: FullPageTemplate) => {
    setProfile((prev) => ({
      ...prev,
      theme: {
        ...tmpl.theme,
      },
      cardDesign: {
        ...tmpl.cardDesign,
      },
    }));

    setAppliedAlert({
      id: tmpl.id,
      message: `Applied "${tmpl.name}" styles (palette, cards, buttons & animations) to your existing content!`,
      type: "style",
    });
    setTimeout(() => setAppliedAlert(null), 3500);
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl w-full mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E0D2]">
        <div>
          <div className="flex items-center gap-2.5">
            <Crown className="w-6 h-6 text-[#D4AF37]" />
            <h1 className="text-2xl font-display font-bold text-[#1A1C20] tracking-tight">
              Curated Page Templates
            </h1>
            <span className="text-xs px-3 py-1 rounded-full bg-[#D4AF37] text-white font-bold shadow-2xs">
              {FULL_PAGE_TEMPLATES.length} Luxury Presets
            </span>
          </div>
          <p className="text-xs md:text-sm text-[#918355] mt-1">
            Complete page archetypes pairing curated color palettes, button styles, background animations, and luxury card designs.
          </p>
        </div>

        {appliedAlert && (
          <div className="p-2.5 px-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs animate-in zoom-in-95">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{appliedAlert.message}</span>
          </div>
        )}
      </div>

      {/* Search & Category Filter Bar */}
      <div className="space-y-3 bg-white p-4 rounded-2xl border border-[#E5E0D2] shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-[#918355] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search 30 templates by archetype, font, category, or aesthetic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-[#E5E0D2] bg-[#F9F9F7] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#918355] hover:text-[#1A1C20] font-semibold"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            const count = categoryCounts[cat] || 0;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#D4AF37] border-[#D4AF37] text-white shadow-xs"
                    : "bg-[#FAF9F5] border-[#E5E0D2] text-[#1A1C20] hover:border-[#D4AF37]/60"
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? "bg-white/25 text-white" : "bg-neutral-200/70 text-[#918355]"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Template Catalog Grid */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-[#918355] px-1 font-medium pb-1">
          <span>Showing <strong className="text-[#1A1C20]">{filteredTemplates.length}</strong> of {FULL_PAGE_TEMPLATES.length} curated full-page designs</span>
          <span className="text-[11px] text-[#918355]/80">
            Click <strong>Apply</strong> to transform styling while keeping your blocks
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTemplates.map((tmpl) => {
            const isCurrentTheme = profile.theme.id === tmpl.theme.id;
            const p = tmpl.theme.palette;
            const headingFont = tmpl.theme.typography.headingFont;
            const bodyFont = tmpl.theme.typography.bodyFont;
            const cardDesign = tmpl.cardDesign;

            return (
              <div
                key={tmpl.id}
                className={`rounded-3xl border transition-all duration-300 bg-white flex flex-col justify-between group overflow-hidden shadow-xs hover:shadow-2xl ${
                  isCurrentTheme
                    ? "border-[#D4AF37] ring-2 ring-[#D4AF37]/30"
                    : "border-[#E5E0D2] hover:border-[#D4AF37]"
                }`}
              >
                {/* Clean Top Title Bar */}
                <div className="px-4 py-2.5 flex items-center justify-between border-b border-[#E5E0D2]/70 bg-white gap-2">
                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] font-bold text-[#918355] tracking-wider uppercase block truncate">
                      {tmpl.category}
                    </span>
                    <h3 className="font-display font-bold text-sm text-[#1A1C20] group-hover:text-[#D4AF37] transition-colors leading-snug truncate">
                      {tmpl.name}
                    </h3>
                  </div>
                  {isCurrentTheme && (
                    <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1">
                      <Check className="w-2.5 h-2.5" /> Active
                    </span>
                  )}
                </div>

                {/* 1. VISUAL EDITORIAL MOCKUP HEADER */}
                <div
                  className="relative w-full overflow-hidden flex flex-col justify-between"
                  style={{ backgroundColor: p.background }}
                >
                  {/* Hero Cover Top Banner */}
                  <div className="relative h-28 w-full overflow-hidden">
                    <img 
                      src={tmpl.heroCoverUrl} 
                      alt="" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    {/* Atmospheric Scrim Gradient */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20"
                    />

                    {/* Floating Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      <span className="text-[9px] font-extrabold tracking-wider uppercase bg-black/80 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/40 px-2.5 py-1 rounded-full shadow-md">
                        {tmpl.badge}
                      </span>
                      <span
                        className="text-[9px] font-semibold px-2.5 py-1 rounded-full border shadow-md backdrop-blur-md"
                        style={{
                          backgroundColor: `${p.cardBackground}E6`,
                          color: p.primaryText,
                          borderColor: p.border,
                        }}
                      >
                        ✦ {tmpl.theme.backgroundConfig
                          ? tmpl.theme.backgroundConfig.type.replace(/^(canvas_|gradient_)/, "").replace("_", " ")
                          : "minimal"}
                      </span>
                    </div>
                  </div>

                  {/* Profile & Live Interactive Card Simulation */}
                  <div className="p-4 pt-0 -mt-6 space-y-2.5 relative z-10">
                    {/* Avatar & Identity Card */}
                    <div 
                      className="p-2 rounded-xl border backdrop-blur-md flex items-center gap-3 shadow-sm"
                      style={{
                        backgroundColor: `${p.cardBackground}F2`,
                        borderColor: p.border,
                      }}
                    >
                      <div 
                        className="w-10 h-10 rounded-full overflow-hidden border-2 shadow-xs shrink-0 relative"
                        style={{ borderColor: p.accentGold }}
                      >
                        <img src={tmpl.avatarUrl} alt="" className="w-full h-full object-cover" />
                        {tmpl.demoMeta.verified && (
                          <div className="absolute -bottom-0.5 -right-0.5 bg-[#0088FF] text-white rounded-full p-0.5 shadow-xs border border-white">
                            <BadgeCheck className="w-2.5 h-2.5" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div
                          className="font-bold text-xs truncate flex items-center gap-1.5"
                          style={{
                            color: p.primaryText,
                            fontFamily: headingFont,
                          }}
                        >
                          <span>{tmpl.demoMeta.displayName}</span>
                        </div>
                        <div className="text-[10px] truncate" style={{ color: p.secondaryText }}>
                          @{tmpl.demoMeta.handle} • {tmpl.demoMeta.location}
                        </div>
                      </div>
                    </div>

                    {/* Dual Mini Block Previews (Simulating real creator page) */}
                    <div className="space-y-2">
                      {/* Block 1: Featured Link Card Preview */}
                      {tmpl.sampleBlocks[0] && (
                        <div
                          className="p-2 rounded-xl border flex items-center justify-between text-xs transition-transform group-hover:scale-[1.01] shadow-2xs"
                          style={{
                            backgroundColor: p.cardBackground,
                            borderColor: p.border,
                            color: p.primaryText,
                          }}
                        >
                          <div className="flex items-center gap-2 min-w-0 pr-2">
                            {tmpl.sampleBlocks[0] && 'highlightCoverUrl' in tmpl.sampleBlocks[0] && tmpl.sampleBlocks[0].highlightCoverUrl && (
                              <div className="w-7 h-7 rounded-lg overflow-hidden shrink-0">
                                <img src={tmpl.sampleBlocks[0].highlightCoverUrl} alt="" className="w-full h-full object-cover" />
                              </div>
                            )}
                            <div className="min-w-0">
                              <span className="font-semibold text-[11px] block truncate">
                                {tmpl.sampleBlocks[0].title}
                              </span>
                              {tmpl.sampleBlocks[0].subtitle && (
                                <span className="text-[9px] block truncate opacity-70">
                                  {tmpl.sampleBlocks[0].subtitle}
                                </span>
                              )}
                            </div>
                          </div>
                          <span
                            className="text-[10px] font-bold px-2.5 py-1 rounded-lg shrink-0 shadow-2xs"
                            style={{
                              backgroundColor: p.buttonBackground,
                              color: p.buttonText,
                            }}
                          >
                            Explore
                          </span>
                        </div>
                      )}

                      {/* Block 2: Standard Link Pill Preview */}
                      {tmpl.sampleBlocks[1] && (
                        <div
                          className="px-3 py-1.5 rounded-lg border flex items-center justify-between text-xs opacity-90"
                          style={{
                            backgroundColor: p.cardBackground,
                            borderColor: p.border,
                            color: p.primaryText,
                          }}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span 
                              className="w-1.5 h-1.5 rounded-full shrink-0" 
                              style={{ backgroundColor: p.accentGold }} 
                            />
                            <span className="text-[10px] font-medium truncate">
                              {tmpl.sampleBlocks[1].title}
                            </span>
                          </div>
                          <ExternalLink className="w-3 h-3 shrink-0 opacity-60" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 2. DESIGN SPECS & PALETTE STRIP */}
                <div className="p-4 space-y-3.5 flex-1 flex flex-col justify-between bg-white">
                  <div className="space-y-2.5">
                    {/* Color Swatches */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#918355]">
                        Color Palette
                      </span>
                      <div className="flex items-center -space-x-1 hover:space-x-1 transition-all">
                        {[
                          { title: "Background", color: p.background },
                          { title: "Card Surface", color: p.cardBackground },
                          { title: "Gold / Accent", color: p.accentGold },
                          { title: "Primary Text", color: p.primaryText },
                          { title: "Button Fill", color: p.buttonBackground },
                        ].map((swatch, sIdx) => (
                          <div
                            key={sIdx}
                            className="w-4 h-4 rounded-full border-2 border-white shadow-xs hover:scale-125 transition-transform cursor-pointer"
                            style={{ backgroundColor: swatch.color }}
                            title={`${swatch.title}: ${swatch.color}`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Spec Pills: Fonts, Card Preset, Button Style */}
                    <div className="flex flex-wrap gap-1.5 text-[10px]">
                      <span className="px-2 py-0.5 rounded-md bg-[#FAF9F5] border border-[#E5E0D2] text-[#1A1C20] font-medium flex items-center gap-1">
                        <Type className="w-3 h-3 text-[#918355]" />
                        <strong>{headingFont}</strong> + {bodyFont}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#FAF9F5] border border-[#E5E0D2] text-[#1A1C20] font-medium">
                        ◈ {cardDesign.name}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#FAF9F5] border border-[#E5E0D2] text-[#918355]">
                        🔘 {tmpl.theme.geometry.buttonStyle}
                      </span>
                    </div>
                  </div>

                  {/* 3. REFINED SINGLE APPLY BUTTON */}
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => handleApplyStylesOnly(tmpl)}
                      className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs ${
                        isCurrentTheme
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                          : "bg-[#1A1C20] hover:bg-[#D4AF37] text-white hover:text-[#1A1C20]"
                      }`}
                    >
                      {isCurrentTheme ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Styles Applied</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] group-hover:text-[#1A1C20]" />
                          <span>Apply</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
