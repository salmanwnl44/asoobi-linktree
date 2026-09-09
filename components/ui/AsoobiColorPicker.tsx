"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Pipette, Check, ChevronDown, X } from "lucide-react";

// ==========================================
// COLOR CONVERSION UTILITIES
// ==========================================

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let cleanHex = hex.replace("#", "").trim();
  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const num = parseInt(cleanHex, 16);
  if (isNaN(num) || cleanHex.length !== 6) {
    return { r: 212, g: 175, b: 55 }; // Default to Asoobi Gold
  }
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  const toHex = (v: number) => clamp(v).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function rgbToHsv(r: number, g: number, b: number): { h: number; s: number; v: number } {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const diff = max - min;

  let h = 0;
  if (diff !== 0) {
    if (max === rNorm) {
      h = (60 * ((gNorm - bNorm) / diff) + 360) % 360;
    } else if (max === gNorm) {
      h = 60 * ((bNorm - rNorm) / diff) + 120;
    } else {
      h = 60 * ((rNorm - gNorm) / diff) + 240;
    }
  }

  const s = max === 0 ? 0 : diff / max;
  const v = max;

  return { h, s: s * 100, v: v * 100 };
}

function hsvToRgb(h: number, s: number, v: number): { r: number; g: number; b: number } {
  const sNorm = s / 100;
  const vNorm = v / 100;
  const c = vNorm * sNorm;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = vNorm - c;

  let rPrime = 0,
    gPrime = 0,
    bPrime = 0;
  if (h >= 0 && h < 60) {
    rPrime = c;
    gPrime = x;
    bPrime = 0;
  } else if (h >= 60 && h < 120) {
    rPrime = x;
    gPrime = c;
    bPrime = 0;
  } else if (h >= 120 && h < 180) {
    rPrime = 0;
    gPrime = c;
    bPrime = x;
  } else if (h >= 180 && h < 240) {
    rPrime = 0;
    gPrime = x;
    bPrime = c;
  } else if (h >= 240 && h < 300) {
    rPrime = x;
    gPrime = 0;
    bPrime = c;
  } else {
    rPrime = c;
    gPrime = 0;
    bPrime = x;
  }

  return {
    r: Math.round((rPrime + m) * 255),
    g: Math.round((gPrime + m) * 255),
    b: Math.round((bPrime + m) * 255),
  };
}

// Curated Signature Asoobi Swatches
const SIGNATURE_SWATCHES = [
  { hex: "#D4AF37", label: "Signature Gold" },
  { hex: "#E8D5C4", label: "Champagne" },
  { hex: "#F9F9F7", label: "Warm Ivory" },
  { hex: "#FFFFFF", label: "Pure White" },
  { hex: "#1A1C20", label: "Charcoal" },
  { hex: "#0F1115", label: "Obsidian" },
  { hex: "#918355", label: "Antique Gold" },
  { hex: "#0A66C2", label: "Slate Blue" },
  { hex: "#10B981", label: "Emerald" },
  { hex: "#00F0FF", label: "Cyber Cyan" },
  { hex: "#E50914", label: "Atelier Red" },
  { hex: "#FE2C55", label: "Neon Pink" },
];

interface AsoobiColorPickerProps {
  value: string;
  onChange: (hex: string) => void;
  label?: string;
  className?: string;
  compact?: boolean;
}

