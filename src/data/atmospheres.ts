/*
====================================================================
QUIETINK CALM MODE ATMOSPHERES
====================================================================
FILE: src/data/atmospheres.ts
PURPOSE:
Defines the 8 signature Calm Mode environments in QuietInk.
Each atmosphere contains visual gradients, canvas particles,
quotes, and default ambient sound presets.

HOW TO CUSTOMIZE:
You can edit the quotes, default sound volumes, or add your own
custom atmosphere objects.
If you have custom background photos or audio files, you can place
them into:
  - public/images/atmospheres/[name].jpg
  - public/audio/[sound].mp3
====================================================================
*/

import { Atmosphere } from '../types/journal';

// ===== QUIETINK CUSTOMIZATION AREA =====
export const atmospheres: Atmosphere[] = [
  {
    id: "rain",
    name: "Rainy Window",
    description: "Gentle rain tapping softly against a warm windowpane.",
    iconName: "CloudRain",
    bgGradient: "from-[#1e293b] via-[#0f172a] to-[#020617]",
    canvasEffect: "rain",
    defaultSounds: {
      rain: 0.75,
      wind: 0.2,
      piano: 0.15
    },
    quote: "The sound of rain needs no translation. It simply washes away the day."
  },
  {
    id: "ocean",
    name: "Ocean Mist",
    description: "Rhythmic tides rolling along a deserted evening shore.",
    iconName: "Waves",
    bgGradient: "from-[#0c4a6e] via-[#082f49] to-[#021d30]",
    canvasEffect: "ocean",
    defaultSounds: {
      ocean: 0.8,
      wind: 0.25
    },
    quote: "Like the sea, your mind can be still in the depths even when waves stir the surface."
  },
  {
    id: "forest",
    name: "Deep Forest",
    description: "Sunlight filtering through mossy cedar trees and quiet pine needle paths.",
    iconName: "Trees",
    bgGradient: "from-[#143423] via-[#0b2014] to-[#051109]",
    canvasEffect: "forest",
    defaultSounds: {
      forest: 0.85,
      wind: 0.3
    },
    quote: "The trees never hurry. Yet every branch reaches the light in its own time."
  },
  {
    id: "fireplace",
    name: "Hearth & Embers",
    description: "A softly crackling wood fire in a quiet, cozy study.",
    iconName: "Flame",
    bgGradient: "from-[#451a03] via-[#2a0f02] to-[#120501]",
    canvasEffect: "fire",
    defaultSounds: {
      fireplace: 0.8,
      piano: 0.2
    },
    quote: "In the gentle warmth of embers, the scattered thoughts of the day find rest."
  },
  {
    id: "cafe",
    name: "Quiet Café",
    description: "A rainy afternoon corner booth with the distant aroma of roasted coffee.",
    iconName: "Coffee",
    bgGradient: "from-[#382216] via-[#24140b] to-[#130b06]",
    canvasEffect: "cafe",
    defaultSounds: {
      cafe: 0.65,
      rain: 0.4
    },
    quote: "Surrounded by quiet strangers, each carrying their own untold story."
  },
  {
    id: "midnight",
    name: "Midnight Solitude",
    description: "Deep indigo twilight beneath a silent dome of stars.",
    iconName: "Moon",
    bgGradient: "from-[#111827] via-[#090d16] to-[#030712]",
    canvasEffect: "stars",
    defaultSounds: {
      wind: 0.3,
      piano: 0.35
    },
    quote: "Night is when the world steps aside so you can hear yourself think."
  },
  {
    id: "sunrise",
    name: "Golden Sunrise",
    description: "Soft dawn light awakening a calm and promising horizon.",
    iconName: "Sun",
    bgGradient: "from-[#7c2d12] via-[#431407] to-[#1c0a03]",
    canvasEffect: "sun",
    defaultSounds: {
      forest: 0.5,
      wind: 0.2
    },
    quote: "Each sunrise is an unwritten page, offering you a fresh, gentle beginning."
  },
  {
    id: "library",
    name: "Old Library",
    description: "Dust motes dancing in sunbeams between rows of leather-bound books.",
    iconName: "BookOpen",
    bgGradient: "from-[#292524] via-[#1c1917] to-[#0c0a09]",
    canvasEffect: "library",
    defaultSounds: {
      piano: 0.4,
      wind: 0.15
    },
    quote: "A room of quiet books is a sanctuary where thousands of minds whisper in peace."
  }
];

export function getAtmosphereById(id: string): Atmosphere {
  return atmospheres.find((a) => a.id === id) || atmospheres[0];
}
