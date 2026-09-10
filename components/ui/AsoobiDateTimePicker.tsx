"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  X, 
  Sparkles 
} from "lucide-react";

interface AsoobiDateTimePickerProps {
  value?: string; // ISO 8601 string
  onChange: (isoString: string) => void;
  minDate?: Date;
  label?: string;
  className?: string;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export const AsoobiDateTimePicker: React.FC<AsoobiDateTimePickerProps> = ({
  value,
  onChange,
  minDate = new Date(),
  label = "Custom Expiration Date & Time",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse current value or default to tomorrow
  const selectedDate = useMemo(() => {
    if (value) {
      const d = new Date(value);
      if (!isNaN(d.getTime())) return d;
    }
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 1);
    defaultDate.setHours(12, 0, 0, 0);
    return defaultDate;
  }, [value]);

  // Internal state for view navigation and editing
  const [viewYear, setViewYear] = useState<number>(selectedDate.getFullYear());
  const [viewMonth, setViewMonth] = useState<number>(selectedDate.getMonth());
  const [tempDay, setTempDay] = useState<number>(selectedDate.getDate());
  const [tempMonth, setTempMonth] = useState<number>(selectedDate.getMonth());
  const [tempYear, setTempYear] = useState<number>(selectedDate.getFullYear());

  // Time state (12-hour format)
  const initialHours = selectedDate.getHours();
  const [tempHour12, setTempHour12] = useState<number>(
    initialHours === 0 ? 12 : initialHours > 12 ? initialHours - 12 : initialHours
  );
  const [tempMinute, setTempMinute] = useState<number>(selectedDate.getMinutes());
  const [tempPeriod, setTempPeriod] = useState<"AM" | "PM">(
    initialHours >= 12 ? "PM" : "AM"
  );

  // Sync when value prop changes
  useEffect(() => {
    setViewYear(selectedDate.getFullYear());
    setViewMonth(selectedDate.getMonth());
    setTempDay(selectedDate.getDate());
    setTempMonth(selectedDate.getMonth());
    setTempYear(selectedDate.getFullYear());

    const h = selectedDate.getHours();
    setTempHour12(h === 0 ? 12 : h > 12 ? h - 12 : h);
    setTempMinute(selectedDate.getMinutes());
    setTempPeriod(h >= 12 ? "PM" : "AM");
  }, [value, selectedDate]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Month navigation
  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  // Calendar matrix calculation
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay();
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  const handleApply = () => {
    let hour24 = tempHour12;
    if (tempPeriod === "AM") {
      if (hour24 === 12) hour24 = 0;
    } else {
      if (hour24 !== 12) hour24 += 12;
    }

    const finalDate = new Date(tempYear, tempMonth, tempDay, hour24, tempMinute, 0, 0);
    onChange(finalDate.toISOString());
    setIsOpen(false);
  };

  // Quick Presets
  const applyPreset = (daysFromNow: number, hour: number, minute: number, period: "AM" | "PM") => {
    const target = new Date();
    target.setDate(target.getDate() + daysFromNow);
    setViewYear(target.getFullYear());
    setViewMonth(target.getMonth());
    setTempYear(target.getFullYear());
    setTempMonth(target.getMonth());
    setTempDay(target.getDate());
    setTempHour12(hour);
    setTempMinute(minute);
    setTempPeriod(period);

    let hour24 = hour;
    if (period === "AM") {
      if (hour24 === 12) hour24 = 0;
    } else {
      if (hour24 !== 12) hour24 += 12;
    }
    const finalDate = new Date(target.getFullYear(), target.getMonth(), target.getDate(), hour24, minute, 0, 0);
    onChange(finalDate.toISOString());
    setIsOpen(false);
  };

  const formattedDisplay = useMemo(() => {
    if (!value) return "Choose expiration date...";
    try {
      const d = new Date(value);
      if (isNaN(d.getTime())) return "Choose expiration date...";
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return "Choose expiration date...";
    }
  }, [value]);

  const today = new Date();
  const isPast = (year: number, month: number, day: number) => {
    const checkDate = new Date(year, month, day, 23, 59, 59);
    return checkDate.getTime() < minDate.getTime();
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {label && (
        <label className="text-[10px] font-bold uppercase tracking-wider text-[#918355] flex items-center justify-between mb-1.5">
          <span className="flex items-center gap-1.5">
            <CalendarIcon className="w-3 h-3 text-[#D4AF37]" />
            <span>{label}</span>
          </span>
          <span className="text-[9px] text-[#918355] font-normal">Custom Schedule</span>
        </label>
      )}

      {/* Trigger Button styled in luxury atelier aesthetics */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full text-xs px-3.5 py-2.5 rounded-xl border flex items-center justify-between transition-all shadow-2xs cursor-pointer ${
          isOpen
            ? "border-[#D4AF37] bg-[#FAF9F5] ring-1 ring-[#D4AF37]"
            : "border-[#E5E0D2] bg-white hover:border-[#D4AF37] hover:bg-[#FAF9F5]/40"
        }`}
      >
        <div className="flex items-center gap-2.5 text-[#1A1C20] min-w-0">
          <div className="w-7 h-7 rounded-lg bg-[#FAF9F5] border border-[#E5E0D2] flex items-center justify-center shrink-0 text-[#D4AF37]">
            <CalendarIcon className="w-3.5 h-3.5" />
          </div>
          <div className="text-left truncate">
            <span className="font-semibold text-xs text-[#1A1C20] block truncate">
              {formattedDisplay}
            </span>
            <span className="text-[9px] text-[#918355] block">
              Click to customize date & time
            </span>
          </div>
        </div>

        <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-[#FAF9F5] border border-[#E5E0D2] text-[#918355] hover:text-[#1A1C20] shrink-0 ml-2">
          {isOpen ? "Close" : "Change"}
        </span>
      </button>

      {/* Popover Custom Calendar */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 sm:left-auto sm:right-0 mt-2 sm:w-80 bg-white border border-[#E5E0D2] rounded-2xl shadow-2xl z-50 p-4 space-y-4 animate-in fade-in zoom-in-95 duration-150">
          {/* Header Month / Year & Arrows */}
          <div className="flex items-center justify-between pb-2 border-b border-[#E5E0D2]/60">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1.5 rounded-lg text-[#918355] hover:text-[#1A1C20] hover:bg-[#FAF9F5] transition-colors cursor-pointer"
              title="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="text-center">
              <span className="text-xs font-bold font-display text-[#1A1C20] tracking-wide">
                {MONTH_NAMES[viewMonth]} {viewYear}
              </span>
            </div>

            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1.5 rounded-lg text-[#918355] hover:text-[#1A1C20] hover:bg-[#FAF9F5] transition-colors cursor-pointer"
              title="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Shortcuts */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[10px]">
            <button
              type="button"
              onClick={() => applyPreset(1, 12, 0, "PM")}
              className="px-2 py-1 rounded-md bg-[#FAF9F5] hover:bg-[#D4AF37] hover:text-white border border-[#E5E0D2] font-medium text-[#1A1C20] transition-colors shrink-0 cursor-pointer"
            >
              Tomorrow
            </button>
            <button
              type="button"
              onClick={() => applyPreset(3, 18, 0, "PM")}
              className="px-2 py-1 rounded-md bg-[#FAF9F5] hover:bg-[#D4AF37] hover:text-white border border-[#E5E0D2] font-medium text-[#1A1C20] transition-colors shrink-0 cursor-pointer"
            >
              In 3 Days
            </button>
            <button
              type="button"
              onClick={() => applyPreset(7, 23, 59, "PM")}
              className="px-2 py-1 rounded-md bg-[#FAF9F5] hover:bg-[#D4AF37] hover:text-white border border-[#E5E0D2] font-medium text-[#1A1C20] transition-colors shrink-0 cursor-pointer"
            >
              In 1 Week
            </button>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {DAY_NAMES.map((day) => (
              <span key={day} className="text-[10px] font-bold text-[#918355] uppercase tracking-wider py-0.5">
                {day}
              </span>
            ))}
          </div>

          {/* Day Cells Grid */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {/* Previous month padding days */}
            {Array.from({ length: firstDayIndex }).map((_, i) => {
              const dayNum = daysInPrevMonth - firstDayIndex + i + 1;
              return (
                <span
                  key={`prev-${i}`}
                  className="h-7 flex items-center justify-center text-neutral-300 text-[11px] select-none pointer-events-none"
                >
                  {dayNum}
                </span>
              );
            })}

            {/* Current month days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const isSelected =
                tempDay === dayNum &&
                tempMonth === viewMonth &&
                tempYear === viewYear;
              const isCurrentToday =
                today.getDate() === dayNum &&
                today.getMonth() === viewMonth &&
                today.getFullYear() === viewYear;
              const disabled = isPast(viewYear, viewMonth, dayNum);

              return (
                <button
                  key={`day-${dayNum}`}
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    setTempDay(dayNum);
                    setTempMonth(viewMonth);
                    setTempYear(viewYear);
                  }}
                  className={`h-7 w-7 mx-auto rounded-lg text-xs flex items-center justify-center transition-all cursor-pointer ${
                    disabled
                      ? "text-neutral-300 cursor-not-allowed"
                      : isSelected
                      ? "bg-[#D4AF37] text-white font-bold shadow-sm scale-105 ring-1 ring-[#AA771C]"
                      : isCurrentToday
                      ? "border border-[#D4AF37] text-[#D4AF37] font-bold hover:bg-[#FAF9F5]"
                      : "text-[#1A1C20] hover:bg-[#FAF9F5] hover:text-[#D4AF37]"
                  }`}
                >
                  {dayNum}
                </button>
              );
            })}
          </div>

          {/* Luxury Time Picker Section */}
          <div className="pt-3 border-t border-[#E5E0D2]/60 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[#918355] font-bold flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                <Clock className="w-3 h-3 text-[#D4AF37]" />
                <span>Expiration Time</span>
              </span>
              <span className="font-mono text-xs font-semibold text-[#1A1C20]">
                {String(tempHour12).padStart(2, "0")}:{String(tempMinute).padStart(2, "0")} {tempPeriod}
              </span>
            </div>

            <div className="flex items-center gap-2 bg-[#FAF9F5] p-2 rounded-xl border border-[#E5E0D2]">
              {/* Hour Dropdown */}
              <div className="flex-1">
                <label className="text-[9px] text-[#918355] block font-semibold mb-0.5">Hour</label>
                <select
                  value={tempHour12}
                  onChange={(e) => setTempHour12(parseInt(e.target.value, 10))}
                  className="w-full text-xs font-bold text-[#1A1C20] bg-white border border-[#E5E0D2] rounded-lg px-2 py-1 focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                    <option key={h} value={h}>
                      {String(h).padStart(2, "0")}
                    </option>
                  ))}
                </select>
              </div>

              {/* Colon Separator */}
              <span className="text-[#918355] font-bold pt-3">:</span>

              {/* Minute Dropdown */}
              <div className="flex-1">
                <label className="text-[9px] text-[#918355] block font-semibold mb-0.5">Minute</label>
                <select
                  value={tempMinute}
                  onChange={(e) => setTempMinute(parseInt(e.target.value, 10))}
                  className="w-full text-xs font-bold text-[#1A1C20] bg-white border border-[#E5E0D2] rounded-lg px-2 py-1 focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                >
                  {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 59].map((m) => (
                    <option key={m} value={m}>
                      {String(m).padStart(2, "0")}
                    </option>
                  ))}
                </select>
              </div>

              {/* AM / PM Toggle Pills */}
              <div className="pt-3 flex gap-0.5 bg-white p-0.5 rounded-lg border border-[#E5E0D2]">
                <button
                  type="button"
                  onClick={() => setTempPeriod("AM")}
                  className={`px-2 py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${
                    tempPeriod === "AM"
                      ? "bg-[#D4AF37] text-white shadow-xs"
                      : "text-[#918355] hover:text-[#1A1C20]"
                  }`}
                >
                  AM
                </button>
                <button
                  type="button"
                  onClick={() => setTempPeriod("PM")}
                  className={`px-2 py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${
                    tempPeriod === "PM"
                      ? "bg-[#D4AF37] text-white shadow-xs"
                      : "text-[#918355] hover:text-[#1A1C20]"
                  }`}
                >
                  PM
                </button>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-xs font-semibold text-[#918355] hover:text-[#1A1C20] px-3 py-1.5 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleApply}
              className="text-xs font-bold bg-[#D4AF37] hover:bg-[#b8962e] text-white px-4 py-1.5 rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Set Schedule</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