export const AsoobiColorPicker: React.FC<AsoobiColorPickerProps> = ({
  value,
  onChange,
  label,
  className = "",
  compact = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const satBoxRef = useRef<HTMLDivElement | null>(null);

  // Parse initial HSV
  const rgb = hexToRgb(value || "#D4AF37");
  const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);

  const [hue, setHue] = useState(hsv.h);
  const [sat, setSat] = useState(hsv.s);
  const [val, setVal] = useState(hsv.v);
  const [hexInput, setHexInput] = useState(value || "#D4AF37");

  // Keep internal state synced when value prop changes externally
  useEffect(() => {
    if (value) {
      setHexInput(value.toUpperCase());
      const r = hexToRgb(value);
      const h = rgbToHsv(r.r, r.g, r.b);
      setHue(h.h);
      setSat(h.s);
      setVal(h.v);
    }
  }, [value]);

  // Handle click outside to close
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Handle Saturation/Value Drag
  const handleSatBoxMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const updateSatVal = (clientX: number, clientY: number) => {
      if (!satBoxRef.current) return;
      const rect = satBoxRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
      const y = Math.max(0, Math.min(rect.height, clientY - rect.top));

      const newSat = (x / rect.width) * 100;
      const newVal = 100 - (y / rect.height) * 100;

      setSat(newSat);
      setVal(newVal);

      const newRgb = hsvToRgb(hue, newSat, newVal);
      const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
      setHexInput(newHex);
      onChange(newHex);
    };

    updateSatVal(e.clientX, e.clientY);

    const onMouseMove = (moveEvent: MouseEvent) => {
      updateSatVal(moveEvent.clientX, moveEvent.clientY);
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  // Handle Hue slider change
  const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHue = parseFloat(e.target.value);
    setHue(newHue);
    const newRgb = hsvToRgb(newHue, sat, val);
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    setHexInput(newHex);
    onChange(newHex);
  };

  // Handle Hex text typing
  const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let text = e.target.value;
    if (!text.startsWith("#")) text = "#" + text;
    setHexInput(text);
    if (/^#[0-9A-Fa-f]{6}$/.test(text)) {
      onChange(text.toUpperCase());
    }
  };

  // Browser Eyedropper support
  const handleEyeDropper = async () => {
    if (typeof window !== "undefined" && "EyeDropper" in window) {
      try {
        // @ts-ignore
        const eyeDropper = new window.EyeDropper();
        const result = await eyeDropper.open();
        if (result?.sRGBHex) {
          const pickedHex = result.sRGBHex.toUpperCase();
          setHexInput(pickedHex);
          onChange(pickedHex);
        }
      } catch (err) {
        // User cancelled or not supported
      }
    }
  };

  // Base hue color for saturation canvas background
  const baseHueRgb = hsvToRgb(hue, 100, 100);
  const baseHueCss = `rgb(${baseHueRgb.r}, ${baseHueRgb.g}, ${baseHueRgb.b})`;

  return (
    <div className={`relative inline-block ${isOpen ? "z-50" : "z-10"} ${className}`} ref={popoverRef}>
      {/* Trigger Button: Custom Luxury Asoobi Token */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-2 rounded-xl border transition-all cursor-pointer ${
          compact
            ? "p-1.5 bg-[#FAF9F5] border-[#E5E0D2] hover:border-[#D4AF37]"
            : "p-2 bg-[#FAF9F5] border-[#E5E0D2] hover:border-[#D4AF37] shadow-2xs"
        }`}
        title={label || "Choose Color"}
      >
        {/* Color Swatch Circle */}
        <span
          className="w-5 h-5 rounded-lg border border-black/15 shadow-xs shrink-0 transition-transform active:scale-95"
          style={{ backgroundColor: value || "#D4AF37" }}
        />
        {!compact && (
          <span className="text-[11px] font-mono font-semibold uppercase text-[#1A1C20]">
            {value || "#D4AF37"}
          </span>
        )}
        <ChevronDown className={`w-3 h-3 text-[#918355] transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Luxury Custom Popover Menu */}
      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-64 p-3.5 bg-[#FAF9F5] rounded-2xl border-2 border-[#D4AF37]/50 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 text-[#1A1C20] space-y-3"
          style={{ backdropFilter: "blur(16px)" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#918355]">
              {label || "Color Palette"}
            </span>
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white border border-[#E5E0D2]">
                <span
                  className="w-3 h-3 rounded-full border border-black/10 shadow-xs shrink-0"
                  style={{ backgroundColor: value }}
                />
                <span className="text-[11px] font-mono font-bold">{hexInput}</span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-[#918355] hover:text-[#1A1C20] hover:bg-black/5 transition-colors"
                title="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Saturation / Brightness Box */}
          <div
            ref={satBoxRef}
            onMouseDown={handleSatBoxMouseDown}
            className="w-full h-32 rounded-xl relative cursor-crosshair overflow-hidden shadow-inner border border-black/10"
            style={{
              backgroundColor: baseHueCss,
              backgroundImage: `
                linear-gradient(to right, #FFFFFF, transparent),
                linear-gradient(to top, #000000, transparent)
              `,
            }}
          >
            {/* Draggable Selector Handle */}
            <div
              className="w-4 h-4 rounded-full border-2 border-white shadow-md absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                left: `${sat}%`,
                top: `${100 - val}%`,
                backgroundColor: value,
              }}
            />
          </div>

          {/* Hue Spectrum Rainbow Slider */}
          <div className="space-y-1">
            <input
              type="range"
              min="0"
              max="360"
              step="1"
              value={hue}
              onChange={handleHueChange}
              className="w-full h-3 rounded-full cursor-pointer appearance-none shadow-xs"
              style={{
                background: "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
              }}
            />
          </div>

          {/* Hex Input & Eyedropper Row */}
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center bg-white border border-[#E5E0D2] rounded-xl px-2.5 py-1.5 shadow-2xs focus-within:border-[#D4AF37]">
              <span className="text-xs font-bold text-[#918355] mr-1">HEX</span>
              <input
                type="text"
                value={hexInput}
                onChange={handleHexInputChange}
                onBlur={() => {
                  if (!/^#[0-9A-Fa-f]{6}$/.test(hexInput)) {
                    setHexInput((value || "#D4AF37").toUpperCase());
                  }
                }}
                className="w-full text-xs font-mono font-bold text-[#1A1C20] bg-transparent focus:outline-none uppercase"
                maxLength={7}
              />
            </div>

            {typeof window !== "undefined" && "EyeDropper" in window && (
              <button
                type="button"
                onClick={handleEyeDropper}
                className="p-2 rounded-xl bg-white border border-[#E5E0D2] hover:border-[#D4AF37] text-[#918355] hover:text-[#1A1C20] transition-colors shadow-2xs shrink-0"
                title="Pick color from screen"
              >
                <Pipette className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Curated Luxury Swatches Grid */}
          <div className="space-y-1.5 pt-1 border-t border-[#E5E0D2]/70">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#918355]">
              Curated Swatches
            </span>
            <div className="grid grid-cols-6 gap-1.5">
              {SIGNATURE_SWATCHES.map((swatch) => {
                const isSelected = value.toUpperCase() === swatch.hex.toUpperCase();
                return (
                  <button
                    key={swatch.hex}
                    type="button"
                    onClick={() => {
                      setHexInput(swatch.hex);
                      onChange(swatch.hex);
                    }}
                    className="w-7 h-7 rounded-lg border border-black/10 shadow-2xs flex items-center justify-center transition-transform active:scale-90 hover:scale-105 relative"
                    style={{ backgroundColor: swatch.hex }}
                    title={swatch.label}
                  >
                    {isSelected && (
                      <Check
                        className={`w-3 h-3 stroke-[3] ${
                          swatch.hex === "#FFFFFF" || swatch.hex === "#F9F9F7" || swatch.hex === "#E8D5C4"
                            ? "text-black"
                            : "text-white"
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
