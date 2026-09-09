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
      className={`relative h-[84px] rounded-xl overflow-hidden border text-left transition-all duration-200 group flex flex-col justify-between p-2 cursor-pointer select-none ${
        isSelected
          ? "border-[#D4AF37] ring-2 ring-[#D4AF37] shadow-md shadow-[#D4AF37]/20 scale-[1.01]"
          : "border-[#E5E0D2] hover:border-[#D4AF37]/60 hover:shadow-sm"
      }`}
    >
      {/* 1. Live Miniature Background Animation Canvas / Surface */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {id === "canvas_constellation" && (
          <div className="w-full h-full bg-[#0D1017] relative">
            {/* Animated Nodes & Connecting Lines */}
            <svg className="w-full h-full absolute inset-0 opacity-80" xmlns="http://www.w3.org/2000/svg">
              <line x1="18%" y1="32%" x2="52%" y2="58%" stroke={accentColor} strokeWidth="1" strokeOpacity="0.4" />
              <line x1="52%" y1="58%" x2="82%" y2="28%" stroke={accentColor} strokeWidth="1" strokeOpacity="0.4" />
              <line x1="52%" y1="58%" x2="35%" y2="78%" stroke={accentColor} strokeWidth="1" strokeOpacity="0.3" />
              <line x1="82%" y1="28%" x2="90%" y2="68%" stroke={accentColor} strokeWidth="1" strokeOpacity="0.3" />
            </svg>
            <span
              className="absolute w-2 h-2 rounded-full shadow-[0_0_8px] animate-pulse"
              style={{
                left: "18%",
                top: "32%",
                backgroundColor: accentColor,
                boxShadow: `0 0 8px ${accentColor}`,
                animationDuration: "2s",
              }}
            />
            <span
              className="absolute w-2.5 h-2.5 rounded-full shadow-[0_0_10px] animate-pulse"
              style={{
                left: "52%",
                top: "58%",
                backgroundColor: accentColor,
                boxShadow: `0 0 10px ${accentColor}`,
                animationDuration: "2.8s",
              }}
            />
            <span
              className="absolute w-2 h-2 rounded-full shadow-[0_0_8px] animate-pulse"
              style={{
                left: "82%",
                top: "28%",
                backgroundColor: accentColor,
                boxShadow: `0 0 8px ${accentColor}`,
                animationDuration: "2.3s",
              }}
            />
            <span
              className="absolute w-1.5 h-1.5 rounded-full opacity-70 animate-ping"
              style={{
                left: "35%",
                top: "78%",
                backgroundColor: accentColor,
                animationDuration: "3s",
              }}
            />
          </div>
        )}

        {id === "canvas_aurora_waves" && (
          <div className="w-full h-full bg-[#051610] relative overflow-hidden">
            {/* Undulating Aurora Wave Gradients */}
            <div
              className="absolute -inset-x-6 top-1 h-12 rounded-full opacity-60 filter blur-md animate-[auroraWave_4s_ease-in-out_infinite_alternate]"
              style={{
                background: `linear-gradient(90deg, #00F0FF, ${accentColor}, #10B981, #00F0FF)`,
              }}
            />
            <div
              className="absolute -inset-x-8 top-5 h-10 rounded-full opacity-50 filter blur-md animate-[auroraWave_5s_ease-in-out_infinite_alternate-reverse]"
              style={{
                background: `linear-gradient(90deg, #10B981, #3B82F6, ${accentColor})`,
              }}
            />
          </div>
        )}

        {id === "canvas_stardust" && (
          <div className="w-full h-full bg-[#090A12] relative overflow-hidden">
            {/* Twinkling Stardust Dots */}
            {[
              { left: "15%", top: "25%", delay: "0s", size: "w-1 h-1" },
              { left: "42%", top: "18%", delay: "1.2s", size: "w-1.5 h-1.5" },
              { left: "75%", top: "35%", delay: "0.6s", size: "w-1 h-1" },
              { left: "28%", top: "65%", delay: "1.8s", size: "w-1.5 h-1.5" },
              { left: "85%", top: "72%", delay: "0.9s", size: "w-1 h-1" },
              { left: "62%", top: "52%", delay: "2.1s", size: "w-2 h-2" },
            ].map((star, i) => (
              <span
                key={i}
                className={`absolute ${star.size} rounded-full bg-white shadow-[0_0_6px_#fff] animate-pulse`}
                style={{
                  left: star.left,
                  top: star.top,
                  animationDelay: star.delay,
                  animationDuration: "1.8s",
                }}
              />
            ))}
            {/* Diagonal Shooting Star Trail */}
            <div
              className="absolute w-12 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent -rotate-45 animate-[shootingStar_3.5s_ease-in-out_infinite]"
              style={{ top: "20%", left: "-20%" }}
            />
          </div>
        )}

        {id === "dot_grid" && (
          <div className="w-full h-full bg-[#FAF9F5] relative overflow-hidden">
            {/* Dot Matrix Pattern with Scanning Radar Beam */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: `radial-gradient(${accentColor} 1.5px, transparent 1.5px)`,
                backgroundSize: "12px 12px",
              }}
            />
            {/* Animated Radar Pulse Beam */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent animate-[radarPass_3s_linear_infinite]"
              style={{ width: "200%", transform: "translateX(-50%)" }}
            />
          </div>
        )}

        {id === "isometric_grid" && (
          <div className="w-full h-full bg-[#0D121B] relative overflow-hidden">
            {/* 3D Isometric Diamond Grid */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `
                  linear-gradient(30deg, #00F0FF 12%, transparent 12.5%, transparent 87%, #00F0FF 87.5%, #00F0FF),
                  linear-gradient(150deg, #00F0FF 12%, transparent 12.5%, transparent 87%, #00F0FF 87.5%, #00F0FF),
                  linear-gradient(30deg, #00F0FF 12%, transparent 12.5%, transparent 87%, #00F0FF 87.5%, #00F0FF),
                  linear-gradient(150deg, #00F0FF 12%, transparent 12.5%, transparent 87%, #00F0FF 87.5%, #00F0FF)
                `,
                backgroundSize: "20px 35px",
              }}
            />
            {/* Cyan Cyber Scanline Sweep */}
            <div className="absolute inset-x-0 h-1.5 bg-[#00F0FF] opacity-60 filter blur-xs animate-[scanlineDown_2.5s_ease-in-out_infinite]" />
          </div>
        )}

        {id === "gradient_mesh" && (
          <div className="w-full h-full bg-[#0B132B] relative overflow-hidden">
            {/* Dynamic Multi-Color Orbiting Mesh */}
            <div
              className="absolute w-16 h-16 rounded-full opacity-70 filter blur-lg animate-[meshOrbit1_4s_easeInOut_infinite_alternate]"
              style={{ backgroundColor: "#3B82F6", top: "10%", left: "15%" }}
            />
            <div
              className="absolute w-14 h-14 rounded-full opacity-60 filter blur-lg animate-[meshOrbit2_5s_easeInOut_infinite_alternate]"
              style={{ backgroundColor: accentColor, bottom: "10%", right: "15%" }}
            />
            <div
              className="absolute w-12 h-12 rounded-full opacity-50 filter blur-md animate-[meshOrbit3_3.5s_easeInOut_infinite_alternate]"
              style={{ backgroundColor: "#EC4899", top: "40%", right: "40%" }}
            />
          </div>
        )}

        {id === "gradient_radial" && (
          <div className="w-full h-full bg-[#111216] relative overflow-hidden">
            {/* Breathing Radial Spotlight */}
            <div
              className="absolute inset-0 animate-[spotlightPulse_3s_ease-in-out_infinite_alternate]"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${accentColor}44 0%, ${accentColor}11 50%, transparent 75%)`,
              }}
            />
            <div
              className="absolute w-10 h-10 rounded-full filter blur-md animate-ping opacity-30"
              style={{
                left: "40%",
                top: "30%",
                backgroundColor: accentColor,
                animationDuration: "3s",
              }}
            />
          </div>
        )}

        {id === "subtle_noise" && (
          <div className="w-full h-full bg-[#F5EFE6] relative overflow-hidden">
            {/* Retro Analog Film Grain with Flicker */}
            <div
              className="absolute inset-0 opacity-40 mix-blend-multiply animate-[filmFlicker_0.4s_steps(2)_infinite]"
              style={{
                backgroundImage: `radial-gradient(#1A1C20 1px, transparent 0)`,
                backgroundSize: "4px 4px",
              }}
            />
            {/* Micro dust streak */}
            <div className="absolute top-2 left-6 w-12 h-[1px] bg-amber-800/30 rotate-12" />
          </div>
        )}

        {id === "solid_block" && (
          <div
            className="w-full h-full relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, #1A1C20 0%, #2A2D34 100%)`,
            }}
          >
            {/* Diagonal Satin Light Sheen */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 animate-[sheenSweep_3s_ease-in-out_infinite]" />
          </div>
        )}
      </div>

      {/* 2. Frosted Scrim Overlay for 100% Legibility */}
      <div className="absolute inset-x-0 bottom-0 h-11 bg-gradient-to-t from-black/85 via-black/45 to-transparent pointer-events-none" />

      {/* 3. Top Row: Icon Pill & Selected Checkmark */}
      <div className="relative z-10 flex items-center justify-between w-full">
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-black/50 backdrop-blur-xs text-white text-[10px] font-medium shadow-2xs border border-white/10">
          <span>{icon}</span>
          <span className="text-[9px] text-white/80 font-mono tracking-tighter uppercase">{tag}</span>
        </span>

        {isSelected && (
          <span className="w-4 h-4 rounded-full bg-[#D4AF37] text-white flex items-center justify-center shadow-md ring-1 ring-white/50">
            <Check className="w-2.5 h-2.5 stroke-[3]" />
          </span>
        )}
      </div>

      {/* 4. Bottom Row: Title with High Contrast */}
      <div className="relative z-10 mt-auto">
        <div className="text-xs font-bold text-white tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] truncate">
          {label}
        </div>
      </div>

      {/* Self-contained 60fps Keyframe Animations */}
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
            transform: translate(30px, 15px) scale(1.3);
          }
        }
        @keyframes meshOrbit2 {
          0% {
            transform: translate(0, 0) scale(1.2);
          }
          100% {
            transform: translate(-25px, -15px) scale(0.9);
          }
        }
        @keyframes meshOrbit3 {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(15px, -20px) scale(1.1);
          }
        }
        @keyframes spotlightPulse {
          0% {
            transform: scale(0.85);
            opacity: 0.6;
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
      `}</style>
    </button>
  );
};
