"use client";

import React, { useState } from "react";
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
  ChevronUp
} from "lucide-react";
import { 
  InstagramIcon, 
  XTwitterIcon, 
  LinkedInIcon, 
  YouTubeIcon, 
  TikTokIcon, 
  SpotifyIcon 
} from "@/components/icons/PlatformIcons";
import { getCardWrapperClasses, getCardWrapperStyle } from "@/lib/cardDesigns";

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
  const [expandedCollections, setExpandedCollections] = useState<Record<string, boolean>>({
    "block-3": true,
  });

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

  const visibleBlocks = blocks
    .filter((b) => b.isVisible && !b.isArchived)
    .sort((a, b) => a.position - b.position);

  return (
    <div
      className="min-h-full w-full transition-colors duration-300 relative flex flex-col items-center select-none"
      style={{
        backgroundColor: theme.palette.background,
        color: theme.palette.primaryText,
      }}
    >
      {/* Hero Cover Image (if grand editorial) */}
      {meta.heroLayout === "grand_editorial" && meta.heroCoverUrl && (
        <div className="w-full h-40 relative overflow-hidden bg-muted">
          <img
            src={meta.heroCoverUrl}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
        </div>
      )}

      <div className={`w-full max-w-md px-5 pb-12 flex flex-col items-center ${meta.heroLayout === "grand_editorial" && Boolean(meta.heroCoverUrl) ? "-mt-14" : "pt-8"}`}>
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
          className="text-2xl font-bold tracking-tight text-center flex items-center gap-1.5"
          style={{ fontFamily: theme.typography.headingFont === "Playfair Display" ? "var(--font-display)" : "var(--font-sans)" }}
        >
          {meta.title}
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

        {/* Block Stack */}
        <div className="w-full mt-6 space-y-3.5">
          {visibleBlocks.map((block) => {
            // Check password lock
            const isLocked = block.accessRules.isLocked && !unlockedBlocks[block.id];

            switch (block.type) {
              case "featured_link":
                return (
                  <div
                    key={block.id}
                    className={cardClasses}
                    style={cardStyles}
                  >
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
                        <h2 className="text-base font-bold tracking-tight" style={{ color: theme.palette.primaryText }}>{block.title}</h2>
                        {block.subtitle && (
                          <p className="text-xs opacity-75 mt-0.5" style={{ color: theme.palette.secondaryText }}>
                            {block.subtitle}
                          </p>
                        )}
                      </div>
                      <a
                        href={isInteractive ? block.url : undefined}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all shadow-md active:scale-95"
                        style={{
                          backgroundColor: theme.palette.accentGold,
                          color: theme.palette.buttonText || "#1A1C20",
                        }}
                      >
                        {block.callToAction}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );

              case "standard_link":
                return (
                  <div
                    key={block.id}
                    className={cardClasses}
                    style={cardStyles}
                  >
                    {isLocked ? (
                      <div className="p-3.5 flex flex-col gap-2.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div 
                              className="p-2 rounded-lg"
                              style={{
                                backgroundColor: `${theme.palette.accentGold}22`,
                                color: theme.palette.accentGold,
                              }}
                            >
                              <Lock className="w-4 h-4" />
                            </div>
                            <div>
                              <h3 className="text-xs font-semibold" style={{ color: theme.palette.primaryText }}>{block.title}</h3>
                              <p className="text-[10px] opacity-70" style={{ color: theme.palette.secondaryText }}>Password required</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="password"
                            placeholder="Enter password..."
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
                            className="px-3 py-1.5 text-xs font-semibold rounded-lg shadow-sm"
                            style={{
                              backgroundColor: theme.palette.accentGold,
                              color: theme.palette.buttonText || "#1A1C20",
                            }}
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
                    ) : (
                      <a
                        href={isInteractive ? block.url : undefined}
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
                          <div
                            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                            style={{ backgroundColor: `${theme.palette.accentGold}22`, color: theme.palette.accentGold }}
                          >
                            <Sparkles className="w-5 h-5" />
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
                    )}
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
                        <span className="text-[10px] font-bold tracking-wider uppercase opacity-60" style={{ color: theme.palette.secondaryText }}>
                          Collection
                        </span>
                        <h3 className="text-xs font-bold" style={{ color: theme.palette.primaryText }}>{block.title}</h3>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 opacity-60" style={{ color: theme.palette.secondaryText }} />
                      ) : (
                        <ChevronDown className="w-4 h-4 opacity-60" style={{ color: theme.palette.secondaryText }} />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="p-3 pt-0 grid grid-cols-3 gap-2.5">
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
                    )}
                  </div>
                );

              case "discount_code":
                const isCopied = copiedCode === block.code;
                return (
                  <div
                    key={block.id}
                    className={`${cardClasses} p-3.5 flex items-center justify-between gap-3`}
                    style={cardStyles}
                  >
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
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider transition-all shadow-sm active:scale-95"
                      style={{
                        backgroundColor: isCopied ? "#10B981" : theme.palette.accentGold,
                        color: isCopied ? "#FFFFFF" : (theme.palette.buttonText || "#1A1C20"),
                      }}
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {block.code}
                    </button>
                  </div>
                );

              case "contact_form":
                const hasSent = formSubmitted[block.id];
                return (
                  <div
                    key={block.id}
                    className={`${cardClasses} p-4`}
                    style={cardStyles}
                  >
                    <h3 className="text-xs font-bold" style={{ color: theme.palette.primaryText }}>{block.title}</h3>
                    <p className="text-[10px] opacity-70 mb-3" style={{ color: theme.palette.secondaryText }}>{block.subtitle}</p>

                    {hasSent ? (
                      <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center">
                        <Check className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
                        <p className="text-[10px] text-emerald-600 font-medium">
                          {block.successMessage}
                        </p>
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
                          className="w-full py-2 px-4 rounded-lg text-xs font-bold tracking-wide uppercase flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95"
                          style={{
                            backgroundColor: theme.palette.accentGold,
                            color: theme.palette.buttonText || "#1A1C20",
                          }}
                        >
                          <Send className="w-3 h-3" />
                          {block.submitButtonText}
                        </button>
                      </form>
                    )}
                  </div>
                );

              case "social_icons":
                return (
                  <div key={block.id} className="w-full flex items-center justify-center gap-3 py-2">
                    {block.platformLinks.map((social) => {
                      let iconElement: React.ReactNode = <Globe className="w-4 h-4" />;
                      if (social.platform === "email") iconElement = <Mail className="w-4 h-4" />;
                      else if (social.platform === "instagram") iconElement = <InstagramIcon className="w-4 h-4" />;
                      else if (social.platform === "x") iconElement = <XTwitterIcon className="w-3.5 h-3.5" />;
                      else if (social.platform === "linkedin") iconElement = <LinkedInIcon className="w-3.5 h-3.5" />;
                      else if (social.platform === "youtube") iconElement = <YouTubeIcon className="w-4 h-4" />;
                      else if (social.platform === "tiktok") iconElement = <TikTokIcon className="w-3.5 h-3.5" />;
                      else if (social.platform === "spotify") iconElement = <SpotifyIcon className="w-4 h-4" />;

                      return (
                        <a
                          key={social.platform}
                          href={isInteractive ? social.url : undefined}
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
                );

              case "qr_code":
                return (
                  <div
                    key={block.id}
                    className={`${cardClasses} p-4 flex flex-col items-center justify-center gap-3 text-center`}
                    style={cardStyles}
                  >
                    <div>
                      <h3 className="text-xs font-bold" style={{ color: theme.palette.primaryText }}>{block.title}</h3>
                      {block.subtitle && (
                        <p className="text-[10px] opacity-70 mt-0.5" style={{ color: theme.palette.secondaryText }}>
                          {block.subtitle}
                        </p>
                      )}
                    </div>
                    <div className="p-3 bg-white rounded-xl shadow-xs border border-[#E5E0D2]">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(
                          block.targetUrl || "https://asoobi.com"
                        )}`}
                        alt="QR Code"
                        className="w-28 h-28 object-contain"
                      />
                    </div>
                    <a
                      href={isInteractive ? block.targetUrl : undefined}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] font-semibold flex items-center gap-1.5 px-4 py-2 rounded-xl shadow-xs transition-all active:scale-95"
                      style={{
                        backgroundColor: theme.palette.accentGold,
                        color: theme.palette.buttonText || "#1A1C20",
                      }}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      {block.downloadLabel || "Open Target Link"}
                    </a>
                  </div>
                );

              case "support_banner":
                return (
                  <div
                    key={block.id}
                    className={`${cardClasses} p-4 space-y-3`}
                    style={cardStyles}
                  >
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
                        <h4 className="text-xs font-bold mt-1" style={{ color: theme.palette.primaryText }}>{block.bannerTitle || block.title}</h4>
                      </div>
                    </div>
                    {block.description && (
                      <p className="text-[10px] opacity-75" style={{ color: theme.palette.secondaryText }}>{block.description}</p>
                    )}
                    {block.presetAmounts && block.presetAmounts.length > 0 && (
                      <div className="flex gap-2">
                        {block.presetAmounts.map((amt) => (
                          <a
                            key={amt}
                            href={isInteractive ? block.paymentDestinationUrl : undefined}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 py-1.5 rounded-lg border text-center text-xs font-bold transition-all hover:opacity-80"
                            style={{ 
                              borderColor: theme.palette.border,
                              color: theme.palette.primaryText,
                            }}
                          >
                            ${amt}
                          </a>
                        ))}
                      </div>
                    )}
                    <a
                      href={isInteractive ? block.paymentDestinationUrl : undefined}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2 px-4 rounded-xl text-xs font-bold tracking-wide uppercase flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95"
                      style={{
                        backgroundColor: theme.palette.accentGold,
                        color: theme.palette.buttonText || "#1A1C20",
                      }}
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
