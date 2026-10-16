/*
====================================================================
QUIETINK MAIN APPLICATION CONTAINER
====================================================================
FILE: src/App.tsx
PURPOSE:
Coordinates the state, navigation, theme, audio system, and views
across the entire QuietInk digital journaling platform.

SECTIONS / VIEWS:
1. landing: Front sanctuary page with peaceful hero and features
2. dashboard: Personal home with recent entries and emotional weather
3. writing: Distraction-free Writing Room (with Solitude mode)
4. capsules: Sealed Time Capsules locked until target future dates
5. future-me: Letters to Future Me with sealed-envelope styling
6. garden: My Quiet Garden with gentle growing flora (no streaks)
7. library: Searchable archive and chronological memory timeline

MODALS:
- Calm Mode (8 peaceful atmospheric environments with canvas particles)
- Ambient Sound Mixer (volume sliders for rain, ocean, fireplace, etc.)
- Author Profile & Privacy Vault (data export, settings, backup)
- Administrator Control Panel (site overview, prompt library)
====================================================================
*/

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { JournalDashboard } from './components/JournalDashboard';
import { WritingRoom } from './components/WritingRoom';
import { TimeCapsuleSection } from './components/TimeCapsuleSection';
import { FutureMeSection } from './components/FutureMeSection';
import { GrowthGarden } from './components/GrowthGarden';
import { PersonalLibrary } from './components/PersonalLibrary';
import { CalmModeModal } from './components/CalmModeModal';
import { AmbientMixerModal } from './components/AmbientMixerModal';
import { UserProfileModal } from './components/UserProfileModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { Footer } from './components/Footer';

import {
  JournalEntry,
  ThemeId,
  ThemeConfig,
  EmotionalWeather,
  WritingMode,
  UserProfile,
  TimeCapsule,
  FutureLetter,
  GrowthGardenData
} from './types/journal';
import { getThemeById } from './data/themes';
import { storageService } from './services/storageService';
import { ambientAudio } from './services/ambientAudio';
import { siteConfig } from './config/siteConfig';
import { LanguageCode } from './i18n/translations';

