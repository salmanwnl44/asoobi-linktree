"use client";

import React, { useState } from "react";
import { 
  Plus, 
  Trash2, 
  Eye, 
  EyeOff, 
  GripVertical, 
  ChevronRight, 
  Sparkles, 
  Lock, 
  Palette, 
  User, 
  Layers, 
  BarChart3, 
  Smartphone, 
  Tablet, 
  Monitor, 
  Check, 
  RefreshCw, 
  Share2, 
  ExternalLink,
  Sliders,
  QrCode,
  Tag,
  MessageSquare,
  Search,
  Filter,
  BookOpen,
  ArrowRight,
  FileCheck,
  Copy,
  Pencil,
  ChevronDown,
  Maximize2,
  Archive,
  RotateCcw,
  AlertTriangle,
  LayoutTemplate,
  X as XIcon,
  Upload,
  Clock,
  Link as LinkIcon,
  Timer
} from "lucide-react";
import { INITIAL_PROFILE_DATA } from "@/lib/initialData";
import { AsoobiProfileDocument, ProfileBlock, BlockType, CardDesignConfig } from "@/types/builder";
import { UnifiedProfileRenderer } from "@/components/preview/UnifiedProfileRenderer";
import { ThemeAndStylingPanel, ThemeSubTab } from "@/components/builder/ThemeAndStylingPanel";
import { ALL_CONTACT_TEMPLATES, ContactFormTemplate } from "@/lib/contactTemplates";
import { REAL_BLOCK_TEMPLATES, PlatformBlockTemplate, CURATED_PLATFORM_THEMES } from "@/lib/blockTemplates";
import { 
  CARD_DESIGN_PRESETS, 
  CardDesignPreset, 
  DEFAULT_CARD_DESIGN,
  getCardWrapperClasses,
  getCardWrapperStyle
} from "@/lib/cardDesigns";
import { 
  getPlatformBadgeIcon, 
  PlatformOfficialBadge,
  InstagramIcon, 
  XTwitterIcon, 
  LinkedInIcon, 
  YouTubeIcon, 
  TikTokIcon, 
  SpotifyIcon, 
  GitHubIcon, 
  ThreadsIcon 
} from "@/components/icons/PlatformIcons";

