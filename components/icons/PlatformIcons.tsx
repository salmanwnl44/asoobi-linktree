import React from "react";

export interface IconProps {
  className?: string;
  size?: number;
}

/**
 * Official Instagram Glyph (Simple Icons / Official Meta Asset)
 * Pixel-perfect compound vector with squircle body, concentric lens, and flash aperture.
 */
export const InstagramIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

/**
 * Official X (Twitter) Logo (Simple Icons / Official X Corp Brand Asset)
 */
export const XTwitterIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

/**
 * Official LinkedIn "in" Symbol (Simple Icons / Official LinkedIn Brand Asset)
 * Pure authentic "in" glyph, perfect for badges or monochrome fills.
 */
export const LinkedInIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
  </svg>
);

/**
 * Full LinkedIn Box Badge Icon (including the official rounded boundary)
 */
export const LinkedInFullBadgeIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.778-.773 1.778-1.729V1.73C24 .774 23.205 0 22.225 0z" />
  </svg>
);

/**
 * Official YouTube Logo (Simple Icons / Official YouTube Brand Asset)
 */
export const YouTubeIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

/**
 * Official TikTok Logo with authentic 3D cyan/magenta chromatic layers
 */
export const TikTokIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97v7.94c.03 2.01-.61 4.07-1.92 5.57-1.74 2-4.4 2.97-7.03 2.61-2.6-.33-4.9-1.99-6.07-4.32-1.32-2.58-.93-5.91.95-8.09 1.77-2.07 4.67-3.03 7.37-2.42v4.13c-1.18-.38-2.52-.22-3.56.45-1.07.68-1.69 1.95-1.57 3.22.09 1.25.82 2.4 1.95 2.95 1.11.55 2.48.51 3.58-.1 1.05-.59 1.68-1.76 1.65-2.97V.02h-3.38z" fill="#00F2FE" transform="translate(-0.8, -0.4)" opacity="0.85" />
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97v7.94c.03 2.01-.61 4.07-1.92 5.57-1.74 2-4.4 2.97-7.03 2.61-2.6-.33-4.9-1.99-6.07-4.32-1.32-2.58-.93-5.91.95-8.09 1.77-2.07 4.67-3.03 7.37-2.42v4.13c-1.18-.38-2.52-.22-3.56.45-1.07.68-1.69 1.95-1.57 3.22.09 1.25.82 2.4 1.95 2.95 1.11.55 2.48.51 3.58-.1 1.05-.59 1.68-1.76 1.65-2.97V.02h-3.38z" fill="#FE2C55" transform="translate(0.8, 0.4)" opacity="0.85" />
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97v7.94c.03 2.01-.61 4.07-1.92 5.57-1.74 2-4.4 2.97-7.03 2.61-2.6-.33-4.9-1.99-6.07-4.32-1.32-2.58-.93-5.91.95-8.09 1.77-2.07 4.67-3.03 7.37-2.42v4.13c-1.18-.38-2.52-.22-3.56.45-1.07.68-1.69 1.95-1.57 3.22.09 1.25.82 2.4 1.95 2.95 1.11.55 2.48.51 3.58-.1 1.05-.59 1.68-1.76 1.65-2.97V.02h-3.38z" fill="#FFFFFF" />
  </svg>
);

/**
 * Monochrome TikTok Logo
 */
export const TikTokMonochromeIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97v7.94c.03 2.01-.61 4.07-1.92 5.57-1.74 2-4.4 2.97-7.03 2.61-2.6-.33-4.9-1.99-6.07-4.32-1.32-2.58-.93-5.91.95-8.09 1.77-2.07 4.67-3.03 7.37-2.42v4.13c-1.18-.38-2.52-.22-3.56.45-1.07.68-1.69 1.95-1.57 3.22.09 1.25.82 2.4 1.95 2.95 1.11.55 2.48.51 3.58-.1 1.05-.59 1.68-1.76 1.65-2.97V.02h-3.38z" />
  </svg>
);

