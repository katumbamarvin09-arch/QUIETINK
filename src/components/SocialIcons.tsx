/*
====================================================================
QUIETINK SOCIAL MEDIA ICONS & CONNECT COMPONENT
====================================================================
FILE: src/components/SocialIcons.tsx
PURPOSE:
Renders elegant, theme-aware social media icon badges and links.
Supports modern vector icons for X (Twitter), Instagram, GitHub,
LinkedIn, YouTube, Substack, Discord, Facebook, TikTok, Bluesky,
WhatsApp, and Email.

HOW TO CUSTOMIZE:
1. In VS Code, open `src/config/siteConfig.ts`
2. Update the `socialLinks` object with your handles or profile URLs
3. To hide any platform, leave its value as an empty string `""`
====================================================================
*/

import React, { useState } from 'react';
import { Share2, Check, ExternalLink } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { ThemeConfig } from '../types/journal';

export type SocialPlatformId =
  | 'twitter'
  | 'instagram'
  | 'github'
  | 'linkedin'
  | 'youtube'
  | 'substack'
  | 'discord'
  | 'facebook'
  | 'tiktok'
  | 'bluesky'
  | 'whatsapp'
  | 'email';

export interface SocialLinkItem {
  id: SocialPlatformId;
  name: string;
  url: string;
  ariaLabel: string;
  brandColor?: string;
}

interface SocialIconsProps {
  activeTheme: ThemeConfig;
  variant?: 'circle' | 'pill' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  customLinks?: Partial<Record<SocialPlatformId, string>>;
  showShareButton?: boolean;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

// Pixel-perfect SVG Vector paths for social media platforms
export const SocialPlatformIcons: Record<
  SocialPlatformId,
  (props: { className?: string; style?: React.CSSProperties }) => React.JSX.Element
> = {
  // X (formerly Twitter)
  twitter: ({ className = 'w-4 h-4', style }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),

  // Instagram
  instagram: ({ className = 'w-4 h-4', style }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  ),

  // GitHub
  github: ({ className = 'w-4 h-4', style }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  ),

  // LinkedIn
  linkedin: ({ className = 'w-4 h-4', style }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  ),

  // YouTube
  youtube: ({ className = 'w-4 h-4', style }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),

  // Substack
  substack: ({ className = 'w-4 h-4', style }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} aria-hidden="true">
      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
    </svg>
  ),

  // Discord
  discord: ({ className = 'w-4 h-4', style }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} aria-hidden="true">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  ),

  // Facebook
  facebook: ({ className = 'w-4 h-4', style }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),

  // TikTok
  tiktok: ({ className = 'w-4 h-4', style }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} aria-hidden="true">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  ),

  // Bluesky
  bluesky: ({ className = 'w-4 h-4', style }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} aria-hidden="true">
      <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.879.139 2.608 0 4.078 0 5.626c0 1.549.49 9.176 1.054 10.635 1.737 4.492 7.026 5.632 9.873 2.639-1.071 1.439-1.299 3.064-.673 3.655 1.057.998 4.254-.741 5.746-4.57 1.492 3.829 4.689 5.568 5.746 4.57.626-.591.398-2.216-.673-3.655 2.847 2.993 8.136 1.853 9.873-2.639.564-1.459 1.054-9.086 1.054-10.635 0-1.548-.139-3.018-.902-3.747-.659-.613-1.664-.935-4.3 1.026-2.752 1.942-5.711 5.881-6.798 7.995z" />
    </svg>
  ),

  // WhatsApp
  whatsapp: ({ className = 'w-4 h-4', style }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} aria-hidden="true">
      <path d="M12.004 2C6.48 2 2 6.48 2 12.003c0 1.93.55 3.73 1.5 5.26L2 22l4.91-1.45c1.47.85 3.19 1.45 5.094 1.45 5.524 0 10.004-4.48 10.004-10.003C22.008 6.48 17.528 2 12.004 2zm5.83 14.15c-.24.68-1.21 1.3-1.74 1.38-.5.08-1.12.11-3.62-.91-3.2-1.31-5.26-4.58-5.42-4.8-.16-.21-1.3-1.74-1.3-3.32 0-1.58.82-2.36 1.11-2.68.29-.32.64-.4.85-.4.21 0 .43 0 .61.01.2.01.47-.08.73.55.27.64.91 2.22.99 2.38.08.16.13.35.03.56-.1.21-.16.35-.32.53-.16.19-.34.42-.48.56-.16.16-.33.33-.14.65.19.32.84 1.39 1.81 2.25 1.25 1.11 2.31 1.46 2.63 1.62.32.16.51.13.7-.08.19-.21.8-1.01 1.01-1.36.21-.35.43-.29.72-.19.29.11 1.86.88 2.18 1.04.32.16.53.24.61.37.08.14.08.8-.16 1.48z" />
    </svg>
  ),

  // Email
  email: ({ className = 'w-4 h-4', style }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
};

export const PLATFORM_METADATA: Record<
  SocialPlatformId,
  { label: string; placeholder: string; brandColor: string }
