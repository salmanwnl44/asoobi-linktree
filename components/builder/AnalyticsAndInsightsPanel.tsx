"use client";

import React, { useState, useMemo } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MousePointerClick, 
  Globe2, 
  Smartphone, 
  Monitor, 
  Tablet, 
  Download, 
  RefreshCw, 
  Calendar, 
  Sparkles, 
  ArrowUpRight, 
  ArrowDownRight, 
  Eye, 
  CheckCircle2, 
  ExternalLink, 
  Share2, 
  QrCode, 
  Zap, 
  Filter, 
  Layers,
  Search,
  Clock,
  Printer,
  ShoppingBag,
  Target,
  Flame,
  Award,
  ChevronRight,
  ArrowRight,
  Activity
} from "lucide-react";
import { AsoobiProfileDocument } from "@/types/builder";
import { 
  InstagramIcon, 
  XTwitterIcon, 
  LinkedInIcon, 
  YouTubeIcon, 
  TikTokIcon 
} from "@/components/icons/PlatformIcons";

interface AnalyticsAndInsightsPanelProps {
  profile: AsoobiProfileDocument;
}

type TimeRange = "24h" | "7d" | "30d" | "90d" | "all";
type MetricType = "impressions" | "clicks" | "ctr";
type GeoRegion = "all" | "europe" | "americas" | "asia";
type ContentBlockFilter = "all" | "link" | "featured" | "collection" | "form";

