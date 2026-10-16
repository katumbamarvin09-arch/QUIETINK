/*
====================================================================
QUIETINK PERSONAL JOURNAL DASHBOARD
====================================================================
FILE: src/components/JournalDashboard.tsx
PURPOSE:
The personal home base for the journaler. Presents a peaceful overview
of recent thoughts, favorite memories, emotional weather, and sealed
capsules without overwhelming dashboards or toxic streak gamification.

WHAT YOU CAN CUSTOMIZE:
- Greeting logic and messages
- Category filters
- Layout cards and metrics
====================================================================
*/

import React, { useState } from 'react';
import {
  PenLine,
  Search,
  Star,
  Clock,
  Mail,
  Flower2,
  Calendar,
  Sparkles,
  BookOpen,
  ArrowRight,
  Filter,
  Trash2
} from 'lucide-react';
import {
  JournalEntry,
  TimeCapsule,
  FutureLetter,
  GrowthGardenData,
  ThemeConfig,
  EmotionalWeather
} from '../types/journal';

interface JournalDashboardProps {
  activeTheme: ThemeConfig;
  userName: string;
  entries: JournalEntry[];
  timeCapsules: TimeCapsule[];
  futureLetters: FutureLetter[];
  gardenData: GrowthGardenData;
  onNewEntry: (initialMode?: string) => void;
  onOpenEntry: (entry: JournalEntry) => void;
  onDeleteEntry: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onNavigate: (view: string) => void;
}

// Gentle Emotional Weather definitions
const EMOTIONAL_WEATHER_ITEMS: { id: EmotionalWeather; label: string; emoji: string; desc: string }[] = [
  { id: 'bright', label: 'Bright', emoji: '☀️', desc: 'Clear, energized, sunlit' },
  { id: 'calm', label: 'Calm', emoji: '🌤️', desc: 'Grounded, peaceful, steady' },
  { id: 'cloudy', label: 'Cloudy', emoji: '🌥️', desc: 'Pondering, contemplative' },
  { id: 'heavy', label: 'Heavy', emoji: '🌧️', desc: 'Processing weight or sorrow' },
  { id: 'quiet', label: 'Quiet', emoji: '🌙', desc: 'Restful, silent, nocturnal' },
  { id: 'hopeful', label: 'Hopeful', emoji: '🌈', desc: 'Looking forward with warmth' },
];