/**
 * Official Spotify Logo (Simple Icons / Official Spotify Brand Asset)
 */
export const SpotifyIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.495 17.305c-.215.353-.676.467-1.029.252-2.82-1.722-6.37-2.112-10.55-1.157-.403.093-.804-.158-.897-.561-.093-.404.158-.804.561-.897 4.57-1.045 8.492-.596 11.663 1.334.353.215.467.676.252 1.029zm1.467-3.262c-.27.44-.847.58-1.287.31-3.228-1.984-8.15-2.56-11.97-1.4-1.5-.5.17-1.01-.328-1.18-.499-.17-.499-.499.17-1.01.328 4.364-1.324 9.79-.668 13.488 1.603.44.27.58.847.31 1.287h.001zm.126-3.41c-3.87-2.298-10.25-2.51-13.935-1.39-.594.18-1.222-.16-1.402-.754-.18-.594.16-1.222.754-1.402 4.234-1.286 11.283-1.037 15.753 1.617.534.317.708 1.012.392 1.546-.316.534-1.012.708-1.546.392l-.016-.009z" />
  </svg>
);

/**
 * Official GitHub Octocat (Simple Icons / Official GitHub Brand Asset)
 */
export const GitHubIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

/**
 * Official Threads Logo (Simple Icons / Official Meta Brand Asset)
 */
export const ThreadsIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.186 24C5.452 24 0 18.673 0 12.08 0 5.485 5.452.158 12.186.158c6.69 0 12.14 5.285 12.186 11.838v.286c0 4.195-2.388 6.78-5.992 6.78-2.22 0-3.99-1.076-4.63-2.815-.71 1.69-2.37 2.815-4.47 2.815-3.08 0-5.37-2.386-5.37-5.59 0-3.204 2.29-5.59 5.37-5.59 1.68 0 3.23.75 4.18 1.99.16-.94.75-1.63 1.74-1.63 1.07 0 1.83.78 1.83 2.01v4.73c0 2.5 1.25 3.96 3.35 3.96 2.37 0 3.93-1.92 3.93-4.88v-.25c-.04-5.26-4.32-9.45-9.83-9.45-5.57 0-9.98 4.33-9.98 9.77 0 5.45 4.41 9.78 9.98 9.78 2.65 0 5.09-1 6.94-2.83l1.52 1.52C20.47 22.75 17.5 24 12.186 24zm-2.43-12.87c-1.8 0-3.15 1.39-3.15 3.28 0 1.9 1.35 3.28 3.15 3.28 1.81 0 3.16-1.38 3.16-3.28 0-1.89-1.35-3.28-3.16-3.28z" />
  </svg>
);

/**
 * Official Discord Clyde (Simple Icons / Official Discord Brand Asset)
 */
export const DiscordIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

/**
 * Official Telegram Paper Plane (Simple Icons / Official Telegram Asset)
 */
export const TelegramIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
  </svg>
);

/**
 * Official WhatsApp Phone Bubble (Simple Icons / Official WhatsApp Asset)
 */
export const WhatsAppIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.17 8.17 0 012.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.54 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.65.81-.79.98-.15.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08s.89 2.41 1.02 2.58c.13.17 1.75 2.68 4.25 3.75.59.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29z" />
  </svg>
);

/**
 * Official Facebook "f" Symbol (Simple Icons / Official Meta Brand Asset)
 */
export const FacebookIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

/**
 * Official Twitch Logo (Simple Icons / Official Twitch Brand Asset)
 */
export const TwitchIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M2.149 0l-1.612 4.119v16.804h5.331V24h3.201l3.199-3.077h4.269L23.463 14V0H2.149zm19.172 13.077l-3.201 3.077h-4.802l-3.199 3.077v-3.077H5.349V2.154h15.972v10.923zm-8.532-6.692h2.134v6.154h-2.134V6.385zm-4.801 0h2.134v6.154H7.988V6.385z" />
  </svg>
);

