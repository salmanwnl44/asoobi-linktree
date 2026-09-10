"use client";

import React, { useState, useEffect } from "react";
import { AsoobiProfileDocument, ProfileBlock } from "@/types/builder";
import { 
  CheckCircle2, 
  ExternalLink, 
  Lock, 
  Copy, 
  Check, 
  Send, 
  QrCode, 
  Sparkles,
  Mail,
  Share2,
  Globe,
  ChevronDown,
  ChevronUp,
  Clock,
  Phone,
  ShieldCheck,
  KeyRound
} from "lucide-react";
import { 
  PlatformOfficialBadge,
  InstagramIcon, 
  XTwitterIcon, 
  LinkedInIcon, 
  YouTubeIcon, 
  TikTokIcon, 
  SpotifyIcon,
  GitHubIcon,
  ThreadsIcon,
  DiscordIcon,
  TelegramIcon,
  WhatsAppIcon,
  BlueVerifiedBadge
} from "@/components/icons/PlatformIcons";
import { getCardWrapperClasses, getCardWrapperStyle } from "@/lib/cardDesigns";
import { BackgroundPatternRenderer } from "@/components/preview/BackgroundPatternRenderer";
import { getHeadingFontCss, getBodyFontCss, getProfileButtonStyles } from "@/lib/themeUtils";

interface UnifiedProfileRendererProps {
  profile: AsoobiProfileDocument;
  isInteractive?: boolean;
}