> = {
  twitter: {
    label: 'X (Twitter)',
    placeholder: 'https://x.com/yourhandle',
    brandColor: '#000000',
  },
  instagram: {
    label: 'Instagram',
    placeholder: 'https://instagram.com/yourhandle',
    brandColor: '#E1306C',
  },
  github: {
    label: 'GitHub',
    placeholder: 'https://github.com/yourhandle',
    brandColor: '#24292F',
  },
  linkedin: {
    label: 'LinkedIn',
    placeholder: 'https://linkedin.com/in/yourhandle',
    brandColor: '#0A66C2',
  },
  youtube: {
    label: 'YouTube',
    placeholder: 'https://youtube.com/@yourhandle',
    brandColor: '#FF0000',
  },
  substack: {
    label: 'Substack',
    placeholder: 'https://yourhandle.substack.com',
    brandColor: '#FF6719',
  },
  discord: {
    label: 'Discord',
    placeholder: 'https://discord.gg/yourinvite',
    brandColor: '#5865F2',
  },
  facebook: {
    label: 'Facebook',
    placeholder: 'https://facebook.com/yourhandle',
    brandColor: '#1877F2',
  },
  tiktok: {
    label: 'TikTok',
    placeholder: 'https://tiktok.com/@yourhandle',
    brandColor: '#000000',
  },
  bluesky: {
    label: 'Bluesky',
    placeholder: 'https://bsky.app/profile/yourhandle.bsky.social',
    brandColor: '#0285FF',
  },
  whatsapp: {
    label: 'WhatsApp',
    placeholder: 'https://wa.me/1234567890',
    brandColor: '#25D366',
  },
  email: {
    label: 'Email',
    placeholder: 'mailto:hello@example.com',
    brandColor: '#EA4335',
  },
};

export const SocialIcons: React.FC<SocialIconsProps> = ({
  activeTheme,
  variant = 'circle',
  size = 'md',
  customLinks,
  showShareButton = false,
  className = '',
  align = 'center',
}) => {
  const [copied, setCopied] = useState(false);

  // Retrieve stored links or fallback to siteConfig
  const linksSource = {
    ...siteConfig.socialLinks,
    ...customLinks,
  };

  // Build the list of active links
  const activeItems: SocialLinkItem[] = [];
  (Object.keys(PLATFORM_METADATA) as SocialPlatformId[]).forEach((platform) => {
    const rawVal = linksSource[platform as keyof typeof linksSource];
    if (rawVal && typeof rawVal === 'string' && rawVal.trim().length > 0) {
      let finalUrl = rawVal.trim();
      if (platform === 'email' && !finalUrl.startsWith('mailto:')) {
        finalUrl = `mailto:${finalUrl}`;
      }
      activeItems.push({
        id: platform,
        name: PLATFORM_METADATA[platform].label,
        url: finalUrl,
        ariaLabel: `Visit ${PLATFORM_METADATA[platform].label}`,
        brandColor: PLATFORM_METADATA[platform].brandColor,
      });
    }
  });

  const handleShare = async () => {
    const shareData = {
      title: siteConfig.siteName,
      text: siteConfig.siteTagline,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Ignored
    }
  };

  // Sizing definitions
  const sizeClasses = {
    sm: {
      button: 'w-7 h-7 text-xs',
      icon: 'w-3.5 h-3.5',
      pill: 'px-2.5 py-1 text-[11px] gap-1.5',
    },
    md: {
      button: 'w-9 h-9 text-sm',
      icon: 'w-4 h-4',
      pill: 'px-3 py-1.5 text-xs gap-2',
    },
    lg: {
      button: 'w-11 h-11 text-base',
      icon: 'w-5 h-5',
      pill: 'px-4 py-2 text-sm gap-2.5',
    },
  }[size];

  const alignmentClass = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  }[align];

  if (activeItems.length === 0 && !showShareButton) {
    return null;
  }

  return (
    <div
      id="quietink-social-icons-bar"
      className={`flex flex-wrap items-center ${alignmentClass} gap-2.5 ${className}`}
    >
      {activeItems.map((item) => {
        const IconComponent = SocialPlatformIcons[item.id];

        if (variant === 'pill') {
          return (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.ariaLabel}
              title={item.name}
              className={`inline-flex items-center rounded-full border font-sans font-medium transition-all duration-200 hover:scale-105 shadow-2xs hover:shadow-xs group ${sizeClasses.pill}`}
              style={{
                backgroundColor: activeTheme.bgCard,
                borderColor: activeTheme.borderColor,
                color: activeTheme.textPrimary,
              }}
            >
              <span className="transition-transform group-hover:scale-110">
                <IconComponent className={sizeClasses.icon} />
              </span>
              <span>{item.name}</span>
            </a>
          );
        }

        if (variant === 'minimal') {
          return (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.ariaLabel}
              title={item.name}
              className="p-1.5 rounded-lg opacity-75 hover:opacity-100 transition-all duration-200 hover:scale-110 cursor-pointer"
              style={{ color: activeTheme.textPrimary }}
            >
              <IconComponent className={sizeClasses.icon} />
            </a>
          );
        }

        // Default 'circle' variant
        return (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.ariaLabel}
            title={item.name}
            className={`rounded-full border flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-2xs hover:shadow-xs group cursor-pointer ${sizeClasses.button}`}
            style={{
              backgroundColor: activeTheme.bgCard,
              borderColor: activeTheme.borderColor,
              color: activeTheme.textPrimary,
            }}
          >
            <span className="transition-transform group-hover:scale-115">
              <IconComponent className={sizeClasses.icon} />
            </span>
          </a>
        );
      })}

      {/* Optional Share button */}
      {showShareButton && (
        <button
          onClick={handleShare}
          title={copied ? 'Link copied to clipboard!' : 'Share QuietInk Sanctuary'}
          aria-label="Share Sanctuary"
          className={`rounded-full border flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-2xs cursor-pointer ${sizeClasses.button}`}
          style={{
            backgroundColor: copied ? activeTheme.accentColor : activeTheme.bgCard,
            borderColor: activeTheme.borderColor,
            color: copied ? '#FFFFFF' : activeTheme.textPrimary,
          }}
        >
          {copied ? (
            <Check className={sizeClasses.icon} />
          ) : (
            <Share2 className={sizeClasses.icon} />
          )}
        </button>
      )}
    </div>
  );
};