/**
 * Official Pinterest Logo (Simple Icons / Official Pinterest Brand Asset)
 */
export const PinterestIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
  </svg>
);

/**
 * Official Substack Logo
 */
export const SubstackIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
  </svg>
);

/**
 * Official Amazon Smile Arrow (Simple Icons)
 */
export const AmazonIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M13.918 17.518c-4.214 3.107-10.378 1.636-13.918-.535-.295-.181-.137-.478.192-.358 3.824 1.396 9.497 2.052 13.064-.472.545-.386.993.228.662.545v.82zm1.488-1.527c-.244-.316-1.61-.15-2.228-.076-.188.023-.217-.11-.048-.231 1.101-.786 2.904-.559 3.119-.28.216.279-.057 2.083-1.096 2.95-.159.133-.31.062-.239-.113.234-.576.736-1.934.492-2.25zm4.847-7.464c-.456.634-.849 1.442-.849 2.508 0 1.94 1.05 3.013 2.543 3.013 1.042 0 1.67-.473 2.057-1.026v.874h2.158V6.995h-2.158v.919c-.387-.553-1.015-1.026-2.057-1.026-1.493 0-2.543 1.073-2.543 3.013v-.374h.849zm1.758 2.09c0-1.127.568-1.802 1.483-1.802.914 0 1.482.675 1.482 1.802 0 1.128-.568 1.803-1.482 1.803-.915 0-1.483-.675-1.483-1.803z" />
  </svg>
);

/**
 * Official Apple Music Note
 */
export const AppleIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 7.04c.64-.78 1.08-1.86.96-2.95-1 .04-2.15.66-2.82 1.45-.58.67-1.1 1.77-.96 2.83 1.12.09 2.2-.58 2.82-1.33z" />
  </svg>
);

/**
 * Luxury Atelier Star Icon (Asoobi VIP Brand Mark)
 */
export const LuxuryAtelierIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2l2.4 6.6L21 11l-5.4 4.4L17 22l-5-3.6L7 22l1.4-6.6L3 11l6.6-2.4L12 2z" />
  </svg>
);

/**
 * Returns the authentic vector icon component based on platform name.
 */
export function getPlatformBadgeIcon(platform: string, className = "w-3.5 h-3.5"): React.ReactNode {
  const p = (platform || "").toLowerCase();
  if (p.includes("instagram")) return <InstagramIcon className={className} />;
  if (p.includes("x") || p.includes("twitter")) return <XTwitterIcon className={className} />;
  if (p.includes("linkedin")) return <LinkedInIcon className={className} />;
  if (p.includes("youtube")) return <YouTubeIcon className={className} />;
  if (p.includes("tiktok")) return <TikTokIcon className={className} />;
  if (p.includes("spotify")) return <SpotifyIcon className={className} />;
  if (p.includes("github")) return <GitHubIcon className={className} />;
  if (p.includes("threads")) return <ThreadsIcon className={className} />;
  if (p.includes("discord")) return <DiscordIcon className={className} />;
  if (p.includes("telegram")) return <TelegramIcon className={className} />;
  if (p.includes("whatsapp")) return <WhatsAppIcon className={className} />;
  if (p.includes("facebook")) return <FacebookIcon className={className} />;
  if (p.includes("twitch")) return <TwitchIcon className={className} />;
  if (p.includes("pinterest")) return <PinterestIcon className={className} />;
  if (p.includes("substack")) return <SubstackIcon className={className} />;
  if (p.includes("apple") || p.includes("music") || p.includes("podcast")) return <AppleIcon className={className} />;
  if (p.includes("amazon") || p.includes("shop")) return <AmazonIcon className={className} />;
  return <LuxuryAtelierIcon className={className} />;
}

export interface PlatformOfficialBadgeProps {
  platform: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  shape?: "circle" | "squircle";
  className?: string;
}

