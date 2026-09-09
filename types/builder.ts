export type BlockType = 
  | 'standard_link'
  | 'featured_link'
  | 'collection'
  | 'contact_form'
  | 'social_icons'
  | 'support_banner'
  | 'discount_code'
  | 'qr_code';

export type CollectionLayout = 'list' | 'grid' | 'carousel' | 'compact';
export type ButtonStyle = 
  | 'solid' 
  | 'outline' 
  | 'soft' 
  | 'glass' 
  | 'shadow_gold' 
  | 'brutalist' 
  | 'pill' 
  | 'neon'
  | 'gradient_luxe'
  | 'clay_3d'
  | 'retro_double'
  | 'glow_pulse'
  | 'metallic_chrome'
  | 'leather_stitch'
  | 'velvet_matte'
  | 'prism_holo'
  | 'sunlit_amber'
  | 'emerald_mint'
  | 'royal_violet'
  | 'rose_champagne';
export type AvatarShape = 'circle' | 'rounded' | 'squircle' | 'hexagon';

export type HeadingFontFamily = 
  | 'Playfair Display' 
  | 'Cinzel'
  | 'Syne' 
  | 'Cormorant Garamond'
  | 'Lora'
  | 'Bodoni Moda'
  | 'Fraunces'
  | 'DM Serif Display'
  | 'Prata'
  | 'Marcellus'
  | 'Abril Fatface'
  | 'Italiana'
  | 'Tenor Sans'
  | 'Bebas Neue'
  | 'Anton'
  | 'Oswald'
  | 'Righteous'
  | 'Unbounded'
  | 'Space Grotesk'
  | 'JetBrains Mono'
  | 'Caveat'
  | 'Pacifico'
  | 'Great Vibes'
  | 'Outfit' 
  | 'Plus Jakarta Sans' 
  | 'DM Sans'
  | 'Poppins'
  | 'Raleway'
  | 'Manrope'
  | 'Urbanist'
  | 'Montserrat'
  | 'Inter';

export type BodyFontFamily = 
  | 'Inter' 
  | 'Outfit' 
  | 'Plus Jakarta Sans' 
  | 'DM Sans'
  | 'Poppins'
  | 'Raleway'
  | 'Manrope'
  | 'Urbanist'
  | 'Space Grotesk'
  | 'JetBrains Mono'
  | 'Lora'
  | 'Montserrat';

export type BackgroundPatternType = 
  | 'solid_block'
  | 'canvas_constellation'
  | 'canvas_aurora_waves'
  | 'canvas_stardust'
  | 'gradient_radial'
  | 'gradient_mesh'
  | 'dot_grid'
  | 'isometric_grid'
  | 'subtle_noise'
  | 'art_deco_lattice'
  | 'iridescent_hologram'
  | 'floating_bubbles'
  | 'neon_horizon'
  | 'liquid_marble'
  | 'cyber_matrix';

export interface BackgroundConfig {
  type: BackgroundPatternType;
  patternColor?: string;
  patternOpacity?: number;
  particleSpeed?: number;
  gradientAngle?: number;
  secondaryGradientColor?: string;
}

export interface LinkAccessRules {
  isLocked: boolean;
  password?: string;
  scheduleEnabled: boolean;
  startDate?: string;
  endDate?: string;
}

export interface BaseBlock {
  id: string;
  type: BlockType;
  position: number;
  title: string;
  subtitle?: string;
  isVisible: boolean;
  isArchived: boolean;
  accessRules: LinkAccessRules;
  destinationUrl?: string;
  disappearTimerEnabled?: boolean;
  disappearAt?: string;
  disappearDurationHours?: number;
  customStyleOverrides?: {
    accentColor?: string;
    textColor?: string;
    buttonStyle?: ButtonStyle;
  };
  analyticsTag?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StandardLinkBlock extends BaseBlock {
  type: 'standard_link';
  url: string;
  icon?: string;
  thumbnailUrl?: string;
  openInNewTab: boolean;
}

export interface FeaturedLinkBlock extends BaseBlock {
  type: 'featured_link';
  url: string;
  badgeText?: string;
  highlightCoverUrl?: string;
  description?: string;
  callToAction: string;
}

export interface CollectionBlock extends BaseBlock {
  type: 'collection';
  layout: CollectionLayout;
  coverImage?: string;
  items: Array<{
    id: string;
    title: string;
    url: string;
    icon?: string;
    thumbnailUrl?: string;
    price?: string;
  }>;
}

export interface ContactFormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'phone' | 'textarea' | 'select' | 'date';
  placeholder?: string;
  required: boolean;
  options?: string[]; // for select dropdown
}