export default function StudioBuilderPage() {
  const [mounted, setMounted] = useState(false);
  const [profile, setProfile] = useState<AsoobiProfileDocument>(INITIAL_PROFILE_DATA);
  const [activeTab, setActiveTab] = useState<"content" | "templates" | "profile" | "appearance" | "settings" | "analytics">("content");
  const [appearanceSubTab, setAppearanceSubTab] = useState<ThemeSubTab>("all");
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [previewDevice, setPreviewDevice] = useState<"mobile" | "tablet" | "desktop">("mobile");
  const [isSaved, setIsSaved] = useState(true);
  const [templateSearch, setTemplateSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [copiedTemplateAlert, setCopiedTemplateAlert] = useState<string | null>(null);
  const [copiedPromoCode, setCopiedPromoCode] = useState<string | null>(null);
  const [expandedPreviewId, setExpandedPreviewId] = useState<string | null>(null);
  const [draggedBlockIndex, setDraggedBlockIndex] = useState<number | null>(null);
  const [dragOverBlockIndex, setDragOverBlockIndex] = useState<number | null>(null);
  const [openTypeDropdownBlockId, setOpenTypeDropdownBlockId] = useState<string | null>(null);
  const [isAvatarShapeDropdownOpen, setIsAvatarShapeDropdownOpen] = useState(false);
  const [archiveAlert, setArchiveAlert] = useState<string | null>(null);
  const [isPublishedPreviewOpen, setIsPublishedPreviewOpen] = useState(false);
  const [fullScreenPreviewDevice, setFullScreenPreviewDevice] = useState<"mobile" | "tablet" | "desktop">("mobile");
  const [copiedPublishUrl, setCopiedPublishUrl] = useState(false);

  React.useEffect(() => {
    setMounted(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsPublishedPreviewOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!mounted) {
    return null;
  }

  const addBlockTemplate = (template: PlatformBlockTemplate) => {
    const newId = `block-${Date.now()}`;
    const newBlock: ProfileBlock = {
      ...template.block,
      id: newId,
      position: profile.blocks.length,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setProfile((prev) => ({
      ...prev,
      blocks: [...prev.blocks, newBlock],
    }));
    setSelectedBlockId(newId);
    setActiveTab("content");
    setCopiedTemplateAlert(`Added "${template.name}" to your content blocks!`);
    setTimeout(() => setCopiedTemplateAlert(null), 3000);
  };

  const applyTemplateToSelectedBlock = (template: PlatformBlockTemplate) => {
    if (!selectedBlockId) {
      addBlockTemplate(template);
      return;
    }
    const currentBlock = profile.blocks.find((b) => b.id === selectedBlockId);
    if (!currentBlock) {
      addBlockTemplate(template);
      return;
    }

    if (template.block.type === "contact_form" && currentBlock.type === "contact_form") {
      const cf = template.block as any;
      updateBlock(selectedBlockId, {
        title: cf.title,
        subtitle: cf.subtitle,
        targetEmail: cf.targetEmail,
        submitButtonText: cf.submitButtonText,
        successMessage: cf.successMessage,
        fields: cf.fields,
        customFields: cf.customFields,
        templateCategory: template.platform,
        templateName: template.name,
      } as any);
    } else {
      const updatedBlock: ProfileBlock = {
        ...template.block,
        id: currentBlock.id,
        position: currentBlock.position,
        updatedAt: new Date().toISOString(),
      };
      setProfile((prev) => ({
        ...prev,
        blocks: prev.blocks.map((b) => (b.id === selectedBlockId ? updatedBlock : b)),
      }));
    }

    setCopiedTemplateAlert(`Applied "${template.name}" to your active block "${currentBlock.title || 'Selected Block'}"!`);
    setTimeout(() => setCopiedTemplateAlert(null), 3000);
  };

  const applyTemplateToContactBlock = (targetBlockId: string, template: ContactFormTemplate) => {
    updateBlock(targetBlockId, {
      title: template.title,
      subtitle: template.subtitle,
      targetEmail: template.targetEmail,
      submitButtonText: template.submitButtonText,
      successMessage: template.successMessage,
      fields: template.fields,
      customFields: template.customFields,
      templateCategory: template.category,
      templateName: template.name,
    } as any);
    setCopiedTemplateAlert(`Applied "${template.name}" to current contact block!`);
    setTimeout(() => setCopiedTemplateAlert(null), 3000);
  };

  const addTemplateAsNewBlock = (template: ContactFormTemplate) => {
    const newId = `block-${Date.now()}`;
    const newBlock: ProfileBlock = {
      id: newId,
      type: "contact_form",
      position: profile.blocks.length,
      title: template.title,
      subtitle: template.subtitle,
      targetEmail: template.targetEmail,
      submitButtonText: template.submitButtonText,
      successMessage: template.successMessage,
      fields: template.fields,
      customFields: template.customFields,
      templateCategory: template.category,
      templateName: template.name,
      isVisible: true,
      isArchived: false,
      accessRules: { isLocked: false, scheduleEnabled: false },
      createdAt: "2026-09-01T00:00:00.000Z",
      updatedAt: "2026-09-01T00:00:00.000Z",
    };

    setProfile((prev) => ({
      ...prev,
      blocks: [...prev.blocks, newBlock],
    }));
    setSelectedBlockId(newId);
    setActiveTab("content");
    setCopiedTemplateAlert(`Created new contact block from "${template.name}"!`);
    setTimeout(() => setCopiedTemplateAlert(null), 3000);
  };

  const selectedBlock = profile.blocks.find((b) => b.id === selectedBlockId);

  const updateBlock = (blockId: string, updates: Partial<ProfileBlock>) => {
    setProfile((prev) => ({
      ...prev,
      blocks: prev.blocks.map((b) => (b.id === blockId ? ({ ...b, ...updates } as ProfileBlock) : b)),
    }));
    setIsSaved(false);
    setTimeout(() => setIsSaved(true), 1200);
  };

  const formatRemainingTime = (isoExpiry?: string) => {
    if (!isoExpiry) return "No timer set";
    const diff = new Date(isoExpiry).getTime() - Date.now();
    if (diff <= 0) return "Expired (Hidden)";
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    if (hours > 48) {
      const days = Math.floor(hours / 24);
      return `${days}d ${hours % 24}h left`;
    }
    if (hours > 0) {
      return `${hours}h ${mins}m left`;
    }
    const secs = Math.floor((diff % (1000 * 60)) / 1000);
    return `${mins}m ${secs}s left`;
  };

  const toggleArchiveBlock = (blockId: string) => {
    const target = profile.blocks.find((b) => b.id === blockId);
    const willArchive = !target?.isArchived;
    setProfile((prev) => ({
      ...prev,
      blocks: prev.blocks.map((b) => (b.id === blockId ? { ...b, isArchived: willArchive } : b)),
    }));
    if (willArchive && selectedBlockId === blockId) {
      setSelectedBlockId(null);
    }
    setArchiveAlert(
      willArchive
        ? `Archived "${target?.title || 'Block'}". It is now disabled from your live profile.`
        : `Unarchived "${target?.title || 'Block'}". It is now active!`
    );
    setTimeout(() => setArchiveAlert(null), 3000);
  };

  const handlePermanentDelete = (blockId: string) => {
    const target = profile.blocks.find((b) => b.id === blockId);
    setProfile((prev) => ({
      ...prev,
      blocks: prev.blocks.filter((b) => b.id !== blockId),
    }));
    if (selectedBlockId === blockId) {
      setSelectedBlockId(null);
    }
    setArchiveAlert(`Deleted "${target?.title || 'Block'}".`);
    setTimeout(() => setArchiveAlert(null), 3000);
  };

  const deleteBlock = (blockId: string) => {
    handlePermanentDelete(blockId);
  };

  const moveBlock = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= profile.blocks.length) return;
    const newBlocks = [...profile.blocks];
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[targetIndex];
    newBlocks[targetIndex] = temp;
    newBlocks.forEach((b, i) => {
      b.position = i;
    });
    setProfile((prev) => ({ ...prev, blocks: newBlocks }));
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedBlockIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", `${index}`);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverBlockIndex !== index) {
      setDragOverBlockIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedBlockIndex(null);
    setDragOverBlockIndex(null);
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedBlockIndex === null || draggedBlockIndex === targetIndex) {
      setDraggedBlockIndex(null);
      setDragOverBlockIndex(null);
      return;
    }

    const newBlocks = [...profile.blocks];
    const [draggedBlock] = newBlocks.splice(draggedBlockIndex, 1);
    newBlocks.splice(targetIndex, 0, draggedBlock);
    newBlocks.forEach((b, i) => {
      b.position = i;
    });

    setProfile((prev) => ({ ...prev, blocks: newBlocks }));
    setDraggedBlockIndex(null);
    setDragOverBlockIndex(null);
    setIsSaved(false);
    setTimeout(() => setIsSaved(true), 1200);
  };

  const changeBlockType = (blockId: string, newType: BlockType) => {
    setProfile((prev) => {
      const block = prev.blocks.find((b) => b.id === blockId);
      if (!block || block.type === newType) return prev;

      let converted: ProfileBlock;
      const base = {
        id: block.id,
        position: block.position,
        title: block.title || "Block Title",
        subtitle: block.subtitle || "",
        isVisible: block.isVisible,
        isArchived: block.isArchived,
        accessRules: block.accessRules || { isLocked: false, scheduleEnabled: false },
        createdAt: block.createdAt,
        updatedAt: new Date().toISOString(),
      };

      if (newType === "featured_link") {
        converted = {
          ...base,
          type: "featured_link",
          url: (block as any).url || "https://asoobi.com",
          badgeText: "FEATURED",
          callToAction: "Discover Now",
          highlightCoverUrl:
            (block as any).highlightCoverUrl ||
            (block as any).thumbnailUrl ||
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
        };
      } else if (newType === "standard_link") {
        converted = {
          ...base,
          type: "standard_link",
          url: (block as any).url || "https://asoobi.com",
          openInNewTab: true,
          thumbnailUrl: (block as any).thumbnailUrl || (block as any).highlightCoverUrl || "",
        };
      } else if (newType === "collection") {
        converted = {
          ...base,
          type: "collection",
          layout: "grid",
          items: (block as any).items || [
            {
              id: `item-${Date.now()}-1`,
              title: "Exclusive Item 1",
              url: "https://asoobi.com",
              price: "$120",
              thumbnailUrl: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=300&q=80",
            },
            {
              id: `item-${Date.now()}-2`,
              title: "Exclusive Item 2",
              url: "https://asoobi.com",
              price: "$240",
              thumbnailUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
            },
          ],
        };
      } else if (newType === "discount_code") {
        converted = {
          ...base,
          type: "discount_code",
          code: (block as any).code || "VIP20",
          discountPercentageOrValue: (block as any).discountPercentageOrValue || "20% OFF",
          brandName: (block as any).brandName || "Asoobi Partner",
          destinationUrl: (block as any).url || (block as any).destinationUrl || "https://asoobi.com",
        };
      } else if (newType === "qr_code") {
        converted = {
          ...base,
          type: "qr_code",
          targetUrl: (block as any).url || "https://asoobi.com",
          downloadLabel: "Scan & Connect",
        };
      } else if (newType === "contact_form") {
        converted = {
          ...base,
          type: "contact_form",
          targetEmail: "hello@asoobi.com",
          fields: {
            collectName: true,
            collectPhone: false,
            collectNote: true,
          },
          successMessage: "Thank you for reaching out!",
          submitButtonText: "Send Message",
        };
      } else if (newType === "social_icons") {
        converted = {
          ...base,
          type: "social_icons",
          iconStyle: "filled_gold",
          platformLinks: [
            { platform: "instagram", url: "https://instagram.com", position: 0 },
            { platform: "tiktok", url: "https://tiktok.com", position: 1 },
            { platform: "youtube", url: "https://youtube.com", position: 2 },
          ],
        };
      } else {
        converted = {
          ...base,
          type: "standard_link",
          url: "https://asoobi.com",
          openInNewTab: true,
        };
      }

      return {
        ...prev,
        blocks: prev.blocks.map((b) => (b.id === blockId ? converted : b)),
      };
    });
    setIsSaved(false);
    setTimeout(() => setIsSaved(true), 1200);
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    callback: (base64Url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        callback(event.target.result);
        setIsSaved(false);
        setTimeout(() => setIsSaved(true), 1200);
      }
    };
    reader.readAsDataURL(file);
  };

  const addBlock = (type: BlockType) => {
    const newId = `block-${Date.now()}`;
    let newBlock: ProfileBlock;

    if (type === "standard_link") {
      newBlock = {
        id: newId,
        type: "standard_link",
        position: profile.blocks.length,
        title: "New Custom Link",
        subtitle: "Click to configure destination",
        url: "https://asoobi.com",
        thumbnailUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=200&q=80",
        isVisible: true,
        isArchived: false,
        openInNewTab: true,
        accessRules: { isLocked: false, scheduleEnabled: false },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    } else if (type === "featured_link") {
      newBlock = {
        id: newId,
        type: "featured_link",
        position: profile.blocks.length,
        title: "Featured Highlight",
        subtitle: "Promote your major drop or video",
        url: "https://asoobi.com",
        callToAction: "Discover Now",
        badgeText: "HOT",
        highlightCoverUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
        isVisible: true,
        isArchived: false,
        accessRules: { isLocked: false, scheduleEnabled: false },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    } else if (type === "discount_code") {
      newBlock = {
        id: newId,
        type: "discount_code",
        position: profile.blocks.length,
        title: "Exclusive Discount",
        subtitle: "Available for community members",
        code: "ASOOBI15",
        discountPercentageOrValue: "15% OFF",
        brandName: "Partner Brand",
        isVisible: true,
        isArchived: false,
        accessRules: { isLocked: false, scheduleEnabled: false },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    } else if (type === "qr_code") {
      newBlock = {
        id: newId,
        type: "qr_code",
        position: profile.blocks.length,
        title: "Scan My Link",
        subtitle: "Connect instantly via QR code",
        targetUrl: "https://asoobi.com",
        downloadLabel: "Visit Link",
        isVisible: true,
        isArchived: false,
        accessRules: { isLocked: false, scheduleEnabled: false },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    } else if (type === "collection") {
      newBlock = {
        id: newId,
        type: "collection",
        position: profile.blocks.length,
        title: "Curated Selection",
        subtitle: "My handpicked items and recommendations",
        layout: "grid",
        isVisible: true,
        isArchived: false,
        accessRules: { isLocked: false, scheduleEnabled: false },
        items: [
          {
            id: `item-1`,
            title: "Favorite Item 1",
            url: "https://asoobi.com",
            thumbnailUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
            price: "$150",
          },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    } else if (type === "contact_form") {
      newBlock = {
        id: newId,
        type: "contact_form",
        position: profile.blocks.length,
        title: "Direct Inquiries",
        subtitle: "Send a message directly to my inbox",
        targetEmail: "contact@asoobi.com",
        fields: {
          collectName: true,
          collectPhone: false,
          collectNote: true,
        },
        successMessage: "Message received! We will respond shortly.",
        submitButtonText: "Send Message",
        isVisible: true,
        isArchived: false,
        accessRules: { isLocked: false, scheduleEnabled: false },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    } else {
      newBlock = {
        id: newId,
        type: "standard_link",
        position: profile.blocks.length,
        title: "New Block",
        url: "https://asoobi.com",
        isVisible: true,
        isArchived: false,
        openInNewTab: true,
        accessRules: { isLocked: false, scheduleEnabled: false },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }

    setProfile((prev) => ({
      ...prev,
      blocks: [...prev.blocks, newBlock],
    }));
    setSelectedBlockId(newId);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[#F9F9F7] text-[#1A1C20] overflow-hidden font-sans">
      {/* Top Navigation Bar */}
      <header className="h-16 px-6 border-b border-[#E5E0D2] bg-white flex items-center justify-between shrink-0 z-10 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-[#D4AF37] flex items-center justify-center font-bold text-white shadow-sm">
              A
            </span>
            <div>
              <span className="font-display font-bold tracking-tight text-lg">ASOOBI</span>
              <span className="text-[10px] tracking-widest font-semibold uppercase text-[#918355] block -mt-1">
                Studio Links
              </span>
            </div>
          </div>

          <div className="h-6 w-px bg-[#E5E0D2]" />

          {/* Profile Status Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F9F9F7] border border-[#E5E0D2] text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>/{profile.handle}</span>
            <span className="text-[10px] text-[#918355] font-semibold">
              {isSaved ? "Saved" : "Saving..."}
            </span>
          </div>
        </div>

        {/* Viewport & Publish Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-[#F9F9F7] p-1 rounded-xl border border-[#E5E0D2]">
            <button
              onClick={() => setPreviewDevice("mobile")}
              className={`p-1.5 rounded-lg transition-colors ${previewDevice === "mobile" ? "bg-white shadow-sm text-[#D4AF37]" : "text-[#918355] hover:text-[#1A1C20]"}`}
              title="Phone"
            >
              <Smartphone className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPreviewDevice("tablet")}
              className={`p-1.5 rounded-lg transition-colors ${previewDevice === "tablet" ? "bg-white shadow-sm text-[#D4AF37]" : "text-[#918355] hover:text-[#1A1C20]"}`}
              title="Tab"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPreviewDevice("desktop")}
              className={`p-1.5 rounded-lg transition-colors ${previewDevice === "desktop" ? "bg-white shadow-sm text-[#D4AF37]" : "text-[#918355] hover:text-[#1A1C20]"}`}
              title="Laptop"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setFullScreenPreviewDevice(previewDevice);
                setIsPublishedPreviewOpen(true);
              }}
              className="p-1.5 rounded-lg transition-colors text-[#918355] hover:text-[#1A1C20] border-l border-[#E5E0D2] ml-1 pl-1.5"
              title="Full Screen Live Preview"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          <button 
            onClick={() => {
              navigator.clipboard?.writeText(`https://asoobi.bio/${profile.handle}`);
              setCopiedPromoCode("link_copied");
              setTimeout(() => setCopiedPromoCode(null), 2000);
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border border-[#E5E0D2] bg-white hover:bg-black/5 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            {copiedPromoCode === "link_copied" ? "Copied!" : "Share"}
          </button>

          <button 
            onClick={() => {
              setIsSaved(true);
              setIsPublishedPreviewOpen(true);
            }}
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold tracking-wide uppercase bg-[#D4AF37] hover:bg-[#b8962e] text-[#1A1C20] shadow-md transition-all active:scale-95"
          >
            <Check className="w-4 h-4" />
            Publish
          </button>
        </div>
      </header>

      {/* 3-Column Studio Grid */}
      <div className="flex-1 flex overflow-hidden">
        {/* Column 1: Left Navigation Dock (300px) */}
        <aside className="w-72 border-r border-[#E5E0D2] bg-white flex flex-col shrink-0">
          <div className="p-4 border-b border-[#E5E0D2]">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#918355]">
              Studio Navigation
            </span>
          </div>

          <nav className="p-3 space-y-1.5">
            <button
              onClick={() => setActiveTab("content")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "content"
                  ? "bg-[#D4AF37] text-white shadow-sm"
                  : "text-[#1A1C20] hover:bg-[#F9F9F7]"
              }`}
            >
              <Layers className="w-4 h-4" />
              Content Blocks ({profile.blocks.length})
            </button>

            <button
              onClick={() => setActiveTab("templates")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "templates"
                  ? "bg-[#D4AF37] text-white shadow-sm"
                  : "text-[#1A1C20] hover:bg-[#F9F9F7]"
              }`}
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4" />
                <span>Templates</span>
              </div>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${activeTab === "templates" ? "bg-white/30 text-white" : "bg-[#D4AF37]/20 text-[#918355]"}`}>
                Presets
              </span>
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "profile"
                  ? "bg-[#D4AF37] text-white shadow-sm"
                  : "text-[#1A1C20] hover:bg-[#F9F9F7]"
              }`}
            >
              <User className="w-4 h-4" />
              Profile & Identity
            </button>

            <button
              onClick={() => setActiveTab("appearance")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "appearance"
                  ? "bg-[#D4AF37] text-white shadow-sm"
                  : "text-[#1A1C20] hover:bg-[#F9F9F7]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Palette className="w-4 h-4" />
                <span>Themes & Styling</span>
              </div>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${activeTab === "appearance" ? "bg-white/30 text-white" : "bg-[#D4AF37]/20 text-[#918355]"}`}>
                Styles & Cards
              </span>
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "settings"
                  ? "bg-[#D4AF37] text-white shadow-sm"
                  : "text-[#1A1C20] hover:bg-[#F9F9F7]"
              }`}
            >
              <Sliders className="w-4 h-4" />
              Access & Scheduling
            </button>

            <button
              onClick={() => setActiveTab("analytics")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "analytics"
                  ? "bg-[#D4AF37] text-white shadow-sm"
                  : "text-[#1A1C20] hover:bg-[#F9F9F7]"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Analytics & Insights
            </button>
          </nav>

          {/* Quick Block Drawer */}
          {activeTab === "content" && (
            <div className="p-4 border-t border-[#E5E0D2] bg-[#F9F9F7]">
              <span className="text-[10px] font-bold tracking-wider uppercase text-[#918355] block mb-2.5">
                Quick Add Block
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => addBlock("standard_link")}
                  className="flex items-center gap-2 p-2 rounded-lg bg-white border border-[#E5E0D2] hover:border-[#D4AF37] text-xs font-medium transition-all shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Link
                </button>
                <button
                  onClick={() => addBlock("featured_link")}
                  className="flex items-center gap-2 p-2 rounded-lg bg-white border border-[#E5E0D2] hover:border-[#D4AF37] text-xs font-medium transition-all shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Featured
                </button>
                <button
                  onClick={() => addBlock("collection")}
                  className="flex items-center gap-2 p-2 rounded-lg bg-white border border-[#E5E0D2] hover:border-[#D4AF37] text-xs font-medium transition-all shadow-xs"
                >
                  <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Collection
                </button>
                <button
                  onClick={() => addBlock("discount_code")}
                  className="flex items-center gap-2 p-2 rounded-lg bg-white border border-[#E5E0D2] hover:border-[#D4AF37] text-xs font-medium transition-all shadow-xs"
                >
                  <Tag className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Discount
                </button>
                <button
                  onClick={() => addBlock("qr_code")}
                  className="flex items-center gap-2 p-2 rounded-lg bg-white border border-[#E5E0D2] hover:border-[#D4AF37] text-xs font-medium transition-all shadow-xs"
                >
                  <QrCode className="w-3.5 h-3.5 text-[#D4AF37]" />
                  QR Code
                </button>
                <button
                  onClick={() => addBlock("contact_form")}
                  className="flex items-center gap-2 p-2 rounded-lg bg-white border border-[#E5E0D2] hover:border-[#D4AF37] text-xs font-medium transition-all shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Contact
                </button>
              </div>
            </div>
          )}

          {/* Active Card Style Quick Dock Widget */}
          <div className="mt-auto p-4 border-t border-[#E5E0D2] bg-[#FAF9F5] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-wider uppercase text-[#918355]">
                Card Design Style
              </span>
              <button
                type="button"
                onClick={() => {
                  setAppearanceSubTab("cards");
                  setActiveTab("appearance");
                }}
                className="text-[10px] font-bold text-[#D4AF37] hover:underline flex items-center gap-0.5"
              >
                <span>Browse {CARD_DESIGN_PRESETS.length}</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                setAppearanceSubTab("cards");
                setActiveTab("appearance");
              }}
              className="w-full p-2.5 rounded-xl border border-[#E5E0D2] bg-white hover:border-[#D4AF37] text-left transition-all flex items-center justify-between shadow-2xs group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#D4AF37] shrink-0">
                  <LayoutTemplate className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#1A1C20] truncate group-hover:text-[#D4AF37] transition-colors">
                    {profile.cardDesign?.name || "Asoobi Imperial Gold"}
                  </div>
                  <div className="text-[9px] text-[#918355] truncate">
                    {profile.cardDesign?.borderRadius} • {profile.cardDesign?.hoverEffect} hover
                  </div>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-[#918355] group-hover:translate-x-0.5 transition-transform shrink-0" />
            </button>
          </div>
        </aside>

        {/* Column 2: Center Dynamic Canvas & Inspector (Flexible 1fr) */}
        <main className="flex-1 border-r border-[#E5E0D2] flex flex-col bg-[#F9F9F7] overflow-y-auto">
          {activeTab === "content" && (
            <div className="p-8 max-w-2xl w-full mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-display font-bold">Content Blocks</h2>
                  <p className="text-xs text-[#918355] mt-0.5">
                    Select a block to edit its type, text, image upload/URL, links, and layout.
                  </p>
                </div>
                <button
                  onClick={() => addBlock("standard_link")}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#1A1C20] text-white hover:bg-black transition-all shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Block
                </button>
              </div>

              {/* Archive Action Feedback Alert */}
              {archiveAlert && (
                <div className="p-3 bg-amber-50 border border-amber-300 text-amber-900 text-xs font-semibold rounded-xl shadow-xs flex items-center justify-between animate-in fade-in duration-200">
                  <div className="flex items-center gap-2">
                    <Archive className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>{archiveAlert}</span>
                  </div>
                  <button onClick={() => setArchiveAlert(null)} className="text-amber-700 hover:text-black">
                    <XIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Block List */}
              <div className="space-y-3">
                {profile.blocks.length === 0 && (
                  <div className="py-12 px-6 rounded-2xl border-2 border-dashed border-[#E5E0D2] bg-white text-center space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF9F5] border border-[#E5E0D2] flex items-center justify-center mx-auto text-[#D4AF37]">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#1A1C20]">No Content Blocks Yet</h3>
                      <p className="text-xs text-[#918355] mt-1 max-w-sm mx-auto">
                        Add a new link block or choose an interactive template to get started.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => addBlock("standard_link")}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#D4AF37] hover:bg-[#b8962e] text-[#1A1C20] shadow-xs transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      Add Your First Block
                    </button>
                  </div>
                )}

                {profile.blocks.map((block, index) => {
                  const isSelected = selectedBlockId === block.id;
                  const isDragging = draggedBlockIndex === index;
                  const isDragOver = dragOverBlockIndex === index && draggedBlockIndex !== index;
                  const isArchived = Boolean(block.isArchived);

                  return (
                    <div
                      key={block.id}
                      draggable={!isArchived}
                      onDragStart={(e) => !isArchived && handleDragStart(e, index)}
                      onDragOver={(e) => !isArchived && handleDragOver(e, index)}
                      onDragEnd={handleDragEnd}
                      onDrop={(e) => !isArchived && handleDrop(e, index)}
                      className={`p-4 rounded-2xl border transition-all relative ${
                        isArchived
                          ? "bg-neutral-100/70 border-dashed border-neutral-300 opacity-65 hover:opacity-85 shadow-2xs"
                          : "bg-white " + (isSelected ? "border-[#D4AF37] ring-2 ring-[#D4AF37]/20 shadow-md" : "border-[#E5E0D2] hover:border-[#D4AF37]/50")
                      } ${
                        isDragging ? "opacity-35 scale-[0.98] border-dashed border-[#D4AF37] shadow-xl" : ""
                      } ${
                        isDragOver ? "border-t-4 border-t-[#D4AF37] shadow-md bg-amber-50/30 ring-1 ring-[#D4AF37]/30" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          {/* Drag Handle */}
                          <div
                            draggable={!isArchived}
                            onDragStart={(e) => !isArchived && handleDragStart(e, index)}
                            className={`p-2 rounded-xl transition-colors shrink-0 ${
                              isArchived 
                                ? "text-neutral-300 cursor-not-allowed" 
                                : "cursor-grab active:cursor-grabbing text-[#918355] hover:bg-black/5 hover:text-[#1A1C20]"
                            }`}
                            title={isArchived ? "Unarchive block to reorder" : "Drag up or down to reorder"}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <GripVertical className="w-4 h-4" />
                          </div>

                          {/* Block Thumbnail / Type Icon Preview */}
                          <div className={`w-10 h-10 rounded-lg overflow-hidden bg-[#F9F9F7] border border-[#E5E0D2] flex items-center justify-center shrink-0 ${isArchived ? "grayscale" : ""}`}>
                            {"highlightCoverUrl" in block && (block as any).highlightCoverUrl ? (
                              <img src={(block as any).highlightCoverUrl} alt="" className="w-full h-full object-cover" />
                            ) : "thumbnailUrl" in block && (block as any).thumbnailUrl ? (
                              <img src={(block as any).thumbnailUrl} alt="" className="w-full h-full object-cover" />
                            ) : block.type === "discount_code" ? (
                              <Tag className="w-5 h-5 text-[#D4AF37]" />
                            ) : block.type === "qr_code" ? (
                              <QrCode className="w-5 h-5 text-[#D4AF37]" />
                            ) : block.type === "contact_form" ? (
                              <MessageSquare className="w-5 h-5 text-[#D4AF37]" />
                            ) : block.type === "social_icons" ? (
                              <Share2 className="w-5 h-5 text-[#D4AF37]" />
                            ) : `${block.title} ${(block as any).url || ""}`.toLowerCase().includes("instagram") ? (
                              <PlatformOfficialBadge platform="instagram" size="sm" shape="squircle" />
                            ) : `${block.title} ${(block as any).url || ""}`.toLowerCase().includes("x:") || `${block.title} ${(block as any).url || ""}`.toLowerCase().includes("x.com") || `${block.title} ${(block as any).url || ""}`.toLowerCase().includes("twitter") ? (
                              <PlatformOfficialBadge platform="x" size="sm" shape="squircle" />
                            ) : `${block.title} ${(block as any).url || ""}`.toLowerCase().includes("linkedin") ? (
                              <PlatformOfficialBadge platform="linkedin" size="sm" shape="squircle" />
                            ) : `${block.title} ${(block as any).url || ""}`.toLowerCase().includes("youtube") ? (
                              <PlatformOfficialBadge platform="youtube" size="sm" shape="squircle" />
                            ) : `${block.title} ${(block as any).url || ""}`.toLowerCase().includes("tiktok") ? (
                              <PlatformOfficialBadge platform="tiktok" size="sm" shape="squircle" />
                            ) : `${block.title} ${(block as any).url || ""}`.toLowerCase().includes("spotify") ? (
                              <PlatformOfficialBadge platform="spotify" size="sm" shape="squircle" />
                            ) : `${block.title} ${(block as any).url || ""}`.toLowerCase().includes("github") ? (
                              <PlatformOfficialBadge platform="github" size="sm" shape="squircle" />
                            ) : `${block.title} ${(block as any).url || ""}`.toLowerCase().includes("threads") ? (
                              <PlatformOfficialBadge platform="threads" size="sm" shape="squircle" />
                            ) : (
                              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                            )}
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`text-xs font-bold truncate ${isArchived ? "line-through text-neutral-500" : "text-[#1A1C20]"}`}>
                                {block.title || "Untitled Block"}
                              </span>
                              <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#F9F9F7] border border-[#E5E0D2] text-[#918355] shrink-0">
                                {block.type.replace("_", " ")}
                              </span>
                              {isArchived && (
                                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-amber-800 shrink-0 flex items-center gap-1">
                                  <Archive className="w-2.5 h-2.5 text-amber-700" />
                                  Archived (Disabled)
                                </span>
                              )}
                              {block.disappearTimerEnabled && !isArchived && (
                                <span
                                  className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border shrink-0 flex items-center gap-1 ${
                                    new Date(block.disappearAt || "").getTime() <= Date.now()
                                      ? "bg-red-50 border-red-300 text-red-700"
                                      : "bg-amber-50 border-amber-300 text-amber-800"
                                  }`}
                                  title={`Disappearance Timer: ${formatRemainingTime(block.disappearAt)}`}
                                >
                                  <Clock className="w-2.5 h-2.5" />
                                  <span>{formatRemainingTime(block.disappearAt)}</span>
                                </span>
                              )}
                              {(block.destinationUrl || (block as any).url) && (
                                <span
                                  className="text-[9px] text-[#918355] flex items-center gap-0.5 max-w-[110px] truncate"
                                  title={`Destination Link: ${block.destinationUrl || (block as any).url}`}
                                >
                                  <LinkIcon className="w-2.5 h-2.5 shrink-0" />
                                  <span className="truncate">{(block.destinationUrl || (block as any).url)?.replace(/^https?:\/\//, "")}</span>
                                </span>
                              )}
                              {block.accessRules?.isLocked && !isArchived && (
                                <Lock className="w-3 h-3 text-amber-600 shrink-0" />
                              )}
                            </div>
                            {block.subtitle && (
                              <p className="text-[11px] text-[#918355] truncate max-w-sm mt-0.5">
                                {block.subtitle}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons: EDIT Button + Archive/Unarchive + Direct Delete */}
                        <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            disabled={isArchived}
                            onClick={() => !isArchived && setSelectedBlockId(isSelected ? null : block.id)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs ${
                              isArchived
                                ? "bg-neutral-100 text-neutral-400 cursor-not-allowed border border-neutral-200"
                                : isSelected
                                ? "bg-[#D4AF37] text-white shadow-xs"
                                : "bg-[#FAF9F5] text-[#1A1C20] hover:bg-[#D4AF37] hover:text-white border border-[#E5E0D2]"
                            }`}
                            title={isArchived ? "Unarchive this block to edit it" : isSelected ? "Close Editor" : "Edit Block Details"}
                          >
                            <Pencil className="w-3.5 h-3.5" />
                            <span>{isSelected ? "Editing" : "Edit"}</span>
                          </button>

                          {/* Archive/Unarchive Button (Replaces View/Visibility Button) */}
                          <button
                            type="button"
                            onClick={() => toggleArchiveBlock(block.id)}
                            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                              isArchived
                                ? "bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200 shadow-2xs"
                                : "text-[#918355] hover:text-[#1A1C20] hover:bg-black/5"
                            }`}
                            title={isArchived ? "Unarchive content box (Click to enable)" : "Archive content box (Disables from profile)"}
                          >
                            <Archive className="w-4 h-4" />
                            {isArchived && <span className="text-[11px] font-semibold">Unarchive</span>}
                          </button>

                          {/* Direct Delete Button: Directly deletes without confirmation modal */}
                          <button
                            type="button"
                            onClick={() => handlePermanentDelete(block.id)}
                            className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors"
                            title="Delete content box"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Selected Block Inline Inspector */}
                      {isSelected && !isArchived && (
                        <div
                          className="mt-4 pt-4 border-t border-[#E5E0D2] space-y-4"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* Block Type Switcher */}
                          <div className="p-3 bg-[#F9F9F7] rounded-xl border border-[#E5E0D2] space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-[#918355] flex items-center justify-between">
                              <span>Block Type</span>
                              <span className="text-[9px] text-[#D4AF37] font-semibold">Change anytime</span>
                            </label>
                            {/* Custom Luxury Block Type Dropdown */}
                            <div className="relative">
                              <button
                                type="button"
                                onClick={() => setOpenTypeDropdownBlockId(openTypeDropdownBlockId === block.id ? null : block.id)}
                                className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-[#E5E0D2] bg-white text-[#1A1C20] hover:border-[#D4AF37] transition-all flex items-center justify-between shadow-2xs group"
                              >
                                <div className="flex items-center gap-2">
                                  {block.type === "standard_link" && <Sparkles className="w-4 h-4 text-[#D4AF37]" />}
                                  {block.type === "featured_link" && <Eye className="w-4 h-4 text-[#D4AF37]" />}
                                  {block.type === "collection" && <Layers className="w-4 h-4 text-[#D4AF37]" />}
                                  {block.type === "discount_code" && <Tag className="w-4 h-4 text-[#D4AF37]" />}
                                  {block.type === "qr_code" && <QrCode className="w-4 h-4 text-[#D4AF37]" />}
                                  {block.type === "contact_form" && <MessageSquare className="w-4 h-4 text-[#D4AF37]" />}
                                  {block.type === "social_icons" && <Share2 className="w-4 h-4 text-[#D4AF37]" />}
                                  <span className="font-bold text-[#1A1C20]">
                                    {block.type === "standard_link" && "Standard Link Card"}
                                    {block.type === "featured_link" && "Featured Card (Big Cover)"}
                                    {block.type === "collection" && "Curated Collection / Grid"}
                                    {block.type === "discount_code" && "Discount Code Voucher"}
                                    {block.type === "qr_code" && "QR Code Card"}
                                    {block.type === "contact_form" && "Contact Form"}
                                    {block.type === "social_icons" && "Social Icon Bar"}
                                  </span>
                                </div>
                                <ChevronDown className={`w-4 h-4 text-[#918355] transition-transform duration-200 ${openTypeDropdownBlockId === block.id ? "rotate-180 text-[#D4AF37]" : ""}`} />
                              </button>

                              {openTypeDropdownBlockId === block.id && (
                                <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white border border-[#E5E0D2] rounded-2xl shadow-xl p-1.5 space-y-1 animate-in fade-in slide-in-from-top-1 duration-150">
                                  {[
                                    { type: "standard_link", label: "Standard Link Card", desc: "Title, link URL and thumbnail", icon: <Sparkles className="w-4 h-4 text-[#D4AF37]" /> },
                                    { type: "featured_link", label: "Featured Card (Big Cover)", desc: "Hero cover banner with call to action", icon: <Eye className="w-4 h-4 text-[#D4AF37]" /> },
                                    { type: "collection", label: "Curated Collection / Grid", desc: "Product grid with images and prices", icon: <Layers className="w-4 h-4 text-[#D4AF37]" /> },
                                    { type: "discount_code", label: "Discount Code Voucher", desc: "1-click copy promo code badge", icon: <Tag className="w-4 h-4 text-[#D4AF37]" /> },
                                    { type: "qr_code", label: "QR Code Card", desc: "Scannable QR connect badge", icon: <QrCode className="w-4 h-4 text-[#D4AF37]" /> },
                                    { type: "contact_form", label: "Contact Form", desc: "Inquiry brief with custom fields", icon: <MessageSquare className="w-4 h-4 text-[#D4AF37]" /> },
                                    { type: "social_icons", label: "Social Icon Bar", desc: "Compact row of social channel icons", icon: <Share2 className="w-4 h-4 text-[#D4AF37]" /> },
                                  ].map((opt) => {
                                    const isCurrent = block.type === opt.type;
                                    return (
                                      <button
                                        key={opt.type}
                                        type="button"
                                        onClick={() => {
                                          changeBlockType(block.id, opt.type as BlockType);
                                          setOpenTypeDropdownBlockId(null);
                                        }}
                                        className={`w-full p-2.5 rounded-xl text-left transition-all flex items-center justify-between ${
                                          isCurrent
                                            ? "bg-[#FAF9F5] border border-[#D4AF37]/50 text-[#1A1C20]"
                                            : "hover:bg-[#FAF9F5] text-[#1A1C20] border border-transparent"
                                        }`}
                                      >
                                        <div className="flex items-center gap-2.5">
                                          <div className="w-7 h-7 rounded-lg bg-amber-50/70 border border-amber-200/50 flex items-center justify-center shrink-0">
                                            {opt.icon}
                                          </div>
                                          <div>
                                            <div className="text-xs font-bold text-[#1A1C20]">{opt.label}</div>
                                            <div className="text-[10px] text-[#918355]">{opt.desc}</div>
                                          </div>
                                        </div>
                                        {isCurrent && <Check className="w-4 h-4 text-[#D4AF37]" />}
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Common Fields: Title & Subtitle */}
                          <div className="grid grid-cols-1 gap-3">
                            <div>
                              <label className="text-[10px] font-bold uppercase tracking-wider text-[#918355] block mb-1">
                                Block Title
                              </label>
                              <input
                                type="text"
                                value={block.title}
                                onChange={(e) => updateBlock(block.id, { title: e.target.value })}
                                className="w-full text-xs px-3 py-2 rounded-xl border border-[#E5E0D2] bg-[#F9F9F7] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-bold uppercase tracking-wider text-[#918355] block mb-1">
                                Subtitle / Description
                              </label>
                              <input
                                type="text"
                                value={block.subtitle || ""}
                                placeholder="Optional subtitle or description..."
                                onChange={(e) => updateBlock(block.id, { subtitle: e.target.value })}
                                className="w-full text-xs px-3 py-2 rounded-xl border border-[#E5E0D2] bg-[#F9F9F7] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                              />
                            </div>

                            {/* Universal Destination URL for EVERY block */}
                            <div>
                              <label className="text-[10px] font-bold uppercase tracking-wider text-[#918355] flex items-center justify-between mb-1">
                                <span className="flex items-center gap-1.5">
                                  <LinkIcon className="w-3 h-3 text-[#D4AF37]" />
                                  <span>Destination Link (URL)</span>
                                </span>
                                <span className="text-[9px] text-[#918355] font-normal">Opens on tap</span>
                              </label>
                              <input
                                type="url"
                                placeholder="https://example.com/destination..."
                                value={block.destinationUrl || (block as any).url || ""}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  updateBlock(block.id, {
                                    destinationUrl: val,
                                    ...("url" in block ? { url: val } : {}),
                                  } as any);
                                }}
                                className="w-full text-xs px-3 py-2 rounded-xl border border-[#E5E0D2] bg-[#F9F9F7] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                              />
                            </div>

                            {/* Universal Disappearance Timer for EVERY block */}
                            <div className="p-3.5 rounded-xl border border-[#E5E0D2] bg-[#FAF9F5] space-y-2.5">
                              <div className="flex items-center justify-between">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-[#918355] flex items-center gap-1.5">
                                  <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                                  <span>Disappearance Timer</span>
                                </label>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const nowEnabled = !block.disappearTimerEnabled;
                                    const defaultExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
                                    updateBlock(block.id, {
                                      disappearTimerEnabled: nowEnabled,
                                      disappearAt: block.disappearAt || defaultExpiry,
                                      disappearDurationHours: block.disappearDurationHours || 24,
                                    } as any);
                                  }}
                                  className={`px-2.5 py-0.8 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                                    block.disappearTimerEnabled
                                      ? "bg-[#D4AF37] text-white shadow-2xs"
                                      : "bg-[#EFECE6] text-[#918355] hover:bg-[#E5E0D2]"
                                  }`}
                                >
                                  {block.disappearTimerEnabled ? "Timer Active" : "Set Timer"}
                                </button>
                              </div>

                              {block.disappearTimerEnabled && (
                                <div className="space-y-2 pt-1 border-t border-[#E5E0D2]/60 animate-in fade-in duration-150">
                                  <div className="flex items-center justify-between text-[11px]">
                                    <span className="text-[#918355] font-medium">Auto-disappears after:</span>
                                    <span className="text-[10px] font-mono font-bold text-[#D4AF37] bg-white px-2 py-0.5 rounded-md border border-[#E5E0D2]">
                                      {formatRemainingTime(block.disappearAt)}
                                    </span>
                                  </div>

                                  {/* Quick Duration Presets */}
                                  <div className="grid grid-cols-5 gap-1">
                                    {[
                                      { label: "1h", hours: 1 },
                                      { label: "12h", hours: 12 },
                                      { label: "24h", hours: 24 },
                                      { label: "3d", hours: 72 },
                                      { label: "7d", hours: 168 },
                                    ].map((preset) => (
                                      <button
                                        key={preset.hours}
                                        type="button"
                                        onClick={() => {
                                          const newExpiry = new Date(Date.now() + preset.hours * 60 * 60 * 1000).toISOString();
                                          updateBlock(block.id, {
                                            disappearAt: newExpiry,
                                            disappearDurationHours: preset.hours,
                                          } as any);
                                        }}
                                        className={`py-1 px-1 rounded-lg text-[10px] font-semibold text-center border transition-all cursor-pointer ${
                                          block.disappearDurationHours === preset.hours
                                            ? "bg-[#D4AF37] text-white border-[#D4AF37]"
                                            : "bg-white border-[#E5E0D2] text-[#1A1C20] hover:border-[#D4AF37]/50"
                                        }`}
                                      >
                                        {preset.label}
                                      </button>
                                    ))}
                                  </div>

                                  {/* Custom Expiration Date & Time */}
                                  <div className="pt-1">
                                    <label className="text-[10px] font-semibold text-[#918355] block mb-1">
                                      Custom Expiration Date & Time
                                    </label>
                                    <input
                                      type="datetime-local"
                                      value={
                                        block.disappearAt
                                          ? new Date(new Date(block.disappearAt).getTime() - new Date().getTimezoneOffset() * 60000)
                                              .toISOString()
                                              .slice(0, 16)
                                          : ""
                                      }
                                      onChange={(e) => {
                                        if (e.target.value) {
                                          const d = new Date(e.target.value);
                                          updateBlock(block.id, {
                                            disappearAt: d.toISOString(),
                                            disappearDurationHours: undefined,
                                          } as any);
                                        }
                                      }}
                                      className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-[#E5E0D2] bg-white text-[#1A1C20] focus:outline-none focus:border-[#D4AF37]"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Featured Link Specific: Big Cover Image (Upload Only) */}
                          {block.type === "featured_link" && (
                            <div className="space-y-3 p-3.5 rounded-xl border border-[#E5E0D2] bg-[#FAF9F5]">
                              <div className="flex items-center justify-between">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-[#918355]">
                                  Featured Cover Image
                                </label>
                                {(block as any).highlightCoverUrl && (
                                  <button
                                    type="button"
                                    onClick={() => updateBlock(block.id, { highlightCoverUrl: "" } as any)}
                                    className="text-[10px] text-red-500 hover:text-red-700 font-semibold"
                                  >
                                    Remove Cover
                                  </button>
                                )}
                              </div>

                              {(block as any).highlightCoverUrl && (
                                <div className="w-full h-32 rounded-xl overflow-hidden border border-[#E5E0D2] relative bg-black/5">
                                  <img
                                    src={(block as any).highlightCoverUrl}
                                    alt="Cover Preview"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}

                              <div>
                                <label className="w-full cursor-pointer flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-dashed border-[#D4AF37] bg-white text-xs font-semibold text-[#1A1C20] hover:bg-amber-50/50 transition-colors shadow-2xs text-center">
                                  <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
                                  <span>{(block as any).highlightCoverUrl ? "Upload Replacement Cover" : "Upload Cover Image"}</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) =>
                                      handleFileUpload(e, (base64) =>
                                        updateBlock(block.id, { highlightCoverUrl: base64 } as any)
                                      )
                                    }
                                  />
                                </label>
                              </div>

                              <div className="grid grid-cols-2 gap-3 pt-1">
                                <div>
                                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#918355] block mb-1">
                                    Badge Text
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="e.g. NEW DROP"
                                    value={(block as any).badgeText || ""}
                                    onChange={(e) => updateBlock(block.id, { badgeText: e.target.value } as any)}
                                    className="w-full text-xs px-3 py-2 rounded-xl border border-[#E5E0D2] bg-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                                  />
                                </div>
                                <div>
                                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#918355] block mb-1">
                                    CTA Button Label
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="e.g. Explore Lookbook"
                                    value={(block as any).callToAction || ""}
                                    onChange={(e) => updateBlock(block.id, { callToAction: e.target.value } as any)}
                                    className="w-full text-xs px-3 py-2 rounded-xl border border-[#E5E0D2] bg-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Standard Link Specific: Thumbnail Upload Only */}
                          {block.type === "standard_link" && (
                            <div className="space-y-3 p-3.5 rounded-xl border border-[#E5E0D2] bg-[#FAF9F5]">
                              <div className="flex items-center justify-between">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-[#918355]">
                                  Thumbnail Image
                                </label>
                                {(block as any).thumbnailUrl && (
                                  <button
                                    type="button"
                                    onClick={() => updateBlock(block.id, { thumbnailUrl: "" } as any)}
                                    className="text-[10px] text-red-500 hover:text-red-700 font-semibold"
                                  >
                                    Remove Thumbnail
                                  </button>
                                )}
                              </div>

                              <div className="flex items-center gap-3">
                                <div className="w-14 h-14 rounded-xl border border-[#E5E0D2] bg-white overflow-hidden shrink-0 flex items-center justify-center shadow-2xs">
                                  {(block as any).thumbnailUrl ? (
                                    <img
                                      src={(block as any).thumbnailUrl}
                                      alt="Thumbnail"
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                                  )}
                                </div>

                                <div className="flex-1">
                                  <label className="cursor-pointer inline-flex items-center gap-2 py-2 px-3.5 rounded-xl border border-dashed border-[#D4AF37] bg-white text-xs font-semibold text-[#1A1C20] hover:bg-amber-50/50 transition-colors shadow-2xs">
                                    <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
                                    <span>{(block as any).thumbnailUrl ? "Upload New Thumbnail" : "Upload Thumbnail"}</span>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={(e) =>
                                        handleFileUpload(e, (base64) =>
                                          updateBlock(block.id, { thumbnailUrl: base64 } as any)
                                        )
                                      }
                                    />
                                  </label>
                                </div>
                              </div>
                            </div>
                          )}



                          {/* Collection Items Editor */}
                          {block.type === "collection" && (
                            <div className="space-y-3 p-3.5 rounded-xl border border-[#E5E0D2] bg-[#FAF9F5]">
                              <div className="flex items-center justify-between">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-[#918355]">
                                  Collection Items ({(block as any).items?.length || 0})
                                </label>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const currentItems = (block as any).items || [];
                                    const newItem = {
                                      id: `item-${Date.now()}`,
                                      title: `New Item ${currentItems.length + 1}`,
                                      url: "https://asoobi.com",
                                      price: "$100",
                                      thumbnailUrl:
                                        "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=300&q=80",
                                    };
                                    updateBlock(block.id, { items: [...currentItems, newItem] } as any);
                                  }}
                                  className="text-[10px] font-bold text-[#D4AF37] hover:underline flex items-center gap-1"
                                >
                                  <Plus className="w-3 h-3" /> Add Item
                                </button>
                              </div>

                              <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                                {((block as any).items || []).map((item: any, itemIndex: number) => (
                                  <div
                                    key={item.id || itemIndex}
                                    className="p-2.5 rounded-xl border border-[#E5E0D2] bg-white space-y-2"
                                  >
                                    <div className="flex items-center gap-2.5">
                                      <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#E5E0D2] bg-gray-50 shrink-0">
                                        <img src={item.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                                      </div>
                                      <div className="flex-1 grid grid-cols-2 gap-2">
                                        <input
                                          type="text"
                                          placeholder="Title"
                                          value={item.title}
                                          onChange={(e) => {
                                            const updated = [...(block as any).items];
                                            updated[itemIndex] = { ...updated[itemIndex], title: e.target.value };
                                            updateBlock(block.id, { items: updated } as any);
                                          }}
                                          className="text-[11px] px-2 py-1 rounded-lg border border-[#E5E0D2]"
                                        />
                                        <input
                                          type="text"
                                          placeholder="Price (e.g. $120)"
                                          value={item.price || ""}
                                          onChange={(e) => {
                                            const updated = [...(block as any).items];
                                            updated[itemIndex] = { ...updated[itemIndex], price: e.target.value };
                                            updateBlock(block.id, { items: updated } as any);
                                          }}
                                          className="text-[11px] px-2 py-1 rounded-lg border border-[#E5E0D2]"
                                        />
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const updated = (block as any).items.filter((_: any, i: number) => i !== itemIndex);
                                          updateBlock(block.id, { items: updated } as any);
                                        }}
                                        className="text-red-400 hover:text-red-600 p-1"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>

                                    <div className="flex items-center justify-between gap-2 pt-1">
                                      <div className="flex items-center gap-2">
                                        {item.thumbnailUrl && (
                                          <div className="w-8 h-8 rounded-lg overflow-hidden border border-[#E5E0D2] shrink-0">
                                            <img src={item.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                                          </div>
                                        )}
                                        <label className="cursor-pointer inline-flex items-center gap-1.5 py-1 px-2.5 rounded-lg border border-dashed border-[#D4AF37] bg-white text-[10px] font-semibold text-[#1A1C20] hover:bg-amber-50/50 shadow-2xs">
                                          <Upload className="w-3 h-3 text-[#D4AF37]" />
                                          <span>{item.thumbnailUrl ? "Change Image" : "Upload Image"}</span>
                                          <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) =>
                                              handleFileUpload(e, (base64) => {
                                                const updated = [...(block as any).items];
                                                updated[itemIndex] = { ...updated[itemIndex], thumbnailUrl: base64 };
                                                updateBlock(block.id, { items: updated } as any);
                                              })
                                            }
                                          />
                                        </label>
                                      </div>
                                      {item.thumbnailUrl && (
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const updated = [...(block as any).items];
                                            updated[itemIndex] = { ...updated[itemIndex], thumbnailUrl: "" };
                                            updateBlock(block.id, { items: updated } as any);
                                          }}
                                          className="text-[10px] text-red-500 hover:text-red-700 font-semibold"
                                        >
                                          Remove
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Discount Code Specific */}
                          {block.type === "discount_code" && (
                            <div className="grid grid-cols-2 gap-3 p-3 rounded-xl border border-[#E5E0D2] bg-[#FAF9F5]">
                              <div>
                                <label className="text-[10px] font-bold uppercase tracking-wider text-[#918355] block mb-1">
                                  Promo Code
                                </label>
                                <input
                                  type="text"
                                  value={(block as any).code || ""}
                                  onChange={(e) => updateBlock(block.id, { code: e.target.value } as any)}
                                  className="w-full text-xs font-mono font-bold px-3 py-2 rounded-xl border border-[#E5E0D2] bg-white focus:outline-none"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] font-bold uppercase tracking-wider text-[#918355] block mb-1">
                                  Discount Value
                                </label>
                                <input
                                  type="text"
                                  placeholder="e.g. 20% OFF"
                                  value={(block as any).discountPercentageOrValue || ""}
                                  onChange={(e) =>
                                    updateBlock(block.id, { discountPercentageOrValue: e.target.value } as any)
                                  }
                                  className="w-full text-xs px-3 py-2 rounded-xl border border-[#E5E0D2] bg-white focus:outline-none"
                                />
                              </div>
                            </div>
                          )}

                          {/* QR Code Specific */}
                          {block.type === "qr_code" && (
                            <div className="space-y-3 p-3 rounded-xl border border-[#E5E0D2] bg-[#FAF9F5]">
                              <div>
                                <label className="text-[10px] font-bold uppercase tracking-wider text-[#918355] block mb-1">
                                  QR Target URL
                                </label>
                                <input
                                  type="url"
                                  value={(block as any).targetUrl || ""}
                                  onChange={(e) => updateBlock(block.id, { targetUrl: e.target.value } as any)}
                                  className="w-full text-xs px-3 py-2 rounded-xl border border-[#E5E0D2] bg-white focus:outline-none"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] font-bold uppercase tracking-wider text-[#918355] block mb-1">
                                  Button / Action Label
                                </label>
                                <input
                                  type="text"
                                  value={(block as any).downloadLabel || ""}
                                  onChange={(e) => updateBlock(block.id, { downloadLabel: e.target.value } as any)}
                                  className="w-full text-xs px-3 py-2 rounded-xl border border-[#E5E0D2] bg-white focus:outline-none"
                                />
                              </div>
                            </div>
                          )}

                          {/* Contact Form Specific */}
                          {block.type === "contact_form" && (
                            <div className="space-y-3 p-3.5 rounded-xl border border-[#E5E0D2] bg-[#FAF9F5]">
                              {/* Quick Template Picker Header */}
                              <div className="flex items-center justify-between pb-2 border-b border-[#E5E0D2]">
                                <div>
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#918355] block">
                                    Form Preset / Template
                                  </span>
                                  <span className="text-xs font-semibold text-[#1A1C20]">
                                    {(block as any).templateName || "Custom Inquiry Form"}
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveTab("templates");
                                    setSelectedCategory("Inquiry & Booking");
                                  }}
                                  className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-[#D4AF37] text-white hover:bg-[#b8962e] transition-colors flex items-center gap-1 shadow-xs"
                                >
                                  <BookOpen className="w-3 h-3" /> Browse Templates
                                </button>
                              </div>

                              <div>
                                <label className="text-[10px] font-bold uppercase tracking-wider text-[#918355] block mb-1">
                                  Recipient Email
                                </label>
                                <input
                                  type="email"
                                  value={(block as any).targetEmail || ""}
                                  onChange={(e) => updateBlock(block.id, { targetEmail: e.target.value } as any)}
                                  className="w-full text-xs px-3 py-2 rounded-xl border border-[#E5E0D2] bg-white focus:outline-none"
                                />
                              </div>

                              <div className="grid grid-cols-3 gap-2 py-1">
                                <label className="flex items-center gap-2 p-2 rounded-lg border border-[#E5E0D2] bg-white cursor-pointer text-xs">
                                  <input
                                    type="checkbox"
                                    checked={(block as any).fields?.collectName ?? true}
                                    onChange={(e) =>
                                      updateBlock(block.id, {
                                        fields: { ...(block as any).fields, collectName: e.target.checked },
                                      } as any)
                                    }
                                    className="w-3.5 h-3.5 accent-[#D4AF37]"
                                  />
                                  <span>Name</span>
                                </label>

                                <label className="flex items-center gap-2 p-2 rounded-lg border border-[#E5E0D2] bg-white cursor-pointer text-xs">
                                  <input
                                    type="checkbox"
                                    checked={(block as any).fields?.collectPhone ?? false}
                                    onChange={(e) =>
                                      updateBlock(block.id, {
                                        fields: { ...(block as any).fields, collectPhone: e.target.checked },
                                      } as any)
                                    }
                                    className="w-3.5 h-3.5 accent-[#D4AF37]"
                                  />
                                  <span>Phone</span>
                                </label>

                                <label className="flex items-center gap-2 p-2 rounded-lg border border-[#E5E0D2] bg-white cursor-pointer text-xs">
                                  <input
                                    type="checkbox"
                                    checked={(block as any).fields?.collectNote ?? true}
                                    onChange={(e) =>
                                      updateBlock(block.id, {
                                        fields: { ...(block as any).fields, collectNote: e.target.checked },
                                      } as any)
                                    }
                                    className="w-3.5 h-3.5 accent-[#D4AF37]"
                                  />
                                  <span>Note / Brief</span>
                                </label>
                              </div>

                              {/* Custom Fields Summary if applied from template */}
                              {(block as any).customFields && (block as any).customFields.length > 0 && (
                                <div className="p-2.5 rounded-lg border border-[#D4AF37]/30 bg-amber-50/40 space-y-1">
                                  <span className="text-[10px] font-bold text-[#918355] uppercase tracking-wider block">
                                    Template Custom Inputs ({(block as any).customFields.length})
                                  </span>
                                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                                    {(block as any).customFields.map((cf: any) => (
                                      <span key={cf.id} className="text-[10px] px-2 py-0.5 rounded bg-white border border-[#E5E0D2] text-[#1A1C20] font-medium">
                                        {cf.label} ({cf.type})
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#918355] block mb-1">
                                    Button Text
                                  </label>
                                  <input
                                    type="text"
                                    value={(block as any).submitButtonText || ""}
                                    onChange={(e) => updateBlock(block.id, { submitButtonText: e.target.value } as any)}
                                    className="w-full text-xs px-3 py-2 rounded-xl border border-[#E5E0D2] bg-white focus:outline-none"
                                  />
                                </div>
                                <div>
                                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#918355] block mb-1">
                                    Success Message
                                  </label>
                                  <input
                                    type="text"
                                    value={(block as any).successMessage || ""}
                                    onChange={(e) => updateBlock(block.id, { successMessage: e.target.value } as any)}
                                    className="w-full text-xs px-3 py-2 rounded-xl border border-[#E5E0D2] bg-white focus:outline-none"
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Access Control Sub-Card */}
                          <div className="p-3.5 rounded-xl bg-[#F9F9F7] border border-[#E5E0D2] flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <Lock className="w-4 h-4 text-[#D4AF37]" />
                              <div>
                                <h4 className="text-xs font-semibold">Password Gate</h4>
                                <p className="text-[10px] text-[#918355]">Require password to unlock link</p>
                              </div>
                            </div>
                            <input
                              type="checkbox"
                              checked={block.accessRules?.isLocked || false}
                              onChange={(e) =>
                                updateBlock(block.id, {
                                  accessRules: {
                                    ...block.accessRules,
                                    isLocked: e.target.checked,
                                    password: e.target.checked ? (block.accessRules.password || "VIP2026") : undefined,
                                  },
                                })
                              }
                              className="w-4 h-4 accent-[#D4AF37] rounded"
                            />
                          </div>

                          {block.accessRules?.isLocked && (
                            <div>
                              <label className="text-[10px] font-bold uppercase tracking-wider text-[#918355] block mb-1">
                                Access Password
                              </label>
                              <input
                                type="text"
                                value={block.accessRules.password || ""}
                                onChange={(e) =>
                                  updateBlock(block.id, {
                                    accessRules: { ...block.accessRules, password: e.target.value },
                                  })
                                }
                                className="w-full text-xs px-3 py-2 rounded-xl border border-[#E5E0D2] bg-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="p-8 max-w-2xl w-full mx-auto space-y-6">
              <div>
                <h2 className="text-xl font-display font-bold">Profile Identity</h2>
                <p className="text-xs text-[#918355] mt-0.5">Customize your name, biography, avatar, and hero cover image.</p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E5E0D2] space-y-4">
                {/* Avatar upload */}
                <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E5E0D2] space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#918355] block">
                      Profile Avatar
                    </label>
                    {profile.meta.avatarUrl && (
                      <button
                        type="button"
                        onClick={() => setProfile((p) => ({ ...p, meta: { ...p.meta, avatarUrl: "" } }))}
                        className="text-[10px] text-red-500 hover:text-red-700 font-semibold"
                      >
                        Remove Avatar
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 overflow-hidden border-2 border-[#D4AF37] bg-white shrink-0 transition-all ${
                      profile.meta.avatarShape === "circle" ? "rounded-full" : profile.meta.avatarShape === "rounded" ? "rounded-xl" : "rounded-2xl"
                    }`}>
                      {profile.meta.avatarUrl ? (
                        <img src={profile.meta.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-neutral-300">
                          <User className="w-8 h-8" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <label className="cursor-pointer inline-flex items-center gap-2 py-2 px-3.5 rounded-xl border border-dashed border-[#D4AF37] bg-white text-xs font-semibold text-[#1A1C20] hover:bg-amber-50/50 shadow-2xs">
                        <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>{profile.meta.avatarUrl ? "Upload New Avatar" : "Upload Avatar"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleFileUpload(e, (base64) =>
                              setProfile((p) => ({ ...p, meta: { ...p.meta, avatarUrl: base64 } }))
                            )
                          }
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Hero Cover upload */}
                <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E5E0D2] space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#918355] block">
                      Hero Cover Banner
                    </label>
                    {profile.meta.heroCoverUrl && (
                      <button
                        type="button"
                        onClick={() => setProfile((p) => ({ ...p, meta: { ...p.meta, heroCoverUrl: "" } }))}
                        className="text-[10px] text-red-500 hover:text-red-700 font-semibold"
                      >
                        Remove Banner
                      </button>
                    )}
                  </div>
                  {profile.meta.heroCoverUrl && (
                    <div className="w-full h-28 rounded-xl overflow-hidden border border-[#E5E0D2] bg-gray-50">
                      <img src={profile.meta.heroCoverUrl} alt="Cover" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div>
                    <label className="cursor-pointer inline-flex items-center gap-2 py-2 px-3.5 rounded-xl border border-dashed border-[#D4AF37] bg-white text-xs font-semibold text-[#1A1C20] hover:bg-amber-50/50 shadow-2xs">
                      <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{profile.meta.heroCoverUrl ? "Upload New Cover Image" : "Upload Cover Image"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleFileUpload(e, (base64) =>
                            setProfile((p) => ({ ...p, meta: { ...p.meta, heroCoverUrl: base64 } }))
                          )
                        }
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#918355] block mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={profile.meta.title}
                    onChange={(e) => setProfile((p) => ({ ...p, meta: { ...p.meta, title: e.target.value } }))}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-[#E5E0D2] bg-[#F9F9F7] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#918355] block mb-1">
                    Creator Handle
                  </label>
                  <div className="flex items-center">
                    <span className="px-3 py-2 bg-[#F9F9F7] border border-r-0 border-[#E5E0D2] rounded-l-xl text-xs text-[#918355]">
                      asoobi.com/
                    </span>
                    <input
                      type="text"
                      value={profile.handle}
                      onChange={(e) => setProfile((p) => ({ ...p, handle: e.target.value }))}
                      className="flex-1 text-xs px-3 py-2 rounded-r-xl border border-[#E5E0D2] bg-[#F9F9F7] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#918355] block mb-1">
                    Bio / Introduction
                  </label>
                  <textarea
                    rows={3}
                    value={profile.meta.bio}
                    onChange={(e) => setProfile((p) => ({ ...p, meta: { ...p.meta, bio: e.target.value } }))}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-[#E5E0D2] bg-[#F9F9F7] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#918355] block mb-1">
                      Avatar Shape
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsAvatarShapeDropdownOpen((prev) => !prev)}
                        className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#E5E0D2] bg-[#F9F9F7] hover:bg-white hover:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] flex items-center justify-between transition-all"
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-3.5 h-3.5 border-2 border-[#D4AF37] bg-white inline-block ${
                            profile.meta.avatarShape === "circle" 
                              ? "rounded-full" 
                              : profile.meta.avatarShape === "rounded" 
                              ? "rounded-xs" 
                              : "rounded-md"
                          }`} />
                          <span className="font-semibold text-[#1A1C20]">
                            {profile.meta.avatarShape === "circle"
                              ? "Circle"
                              : profile.meta.avatarShape === "rounded"
                              ? "Rounded Square"
                              : "Squircle"}
                          </span>
                        </div>
                        <ChevronDown className={`w-3.5 h-3.5 text-[#918355] transition-transform duration-200 ${isAvatarShapeDropdownOpen ? "rotate-180" : ""}`} />
                      </button>

                      {isAvatarShapeDropdownOpen && (
                        <>
                          <div 
                            className="fixed inset-0 z-40" 
                            onClick={() => setIsAvatarShapeDropdownOpen(false)} 
                          />
                          <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-[#E5E0D2] rounded-xl shadow-xl z-50 p-1.5 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                            {[
                              { id: "circle", label: "Circle", shapeClass: "rounded-full" },
                              { id: "rounded", label: "Rounded Square", shapeClass: "rounded-xs" },
                              { id: "squircle", label: "Squircle", shapeClass: "rounded-md" },
                            ].map((opt) => {
                              const isSelected = profile.meta.avatarShape === opt.id;
                              return (
                                <button
                                  key={opt.id}
                                  type="button"
                                  onClick={() => {
                                    setProfile((p) => ({ ...p, meta: { ...p.meta, avatarShape: opt.id as any } }));
                                    setIsAvatarShapeDropdownOpen(false);
                                  }}
                                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all ${
                                    isSelected 
                                      ? "bg-[#FAF8F2] text-[#1A1C20] font-bold border border-[#D4AF37]/50 shadow-2xs" 
                                      : "text-[#1A1C20] hover:bg-[#F9F9F7]"
                                  }`}
                                >
                                  <div className="flex items-center gap-2.5">
                                    <span className={`w-3.5 h-3.5 border-2 ${isSelected ? "border-[#D4AF37] bg-[#D4AF37]/20" : "border-neutral-400"} ${opt.shapeClass}`} />
                                    <span>{opt.label}</span>
                                  </div>
                                  {isSelected && <Check className="w-3.5 h-3.5 text-[#D4AF37]" />}
                                </button>
                              );
                            })}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#918355] block mb-1">
                      Location Tag
                    </label>
                    <input
                      type="text"
                      value={profile.meta.location || ""}
                      onChange={(e) => setProfile((p) => ({ ...p, meta: { ...p.meta, location: e.target.value } }))}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-[#E5E0D2] bg-[#F9F9F7] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "templates" && (
            <div className="p-8 max-w-3xl w-full mx-auto space-y-6">
              {copiedTemplateAlert && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold rounded-xl shadow-sm flex items-center gap-2 animate-in fade-in duration-200">
                  <FileCheck className="w-4 h-4 text-emerald-600" />
                  <span>{copiedTemplateAlert}</span>
                </div>
              )}

              {/* Header & Target Block Indicator */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-xl font-display font-bold text-[#1A1C20]">Interactive Block Templates</h2>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#D4AF37] text-white font-bold">
                      {REAL_BLOCK_TEMPLATES.length} Templates
                    </span>
                  </div>
                  <p className="text-xs text-[#918355] mt-1 max-w-xl">
                    Discover interactive creator block templates used on Instagram, X, LinkedIn, YouTube, Spotify, and TikTok. Test interactions, add as a new block, or apply directly to your active content block.
                  </p>
                </div>

                {selectedBlock && (
                  <div className="bg-amber-50/70 border border-amber-200/80 p-3 rounded-2xl shrink-0 space-y-1 sm:max-w-xs shadow-xs">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] text-amber-800 font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
                        Active Content Block
                      </span>
                      <button
                        onClick={() => setSelectedBlockId(null)}
                        className="text-[10px] text-amber-700 underline hover:text-black font-semibold"
                        title="Clear active block selection"
                      >
                        Deselect
                      </button>
                    </div>
                    <p className="text-xs font-bold text-[#1A1C20] truncate">
                      {selectedBlock.title || "Untitled Block"}
                    </p>
                    <span className="text-[9px] uppercase tracking-wider text-[#918355] block">
                      Type: {selectedBlock.type.replace("_", " ")}
                    </span>
                  </div>
                )}
              </div>

              {/* Combined Search & Category Filters */}
              <div className="space-y-3 bg-white p-4 rounded-2xl border border-[#E5E0D2] shadow-xs">
                <div className="relative">
                  <Search className="w-4 h-4 text-[#918355] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search templates (e.g., Instagram, X Thread, Spotify, 25% Off, Advisory, Merch, Sponsor)..."
                    value={templateSearch}
                    onChange={(e) => setTemplateSearch(e.target.value)}
                    className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-[#E5E0D2] bg-[#F9F9F7] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                  />
                  {templateSearch && (
                    <button
                      onClick={() => setTemplateSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-black"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[
                    "All",
                    "Profile Cards",
                    "Premium Posts & Content",
                    "Shop & Affiliates",
                    "Inquiry & Booking",
                    "VIP & Community"
                  ].map((cat) => {
                    const isActive = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`text-[11px] font-semibold px-3 py-1.5 rounded-xl border transition-all ${
                          isActive
                            ? "bg-[#D4AF37] border-[#D4AF37] text-white shadow-xs"
                            : "bg-[#F9F9F7] border-[#E5E0D2] text-[#1A1C20] hover:border-[#D4AF37]/50"
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Template Catalog Grid */}
              {(() => {
                const filtered = REAL_BLOCK_TEMPLATES.filter((tmpl) => {
                  const matchCategory = selectedCategory === "All" || tmpl.category === selectedCategory;
                  const query = templateSearch.toLowerCase().trim();
                  const matchQuery =
                    !query ||
                    tmpl.name.toLowerCase().includes(query) ||
                    tmpl.platform.toLowerCase().includes(query) ||
                    tmpl.description.toLowerCase().includes(query) ||
                    tmpl.block.title.toLowerCase().includes(query) ||
                    (tmpl.block.subtitle && tmpl.block.subtitle.toLowerCase().includes(query)) ||
                    (tmpl.tags && tmpl.tags.some((t) => t.toLowerCase().includes(query)));
                  return matchCategory && matchQuery;
                });

                return (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#918355] font-medium px-1">
                      <span>Showing {filtered.length} interactive block templates</span>
                      <span className="text-[11px] text-amber-900 bg-amber-100/60 px-2.5 py-0.5 rounded-md font-semibold">
                        {selectedBlock ? `Ready to apply to: ${selectedBlock.title || 'Selected Block'}` : "Click to test or add to your page"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[620px] overflow-y-auto pr-1">
                      {filtered.map((tmpl) => {
                        const isExpanded = expandedPreviewId === tmpl.id;
                        const blockType = tmpl.block.type;

                        return (
                          <div
                            key={tmpl.id}
                            className="p-4.5 rounded-2xl border border-[#E5E0D2] bg-white hover:border-[#D4AF37] hover:shadow-md transition-all flex flex-col justify-between group space-y-3.5"
                          >
                            <div className="space-y-3">
                              {/* Card Header: Platform Icon + Name & Block Type */}
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <PlatformOfficialBadge platform={tmpl.platform || tmpl.badge} size="md" shape="circle" />
                                  <span className="text-xs font-bold text-[#1A1C20] tracking-tight">{tmpl.platform}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  {tmpl.stats && (
                                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-amber-900">
                                      {tmpl.stats}
                                    </span>
                                  )}
                                  <span className="text-[9px] font-bold text-[#918355] uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#F9F9F7] border border-[#E5E0D2]">
                                    {tmpl.block.type.replace("_", " ")}
                                  </span>
                                </div>
                              </div>

                              {/* Title & Description */}
                              <div>
                                <h3 className="text-xs font-bold text-[#1A1C20] group-hover:text-[#D4AF37] transition-colors">
                                  {tmpl.name}
                                </h3>
                                <p className="text-[11px] text-[#918355] mt-1 leading-relaxed">
                                  {tmpl.description}
                                </p>
                              </div>

                              {/* Interactive Live Preview Box */}
                              <div className="p-3 rounded-xl border border-[#E5E0D2] bg-[#FAF9F5] space-y-2">
                                {/* Discount Code Interactive Widget */}
                                {blockType === "discount_code" && (
                                  <div className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                      <span className="text-[10px] font-bold text-[#1A1C20]">
                                        {(tmpl.block as any).brandName || "Exclusive Offer"}
                                      </span>
                                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                                        {(tmpl.block as any).discountPercentageOrValue}
                                      </span>
                                    </div>
                                    <div className="flex items-center justify-between p-1.5 rounded-lg bg-white border border-dashed border-[#D4AF37]">
                                      <span className="font-mono text-xs font-bold text-[#1A1C20] pl-1.5">
                                        {(tmpl.block as any).code}
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          navigator.clipboard?.writeText((tmpl.block as any).code || "");
                                          setCopiedPromoCode((tmpl.block as any).code);
                                          setTimeout(() => setCopiedPromoCode(null), 2000);
                                        }}
                                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-50 hover:bg-amber-100 text-amber-900 text-[10px] font-bold transition-all shadow-2xs"
                                        title="Click to test copying code"
                                      >
                                        {copiedPromoCode === (tmpl.block as any).code ? (
                                          <>
                                            <Check className="w-3 h-3 text-emerald-600" />
                                            <span className="text-emerald-700">Copied!</span>
                                          </>
                                        ) : (
                                          <>
                                            <Copy className="w-3 h-3" />
                                            <span>Copy Code</span>
                                          </>
                                        )}
                                      </button>
                                    </div>
                                  </div>
                                )}

                                {/* Featured Link with Cover & CTA */}
                                {blockType === "featured_link" && (
                                  <div className="space-y-1.5">
                                    {(tmpl.block as any).highlightCoverUrl && (
                                      <div className="h-20 w-full rounded-lg overflow-hidden relative border border-[#E5E0D2]">
                                        <img
                                          src={(tmpl.block as any).highlightCoverUrl}
                                          alt=""
                                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        {(tmpl.block as any).badgeText && (
                                          <span className="absolute top-1.5 left-1.5 text-[8px] font-bold uppercase tracking-wider bg-black/80 text-white px-2 py-0.5 rounded backdrop-blur-xs">
                                            {(tmpl.block as any).badgeText}
                                          </span>
                                        )}
                                      </div>
                                    )}
                                    <div className="text-[11px] font-semibold text-[#1A1C20] truncate">
                                      {tmpl.block.title}
                                    </div>
                                    <div className="flex items-center justify-between text-[10px] text-[#918355]">
                                      <span className="truncate max-w-[160px]">{tmpl.block.subtitle}</span>
                                      <span className="text-[#D4AF37] font-bold flex items-center gap-1 shrink-0">
                                        {(tmpl.block as any).callToAction || "Explore"}
                                        <ArrowRight className="w-3 h-3" />
                                      </span>
                                    </div>
                                  </div>
                                )}

                                {/* Collection / Shop Grid Preview */}
                                {blockType === "collection" && (
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between text-[10px] font-bold text-[#1A1C20]">
                                      <span>{tmpl.block.title}</span>
                                      <span className="text-[9px] text-[#918355] font-normal">
                                        {((tmpl.block as any).items?.length || 0)} Items
                                      </span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-1.5">
                                      {((tmpl.block as any).items || []).slice(0, 3).map((item: any) => (
                                        <div key={item.id} className="bg-white rounded-lg p-1 border border-[#E5E0D2] text-center space-y-0.5">
                                          {item.thumbnailUrl && (
                                            <img src={item.thumbnailUrl} alt="" className="w-full h-12 object-cover rounded" />
                                          )}
                                          <div className="text-[9px] font-bold text-[#1A1C20] truncate">{item.title}</div>
                                          <div className="text-[9px] font-bold text-[#D4AF37]">{item.price}</div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* QR Code Preview */}
                                {blockType === "qr_code" && (
                                  <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-lg bg-white border border-[#E5E0D2] flex items-center justify-center shrink-0 shadow-2xs">
                                      <QrCode className="w-7 h-7 text-[#D4AF37]" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="text-[11px] font-bold text-[#1A1C20] truncate">{tmpl.block.title}</div>
                                      <div className="text-[10px] text-[#918355] truncate">{(tmpl.block as any).downloadLabel || "Instant Scan"}</div>
                                    </div>
                                  </div>
                                )}

                                {/* Contact Form Field Inspector */}
                                {blockType === "contact_form" && (
                                  <div className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                      <span className="text-[10px] font-bold text-[#1A1C20] truncate">
                                        {tmpl.block.title}
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() => setExpandedPreviewId(isExpanded ? null : tmpl.id)}
                                        className="text-[9px] text-[#D4AF37] hover:underline font-bold"
                                      >
                                        {isExpanded ? "Hide Fields" : "Inspect Fields"}
                                      </button>
                                    </div>
                                    <p className="text-[10px] text-[#918355] truncate">
                                      {tmpl.block.subtitle}
                                    </p>
                                    <div className="flex flex-wrap gap-1 pt-1">
                                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-white border border-[#E5E0D2] text-[#1A1C20]">
                                        + Email
                                      </span>
                                      {(tmpl.block as any).fields?.collectName && (
                                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-white border border-[#E5E0D2] text-[#1A1C20]">
                                          + Name
                                        </span>
                                      )}
                                      {((tmpl.block as any).customFields || []).slice(0, 2).map((cf: any) => (
                                        <span key={cf.id} className="text-[9px] px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-900 font-medium">
                                          + {cf.label}
                                        </span>
                                      ))}
                                    </div>

                                    {/* Expanded fields preview */}
                                    {isExpanded && (tmpl.block as any).customFields && (
                                      <div className="mt-2 pt-2 border-t border-[#E5E0D2] space-y-1.5 animate-in fade-in">
                                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#918355] block">
                                          Form Input Fields & Dropdowns:
                                        </span>
                                        {((tmpl.block as any).customFields || []).map((cf: any) => (
                                          <div key={cf.id} className="text-[10px] flex items-center justify-between p-1 bg-white rounded border border-[#E5E0D2]">
                                            <span className="font-semibold text-[#1A1C20]">{cf.label}</span>
                                            <span className="text-[9px] text-gray-500 uppercase">{cf.type}</span>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                )}

                                {/* Social Icons Row */}
                                {blockType === "social_icons" && (
                                  <div className="space-y-1.5">
                                    <span className="text-[10px] font-bold text-[#1A1C20] block">
                                      {tmpl.block.title || "Social Links Bar"}
                                    </span>
                                    <div className="flex flex-wrap gap-1.5">
                                      {((tmpl.block as any).platformLinks || []).map((pl: any) => (
                                        <span key={pl.platform} className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-lg bg-white border border-[#E5E0D2] shadow-2xs text-[#1A1C20]">
                                          {getPlatformBadgeIcon(pl.platform, "w-3 h-3 shrink-0")}
                                          <span className="capitalize">{pl.platform}</span>
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Password Locked Standard Link */}
                                {blockType === "standard_link" && (
                                  <div className="space-y-1">
                                    <div className="flex items-center justify-between">
                                      <span className="text-[10px] font-bold text-[#1A1C20] truncate">
                                        {tmpl.block.title}
                                      </span>
                                      {tmpl.block.accessRules?.isLocked && (
                                        <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-900 flex items-center gap-1">
                                          <Lock className="w-2.5 h-2.5" />
                                          Pass: {tmpl.block.accessRules.password}
                                        </span>
                                      )}
                                    </div>
                                    {tmpl.block.subtitle && (
                                      <p className="text-[10px] text-[#918355] truncate">
                                        {tmpl.block.subtitle}
                                      </p>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Actions Row: Dual Buttons */}
                            <div className="pt-2.5 border-t border-gray-100 flex items-center gap-2">
                              {selectedBlock ? (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => applyTemplateToSelectedBlock(tmpl)}
                                    className="flex-1 py-2 px-3 rounded-xl bg-[#D4AF37] hover:bg-[#b8962e] text-[#1A1C20] text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
                                    title={`Apply this template to your active block "${selectedBlock.title || 'Selected Block'}"`}
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                    <span>Apply to Active Block</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => addBlockTemplate(tmpl)}
                                    className="p-2 rounded-xl border border-[#E5E0D2] bg-[#F9F9F7] hover:bg-white text-[#1A1C20] transition-colors"
                                    title="Add as a new standalone block"
                                  >
                                    <Plus className="w-4 h-4" />
                                  </button>
                                </>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => addBlockTemplate(tmpl)}
                                  className="w-full py-2 px-3 rounded-xl bg-[#1A1C20] hover:bg-black text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                  <span>Add to Content Blocks</span>
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {activeTab === "appearance" && (
            <ThemeAndStylingPanel
              profile={profile}
              setProfile={setProfile}
              activeSubTab={appearanceSubTab}
              onSubTabChange={setAppearanceSubTab}
              selectedBlockTitle={selectedBlock?.title}
              onDeselectBlock={() => setSelectedBlockId(null)}
            />
          )}

          {activeTab === "analytics" && (
            <div className="p-8 max-w-2xl w-full mx-auto space-y-6">
              <div>
                <h2 className="text-xl font-display font-bold">Profile Performance</h2>
                <p className="text-xs text-[#918355] mt-0.5">Real-time engagement telemetry & link clicks.</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-[#E5E0D2] shadow-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#918355]">Total Views</span>
                  <div className="text-2xl font-bold font-display mt-1 text-[#1A1C20]">14,820</div>
                  <span className="text-[10px] text-emerald-600 font-bold mt-1 block">↑ 18.4% vs last week</span>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#E5E0D2] shadow-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#918355]">Link Clicks</span>
                  <div className="text-2xl font-bold font-display mt-1 text-[#D4AF37]">4,192</div>
                  <span className="text-[10px] text-emerald-600 font-bold mt-1 block">↑ 12.1% vs last week</span>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#E5E0D2] shadow-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#918355]">Average CTR</span>
                  <div className="text-2xl font-bold font-display mt-1 text-[#1A1C20]">28.3%</div>
                  <span className="text-[10px] text-emerald-600 font-bold mt-1 block">↑ 2.4% vs last week</span>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Column 3: Right-Side Real-Time Simulation Shell */}
        <aside className="flex-1 bg-[#ECEAE3] flex flex-col items-center justify-start lg:justify-center p-6 shrink-0 relative overflow-y-auto">
          <div className="text-[11px] font-bold tracking-widest uppercase text-[#918355] mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <span>Preview</span>
            <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-white/80 border border-[#E5E0D2] text-[#1A1C20] shadow-xs">
              {previewDevice === "mobile" 
                ? "Phone" 
                : previewDevice === "tablet" 
                ? "Tab" 
                : "Laptop"}
            </span>
          </div>

          {/* Real Device Frame Showcase */}
          {previewDevice === "mobile" && (
            <div 
              className="transition-all duration-300 shadow-2xl rounded-[52px] border-[10px] border-[#1A1C20] overflow-hidden relative flex flex-col w-[390px] h-[844px] max-h-[calc(100vh-140px)] aspect-[1170/2532] ring-1 ring-black/10 shrink-0"
              style={{ backgroundColor: profile.theme.palette.background }}
            >
              {/* iPhone 16e Dynamic Island */}
              <div className="w-28 h-6 bg-[#1A1C20] rounded-full absolute top-2.5 left-1/2 -translate-x-1/2 z-30 flex items-center justify-end px-3 border border-neutral-700/50">
                <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-neutral-700" />
              </div>

              {/* Status Bar Fake Header */}
              <div 
                className="h-10 w-full flex items-center justify-between px-7 pt-1 text-[11px] font-semibold select-none z-20 shrink-0 transition-colors duration-300"
                style={{ 
                  backgroundColor: profile.theme.palette.background,
                  color: profile.theme.palette.primaryText,
                }}
              >
                <span>9:41</span>
                <div className="flex items-center gap-1.5 opacity-80">
                  <span className="text-[10px]">5G</span>
                  <div className="w-5 h-2.5 border border-current rounded-sm p-0.5 flex">
                    <div className="h-full w-3/4 bg-current rounded-2xs" />
                  </div>
                </div>
              </div>

              {/* Viewport Scroll Canvas */}
              <div className="flex-1 w-full overflow-y-auto">
                <UnifiedProfileRenderer profile={profile} isInteractive={true} />
              </div>

              {/* Home Indicator Bar */}
              <div 
                className="w-full py-2 flex items-center justify-center shrink-0 transition-colors duration-300"
                style={{ backgroundColor: profile.theme.palette.background }}
              >
                <div 
                  className="w-32 h-1 rounded-full transition-colors duration-300 opacity-40" 
                  style={{ backgroundColor: profile.theme.palette.primaryText }}
                />
              </div>
            </div>
          )}

          {previewDevice === "tablet" && (
            <div 
              className="transition-all duration-300 shadow-2xl rounded-[34px] border-[12px] border-[#1A1C20] overflow-hidden relative flex flex-col w-[620px] h-[465px] max-h-[calc(100vh-140px)] aspect-[4/3] ring-1 ring-black/10 shrink-0"
              style={{ backgroundColor: profile.theme.palette.background }}
            >
              {/* iPad Pro 13" Camera Sensor */}
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-800 absolute top-2 left-1/2 -translate-x-1/2 z-30 border border-neutral-700" />

              {/* Tablet Viewport Canvas */}
              <div className="flex-1 w-full overflow-y-auto">
                <UnifiedProfileRenderer profile={profile} isInteractive={true} />
              </div>

              {/* Home Bar */}
              <div 
                className="w-full py-2 flex items-center justify-center shrink-0 transition-colors duration-300"
                style={{ backgroundColor: profile.theme.palette.background }}
              >
                <div 
                  className="w-44 h-1 rounded-full transition-colors duration-300 opacity-40" 
                  style={{ backgroundColor: profile.theme.palette.primaryText }}
                />
              </div>
            </div>
          )}

          {previewDevice === "desktop" && (
            <div className="transition-all duration-300 shadow-2xl flex flex-col items-center shrink-0">
              {/* MacBook Pro 16" Lid / Screen (3456 × 2234, ~1.55:1) */}
              <div 
                className="w-[680px] h-[440px] max-h-[calc(100vh-160px)] aspect-[3456/2234] rounded-t-2xl border-[10px] border-b-0 border-[#1F2124] relative flex flex-col shadow-xl overflow-hidden ring-1 ring-black/10 transition-colors duration-300"
                style={{ backgroundColor: profile.theme.palette.background }}
              >
                {/* MacBook Pro Camera Notch */}
                <div className="w-24 h-3.5 bg-[#1F2124] rounded-b-md absolute top-0 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-700 border border-neutral-600" />
                </div>

                {/* Browser Tab Bar */}
                <div className="h-7 bg-[#E5E0D2]/60 border-b border-[#E5E0D2] flex items-center px-3 gap-2 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="flex-1 max-w-xs mx-auto bg-white/80 rounded-md px-3 py-0.5 text-[10px] text-[#918355] truncate text-center border border-[#E5E0D2]">
                    asoobi.com/{profile.handle}
                  </div>
                </div>

                {/* Laptop Content Canvas */}
                <div className="flex-1 w-full overflow-y-auto">
                  <UnifiedProfileRenderer profile={profile} isInteractive={true} />
                </div>
              </div>

              {/* Laptop Base & Trackpad Lip */}
              <div className="w-[760px] h-3.5 bg-[#C8C5BC] rounded-b-xl relative shadow-md flex items-start justify-center border-t border-[#AFA99E]">
                <div className="w-24 h-1.5 bg-[#9E978C] rounded-b-md" />
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Full Screen Live Preview / Publish Modal */}
      {isPublishedPreviewOpen && (
        <div className="fixed inset-0 z-50 bg-[#0C0D0E] flex flex-col text-white animate-in fade-in duration-200">
          {/* Top Bar Navigation */}
          <header className="h-16 px-6 bg-[#14161A]/95 backdrop-blur-md border-b border-white/10 flex items-center justify-between shrink-0 shadow-lg">
            {/* Left: Published Status Indicator */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-white tracking-tight">Live Profile Preview</h2>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Published & Live
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 font-mono">
                  https://asoobi.bio/{profile.handle || "profile"}
                </p>
              </div>
            </div>

            {/* Center: Device Switcher */}
            {/* Center: Device Switcher (Mobile, Tab, Full Screen) */}
            <div className="flex items-center bg-black/50 p-1 rounded-xl border border-white/10">
              <button
                type="button"
                onClick={() => setFullScreenPreviewDevice("mobile")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  fullScreenPreviewDevice === "mobile" 
                    ? "bg-[#D4AF37] text-black shadow-sm font-bold" 
                    : "text-neutral-400 hover:text-white"
                }`}
                title="Phone"
              >
                <Smartphone className="w-3.5 h-3.5" />
                Phone
              </button>
              <button
                type="button"
                onClick={() => setFullScreenPreviewDevice("tablet")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  fullScreenPreviewDevice === "tablet" 
                    ? "bg-[#D4AF37] text-black shadow-sm font-bold" 
                    : "text-neutral-400 hover:text-white"
                }`}
                title="Tab"
              >
                <Tablet className="w-3.5 h-3.5" />
                Tab
              </button>
              <button
                type="button"
                onClick={() => setFullScreenPreviewDevice("desktop")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  fullScreenPreviewDevice === "desktop" 
                    ? "bg-[#D4AF37] text-black shadow-sm font-bold" 
                    : "text-neutral-400 hover:text-white"
                }`}
                title="Laptop"
              >
                <Monitor className="w-3.5 h-3.5" />
                Laptop
              </button>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(`https://asoobi.bio/${profile.handle || "profile"}`);
                  setCopiedPublishUrl(true);
                  setTimeout(() => setCopiedPublishUrl(false), 2500);
                }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all active:scale-95"
              >
                {copiedPublishUrl ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Live Link</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsPublishedPreviewOpen(false)}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-[#D4AF37] hover:bg-[#b8962e] text-[#1A1C20] transition-all shadow-md active:scale-95"
              >
                <XIcon className="w-4 h-4" />
                <span>Exit Preview</span>
                <kbd className="text-[9px] bg-black/20 text-[#1A1C20] px-1 py-0.5 rounded ml-1 font-mono">Esc</kbd>
              </button>
            </div>
          </header>

          {/* Preview Canvas Area */}
          <div 
            className={`flex-1 overflow-y-auto ${
              fullScreenPreviewDevice === "desktop" 
                ? "w-full h-full" 
                : "flex items-center justify-center p-4 md:p-8 bg-gradient-to-b from-[#0C0D0E] via-[#14161A] to-[#0C0D0E]"
            }`}
            style={fullScreenPreviewDevice === "desktop" ? { backgroundColor: profile.theme.palette.background } : undefined}
          >
            {fullScreenPreviewDevice === "mobile" && (
              <div 
                className="w-[390px] max-w-full h-[844px] max-h-[90vh] aspect-[1170/2532] rounded-[48px] border-[10px] border-[#22252A] shadow-2xl overflow-hidden relative flex flex-col ring-1 ring-white/10"
                style={{ backgroundColor: profile.theme.palette.background }}
              >
                {/* Dynamic Island Notch */}
                <div className="h-7 w-full flex items-center justify-center absolute top-2 left-0 z-30 pointer-events-none">
                  <div className="w-28 h-4.5 bg-black rounded-full flex items-center justify-between px-2">
                    <div className="w-2 h-2 rounded-full bg-neutral-900 border border-neutral-700" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 animate-pulse" />
                  </div>
                </div>

                <div className="flex-1 w-full overflow-y-auto pt-6">
                  <UnifiedProfileRenderer profile={profile} isInteractive={true} />
                </div>

                {/* Home Bar */}
                <div 
                  className="w-full py-2 flex items-center justify-center shrink-0 transition-colors duration-300"
                  style={{ backgroundColor: profile.theme.palette.background }}
                >
                  <div 
                    className="w-36 h-1 rounded-full transition-colors duration-300 opacity-40" 
                    style={{ backgroundColor: profile.theme.palette.primaryText }}
                  />
                </div>
              </div>
            )}

            {fullScreenPreviewDevice === "tablet" && (
              <div 
                className="w-[800px] max-w-full h-[600px] max-h-[90vh] aspect-[4/3] rounded-[36px] border-[12px] border-[#22252A] shadow-2xl overflow-hidden relative flex flex-col ring-1 ring-white/10"
                style={{ backgroundColor: profile.theme.palette.background }}
              >
                {/* iPad Pro 13" Camera Sensor */}
                <div className="h-6 w-full flex items-center justify-center absolute top-2 left-0 z-30 pointer-events-none">
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-800 border border-neutral-700" />
                </div>

                <div className="flex-1 w-full overflow-y-auto pt-8">
                  <div className="max-w-xl mx-auto">
                    <UnifiedProfileRenderer profile={profile} isInteractive={true} />
                  </div>
                </div>

                {/* Tablet Home Bar */}
                <div 
                  className="w-full py-2 flex items-center justify-center shrink-0 transition-colors duration-300"
                  style={{ backgroundColor: profile.theme.palette.background }}
                >
                  <div 
                    className="w-48 h-1 rounded-full transition-colors duration-300 opacity-40" 
                    style={{ backgroundColor: profile.theme.palette.primaryText }}
                  />
                </div>
              </div>
            )}

            {fullScreenPreviewDevice === "desktop" && (
              <div 
                className="w-full min-h-full flex flex-col items-center justify-start py-10 px-4"
                style={{ backgroundColor: profile.theme.palette.background }}
              >
                <div className="w-full max-w-2xl">
                  <UnifiedProfileRenderer profile={profile} isInteractive={true} />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