export default function App() {
  // Navigation & View state
  const [currentView, setCurrentView] = useState<string>('landing');
  const [entryToEdit, setEntryToEdit] = useState<JournalEntry | null>(null);

  // Internationalization / Language state
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem('quietink_language');
      return (saved as LanguageCode) || 'en';
    } catch {
      return 'en';
    }
  });

  const handleSelectLanguage = (code: LanguageCode) => {
    setCurrentLanguage(code);
    try {
      localStorage.setItem('quietink_language', code);
    } catch {
      // ignore
    }
  };

  // Modals & Solitude Mode
  const [isCalmModeOpen, setIsCalmModeOpen] = useState<boolean>(false);
  const [isMixerOpen, setIsMixerOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isSolitudeMode, setIsSolitudeMode] = useState<boolean>(false);

  // Theme state
  const [activeThemeId, setActiveThemeId] = useState<ThemeId>(storageService.getActiveTheme());
  const activeTheme: ThemeConfig = getThemeById(activeThemeId);

  // Audio system state
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(ambientAudio.isMuted());
  const [activeSoundCount, setActiveSoundCount] = useState<number>(0);

  // Core Data states
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [timeCapsules, setTimeCapsules] = useState<TimeCapsule[]>([]);
  const [futureLetters, setFutureLetters] = useState<FutureLetter[]>([]);
  const [gardenData, setGardenData] = useState<GrowthGardenData>({
    totalEntries: 0,
    totalWordsWritten: 0,
    seedsPlanted: 0,
    bloomingFlowers: 0,
    firefliesGathered: 0,
    gentleLevel: 1,
  });
  const [userProfile, setUserProfile] = useState<UserProfile>(storageService.getUserProfile());
  const [socialLinks, setSocialLinks] = useState(() => storageService.getSocialLinks());

  // Load all persisted data on mount
  useEffect(() => {
    refreshAllData();
    updateActiveSoundCount();
  }, []);

  const refreshAllData = () => {
    setEntries(storageService.getEntries());
    setTimeCapsules(storageService.getTimeCapsules());
    setFutureLetters(storageService.getFutureLetters());
    setGardenData(storageService.getGrowthGardenData());
    setUserProfile(storageService.getUserProfile());
    setSocialLinks(storageService.getSocialLinks());
  };

  const updateActiveSoundCount = () => {
    const activeCount = ambientAudio.getChannels().filter((c) => c.enabled).length;
    setActiveSoundCount(activeCount);
    setIsAudioMuted(ambientAudio.isMuted());
  };

  // Theme selection handler
  const handleSelectTheme = (themeId: ThemeId) => {
    setActiveThemeId(themeId);
    storageService.setActiveTheme(themeId);
  };

  // Save entry handler
  const handleSaveEntry = (entryData: {
    id?: string;
    title: string;
    content: string;
    emotionalWeather: EmotionalWeather;
    writingMode: WritingMode;
    tags: string[];
    category: string;
    isFavorite: boolean;
    isArchived: boolean;
  }) => {
    storageService.saveEntry(entryData);
    refreshAllData();
  };

  // Delete entry handler
  const handleDeleteEntry = (id: string) => {
    storageService.deleteEntry(id);
    refreshAllData();
  };

  // Toggle favorite handler
  const handleToggleFavorite = (id: string) => {
    storageService.toggleFavorite(id);
    refreshAllData();
  };

  // Save time capsule handler
  const handleSaveCapsule = (title: string, message: string, unlockDate: string, unlockNote?: string) => {
    storageService.saveTimeCapsule(title, message, unlockDate, unlockNote);
    refreshAllData();
  };

  // Save future letter handler
  const handleSaveFutureLetter = (message: string, scheduledOpenDate: string, category?: string) => {
    storageService.saveFutureLetter(message, scheduledOpenDate, category);
    refreshAllData();
  };

  // Mark future letter opened
  const handleMarkLetterOpened = (id: string) => {
    storageService.markLetterOpened(id);
    refreshAllData();
  };

  // Update user profile
  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    const saved = storageService.saveUserProfile(updated);
    setUserProfile(saved);
  };

  // Navigation helpers
  const handleStartWriting = (initialMode?: string) => {
    setEntryToEdit(null);
    setCurrentView('writing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEntry = (entry: JournalEntry) => {
    setEntryToEdit(entry);
    setCurrentView('writing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartWritingWithAtmosphere = (atmoId: string) => {
    handleStartWriting();
  };

  return (
    <div
      id="quietink-app"
      className="min-h-screen flex flex-col transition-colors duration-300 antialiased selection:bg-amber-100 selection:text-neutral-900"
      style={{
        backgroundColor: activeTheme.bgPage,
        color: activeTheme.textPrimary,
        fontFamily: siteConfig.preferences.defaultFontFamily
      }}
    >
      {/* Navigation Bar (Hidden during full distraction-free Solitude Mode) */}
      {!isSolitudeMode && (
        <Navbar
          currentView={currentView}
          onNavigate={(view) => {
            setCurrentView(view);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          activeTheme={activeTheme}
          onSelectTheme={handleSelectTheme}
          onOpenMixer={() => setIsMixerOpen(true)}
          onOpenCalmMode={() => setIsCalmModeOpen(true)}
          onToggleSolitude={() => setIsSolitudeMode(!isSolitudeMode)}
          onOpenProfile={() => setIsProfileOpen(true)}
          onOpenAdmin={() => setIsAdminOpen(true)}
          isAudioMuted={isAudioMuted}
          onToggleMasterAudio={() => {
            ambientAudio.toggleMasterMute();
            updateActiveSoundCount();
          }}
          activeSoundCount={activeSoundCount}
          currentLanguage={currentLanguage}
          onSelectLanguage={handleSelectLanguage}
        />
      )}

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingPage
            activeTheme={activeTheme}
            onStartWriting={() => handleStartWriting('free')}
            onExploreDashboard={() => setCurrentView('dashboard')}
            onOpenCalmMode={() => setIsCalmModeOpen(true)}
            onOpenMixer={() => setIsMixerOpen(true)}
          />
        )}

        {currentView === 'dashboard' && (
          <JournalDashboard
            activeTheme={activeTheme}
            userName={userProfile.name}
            entries={entries}
            timeCapsules={timeCapsules}
            futureLetters={futureLetters}
            gardenData={gardenData}
            onNewEntry={handleStartWriting}
            onOpenEntry={handleOpenEntry}
            onDeleteEntry={handleDeleteEntry}
            onToggleFavorite={handleToggleFavorite}
            onNavigate={(view) => setCurrentView(view)}
          />
        )}

        {currentView === 'writing' && (
          <WritingRoom
            activeTheme={activeTheme}
            entryToEdit={entryToEdit}
            onSaveEntry={handleSaveEntry}
            onExit={() => {
              setIsSolitudeMode(false);
              setCurrentView('dashboard');
            }}
            onOpenMixer={() => setIsMixerOpen(true)}
            onOpenCalmMode={() => setIsCalmModeOpen(true)}
            isSolitudeMode={isSolitudeMode}
            onToggleSolitude={() => setIsSolitudeMode(!isSolitudeMode)}
            isAudioMuted={isAudioMuted}
            onToggleMasterAudio={() => {
              ambientAudio.toggleMasterMute();
              updateActiveSoundCount();
            }}
          />
        )}

        {currentView === 'capsules' && (
          <TimeCapsuleSection
            activeTheme={activeTheme}
            timeCapsules={timeCapsules}
            onSaveCapsule={handleSaveCapsule}
            onNavigate={(view) => setCurrentView(view)}
          />
        )}

        {currentView === 'future-me' && (
          <FutureMeSection
            activeTheme={activeTheme}
            letters={futureLetters}
            onSaveLetter={handleSaveFutureLetter}
            onMarkOpened={handleMarkLetterOpened}
          />
        )}

        {currentView === 'garden' && (
          <GrowthGarden
            activeTheme={activeTheme}
            gardenData={gardenData}
            onStartWriting={() => handleStartWriting('free')}
          />
        )}

        {currentView === 'library' && (
          <PersonalLibrary
            activeTheme={activeTheme}
            entries={entries}
            onOpenEntry={handleOpenEntry}
            onNewEntry={() => handleStartWriting('free')}
          />
        )}
      </main>

      {/* Footer (Hidden during Solitude Mode) */}
      {!isSolitudeMode && (
        <Footer
          activeTheme={activeTheme}
          customSocialLinks={socialLinks}
          onOpenAdmin={() => setIsAdminOpen(true)}
          onNavigate={(view) => {
            setCurrentView(view);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* Modals & Overlays */}
      <CalmModeModal
        isOpen={isCalmModeOpen}
        onClose={() => setIsCalmModeOpen(false)}
        activeTheme={activeTheme}
        onStartWritingWithAtmosphere={handleStartWritingWithAtmosphere}
      />

      <AmbientMixerModal
        isOpen={isMixerOpen}
        onClose={() => setIsMixerOpen(false)}
        activeTheme={activeTheme}
        onChannelsChanged={updateActiveSoundCount}
      />

      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        activeTheme={activeTheme}
        userProfile={userProfile}
        onUpdateProfile={handleUpdateProfile}
        onDataReset={refreshAllData}
      />

      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        activeTheme={activeTheme}
        onSocialLinksUpdated={() => setSocialLinks(storageService.getSocialLinks())}
      />
    </div>
  );
}
