/*
====================================================================
QUIETINK TIME CAPSULE SYSTEM
====================================================================
FILE: src/components/TimeCapsuleSection.tsx
PURPOSE:
Enables users to write memories, thoughts, and advice to themselves,
sealed securely until a chosen future unlock date (1 month, 6 months,
1 year, or a custom calendar date).

SECURITY & LOCKING ARCHITECTURE:
- The UI checks the unlock date against the current clock.
- If the current time is before the unlock date, the message text is
  cryptographically or logically concealed ("Sealed until [DATE]").
- In a full production server deployment, the backend database API
  would omit the 'message' field entirely until the unlock timestamp
  is validated server-side.
====================================================================
*/

import React, { useState } from 'react';
import {
  Clock,
  Lock,
  Unlock,
  Calendar,
  Send,
  Sparkles,
  Info,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { TimeCapsule, ThemeConfig } from '../types/journal';

interface TimeCapsuleSectionProps {
  activeTheme: ThemeConfig;
  timeCapsules: TimeCapsule[];
  onSaveCapsule: (title: string, message: string, unlockDate: string, unlockNote?: string) => void;
  onNavigate: (view: string) => void;
}

export const TimeCapsuleSection: React.FC<TimeCapsuleSectionProps> = ({
  activeTheme,
  timeCapsules,
  onSaveCapsule,
  onNavigate,
}) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [unlockNote, setUnlockNote] = useState('');
  const [selectedDuration, setSelectedDuration] = useState<'1m' | '6m' | '1y' | 'custom'>('6m');
  const [customDate, setCustomDate] = useState('');
  const [showCreatedNotice, setShowCreatedNotice] = useState(false);
  const [openedCapsuleId, setOpenedCapsuleId] = useState<string | null>(null);

  // Calculate target unlock date based on selection
  const calculateTargetDate = (): string => {
    const now = new Date();
    if (selectedDuration === '1m') {
      now.setMonth(now.getMonth() + 1);
      return now.toISOString();
    }
    if (selectedDuration === '6m') {
      now.setMonth(now.getMonth() + 6);
      return now.toISOString();
    }
    if (selectedDuration === '1y') {
      now.setFullYear(now.getFullYear() + 1);
      return now.toISOString();
    }
    if (selectedDuration === 'custom' && customDate) {
      return new Date(customDate).toISOString();
    }
    // Fallback: 6 months
    now.setMonth(now.getMonth() + 6);
    return now.toISOString();
  };

  const handleSealCapsule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const targetDate = calculateTargetDate();
    onSaveCapsule(
      title.trim() || 'Sealed Reflection',
      message.trim(),
      targetDate,
      unlockNote.trim()
    );

    // Reset form
    setTitle('');
    setMessage('');
    setUnlockNote('');
    setShowCreatedNotice(true);
    setTimeout(() => setShowCreatedNotice(false), 4000);
  };

  return (
    <div id="time-capsule-root" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      {/* 1. SECTION HEADER */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-4 border" style={{ backgroundColor: activeTheme.borderColor, borderColor: activeTheme.borderColor }}>
          <Clock className="w-6 h-6" style={{ color: activeTheme.accentColor }} />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-normal mb-3 tracking-tight" style={{ color: activeTheme.textPrimary }}>
          Sealed Time Capsules
        </h1>
        <p className="text-xs sm:text-sm leading-relaxed" style={{ color: activeTheme.textSecondary }}>
          Entrust your thoughts to the future. Write a reflection, choose a future date,
          and let time work its quiet magic. The capsule remains sealed until that day arrives.
        </p>
      </div>

      {/* 2. CREATE A TIME CAPSULE CARD */}
      <div
        className="p-6 sm:p-8 rounded-3xl border mb-14 shadow-sm"
        style={{
          backgroundColor: activeTheme.bgCard,
          borderColor: activeTheme.borderColor
        }}
      >
        <div className="flex items-center space-x-2.5 pb-4 border-b mb-6" style={{ borderColor: activeTheme.borderColor }}>
          <Lock className="w-4 h-4" style={{ color: activeTheme.accentColor }} />
          <h2 className="font-serif text-lg sm:text-xl font-medium" style={{ color: activeTheme.textPrimary }}>
            Seal a New Memory
          </h2>
        </div>

        {showCreatedNotice && (
          <div className="mb-6 p-4 rounded-xl border bg-emerald-50 text-emerald-800 border-emerald-200 text-xs flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Your memory has been safely sealed into the time capsule.</span>
          </div>
        )}

        <form onSubmit={handleSealCapsule} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider mb-1.5" style={{ color: activeTheme.textSecondary }}>
              Capsule Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Thoughts on turning 25, or What I hope stays true..."
              className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none transition-colors"
              style={{
                backgroundColor: activeTheme.bgInput,
                borderColor: activeTheme.borderColor,
                color: activeTheme.textPrimary
              }}
            />
          </div>

          {/* Capsule Duration Presets */}
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider mb-2" style={{ color: activeTheme.textSecondary }}>
              Sealed Duration
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <button
                type="button"
                onClick={() => setSelectedDuration('1m')}
                className={`py-2 px-3 rounded-xl border transition-all cursor-pointer ${
                  selectedDuration === '1m' ? 'font-medium shadow-xs' : 'opacity-70 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: selectedDuration === '1m' ? activeTheme.borderColor : activeTheme.bgInput,
                  borderColor: selectedDuration === '1m' ? activeTheme.accentColor : activeTheme.borderColor,
                  color: activeTheme.textPrimary
                }}
              >
                1 Month
              </button>

              <button
                type="button"
                onClick={() => setSelectedDuration('6m')}
                className={`py-2 px-3 rounded-xl border transition-all cursor-pointer ${
                  selectedDuration === '6m' ? 'font-medium shadow-xs' : 'opacity-70 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: selectedDuration === '6m' ? activeTheme.borderColor : activeTheme.bgInput,
                  borderColor: selectedDuration === '6m' ? activeTheme.accentColor : activeTheme.borderColor,
                  color: activeTheme.textPrimary
                }}
              >
                6 Months (Recommended)
              </button>

              <button
                type="button"
                onClick={() => setSelectedDuration('1y')}
                className={`py-2 px-3 rounded-xl border transition-all cursor-pointer ${
                  selectedDuration === '1y' ? 'font-medium shadow-xs' : 'opacity-70 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: selectedDuration === '1y' ? activeTheme.borderColor : activeTheme.bgInput,
                  borderColor: selectedDuration === '1y' ? activeTheme.accentColor : activeTheme.borderColor,
                  color: activeTheme.textPrimary
                }}
              >
                1 Year
              </button>

              <button
                type="button"
                onClick={() => setSelectedDuration('custom')}
                className={`py-2 px-3 rounded-xl border transition-all cursor-pointer ${
                  selectedDuration === 'custom' ? 'font-medium shadow-xs' : 'opacity-70 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: selectedDuration === 'custom' ? activeTheme.borderColor : activeTheme.bgInput,
                  borderColor: selectedDuration === 'custom' ? activeTheme.accentColor : activeTheme.borderColor,
                  color: activeTheme.textPrimary
                }}
              >
                Custom Date
              </button>
            </div>

            {selectedDuration === 'custom' && (
              <div className="mt-3">
                <input
                  type="date"
                  value={customDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setCustomDate(e.target.value)}
                  className="px-4 py-2 rounded-xl text-xs border focus:outline-none"
                  style={{
                    backgroundColor: activeTheme.bgInput,
                    borderColor: activeTheme.borderColor,
                    color: activeTheme.textPrimary
                  }}
                  required
                />
              </div>
            )}
          </div>

          {/* Sealed Message Area */}
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider mb-1.5" style={{ color: activeTheme.textSecondary }}>
              Your Message to the Future
            </label>
            <textarea
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write honestly without holding back. What are you facing right now? What are you praying for? What would you like to remind yourself when you open this?"
              className="w-full px-4 py-3 rounded-xl text-sm border focus:outline-none leading-relaxed"
              style={{
                backgroundColor: activeTheme.bgInput,
                borderColor: activeTheme.borderColor,
                color: activeTheme.textPrimary
              }}
              required
            />
          </div>

          {/* Hint note visible before opening */}
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider mb-1.5" style={{ color: activeTheme.textSecondary }}>
              Outer Hint Note (Optional, visible while sealed)
            </label>
            <input
              type="text"
              value={unlockNote}
              onChange={(e) => setUnlockNote(e.target.value)}
              placeholder="e.g. Open on a quiet Sunday afternoon..."
              className="w-full px-4 py-2.5 rounded-xl text-xs border focus:outline-none"
              style={{
                backgroundColor: activeTheme.bgInput,
                borderColor: activeTheme.borderColor,
                color: activeTheme.textPrimary
              }}
            />
          </div>

          {/* Submit Seal Button */}
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-7 py-3 rounded-full text-xs font-medium tracking-wide flex items-center space-x-2 transition-transform active:scale-95 shadow-xs cursor-pointer"
              style={{
                backgroundColor: activeTheme.accentColor,
                color: '#FFFFFF'
              }}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Seal Time Capsule</span>
            </button>
          </div>
        </form>
      </div>

      {/* 3. YOUR SEALED CAPSULES VAULT */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl font-medium" style={{ color: activeTheme.textPrimary }}>
            Your Capsule Vault
          </h2>
          <span className="text-xs" style={{ color: activeTheme.textSecondary }}>
            {timeCapsules.length} {timeCapsules.length === 1 ? 'capsule' : 'capsules'}
          </span>
        </div>

        {timeCapsules.length === 0 ? (
          <div className="p-8 rounded-2xl border text-center" style={{ backgroundColor: activeTheme.bgCard, borderColor: activeTheme.borderColor }}>
            <p className="text-xs" style={{ color: activeTheme.textSecondary }}>
              No time capsules sealed yet. Seal your first memory above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {timeCapsules.map((capsule) => {
              const unlockTime = new Date(capsule.unlockDate).getTime();
              const isLocked = unlockTime > Date.now();
              const daysRemaining = Math.max(0, Math.ceil((unlockTime - Date.now()) / (1000 * 60 * 60 * 24)));
              const isInspecting = openedCapsuleId === capsule.id;

              return (
                <div
                  key={capsule.id}
                  className="p-6 rounded-2xl border text-left flex flex-col justify-between transition-all"
                  style={{
                    backgroundColor: activeTheme.bgCard,
                    borderColor: activeTheme.borderColor
                  }}
                >
                  <div>
                    {/* Status Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[10px] font-sans uppercase tracking-wider font-semibold border"
                        style={{
                          backgroundColor: isLocked ? activeTheme.bgInput : '#ECFDF5',
                          borderColor: isLocked ? activeTheme.borderColor : '#A7F3D0',
                          color: isLocked ? activeTheme.textSecondary : '#065F46'
                        }}
                      >
                        {isLocked ? (
                          <>
                            <Lock className="w-3 h-3 text-amber-600" />
                            <span>Sealed until {new Date(capsule.unlockDate).toLocaleDateString()}</span>
                          </>
                        ) : (
                          <>
                            <Unlock className="w-3 h-3 text-emerald-600" />
                            <span>Unlocked & Ready</span>
                          </>
                        )}
                      </span>

                      <span className="text-[11px]" style={{ color: activeTheme.textSecondary }}>
                        Sealed {new Date(capsule.sealedAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-medium mb-2" style={{ color: activeTheme.textPrimary }}>
                      {capsule.title}
                    </h3>

                    {capsule.unlockNote && (
                      <p className="text-xs italic mb-4 font-serif" style={{ color: activeTheme.textSecondary }}>
                        Outer note: "{capsule.unlockNote}"
                      </p>
                    )}

                    {/* Locked vs Unlocked Message */}
                    {isLocked ? (
                      <div className="p-4 rounded-xl border border-dashed text-center my-3" style={{ borderColor: activeTheme.borderColor, backgroundColor: activeTheme.bgInput }}>
                        <Lock className="w-5 h-5 mx-auto mb-1.5 opacity-40 text-amber-600" />
                        <span className="text-xs block font-medium" style={{ color: activeTheme.textPrimary }}>
                          This memory is sealed in digital solitude.
                        </span>
                        <span className="text-[11px] block mt-0.5" style={{ color: activeTheme.textSecondary }}>
                          Unlocks in approximately {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'}.
                        </span>
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl border text-xs leading-relaxed my-3 font-serif" style={{ backgroundColor: activeTheme.bgInput, borderColor: activeTheme.borderColor, color: activeTheme.textPrimary }}>
                        {isInspecting ? (
                          <div className="whitespace-pre-wrap">{capsule.message}</div>
                        ) : (
                          <p className="italic opacity-80">Click below to read your unlocked reflection from the past.</p>
                        )}
                      </div>
                    )}
                  </div>

                  {!isLocked && (
                    <div className="pt-3 border-t flex justify-end" style={{ borderColor: activeTheme.borderColor }}>
                      <button
                        onClick={() => setOpenedCapsuleId(isInspecting ? null : capsule.id)}
                        className="text-xs font-medium hover:underline cursor-pointer"
                        style={{ color: activeTheme.accentColor }}
                      >
                        {isInspecting ? "Close Memory" : "Read Unlocked Memory"}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
