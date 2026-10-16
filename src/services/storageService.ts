/*
====================================================================
QUIETINK STORAGE & DATA PERSISTENCE SERVICE
====================================================================
FILE: src/services/storageService.ts
PURPOSE:
Provides client-side private storage for journal entries, time capsules,
letters to future me, user preferences, and growth garden metrics.

WHY LOCAL STORAGE:
QuietInk prioritizes digital solitude and privacy. Storing entries in
the user's browser ensures that thoughts stay on their own device
unless they explicitly choose to export or synchronize them.

FEATURES:
1. Complete CRUD operations for journal entries
2. Strict enforcement of Time Capsule locks (unlocks only when date is reached)
3. Letters to Future Me storage & unlock verification
4. Gentle Growth Garden statistics calculation
5. Full JSON export / backup and Markdown export
6. Initial peaceful sample entries with clear placeholders
====================================================================
*/

import {
  JournalEntry,
  TimeCapsule,
  FutureLetter,
  GrowthGardenData,
  UserProfile,
  ThemeId,
  EmotionalWeather,
  WritingMode
} from '../types/journal';
import { siteConfig } from '../config/siteConfig';

// Storage keys
const STORAGE_KEYS = {
  ENTRIES: "quietink_journal_entries_v1",
  TIME_CAPSULES: "quietink_time_capsules_v1",
  FUTURE_LETTERS: "quietink_future_letters_v1",
  GARDEN_DATA: "quietink_growth_garden_v1",
  USER_PROFILE: "quietink_user_profile_v1",
  ACTIVE_THEME: "quietink_active_theme_v1",
  FONT_SIZE: "quietink_font_size_v1",
  SOCIAL_LINKS: "quietink_social_links_v1",
};

// Initial peaceful seed entries so the user enters a welcoming space
const INITIAL_SEED_ENTRIES: JournalEntry[] = [
  {
    id: "entry-seed-1",
    title: "A quiet arrival in this digital sanctuary",
    content: "Today I stepped into QuietInk. In a world crowded with notifications, deadlines, and noisy feeds, having a peaceful screen that asks for nothing feels like taking a long, deep breath.\n\nI sat quietly for a few minutes listening to the rain. I am leaving this first note as a gentle reminder to myself: it is okay to move slowly. My thoughts deserve a quiet place.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    wordCount: 79,
    readingTimeMinutes: 1,
    emotionalWeather: "calm",
    writingMode: "free",
    tags: ["arrival", "peace", "reflection"],
    category: "Reflections",
    isFavorite: true,
    isArchived: false,
    atmosphereUsed: "rain"
  },
  {
    id: "entry-seed-2",
    title: "Three small gratitudes from this evening",
    content: "1. The golden light that fell across the kitchen table around five o'clock.\n2. A cup of warm peppermint tea held in both hands.\n3. The stillness after closing my work laptop.\n\nNot every day needs to be monumental. Sometimes it is enough to simply be present for the quiet moments that arrive between the hours.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    wordCount: 65,
    readingTimeMinutes: 1,
    emotionalWeather: "hopeful",
    writingMode: "gratitude",
    tags: ["gratitude", "evening", "stillness"],
    category: "Gratitude",
    isFavorite: false,
    isArchived: false,
    atmosphereUsed: "fireplace"
  }
];

// Initial seed time capsule
const INITIAL_SEED_CAPSULES: TimeCapsule[] = [
  {
    id: "capsule-seed-1",
    title: "Thoughts on where I hope to be",
    message: "If you are reading this, time has passed and seasons have changed. I hope you remember the things you were worrying about when you sealed this: most of them didn't happen, and the ones that did made you stronger. Remember to breathe and be gentle with yourself.",
    sealedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    unlockDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60).toISOString(), // 60 days in future
    isSealed: true,
    unlockNote: "A reminder written during a quiet evening of reflection."
  }
];

// Initial seed letter to future me
const INITIAL_SEED_LETTERS: FutureLetter[] = [
  {
    id: "letter-seed-1",
    recipient: "Future Me",
    opening: "Dear future me,",
    message: "Right now, I am sitting in front of QuietInk, thinking about who you might be. Are you still drinking tea in the morning? Did you take that walk in the forest? Whatever has happened since I wrote this, I hope you are proud of how far you've come.",
    writtenDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    scheduledOpenDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 180).toISOString(), // 6 months in future
    isOpened: false,
    category: "Personal Growth"
  }
];