/**
 * Official Brand Badge & App Icon Component
 * 
 * Recreates authentic app icons as seen on modern icon template repositories (Simple Icons, SVGL, VectorLogoZone):
 * - Official multi-stop gradient for Instagram
 * - Official X Corp deep black with mathematical X
 * - Official LinkedIn Blue (#0A66C2) with crisp "in"
 * - Official YouTube Red (#FF0000) with white play triangle
 * - Official TikTok chromatic aberration layers
 * - Official Spotify Green (#1DB954) with black soundwaves
 * - Official GitHub Slate (#24292F) with white Octocat
 * - Official Threads Black with white @ glyph
 * - Official Discord Blurple (#5865F2)
 * - Official Telegram Sky Blue (#24A1DE)
 * - Official WhatsApp Green (#25D366)
 * - Luxury Atelier Signature Gold Gradient
 */
export const PlatformOfficialBadge: React.FC<PlatformOfficialBadgeProps> = ({
  platform,
  size = "md",
  shape = "circle",
  className = "",
}) => {
  const p = (platform || "").toLowerCase();

  const sizeClass = {
    xs: "w-5 h-5",
    sm: "w-6 h-6",
    md: "w-7 h-7",
    lg: "w-9 h-9",
    xl: "w-11 h-11",
  }[size];

  const iconClass = {
    xs: "w-3 h-3",
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
    xl: "w-6 h-6",
  }[size];

  const roundedClass = shape === "circle" ? "rounded-full" : "rounded-xl";

  // 1. Instagram: Authentic 5-stop gradient + crisp white camera glyph
  if (p.includes("instagram")) {
    return (
      <div
        className={`${sizeClass} ${roundedClass} flex items-center justify-center shrink-0 shadow-sm text-white ring-1 ring-black/5 ${className}`}
        style={{
          background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
        }}
        title="Instagram"
      >
        <InstagramIcon className={iconClass} />
      </div>
    );
  }

  // 2. X (Twitter): Deep black background + authentic crisp white mathematical X
  if (p.includes("x") || p.includes("twitter")) {
    return (
      <div
        className={`${sizeClass} ${roundedClass} bg-black border border-neutral-800 flex items-center justify-center shrink-0 shadow-sm text-white ring-1 ring-white/10 ${className}`}
        title="X (Twitter)"
      >
        <XTwitterIcon className={iconClass} />
      </div>
    );
  }

  // 3. LinkedIn: Official LinkedIn Blue #0A66C2 + white crisp "in" glyph
  if (p.includes("linkedin")) {
    return (
      <div
        className={`${sizeClass} ${roundedClass} bg-[#0A66C2] flex items-center justify-center shrink-0 shadow-sm text-white ring-1 ring-black/5 ${className}`}
        title="LinkedIn"
      >
        <LinkedInIcon className={iconClass} />
      </div>
    );
  }

  // 4. YouTube: Official YouTube Red #FF0000 + white play button
  if (p.includes("youtube")) {
    return (
      <div
        className={`${sizeClass} ${roundedClass} bg-[#FF0000] flex items-center justify-center shrink-0 shadow-sm text-white ring-1 ring-black/5 ${className}`}
        title="YouTube"
      >
        <YouTubeIcon className={iconClass} />
      </div>
    );
  }

  // 5. TikTok: Deep black background + authentic 3D cyan/magenta chromatic layers
  if (p.includes("tiktok")) {
    return (
      <div
        className={`${sizeClass} ${roundedClass} bg-black border border-neutral-800 flex items-center justify-center shrink-0 shadow-sm text-white ring-1 ring-white/10 ${className}`}
        title="TikTok"
      >
        <TikTokIcon className={iconClass} />
      </div>
    );
  }

  // 6. Spotify: Official Spotify Green #1DB954 + pure black sound waves
  if (p.includes("spotify")) {
    return (
      <div
        className={`${sizeClass} ${roundedClass} bg-[#1DB954] flex items-center justify-center shrink-0 shadow-sm text-black ring-1 ring-black/5 ${className}`}
        title="Spotify"
      >
        <SpotifyIcon className={iconClass} />
      </div>
    );
  }

  // 7. GitHub: Official GitHub dark slate #24292F + crisp white Octocat
  if (p.includes("github")) {
    return (
      <div
        className={`${sizeClass} ${roundedClass} bg-[#24292F] border border-neutral-700 flex items-center justify-center shrink-0 shadow-sm text-white ring-1 ring-white/10 ${className}`}
        title="GitHub"
      >
        <GitHubIcon className={iconClass} />
      </div>
    );
  }

  // 8. Threads: Deep black + crisp white @ logo
  if (p.includes("threads")) {
    return (
      <div
        className={`${sizeClass} ${roundedClass} bg-black border border-neutral-800 flex items-center justify-center shrink-0 shadow-sm text-white ring-1 ring-white/10 ${className}`}
        title="Threads"
      >
        <ThreadsIcon className={iconClass} />
      </div>
    );
  }

  // 9. Discord: Official Discord Blurple #5865F2 + white Clyde
  if (p.includes("discord")) {
    return (
      <div
        className={`${sizeClass} ${roundedClass} bg-[#5865F2] flex items-center justify-center shrink-0 shadow-sm text-white ring-1 ring-black/5 ${className}`}
        title="Discord"
      >
        <DiscordIcon className={iconClass} />
      </div>
    );
  }

  // 10. Telegram: Official Telegram Sky Blue #24A1DE + white paper plane
  if (p.includes("telegram")) {
    return (
      <div
        className={`${sizeClass} ${roundedClass} bg-[#24A1DE] flex items-center justify-center shrink-0 shadow-sm text-white ring-1 ring-black/5 ${className}`}
        title="Telegram"
      >
        <TelegramIcon className={iconClass} />
      </div>
    );
  }

  // 11. WhatsApp: Official WhatsApp Green #25D366 + white phone
  if (p.includes("whatsapp")) {
    return (
      <div
        className={`${sizeClass} ${roundedClass} bg-[#25D366] flex items-center justify-center shrink-0 shadow-sm text-white ring-1 ring-black/5 ${className}`}
        title="WhatsApp"
      >
        <WhatsAppIcon className={iconClass} />
      </div>
    );
  }

  // 12. Facebook: Official Facebook Blue #1877F2 + white "f"
  if (p.includes("facebook")) {
    return (
      <div
        className={`${sizeClass} ${roundedClass} bg-[#1877F2] flex items-center justify-center shrink-0 shadow-sm text-white ring-1 ring-black/5 ${className}`}
        title="Facebook"
      >
        <FacebookIcon className={iconClass} />
      </div>
    );
  }

  // 13. Twitch: Official Twitch Purple #9146FF + white logo
  if (p.includes("twitch")) {
    return (
      <div
        className={`${sizeClass} ${roundedClass} bg-[#9146FF] flex items-center justify-center shrink-0 shadow-sm text-white ring-1 ring-black/5 ${className}`}
        title="Twitch"
      >
        <TwitchIcon className={iconClass} />
      </div>
    );
  }

  // 14. Pinterest: Official Pinterest Red #E60023 + white "P"
  if (p.includes("pinterest")) {
    return (
      <div
        className={`${sizeClass} ${roundedClass} bg-[#E60023] flex items-center justify-center shrink-0 shadow-sm text-white ring-1 ring-black/5 ${className}`}
        title="Pinterest"
      >
        <PinterestIcon className={iconClass} />
      </div>
    );
  }

  // 15. Substack: Official Substack Orange #FF6719 + white bookmark
  if (p.includes("substack")) {
    return (
      <div
        className={`${sizeClass} ${roundedClass} bg-[#FF6719] flex items-center justify-center shrink-0 shadow-sm text-white ring-1 ring-black/5 ${className}`}
        title="Substack"
      >
        <SubstackIcon className={iconClass} />
      </div>
    );
  }

  // 16. Amazon / Shop: Official Amazon Dark #232F3E + Orange smile #FF9900
  if (p.includes("amazon") || p.includes("shop")) {
    return (
      <div
        className={`${sizeClass} ${roundedClass} bg-[#232F3E] flex items-center justify-center shrink-0 shadow-sm text-[#FF9900] ring-1 ring-white/10 ${className}`}
        title="Amazon Shop"
      >
        <AmazonIcon className={iconClass} />
      </div>
    );
  }

  // 17. Apple Music / Podcasts
  if (p.includes("apple") || p.includes("music") || p.includes("podcast")) {
    return (
      <div
        className={`${sizeClass} ${roundedClass} flex items-center justify-center shrink-0 shadow-sm text-white ring-1 ring-black/5 ${className}`}
        style={{
          background: "linear-gradient(135deg, #FA2D48 0%, #FB5171 100%)",
        }}
        title="Apple"
      >
        <AppleIcon className={iconClass} />
      </div>
    );
  }

  // 18. Luxury Atelier / Asoobi / VIP: Metallic Atelier Gold Gradient + white atelier star
  return (
    <div
      className={`${sizeClass} ${roundedClass} flex items-center justify-center shrink-0 shadow-sm text-white ring-1 ring-black/5 ${className}`}
      style={{
        background: "linear-gradient(135deg, #D4AF37 0%, #AA771C 100%)",
      }}
      title={platform || "Atelier"}
    >
      <LuxuryAtelierIcon className={iconClass} />
    </div>
  );
};

