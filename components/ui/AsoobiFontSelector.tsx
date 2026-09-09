"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Type } from "lucide-react";

export interface FontOptionItem {
  id: string;
  name: string;
  category: string;
  cssFamily: string;
  previewSample: string;
}

interface AsoobiFontSelectorProps {
  label: string;
  value: string;
  options: FontOptionItem[];
  onChange: (id: string) => void;
  className?: string;
}

export const AsoobiFontSelector: React.FC<AsoobiFontSelectorProps> = ({
  label,
  value,
  options,
  onChange,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const selectedOption = options.find((o) => o.id === value) || options[0];

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className={`space-y-1 relative ${isOpen ? "z-50" : "z-20"} ${className}`} ref={containerRef}>
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-[#1A1C20] flex items-center gap-1.5">
          <Type className="w-3 h-3 text-[#D4AF37]" />
          <span>{label}</span>
        </label>
        <span className="text-[10px] text-[#918355] font-medium font-sans">
          {selectedOption?.category}
        </span>
      </div>

      {/* Trigger Button: Shows Active Font in its Real Style */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between p-2.5 rounded-xl border bg-[#FAF9F5] transition-all text-left cursor-pointer ${
          isOpen
            ? "border-[#D4AF37] ring-2 ring-[#D4AF37]/30 shadow-xs"
            : "border-[#E5E0D2] hover:border-[#D4AF37]/60 hover:bg-white"
        }`}
      >
        <div className="min-w-0 flex-1 pr-2">
          <div
            className="text-sm font-bold text-[#1A1C20] truncate tracking-normal"
            style={{ fontFamily: selectedOption?.cssFamily }}
          >
            {selectedOption?.name}
          </div>
          <div
            className="text-[11px] text-[#918355] truncate mt-0.5"
            style={{ fontFamily: selectedOption?.cssFamily }}
          >
            {selectedOption?.previewSample}
          </div>
        </div>

        <ChevronDown
          className={`w-4 h-4 text-[#918355] shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#D4AF37]" : ""
          }`}
        />
      </button>

      {/* Luxury Font Dropdown Popover */}
      {isOpen && (
        <div
          className="absolute left-0 right-0 top-full mt-1.5 max-h-80 overflow-y-auto rounded-2xl bg-[#FAF9F5] border-2 border-[#D4AF37]/50 shadow-2xl z-50 divide-y divide-[#E5E0D2]/60 animate-in fade-in zoom-in-95 duration-150"
          style={{ backdropFilter: "blur(16px)" }}
        >
          {/* Header indicator */}
          <div className="p-2.5 bg-white/80 border-b border-[#E5E0D2] flex items-center justify-between sticky top-0 z-10 backdrop-blur-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#918355]">
              Select Typeface ({options.length} Fonts)
            </span>
            <span className="text-[10px] text-[#1A1C20]/60 font-medium">Live Font Preview</span>
          </div>

          {/* Font Items List */}
          <div className="p-1 space-y-0.5">
            {options.map((option) => {
              const isSelected = option.id === value;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    onChange(option.id);
                    setIsOpen(false);
                  }}
                  className={`w-full p-2.5 rounded-xl text-left transition-all flex items-center justify-between gap-3 group ${
                    isSelected
                      ? "bg-amber-100/60 border border-[#D4AF37]/40 shadow-xs"
                      : "hover:bg-white hover:border hover:border-[#D4AF37]/30 border border-transparent"
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      {/* Font name rendered in its ACTUAL font */}
                      <span
                        className="text-base font-bold text-[#1A1C20] group-hover:text-[#D4AF37] transition-colors"
                        style={{ fontFamily: option.cssFamily }}
                      >
                        {option.name}
                      </span>
                      <span className="text-[9px] font-sans font-semibold px-2 py-0.5 rounded-full bg-[#FAF9F5] border border-[#E5E0D2] text-[#918355]">
                        {option.category}
                      </span>
                    </div>

                    {/* Specimen phrase rendered in that exact font */}
                    <div
                      className="text-xs text-[#1A1C20]/75 truncate mt-1 tracking-wide"
                      style={{ fontFamily: option.cssFamily }}
                    >
                      {option.previewSample}
                    </div>
                  </div>

                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-white flex items-center justify-center shrink-0 shadow-xs ring-2 ring-white">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
