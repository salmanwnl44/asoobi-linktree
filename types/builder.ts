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
export type ButtonStyle = 'solid' | 'outline' | 'soft' | 'glass' | 'shadow_gold';
export type AvatarShape = 'circle' | 'rounded' | 'squircle' | 'hexagon';

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
  };
  typography: {
    headingFont: 'Playfair Display' | 'Inter';
    bodyFont: 'Inter';
  };
  geometry: {
    buttonRadius: string;
    cardRadius: string;
    buttonStyle: ButtonStyle;
  };
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
  blocks: ProfileBlock[];
}