export const AnalyticsAndInsightsPanel: React.FC<AnalyticsAndInsightsPanelProps> = ({ profile }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>("30d");
  const [activeMetric, setActiveMetric] = useState<MetricType>("impressions");
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);
  const [searchBlockQuery, setSearchBlockQuery] = useState("");
  const [blockCategoryFilter, setBlockCategoryFilter] = useState<ContentBlockFilter>("all");
  const [selectedGeoRegion, setSelectedGeoRegion] = useState<GeoRegion>("all");
  const [hoveredHeatmapCell, setHoveredHeatmapCell] = useState<{ day: string; time: string; val: number } | null>(null);

  // Time-range multiplier for dynamic recalculations
  const multiplier = useMemo(() => {
    switch (timeRange) {
      case "24h": return 0.08;
      case "7d": return 0.28;
      case "30d": return 1.0;
      case "90d": return 2.85;
      case "all": return 5.4;
    }
  }, [timeRange]);

  // Overall Luxury KPIs
  const kpis = useMemo(() => {
    const baseViews = 14820;
    const baseClicks = 4192;
    const baseVisitors = 9450;
    const baseOrders = 1048;
    const baseDwellSeconds = 108; // 1m 48s

    const views = Math.round(baseViews * multiplier);
    const clicks = Math.round(baseClicks * multiplier);
    const visitors = Math.round(baseVisitors * multiplier);
    const orders = Math.round(baseOrders * multiplier);
    const ctr = ((clicks / views) * 100).toFixed(1);
    const orderConversionRate = ((orders / clicks) * 100).toFixed(1);

    return {
      impressions: views.toLocaleString(),
      clicks: clicks.toLocaleString(),
      ctr: `${ctr}%`,
      visitors: visitors.toLocaleString(),
      orders: orders.toLocaleString(),
      orderConversionRate: `${orderConversionRate}%`,
      dwell: `${Math.floor(baseDwellSeconds / 60)}m ${baseDwellSeconds % 60}s`,
    };
  }, [multiplier]);

  // Engagement Timeline Data Points (7 distinct time checkpoints)
  const chartPoints = useMemo(() => {
    const rawData = [
      { label: "Aug 12", views: 1250, clicks: 360, ctr: 28.8 },
      { label: "Aug 17", views: 1840, clicks: 520, ctr: 28.2 },
      { label: "Aug 22", views: 1610, clicks: 470, ctr: 29.1 },
      { label: "Aug 27", views: 2350, clicks: 680, ctr: 28.9 },
      { label: "Sep 01", views: 2980, clicks: 840, ctr: 28.1 },
      { label: "Sep 05", views: 2640, clicks: 760, ctr: 28.7 },
      { label: "Sep 10", views: 3750, clicks: 1060, ctr: 28.2 },
    ];

    return rawData.map((d) => {
      const views = Math.round(d.views * multiplier);
      const clicks = Math.round(d.clicks * multiplier);
      const ctr = views > 0 ? Number(((clicks / views) * 100).toFixed(1)) : 0;
      return {
        label: d.label,
        views,
        clicks,
        ctr,
      };
    });
  }, [multiplier]);

  // Max value calculation for SVG scaling
  const maxMetricValue = useMemo(() => {
    if (activeMetric === "ctr") return 40;
    const vals = chartPoints.map((p) => (activeMetric === "clicks" ? p.clicks : p.views));
    return Math.max(...vals) * 1.2 || 100;
  }, [chartPoints, activeMetric]);

  // Generate smooth cubic Bézier SVG path coordinates for responsive width (800x200 canvas)
  const svgMetrics = useMemo(() => {
    const width = 800;
    const height = 180;
    const paddingX = 40;
    const paddingY = 24;

    const points = chartPoints.map((p, i) => {
      const val = activeMetric === "clicks" ? p.clicks : activeMetric === "ctr" ? p.ctr : p.views;
      const x = paddingX + (i / (chartPoints.length - 1)) * (width - 2 * paddingX);
      const y = height - paddingY - (val / maxMetricValue) * (height - 2 * paddingY);
      return { x, y, raw: p };
    });

    const pathD = points.reduce((acc, point, i, arr) => {
      if (i === 0) return `M ${point.x} ${point.y}`;
      const prev = arr[i - 1];
      const cx1 = prev.x + (point.x - prev.x) / 2;
      const cy1 = prev.y;
      const cx2 = prev.x + (point.x - prev.x) / 2;
      const cy2 = point.y;
      return `${acc} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${point.x} ${point.y}`;
    }, "");

    const areaD = `${pathD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

    return { pathD, areaD, points, width, height };
  }, [chartPoints, activeMetric, maxMetricValue]);

  // Real CSV Download generator
  const handleExportCSV = () => {
    setIsExporting(true);

    setTimeout(() => {
      try {
        const headers = ["Metric / Entity", "Type", "Count / Value", "Period", "Trend"];
        const rows = [
          ["Total Impressions", "Traffic", kpis.impressions, timeRange, "+18.4%"],
          ["Total Link Clicks", "Engagement", kpis.clicks, timeRange, "+12.1%"],
          ["Average CTR", "Performance", kpis.ctr, timeRange, "+2.4%"],
          ["Unique Visitors", "Audience", kpis.visitors, timeRange, "+14.6%"],
          ["Goal Conversions", "Orders", kpis.orders, timeRange, "+8.2%"],
          ["Avg Dwell Time", "Engagement", kpis.dwell, timeRange, "+15s"],
          ...profile.blocks.map((b, i) => [
            b.title || `Block #${i + 1}`,
            b.type,
            Math.round(4192 * multiplier * (0.35 / (i + 1))),
            timeRange,
            "Active",
          ]),
        ];

        const csvContent = [headers.join(","), ...rows.map((r) => r.map((c) => `"${c}"`).join(","))].join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `asoobi-analytics-${profile.handle || "creator"}-${timeRange}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setExportSuccess(true);
        setTimeout(() => setExportSuccess(false), 3500);
      } catch (err) {
        console.error("Export error", err);
      } finally {
        setIsExporting(false);
      }
    }, 600);
  };

  // Block Performance mapped from live profile blocks
  const blockPerformance = useMemo(() => {
    const colors = ["#D4AF37", "#AA771C", "#2A2E33", "#8E8268", "#4A5568", "#718096"];
    const baseShares = [36.2, 24.5, 17.8, 10.4, 6.2, 4.9];

    return profile.blocks.map((block, i) => {
      const share = baseShares[i] || Math.max(3.2, 12 - i * 1.5);
      const clicks = Math.round((4192 * multiplier * share) / 100);
      const views = Math.round(clicks * (2.4 + (i % 3) * 0.3));
      const ctr = views > 0 ? ((clicks / views) * 100).toFixed(1) : "0.0";
      const trend = i % 2 === 0 ? `+${(14.2 - i * 1.8).toFixed(1)}%` : `+${(9.5 - i * 1.2).toFixed(1)}%`;

      return {
        id: block.id,
        title: block.title || (block as any).url || "Untitled Content Block",
        type: block.type.replace("_", " "),
        url: block.destinationUrl || (block as any).url || "",
        clicks,
        views,
        ctr: `${ctr}%`,
        share,
        trend,
        color: colors[i % colors.length],
      };
    });
  }, [profile.blocks, multiplier]);

  // Filtered block list
  const filteredBlocks = useMemo(() => {
    return blockPerformance.filter((b) => {
      const matchesSearch = b.title.toLowerCase().includes(searchBlockQuery.toLowerCase()) ||
                            b.type.toLowerCase().includes(searchBlockQuery.toLowerCase());
      if (!matchesSearch) return false;

      if (blockCategoryFilter === "all") return true;
      if (blockCategoryFilter === "link") return b.type.includes("link");
      if (blockCategoryFilter === "featured") return b.type.includes("featured");
      if (blockCategoryFilter === "collection") return b.type.includes("collection");
      if (blockCategoryFilter === "form") return b.type.includes("contact");
      return true;
    });
  }, [blockPerformance, searchBlockQuery, blockCategoryFilter]);

  // Conversion Funnel Data
  const funnelStages = useMemo(() => {
    const totalViews = Math.round(14820 * multiplier);
    const contentDwell = Math.round(totalViews * 0.84); // 84%
    const linkTaps = Math.round(4192 * multiplier); // ~28.3%
    const conversions = Math.round(1048 * multiplier); // ~7.1%

    return [
      { name: "1. Profile Impressions", count: totalViews, pct: 100, drop: "0%", desc: "Followers arriving via bio, story swipe, or direct QR" },
      { name: "2. Content Block Exploration", count: contentDwell, pct: 84, drop: "-16.0%", desc: "Followers scrolling past hero cover into active blocks" },
      { name: "3. Outbound CTA & Link Taps", count: linkTaps, pct: 28.3, drop: "-55.7%", desc: "Visitors clicking destination links, lookbooks, or forms" },
      { name: "4. Purchases & Completed Inquiries", count: conversions, pct: 7.1, drop: "-21.2%", desc: "Orders placed, lookbook bookings, or form submits" },
    ];
  }, [multiplier]);

  // Traffic Referrals
  const trafficSources = [
    { name: "Instagram Bio & Stories", icon: <InstagramIcon className="w-4 h-4 text-pink-600" />, pct: 52.4, visitors: Math.round(4950 * multiplier) },
    { name: "TikTok Profile Link", icon: <TikTokIcon className="w-4 h-4 text-black" />, pct: 21.8, visitors: Math.round(2060 * multiplier) },
    { name: "Direct & Atelier QR Code", icon: <QrCode className="w-4 h-4 text-[#D4AF37]" />, pct: 14.2, visitors: Math.round(1340 * multiplier) },
    { name: "X (Twitter) Thread Links", icon: <XTwitterIcon className="w-4 h-4 text-neutral-800" />, pct: 7.6, visitors: Math.round(720 * multiplier) },
    { name: "Direct Search & Editorial Press", icon: <Globe2 className="w-4 h-4 text-emerald-600" />, pct: 4.0, visitors: Math.round(380 * multiplier) },
  ];

  // Outbound Destinations
  const outboundDestinations = [
    { domain: "asoobi.com/campaigns", name: "Asoobi Lookbook Atelier", clicks: Math.round(1840 * multiplier), pct: 43.9 },
    { domain: "vogue.it/moda/features", name: "Vogue Italia Feature Story", clicks: Math.round(1120 * multiplier), pct: 26.7 },
    { domain: "instagram.com/elena_vance", name: "Instagram Official Channel", clicks: Math.round(590 * multiplier), pct: 14.1 },
    { domain: "open.spotify.com/playlist", name: "Studio Runway Soundscape", clicks: Math.round(380 * multiplier), pct: 9.1 },
    { domain: "atelier-orders.asoobi.com", name: "Direct VIP Commission Form", clicks: Math.round(262 * multiplier), pct: 6.2 },
  ];

  // Geolocation Demographics with Regional Filtering
  const allGeoLocations = [
    { country: "Italy", city: "Milan, Rome, Florence", flag: "🇮🇹", region: "europe", pct: 36.8, views: Math.round(5450 * multiplier), avgTime: "2m 14s" },
    { country: "France", city: "Paris, Lyon, Nice", flag: "🇫🇷", region: "europe", pct: 24.1, views: Math.round(3570 * multiplier), avgTime: "1m 58s" },
    { country: "United States", city: "New York, Los Angeles, Miami", flag: "🇺🇸", region: "americas", pct: 18.5, views: Math.round(2740 * multiplier), avgTime: "1m 42s" },
    { country: "United Kingdom", city: "London, Manchester", flag: "🇬🇧", region: "europe", pct: 12.4, views: Math.round(1840 * multiplier), avgTime: "1m 36s" },
    { country: "Japan", city: "Tokyo, Osaka, Kyoto", flag: "🇯🇵", region: "asia", pct: 8.2, views: Math.round(1220 * multiplier), avgTime: "2m 28s" },
  ];

  const filteredGeoLocations = useMemo(() => {
    if (selectedGeoRegion === "all") return allGeoLocations;
    return allGeoLocations.filter((g) => g.region === selectedGeoRegion);
  }, [allGeoLocations, selectedGeoRegion]);

  // Hourly Peak Heatmap Data (Days of Week vs 4 Time Windows)
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const timeSlots = [
    { id: "morning", label: "06:00 – 12:00", name: "Morning" },
    { id: "afternoon", label: "12:00 – 17:00", name: "Afternoon" },
    { id: "evening", label: "17:00 – 22:00", name: "Prime Evening" },
    { id: "night", label: "22:00 – 06:00", name: "Late Night" },
  ];

  // Base intensity matrix [dayIndex][slotIndex] 0-100
  const heatmapMatrix = [
    [32, 58, 85, 24], // Mon
    [38, 64, 88, 28], // Tue
    [45, 72, 92, 34], // Wed
    [52, 78, 98, 41], // Thu (Peak drop day)
    [48, 82, 94, 55], // Fri
    [62, 88, 96, 68], // Sat
    [58, 76, 100, 48], // Sun (Peak evening)
  ];

  return (
    <div className="p-6 md:p-8 max-w-6xl w-full mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#E5E0D2]">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-display font-bold text-[#1A1C20] tracking-tight">
              Analytics & Audience Telemetry
            </h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Telemetry • 12ms
            </span>
          </div>
          <p className="text-xs md:text-sm text-[#918355] mt-1">
            Real-time performance metrics, conversion funnels, and audience attribution for 
            <span className="font-semibold text-[#1A1C20] ml-1">@{profile.handle || "elena_vance"}</span>
          </p>
        </div>

        {/* Global Toolbar Controls */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Time Range Selector */}
          <div className="flex items-center bg-[#FAF9F5] p-1 rounded-xl border border-[#E5E0D2] shadow-2xs">
            {(["24h", "7d", "30d", "90d", "all"] as TimeRange[]).map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                  timeRange === range
                    ? "bg-[#D4AF37] text-white shadow-xs"
                    : "text-[#918355] hover:text-[#1A1C20]"
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Export CSV Action */}
          <button
            type="button"
            onClick={handleExportCSV}
            disabled={isExporting}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all shadow-xs ${
              exportSuccess
                ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                : "bg-white border-[#E5E0D2] text-[#1A1C20] hover:border-[#D4AF37] hover:bg-[#FAF9F5]"
            }`}
          >
            {isExporting ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 text-[#D4AF37] animate-spin" />
                <span>Exporting...</span>
              </>
            ) : exportSuccess ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Downloaded!</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Export CSV</span>
              </>
            )}
          </button>

          {/* Print / PDF Report Action */}
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-[#E5E0D2] text-[#918355] hover:text-[#1A1C20] hover:border-neutral-400 transition-all shadow-xs"
            title="Print or Save PDF report"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Print Report</span>
          </button>
        </div>
      </div>

      {/* 6 Executive KPI Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Total Impressions */}
        <div className="p-4 rounded-2xl bg-white border border-[#E5E0D2] shadow-xs space-y-1 relative group hover:border-[#D4AF37] transition-all">
          <div className="flex items-center justify-between text-[#918355]">
            <span className="text-[10px] font-bold uppercase tracking-wider">Impressions</span>
            <Eye className="w-3.5 h-3.5" />
          </div>
          <div className="text-2xl font-bold font-display text-[#1A1C20] tracking-tight">
            {kpis.impressions}
          </div>
          <div className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
            <ArrowUpRight className="w-3 h-3" />
            <span>+18.4% period</span>
          </div>
        </div>

        {/* Total Link Clicks */}
        <div className="p-4 rounded-2xl bg-white border-2 border-[#D4AF37]/50 shadow-xs space-y-1 relative group hover:border-[#D4AF37] transition-all">
          <div className="flex items-center justify-between text-[#918355]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">Total Clicks</span>
            <MousePointerClick className="w-3.5 h-3.5 text-[#D4AF37]" />
          </div>
          <div className="text-2xl font-bold font-display text-[#D4AF37] tracking-tight">
            {kpis.clicks}
          </div>
          <div className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
            <ArrowUpRight className="w-3 h-3" />
            <span>+12.1% period</span>
          </div>
        </div>

        {/* Average CTR */}
        <div className="p-4 rounded-2xl bg-white border border-[#E5E0D2] shadow-xs space-y-1 relative group hover:border-[#D4AF37] transition-all">
          <div className="flex items-center justify-between text-[#918355]">
            <span className="text-[10px] font-bold uppercase tracking-wider">Avg CTR</span>
            <TrendingUp className="w-3.5 h-3.5" />
          </div>
          <div className="text-2xl font-bold font-display text-[#1A1C20] tracking-tight">
            {kpis.ctr}
          </div>
          <div className="text-[10px] font-bold text-[#918355] flex items-center gap-0.5">
            <span>Industry top 3%</span>
          </div>
        </div>

        {/* Unique Visitors */}
        <div className="p-4 rounded-2xl bg-white border border-[#E5E0D2] shadow-xs space-y-1 relative group hover:border-[#D4AF37] transition-all">
          <div className="flex items-center justify-between text-[#918355]">
            <span className="text-[10px] font-bold uppercase tracking-wider">Unique Visitors</span>
            <Users className="w-3.5 h-3.5" />
          </div>
          <div className="text-2xl font-bold font-display text-[#1A1C20] tracking-tight">
            {kpis.visitors}
          </div>
          <div className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
            <ArrowUpRight className="w-3 h-3" />
            <span>+14.6% growth</span>
          </div>
        </div>

        {/* Orders & Conversions */}
        <div className="p-4 rounded-2xl bg-white border border-[#E5E0D2] shadow-xs space-y-1 relative group hover:border-[#D4AF37] transition-all">
          <div className="flex items-center justify-between text-[#918355]">
            <span className="text-[10px] font-bold uppercase tracking-wider">Conversions</span>
            <ShoppingBag className="w-3.5 h-3.5" />
          </div>
          <div className="text-2xl font-bold font-display text-[#1A1C20] tracking-tight">
            {kpis.orders}
          </div>
          <div className="text-[10px] font-bold text-[#D4AF37]">
            {kpis.orderConversionRate} of clicks
          </div>
        </div>

        {/* Average Dwell Time */}
        <div className="p-4 rounded-2xl bg-white border border-[#E5E0D2] shadow-xs space-y-1 relative group hover:border-[#D4AF37] transition-all">
          <div className="flex items-center justify-between text-[#918355]">
            <span className="text-[10px] font-bold uppercase tracking-wider">Avg Dwell</span>
            <Clock className="w-3.5 h-3.5" />
          </div>
          <div className="text-2xl font-bold font-display text-[#1A1C20] tracking-tight">
            {kpis.dwell}
          </div>
          <div className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
            <ArrowUpRight className="w-3 h-3" />
            <span>+15s vs benchmark</span>
          </div>
        </div>
      </div>

      {/* Interactive Engagement Velocity Curve with Luxury Tooltip */}
      <div className="p-6 rounded-2xl bg-white border border-[#E5E0D2] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E5E0D2]/70">
          <div>
            <h2 className="text-base font-bold text-[#1A1C20] flex items-center gap-2 font-display">
              <Activity className="w-4 h-4 text-[#D4AF37]" />
              <span>Engagement Velocity Curve</span>
            </h2>
            <p className="text-xs text-[#918355]">
              Real-time traffic pacing and audience click density over selected timeline.
            </p>
          </div>

          {/* Metric View Switcher */}
          <div className="flex items-center bg-[#FAF9F5] p-1 rounded-xl border border-[#E5E0D2]">
            <button
              type="button"
              onClick={() => setActiveMetric("impressions")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeMetric === "impressions"
                  ? "bg-[#D4AF37] text-white shadow-xs"
                  : "text-[#918355] hover:text-[#1A1C20]"
              }`}
            >
              Impressions
            </button>
            <button
              type="button"
              onClick={() => setActiveMetric("clicks")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeMetric === "clicks"
                  ? "bg-[#D4AF37] text-white shadow-xs"
                  : "text-[#918355] hover:text-[#1A1C20]"
              }`}
            >
              Link Clicks
            </button>
            <button
              type="button"
              onClick={() => setActiveMetric("ctr")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeMetric === "ctr"
                  ? "bg-[#D4AF37] text-white shadow-xs"
                  : "text-[#918355] hover:text-[#1A1C20]"
              }`}
            >
              CTR %
            </button>
          </div>
        </div>

        {/* Wide Interactive SVG Canvas */}
        <div className="relative w-full overflow-hidden pt-2">
          {/* Active Hover Floating Tooltip */}
          {hoveredPointIndex !== null && svgMetrics.points[hoveredPointIndex] && (
            <div
              className="absolute z-20 pointer-events-none transition-all duration-150 transform -translate-x-1/2 -translate-y-full"
              style={{
                left: `${(svgMetrics.points[hoveredPointIndex].x / svgMetrics.width) * 100}%`,
                top: `${(svgMetrics.points[hoveredPointIndex].y / svgMetrics.height) * 100 - 14}%`,
              }}
            >
              <div className="bg-[#1A1C20] text-white px-3.5 py-2 rounded-xl shadow-xl border border-[#D4AF37]/50 text-xs space-y-1 min-w-[150px]">
                <div className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider">
                  {svgMetrics.points[hoveredPointIndex].raw.label}
                </div>
                <div className="flex items-center justify-between gap-3 text-xs">
                  <span className="text-neutral-400">Views:</span>
                  <span className="font-bold">{svgMetrics.points[hoveredPointIndex].raw.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between gap-3 text-xs">
                  <span className="text-neutral-400">Clicks:</span>
                  <span className="font-bold text-[#D4AF37]">{svgMetrics.points[hoveredPointIndex].raw.clicks.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between gap-3 text-xs border-t border-neutral-700 pt-1">
                  <span className="text-neutral-400">CTR:</span>
                  <span className="font-bold text-emerald-400">{svgMetrics.points[hoveredPointIndex].raw.ctr}%</span>
                </div>
              </div>
            </div>
          )}

          <svg
            viewBox={`0 0 ${svgMetrics.width} ${svgMetrics.height}`}
            className="w-full h-48 md:h-56 overflow-visible"
          >
            <defs>
              <linearGradient id="luxuryGoldGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.32" />
                <stop offset="60%" stopColor="#D4AF37" stopOpacity="0.10" />
                <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Subtle Grid Guidelines */}
            <line x1="40" y1="30" x2="760" y2="30" stroke="#E5E0D2" strokeDasharray="4 4" opacity="0.6" />
            <line x1="40" y1="80" x2="760" y2="80" stroke="#E5E0D2" strokeDasharray="4 4" opacity="0.6" />
            <line x1="40" y1="130" x2="760" y2="130" stroke="#E5E0D2" strokeDasharray="4 4" opacity="0.6" />

            {/* Area Fill */}
            <path d={svgMetrics.areaD} fill="url(#luxuryGoldGradient)" />

            {/* Stroke Curve */}
            <path
              d={svgMetrics.pathD}
              fill="none"
              stroke="#D4AF37"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Interactive Data Node Points */}
            {svgMetrics.points.map((pt, i) => {
              const isHovered = hoveredPointIndex === i;
              return (
                <g
                  key={i}
                  className="cursor-pointer transition-transform"
                  onMouseEnter={() => setHoveredPointIndex(i)}
                  onMouseLeave={() => setHoveredPointIndex(null)}
                >
                  {/* Invisible enlarged hit target for effortless hover */}
                  <circle cx={pt.x} cy={pt.y} r="18" fill="transparent" />

                  {/* Visual Node */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isHovered ? "6" : "4"}
                    fill="#FFFFFF"
                    stroke="#D4AF37"
                    strokeWidth={isHovered ? "3" : "2"}
                    className="transition-all duration-150 drop-shadow-sm"
                  />
                </g>
              );
            })}
          </svg>

          {/* Timeline Date Labels */}
          <div className="flex items-center justify-between px-6 pt-1 text-[11px] text-[#918355] font-mono select-none">
            {chartPoints.map((p, i) => (
              <span
                key={i}
                className={`transition-colors cursor-pointer ${hoveredPointIndex === i ? "text-[#D4AF37] font-bold" : ""}`}
                onMouseEnter={() => setHoveredPointIndex(i)}
                onMouseLeave={() => setHoveredPointIndex(null)}
              >
                {p.label}
              </span>
            ))}
          </div>
        </div>

        {/* AI Insight Badge */}
        <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-xs text-amber-950">
            <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>
              <strong>Prime Traffic Velocity:</strong> Your audience is <strong>3.4x more active</strong> between <strong>7:00 PM – 10:30 PM CET</strong>. We recommend scheduling drops and major link announcements during this window.
            </span>
          </div>
          <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider shrink-0 bg-white px-2.5 py-1 rounded-lg border border-amber-200 shadow-2xs">
            Asoobi AI Telemetry
          </span>
        </div>
      </div>

      {/* Two-Column Analytics Hub: Conversion Funnel & Hourly Activity Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Full-Funnel Conversion Analysis */}
        <div className="p-5 rounded-2xl bg-white border border-[#E5E0D2] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E5E0D2]/70">
            <div>
              <h3 className="text-sm font-bold text-[#1A1C20] flex items-center gap-2 font-display">
                <Target className="w-4 h-4 text-[#D4AF37]" />
                <span>Conversion Funnel Drop-off</span>
              </h3>
              <p className="text-[11px] text-[#918355]">Step-by-step audience progression from visit to goal completion.</p>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              7.1% Net Conversion
            </span>
          </div>

          <div className="space-y-3 pt-1">
            {funnelStages.map((stage, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[#FAF9F5]/70 border border-[#E5E0D2]/60 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1A1C20]">{stage.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-[#918355]">
                      {stage.count.toLocaleString()}
                    </span>
                    <span className="font-bold text-[#D4AF37] w-12 text-right">
                      {stage.pct}%
                    </span>
                  </div>
                </div>
                <div className="w-full h-2 bg-[#E5E0D2] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#D4AF37] to-[#AA771C] rounded-full transition-all duration-500"
                    style={{ width: `${stage.pct}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-[#918355]">
                  <span>{stage.desc}</span>
                  {idx > 0 && (
                    <span className="text-amber-700 font-semibold">{stage.drop} drop-off</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hourly Peak Engagement Heatmap */}
        <div className="p-5 rounded-2xl bg-white border border-[#E5E0D2] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E5E0D2]/70">
            <div>
              <h3 className="text-sm font-bold text-[#1A1C20] flex items-center gap-2 font-display">
                <Flame className="w-4 h-4 text-[#D4AF37]" />
                <span>Audience Activity Heatmap</span>
              </h3>
              <p className="text-[11px] text-[#918355]">Hourly traffic distribution identifying peak engagement windows.</p>
            </div>
            <span className="text-[10px] font-semibold text-[#918355] uppercase tracking-wider">
              Weekly Pacing
            </span>
          </div>

          <div className="space-y-3 pt-1">
            {/* Heatmap Grid */}
            <div className="overflow-x-auto">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr>
                    <th className="text-[10px] font-bold text-[#918355] pb-2 text-left w-14">Day</th>
                    {timeSlots.map((s) => (
                      <th key={s.id} className="text-[10px] font-bold text-[#918355] pb-2 px-1">
                        <div>{s.name}</div>
                        <div className="text-[8px] font-normal text-[#918355]/80">{s.label}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="space-y-1">
                  {daysOfWeek.map((day, dIdx) => (
                    <tr key={day} className="border-b border-[#FAF9F5]">
                      <td className="text-xs font-bold text-[#1A1C20] text-left py-1">{day}</td>
                      {timeSlots.map((slot, sIdx) => {
                        const val = heatmapMatrix[dIdx][sIdx];
                        // Intensity color
                        let bg = "bg-[#FAF9F5] text-neutral-600";
                        if (val >= 90) bg = "bg-[#D4AF37] text-white font-bold shadow-xs";
                        else if (val >= 75) bg = "bg-[#E6C665] text-[#1A1C20] font-semibold";
                        else if (val >= 50) bg = "bg-[#F3E7C4] text-[#1A1C20]";
                        else if (val >= 30) bg = "bg-[#F9F5EB] text-[#918355]";

                        return (
                          <td key={slot.id} className="p-0.5">
                            <div
                              onMouseEnter={() => setHoveredHeatmapCell({ day, time: slot.label, val })}
                              onMouseLeave={() => setHoveredHeatmapCell(null)}
                              className={`h-7 rounded-lg flex items-center justify-center text-[10px] cursor-pointer transition-all hover:scale-105 hover:ring-2 hover:ring-[#D4AF37] ${bg}`}
                              title={`${day} ${slot.label}: ${val}% peak traffic`}
                            >
                              {val}%
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Heatmap Legend */}
            <div className="flex items-center justify-between pt-1 border-t border-[#E5E0D2]/50 text-[10px] text-[#918355]">
              <div className="flex items-center gap-1.5">
                <span>Intensity:</span>
                <span className="w-3 h-3 rounded bg-[#FAF9F5] border border-neutral-200" title="Low" />
                <span className="w-3 h-3 rounded bg-[#F3E7C4]" title="Medium" />
                <span className="w-3 h-3 rounded bg-[#E6C665]" title="High" />
                <span className="w-3 h-3 rounded bg-[#D4AF37]" title="Peak Velocity" />
              </div>
              <span>
                {hoveredHeatmapCell 
                  ? `${hoveredHeatmapCell.day} (${hoveredHeatmapCell.time}): ${hoveredHeatmapCell.val}% velocity`
                  : "Hover cell for volume details"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Two-Column Analytics Hub: Content Blocks Matrix & Outbound Destinations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Advanced Top Performing Content Blocks */}
        <div className="p-5 rounded-2xl bg-white border border-[#E5E0D2] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#E5E0D2]/70">
            <div>
              <h3 className="text-sm font-bold text-[#1A1C20] flex items-center gap-2 font-display">
                <Layers className="w-4 h-4 text-[#D4AF37]" />
                <span>Top Performing Content Blocks</span>
              </h3>
              <p className="text-[11px] text-[#918355]">Ranked by total visitor clicks and conversion share.</p>
            </div>
            <span className="text-[10px] text-[#918355] font-semibold uppercase tracking-wider">
              {filteredBlocks.length} Blocks
            </span>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchBlockQuery}
                onChange={(e) => setSearchBlockQuery(e.target.value)}
                placeholder="Filter blocks by title..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-[#E5E0D2] bg-[#FAF9F5] text-xs focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {(["all", "link", "featured", "collection", "form"] as ContentBlockFilter[]).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setBlockCategoryFilter(cat)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors shrink-0 ${
                    blockCategoryFilter === cat
                      ? "bg-[#1A1C20] text-white"
                      : "bg-[#FAF9F5] text-[#918355] border border-[#E5E0D2] hover:text-[#1A1C20]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Block Rows */}
          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {filteredBlocks.length === 0 ? (
              <div className="text-center py-8 text-xs text-[#918355]">
                No blocks matching query.
              </div>
            ) : (
              filteredBlocks.map((block, idx) => (
                <div
                  key={block.id}
                  className="p-3 rounded-xl hover:bg-[#FAF9F5] transition-colors border border-[#E5E0D2]/50 hover:border-[#E5E0D2] bg-[#FAF9F5]/30 space-y-2"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                          idx === 0
                            ? "bg-[#D4AF37] text-white shadow-xs"
                            : idx === 1
                            ? "bg-neutral-800 text-white"
                            : idx === 2
                            ? "bg-amber-800 text-white"
                            : "bg-neutral-100 text-neutral-600 border border-neutral-200"
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-[#1A1C20] text-xs truncate" title={block.title}>
                          {block.title}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-[9px] text-[#918355]">
                          <span className="uppercase font-semibold tracking-wider px-1.5 py-0.2 rounded bg-neutral-100 text-neutral-500 border border-neutral-200">
                            {block.type}
                          </span>
                          {block.url && (
                            <span className="truncate max-w-[140px] text-neutral-400 font-mono">
                              {block.url.replace(/^https?:\/\//, "")}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 text-right">
                      <div>
                        <div className="text-xs font-bold text-[#D4AF37]">
                          {block.clicks.toLocaleString()} <span className="text-[10px] font-normal text-[#918355]">clicks</span>
                        </div>
                        <div className="text-[10px] font-semibold text-emerald-600 flex items-center justify-end gap-0.5">
                          <ArrowUpRight className="w-2.5 h-2.5" />
                          <span>{block.ctr} CTR</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-[#F0EDE6] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${block.share}%`,
                        backgroundColor: block.color,
                      }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Traffic Channels & Outbound External Destinations */}
        <div className="space-y-6">
          {/* Traffic Acquisition Sources */}
          <div className="p-5 rounded-2xl bg-white border border-[#E5E0D2] shadow-xs space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5E0D2]/70">
              <div>
                <h3 className="text-sm font-bold text-[#1A1C20] flex items-center gap-2 font-display">
                  <Share2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Traffic Acquisition Channels</span>
                </h3>
                <p className="text-[11px] text-[#918355]">Where visitors originate before tapping your link.</p>
              </div>
              <span className="text-[10px] text-[#918355] font-semibold uppercase tracking-wider">
                Attribution
              </span>
            </div>

            <div className="space-y-2.5">
              {trafficSources.map((source, idx) => (
                <div key={idx} className="p-2.5 rounded-xl hover:bg-[#FAF9F5] transition-colors space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-[#FAF9F5] border border-[#E5E0D2] flex items-center justify-center shrink-0">
                        {source.icon}
                      </div>
                      <span className="font-bold text-[#1A1C20]">{source.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-[#918355] font-mono">
                        {source.visitors.toLocaleString()} visits
                      </span>
                      <span className="text-xs font-bold text-[#1A1C20] w-12 text-right">
                        {source.pct}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-[#F0EDE6] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#D4AF37] to-[#AA771C] rounded-full"
                      style={{ width: `${source.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Outbound External Domains */}
          <div className="p-5 rounded-2xl bg-white border border-[#E5E0D2] shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5E0D2]/70">
              <div>
                <h3 className="text-sm font-bold text-[#1A1C20] flex items-center gap-2 font-display">
                  <ExternalLink className="w-4 h-4 text-[#D4AF37]" />
                  <span>Top Outbound Destinations</span>
                </h3>
                <p className="text-[11px] text-[#918355]">External URLs visitors navigate to when leaving.</p>
              </div>
              <span className="text-[10px] text-[#918355] font-semibold uppercase tracking-wider">
                Click Share
              </span>
            </div>

            <div className="space-y-2">
              {outboundDestinations.map((dest, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-xl hover:bg-[#FAF9F5] transition-colors text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-5 h-5 rounded-md bg-neutral-100 border border-neutral-200 flex items-center justify-center text-[10px] font-bold text-neutral-600 shrink-0">
                      {idx + 1}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-[#1A1C20] truncate">{dest.name}</div>
                      <div className="text-[10px] text-[#918355] font-mono truncate">{dest.domain}</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-bold text-[#D4AF37]">{dest.clicks.toLocaleString()} clicks</div>
                    <div className="text-[10px] text-[#918355]">{dest.pct}% share</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Two-Column Analytics Hub: Audience Geolocation & Device Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Audience Geolocation */}
        <div className="p-5 rounded-2xl bg-white border border-[#E5E0D2] shadow-xs space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#E5E0D2]/70">
            <div>
              <h3 className="text-sm font-bold text-[#1A1C20] flex items-center gap-2 font-display">
                <Globe2 className="w-4 h-4 text-[#D4AF37]" />
                <span>Audience Geolocation</span>
              </h3>
              <p className="text-[11px] text-[#918355]">Top countries and metropolitan fashion capitals.</p>
            </div>

            {/* Region Filter */}
            <div className="flex items-center bg-[#FAF9F5] p-1 rounded-xl border border-[#E5E0D2]">
              {(["all", "europe", "americas", "asia"] as GeoRegion[]).map((reg) => (
                <button
                  key={reg}
                  type="button"
                  onClick={() => setSelectedGeoRegion(reg)}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase transition-all ${
                    selectedGeoRegion === reg
                      ? "bg-[#D4AF37] text-white"
                      : "text-[#918355] hover:text-[#1A1C20]"
                  }`}
                >
                  {reg}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2.5">
            {filteredGeoLocations.map((geo, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FAF9F5] transition-colors border border-transparent hover:border-[#E5E0D2]"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl leading-none select-none">{geo.flag}</span>
                  <div>
                    <div className="text-xs font-bold text-[#1A1C20]">{geo.country}</div>
                    <div className="text-[10px] text-[#918355]">{geo.city}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-[#1A1C20]">{geo.views.toLocaleString()} views</div>
                  <div className="text-[10px] font-semibold text-[#D4AF37]">
                    {geo.pct}% • Avg {geo.avgTime}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device & Technology Telemetry */}
        <div className="p-5 rounded-2xl bg-white border border-[#E5E0D2] shadow-xs space-y-3.5">
          <div className="flex items-center justify-between pb-2 border-b border-[#E5E0D2]/70">
            <div>
              <h3 className="text-sm font-bold text-[#1A1C20] flex items-center gap-2 font-display">
                <Smartphone className="w-4 h-4 text-[#D4AF37]" />
                <span>Device & Demographic Telemetry</span>
              </h3>
              <p className="text-[11px] text-[#918355]">Hardware platforms and audience demographic breakdown.</p>
            </div>
            <span className="text-[10px] text-[#918355] font-semibold uppercase tracking-wider">
              Hardware & OS
            </span>
          </div>

          <div className="space-y-3 pt-1">
            {/* Mobile */}
            <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E5E0D2] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#D4AF37]" />
                  <span className="font-bold text-[#1A1C20]">Mobile Devices (iOS & Android)</span>
                </div>
                <span className="font-bold text-[#1A1C20]">84.2%</span>
              </div>
              <div className="w-full h-2 bg-[#E5E0D2] rounded-full overflow-hidden flex">
                <div className="h-full bg-[#D4AF37] rounded-l-full" style={{ width: "68%" }} title="iOS: 68%" />
                <div className="h-full bg-[#AA771C] rounded-r-full" style={{ width: "16.2%" }} title="Android: 16.2%" />
              </div>
              <div className="flex items-center justify-between text-[10px] text-[#918355]">
                <span>Apple iOS (iPhone): 68.0%</span>
                <span>Google Android: 16.2%</span>
              </div>
            </div>

            {/* Desktop */}
            <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E5E0D2] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-neutral-700" />
                  <span className="font-bold text-[#1A1C20]">Desktop (macOS & Windows)</span>
                </div>
                <span className="font-bold text-[#1A1C20]">11.8%</span>
              </div>
              <div className="w-full h-2 bg-[#E5E0D2] rounded-full overflow-hidden flex">
                <div className="h-full bg-neutral-800 rounded-l-full" style={{ width: "75.4%" }} title="macOS: 8.9%" />
                <div className="h-full bg-neutral-500 rounded-r-full" style={{ width: "24.6%" }} title="Windows: 2.9%" />
              </div>
              <div className="flex items-center justify-between text-[10px] text-[#918355]">
                <span>Apple macOS: 8.9%</span>
                <span>Microsoft Windows: 2.9%</span>
              </div>
            </div>

            {/* Tablets */}
            <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E5E0D2] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Tablet className="w-4 h-4 text-neutral-500" />
                  <span className="font-bold text-[#1A1C20]">Tablets (Apple iPad & Others)</span>
                </div>
                <span className="font-bold text-[#1A1C20]">4.0%</span>
              </div>
              <div className="w-full h-2 bg-[#E5E0D2] rounded-full overflow-hidden">
                <div className="h-full bg-neutral-600 rounded-full" style={{ width: "100%" }} />
              </div>
            </div>

            {/* Audience Age Demographics Quick Bar */}
            <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E5E0D2] space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#1A1C20]">Primary Age Demographics</span>
                <span className="text-[10px] text-[#918355] font-semibold">18–34 (82% Core)</span>
              </div>
              <div className="grid grid-cols-4 gap-2 pt-1 text-center">
                <div className="p-1 rounded bg-white border border-[#E5E0D2]">
                  <div className="text-[11px] font-bold text-[#1A1C20]">34%</div>
                  <div className="text-[9px] text-[#918355]">18–24</div>
                </div>
                <div className="p-1 rounded bg-amber-50 border border-amber-200">
                  <div className="text-[11px] font-bold text-[#D4AF37]">48%</div>
                  <div className="text-[9px] text-amber-800">25–34</div>
                </div>
                <div className="p-1 rounded bg-white border border-[#E5E0D2]">
                  <div className="text-[11px] font-bold text-[#1A1C20]">14%</div>
                  <div className="text-[9px] text-[#918355]">35–44</div>
                </div>
                <div className="p-1 rounded bg-white border border-[#E5E0D2]">
                  <div className="text-[11px] font-bold text-[#1A1C20]">4%</div>
                  <div className="text-[9px] text-[#918355]">45+</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
