/*
====================================================================
QUIETINK WRITING ROOM (THE SOLITUDE ROOM)
====================================================================
FILE: src/components/WritingRoom.tsx
PURPOSE:
The sanctuary heart of QuietInk. Provides an uncompromisingly
peaceful, distraction-free environment for typing reflections,
untangling thoughts, or journaling with guided prompts.

KEY FEATURES:
1. Distraction-free notebook canvas with paper-like margins
2. Autosave engine with gentle status indicator
3. Word count, character count, and estimated reading time
4. Dynamic font-size scaling (+ / -)
5. 8 Writing Modes (Free, Thoughts, Gratitude, Reflection, Goals, Ideas, Letter, Daily)
6. Optional Quiet Questions / Prompts (New prompt, use prompt, skip prompt)
7. Solitude Mode (hides navigation, chrome, expands page, peaceful focus)
8. Direct Ambient Sound trigger
9. Tag and Category categorization
====================================================================
*/

import React, { useState, useEffect, useRef, useTransition } from 'react';
import {
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Sparkles,
  ArrowLeft,
  Check,
  RotateCw,
  Hash,
  ChevronDown,
  Palette,
  Eye,
  Type
} from 'lucide-react';
import {
  JournalEntry,
  ThemeConfig,
  EmotionalWeather,
  WritingMode
} from '../types/journal';
import { getRandomDailyPrompt, getPromptForMode } from '../data/prompts';
import { siteConfig } from '../config/siteConfig';

interface WritingRoomProps {
  activeTheme: ThemeConfig;
  entryToEdit?: JournalEntry | null;
  onSaveEntry: (entryData: {
    id?: string;
    title: string;
    content: string;
    emotionalWeather: EmotionalWeather;
    writingMode: WritingMode;
    tags: string[];
    category: string;
    isFavorite: boolean;
    isArchived: boolean;
  }) => void;
  onExit: () => void;
  onOpenMixer: () => void;
  onOpenCalmMode: () => void;
  isSolitudeMode: boolean;
  onToggleSolitude: () => void;
  isAudioMuted: boolean;
  onToggleMasterAudio: () => void;
}

const WRITING_MODES: { id: WritingMode; label: string; desc: string }[] = [
  { id: 'free', label: 'Free Journal', desc: 'Stream of consciousness without boundaries' },
  { id: 'thoughts', label: 'Untangle Thoughts', desc: 'Sorting out crowded mental chatter' },
  { id: 'gratitude', label: 'Gratitude', desc: 'Acknowledging quiet blessings' },
  { id: 'reflection', label: 'Reflection', desc: 'Looking back with grace and insight' },
  { id: 'goals', label: 'Gentle Goals', desc: 'Peaceful aspirations without urgency' },
  { id: 'ideas', label: 'Creative Ideas', desc: 'Sparks, stories, and musings' },
  { id: 'letter', label: 'Letter to Self', desc: 'Words of truth, forgiveness, or advice' },
  { id: 'daily', label: 'Daily Rhythm', desc: 'How the day began, flowed, and rested' },
];

const EMOTIONAL_WEATHERS: { id: EmotionalWeather; label: string; emoji: string }[] = [
  { id: 'bright', label: 'Bright', emoji: '☀️' },
  { id: 'calm', label: 'Calm', emoji: '🌤️' },
  { id: 'cloudy', label: 'Cloudy', emoji: '🌥️' },
  { id: 'heavy', label: 'Heavy', emoji: '🌧️' },
  { id: 'quiet', label: 'Quiet', emoji: '🌙' },
  { id: 'hopeful', label: 'Hopeful', emoji: '🌈' },
];

