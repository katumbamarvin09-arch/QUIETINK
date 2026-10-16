/*
====================================================================
QUIETINK USER PROFILE & PRIVACY VAULT MODAL
====================================================================
FILE: src/components/UserProfileModal.tsx
PURPOSE:
Provides user identity management, account personalization,
privacy verification, data export (JSON backup and Markdown),
and client-side privacy controls.

PRIVACY ARCHITECTURE:
QuietInk operates under the principle that journals are private sanctuaries.
This modal empowers the user to export their full journal data or
clear their local memory cache at any time.
====================================================================
*/

import React, { useState } from 'react';
import {
  X,
  User,
  Shield,
  Download,
  FileText,
  Trash2,
  Lock,
  Sparkles,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { ThemeConfig, UserProfile } from '../types/journal';
import { storageService } from '../services/storageService';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTheme: ThemeConfig;
  userProfile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onDataReset: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  activeTheme,
  userProfile,
  onUpdateProfile,
  onDataReset,
}) => {
  const [name, setName] = useState(userProfile.name);
  const [tagline, setTagline] = useState(userProfile.tagline);
  const [email, setEmail] = useState(userProfile.email);
  const [bio, setBio] = useState(userProfile.bio);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  if (!isOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name: name.trim() || '[YOUR NAME HERE]',
      tagline: tagline.trim(),
      email: email.trim(),
      bio: bio.trim(),
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Download entire journal data as JSON backup
  const handleExportJSON = () => {
    const jsonStr = storageService.exportAllDataJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `quietink-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Download entire journal data as human-readable Markdown
  const handleExportMarkdown = () => {
    const mdStr = storageService.exportEntriesAsMarkdown();
    const blob = new Blob([mdStr], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `quietink-journal-${new Date().toISOString().split('T')[0]}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Confirm clear all local memories
  const handleClearAll = () => {
    storageService.clearAllData();
    onDataReset();
    onClose();
  };

  return (
    <div
      id="profile-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/50 overflow-y-auto"
    >
      <div
        id="profile-modal-container"
        className="w-full max-w-xl rounded-3xl border shadow-2xl p-6 sm:p-8 relative transition-all"
        style={{
          backgroundColor: activeTheme.bgCard,
          borderColor: activeTheme.borderColor,
          color: activeTheme.textPrimary
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b mb-6" style={{ borderColor: activeTheme.borderColor }}>
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: activeTheme.borderColor }}>
              <User className="w-4 h-4" style={{ color: activeTheme.accentColor }} />
            </div>
            <div>
              <h3 className="font-serif text-xl font-medium" style={{ color: activeTheme.textPrimary }}>
                Author Sanctuary & Settings
              </h3>
              <span className="text-[11px] font-sans" style={{ color: activeTheme.textSecondary }}>
                Personalize your QuietInk identity and manage privacy
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:opacity-75 cursor-pointer"
            title="Close Settings"
          >
            <X className="w-4 h-4" style={{ color: activeTheme.textSecondary }} />
          </button>
        </div>

        {savedSuccess && (
          <div className="mb-5 p-3.5 rounded-xl border bg-emerald-50 text-emerald-800 border-emerald-200 text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Your author profile has been saved.</span>
          </div>
        )}

        {/* Profile Details Form */}
        <form onSubmit={handleSaveProfile} className="space-y-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider mb-1" style={{ color: activeTheme.textSecondary }}>
                Author Name / Pen Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="[YOUR NAME HERE]"
                className="w-full px-3.5 py-2 rounded-xl text-xs border focus:outline-none"
                style={{
                  backgroundColor: activeTheme.bgInput,
                  borderColor: activeTheme.borderColor,
                  color: activeTheme.textPrimary
                }}
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider mb-1" style={{ color: activeTheme.textSecondary }}>
                Tagline / Guiding Thought
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="[YOUR TAGLINE]"
                className="w-full px-3.5 py-2 rounded-xl text-xs border focus:outline-none"
                style={{
                  backgroundColor: activeTheme.bgInput,
                  borderColor: activeTheme.borderColor,
                  color: activeTheme.textPrimary
                }}
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium uppercase tracking-wider mb-1" style={{ color: activeTheme.textSecondary }}>
              Contact / Account Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="[YOUR EMAIL]"
              className="w-full px-3.5 py-2 rounded-xl text-xs border focus:outline-none"
              style={{
                backgroundColor: activeTheme.bgInput,
                borderColor: activeTheme.borderColor,
                color: activeTheme.textPrimary
              }}
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium uppercase tracking-wider mb-1" style={{ color: activeTheme.textSecondary }}>
              Personal Bio / Solitude Manifesto
            </label>
            <textarea
              rows={2}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="[YOUR ABOUT TEXT]"
              className="w-full px-3.5 py-2 rounded-xl text-xs border focus:outline-none"
              style={{
                backgroundColor: activeTheme.bgInput,
                borderColor: activeTheme.borderColor,
                color: activeTheme.textPrimary
              }}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 rounded-full text-xs font-medium cursor-pointer"
              style={{ backgroundColor: activeTheme.accentColor, color: '#FFFFFF' }}
            >
              Update Author Profile
            </button>
          </div>
        </form>

        {/* Privacy & Data Export Section */}
        <div className="pt-5 border-t space-y-4" style={{ borderColor: activeTheme.borderColor }}>
          <div className="flex items-center space-x-2 text-xs">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold uppercase tracking-wider text-[11px]" style={{ color: activeTheme.textSecondary }}>
              Privacy & Data Freedom
            </span>
          </div>

          <div className="p-3.5 rounded-xl border text-xs" style={{ backgroundColor: activeTheme.bgInput, borderColor: activeTheme.borderColor }}>
            <p className="leading-relaxed mb-3" style={{ color: activeTheme.textSecondary }}>
              Your journals never leave your machine unless you export them. Download a full encrypted JSON backup or clean Markdown archive at any time.
            </p>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleExportJSON}
                className="px-3.5 py-1.5 rounded-lg border text-xs flex items-center space-x-1.5 hover:opacity-80 cursor-pointer"
                style={{ borderColor: activeTheme.borderColor, color: activeTheme.textPrimary }}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON Backup</span>
              </button>

              <button
                type="button"
                onClick={handleExportMarkdown}
                className="px-3.5 py-1.5 rounded-lg border text-xs flex items-center space-x-1.5 hover:opacity-80 cursor-pointer"
                style={{ borderColor: activeTheme.borderColor, color: activeTheme.textPrimary }}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Export Markdown (.md)</span>
              </button>
            </div>
          </div>

          {/* Danger Zone: Reset Data */}
          <div className="pt-2 flex items-center justify-between text-xs">
            <span className="text-[11px] opacity-60" style={{ color: activeTheme.textSecondary }}>
              Need a completely fresh start?
            </span>
            {confirmClear ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleClearAll}
                  className="px-3 py-1 bg-red-600 text-white rounded-lg text-[11px] font-medium cursor-pointer"
                >
                  Yes, Clear Everything
                </button>
                <button
                  onClick={() => setConfirmClear(false)}
                  className="text-[11px] hover:underline cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmClear(true)}
                className="text-red-500 hover:underline text-[11px] cursor-pointer"
              >
                Reset Local Sanctuary
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