export const JournalDashboard: React.FC<JournalDashboardProps> = ({
  activeTheme,
  userName,
  entries,
  timeCapsules,
  futureLetters,
  gardenData,
  onNewEntry,
  onOpenEntry,
  onDeleteEntry,
  onToggleFavorite,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWeather, setSelectedWeather] = useState<EmotionalWeather | 'all'>('all');

  // Friendly time-of-day greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const currentDateFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Filter entries based on search and selected weather
  const filteredEntries = entries.filter((e) => {
    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesWeather = selectedWeather === 'all' || e.emotionalWeather === selectedWeather;
    return matchesSearch && matchesWeather;
  });

  const favoriteEntries = entries.filter((e) => e.isFavorite);
  const sealedCapsuleCount = timeCapsules.filter((c) => c.isSealed).length;
  const pendingLettersCount = futureLetters.filter((l) => !l.isOpened).length;

  return (
    <div id="journal-dashboard-root" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      {/* 1. PEACEFUL GREETING & DATE HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b gap-4" style={{ borderColor: activeTheme.borderColor }}>
        <div>
          <span className="text-xs uppercase tracking-widest font-sans block mb-1" style={{ color: activeTheme.textSecondary }}>
            {currentDateFormatted}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight" style={{ color: activeTheme.textPrimary }}>
            {getGreeting()}, <span className="italic">{userName || '[YOUR NAME]'}</span>.
          </h1>
          <p className="font-sans text-sm mt-2" style={{ color: activeTheme.textSecondary }}>
            Welcome back to your quiet room. What would you like to reflect on today?
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <button
            id="quick-write-btn"
            onClick={() => onNewEntry('free')}
            className="px-5 py-2.5 rounded-full text-xs font-medium cursor-pointer transition-all shadow-xs flex items-center space-x-2"
            style={{
              backgroundColor: activeTheme.accentColor,
              color: '#FFFFFF'
            }}
          >
            <PenLine className="w-3.5 h-3.5" />
            <span>New Entry</span>
          </button>
        </div>
      </div>

      {/* 2. EMOTIONAL WEATHER SELECTOR */}
      <div className="py-6 border-b" style={{ borderColor: activeTheme.borderColor }}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium tracking-wide uppercase" style={{ color: activeTheme.textSecondary }}>
            Emotional Weather Filter
          </span>
          {selectedWeather !== 'all' && (
            <button
              onClick={() => setSelectedWeather('all')}
              className="text-xs hover:underline cursor-pointer"
              style={{ color: activeTheme.accentColor }}
            >
              Show all weather
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {EMOTIONAL_WEATHER_ITEMS.map((item) => {
            const isSelected = selectedWeather === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedWeather(isSelected ? 'all' : item.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-sans flex items-center space-x-2 border transition-all cursor-pointer ${
                  isSelected ? 'shadow-xs font-medium' : 'hover:opacity-80'
                }`}
                style={{
                  backgroundColor: isSelected ? activeTheme.borderColor : activeTheme.bgCard,
                  borderColor: isSelected ? activeTheme.accentColor : activeTheme.borderColor,
                  color: activeTheme.textPrimary
                }}
                title={item.desc}
              >
                <span>{item.emoji}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. GENTLE STATISTICS (NO STREAK SHAME) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-8">
        <div
          className="p-4 rounded-xl border text-left"
          style={{ backgroundColor: activeTheme.bgCard, borderColor: activeTheme.borderColor }}
        >
          <span className="text-[11px] uppercase tracking-wider block mb-1" style={{ color: activeTheme.textSecondary }}>
            Journal Entries
          </span>
          <span className="font-serif text-2xl font-medium" style={{ color: activeTheme.textPrimary }}>
            {gardenData.totalEntries}
          </span>
          <span className="text-[11px] block mt-0.5" style={{ color: activeTheme.textSecondary }}>
            Thoughts written down
          </span>
        </div>

        <div
          className="p-4 rounded-xl border text-left"
          style={{ backgroundColor: activeTheme.bgCard, borderColor: activeTheme.borderColor }}
        >
          <span className="text-[11px] uppercase tracking-wider block mb-1" style={{ color: activeTheme.textSecondary }}>
            Words Penned
          </span>
          <span className="font-serif text-2xl font-medium" style={{ color: activeTheme.textPrimary }}>
            {gardenData.totalWordsWritten.toLocaleString()}
          </span>
          <span className="text-[11px] block mt-0.5" style={{ color: activeTheme.textSecondary }}>
            In digital solitude
          </span>
        </div>

        <div
          className="p-4 rounded-xl border text-left cursor-pointer hover:opacity-90"
          onClick={() => onNavigate('capsules')}
          style={{ backgroundColor: activeTheme.bgCard, borderColor: activeTheme.borderColor }}
        >
          <span className="text-[11px] uppercase tracking-wider block mb-1" style={{ color: activeTheme.textSecondary }}>
            Time Capsules
          </span>
          <span className="font-serif text-2xl font-medium" style={{ color: activeTheme.textPrimary }}>
            {sealedCapsuleCount}
          </span>
          <span className="text-[11px] block mt-0.5" style={{ color: activeTheme.accentColor }}>
            Sealed memories
          </span>
        </div>

        <div
          className="p-4 rounded-xl border text-left cursor-pointer hover:opacity-90"
          onClick={() => onNavigate('garden')}
          style={{ backgroundColor: activeTheme.bgCard, borderColor: activeTheme.borderColor }}
        >
          <span className="text-[11px] uppercase tracking-wider block mb-1" style={{ color: activeTheme.textSecondary }}>
            Quiet Garden
          </span>
          <span className="font-serif text-2xl font-medium" style={{ color: activeTheme.textPrimary }}>
            Level {gardenData.gentleLevel}
          </span>
          <span className="text-[11px] block mt-0.5" style={{ color: activeTheme.accentColor }}>
            Gentle growth
          </span>
        </div>
      </div>

      {/* 4. SEARCH & RECENT ENTRIES */}
      <div className="mt-4">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: activeTheme.textSecondary }} />
          <input
            id="dashboard-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search entries by title, thoughts, or #tags..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border focus:outline-none transition-colors"
            style={{
              backgroundColor: activeTheme.bgCard,
              borderColor: activeTheme.borderColor,
              color: activeTheme.textPrimary
            }}
          />
        </div>

        {/* Section Heading */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-xl sm:text-2xl font-medium" style={{ color: activeTheme.textPrimary }}>
            Recent Reflections
          </h2>
          <span className="text-xs" style={{ color: activeTheme.textSecondary }}>
            {filteredEntries.length} {filteredEntries.length === 1 ? 'entry' : 'entries'}
          </span>
        </div>

        {/* Entries List */}
        {filteredEntries.length === 0 ? (
          <div
            className="p-10 rounded-2xl border text-center my-6"
            style={{ backgroundColor: activeTheme.bgCard, borderColor: activeTheme.borderColor }}
          >
            <BookOpen className="w-8 h-8 mx-auto mb-3 opacity-40" style={{ color: activeTheme.textSecondary }} />
            <h3 className="font-serif text-lg font-medium mb-1" style={{ color: activeTheme.textPrimary }}>
              The page is quiet
            </h3>
            <p className="text-xs max-w-sm mx-auto mb-4" style={{ color: activeTheme.textSecondary }}>
              {searchQuery
                ? `No entries match "${searchQuery}". Try a different word or clear your search.`
                : "You haven't written anything under this filter yet. Ready to start?"}
            </p>
            <button
              onClick={() => onNewEntry('free')}
              className="px-5 py-2 rounded-full text-xs font-medium cursor-pointer"
              style={{ backgroundColor: activeTheme.accentColor, color: '#FFFFFF' }}
            >
              Write First Thought
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEntries.map((entry) => {
              const weatherObj = EMOTIONAL_WEATHER_ITEMS.find((w) => w.id === entry.emotionalWeather);
              return (
                <article
                  key={entry.id}
                  id={`entry-card-${entry.id}`}
                  className="p-5 sm:p-6 rounded-2xl border transition-all hover:shadow-xs group text-left cursor-pointer"
                  onClick={() => onOpenEntry(entry)}
                  style={{
                    backgroundColor: activeTheme.bgCard,
                    borderColor: activeTheme.borderColor
                  }}
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm" title={weatherObj?.label || entry.emotionalWeather}>
                        {weatherObj?.emoji || '🌤️'}
                      </span>
                      <span className="text-[11px] font-sans" style={{ color: activeTheme.textSecondary }}>
                        {new Date(entry.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border" style={{ borderColor: activeTheme.borderColor, color: activeTheme.textSecondary }}>
                        {entry.writingMode}
                      </span>
                    </div>

                    {/* Actions: Favorite & Delete */}
                    <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => onToggleFavorite(entry.id)}
                        className="p-1 rounded-md hover:opacity-75 transition-opacity cursor-pointer"
                        title={entry.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                        aria-label="Toggle favorite"
                      >
                        <Star
                          className="w-4 h-4"
                          style={{
                            color: entry.isFavorite ? '#EAB308' : activeTheme.textSecondary,
                            fill: entry.isFavorite ? '#EAB308' : 'none'
                          }}
                        />
                      </button>

                      <button
                        onClick={() => onDeleteEntry(entry.id)}
                        className="p-1 rounded-md hover:opacity-75 transition-opacity cursor-pointer"
                        title="Delete Entry"
                        aria-label="Delete entry"
                      >
                        <Trash2 className="w-3.5 h-3.5 opacity-40 hover:opacity-100 transition-opacity" style={{ color: activeTheme.textSecondary }} />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-medium mb-2 group-hover:underline" style={{ color: activeTheme.textPrimary }}>
                    {entry.title || 'Untitled Thought'}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm line-clamp-3 leading-relaxed mb-3" style={{ color: activeTheme.textSecondary }}>
                    {entry.content}
                  </p>

                  <div className="flex items-center justify-between text-[11px] pt-3 border-t" style={{ borderColor: activeTheme.borderColor, color: activeTheme.textSecondary }}>
                    <div className="flex items-center space-x-3">
                      <span>{entry.wordCount} words</span>
                      <span>•</span>
                      <span>{entry.readingTimeMinutes} min read</span>
                    </div>

                    {entry.tags.length > 0 && (
                      <div className="flex items-center space-x-1">
                        {entry.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="text-[10px]">#{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. FAVORITES SHELF */}
      {favoriteEntries.length > 0 && (
        <div className="mt-12 pt-8 border-t" style={{ borderColor: activeTheme.borderColor }}>
          <div className="flex items-center space-x-2 mb-4">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <h2 className="font-serif text-lg font-medium" style={{ color: activeTheme.textPrimary }}>
              Cherished Memories
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {favoriteEntries.slice(0, 4).map((fav) => (
              <div
                key={fav.id}
                onClick={() => onOpenEntry(fav)}
                className="p-4 rounded-xl border text-left cursor-pointer transition-all hover:shadow-xs"
                style={{ backgroundColor: activeTheme.bgCard, borderColor: activeTheme.borderColor }}
              >
                <div className="text-[11px] mb-1" style={{ color: activeTheme.textSecondary }}>
                  {new Date(fav.createdAt).toLocaleDateString()}
                </div>
                <h4 className="font-serif text-base font-medium mb-1 line-clamp-1" style={{ color: activeTheme.textPrimary }}>
                  {fav.title || 'Untitled Thought'}
                </h4>
                <p className="text-xs line-clamp-2" style={{ color: activeTheme.textSecondary }}>
                  {fav.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