class StorageService {
  // Safe reading from localStorage with fallback
  private get<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      if (!item) return defaultValue;
      return JSON.parse(item) as T;
    } catch (e) {
      console.warn(`QuietInk storage read warning for key ${key}:`, e);
      return defaultValue;
    }
  }

  // Safe writing to localStorage
  private set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`QuietInk storage write error for key ${key}:`, e);
    }
  }

  // --- JOURNAL ENTRIES CRUD ---

  public getEntries(): JournalEntry[] {
    const entries = this.get<JournalEntry[]>(STORAGE_KEYS.ENTRIES, []);
    if (entries.length === 0) {
      // Seed with welcoming initial entries
      this.set(STORAGE_KEYS.ENTRIES, INITIAL_SEED_ENTRIES);
      return INITIAL_SEED_ENTRIES;
    }
    return entries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public getEntryById(id: string): JournalEntry | undefined {
    const entries = this.getEntries();
    return entries.find((e) => e.id === id);
  }

  public saveEntry(entry: Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt' | 'wordCount' | 'readingTimeMinutes'> & { id?: string }): JournalEntry {
    const entries = this.getEntries();
    const now = new Date().toISOString();
    const words = entry.content.trim() ? entry.content.trim().split(/\s+/).length : 0;
    const readingTime = Math.max(1, Math.ceil(words / 200));

    if (entry.id) {
      // Update existing entry
      const index = entries.findIndex((e) => e.id === entry.id);
      if (index !== -1) {
        const updatedEntry: JournalEntry = {
          ...entries[index],
          ...entry,
          id: entry.id,
          updatedAt: now,
          wordCount: words,
          readingTimeMinutes: readingTime,
        };
        entries[index] = updatedEntry;
        this.set(STORAGE_KEYS.ENTRIES, entries);
        this.updateGrowthMetrics();
        return updatedEntry;
      }
    }

    // Create new entry
    const newEntry: JournalEntry = {
      ...entry,
      id: "entry-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
      createdAt: now,
      updatedAt: now,
      wordCount: words,
      readingTimeMinutes: readingTime,
    };

    entries.unshift(newEntry);
    this.set(STORAGE_KEYS.ENTRIES, entries);
    this.updateGrowthMetrics();
    return newEntry;
  }

  public deleteEntry(id: string): boolean {
    const entries = this.getEntries();
    const filtered = entries.filter((e) => e.id !== id);
    if (filtered.length !== entries.length) {
      this.set(STORAGE_KEYS.ENTRIES, filtered);
      this.updateGrowthMetrics();
      return true;
    }
    return false;
  }

  public toggleFavorite(id: string): boolean {
    const entries = this.getEntries();
    const entry = entries.find((e) => e.id === id);
    if (entry) {
      entry.isFavorite = !entry.isFavorite;
      this.set(STORAGE_KEYS.ENTRIES, entries);
      return entry.isFavorite;
    }
    return false;
  }

  // --- TIME CAPSULES ---

  public getTimeCapsules(): TimeCapsule[] {
    const capsules = this.get<TimeCapsule[]>(STORAGE_KEYS.TIME_CAPSULES, []);
    if (capsules.length === 0) {
      this.set(STORAGE_KEYS.TIME_CAPSULES, INITIAL_SEED_CAPSULES);
      return INITIAL_SEED_CAPSULES;
    }
    // Update sealed status based on real current date
    const now = new Date().getTime();
    return capsules.map((cap) => ({
      ...cap,
      isSealed: new Date(cap.unlockDate).getTime() > now
    }));
  }

  public saveTimeCapsule(title: string, message: string, unlockDate: string, unlockNote?: string): TimeCapsule {
    const capsules = this.getTimeCapsules();
    const newCapsule: TimeCapsule = {
      id: "capsule-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
      title: title.trim() || "Untitled Time Capsule",
      message: message.trim(),
      sealedAt: new Date().toISOString(),
      unlockDate,
      isSealed: new Date(unlockDate).getTime() > Date.now(),
      unlockNote: unlockNote?.trim()
    };
    capsules.unshift(newCapsule);
    this.set(STORAGE_KEYS.TIME_CAPSULES, capsules);
    this.updateGrowthMetrics();
    return newCapsule;
  }

  // --- LETTERS TO FUTURE ME ---

  public getFutureLetters(): FutureLetter[] {
    const letters = this.get<FutureLetter[]>(STORAGE_KEYS.FUTURE_LETTERS, []);
    if (letters.length === 0) {
      this.set(STORAGE_KEYS.FUTURE_LETTERS, INITIAL_SEED_LETTERS);
      return INITIAL_SEED_LETTERS;
    }
    return letters;
  }

  public saveFutureLetter(message: string, scheduledOpenDate: string, category?: string): FutureLetter {
    const letters = this.getFutureLetters();
    const newLetter: FutureLetter = {
      id: "letter-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
      recipient: "Future Me",
      opening: "Dear future me,",
      message: message.trim(),
      writtenDate: new Date().toISOString(),
      scheduledOpenDate,
      isOpened: false,
      category: category || "Reflection"
    };
    letters.unshift(newLetter);
    this.set(STORAGE_KEYS.FUTURE_LETTERS, letters);
    this.updateGrowthMetrics();
    return newLetter;
  }

  public markLetterOpened(id: string): void {
    const letters = this.getFutureLetters();
    const letter = letters.find((l) => l.id === id);
    if (letter) {
      letter.isOpened = true;
      this.set(STORAGE_KEYS.FUTURE_LETTERS, letters);
    }
  }

  // --- GROWTH GARDEN (Gentle metrics, no shame or streak pressure) ---

  public getGrowthGardenData(): GrowthGardenData {
    const entries = this.getEntries();
    const capsules = this.getTimeCapsules();
    const letters = this.getFutureLetters();

    const totalEntries = entries.length + capsules.length + letters.length;
    const totalWords = entries.reduce((sum, e) => sum + e.wordCount, 0);

    // Calculate gentle garden milestones
    const seedsPlanted = Math.min(30, totalEntries);
    const bloomingFlowers = Math.floor(totalWords / 250);
    const firefliesGathered = entries.filter((e) => e.emotionalWeather === 'quiet' || e.emotionalWeather === 'calm').length;
    const gentleLevel = Math.max(1, Math.floor(Math.sqrt(totalEntries * 2 + totalWords / 100)));

    return {
      totalEntries,
      totalWordsWritten: totalWords,
      seedsPlanted,
      bloomingFlowers,
      firefliesGathered,
      gentleLevel
    };
  }

  private updateGrowthMetrics(): void {
    const data = this.getGrowthGardenData();
    this.set(STORAGE_KEYS.GARDEN_DATA, data);
  }

  // --- USER PROFILE ---

  public getUserProfile(): UserProfile {
    return this.get<UserProfile>(STORAGE_KEYS.USER_PROFILE, {
      id: "user-default",
      name: "[YOUR NAME HERE]",
      tagline: "Seeker of quiet moments",
      email: "hello@example.com",
      bio: "Writing to slow down, reflect, and give my thoughts a quiet room.",
      joinedDate: new Date().toISOString(),
      privacyPasscodeEnabled: false
    });
  }

  public saveUserProfile(profile: Partial<UserProfile>): UserProfile {
    const current = this.getUserProfile();
    const updated = { ...current, ...profile };
    this.set(STORAGE_KEYS.USER_PROFILE, updated);
    return updated;
  }

  // --- THEME & PREFERENCES ---

  public getActiveTheme(): ThemeId {
    return this.get<ThemeId>(STORAGE_KEYS.ACTIVE_THEME, 'paper');
  }

  public setActiveTheme(theme: ThemeId): void {
    this.set(STORAGE_KEYS.ACTIVE_THEME, theme);
  }

  public getFontSize(): number {
    return this.get<number>(STORAGE_KEYS.FONT_SIZE, 18);
  }

  public setFontSize(size: number): void {
    this.set(STORAGE_KEYS.FONT_SIZE, size);
  }

  // --- SOCIAL MEDIA LINKS ---

  public getSocialLinks(): typeof siteConfig.socialLinks {
    return this.get<typeof siteConfig.socialLinks>(
      STORAGE_KEYS.SOCIAL_LINKS,
      siteConfig.socialLinks
    );
  }

  public saveSocialLinks(links: Partial<typeof siteConfig.socialLinks>): typeof siteConfig.socialLinks {
    const current = this.getSocialLinks();
    const updated = { ...current, ...links };
    this.set(STORAGE_KEYS.SOCIAL_LINKS, updated);
    return updated;
  }

  public resetSocialLinks(): typeof siteConfig.socialLinks {
    this.set(STORAGE_KEYS.SOCIAL_LINKS, siteConfig.socialLinks);
    return siteConfig.socialLinks;
  }

  // --- BACKUP & EXPORT ---

  public exportAllDataJSON(): string {
    const payload = {
      version: "1.0",
      exportDate: new Date().toISOString(),
      profile: this.getUserProfile(),
      entries: this.getEntries(),
      timeCapsules: this.getTimeCapsules(),
      futureLetters: this.getFutureLetters(),
      growth: this.getGrowthGardenData(),
    };
    return JSON.stringify(payload, null, 2);
  }

  public exportEntriesAsMarkdown(): string {
    const entries = this.getEntries();
    let md = `# QuietInk Journal Export\n\nExported on: ${new Date().toLocaleDateString()}\n\n---\n\n`;

    entries.forEach((e) => {
      md += `## ${e.title}\n\n`;
      md += `**Date:** ${new Date(e.createdAt).toLocaleString()} | **Weather:** ${e.emotionalWeather} | **Mode:** ${e.writingMode}\n`;
      if (e.tags && e.tags.length > 0) {
        md += `**Tags:** ${e.tags.map((t) => `#${t}`).join(' ')}\n`;
      }
      md += `\n${e.content}\n\n---\n\n`;
    });

    return md;
  }

  public clearAllData(): void {
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
  }
}

export const storageService = new StorageService();
