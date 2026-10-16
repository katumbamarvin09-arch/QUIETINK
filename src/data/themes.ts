/*
====================================================================
QUIETINK EXECUTIVE THEME PRESETS
====================================================================
FILE: src/data/themes.ts
PURPOSE:
Provides quiet, warm, luxurious, and executive color palettes.
Engineered with bespoke contrast, rich undertones, warm gold/champagne accents,
and tactile paper/obsidian surfaces.
====================================================================
*/

import { ThemeConfig, ThemeId } from '../types/journal';

// ===== QUIETINK EXECUTIVE LUXURY PALETTES =====
export const themes: Record<ThemeId, ThemeConfig> = {
  paper: {
    id: 'paper',
    name: 'Executive Cashmere',
    description: 'Warm Italian ivory parchment, aged cognac leather ink, and brushed champagne gold.',
    bgPage: '#F8F5EE',       // Rich warm ivory cashmere
    bgCard: '#FFFFFF',       // Crisp clean writing paper
    bgInput: '#FCFAF5',      // Gentle warm ivory surface
    textPrimary: '#1E1B18',  // Deep tailored espresso charcoal
    textSecondary: '#6E655C',// Muted warm umber
    accentColor: '#B8860B',  // Warm brushed champagne gold
    borderColor: '#E8E0D2'   // Tailored warm hairline border
  },
  black: {
    id: 'black',
    name: 'Executive Onyx',
    description: 'True OLED pitch black sanctuary with crisp ivory typography and radiant champagne gold.',
    bgPage: '#000000',       // Pure OLED pitch black
    bgCard: '#0A0A0C',       // Polished obsidian card
    bgInput: '#121215',      // Matte writing surface
    textPrimary: '#FBFBFB',  // Pure platinum ivory
    textSecondary: '#9E9E9E',// Brushed silver titanium
    accentColor: '#D4AF37',  // Radiant 24k champagne gold
    borderColor: '#24242A'   // Subdued dark titanium border
  },
  midnight: {
    id: 'midnight',
    name: 'Midnight Bespoke',
    description: 'Bespoke tailored midnight wool, frosted sapphire crystal, and gilded brass.',
    bgPage: '#090D16',       // Deep midnight wool
    bgCard: '#101625',       // Tailored navy sapphire card
    bgInput: '#151D30',      // Nightfall writing surface
    textPrimary: '#F1F5F9',  // Starlight ivory
    textSecondary: '#94A3B8',// Soft slate mist
    accentColor: '#D1A75B',  // Gilded antique brass
    borderColor: '#1D273D'   // Subtle tailored border
  },
  forest: {
    id: 'forest',
    name: 'Verdant Salon',
    description: 'Deep gentleman’s club forest velvet, antique bookbinding, and warm brass accents.',
    bgPage: '#0A1410',       // Deep woodland velvet
    bgCard: '#12211A',       // Antique walnut study card
    bgInput: '#172A22',      // Deep moss writing surface
    textPrimary: '#E6F0EB',  // Vintage parchment ivory
    textSecondary: '#8CA899',// Muted sage lichen
    accentColor: '#D4A853',  // Burnished warm gold
    borderColor: '#21392D'   // Library shelf border
  },
  ocean: {
    id: 'ocean',
    name: 'Executive Marine',
    description: 'Private yacht midnight blue, titanium borders, and coastal champagne gold.',
    bgPage: '#06101B',       // Deep maritime abyss
    bgCard: '#0D1C2E',       // Frosted navy crystal
    bgInput: '#12263D',      // Deep coastal writing surface
    textPrimary: '#E2F0FB',  // Crisp sea mist ivory
    textSecondary: '#86A5C2',// Subdued coastal slate
    accentColor: '#C5A059',  // Warm champagne gold
    borderColor: '#193452'   // Titanium marine border
  },
  cafe: {
    id: 'cafe',
    name: 'Cognac & Walnut',
    description: 'Fine aged cognac, roasted cocoa bean, warm amber tobacco, and cashmere.',
    bgPage: '#F6EFE9',       // Warm roasted cashmere
    bgCard: '#EFE4DA',       // Antique cedar & parchment card
    bgInput: '#FAF5F0',      // Steamed milk writing surface
    textPrimary: '#2C1D14',  // Roasted espresso bean
    textSecondary: '#6B5344',// Warm cigar tobacco
    accentColor: '#A05924',  // Rich aged cognac amber
    borderColor: '#DDC9B8'   // Warm walnut border
  },
  minimal: {
    id: 'minimal',
    name: 'Executive Monolith',
    description: 'Sleek architectural gallery white with high-contrast jet black serif typography.',
    bgPage: '#FAFAFA',       // Pristine gallery white
    bgCard: '#FFFFFF',       // High-end portfolio card
    bgInput: '#FFFFFF',      // Pure minimalist page
    textPrimary: '#0F172A',  // Architectural jet ink
    textSecondary: '#52525B',// Executive graphite
    accentColor: '#8C6D58',  // Warm architectural bronze
    borderColor: '#E4E4E7'   // Crisp gallery hairline border
  },
  sunrise: {
    id: 'sunrise',
    name: 'Champagne Dawn',
    description: 'Warm champagne glow, morning rosewood, and amber reflections.',
    bgPage: '#FAF4EE',       // Champagne morning ivory
    bgCard: '#F4E8DC',       // Soft rosewood card
    bgInput: '#FCF8F4',      // Sunrise parchment
    textPrimary: '#2D1C12',  // Warm roasted hazelnut
    textSecondary: '#855F4C',// Dusty terracotta rose
    accentColor: '#C67D3B',  // Radiant morning amber gold
    borderColor: '#EBD6C3'   // Soft morning border
  }
};

export const themeList: ThemeConfig[] = Object.values(themes);

export function getThemeById(id: ThemeId): ThemeConfig {
  return themes[id] || themes.paper;
}
