"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown, Check, Type, Search, X } from "lucide-react";

export interface FontOptionItem {
  id: string;
  name: string;
  category?: string;
  cssFamily: string;
  previewSample: string;
}

interface AsoobiFontSelectorProps {
  label: string;
  value: string;
  options: FontOptionItem[];
  onChange: (id: string) => void;
  align?: "left" | "right";
  className?: string;
}

export const AsoobiFontSelector: React.FC<AsoobiFontSelectorProps> = ({
  label,
  value,
  options,
  onChange,
  align = "left",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);

  const selectedOption = options.find((o) => o.id === value) || options[0];

  // Filter options by search term
  const filteredOptions = useMemo(() => {
    if (!search.trim()) return options;
    const q = search.toLowerCase().trim();
    return options.filter((o) => o.name.toLowerCase().includes(q));
  }, [options, search]);

  // Close on outside click & reset search
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className={`space-y-0.5 relative ${isOpen ? "z-50" : "z-20"} ${className}`} ref={containerRef}>
      {/* Label Row */}
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-medium text-[#1A1C20] flex items-center gap-1">
          <Type className="w-2.5 h-2.5 text-[#D4AF37]" />
          <span>{label}</span>
        </label>
      </div>

      {/* Thin, Sleek Trigger Button (h-8 / 32px) */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full h-8 flex items-center justify-between px-2.5 rounded-lg border bg-[#FAF9F5] transition-all text-left cursor-pointer ${
          isOpen
            ? "border-[#D4AF37]/80 bg-white shadow-2xs ring-1 ring-[#D4AF37]/20"
            : "border-[#E5E0D2] hover:border-[#D4AF37]/50 hover:bg-white"
        }`}
      >
        <span
          className="text-xs font-medium text-[#1A1C20] truncate mr-2"
          style={{ fontFamily: selectedOption?.cssFamily }}
        >
          {selectedOption?.name}
        </span>

        <ChevronDown
          className={`w-3 h-3 text-[#918355] shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#D4AF37]" : ""
          }`}
        />
      </button>

      {/* Thin, Refined Font Popover */}
      {isOpen && (
        <div
          className={`absolute top-full mt-1 w-64 sm:w-72 max-h-72 overflow-hidden rounded-xl bg-white border border-[#E5E0D2] shadow-lg z-50 flex flex-col animate-in fade-in zoom-in-95 duration-100 ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {/* Thin Search Bar */}
          <div className="p-1 px-2 border-b border-[#E5E0D2]/60 bg-[#FAF9F5] flex items-center gap-1.5 h-7">
            <Search className="w-3 h-3 text-[#918355]/70 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${options.length} fonts...`}
              className="w-full text-[11px] bg-transparent focus:outline-none text-[#1A1C20] placeholder:text-[#918355]/50"
              autoFocus
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="p-0.5 text-[#918355] hover:text-[#1A1C20]"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            )}
          </div>

          {/* Thin Font Rows (h-7 / 28px tall each) */}
          <div className="overflow-y-auto p-1 max-h-60 space-y-0.5">
            {filteredOptions.length === 0 ? (
              <div className="py-3 text-center text-[11px] text-[#918355]">
                No fonts matching "{search}"
              </div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = option.id === value;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      onChange(option.id);
                      setIsOpen(false);
                      setSearch("");
                    }}
                    className={`w-full h-7 px-2 rounded-md text-left transition-all flex items-center justify-between gap-2 group cursor-pointer ${
                      isSelected
                        ? "bg-amber-50/70 text-[#1A1C20] font-medium border border-[#D4AF37]/30 shadow-2xs"
                        : "hover:bg-[#FAF9F5] text-[#1A1C20]/90 border border-transparent"
                    }`}
                  >
                    {/* Font Name rendered in actual font */}
                    <span
                      className="text-xs truncate font-normal flex-1 text-left"
                      style={{ fontFamily: option.cssFamily }}
                    >
                      {option.name}
                    </span>

                    {/* Thin Specimen in that font */}
                    <span
                      className="text-[10px] text-[#918355]/60 truncate max-w-[90px] text-right"
                      style={{ fontFamily: option.cssFamily }}
                    >
                      Aa Bb 123
                    </span>

                    {/* Thin Selected Checkmark */}
                    {isSelected && (
                      <Check className="w-3 h-3 text-[#D4AF37] stroke-[2] shrink-0" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
