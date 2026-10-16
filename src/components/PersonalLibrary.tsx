/*
====================================================================
QUIETINK PERSONAL LIBRARY & MEMORY TIMELINE
====================================================================
FILE: src/components/PersonalLibrary.tsx
PURPOSE:
Provides a searchable, filterable repository of all user journal
entries, categorized reflections, cherished favorites, and memory
timelines grouped by month and year.

FEATURES:
1. Full-text search across titles, body content, and #tags
2. Filter by Category: All, Reflections, Gratitude, Memories, Ideas, Favorites
3. Filter by Emotional Weather
4. Sort by Newest first, Oldest first, Word count
5. Memory Timeline view showing calendar chronology
====================================================================
*/

import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Calendar,
  Star,
  Clock,
  Filter,
  ArrowUpDown,
  Tag,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { JournalEntry, ThemeConfig, EmotionalWeather } from '../types/journal';

interface PersonalLibraryProps {
  activeTheme: ThemeConfig;
  entries: JournalEntry[];
  onOpenEntry: (entry: JournalEntry) => void;
  onNewEntry: () => void;
}

const CATEGORIES = [
  'All',
  'Favorites',
  'Reflections',
  'Gratitude',
  'Memories',
  'Ideas',
  'Personal',
  'Archived'
];

