/*
====================================================================
QUIETINK OPTIONAL ADMINISTRATOR CONTROL PANEL
====================================================================
FILE: src/components/AdminPanelModal.tsx
PURPOSE:
Provides site-wide administration tools for managing global prompts,
system settings, social media links & icons, theme configurations, and atmospheres.

PRIVACY ARCHITECTURE NOTICE:
In adherence to QuietInk's foundational privacy rule:
ADMINISTRATORS DO NOT HAVE BACKDOOR ACCESS TO USERS' PRIVATE JOURNALS.
Site operators manage platform parameters, prompts, and server health
without compromising individual users' sacred thoughts.
====================================================================
*/

import React, { useState } from 'react';
import {
  X,
  ShieldAlert,
  Sliders,
  Sparkles,
  Volume2,
  FileText,
  Settings,
  Database,
  CheckCircle2,
  Lock,
  Share2,
  Copy,
  RotateCcw,
  ExternalLink,
  Code2
} from 'lucide-react';
import { ThemeConfig } from '../types/journal';
import { dailyPrompts } from '../data/prompts';
import { atmospheres } from '../data/atmospheres';
import { siteConfig } from '../config/siteConfig';
import { SocialIcons, PLATFORM_METADATA, SocialPlatformId, SocialPlatformIcons } from './SocialIcons';
import { storageService } from '../services/storageService';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTheme: ThemeConfig;
  onSocialLinksUpdated?: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  activeTheme,
  onSocialLinksUpdated,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'socials' | 'prompts' | 'atmospheres' | 'privacy'>('overview');
  const [promptsList, setPromptsList] = useState<string[]>(dailyPrompts);
  const [newPromptText, setNewPromptText] = useState('');
  const [promptSaved, setPromptSaved] = useState(false);

  // Social Links management state
  const [socialForm, setSocialForm] = useState(() => storageService.getSocialLinks());
  const [socialSaveSuccess, setSocialSaveSuccess] = useState(false);
  const [copiedConfigCode, setCopiedConfigCode] = useState(false);
  const [previewVariant, setPreviewVariant] = useState<'circle' | 'pill' | 'minimal'>('circle');

  if (!isOpen) return null;

  const handleAddPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPromptText.trim()) return;
    setPromptsList([newPromptText.trim(), ...promptsList]);
    setNewPromptText('');
    setPromptSaved(true);
    setTimeout(() => setPromptSaved(false), 3000);
  };

  const handleSaveSocialLinks = (e: React.FormEvent) => {
    e.preventDefault();
    storageService.saveSocialLinks(socialForm);
    setSocialSaveSuccess(true);
    if (onSocialLinksUpdated) onSocialLinksUpdated();
    setTimeout(() => setSocialSaveSuccess(false), 3000);
  };

  const handleResetSocials = () => {
    const defaultLinks = storageService.resetSocialLinks();
    setSocialForm({ ...defaultLinks });
    if (onSocialLinksUpdated) onSocialLinksUpdated();
  };

  const handleCopyConfigCode = async () => {
    const code = `  // Social Media Links (Set to empty string "" to hide any platform)
  socialLinks: ${JSON.stringify(socialForm, null, 4)},`;

    try {
      await navigator.clipboard.writeText(code);
      setCopiedConfigCode(true);
      setTimeout(() => setCopiedConfigCode(false), 3000);
    } catch {
      // ignore
    }
  };

  const platforms = Object.keys(PLATFORM_METADATA) as SocialPlatformId[];

  return (
    <div
      id="admin-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/60 overflow-y-auto"
    >
      <div
        id="admin-modal-container"
        className="w-full max-w-3xl rounded-3xl border shadow-2xl p-6 sm:p-8 relative transition-all my-8 max-h-[90vh] flex flex-col"
        style={{
          backgroundColor: activeTheme.bgCard,
          borderColor: activeTheme.borderColor,
          color: activeTheme.textPrimary
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b mb-6 shrink-0" style={{ borderColor: activeTheme.borderColor }}>
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: activeTheme.borderColor }}>
              <Settings className="w-4 h-4" style={{ color: activeTheme.accentColor }} />
            </div>
            <div>
              <h3 className="font-serif text-xl font-medium" style={{ color: activeTheme.textPrimary }}>
                Platform Administration
              </h3>
              <span className="text-[11px] font-sans" style={{ color: activeTheme.textSecondary }}>
                Site settings, social media icons, prompts, and privacy verification
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:opacity-75 cursor-pointer"
            title="Close Admin Panel"
          >
            <X className="w-4 h-4" style={{ color: activeTheme.textSecondary }} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-1.5 border-b pb-3 mb-6 text-xs shrink-0" style={{ borderColor: activeTheme.borderColor }}>
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'overview' ? 'font-semibold shadow-xs' : 'opacity-70 hover:opacity-100'
            }`}
            style={{
              backgroundColor: activeTab === 'overview' ? activeTheme.borderColor : 'transparent',
              color: activeTheme.textPrimary
            }}
          >
            System Overview
          </button>

          <button
            onClick={() => setActiveTab('socials')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'socials' ? 'font-semibold shadow-xs' : 'opacity-70 hover:opacity-100'
            }`}
            style={{
              backgroundColor: activeTab === 'socials' ? activeTheme.borderColor : 'transparent',
              color: activeTheme.textPrimary
            }}
          >
            <Share2 className="w-3.5 h-3.5" style={{ color: activeTheme.accentColor }} />
            <span>Social Media Icons</span>
          </button>

          <button
            onClick={() => setActiveTab('prompts')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'prompts' ? 'font-semibold shadow-xs' : 'opacity-70 hover:opacity-100'
            }`}
            style={{
              backgroundColor: activeTab === 'prompts' ? activeTheme.borderColor : 'transparent',
              color: activeTheme.textPrimary
            }}
          >
            Prompt Library ({promptsList.length})
          </button>

          <button
            onClick={() => setActiveTab('atmospheres')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'atmospheres' ? 'font-semibold shadow-xs' : 'opacity-70 hover:opacity-100'
            }`}
            style={{
              backgroundColor: activeTab === 'atmospheres' ? activeTheme.borderColor : 'transparent',
              color: activeTheme.textPrimary
            }}
          >
            Atmospheres ({atmospheres.length})
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'privacy' ? 'font-semibold shadow-xs' : 'opacity-70 hover:opacity-100'
            }`}
            style={{
              backgroundColor: activeTab === 'privacy' ? activeTheme.borderColor : 'transparent',
              color: activeTheme.textPrimary
            }}
          >
            Privacy Integrity
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto pr-1">
          {activeTab === 'overview' && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl border" style={{ backgroundColor: activeTheme.bgInput, borderColor: activeTheme.borderColor }}>
                  <span className="text-[10px] uppercase tracking-wider block mb-1 opacity-60">Platform Name</span>
                  <span className="font-serif text-base font-medium">{siteConfig.siteName}</span>
                </div>
                <div className="p-4 rounded-xl border" style={{ backgroundColor: activeTheme.bgInput, borderColor: activeTheme.borderColor }}>
                  <span className="text-[10px] uppercase tracking-wider block mb-1 opacity-60">Storage Mode</span>
                  <span className="font-serif text-base font-medium">Local-First Vault</span>
                </div>
                <div className="p-4 rounded-xl border" style={{ backgroundColor: activeTheme.bgInput, borderColor: activeTheme.borderColor }}>
                  <span className="text-[10px] uppercase tracking-wider block mb-1 opacity-60">Audio Engine</span>
                  <span className="font-serif text-base font-medium">Web Audio Procedural</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl border" style={{ backgroundColor: activeTheme.bgInput, borderColor: activeTheme.borderColor }}>
                <h4 className="font-serif text-sm font-medium mb-1">Architecture Summary</h4>
                <p className="leading-relaxed opacity-80 mb-2">
                  QuietInk is architected for privacy, peace, and minimal footprint.
                  Global configurations are maintained in <code className="font-mono text-[11px] px-1 bg-black/10 rounded">src/config/siteConfig.ts</code>.
                </p>
                <p className="leading-relaxed opacity-80">
                  Social media icons are dynamically rendered using <code className="font-mono text-[11px] px-1 bg-black/10 rounded">src/components/SocialIcons.tsx</code>. You can customize them in the <strong>Social Media Icons</strong> tab or directly in your code editor.
                </p>
              </div>
            </div>
          )}

          {/* Social Media Configuration Tab */}
          {activeTab === 'socials' && (
            <div className="space-y-6 text-xs">
              {/* Notifications */}
              {socialSaveSuccess && (
                <div className="p-3 rounded-xl border bg-emerald-50 text-emerald-800 border-emerald-200 text-xs flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Social media links updated successfully! The footer and site now reflect your profiles.</span>
                </div>
              )}

              {copiedConfigCode && (
                <div className="p-3 rounded-xl border bg-blue-50 text-blue-800 border-blue-200 text-xs flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>TypeScript snippet copied! You can paste this directly into <code className="font-mono">src/config/siteConfig.ts</code> in VS Code.</span>
                </div>
              )}

              {/* Live Preview Panel */}
              <div
                className="p-5 rounded-2xl border transition-all"
                style={{ backgroundColor: activeTheme.bgInput, borderColor: activeTheme.borderColor }}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold block mb-0.5" style={{ color: activeTheme.accentColor }}>
                      Live Component Preview
                    </span>
                    <span className="text-xs opacity-70">
                      Shows how your social media icons appear to visitors in the footer with the current theme.
                    </span>
                  </div>

                  {/* Variant switcher */}
                  <div className="flex items-center space-x-1 border rounded-lg p-0.5 text-[11px]" style={{ borderColor: activeTheme.borderColor }}>
                    <button
                      type="button"
                      onClick={() => setPreviewVariant('circle')}
                      className={`px-2 py-1 rounded cursor-pointer ${previewVariant === 'circle' ? 'font-semibold shadow-2xs' : 'opacity-60'}`}
                      style={{ backgroundColor: previewVariant === 'circle' ? activeTheme.bgCard : 'transparent' }}
                    >
                      Circles
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewVariant('pill')}
                      className={`px-2 py-1 rounded cursor-pointer ${previewVariant === 'pill' ? 'font-semibold shadow-2xs' : 'opacity-60'}`}
                      style={{ backgroundColor: previewVariant === 'pill' ? activeTheme.bgCard : 'transparent' }}
                    >
                      Pills
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewVariant('minimal')}
                      className={`px-2 py-1 rounded cursor-pointer ${previewVariant === 'minimal' ? 'font-semibold shadow-2xs' : 'opacity-60'}`}
                      style={{ backgroundColor: previewVariant === 'minimal' ? activeTheme.bgCard : 'transparent' }}
                    >
                      Minimal
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-xl border flex items-center justify-center bg-black/5 dark:bg-white/5" style={{ borderColor: activeTheme.borderColor }}>
                  <SocialIcons
                    activeTheme={activeTheme}
                    variant={previewVariant}
                    size="md"
                    customLinks={socialForm}
                    showShareButton={true}
                    align="center"
                  />
                </div>
              </div>

              {/* Configuration Form */}
              <form onSubmit={handleSaveSocialLinks} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-sm font-medium">Profile Links & Usernames</h4>
                  <span className="text-[11px] opacity-60">Leave blank to hide any icon</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {platforms.map((platform) => {
                    const IconComp = SocialPlatformIcons[platform];
                    const meta = PLATFORM_METADATA[platform];
                    const currentValue = socialForm[platform as keyof typeof socialForm] || '';

                    return (
                      <div
                        key={platform}
                        className="p-2.5 rounded-xl border flex items-center space-x-2.5 transition-colors"
                        style={{ backgroundColor: activeTheme.bgInput, borderColor: activeTheme.borderColor }}
                      >
                        <div
                          className="w-7 h-7 rounded-full border flex items-center justify-center shrink-0"
                          style={{
                            borderColor: activeTheme.borderColor,
                            backgroundColor: activeTheme.bgCard,
                            color: activeTheme.textPrimary
                          }}
                        >
                          <IconComp className="w-3.5 h-3.5" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <label className="block text-[10px] font-medium opacity-70 mb-0.5">
                            {meta.label}
                          </label>
                          <input
                            type="text"
                            value={currentValue}
                            onChange={(e) => {
                              setSocialForm({
                                ...socialForm,
                                [platform]: e.target.value
                              });
                            }}
                            placeholder={meta.placeholder}
                            className="w-full text-xs bg-transparent border-none outline-none p-0 focus:ring-0 truncate"
                            style={{ color: activeTheme.textPrimary }}
                          />
                        </div>

                        {currentValue.trim() ? (
                          <a
                            href={platform === 'email' && !currentValue.startsWith('mailto:') ? `mailto:${currentValue}` : currentValue}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={`Test opening ${meta.label}`}
                            className="p-1 rounded opacity-50 hover:opacity-100 cursor-pointer"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : null}
                      </div>
                    );
                  })}
                </div>

                {/* Action buttons */}
                <div className="pt-3 flex flex-wrap items-center justify-between gap-2 border-t" style={{ borderColor: activeTheme.borderColor }}>
                  <div className="flex items-center space-x-2">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl text-xs font-medium cursor-pointer shadow-xs transition-transform active:scale-95"
                      style={{ backgroundColor: activeTheme.accentColor, color: '#FFFFFF' }}
                    >
                      Save to Website
                    </button>

                    <button
                      type="button"
                      onClick={handleResetSocials}
                      className="px-3 py-2 rounded-xl text-xs border opacity-80 hover:opacity-100 transition-opacity cursor-pointer flex items-center space-x-1"
                      style={{ borderColor: activeTheme.borderColor }}
                      title="Reset all links to siteConfig.ts defaults"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyConfigCode}
                    className="px-3 py-2 rounded-xl text-xs border opacity-90 hover:opacity-100 transition-opacity cursor-pointer flex items-center space-x-1.5"
                    style={{ borderColor: activeTheme.borderColor, backgroundColor: activeTheme.bgInput }}
                    title="Copy TypeScript configuration to paste into VS Code"
                  >
                    <Code2 className="w-3.5 h-3.5" style={{ color: activeTheme.accentColor }} />
                    <span>Copy for VS Code (siteConfig.ts)</span>
                  </button>
                </div>
              </form>

              {/* Step-by-step developer notes */}
              <div
                className="p-4 rounded-2xl border text-[11px] leading-relaxed space-y-2 opacity-90"
                style={{ backgroundColor: activeTheme.bgInput, borderColor: activeTheme.borderColor }}
              >
                <span className="font-serif font-medium text-xs block" style={{ color: activeTheme.textPrimary }}>
                  💡 How to customize social icons in VS Code for Windows:
                </span>
                <ol className="list-decimal list-inside space-y-1 opacity-80">
                  <li>Open your project folder in <strong>VS Code</strong>.</li>
                  <li>Press <kbd className="font-mono bg-black/10 px-1 rounded">Ctrl + P</kbd> and type <code className="font-mono">siteConfig.ts</code>.</li>
                  <li>Find the <code className="font-mono">socialLinks</code> object around line 50.</li>
                  <li>Paste or edit your usernames/URLs. Set any channel to <code className="font-mono">""</code> (empty quotes) to automatically hide its icon.</li>
                  <li>Save the file (<kbd className="font-mono bg-black/10 px-1 rounded">Ctrl + S</kbd>). Your browser will update immediately!</li>
                </ol>
              </div>
            </div>
          )}

          {activeTab === 'prompts' && (
            <div className="space-y-4 text-xs">
              {promptSaved && (
                <div className="p-3 rounded-xl border bg-emerald-50 text-emerald-800 border-emerald-200 text-xs flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>New quiet question added to the runtime prompt rotation.</span>
                </div>
              )}

              {/* Add prompt */}
              <form onSubmit={handleAddPrompt} className="flex gap-2">
                <input
                  type="text"
                  value={newPromptText}
                  onChange={(e) => setNewPromptText(e.target.value)}
                  placeholder="Add a new quiet question for journalers..."
                  className="flex-1 px-4 py-2 rounded-xl border focus:outline-none"
                  style={{ backgroundColor: activeTheme.bgInput, borderColor: activeTheme.borderColor }}
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-medium cursor-pointer"
                  style={{ backgroundColor: activeTheme.accentColor, color: '#FFFFFF' }}
                >
                  Add Prompt
                </button>
              </form>

              <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                {promptsList.map((prompt, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border text-left font-serif italic"
                    style={{ backgroundColor: activeTheme.bgInput, borderColor: activeTheme.borderColor }}
                  >
                    "{prompt}"
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'atmospheres' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              {atmospheres.map((atmo) => (
                <div
                  key={atmo.id}
                  className="p-3 rounded-xl border text-left"
                  style={{ backgroundColor: activeTheme.bgInput, borderColor: activeTheme.borderColor }}
                >
                  <h5 className="font-serif font-medium mb-1">{atmo.name}</h5>
                  <span className="text-[10px] opacity-60 block mb-1">Canvas: {atmo.canvasEffect}</span>
                  <span className="text-[10px] opacity-70 line-clamp-2 italic font-serif">"{atmo.quote}"</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-4 text-xs">
              <div className="p-5 rounded-2xl border border-emerald-300 bg-emerald-50 text-emerald-900 leading-relaxed">
                <div className="flex items-center space-x-2 font-semibold mb-2">
                  <Lock className="w-4 h-4 text-emerald-700" />
                  <span>Zero-Surveillance Privacy Guarantee</span>
                </div>
                <p className="text-xs mb-2">
                  Under QuietInk's ethical design framework, administrators do not possess surveillance dashboards,
                  reading feeds, or telemetry tracking of user journal entries.
                </p>
                <p className="text-[11px] opacity-80">
                  User memories remain encrypted on the user's personal browser sandbox.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t flex justify-end shrink-0" style={{ borderColor: activeTheme.borderColor }}>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full text-xs font-medium cursor-pointer"
            style={{ backgroundColor: activeTheme.accentColor, color: '#FFFFFF' }}
          >
            Close Admin View
          </button>
        </div>
      </div>
    </div>
  );
};