export const UnifiedProfileRenderer: React.FC<UnifiedProfileRendererProps> = ({
  profile,
  isInteractive = true,
}) => {
  const { meta, theme, blocks, cardDesign } = profile;
  const cardClasses = getCardWrapperClasses(cardDesign);
  const cardStyles = getCardWrapperStyle(cardDesign, theme.palette);
  const [unlockedBlocks, setUnlockedBlocks] = useState<Record<string, boolean>>({});
  const [passwordInputs, setPasswordInputs] = useState<Record<string, string>>({});
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState<Record<string, boolean>>({});
  const [selectedAmounts, setSelectedAmounts] = useState<Record<string, number>>({});
  const [expandedCollections, setExpandedCollections] = useState<Record<string, boolean>>({
    "block-3": true,
  });
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [isProfileUnlocked, setIsProfileUnlocked] = useState(false);
  const [profilePassInput, setProfilePassInput] = useState("");
  const [profilePassError, setProfilePassError] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const headingFontCss = getHeadingFontCss(theme.typography.headingFont);
  const bodyFontCss = getBodyFontCss(theme.typography.bodyFont);
  const headingLetterSpacing =
    theme.typography.headingLetterSpacing === "widest"
      ? "0.12em"
      : theme.typography.headingLetterSpacing === "wide"
      ? "0.05em"
      : theme.typography.headingLetterSpacing === "tight"
      ? "-0.025em"
      : "normal";
  const headingTextTransform = (theme.typography.headingTransform || "none") as React.CSSProperties["textTransform"];
  const defaultBtnStyle = getProfileButtonStyles(theme);

  const handleCopyDiscount = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleUnlock = (blockId: string, correctPassword?: string) => {
    const input = passwordInputs[blockId] || "";
    if (input === correctPassword) {
      setUnlockedBlocks((prev) => ({ ...prev, [blockId]: true }));
      setPasswordErrors((prev) => ({ ...prev, [blockId]: "" }));
    } else {
      setPasswordErrors((prev) => ({ ...prev, [blockId]: "Incorrect password" }));
    }
  };

  const formatRemainingTime = (isoExpiry?: string) => {
    if (!isoExpiry) return "";
    const diff = new Date(isoExpiry).getTime() - currentTime;
    if (diff <= 0) return "Expired";
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);
    if (hours > 48) {
      const days = Math.floor(hours / 24);
      return `${days}d ${hours % 24}h`;
    }
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    if (mins > 0) {
      return `${mins}m ${secs}s`;
    }
    return `${secs}s`;
  };

  // Profile-Level Barrier Checks: Private and Protected
  if (profile.barrier === "private") {
    return (
      <div
        className="min-h-full w-full flex flex-col items-center justify-center p-8 text-center select-none"
        style={{
          backgroundColor: theme.palette.background,
          color: theme.palette.primaryText,
          fontFamily: bodyFontCss,
        }}
      >
        <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3 bg-neutral-200/80 border border-neutral-300">
          <Lock className="w-6 h-6 text-neutral-600" />
        </div>
        <h2 className="text-base font-bold tracking-tight" style={{ fontFamily: headingFontCss }}>This Profile is Private</h2>
        <p className="text-xs opacity-75 mt-1 max-w-xs" style={{ color: theme.palette.secondaryText }}>
          @{profile.handle} has restricted access. This profile is not publicly viewable.
        </p>
      </div>
    );
  }

  if (profile.barrier === "protected" && !isProfileUnlocked) {
    return (
      <div
        className="min-h-full w-full flex flex-col items-center justify-center p-6 text-center select-none"
        style={{
          backgroundColor: theme.palette.background,
          color: theme.palette.primaryText,
          fontFamily: bodyFontCss,
        }}
      >
        <div className="w-16 h-16 rounded-full overflow-hidden mb-3 border-2 shadow-lg" style={{ borderColor: theme.palette.accentGold }}>
          <img src={meta.avatarUrl} alt={meta.title} className="w-full h-full object-cover" />
        </div>
        <h2 className="text-base font-bold" style={{ fontFamily: headingFontCss }}>{meta.title}</h2>
        <p className="text-xs uppercase tracking-wider opacity-70 mb-4" style={{ color: theme.palette.secondaryText }}>@{profile.handle}</p>

        <div className="w-full max-w-xs p-4 rounded-2xl border shadow-sm space-y-3" style={{ backgroundColor: theme.palette.cardBackground, borderColor: theme.palette.border }}>
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold" style={{ color: theme.palette.accentGold }}>
            <ShieldCheck className="w-4 h-4" />
            <span>Protected Profile</span>
          </div>
          <p className="text-[11px] opacity-75" style={{ color: theme.palette.secondaryText }}>Enter master passcode to view profile</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const expected = profile.profilePassword || "ASOOBI2026";
              if (profilePassInput === expected) {
                setIsProfileUnlocked(true);
                setProfilePassError("");
              } else {
                setProfilePassError("Incorrect passcode");
              }
            }}
            className="space-y-2"
          >
            <input
              type="password"
              placeholder="Enter passcode..."
              value={profilePassInput}
              onChange={(e) => setProfilePassInput(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl border bg-transparent text-center focus:outline-none"
              style={{ borderColor: theme.palette.border, color: theme.palette.primaryText }}
            />
            {profilePassError && <p className="text-[10px] text-red-500 font-semibold">{profilePassError}</p>}
            <button
              type="submit"
              className="w-full py-2 px-4 text-xs font-bold tracking-wide uppercase transition-all active:scale-95"
              style={defaultBtnStyle}
            >
              Unlock Profile
            </button>
          </form>
        </div>
      </div>
    );
  }

  const visibleBlocks = blocks
    .filter((b) => {
      if (!b.isVisible || b.isArchived) return false;
      // Private barrier: hidden from visitors
      if (b.accessRules?.barrier === "private") return false;
      // Disappearance timer check: if timer is active and expiry has passed, block disappears!
      if (b.disappearTimerEnabled && b.disappearAt) {
        const expiry = new Date(b.disappearAt).getTime();
        if (expiry <= currentTime) return false;
      }
      return true;
    })
    .sort((a, b) => a.position - b.position);

  return (
    <div
      className="min-h-full w-full transition-colors duration-300 relative flex flex-col items-center select-none"
      style={{
        backgroundColor: theme.palette.background,
        color: theme.palette.primaryText,
        fontFamily: bodyFontCss,
      }}
    >
      {/* Google Fonts stylesheet link for typography fidelity */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Outfit:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=Syne:wght@500;700;800&display=swap"
      />

      {/* Dynamic Background Pattern & Animation Engine */}
      <BackgroundPatternRenderer
        config={theme.backgroundConfig}
        backgroundColor={theme.palette.background}
        accentColor={theme.palette.accentGold}
      />

      {/* Hero Cover Image (if grand editorial) */}
      {meta.heroLayout === "grand_editorial" && meta.heroCoverUrl && (
        <div className="w-full h-40 relative overflow-hidden bg-muted z-1">
          <img
            src={meta.heroCoverUrl}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
        </div>
      )}

      <div className={`w-full max-w-md px-5 pb-12 flex flex-col items-center relative z-2 ${meta.heroLayout === "grand_editorial" && Boolean(meta.heroCoverUrl) ? "-mt-14" : "pt-8"}`}>
        {/* Profile Avatar */}
        <div className="relative mb-3">
          <div
            className={`w-24 h-24 overflow-hidden shadow-xl border-2 p-1 ${
              meta.avatarShape === "circle"
                ? "rounded-full"
                : meta.avatarShape === "rounded"
                ? "rounded-2xl"
                : "rounded-3xl"
            }`}
            style={{
              borderColor: theme.palette.accentGold,
              backgroundColor: theme.palette.cardBackground,
            }}
          >
            <img
              src={meta.avatarUrl}
              alt={meta.title}
              className={`w-full h-full object-cover transition-all ${
                meta.avatarShape === "circle" 
                  ? "rounded-full" 
                  : meta.avatarShape === "rounded" 
                  ? "rounded-xl" 
                  : "rounded-2xl"
              }`}
            />
          </div>
          {profile.isVerified && (
            <div 
              className="absolute bottom-1 right-1 rounded-full p-1 shadow-md"
              style={{ 
                backgroundColor: theme.palette.accentGold, 
                color: theme.palette.buttonText || "#1A1C20" 
              }}
              title="Verified Asoobi Creator"
            >
              <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
          )}
        </div>

        {/* Name & Handle */}
        <h1 
          className="text-2xl font-bold tracking-tight text-center inline-flex items-center justify-center gap-1.5"
          style={{ 
            fontFamily: headingFontCss,
            letterSpacing: headingLetterSpacing,
            textTransform: headingTextTransform,
          }}
        >
          <span>{meta.title}</span>
          {profile.isVerified && (
            <span className="inline-flex items-center self-center" title="Verified Creator">
              <BlueVerifiedBadge className="w-5 h-5 drop-shadow-xs" />
            </span>
          )}
        </h1>
        <p className="text-xs font-medium tracking-wide uppercase opacity-75 mt-0.5" style={{ color: theme.palette.secondaryText }}>
          @{profile.handle} {meta.location && `• ${meta.location}`}
        </p>

        {/* Bio */}
        {meta.bio && (
          <p className="text-xs text-center leading-relaxed mt-2.5 max-w-[320px] opacity-85">
            {meta.bio}
          </p>
        )}

        {/* Verified Creator Contact Chips (Email & Phone Number) */}
        {(meta.email || meta.phone) && (
          <div className="flex items-center justify-center gap-2 mt-3 flex-wrap">
            {meta.email && (
              <a
                href={isInteractive ? `mailto:${meta.email}` : undefined}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium transition-all hover:opacity-80 border shadow-2xs"
                style={{
                  backgroundColor: `${theme.palette.cardBackground || "#FFFFFF"}CC`,
                  borderColor: theme.palette.border,
                  color: theme.palette.primaryText,
                }}
                title="Verified Creator Email"
              >
                <Mail className="w-3 h-3 text-[#D4AF37]" />
                <span>{meta.email}</span>
              </a>
            )}
            {meta.phone && (
              <a
                href={isInteractive ? `tel:${meta.phone}` : undefined}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium transition-all hover:opacity-80 border shadow-2xs"
                style={{
                  backgroundColor: `${theme.palette.cardBackground || "#FFFFFF"}CC`,
                  borderColor: theme.palette.border,
                  color: theme.palette.primaryText,
                }}
                title="Verified Creator Phone"
              >
                <Phone className="w-3 h-3 text-[#D4AF37]" />
                <span>{meta.phone}</span>
              </a>
            )}
          </div>
        )}

        {/* Block Stack */}
        <div className="w-full mt-6 space-y-3.5">
          {visibleBlocks.map((block) => {
            // Check barrier and password lock
            const isProtected = block.accessRules?.barrier === "protected" || block.accessRules?.isLocked;
            const isLocked = isProtected && !unlockedBlocks[block.id];

            if (isLocked) {
              return (
                <div
                  key={block.id}
                  className={`${cardClasses} p-4 flex flex-col gap-2.5`}
                  style={cardStyles}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div 
                        className="p-2 rounded-lg"
                        style={{
                          backgroundColor: `${theme.palette.accentGold}22`,
                          color: theme.palette.accentGold,
                        }}
                      >
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 
                          className="text-xs font-semibold" 
                          style={{ 
                            color: theme.palette.primaryText,
                            fontFamily: headingFontCss,
                          }}
                        >
                          {block.title}
                        </h3>
                        <p className="text-[10px] opacity-70" style={{ color: theme.palette.secondaryText }}>Protected content • Passcode required</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      placeholder="Enter passcode..."
                      value={passwordInputs[block.id] || ""}
                      onChange={(e) =>
                        setPasswordInputs((prev) => ({
                          ...prev,
                          [block.id]: e.target.value,
                        }))
                      }
                      className="flex-1 text-xs px-3 py-1.5 rounded-lg border bg-transparent focus:outline-none focus:ring-1"
                      style={{ borderColor: theme.palette.border, color: theme.palette.primaryText }}
                    />
                    <button
                      onClick={() => handleUnlock(block.id, block.accessRules.password)}
                      className="px-3 py-1.5 text-xs font-semibold active:scale-95"
                      style={defaultBtnStyle}
                    >
                      Unlock
                    </button>
                  </div>
                  {passwordErrors[block.id] && (
                    <span className="text-[10px] text-red-500 font-medium">
                      {passwordErrors[block.id]}
                    </span>
                  )}
                </div>
              );
            }

            switch (block.type) {
              case "featured_link":
                const featuredDestUrl = block.destinationUrl || block.url;
                return (
                  <div
                    key={block.id}
                    className={`${cardClasses} relative`}
                    style={cardStyles}
                  >
                    {block.disappearTimerEnabled && block.disappearAt && (
                      <div className="absolute top-3 right-3 z-10 flex items-center gap-1 text-[9px] font-bold font-mono px-2.5 py-1 rounded-full bg-black/65 text-white backdrop-blur-xs shadow-md border border-white/20">
                        <Clock className="w-2.5 h-2.5 text-[#D4AF37]" />
                        <span>{formatRemainingTime(block.disappearAt)}</span>
                      </div>
                    )}
                    {block.highlightCoverUrl && (
                      <div className="w-full h-36 relative overflow-hidden">
                        <img
                          src={block.highlightCoverUrl}
                          alt={block.title}
                          className="w-full h-full object-cover"
                        />
                        {block.badgeText && (
                          <div
                            className="absolute top-3 left-3 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full shadow-lg"
                            style={{
                              backgroundColor: theme.palette.accentGold,
                              color: theme.palette.buttonText || "#1A1C20",
                            }}
                          >
                            {block.badgeText}
                          </div>
                        )}
                      </div>
                    )}
                    <div className="p-4 flex flex-col gap-2">
                      <div>
                        <h2 
                          className="text-base font-bold tracking-tight" 
                          style={{ 
                            color: theme.palette.primaryText,
                            fontFamily: headingFontCss,
                            letterSpacing: headingLetterSpacing,
                          }}
                        >
                          {block.title}
                        </h2>
                        {block.subtitle && (
                          <p className="text-xs opacity-75 mt-0.5" style={{ color: theme.palette.secondaryText }}>
                            {block.subtitle}
                          </p>
                        )}
                      </div>
                      <a
                        href={isInteractive ? featuredDestUrl : undefined}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold tracking-wide uppercase transition-all active:scale-95"
                        style={defaultBtnStyle}
                      >
                        {block.callToAction}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );

              case "standard_link":
                const standardDestUrl = block.destinationUrl || block.url;
                return (
                  <div
                    key={block.id}
                    className={cardClasses}
                    style={cardStyles}
                  >
                    <a
                      href={isInteractive ? standardDestUrl : undefined}
                      target={block.openInNewTab ? "_blank" : "_self"}
                      rel="noreferrer"
                      className="flex items-center p-3 gap-3.5 hover:opacity-90 transition-opacity group relative"
                    >
                      {block.thumbnailUrl ? (
                        <img
                          src={block.thumbnailUrl}
                          alt=""
                          className="w-11 h-11 rounded-xl object-cover shrink-0"
                        />
                      ) : (
                        <div className="w-11 h-11 shrink-0 flex items-center justify-center">
                          {(() => {
                            const s = `${block.title || ""} ${standardDestUrl || ""}`.toLowerCase();
                            if (s.includes("instagram")) return <PlatformOfficialBadge platform="instagram" size="lg" shape="squircle" />;
                            if (s.includes("x:") || s.includes("x.com") || s.includes("twitter")) return <PlatformOfficialBadge platform="x" size="lg" shape="squircle" />;
                            if (s.includes("linkedin")) return <PlatformOfficialBadge platform="linkedin" size="lg" shape="squircle" />;
                            if (s.includes("youtube")) return <PlatformOfficialBadge platform="youtube" size="lg" shape="squircle" />;
                            if (s.includes("tiktok")) return <PlatformOfficialBadge platform="tiktok" size="lg" shape="squircle" />;
                            if (s.includes("spotify")) return <PlatformOfficialBadge platform="spotify" size="lg" shape="squircle" />;
                            if (s.includes("github")) return <PlatformOfficialBadge platform="github" size="lg" shape="squircle" />;
                            if (s.includes("threads")) return <PlatformOfficialBadge platform="threads" size="lg" shape="squircle" />;
                            return (
                              <div
                                className="w-11 h-11 rounded-xl flex items-center justify-center"
                                style={{ backgroundColor: `${theme.palette.accentGold}22`, color: theme.palette.accentGold }}
                              >
                                <Sparkles className="w-5 h-5" />
                              </div>
                            );
                          })()}
                        </div>
                      )}
                      <div className="flex-1 min-w-0 pr-1">
                        <div className="flex items-center gap-2">
                          <h3 
                            className="text-xs font-semibold truncate transition-colors"
                            style={{ color: theme.palette.primaryText }}
                          >
                            {block.title}
                          </h3>
                          {block.disappearTimerEnabled && block.disappearAt && (
                            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-800 border border-amber-500/20 flex items-center gap-1 shrink-0">
                              <Clock className="w-2.5 h-2.5 text-[#D4AF37]" />
                              <span>{formatRemainingTime(block.disappearAt)}</span>
                            </span>
                          )}
                        </div>
                        {block.subtitle && (
                          <p className="text-[10px] opacity-70 truncate mt-0.5" style={{ color: theme.palette.secondaryText }}>
                            {block.subtitle}
                          </p>
                        )}
                      </div>
                      <ExternalLink 
                        className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity shrink-0" 
                        style={{ color: theme.palette.secondaryText }}
                      />
                    </a>
                  </div>
                );

              case "collection":
                const isExpanded = expandedCollections[block.id];
                return (
                  <div
                    key={block.id}
                    className={cardClasses}
                    style={cardStyles}
                  >
                    <button
                      onClick={() =>
                        setExpandedCollections((prev) => ({
                          ...prev,
                          [block.id]: !prev[block.id],
                        }))
                      }
                      className="w-full p-3.5 flex items-center justify-between text-left"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold tracking-wider uppercase opacity-60" style={{ color: theme.palette.secondaryText }}>
                            Collection
                          </span>
                          {block.disappearTimerEnabled && block.disappearAt && (
                            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-800 border border-amber-500/20 flex items-center gap-1">
                              <Clock className="w-2.5 h-2.5 text-[#D4AF37]" />
                              <span>{formatRemainingTime(block.disappearAt)}</span>
                            </span>
                          )}
                        </div>
                        <h3 className="text-xs font-bold" style={{ color: theme.palette.primaryText }}>{block.title}</h3>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 opacity-60" style={{ color: theme.palette.secondaryText }} />
                      ) : (
                        <ChevronDown className="w-4 h-4 opacity-60" style={{ color: theme.palette.secondaryText }} />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="p-3 pt-0 space-y-2.5">
                        <div className="grid grid-cols-3 gap-2.5">
                          {block.items.map((item) => (
                            <a
                              key={item.id}
                              href={isInteractive ? item.url : undefined}
                              target="_blank"
                              rel="noreferrer"
                              className="flex flex-col items-center text-center p-2 rounded-xl border hover:opacity-90 transition-all"
                              style={{ 
                                borderColor: theme.palette.border,
                                backgroundColor: `${theme.palette.background}80`,
                                color: theme.palette.primaryText,
                              }}
                            >
                              <img
                                src={item.thumbnailUrl}
                                alt={item.title}
                                className="w-full h-16 object-cover rounded-lg mb-1.5"
                              />
                              <span className="text-[10px] font-medium leading-tight truncate w-full" style={{ color: theme.palette.primaryText }}>
                                {item.title}
                              </span>
                              {item.price && (
                                <span className="text-[9px] font-bold mt-0.5" style={{ color: theme.palette.secondaryText }}>
                                  {item.price}
                                </span>
                              )}
                            </a>
                          ))}
                        </div>
                        {block.destinationUrl && (
                          <a
                            href={isInteractive ? block.destinationUrl : undefined}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full py-2 px-3 text-xs font-semibold flex items-center justify-center gap-1.5 rounded-xl border border-[#D4AF37]/50 text-[#1A1C20] bg-amber-50/40 hover:bg-amber-50 transition-all"
                          >
                            <span>Explore Full Collection</span>
                            <ExternalLink className="w-3 h-3 text-[#D4AF37]" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                );

              case "discount_code":
                const isCopied = copiedCode === block.code;
                const discountDestUrl = block.destinationUrl;
                return (
                  <div
                    key={block.id}
                    className={`${cardClasses} p-3.5 flex flex-col gap-2 relative`}
                    style={cardStyles}
                  >
                    {block.disappearTimerEnabled && block.disappearAt && (
                      <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1 text-[9px] font-bold font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-800 border border-amber-500/20 shadow-xs">
                        <Clock className="w-2.5 h-2.5 text-[#D4AF37]" />
                        <span>{formatRemainingTime(block.disappearAt)}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between gap-3 pr-14">
                      <div>
                        <span 
                          className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                          style={{
                            backgroundColor: `${theme.palette.accentGold}22`,
                            color: theme.palette.accentGold,
                          }}
                        >
                          {block.discountPercentageOrValue}
                        </span>
                        <h4 className="text-xs font-bold mt-1" style={{ color: theme.palette.primaryText }}>{block.title}</h4>
                        <p className="text-[10px] opacity-70" style={{ color: theme.palette.secondaryText }}>{block.subtitle}</p>
                      </div>
                      <button
                        onClick={() => handleCopyDiscount(block.code)}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-bold tracking-wider transition-all active:scale-95 shrink-0"
                        style={{
                          ...defaultBtnStyle,
                          ...(isCopied ? { backgroundColor: "#10B981", color: "#FFFFFF", border: "none" } : {}),
                        }}
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        {block.code}
                      </button>
                    </div>
                    {discountDestUrl && (
                      <a
                        href={isInteractive ? discountDestUrl : undefined}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-1.5 px-3 text-[11px] font-semibold flex items-center justify-center gap-1.5 rounded-lg border border-[#D4AF37]/40 text-[#1A1C20] bg-amber-50/50 hover:bg-amber-50 transition-all mt-0.5"
                      >
                        <span>Redeem at Destination Store</span>
                        <ExternalLink className="w-3 h-3 text-[#D4AF37]" />
                      </a>
                    )}
                  </div>
                );

              case "contact_form":
                const hasSent = formSubmitted[block.id];
                const formDestUrl = block.destinationUrl;
                return (
                  <div
                    key={block.id}
                    className={`${cardClasses} p-4 relative`}
                    style={cardStyles}
                  >
                    {block.disappearTimerEnabled && block.disappearAt && (
                      <div className="absolute top-3 right-3 z-10 flex items-center gap-1 text-[9px] font-bold font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-800 border border-amber-500/20 shadow-xs">
                        <Clock className="w-2.5 h-2.5 text-[#D4AF37]" />
                        <span>{formatRemainingTime(block.disappearAt)}</span>
                      </div>
                    )}
                    <h3 
                      className="text-xs font-bold pr-16" 
                      style={{ 
                        color: theme.palette.primaryText,
                        fontFamily: headingFontCss,
                      }}
                    >
                      {block.title}
                    </h3>
                    <p className="text-[10px] opacity-70 mb-3" style={{ color: theme.palette.secondaryText }}>{block.subtitle}</p>

                    {hasSent ? (
                      <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center">
                        <Check className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
                        <p className="text-[10px] text-emerald-600 font-medium">
                          {block.successMessage}
                        </p>
                        {formDestUrl && (
                          <a
                            href={isInteractive ? formDestUrl : undefined}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#D4AF37] hover:underline mt-2"
                          >
                            <span>Continue to Destination</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    ) : (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          setFormSubmitted((prev) => ({ ...prev, [block.id]: true }));
                        }}
                        className="space-y-2"
                      >
                        {block.fields.collectName && (
                          <input
                            type="text"
                            required
                            placeholder="Your Name"
                            className="w-full text-xs px-3 py-2 rounded-lg border bg-transparent focus:outline-none"
                            style={{ borderColor: theme.palette.border, color: theme.palette.primaryText }}
                          />
                        )}
                        <input
                          type="email"
                          required
                          placeholder="Your Email Address"
                          className="w-full text-xs px-3 py-2 rounded-lg border bg-transparent focus:outline-none"
                          style={{ borderColor: theme.palette.border, color: theme.palette.primaryText }}
                        />
                        {block.fields.collectPhone && (
                          <input
                            type="tel"
                            placeholder="Phone Number / WhatsApp"
                            className="w-full text-xs px-3 py-2 rounded-lg border bg-transparent focus:outline-none"
                            style={{ borderColor: theme.palette.border, color: theme.palette.primaryText }}
                          />
                        )}
                        {block.customFields && block.customFields.map((field) => {
                          if (field.type === "select" && field.options) {
                            return (
                              <div key={field.id} className="space-y-1">
                                <label className="text-[10px] font-medium opacity-80 block" style={{ color: theme.palette.secondaryText }}>{field.label}</label>
                                <select
                                  required={field.required}
                                  className="w-full text-xs px-3 py-2 rounded-lg border bg-transparent focus:outline-none"
                                  style={{ borderColor: theme.palette.border, color: theme.palette.primaryText }}
                                >
                                  <option value="" className="text-gray-500">Select option...</option>
                                  {field.options.map((opt) => (
                                    <option key={opt} value={opt} className="text-black">{opt}</option>
                                  ))}
                                </select>
                              </div>
                            );
                          } else if (field.type === "textarea") {
                            return (
                              <textarea
                                key={field.id}
                                required={field.required}
                                rows={2}
                                placeholder={field.placeholder || field.label}
                                className="w-full text-xs px-3 py-2 rounded-lg border bg-transparent focus:outline-none resize-none"
                                style={{ borderColor: theme.palette.border, color: theme.palette.primaryText }}
                              />
                            );
                          } else {
                            return (
                              <input
                                key={field.id}
                                type={field.type === "date" ? "date" : "text"}
                                required={field.required}
                                placeholder={field.placeholder || field.label}
                                className="w-full text-xs px-3 py-2 rounded-lg border bg-transparent focus:outline-none"
                                style={{ borderColor: theme.palette.border, color: theme.palette.primaryText }}
                              />
                            );
                          }
                        })}
                        {block.fields.collectNote && (
                          <textarea
                            rows={2}
                            placeholder="Brief project details..."
                            className="w-full text-xs px-3 py-2 rounded-lg border bg-transparent focus:outline-none resize-none"
                            style={{ borderColor: theme.palette.border, color: theme.palette.primaryText }}
                          />
                        )}
                        <button
                          type="submit"
                          className="w-full py-2.5 px-4 text-xs font-bold tracking-wide uppercase flex items-center justify-center gap-2 transition-transform active:scale-95"
                          style={defaultBtnStyle}
                        >
                          <Send className="w-3.5 h-3.5" />
                          {block.submitButtonText}
                        </button>
                        {formDestUrl && (
                          <div className="text-center pt-1">
                            <a
                              href={isInteractive ? formDestUrl : undefined}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[10px] text-[#918355] hover:underline flex items-center justify-center gap-1"
                            >
                              <span>Direct destination link</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </div>
                        )}
                      </form>
                    )}
                  </div>
                );

              case "social_icons":
                const socialDestUrl = block.destinationUrl;
                return (
                  <div key={block.id} className="w-full relative flex flex-col items-center justify-center gap-2 py-2">
                    {block.disappearTimerEnabled && block.disappearAt && (
                      <div className="flex items-center gap-1 text-[9px] font-bold font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-800 border border-amber-500/20 shadow-xs">
                        <Clock className="w-2.5 h-2.5 text-[#D4AF37]" />
                        <span>Disappears in {formatRemainingTime(block.disappearAt)}</span>
                      </div>
                    )}
                    <div className="w-full flex items-center justify-center gap-3">
                      {block.platformLinks.map((social) => {
                        let iconElement: React.ReactNode = <Globe className="w-4 h-4" />;
                        if (social.platform === "email") iconElement = <Mail className="w-4 h-4" />;
                        else if (social.platform === "instagram") iconElement = <InstagramIcon className="w-4 h-4" />;
                        else if (social.platform === "x") iconElement = <XTwitterIcon className="w-3.5 h-3.5" />;
                        else if (social.platform === "linkedin") iconElement = <LinkedInIcon className="w-3.5 h-3.5" />;
                        else if (social.platform === "youtube") iconElement = <YouTubeIcon className="w-4 h-4" />;
                        else if (social.platform === "tiktok") iconElement = <TikTokIcon className="w-3.5 h-3.5" />;
                        else if (social.platform === "spotify") iconElement = <SpotifyIcon className="w-4 h-4" />;
                        else if ((social.platform as string) === "github") iconElement = <GitHubIcon className="w-4 h-4" />;
                        else if ((social.platform as string) === "threads") iconElement = <ThreadsIcon className="w-4 h-4" />;
                        else if ((social.platform as string) === "discord") iconElement = <DiscordIcon className="w-4 h-4" />;
                        else if ((social.platform as string) === "telegram") iconElement = <TelegramIcon className="w-4 h-4" />;
                        else if ((social.platform as string) === "whatsapp") iconElement = <WhatsAppIcon className="w-4 h-4" />;

                        return (
                          <a
                            key={social.platform}
                            href={isInteractive ? (social.url || socialDestUrl) : undefined}
                            target="_blank"
                            rel="noreferrer"
                            className="w-9 h-9 rounded-full flex items-center justify-center shadow-sm transition-transform hover:scale-110"
                            style={{
                              backgroundColor: theme.palette.accentGold,
                              color: theme.palette.buttonText || "#1A1C20",
                            }}
                          >
                            {iconElement}
                          </a>
                        );
                      })}
                    </div>
                    {socialDestUrl && (
                      <a
                        href={isInteractive ? socialDestUrl : undefined}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] text-[#918355] hover:underline flex items-center gap-1"
                      >
                        <span>Social Hub Website</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                );

              case "qr_code":
                const qrTarget = block.destinationUrl || block.targetUrl || "https://asoobi.com";
                return (
                  <div
                    key={block.id}
                    className={`${cardClasses} p-4 flex flex-col items-center justify-center gap-3 text-center relative`}
                    style={cardStyles}
                  >
                    {block.disappearTimerEnabled && block.disappearAt && (
                      <div className="absolute top-3 right-3 z-10 flex items-center gap-1 text-[9px] font-bold font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-800 border border-amber-500/20 shadow-xs">
                        <Clock className="w-2.5 h-2.5 text-[#D4AF37]" />
                        <span>{formatRemainingTime(block.disappearAt)}</span>
                      </div>
                    )}
                    <div>
                      <h3 
                        className="text-xs font-bold" 
                        style={{ 
                          color: theme.palette.primaryText,
                          fontFamily: headingFontCss,
                        }}
                      >
                        {block.title}
                      </h3>
                      {block.subtitle && (
                        <p className="text-[10px] opacity-70 mt-0.5" style={{ color: theme.palette.secondaryText }}>
                          {block.subtitle}
                        </p>
                      )}
                    </div>
                    <div className="p-3 bg-white rounded-xl shadow-xs border border-[#E5E0D2]">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(qrTarget)}`}
                        alt="QR Code"
                        className="w-28 h-28 object-contain"
                      />
                    </div>
                    <a
                      href={isInteractive ? qrTarget : undefined}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] font-semibold flex items-center gap-1.5 px-4 py-2 transition-all active:scale-95"
                      style={defaultBtnStyle}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      {block.downloadLabel || "Open Destination Link"}
                    </a>
                  </div>
                );

              case "support_banner":
                const bannerDestUrl = block.destinationUrl || block.paymentDestinationUrl;
                return (
                  <div
                    key={block.id}
                    className={`${cardClasses} p-4 space-y-3 relative`}
                    style={cardStyles}
                  >
                    {block.disappearTimerEnabled && block.disappearAt && (
                      <div className="absolute top-3 right-3 z-10 flex items-center gap-1 text-[9px] font-bold font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-800 border border-amber-500/20 shadow-xs">
                        <Clock className="w-2.5 h-2.5 text-[#D4AF37]" />
                        <span>{formatRemainingTime(block.disappearAt)}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div>
                        <span 
                          className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                          style={{
                            backgroundColor: `${theme.palette.accentGold}22`,
                            color: theme.palette.accentGold,
                          }}
                        >
                          {block.badgeLabel || "Support"}
                        </span>
                        <h4 
                          className="text-xs font-bold mt-1" 
                          style={{ 
                            color: theme.palette.primaryText,
                            fontFamily: headingFontCss,
                          }}
                        >
                          {block.bannerTitle || block.title}
                        </h4>
                      </div>
                    </div>
                    {block.description && (
                      <p className="text-[10px] opacity-75" style={{ color: theme.palette.secondaryText }}>{block.description}</p>
                    )}
                    {block.presetAmounts && block.presetAmounts.length > 0 && (
                      <div className="flex gap-2">
                        {block.presetAmounts.map((amt) => {
                          const isSelected = selectedAmounts[block.id] === amt;
                          return (
                            <button
                              key={amt}
                              type="button"
                              onClick={() => setSelectedAmounts((prev) => ({ ...prev, [block.id]: amt }))}
                              className="flex-1 py-1.5 rounded-lg border text-center text-xs font-bold transition-all hover:opacity-80 active:scale-95"
                              style={{ 
                                backgroundColor: isSelected ? theme.palette.accentGold : "transparent",
                                borderColor: isSelected ? theme.palette.accentGold : theme.palette.border,
                                color: isSelected ? (theme.palette.buttonText || "#1A1C20") : theme.palette.primaryText,
                              }}
                            >
                              ${amt}
                            </button>
                          );
                        })}
                      </div>
                    )}
                    <a
                      href={isInteractive ? bannerDestUrl : undefined}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2.5 px-4 text-xs font-bold tracking-wide uppercase flex items-center justify-center gap-2 transition-transform active:scale-95"
                      style={defaultBtnStyle}
                    >
                      Support Now
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                );

              default:
                return null;
            }
          })}
        </div>

        {/* Footer Brand Credit */}
        <div className="mt-8 flex items-center gap-1.5 opacity-60 text-[10px] font-semibold tracking-wider uppercase">
          <span style={{ color: theme.palette.secondaryText }}>Powered by</span>
          <span className="font-bold tracking-widest" style={{ color: theme.palette.accentGold }}>ASOOBI</span>
        </div>
      </div>
    </div>
  );
};