export const PersonalLibrary: React.FC<PersonalLibraryProps> = ({
  activeTheme,
  entries,
  onOpenEntry,
  onNewEntry,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedWeather, setSelectedWeather] = useState<EmotionalWeather | 'All'>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'words'>('newest');
  const [viewMode, setViewMode] = useState<'cards' | 'timeline'>('timeline');

  // Filter entries
  const filtered = entries.filter((entry) => {
    // Search filter
    const matchesSearch =
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    // Category filter
    let matchesCategory = true;
    if (selectedCategory === 'Favorites') {
      matchesCategory = entry.isFavorite;
    } else if (selectedCategory === 'Archived') {
      matchesCategory = entry.isArchived;
    } else if (selectedCategory !== 'All') {
      matchesCategory = entry.category?.toLowerCase() === selectedCategory.toLowerCase();
    }

    // Weather filter
    const matchesWeather = selectedWeather === 'All' || entry.emotionalWeather === selectedWeather;

    return matchesSearch && matchesCategory && matchesWeather;
  });

  // Sort entries
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sortBy === 'oldest') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    if (sortBy === 'words') {
      return b.wordCount - a.wordCount;
    }
    return 0;
  });

  // Group entries by Month & Year for Memory Timeline
  const timelineGroups: Record<string, JournalEntry[]> = {};
  sorted.forEach((entry) => {
    const d = new Date(entry.createdAt);
    const key = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    if (!timelineGroups[key]) {
      timelineGroups[key] = [];
    }
    timelineGroups[key].push(entry);
  });

  return (
    <div id="personal-library-root" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b gap-4 mb-8" style={{ borderColor: activeTheme.borderColor }}>
        <div>
          <div className="flex items-center space-x-2 text-xs mb-1" style={{ color: activeTheme.textSecondary }}>
            <BookOpen className="w-4 h-4" />
            <span className="uppercase tracking-widest font-semibold">Personal Library & Archives</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight" style={{ color: activeTheme.textPrimary }}>
            My Library
          </h1>
          <p className="text-xs sm:text-sm mt-1" style={{ color: activeTheme.textSecondary }}>
            Every word, gratitude, and fleeting thought you have penned in quiet solitude.
          </p>
        </div>

        {/* View Mode Toggle: Timeline vs Cards */}
        <div className="flex items-center space-x-2 border rounded-full p-1 text-xs" style={{ borderColor: activeTheme.borderColor }}>
          <button
            onClick={() => setViewMode('timeline')}
            className={`px-3 py-1 rounded-full cursor-pointer transition-colors ${
              viewMode === 'timeline' ? 'font-medium shadow-xs' : 'opacity-70 hover:opacity-100'
            }`}
            style={{
              backgroundColor: viewMode === 'timeline' ? activeTheme.accentColor : 'transparent',
              color: viewMode === 'timeline' ? '#FFFFFF' : activeTheme.textPrimary
            }}
          >
            Timeline
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={`px-3 py-1 rounded-full cursor-pointer transition-colors ${
              viewMode === 'cards' ? 'font-medium shadow-xs' : 'opacity-70 hover:opacity-100'
            }`}
            style={{
              backgroundColor: viewMode === 'cards' ? activeTheme.accentColor : 'transparent',
              color: viewMode === 'cards' ? '#FFFFFF' : activeTheme.textPrimary
            }}
          >
            Cards
          </button>
        </div>
      </div>

      {/* 2. SEARCH & CONTROLS BAR */}
      <div className="space-y-4 mb-8">
        {/* Full-Text Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: activeTheme.textSecondary }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search across titles, reflections, memories, or #tags..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl text-sm border focus:outline-none transition-all"
            style={{
              backgroundColor: activeTheme.bgCard,
              borderColor: activeTheme.borderColor,
              color: activeTheme.textPrimary
            }}
          />
        </div>

        {/* Categories Bar */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full whitespace-nowrap border transition-all cursor-pointer ${
                selectedCategory === cat ? 'font-semibold shadow-xs' : 'opacity-70 hover:opacity-100'
              }`}
              style={{
                backgroundColor: selectedCategory === cat ? activeTheme.borderColor : activeTheme.bgCard,
                borderColor: selectedCategory === cat ? activeTheme.accentColor : activeTheme.borderColor,
                color: activeTheme.textPrimary
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort & Stats sub-bar */}
        <div className="flex items-center justify-between text-xs pt-2" style={{ color: activeTheme.textSecondary }}>
          <span>
            Found {sorted.length} {sorted.length === 1 ? 'reflection' : 'reflections'}
          </span>

          <div className="flex items-center space-x-2">
            <ArrowUpDown className="w-3.5 h-3.5 opacity-60" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'words')}
              className="bg-transparent border rounded-lg px-2 py-1 focus:outline-none cursor-pointer text-xs"
              style={{ borderColor: activeTheme.borderColor, color: activeTheme.textPrimary }}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="words">Longest Entry</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. TIMELINE VIEW */}
      {sorted.length === 0 ? (
        <div className="p-10 rounded-3xl border text-center my-8" style={{ backgroundColor: activeTheme.bgCard, borderColor: activeTheme.borderColor }}>
          <p className="text-xs mb-4" style={{ color: activeTheme.textSecondary }}>
            No journal entries match your search criteria.
          </p>
          <button
            onClick={onNewEntry}
            className="px-5 py-2 rounded-full text-xs font-medium cursor-pointer"
            style={{ backgroundColor: activeTheme.accentColor, color: '#FFFFFF' }}
          >
            Write a New Entry
          </button>
        </div>
      ) : viewMode === 'timeline' ? (
        <div className="space-y-10">
          {Object.entries(timelineGroups).map(([monthYear, groupEntries]) => (
            <div key={monthYear}>
              {/* Timeline Month Header */}
              <div className="sticky top-20 z-10 py-2 mb-4 backdrop-blur-xs flex items-center space-x-3">
                <span className="font-serif text-xl font-medium tracking-tight" style={{ color: activeTheme.textPrimary }}>
                  {monthYear}
                </span>
                <div className="h-px flex-1" style={{ backgroundColor: activeTheme.borderColor }}></div>
              </div>

              {/* Group items */}
              <div className="relative border-l-2 pl-6 ml-3 space-y-6" style={{ borderColor: activeTheme.borderColor }}>
                {groupEntries.map((entry) => (
                  <div
                    key={entry.id}
                    onClick={() => onOpenEntry(entry)}
                    className="relative group p-5 rounded-2xl border transition-all hover:shadow-xs cursor-pointer text-left"
                    style={{
                      backgroundColor: activeTheme.bgCard,
                      borderColor: activeTheme.borderColor
                    }}
                  >
                    {/* Timeline Node Dot */}
                    <div
                      className="absolute -left-[31px] top-6 w-3 h-3 rounded-full border-2"
                      style={{
                        backgroundColor: activeTheme.accentColor,
                        borderColor: activeTheme.bgPage
                      }}
                    />

                    <div className="flex items-center justify-between mb-2 text-[11px]" style={{ color: activeTheme.textSecondary }}>
                      <span className="font-semibold">
                        {new Date(entry.createdAt).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                      <span className="uppercase tracking-wider">{entry.writingMode}</span>
                    </div>

                    <h3 className="font-serif text-lg font-medium mb-1 group-hover:underline" style={{ color: activeTheme.textPrimary }}>
                      {entry.title || 'Untitled Thought'}
                    </h3>

                    <p className="text-xs line-clamp-2 leading-relaxed" style={{ color: activeTheme.textSecondary }}>
                      {entry.content}
                    </p>

                    <div className="mt-3 pt-2 border-t flex items-center justify-between text-[11px]" style={{ borderColor: activeTheme.borderColor, color: activeTheme.textSecondary }}>
                      <span>{entry.wordCount} words</span>
                      {entry.tags.length > 0 && (
                        <span>{entry.tags.map((t) => `#${t}`).join(' ')}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Card Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sorted.map((entry) => (
            <div
              key={entry.id}
              onClick={() => onOpenEntry(entry)}
              className="p-5 rounded-2xl border text-left cursor-pointer transition-all hover:shadow-xs flex flex-col justify-between"
              style={{
                backgroundColor: activeTheme.bgCard,
                borderColor: activeTheme.borderColor
              }}
            >
              <div>
                <div className="flex items-center justify-between text-[11px] mb-2" style={{ color: activeTheme.textSecondary }}>
                  <span>{new Date(entry.createdAt).toLocaleDateString()}</span>
                  <span className="uppercase tracking-wider">{entry.category || 'Journal'}</span>
                </div>
                <h3 className="font-serif text-lg font-medium mb-2 line-clamp-1" style={{ color: activeTheme.textPrimary }}>
                  {entry.title || 'Untitled Thought'}
                </h3>
                <p className="text-xs line-clamp-3 leading-relaxed mb-4" style={{ color: activeTheme.textSecondary }}>
                  {entry.content}
                </p>
              </div>

              <div className="pt-3 border-t flex items-center justify-between text-[11px]" style={{ borderColor: activeTheme.borderColor, color: activeTheme.textSecondary }}>
                <span>{entry.wordCount} words</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-60" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