export interface ContactFormBlock extends BaseBlock {
  type: 'contact_form';
  targetEmail: string;
  fields: {
    collectName: boolean;
    collectPhone: boolean;
    collectNote: boolean;
  };
  customFields?: ContactFormField[];
  successMessage: string;
  submitButtonText: string;
  templateCategory?: string;
  templateName?: string;
}

export interface SocialIconsBlock extends BaseBlock {
  type: 'social_icons';
  platformLinks: Array<{
    platform: 'instagram' | 'tiktok' | 'youtube' | 'x' | 'spotify' | 'linkedin' | 'email';
    url: string;
    position: number;
  }>;
  iconStyle: 'minimal' | 'filled_gold' | 'glass' | 'monochrome';
}

export interface SupportBannerBlock extends BaseBlock {
  type: 'support_banner';
  bannerTitle: string;
  description: string;
  presetAmounts: number[];
  paymentDestinationUrl: string;
  badgeLabel?: string;
}

export interface DiscountCodeBlock extends BaseBlock {
  type: 'discount_code';
  code: string;
  discountPercentageOrValue: string;
  brandName: string;
  expiryNote?: string;
  destinationUrl?: string;
}

export interface QRCodeBlock extends BaseBlock {
  type: 'qr_code';
  targetUrl: string;
  downloadLabel: string;
  foregroundColor?: string;
}

export type ProfileBlock =
  | StandardLinkBlock
  | FeaturedLinkBlock
  | CollectionBlock
  | ContactFormBlock
  | SocialIconsBlock
  | SupportBannerBlock
  | DiscountCodeBlock
  | QRCodeBlock;

export interface ProfileThemeConfig {
  id: string;
  name: string;
  palette: {
    background: string;
    cardBackground: string;
    primaryText: string;
    secondaryText: string;
    accentGold: string;
    border: string;
    buttonBackground: string;
    buttonText: string;
    buttonBorder?: string;
  };
  typography: {
    headingFont: HeadingFontFamily;
    bodyFont: BodyFontFamily;
    headingLetterSpacing?: 'tight' | 'normal' | 'wide' | 'widest';
    headingTransform?: 'none' | 'uppercase' | 'capitalize';
  };
  geometry: {
    buttonRadius: string;
    cardRadius: string;
    buttonStyle: ButtonStyle;
    buttonShadow?: 'none' | 'subtle' | 'colored_glow' | 'hard_offset';
  };
  backgroundConfig?: BackgroundConfig;
}

export type CardDesignPresetId = 
  | 'luxury_gold'
  | 'glassmorphism'
  | 'bento_tile'
  | 'cupertino_glass'
  | 'neo_brutalist'
  | 'claymorphism'
  | 'soft_neumorphic'
  | 'minimal_flat'
  | 'technical_mono'
  | 'swiss_grid'
  | 'aurora_glow'
  | 'y2k_chrome'
  | 'floating_elevation'
  | 'retro_editorial'
  | 'leather_stitch'
  | 'horology_gilded'
  | 'outline_pill'
  | 'cyber_neon'
  | 'compact_tile'
  | 'midnight_velvet'
  | 'wabi_sabi'
  | 'holographic_foil';

export interface CardDesignConfig {
  presetId: CardDesignPresetId;
  name: string;
  borderRadius: string;
  borderStyle: 'none' | 'subtle' | 'gold_accent' | 'brutalist_bold' | 'double_editorial' | 'glow' | 'dashed' | 'leather_stitch' | 'chrome_metallic' | 'rainbow_prism';
  shadowStyle: 'none' | 'soft' | 'floating' | 'gold_glow' | 'hard_brutalist' | 'neumorphic' | 'neon' | 'clay_3d' | 'ambient_spread' | 'inner_recessed';
  surfaceStyle: 'solid' | 'glass' | 'translucent' | 'gradient' | 'inset' | 'clay' | 'metallic' | 'linen';
  hoverEffect: 'lift' | 'scale' | 'glow' | 'invert' | 'shimmer' | 'bounce' | 'tilt';
  padding: 'compact' | 'normal' | 'spacious';
  accentColor?: string;
}

export interface AsoobiProfileDocument {
  id: string;
  handle: string;
  isVerified: boolean;
  status: 'draft' | 'published';
  meta: {
    title: string;
    bio: string;
    avatarUrl: string;
    avatarShape: AvatarShape;
    heroCoverUrl?: string;
    heroLayout: 'classic_minimal' | 'grand_editorial';
    location?: string;
  };
  theme: ProfileThemeConfig;
  cardDesign?: CardDesignConfig;
  blocks: ProfileBlock[];
}