/**
 * Official Blue Verification Badge (Scalloped verified tick)
 * Authentic 12-point badge in vibrant verification blue (#0095F6) with crisp white checkmark
 */
export const BlueVerifiedBadge: React.FC<{ className?: string; title?: string }> = ({
  className = "w-5 h-5",
  title = "Verified Account",
}) => (
  <svg
    viewBox="0 0 24 24"
    className={`inline-block shrink-0 ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label={title}
  >
    <title>{title}</title>
    <path
      d="M10.5213 2.62368C11.3147 1.75255 12.6853 1.75255 13.4787 2.62368L14.4989 3.74391C14.8998 4.18418 15.4761 4.42288 16.071 4.39508L17.5863 4.32431C18.7656 4.26922 19.7308 5.23441 19.6757 6.41369L19.6049 7.92902C19.5771 8.5239 19.8158 9.10018 20.2561 9.50111L21.3763 10.5213C22.2474 11.3147 22.2474 12.6853 21.3763 13.4787L20.2561 14.4989C19.8158 14.8998 19.5771 15.4761 19.6049 16.071L19.6757 17.5863C19.7308 18.7656 18.7656 19.7308 17.5863 19.6757L16.071 19.6049C15.4761 19.5771 14.8998 19.8158 14.4989 20.2561L13.4787 21.3763C12.6853 22.2474 11.3147 22.2474 10.5213 21.3763L9.50111 20.2561C9.10018 19.8158 8.5239 19.5771 7.92902 19.6049L6.41369 19.6757C5.23441 19.7308 4.26922 18.7656 4.32431 17.5863L4.39508 16.071C4.42288 15.4761 4.18418 14.8998 3.74391 14.4989L2.62368 13.4787C1.75255 12.6853 1.75255 11.3147 2.62368 10.5213L3.74391 9.50111C4.18418 9.10018 4.42288 8.5239 4.39508 7.92902L4.32431 6.41369C4.26922 5.23441 5.23441 4.26922 6.41369 4.32431L7.92902 4.39508C8.5239 4.42288 9.10018 4.18418 9.50111 3.74391L10.5213 2.62368Z"
      fill="#0095F6"
    />
    <path
      d="M9 12.2L11.2 14.4L15.8 9.6"
      stroke="white"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

