/*
====================================================================
QUIETINK CENTRAL CONFIGURATION FILE
====================================================================
FILE: src/config/siteConfig.ts
PURPOSE:
This file holds all major brand settings, customizable placeholders,
theme presets, and defaults for the QuietInk platform.
By editing this single file, you can personalize your entire site's
name, tagline, owner details, social links, and theme accents
without having to search through dozens of different components.

WHERE TO SAVE:
Save in: src/config/siteConfig.ts

WHAT YOU CAN CUSTOMIZE:
- siteName: The display name of your website
- siteTagline: The core slogan or peaceful philosophy
- ownerName: Your personal or organization name
- contactEmail: Your public contact or feedback email
- copyrightText: Displayed in the website footer
- socialLinks: Links to your Instagram, X/Twitter, GitHub, etc.
- defaultTheme: Initial color mood ('paper', 'midnight', 'forest', etc.)
====================================================================
*/

// ===== QUIETINK CUSTOMIZATION AREA =====
// Replace the values below with your own personal or project information.
export const siteConfig = {
  // Brand Identity
  siteName: "QuietInk", // [YOUR WEBSITE NAME] - e.g. "QuietInk"
  siteTagline: "Give Your Thoughts a Quiet Place.", // [YOUR TAGLINE]
  siteShortDescription:
    "A peaceful digital sanctuary crafted for personal reflection, daily writing, and mindful digital solitude.", // [YOUR ABOUT TEXT]

  // Owner & Contact Information
  ownerName: "MARVIN", // [YOUR NAME] - replace with your name or pen name
  ownerTitle: "Creator of QuietInk", // [YOUR TITLE]
  contactEmail: "katumbamarvin@gmail.com", // [YOUR EMAIL] - replace with your contact email

  // Copyright and Legal Notice
  copyrightText: "© 2026 QuietInk. All thoughts remain your private sanctuary.", // [YOUR COPYRIGHT TEXT]

  // Assets and Media Placeholders
  // Place your own images inside the 'public/images/' directory
  logoPath: "/images/quietink-logo.svg", // [YOUR LOGO]
  faviconPath: "/favicon.ico", // [YOUR FAVICON]
  defaultProfileImage: "/images/default-avatar.png", // [YOUR PROFILE IMAGE]

  // Social Media Links (Set to empty string "" to hide any platform)
  // Edit these links to match your profiles.
  socialLinks: {
    twitter: "https://x.com/yourhandle", // X / Twitter profile
    instagram: "https://instagram.com/yourhandle", // Instagram profile
    github: "https://github.com/yourhandle", // GitHub repository or profile
    linkedin: "https://linkedin.com/in/yourhandle", // LinkedIn profile
    youtube: "https://youtube.com/@yourhandle", // YouTube channel
    substack: "https://yourhandle.substack.com", // Substack newsletter
    discord: "", // Discord server invite (e.g. "https://discord.gg/yourinvite")
    facebook: "", // Facebook page or profile
    tiktok: "", // TikTok profile
    bluesky: "", // Bluesky profile
    whatsapp: "", // WhatsApp chat link
    email: "hello@example.com", // Contact email address
  },

  // Default Application Preferences
  preferences: {
    defaultTheme: "paper" as const, // Options: 'paper' | 'black' | 'midnight' | 'forest' | 'ocean' | 'cafe' | 'minimal' | 'sunrise'
    defaultFontFamily: "Lora, serif", // Options: 'Lora, serif' | 'Plus Jakarta Sans, sans-serif'
    defaultFontSize: 18, // In pixels (16, 18, 20, 22)
    defaultLineHeight: 1.75, // For comfortable reading and writing
    autosaveIntervalMs: 2000, // Autosave every 2 seconds while typing
    enableAmbientSoundByDefault: false, // Start with sound off for respectful quietness
    defaultEmotionalWeather: "calm" as const,
  },

  // Privacy & Storage Principles
  privacy: {
    isLocalOnlyDefault: true, // Stores all user journals privately in browser storage
    encryptionNote:
      "Client-side private storage active. No unauthorized third-party telemetry.",
    cloudSyncPlanned: true,
  },

  // Reflections from the Quiet Room (With customizable round picture slots)
  // Put someone's picture path or image URL in 'pictureUrl'
  reflections: [
    {
      id: "reflection-1",
      quote:
        "QuietInk feels like stepping into a private mahogany library late at night. It gave my thoughts the quiet space and executive clarity I needed each morning.",
      author: "Elena Rostova",
      role: "Novelist & Essayist",
      pictureUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    },
    {
      id: "reflection-2",
      quote:
        "The Time Capsule feature brought tears to my eyes when my six-month note unlocked. In a world full of noise, this sanctuary protects what truly matters.",
      author: "Marcus Vance",
      role: "Architect & Creative Director",
      pictureUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    },
  ],
};

export type SiteConfig = typeof siteConfig;
