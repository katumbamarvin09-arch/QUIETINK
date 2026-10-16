/*
====================================================================
QUIETINK DATA MODELS & TYPES
====================================================================
FILE: src/types/journal.ts
PURPOSE:
Defines the structure of all core data entities across QuietInk.
Having clear TypeScript types ensures data integrity, prevents bugs,
and acts as a schema for future database backends (such as PostgreSQL,
SQLite, or MongoDB).

WHAT IS DEFINED HERE:
1. EmotionalWeather: Gentle atmospheric mood tags
2. WritingMode: Thematic writing styles (Gratitude, Reflection, etc.)
3. JournalEntry: A standard diary or reflection entry
4. TimeCapsule: A sealed memory locked until a future date
5. FutureLetter: A formal letter addressed to your future self
6. Theme: Visual color palette configurations
7. Atmosphere: Calm mode visual & audio environments
8. GrowthGardenData: Gentle statistics reflecting personal growth
====================================================================
*/

// Gentle atmospheric moods (never harsh medical scores)
export type EmotionalWeather =
  | 'bright'   // ☀️ Bright, clear, energized
  | 'calm'     // 🌤️ Calm, grounded, at peace
  | 'cloudy'   // 🌥️ Cloudy, contemplative, pondering
  | 'heavy'    // 🌧️ Heavy, processing difficult feelings
  | 'quiet'    // 🌙 Quiet, introspective, resting
  | 'hopeful'; // 🌈 Hopeful, looking forward

export interface EmotionalWeatherOption {
  id: EmotionalWeather;
  label: string;
  emoji: string;
  description: string;
  accentColor: string;
}

// Thematic writing styles with guided or open formats
export type WritingMode =
  | 'free'        // Open distraction-free writing
  | 'thoughts'    // Untangling spontaneous thoughts
  | 'gratitude'   // Noticing simple blessings
  | 'reflection'  // Looking back on an event or lesson
  | 'goals'       // Gentle aspirations without pressure
  | 'ideas'       // Creative sparks and musings
  | 'letter'      // Direct letters to self or others
  | 'daily';      // Daily rhythm journal

export interface WritingModeInfo {
  id: WritingMode;
  name: string;
  description: string;
  suggestedPrompt: string;
}

// Main Journal Entry entity
export interface JournalEntry {
  id: string;                    // Unique identifier (UUID or timestamp)
  title: string;                 // User-given entry title
  content: string;               // Journal body text (Markdown or plain text)
  createdAt: string;             // ISO Date string when entry was created
  updatedAt: string;             // ISO Date string when entry was last modified
  wordCount: number;             // Word count calculated automatically
  readingTimeMinutes: number;    // Estimated reading time
  emotionalWeather: EmotionalWeather; // Atmospheric mood of the day
  writingMode: WritingMode;      // Which mode was used to write
  tags: string[];                // User-defined tags (e.g., ["morning", "nature"])
  category: string;              // Primary category (e.g., "Personal", "Memories")
  isFavorite: boolean;           // Starred entry for quick access
  isArchived: boolean;           // Archived entries kept out of main view
  atmosphereUsed?: string;       // Atmosphere active during writing (e.g., "rain")
}

// Time Capsule entity (Sealed memory locked until a target unlock date)
export interface TimeCapsule {
  id: string;
  title: string;
  message: string;
  sealedAt: string;              // ISO Date string when sealed
  unlockDate: string;            // ISO Date string when it can be opened
  isSealed: boolean;             // True if currently before unlockDate
  unlockNote?: string;           // Optional note visible before opening
}

// Letter to Future Me entity
export interface FutureLetter {
  id: string;
  recipient: string;             // Typically "Future Me"
  opening: string;               // E.g. "Dear future me,"
  message: string;               // The body of the letter
  writtenDate: string;           // ISO Date string when written
  scheduledOpenDate: string;     // ISO Date string when to read
  isOpened: boolean;             // Whether the user has opened it after unlock
  category?: string;
}

// Quiet Garden (gentle growth metrics, zero streaks or punishment)
export interface GrowthGardenData {
  totalEntries: number;          // Total number of journal entries written
  totalWordsWritten: number;     // Total words penned in digital solitude
  seedsPlanted: number;          // Early thoughts planted
  bloomingFlowers: number;       // Fully expressed deep reflections
  firefliesGathered: number;     // Calm night-time entries written
  gentleLevel: number;           // Calculated peaceful progress indicator
}

// Calm Mode Atmosphere entity
export interface Atmosphere {
  id: string;
  name: string;
  description: string;
  iconName: string;              // Lucide icon name
  bgGradient: string;            // Tailwind gradient or CSS background
  canvasEffect: 'rain' | 'ocean' | 'fire' | 'forest' | 'stars' | 'sun' | 'library' | 'cafe';
  defaultSounds: { [soundId: string]: number }; // Default volume mix (0 to 1)
  quote: string;                 // Calming quote associated with the atmosphere
}

// Color Theme definitions
export type ThemeId =
  | 'paper'      // Warm cream paper notebook
  | 'black'      // Pitch Black (True OLED Black sanctuary)
  | 'midnight'   // Deep indigo and soft star white
  | 'forest'     // Earthy moss green and warm parchment
  | 'ocean'      // Serene deep marine and mist
  | 'cafe'       // Cozy roasted walnut and latte cream
  | 'minimal'    // Pure distraction-free monochrome
  | 'sunrise';   // Soft blush and morning amber

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  description: string;
  bgPage: string;                // Background for entire page
  bgCard: string;                // Background for cards / containers
  bgInput: string;               // Background for writing surface
  textPrimary: string;           // Main text color
  textSecondary: string;         // Subdued subtitle/meta text color
  accentColor: string;           // Gentle focal button/accent color
  borderColor: string;           // Subtle borders
}

// User Profile entity
export interface UserProfile {
  id: string;
  name: string;
  tagline: string;
  email: string;
  bio: string;
  joinedDate: string;
  privacyPasscodeEnabled: boolean;
  passcodeHash?: string;
}
