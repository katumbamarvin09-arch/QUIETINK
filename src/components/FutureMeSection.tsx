/*
====================================================================
QUIETINK LETTER TO FUTURE ME
====================================================================
FILE: src/components/FutureMeSection.tsx
PURPOSE:
Enables users to write thoughtful, sealed letters to their future selves.
Styled with a tactile, sealed-envelope aesthetic, opening with
"Dear future me..." and protected until the chosen scheduled open date.

WHAT YOU CAN CUSTOMIZE:
- Default letter salutation or categories
- Envelope styling accents
====================================================================
*/

import React, { useState } from 'react';
import { Mail, Calendar, Send, Sparkles, CheckCircle2, Lock, Eye } from 'lucide-react';
import { FutureLetter, ThemeConfig } from '../types/journal';

interface FutureMeSectionProps {
  activeTheme: ThemeConfig;
  letters: FutureLetter[];
  onSaveLetter: (message: string, scheduledOpenDate: string, category?: string) => void;
  onMarkOpened: (id: string) => void;
}

export const FutureMeSection: React.FC<FutureMeSectionProps> = ({
  activeTheme,
  letters,
  onSaveLetter,
  onMarkOpened,
}) => {
  const [message, setMessage] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [category, setCategory] = useState('Personal Reflection');
  const [submittedNotice, setSubmittedNotice] = useState(false);
  const [activeReadingLetter, setActiveReadingLetter] = useState<FutureLetter | null>(null);

  // Set default scheduled date to 1 year in the future
  const defaultFutureDate = () => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    return d.toISOString().split('T')[0];
  };

  const handleSendLetter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const targetDate = scheduledDate
      ? new Date(scheduledDate).toISOString()
      : new Date(Date.now() + 1000 * 60 * 60 * 24 * 365).toISOString();

    onSaveLetter(message, targetDate, category);
    setMessage('');
    setScheduledDate('');
    setSubmittedNotice(true);
    setTimeout(() => setSubmittedNotice(false), 4000);
  };

  return (
    <div id="future-me-root" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      {/* 1. PEACEFUL HEADER */}
      <div className="text-center max-w-xl mx-auto mb-12">
        <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-4 border" style={{ backgroundColor: activeTheme.borderColor, borderColor: activeTheme.borderColor }}>
          <Mail className="w-6 h-6" style={{ color: activeTheme.accentColor }} />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-normal mb-3 tracking-tight" style={{ color: activeTheme.textPrimary }}>
          Letters to Future Me
        </h1>
        <p className="text-xs sm:text-sm leading-relaxed" style={{ color: activeTheme.textSecondary }}>
          Send a gentle dispatch across time. Speak honestly to the person you hope to become,
          sealed in an envelope until your chosen arrival date.
        </p>
      </div>

      {/* 2. SEALED ENVELOPE WRITING DESK */}
      <div
        className="rounded-3xl border shadow-md p-6 sm:p-10 mb-14 transition-all relative overflow-hidden"
        style={{
          backgroundColor: activeTheme.bgCard,
          borderColor: activeTheme.borderColor
        }}
      >
        {/* Subtle decorative wax-seal styling icon */}
        <div className="flex items-center justify-between pb-6 border-b mb-6" style={{ borderColor: activeTheme.borderColor }}>
          <div className="flex items-center space-x-2">
            <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: activeTheme.textSecondary }}>
              Recipient:
            </span>
            <span className="font-serif text-base font-semibold px-2.5 py-0.5 rounded-full border text-xs" style={{ borderColor: activeTheme.borderColor, color: activeTheme.textPrimary }}>
              Future Me
            </span>
          </div>

          <span className="text-[11px] font-sans" style={{ color: activeTheme.textSecondary }}>
            Penned in digital solitude
          </span>
        </div>

        {submittedNotice && (
          <div className="mb-6 p-4 rounded-xl border bg-emerald-50 text-emerald-800 border-emerald-200 text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Your letter has been sealed into its envelope and scheduled across time.</span>
          </div>
        )}

        <form onSubmit={handleSendLetter} className="space-y-6">
          {/* Formal Opening Salutation */}
          <div>
            <span className="font-serif text-xl sm:text-2xl font-normal italic block mb-3" style={{ color: activeTheme.textPrimary }}>
              Dear future me,
            </span>

            {/* Letter Text Area */}
            <textarea
              rows={8}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What do you want to ask your future self? Are you happy? Did you make peace with the things you couldn't control? Remember what you cared about on this day..."
              className="w-full p-4 rounded-2xl text-sm leading-relaxed border focus:outline-none transition-all font-serif"
              style={{
                backgroundColor: activeTheme.bgInput,
                borderColor: activeTheme.borderColor,
                color: activeTheme.textPrimary,
                lineHeight: 1.8
              }}
              required
            />
          </div>

          {/* Scheduled Arrival Date & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider mb-1.5" style={{ color: activeTheme.textSecondary }}>
                Scheduled Delivery / Open Date
              </label>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                defaultValue={defaultFutureDate()}
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-xs border focus:outline-none"
                style={{
                  backgroundColor: activeTheme.bgInput,
                  borderColor: activeTheme.borderColor,
                  color: activeTheme.textPrimary
                }}
              />
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wider mb-1.5" style={{ color: activeTheme.textSecondary }}>
                Letter Theme / Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-xs border focus:outline-none"
                style={{
                  backgroundColor: activeTheme.bgInput,
                  borderColor: activeTheme.borderColor,
                  color: activeTheme.textPrimary
                }}
              >
                <option value="Personal Reflection">Personal Reflection</option>
                <option value="Life Transition">Life Transition</option>
                <option value="Aspirations & Dreams">Aspirations & Dreams</option>
                <option value="Gratitude & Hope">Gratitude & Hope</option>
                <option value="Words of Reassurance">Words of Reassurance</option>
              </select>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-7 py-3 rounded-full text-xs font-medium tracking-wide flex items-center space-x-2 transition-transform active:scale-95 shadow-xs cursor-pointer"
              style={{
                backgroundColor: activeTheme.accentColor,
                color: '#FFFFFF'
              }}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Seal & Schedule Letter</span>
            </button>
          </div>
        </form>
      </div>

      {/* 3. YOUR SENT LETTERS TIMELINE */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl font-medium" style={{ color: activeTheme.textPrimary }}>
            Your Letterbox
          </h2>
          <span className="text-xs" style={{ color: activeTheme.textSecondary }}>
            {letters.length} {letters.length === 1 ? 'letter' : 'letters'}
          </span>
        </div>

        {letters.length === 0 ? (
          <div className="p-8 rounded-2xl border text-center" style={{ backgroundColor: activeTheme.bgCard, borderColor: activeTheme.borderColor }}>
            <p className="text-xs" style={{ color: activeTheme.textSecondary }}>
              No letters written to your future self yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {letters.map((letter) => {
              const openTimestamp = new Date(letter.scheduledOpenDate).getTime();
              const isLocked = openTimestamp > Date.now();
              const isInspecting = activeReadingLetter?.id === letter.id;

              return (
                <div
                  key={letter.id}
                  className="p-6 rounded-2xl border transition-all text-left"
                  style={{
                    backgroundColor: activeTheme.bgCard,
                    borderColor: activeTheme.borderColor
                  }}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: activeTheme.borderColor }}>
                        <Mail className="w-4 h-4" style={{ color: activeTheme.accentColor }} />
                      </div>
                      <div>
                        <span className="font-serif text-base font-medium block" style={{ color: activeTheme.textPrimary }}>
                          To: Future Me ({letter.category || 'Reflection'})
                        </span>
                        <span className="text-[11px]" style={{ color: activeTheme.textSecondary }}>
                          Penned on {new Date(letter.writtenDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <span
                      className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border"
                      style={{
                        backgroundColor: isLocked ? activeTheme.bgInput : '#ECFDF5',
                        borderColor: isLocked ? activeTheme.borderColor : '#A7F3D0',
                        color: isLocked ? activeTheme.textSecondary : '#065F46'
                      }}
                    >
                      {isLocked ? `Sealed until ${new Date(letter.scheduledOpenDate).toLocaleDateString()}` : 'Delivered & Open'}
                    </span>
                  </div>

                  {/* Letter Content preview */}
                  {isLocked ? (
                    <div className="p-4 rounded-xl border border-dashed text-xs text-center my-3" style={{ borderColor: activeTheme.borderColor, backgroundColor: activeTheme.bgInput }}>
                      <Lock className="w-4 h-4 mx-auto mb-1 text-amber-600 opacity-60" />
                      <span className="font-medium block" style={{ color: activeTheme.textPrimary }}>
                        Envelope sealed tight.
                      </span>
                      <span className="text-[11px]" style={{ color: activeTheme.textSecondary }}>
                        Scheduled to arrive on {new Date(letter.scheduledOpenDate).toLocaleDateString()}.
                      </span>
                    </div>
                  ) : (
                    <div className="my-3">
                      {isInspecting ? (
                        <div className="p-5 rounded-2xl border text-sm font-serif leading-relaxed whitespace-pre-wrap" style={{ backgroundColor: activeTheme.bgInput, borderColor: activeTheme.borderColor, color: activeTheme.textPrimary }}>
                          <p className="font-semibold mb-2">Dear future me,</p>
                          {letter.message}
                        </div>
                      ) : (
                        <p className="text-xs font-serif italic line-clamp-2" style={{ color: activeTheme.textSecondary }}>
                          "Dear future me, {letter.message.slice(0, 100)}..."
                        </p>
                      )}
                    </div>
                  )}

                  {!isLocked && (
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => {
                          if (!letter.isOpened) onMarkOpened(letter.id);
                          setActiveReadingLetter(isInspecting ? null : letter);
                        }}
                        className="text-xs font-medium hover:underline cursor-pointer"
                        style={{ color: activeTheme.accentColor }}
                      >
                        {isInspecting ? "Fold Letter Back" : "Read Full Letter"}
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
