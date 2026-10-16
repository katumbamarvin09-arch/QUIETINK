/*
====================================================================
QUIETINK MAIN NAVIGATION BAR
====================================================================
FILE: src/components/Navbar.tsx
PURPOSE:
Provides the top-level peaceful navigation across the site.
Allows users to easily travel between the Landing Page, Journal Dashboard,
Writing Room, Calm Mode, Time Capsules, Future Me, Garden, and Library,
as well as access the Theme Selector, Ambient Mixer, and Solitude Mode.

WHAT YOU CAN CUSTOMIZE:
- Logo icon or image in the branding section
- Nav items and labels
- Button styling and theme colors
====================================================================
*/

import React, { useState } from 'react';
import {
  Feather,
  BookOpen,
  PenLine,
  Volume2,
  VolumeX,
  Palette,
  Sparkles,
  Compass,
  Clock,
  Mail,
  Flower2,
  User,
  Maximize2,
  ShieldCheck,
  Languages
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { ThemeId, ThemeConfig } from '../types/journal';
import { themeList } from '../data/themes';
import { SUPPORTED_LANGUAGES, LanguageCode } from '../i18n/translations';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  activeTheme: ThemeConfig;
  onSelectTheme: (themeId: ThemeId) => void;
  onOpenMixer: () => void;
  onOpenCalmMode: () => void;
  onToggleSolitude: () => void;
  onOpenProfile: () => void;
  onOpenAdmin: () => void;
  isAudioMuted: boolean;
  onToggleMasterAudio: () => void;
  activeSoundCount: number;
  currentLanguage?: LanguageCode;
  onSelectLanguage?: (code: LanguageCode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  activeTheme,
  onSelectTheme,
  onOpenMixer,
  onOpenCalmMode,
  onToggleSolitude,
  onOpenProfile,
  onOpenAdmin,
  isAudioMuted,
  onToggleMasterAudio,
  activeSoundCount,
  currentLanguage = 'en',
  onSelectLanguage
}) => {
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  return (
    <header
      id="quietink-header"
      className="sticky top-0 z-40 transition-colors duration-300 border-b backdrop-blur-md"
      style={{
        backgroundColor: `${activeTheme.bgPage}EE`,
        borderColor: activeTheme.borderColor,
        color: activeTheme.textPrimary
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center space-x-3">
          <button
            id="quietink-logo-btn"
            onClick={() => onNavigate('landing')}
            className="flex items-center space-x-2.5 group text-left cursor-pointer focus:outline-none"
            aria-label="Go to QuietInk Home"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-105 shadow-xs overflow-hidden bg-white border"
              style={{
                borderColor: activeTheme.borderColor,
              }}
            >
              {siteConfig.logoPath ? (
                <img
                  src={siteConfig.logoPath}
                  alt={siteConfig.siteName}
                  className="w-full h-full object-contain p-0.5"
                  onError={(e) => {
                    // Fallback to icon if custom image is missing
                    e.currentTarget.style.display = 'none';
                    const icon = e.currentTarget.parentElement?.querySelector('.fallback-feather-icon') as HTMLElement;
                    if (icon) icon.style.display = 'block';
                  }}
                />
              ) : null}
              <Feather
                className="w-5 h-5 fallback-feather-icon"
                style={{
                  display: siteConfig.logoPath ? 'none' : 'block',
                  color: activeTheme.accentColor
                }}
              />
            </div>
            <div>
              <span className="font-serif text-xl tracking-tight font-semibold block leading-none">
                {siteConfig.siteName}
              </span>
              <span
                className="text-[11px] font-sans tracking-wide block transition-colors"
                style={{ color: activeTheme.textSecondary }}
              >
                A Quiet Place for Thoughts
              </span>
            </div>
          </button>
        </div>

        {/* Primary Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Main Navigation">
          <button
            id="nav-home"
            onClick={() => onNavigate('landing')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 cursor-pointer ${
              currentView === 'landing' ? 'shadow-xs font-semibold' : 'hover:opacity-90'
            }`}
            style={{
              backgroundColor: currentView === 'landing' ? activeTheme.borderColor : 'transparent',
              color: activeTheme.textPrimary
            }}
          >
            Sanctuary
          </button>

          <button
            id="nav-dashboard"
            onClick={() => onNavigate('dashboard')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 cursor-pointer ${
              currentView === 'dashboard' ? 'shadow-xs font-semibold' : 'hover:opacity-90'
            }`}
            style={{
              backgroundColor: currentView === 'dashboard' ? activeTheme.borderColor : 'transparent',
              color: activeTheme.textPrimary
            }}
          >
            Dashboard
          </button>

          <button
            id="nav-writing-room"
            onClick={() => onNavigate('writing')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 flex items-center space-x-1.5 cursor-pointer ${
              currentView === 'writing' ? 'shadow-xs font-semibold' : 'hover:opacity-90'
            }`}
            style={{
              backgroundColor: currentView === 'writing' ? activeTheme.borderColor : 'transparent',
              color: activeTheme.textPrimary
            }}
          >
            <PenLine className="w-3.5 h-3.5" />
            <span>Writing Room</span>
          </button>

          <button
            id="nav-calm-mode"
            onClick={onOpenCalmMode}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 flex items-center space-x-1.5 cursor-pointer hover:opacity-90"
            style={{ color: activeTheme.textPrimary }}
            title="Open Peaceful Atmospheres"
          >
            <Sparkles className="w-3.5 h-3.5" style={{ color: activeTheme.accentColor }} />
            <span>Calm Mode</span>
          </button>

          <button
            id="nav-time-capsule"
            onClick={() => onNavigate('capsules')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 flex items-center space-x-1.5 cursor-pointer ${
              currentView === 'capsules' ? 'shadow-xs font-semibold' : 'hover:opacity-90'
            }`}
            style={{
              backgroundColor: currentView === 'capsules' ? activeTheme.borderColor : 'transparent',
              color: activeTheme.textPrimary
            }}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Time Capsule</span>
          </button>

          <button
            id="nav-future-me"
            onClick={() => onNavigate('future-me')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 flex items-center space-x-1.5 cursor-pointer ${
              currentView === 'future-me' ? 'shadow-xs font-semibold' : 'hover:opacity-90'
            }`}
            style={{
              backgroundColor: currentView === 'future-me' ? activeTheme.borderColor : 'transparent',
              color: activeTheme.textPrimary
            }}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Future Me</span>
          </button>

          <button
            id="nav-garden"
            onClick={() => onNavigate('garden')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 flex items-center space-x-1.5 cursor-pointer ${
              currentView === 'garden' ? 'shadow-xs font-semibold' : 'hover:opacity-90'
            }`}
            style={{
              backgroundColor: currentView === 'garden' ? activeTheme.borderColor : 'transparent',
              color: activeTheme.textPrimary
            }}
          >
            <Flower2 className="w-3.5 h-3.5" />
            <span>Quiet Garden</span>
          </button>

          <button
            id="nav-library"
            onClick={() => onNavigate('library')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 flex items-center space-x-1.5 cursor-pointer ${
              currentView === 'library' ? 'shadow-xs font-semibold' : 'hover:opacity-90'
            }`}
            style={{
              backgroundColor: currentView === 'library' ? activeTheme.borderColor : 'transparent',
              color: activeTheme.textPrimary
            }}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Library</span>
          </button>
        </nav>

        {/* Ambient Sound, Theme & Quick Action Tools */}
        <div className="flex items-center space-x-2">
          {/* Ambient Sound Quick Button */}
          <div className="flex items-center border rounded-full px-2 py-1 space-x-1 text-xs transition-all duration-300 hover:scale-105 hover:-translate-y-0.5" style={{ borderColor: activeTheme.borderColor }}>
            <button
              id="ambient-mute-btn"
              onClick={onToggleMasterAudio}
              className="p-1 rounded-full hover:opacity-75 transition-transform hover:scale-110 cursor-pointer focus:outline-none"
              title={isAudioMuted ? "Unmute Ambient Audio" : "Mute Ambient Audio"}
              aria-label="Toggle ambient sound"
            >
              {isAudioMuted || activeSoundCount === 0 ? (
                <VolumeX className="w-3.5 h-3.5" style={{ color: activeTheme.textSecondary }} />
              ) : (
                <Volume2 className="w-3.5 h-3.5" style={{ color: activeTheme.accentColor }} />
              )}
            </button>
            <button
              id="ambient-mixer-open-btn"
              onClick={onOpenMixer}
              className="text-[11px] font-sans hover:underline cursor-pointer focus:outline-none pr-1"
              style={{ color: activeTheme.textSecondary }}
            >
              {activeSoundCount > 0 && !isAudioMuted ? `${activeSoundCount} playing` : 'Mixer'}
            </button>
          </div>

          {/* Theme Dropdown */}
          <div className="relative">
            <button
              id="theme-selector-btn"
              onClick={() => {
                setIsThemeMenuOpen(!isThemeMenuOpen);
                setIsLangMenuOpen(false);
              }}
              className="p-2 rounded-full hover:opacity-75 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 cursor-pointer focus:outline-none border shadow-2xs"
              style={{ borderColor: activeTheme.borderColor, color: activeTheme.textPrimary }}
              title="Change Theme"
              aria-label="Theme options"
            >
              <Palette className="w-4 h-4" />
            </button>

            {isThemeMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-56 rounded-xl shadow-lg border p-2 z-50 transition-all text-xs"
                style={{
                  backgroundColor: activeTheme.bgCard,
                  borderColor: activeTheme.borderColor,
                  color: activeTheme.textPrimary
                }}
              >
                <div className="px-2 py-1.5 text-[11px] font-semibold tracking-wider uppercase border-b mb-1" style={{ borderColor: activeTheme.borderColor, color: activeTheme.textSecondary }}>
                  Atmospheric Themes
                </div>
                <div className="space-y-1">
                  {themeList.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => {
                        onSelectTheme(theme.id);
                        setIsThemeMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-left hover:opacity-80 transition-all duration-200 hover:scale-102 cursor-pointer"
                      style={{
                        backgroundColor: activeTheme.id === theme.id ? activeTheme.borderColor : 'transparent'
                      }}
                    >
                      <div className="flex items-center space-x-2">
                        <span
                          className="w-3 h-3 rounded-full border shadow-2xs"
                          style={{ backgroundColor: theme.accentColor, borderColor: theme.borderColor }}
                        />
                        <span>{theme.name}</span>
                      </div>
                      {activeTheme.id === theme.id && (
                        <span className="text-[10px] font-medium" style={{ color: activeTheme.accentColor }}>Active</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Language Selector Dropdown (i18n) */}
          <div className="relative">
            <button
              id="language-selector-btn"
              onClick={() => {
                setIsLangMenuOpen(!isLangMenuOpen);
                setIsThemeMenuOpen(false);
              }}
              className="p-2 rounded-full hover:opacity-75 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 cursor-pointer focus:outline-none border flex items-center space-x-1 shadow-2xs"
              style={{ borderColor: activeTheme.borderColor, color: activeTheme.textPrimary }}
              title="Choose Language (Oluganda, English, Español, Français, Kiswahili)"
              aria-label="Language options"
            >
              <Languages className="w-4 h-4" />
            </button>

            {isLangMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-52 rounded-xl shadow-lg border p-2 z-50 transition-all text-xs"
                style={{
                  backgroundColor: activeTheme.bgCard,
                  borderColor: activeTheme.borderColor,
                  color: activeTheme.textPrimary
                }}
              >
                <div className="px-2 py-1.5 text-[11px] font-semibold tracking-wider uppercase border-b mb-1" style={{ borderColor: activeTheme.borderColor, color: activeTheme.textSecondary }}>
                  Languages / Ennimi
                </div>
                <div className="space-y-1">
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        if (onSelectLanguage) onSelectLanguage(lang.code);
                        setIsLangMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-left hover:opacity-80 transition-all duration-200 hover:scale-102 cursor-pointer"
                      style={{
                        backgroundColor: currentLanguage === lang.code ? activeTheme.borderColor : 'transparent'
                      }}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-base">{lang.flag}</span>
                        <div>
                          <span className="font-medium block">{lang.nativeName}</span>
                          <span className="text-[10px] opacity-70 block">{lang.label}</span>
                        </div>
                      </div>
                      {currentLanguage === lang.code && (
                        <span className="text-[10px] font-medium" style={{ color: activeTheme.accentColor }}>Active</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Enter Solitude Mode (Quick fullscreen distraction-free trigger) */}
          <button
            id="quick-solitude-btn"
            onClick={onToggleSolitude}
            className="hidden sm:flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer shadow-xs transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95"
            style={{
              backgroundColor: activeTheme.accentColor,
              color: '#FFFFFF'
            }}
            title="Enter Distraction-Free Solitude Mode"
          >
            <Maximize2 className="w-3 h-3" />
            <span>Solitude</span>
          </button>

          {/* User Profile / Privacy Settings */}
          <button
            id="user-profile-btn"
            onClick={onOpenProfile}
            className="p-2 rounded-full border hover:opacity-75 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 cursor-pointer focus:outline-none shadow-2xs"
            style={{ borderColor: activeTheme.borderColor, color: activeTheme.textPrimary }}
            title="My Account & Privacy Settings"
            aria-label="User profile and settings"
          >
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