export const WritingRoom: React.FC<WritingRoomProps> = ({
  activeTheme,
  entryToEdit,
  onSaveEntry,
  onExit,
  onOpenMixer,
  onOpenCalmMode,
  isSolitudeMode,
  onToggleSolitude,
  isAudioMuted,
  onToggleMasterAudio,
}) => {
  // Entry states
  const [entryId, setEntryId] = useState<string | undefined>(entryToEdit?.id);
  const [title, setTitle] = useState<string>(entryToEdit?.title || '');
  const [content, setContent] = useState<string>(entryToEdit?.content || '');
  const [weather, setWeather] = useState<EmotionalWeather>(entryToEdit?.emotionalWeather || 'calm');
  const [mode, setMode] = useState<WritingMode>(entryToEdit?.writingMode || 'free');
  const [category, setCategory] = useState<string>(entryToEdit?.category || 'Reflections');
  const [tagsInput, setTagsInput] = useState<string>(entryToEdit?.tags.join(', ') || '');
  const [isFavorite, setIsFavorite] = useState<boolean>(entryToEdit?.isFavorite || false);

  // Solitude & typographic preferences
  const [fontSize, setFontSize] = useState<number>(siteConfig.preferences.defaultFontSize);
  const [isSerifFont, setIsSerifFont] = useState<boolean>(true);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'dirty'>('saved');
  const [currentPrompt, setCurrentPrompt] = useState<string>(getPromptForMode(mode));
  const [showPromptBanner, setShowPromptBanner] = useState<boolean>(true);

  const saveTimeoutRef = useRef<number | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  // Word & Character count calculations
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  // Handle mode change & prompt synchronization
  const handleModeChange = (newMode: WritingMode) => {
    setMode(newMode);
    setCurrentPrompt(getPromptForMode(newMode));
  };

  // Rotate to a new quiet prompt
  const handleNewPrompt = () => {
    setCurrentPrompt(getRandomDailyPrompt());
  };

  // Insert prompt into writing area
  const handleUsePrompt = () => {
    if (!content.trim()) {
      setContent(`Prompt: "${currentPrompt}"\n\n`);
    } else {
      setContent(content + `\n\nPrompt: "${currentPrompt}"\n\n`);
    }
    setShowPromptBanner(false);
    contentRef.current?.focus();
  };

  // Autosave engine
  useEffect(() => {
    setSaveStatus('dirty');

    if (saveTimeoutRef.current) {
      window.clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = window.setTimeout(() => {
      if (title.trim() || content.trim()) {
        setSaveStatus('saving');
        const tags = tagsInput
          .split(',')
          .map((t) => t.trim().replace(/^#/, ''))
          .filter(Boolean);

        onSaveEntry({
          id: entryId,
          title: title.trim() || 'Untitled Thought',
          content,
          emotionalWeather: weather,
          writingMode: mode,
          tags,
          category,
          isFavorite,
          isArchived: false,
        });

        setSaveStatus('saved');
      }
    }, siteConfig.preferences.autosaveIntervalMs);

    return () => {
      if (saveTimeoutRef.current) {
        window.clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [title, content, weather, mode, category, tagsInput, isFavorite]);

  // Adjust font size
  const adjustFontSize = (delta: number) => {
    setFontSize((prev) => Math.min(28, Math.max(14, prev + delta)));
  };

  return (
    <div
      id="writing-room-root"
      className={`min-h-screen transition-all duration-300 flex flex-col justify-between ${
        isSolitudeMode ? 'fixed inset-0 z-50 overflow-y-auto' : 'pt-6 pb-20 px-4 sm:px-6'
      }`}
      style={{
        backgroundColor: activeTheme.bgPage,
        color: activeTheme.textPrimary
      }}
    >
      {/* 1. TOP UTILITY BAR */}
      <div
        className="max-w-4xl w-full mx-auto flex items-center justify-between pb-4 border-b gap-3 transition-opacity"
        style={{ borderColor: activeTheme.borderColor }}
      >
        {/* Left: Back / Exit & Save Indicator */}
        <div className="flex items-center space-x-3">
          <button
            id="exit-writing-room-btn"
            onClick={onExit}
            className="flex items-center space-x-1.5 text-xs font-sans hover:opacity-75 transition-opacity cursor-pointer border px-3 py-1.5 rounded-full"
            style={{ borderColor: activeTheme.borderColor, color: activeTheme.textSecondary }}
            title="Return to Dashboard"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back</span>
          </button>

          {/* Subtle Save Status */}
          <div className="flex items-center space-x-1.5 text-xs" style={{ color: activeTheme.textSecondary }}>
            {saveStatus === 'saved' && (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[11px]">Saved to your quiet space</span>
              </>
            )}
            {saveStatus === 'saving' && (
              <>
                <RotateCw className="w-3.5 h-3.5 animate-spin" style={{ color: activeTheme.accentColor }} />
                <span className="text-[11px]">Saving...</span>
              </>
            )}
            {saveStatus === 'dirty' && (
              <span className="text-[11px] opacity-60">Writing...</span>
            )}
          </div>
        </div>

        {/* Right: Controls (Font Size, Typography, Ambient Sound, Solitude Mode) */}
        <div className="flex items-center space-x-2">
          {/* Font Size Adjusters */}
          <div className="flex items-center border rounded-full px-2 py-0.5 space-x-1" style={{ borderColor: activeTheme.borderColor }}>
            <button
              onClick={() => adjustFontSize(-2)}
              className="px-1 text-xs hover:opacity-75 cursor-pointer"
              title="Decrease Font Size"
            >
              A-
            </button>
            <span className="text-[11px] opacity-50 font-mono">{fontSize}</span>
            <button
              onClick={() => adjustFontSize(2)}
              className="px-1 text-xs font-medium hover:opacity-75 cursor-pointer"
              title="Increase Font Size"
            >
              A+
            </button>
          </div>

          {/* Serif / Sans Font Toggle */}
          <button
            onClick={() => setIsSerifFont(!isSerifFont)}
            className="p-1.5 border rounded-full hover:opacity-75 cursor-pointer"
            style={{ borderColor: activeTheme.borderColor }}
            title={isSerifFont ? "Switch to Sans-Serif Font" : "Switch to Serif Font"}
          >
            <Type className="w-3.5 h-3.5" style={{ color: activeTheme.textSecondary }} />
          </button>

          {/* Ambient Sound Trigger */}
          <button
            onClick={onToggleMasterAudio}
            className="p-1.5 border rounded-full hover:opacity-75 cursor-pointer"
            style={{ borderColor: activeTheme.borderColor }}
            title={isAudioMuted ? "Unmute Ambient Sound" : "Mute Ambient Sound"}
          >
            {isAudioMuted ? (
              <VolumeX className="w-3.5 h-3.5" style={{ color: activeTheme.textSecondary }} />
            ) : (
              <Volume2 className="w-3.5 h-3.5" style={{ color: activeTheme.accentColor }} />
            )}
          </button>

          {/* Solitude Mode Toggle */}
          <button
            id="solitude-mode-toggle-btn"
            onClick={onToggleSolitude}
            className="flex items-center space-x-1 text-xs px-3 py-1.5 rounded-full cursor-pointer transition-all shadow-xs"
            style={{
              backgroundColor: isSolitudeMode ? activeTheme.accentColor : activeTheme.borderColor,
              color: isSolitudeMode ? '#FFFFFF' : activeTheme.textPrimary
            }}
            title={isSolitudeMode ? "Exit Solitude Mode" : "Enter Solitude Mode (Full Focus)"}
          >
            {isSolitudeMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isSolitudeMode ? "Exit Solitude" : "Solitude Mode"}</span>
          </button>
        </div>
      </div>

      {/* 2. WRITING MODE SELECTOR & PROMPT ACCORDION (Non-solitude or gentle banner) */}
      <div className="max-w-4xl w-full mx-auto my-4 space-y-3">
        {/* Writing Mode Pills */}
        {!isSolitudeMode && (
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
            <span className="text-[11px] uppercase tracking-wider whitespace-nowrap opacity-60">
              Mode:
            </span>
            {WRITING_MODES.map((m) => (
              <button
                key={m.id}
                onClick={() => handleModeChange(m.id)}
                className={`px-3 py-1 rounded-full whitespace-nowrap border transition-all cursor-pointer ${
                  mode === m.id ? 'font-medium shadow-xs' : 'opacity-70 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: mode === m.id ? activeTheme.borderColor : 'transparent',
                  borderColor: mode === m.id ? activeTheme.accentColor : activeTheme.borderColor,
                  color: activeTheme.textPrimary
                }}
                title={m.desc}
              >
                {m.label}
              </button>
            ))}
          </div>
        )}

        {/* Optional Quiet Prompt Banner */}
        {showPromptBanner && (
          <div
            className="p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
            style={{
              backgroundColor: activeTheme.bgCard,
              borderColor: activeTheme.borderColor
            }}
          >
            <div className="flex items-start space-x-2.5">
              <Sparkles className="w-4 h-4 mt-0.5 shrink-0" style={{ color: activeTheme.accentColor }} />
              <div>
                <span className="text-[10px] uppercase tracking-wider block font-semibold" style={{ color: activeTheme.textSecondary }}>
                  Today's Quiet Question
                </span>
                <p className="font-serif text-sm italic" style={{ color: activeTheme.textPrimary }}>
                  "{currentPrompt}"
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={handleUsePrompt}
                className="px-2.5 py-1 rounded-md text-[11px] font-medium cursor-pointer"
                style={{ backgroundColor: activeTheme.accentColor, color: '#FFFFFF' }}
              >
                Use Prompt
              </button>
              <button
                onClick={handleNewPrompt}
                className="px-2.5 py-1 rounded-md text-[11px] border hover:opacity-80 cursor-pointer"
                style={{ borderColor: activeTheme.borderColor, color: activeTheme.textSecondary }}
                title="Get another prompt"
              >
                New
              </button>
              <button
                onClick={() => setShowPromptBanner(false)}
                className="text-[11px] opacity-60 hover:opacity-100 cursor-pointer px-1"
              >
                Skip
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3. MAIN DISTRACTION-FREE NOTEBOOK CANVAS */}
      <main className="max-w-3xl w-full mx-auto flex-1 flex flex-col my-4">
        {/* Title Input */}
        <input
          id="writing-title-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title of this quiet moment..."
          className="w-full text-2xl sm:text-3xl md:text-4xl font-serif font-normal placeholder:opacity-35 focus:outline-none mb-6 border-b pb-3 transition-colors"
          style={{
            backgroundColor: 'transparent',
            borderColor: activeTheme.borderColor,
            color: activeTheme.textPrimary
          }}
        />

        {/* Content Textarea */}
        <textarea
          ref={contentRef}
          id="writing-content-textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Let your thoughts settle onto the page without rush or judgment..."
          className="w-full flex-1 min-h-[420px] resize-none focus:outline-none placeholder:opacity-35 leading-relaxed transition-all"
          style={{
            backgroundColor: 'transparent',
            color: activeTheme.textPrimary,
            fontSize: `${fontSize}px`,
            fontFamily: isSerifFont ? 'Lora, Cormorant Garamond, Georgia, serif' : 'Plus Jakarta Sans, sans-serif',
            lineHeight: 1.75
          }}
        />
      </main>

      {/* 4. BOTTOM METADATA & ATMOSPHERE BAR */}
      <footer
        className="max-w-4xl w-full mx-auto pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
        style={{ borderColor: activeTheme.borderColor, color: activeTheme.textSecondary }}
      >
        {/* Word count & Reading time */}
        <div className="flex items-center space-x-3 text-[11px]">
          <span>{wordCount} words</span>
          <span>•</span>
          <span>{charCount} characters</span>
          <span>•</span>
          <span>{readingTime} min read</span>
        </div>

        {/* Emotional Weather for this entry */}
        <div className="flex items-center space-x-1.5">
          <span className="text-[11px] opacity-70">Weather:</span>
          {EMOTIONAL_WEATHERS.map((w) => (
            <button
              key={w.id}
              onClick={() => setWeather(w.id)}
              className={`px-2 py-1 rounded-md text-xs transition-all cursor-pointer ${
                weather === w.id ? 'border shadow-xs' : 'opacity-50 hover:opacity-100'
              }`}
              style={{
                borderColor: weather === w.id ? activeTheme.accentColor : 'transparent',
                backgroundColor: weather === w.id ? activeTheme.borderColor : 'transparent'
              }}
              title={w.label}
            >
              <span>{w.emoji}</span>
            </button>
          ))}
        </div>

        {/* Tags input */}
        <div className="flex items-center space-x-1 border rounded-full px-2.5 py-1 text-xs" style={{ borderColor: activeTheme.borderColor }}>
          <Hash className="w-3 h-3 opacity-50" />
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="tags (comma separated)"
            className="w-36 bg-transparent focus:outline-none text-[11px]"
            style={{ color: activeTheme.textPrimary }}
          />
        </div>
      </footer>
    </div>
  );
};
