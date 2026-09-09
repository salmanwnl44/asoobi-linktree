"use client";

import React from "react";
import { Check } from "lucide-react";
import { BackgroundPatternType } from "@/types/builder";

interface PatternThumbnailBoxProps {
  id: BackgroundPatternType;
  label: string;
  icon: string;
  tag: string;
  isSelected: boolean;
  accentColor?: string;
  onClick: () => void;
}

export const PatternThumbnailBox: React.FC<PatternThumbnailBoxProps> = ({
  id,
  label,
  icon,
  tag,
  isSelected,
  accentColor = "#D4AF37",
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative h-[82px] rounded-xl overflow-hidden border text-left transition-all duration-200 group flex flex-col justify-between p-2 cursor-pointer select-none ${
        isSelected
          ? "border-[#D4AF37] ring-2 ring-[#D4AF37] shadow-md shadow-[#D4AF37]/20 scale-[1.01]"
          : "border-[#E5E0D2] hover:border-[#D4AF37]/70 hover:shadow-xs"
      }`}
    >
      {/* 1. Light, Radiant, and Colorful Live Miniature Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Constellation: Light Ivory & Warm Gold */}
        {id === "canvas_constellation" && (
          <div className="w-full h-full bg-[#FAF7EE] relative">
            <svg className="w-full h-full absolute inset-0" xmlns="http://www.w3.org/2000/svg">
              <line x1="18%" y1="32%" x2="52%" y2="58%" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.6" />
              <line x1="52%" y1="58%" x2="82%" y2="28%" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.6" />
              <line x1="52%" y1="58%" x2="35%" y2="78%" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.4" />
              <line x1="82%" y1="28%" x2="90%" y2="68%" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.4" />
            </svg>
            <span
              className="absolute w-2.5 h-2.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37] animate-pulse"
              style={{ left: "18%", top: "32%", animationDuration: "2s" }}
            />
            <span
              className="absolute w-3 h-3 rounded-full bg-[#D4AF37] shadow-[0_0_10px_#D4AF37] animate-pulse"
              style={{ left: "52%", top: "58%", animationDuration: "2.8s" }}
            />
            <span
              className="absolute w-2.5 h-2.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37] animate-pulse"
              style={{ left: "82%", top: "28%", animationDuration: "2.3s" }}
            />
            <span
              className="absolute w-2 h-2 rounded-full bg-[#F59E0B] shadow-[0_0_6px_#F59E0B] animate-ping"
              style={{ left: "35%", top: "78%", animationDuration: "3s" }}
            />
          </div>
        )}

        {/* Aurora Waves: Radiant Mint & Emerald Ribbons */}
        {id === "canvas_aurora_waves" && (
          <div className="w-full h-full bg-[#EBFBF5] relative overflow-hidden">
            <div
              className="absolute -inset-x-6 top-0 h-14 rounded-full opacity-70 filter blur-md animate-[auroraWave_4s_ease-in-out_infinite_alternate]"
              style={{
                background: "linear-gradient(90deg, #34D399, #06B6D4, #FBBF24, #10B981)",
              }}
            />
            <div
              className="absolute -inset-x-8 top-6 h-12 rounded-full opacity-60 filter blur-md animate-[auroraWave_5s_ease-in-out_infinite_alternate-reverse]"
              style={{
                background: "linear-gradient(90deg, #6EE7B7, #38BDF8, #FCD34D)",
              }}
            />
          </div>
        )}

        {/* Twinkling Stardust: Warm Celestial Golden Sparkles */}
        {id === "canvas_stardust" && (
          <div className="w-full h-full bg-[#FFF9F2] relative overflow-hidden">
            {[
              { left: "15%", top: "25%", delay: "0s", color: "#D4AF37" },
              { left: "42%", top: "18%", delay: "1.2s", color: "#F59E0B" },
              { left: "75%", top: "35%", delay: "0.6s", color: "#D4AF37" },
              { left: "28%", top: "65%", delay: "1.8s", color: "#F59E0B" },
              { left: "85%", top: "72%", delay: "0.9s", color: "#D4AF37" },
              { left: "62%", top: "52%", delay: "2.1s", color: "#FBBF24" },
            ].map((star, i) => (
              <span
                key={i}
                className="absolute w-2 h-2 rounded-full animate-pulse"
                style={{
                  left: star.left,
                  top: star.top,
                  backgroundColor: star.color,
                  boxShadow: `0 0 8px ${star.color}`,
                  animationDelay: star.delay,
                  animationDuration: "1.8s",
                }}
              />
            ))}
            <div
              className="absolute w-14 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent -rotate-45 animate-[shootingStar_3.5s_ease-in-out_infinite]"
              style={{ top: "20%", left: "-20%" }}
            />
          </div>
        )}

        {/* Luxury Dot Grid: Champagne Cream & Gold Radar */}
        {id === "dot_grid" && (
          <div className="w-full h-full bg-[#FAF9F5] relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage: `radial-gradient(#D4AF37 1.5px, transparent 1.5px)`,
                backgroundSize: "12px 12px",
              }}
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent animate-[radarPass_3s_linear_infinite]"
              style={{ width: "200%", transform: "translateX(-50%)" }}
            />
          </div>
        )}

        {/* Isometric Grid: Clean Cyan & Ice Slate */}
        {id === "isometric_grid" && (
          <div className="w-full h-full bg-[#F0F7FB] relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage: `
                  linear-gradient(30deg, #0284C7 12%, transparent 12.5%, transparent 87%, #0284C7 87.5%, #0284C7),
                  linear-gradient(150deg, #0284C7 12%, transparent 12.5%, transparent 87%, #0284C7 87.5%, #0284C7),
                  linear-gradient(30deg, #0284C7 12%, transparent 12.5%, transparent 87%, #0284C7 87.5%, #0284C7),
                  linear-gradient(150deg, #0284C7 12%, transparent 12.5%, transparent 87%, #0284C7 87.5%, #0284C7)
                `,
                backgroundSize: "20px 35px",
              }}
            />
            <div className="absolute inset-x-0 h-2 bg-[#0284C7] opacity-60 filter blur-xs animate-[scanlineDown_2.5s_ease-in-out_infinite]" />
          </div>
        )}

        {/* Fluid Mesh Glow: Colorful Sunset Radiant Mesh */}
        {id === "gradient_mesh" && (
          <div className="w-full h-full bg-[#FFF5F5] relative overflow-hidden">
            <div
              className="absolute w-18 h-18 rounded-full opacity-80 filter blur-lg animate-[meshOrbit1_4s_easeInOut_infinite_alternate]"
              style={{ backgroundColor: "#F43F5E", top: "5%", left: "10%" }}
            />
            <div
              className="absolute w-16 h-16 rounded-full opacity-80 filter blur-lg animate-[meshOrbit2_5s_easeInOut_infinite_alternate]"
              style={{ backgroundColor: "#F59E0B", bottom: "5%", right: "10%" }}
            />
            <div
              className="absolute w-14 h-14 rounded-full opacity-70 filter blur-md animate-[meshOrbit3_3.5s_easeInOut_infinite_alternate]"
              style={{ backgroundColor: "#3B82F6", top: "35%", right: "35%" }}
            />
          </div>
        )}

        {/* Radial Spotlight: Sunlit Solar Amber Glow */}
        {id === "gradient_radial" && (
          <div className="w-full h-full bg-[#FFFDF5] relative overflow-hidden">
            <div
              className="absolute inset-0 animate-[spotlightPulse_3s_ease-in-out_infinite_alternate]"
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(245,158,11,0.4) 0%, rgba(212,175,55,0.2) 45%, transparent 75%)",
              }}
            />
            <div
              className="absolute w-12 h-12 rounded-full filter blur-md animate-ping opacity-40"
              style={{ left: "38%", top: "25%", backgroundColor: "#F59E0B", animationDuration: "3s" }}
            />
          </div>
        )}

        {/* Analog Film Grain: Warm Natural Parchment Texture */}
        {id === "subtle_noise" && (
          <div className="w-full h-full bg-[#F6F2E9] relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-40 mix-blend-multiply animate-[filmFlicker_0.4s_steps(2)_infinite]"
              style={{
                backgroundImage: "radial-gradient(#918355 1.2px, transparent 0)",
                backgroundSize: "5px 5px",
              }}
            />
            <div className="absolute top-3 left-4 w-12 h-[1px] bg-[#918355]/40 rotate-12" />
          </div>
        )}

        {/* Solid Clean Block: Warm Ivory Satin Silk with Gloss Sheen */}
        {id === "solid_block" && (
          <div
            className="w-full h-full relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #FAF9F5 0%, #EFEBE0 100%)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent -skew-x-12 animate-[sheenSweep_3s_ease-in-out_infinite]" />
          </div>
        )}

        {/* Iridescent Hologram: Shifting Pastel Rainbow Prism */}
        {id === "iridescent_hologram" && (
          <div
            className="w-full h-full relative overflow-hidden animate-[holoShift_6s_ease_infinite_alternate]"
            style={{
              background: "linear-gradient(135deg, #FF9A9E 0%, #FECFEF 25%, #A1C4FD 50%, #C2E9FB 75%, #FEE140 100%)",
              backgroundSize: "200% 200%",
            }}
          >
            <div className="absolute inset-0 bg-white/30 backdrop-blur-xs" />
          </div>
        )}

        {/* Floating Bokeh Bubbles: Floating Warm Orbs */}
        {id === "floating_bubbles" && (
          <div className="w-full h-full bg-[#FDFBF7] relative overflow-hidden">
            <div
              className="absolute w-12 h-12 rounded-full opacity-60 filter blur-md animate-[bokehFloat1_5s_easeInOut_infinite_alternate]"
              style={{ backgroundColor: "#FBBF24", bottom: "10%", left: "15%" }}
            />
            <div
              className="absolute w-10 h-10 rounded-full opacity-50 filter blur-md animate-[bokehFloat2_6s_easeInOut_infinite_alternate]"
              style={{ backgroundColor: "#F472B6", bottom: "25%", right: "20%" }}
            />
            <div
              className="absolute w-8 h-8 rounded-full opacity-60 filter blur-sm animate-[bokehFloat3_4s_easeInOut_infinite_alternate]"
              style={{ backgroundColor: "#38BDF8", bottom: "5%", left: "55%" }}
            />
          </div>
        )}

        {/* Neon Sunset Horizon: Apricot & Tangerine Twilight Waves */}
        {id === "neon_horizon" && (
          <div className="w-full h-full bg-[#FFF3EC] relative overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to top, #FB7185 0%, #FB923C 35%, #FDE047 70%, transparent 100%)",
                opacity: 0.65,
              }}
            />
          </div>
        )}

        {/* Liquid Marble: Swirling Fluid Gold & Rose Luxury Veins */}
        {id === "liquid_marble" && (
          <div
            className="w-full h-full relative overflow-hidden"
            style={{
              background: "linear-gradient(45deg, #FFF1EB 0%, #ACE0F9 100%)",
            }}
          >
            <div
              className="absolute inset-0 opacity-60 filter blur-md animate-[marbleSpin_8s_linear_infinite]"
              style={{
                background: "radial-gradient(circle at 30% 30%, #F472B6 0%, transparent 50%), radial-gradient(circle at 70% 70%, #FBBF24 0%, transparent 50%)",
              }}
            />
          </div>
        )}

        {/* Art Deco Lattice: Golden Diamond Lattice on Alabaster */}
        {id === "art_deco_lattice" && (
          <div className="w-full h-full bg-[#FDFBF5] relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: `
                  linear-gradient(45deg, #D4AF37 25%, transparent 25%),
                  linear-gradient(-45deg, #D4AF37 25%, transparent 25%),
                  linear-gradient(135deg, #D4AF37 25%, transparent 25%),
                  linear-gradient(-135deg, #D4AF37 25%, transparent 25%)
                `,
                backgroundSize: "20px 20px",
                backgroundPosition: "10px 0, 10px 0, 0 0, 0 0",
              }}
            />
          </div>
        )}

        {/* Cyber Matrix: Emerald Digital Stream on Frosted Mint */}
        {id === "cyber_matrix" && (
          <div className="w-full h-full bg-[#F0FDF4] relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-45"
              style={{
                backgroundImage: `linear-gradient(#059669 1px, transparent 1px), linear-gradient(90deg, #059669 1px, transparent 1px)`,
                backgroundSize: "16px 16px",
              }}
            />
            <div className="absolute inset-x-0 h-1.5 bg-[#10B981] opacity-70 filter blur-xs animate-[scanlineDown_2s_linear_infinite]" />
          </div>
        )}
      </div>

      {/* 2. Soft Light Scrim Overlay for 100% Crisp Black/Charcoal Text */}
      <div className="absolute inset-x-0 bottom-0 h-9 bg-gradient-to-t from-white/95 via-white/60 to-transparent pointer-events-none" />

      {/* 3. Top Row: Frosted Glass Tag & Selection Badge */}
      <div className="relative z-10 flex items-center justify-between w-full">
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-white/85 backdrop-blur-xs text-[#1A1C20] text-[10px] font-semibold shadow-2xs border border-[#E5E0D2]/80">
          <span>{icon}</span>
          <span className="text-[9px] text-[#918355] font-mono tracking-tighter uppercase">{tag}</span>
        </span>

        {isSelected && (
          <span className="w-4 h-4 rounded-full bg-[#D4AF37] text-white flex items-center justify-center shadow-md ring-1 ring-white">
            <Check className="w-2.5 h-2.5 stroke-[3]" />
          </span>
        )}
      </div>

      {/* 4. Bottom Row: High-Contrast Dark Charcoal Title */}
      <div className="relative z-10 mt-auto">
        <div className="text-xs font-bold text-[#1A1C20] tracking-tight truncate drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
          {label}
        </div>
      </div>

      {/* 60fps Keyframe Animations */}
      <style jsx>{`
        @keyframes auroraWave {
          0% {
            transform: translateX(-15%) skewY(-2deg) scaleY(0.9);
          }
          100% {
            transform: translateX(15%) skewY(3deg) scaleY(1.2);
          }
        }
        @keyframes shootingStar {
          0% {
            transform: translateX(-50px) translateY(-50px);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          40% {
            transform: translateX(120px) translateY(120px);
            opacity: 0;
          }
          100% {
            opacity: 0;
          }
        }
        @keyframes radarPass {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(50%);
          }
        }
        @keyframes scanlineDown {
          0% {
            top: 0%;
            opacity: 0;
          }
          20% {
            opacity: 0.8;
          }
          80% {
            opacity: 0.8;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
        @keyframes meshOrbit1 {
          0% {
            transform: translate(0, 0) scale(1);
          }
          100% {
            transform: translate(25px, 12px) scale(1.25);
          }
        }
        @keyframes meshOrbit2 {
          0% {
            transform: translate(0, 0) scale(1.2);
          }
          100% {
            transform: translate(-20px, -12px) scale(0.95);
          }
        }
        @keyframes meshOrbit3 {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(12px, -18px) scale(1.1);
          }
        }
        @keyframes spotlightPulse {
          0% {
            transform: scale(0.85);
            opacity: 0.7;
          }
          100% {
            transform: scale(1.15);
            opacity: 1;
          }
        }
        @keyframes filmFlicker {
          0% {
            opacity: 0.35;
          }
          50% {
            opacity: 0.45;
          }
          100% {
            opacity: 0.38;
          }
        }
        @keyframes sheenSweep {
          0% {
            transform: translateX(-150%);
          }
          40%,
          100% {
            transform: translateX(150%);
          }
        }
        @keyframes holoShift {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
        @keyframes bokehFloat1 {
          0% {
            transform: translateY(0) scale(0.9);
          }
          100% {
            transform: translateY(-20px) scale(1.1);
          }
        }
        @keyframes bokehFloat2 {
          0% {
            transform: translateY(0) scale(1.1);
          }
          100% {
            transform: translateY(-25px) scale(0.95);
          }
        }
        @keyframes bokehFloat3 {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-18px) scale(1.05);
          }
        }
        @keyframes marbleSpin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </button>
  );
};
