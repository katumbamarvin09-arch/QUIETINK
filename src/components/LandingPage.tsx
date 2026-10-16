/*
====================================================================
QUIETINK LANDING / HOME SANCTUARY PAGE
====================================================================
FILE: src/components/LandingPage.tsx
PURPOSE:
The welcoming front door to QuietInk. Designed to feel like entering
a quiet room rather than a busy product landing page.
Features serene typography, gentle atmospheric introductions,
and clear invitations to begin writing.

WHAT YOU CAN CUSTOMIZE:
- Hero headline, subtext, and quotes
- Feature cards and descriptions
- Testimonial quotes (clearly marked placeholders)
- Privacy declaration text
====================================================================
*/

import React from 'react';
import {
  Feather,
  PenLine,
  Sparkles,
  Clock,
  Mail,
  Flower2,
  Shield,
  HeartHandshake,
  ArrowRight,
  Volume2,
  Lock,
  Quote,
  User,
  Camera
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { ThemeConfig } from '../types/journal';
import { atmospheres } from '../data/atmospheres';
import { SocialIcons } from './SocialIcons';

interface LandingPageProps {
  activeTheme: ThemeConfig;
  onStartWriting: () => void;
  onExploreDashboard: () => void;
  onOpenCalmMode: () => void;
  onOpenMixer: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  activeTheme,
  onStartWriting,
  onExploreDashboard,
  onOpenCalmMode,
  onOpenMixer,
}) => {
  return (
    <div id="landing-page-root" className="min-h-screen">
      {/* 1. PEACEFUL HERO SECTION */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        {/* Official QuietInk Emblem Badge */}
        <div className="flex justify-center mb-6">
          <div className="relative group cursor-pointer" onClick={onExploreDashboard} title="QuietInk: Your Journal, Your Space">
            <div
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full shadow-md bg-white p-1 border transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg"
              style={{ borderColor: activeTheme.borderColor }}
            >
              <img
                src={siteConfig.logoPath}
                alt={siteConfig.siteName}
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900 border flex items-center justify-center text-[10px] shadow-xs"
              style={{ borderColor: activeTheme.borderColor }}
            >
              ✨
            </div>
          </div>
        </div>

        {/* Subtle decorative emblem */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-sans mb-8 border"
             style={{
               borderColor: activeTheme.borderColor,
               backgroundColor: activeTheme.bgCard,
               color: activeTheme.textSecondary
             }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: activeTheme.accentColor }}></span>
          <span>A tranquil haven away from digital noise</span>
        </div>

        {/* Hero Title */}
        <h1
          id="hero-heading"
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight leading-[1.15] mb-6"
          style={{ color: activeTheme.textPrimary }}
        >
          Your thoughts deserve <br className="hidden sm:inline" />
          <span className="italic font-normal underline decoration-1 underline-offset-8" style={{ textDecorationColor: activeTheme.accentColor }}>
            a quiet place.
          </span>
        </h1>

        {/* Tagline & Peaceful Subtitle */}
        <p
          id="hero-subtext"
          className="font-sans text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
          style={{ color: activeTheme.textSecondary }}
        >
          {siteConfig.siteShortDescription} No notifications, no likes, no rush.
          Just you, your breath, and an unhurried digital notebook.
        </p>

        {/* Primary Call-to-Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            id="start-writing-btn"
            onClick={onStartWriting}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-medium tracking-wide flex items-center justify-center space-x-2.5 transition-all transform hover:-translate-y-0.5 shadow-sm cursor-pointer"
            style={{
              backgroundColor: activeTheme.accentColor,
              color: '#FFFFFF'
            }}
          >
            <PenLine className="w-4 h-4" />
            <span>Start Writing</span>
          </button>

          <button
            id="explore-quietink-btn"
            onClick={onExploreDashboard}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-medium tracking-wide flex items-center justify-center space-x-2 transition-all border hover:opacity-80 cursor-pointer"
            style={{
              borderColor: activeTheme.borderColor,
              backgroundColor: activeTheme.bgCard,
              color: activeTheme.textPrimary
            }}
          >
            <span>Explore Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Ambient Prompt Teaser */}
        <div className="mt-14 pt-8 border-t max-w-md mx-auto" style={{ borderColor: activeTheme.borderColor }}>
          <p className="text-xs italic font-serif" style={{ color: activeTheme.textSecondary }}>
            "Today's quiet question: What is currently taking up the most quiet space in your mind?"
          </p>
        </div>
      </section>

      {/* 2. CALM ATMOSPHERES SHOWCASE */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t" style={{ borderColor: activeTheme.borderColor }}>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold mb-3" style={{ color: activeTheme.textPrimary }}>
            Step into Calm Mode
          </h2>
          <p className="font-sans text-sm leading-relaxed" style={{ color: activeTheme.textSecondary }}>
            Choose an atmosphere that soothes your state of mind. Each comes paired with soothing procedural ambient audio.
          </p>
        </div>

        {/* Atmosphere Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {atmospheres.slice(0, 4).map((atmo) => (
            <div
              key={atmo.id}
              className="p-5 rounded-2xl border transition-all hover:shadow-md text-left flex flex-col justify-between"
              style={{
                backgroundColor: activeTheme.bgCard,
                borderColor: activeTheme.borderColor
              }}
            >
              <div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-white"
                  style={{ backgroundColor: activeTheme.accentColor }}
                >
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-medium mb-1" style={{ color: activeTheme.textPrimary }}>
                  {atmo.name}
                </h3>
                <p className="text-xs leading-relaxed mb-4" style={{ color: activeTheme.textSecondary }}>
                  {atmo.description}
                </p>
              </div>
              <p className="text-[11px] italic font-serif border-t pt-3" style={{ borderColor: activeTheme.borderColor, color: activeTheme.textSecondary }}>
                "{atmo.quote}"
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={onOpenCalmMode}
            className="inline-flex items-center space-x-2 text-xs font-medium hover:underline cursor-pointer"
            style={{ color: activeTheme.accentColor }}
          >
            <span>View all 8 peaceful atmospheres</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 3. SIGNATURE FEATURES SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t" style={{ borderColor: activeTheme.borderColor }}>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold mb-3" style={{ color: activeTheme.textPrimary }}>
            Designed for Contemplation
          </h2>
          <p className="font-sans text-sm" style={{ color: activeTheme.textSecondary }}>
            Every corner of QuietInk was built to protect your focus and nurture gentle self-reflection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1: The Writing Room */}
          <div
            className="p-6 rounded-2xl border"
            style={{
              backgroundColor: activeTheme.bgCard,
              borderColor: activeTheme.borderColor
            }}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: activeTheme.borderColor }}>
              <PenLine className="w-5 h-5" style={{ color: activeTheme.accentColor }} />
            </div>
            <h3 className="font-serif text-lg font-medium mb-2" style={{ color: activeTheme.textPrimary }}>
              Distraction-Free Solitude
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: activeTheme.textSecondary }}>
              Enter Solitude Mode to hide the outside world. Enjoy autosaving, word metrics, peaceful prompts, and gentle font controls.
            </p>
          </div>

          {/* Feature 2: Time Capsule */}
          <div
            className="p-6 rounded-2xl border"
            style={{
              backgroundColor: activeTheme.bgCard,
              borderColor: activeTheme.borderColor
            }}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: activeTheme.borderColor }}>
              <Clock className="w-5 h-5" style={{ color: activeTheme.accentColor }} />
            </div>
            <h3 className="font-serif text-lg font-medium mb-2" style={{ color: activeTheme.textPrimary }}>
              Sealed Time Capsules
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: activeTheme.textSecondary }}>
              Seal your memories and reflections for 1 month, 6 months, or 1 year. The message stays locked until your chosen arrival date.
            </p>
          </div>

          {/* Feature 3: Future Me Letters */}
          <div
            className="p-6 rounded-2xl border"
            style={{
              backgroundColor: activeTheme.bgCard,
              borderColor: activeTheme.borderColor
            }}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: activeTheme.borderColor }}>
              <Mail className="w-5 h-5" style={{ color: activeTheme.accentColor }} />
            </div>
            <h3 className="font-serif text-lg font-medium mb-2" style={{ color: activeTheme.textPrimary }}>
              Letters to Future Me
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: activeTheme.textSecondary }}>
              Pen an honest letter to the person you are becoming. Styled in a sealed envelope, ready to be rediscovered down the road.
            </p>
          </div>

          {/* Feature 4: Emotional Weather */}
          <div
            className="p-6 rounded-2xl border"
            style={{
              backgroundColor: activeTheme.bgCard,
              borderColor: activeTheme.borderColor
            }}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: activeTheme.borderColor }}>
              <Sparkles className="w-5 h-5" style={{ color: activeTheme.accentColor }} />
            </div>
            <h3 className="font-serif text-lg font-medium mb-2" style={{ color: activeTheme.textPrimary }}>
              Emotional Weather
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: activeTheme.textSecondary }}>
              Gentle atmospheric tags (☀️ Bright, 🌤️ Calm, 🌥️ Cloudy, 🌧️ Heavy, 🌙 Quiet, 🌈 Hopeful). No harsh mood scoring.
            </p>
          </div>

          {/* Feature 5: The Quiet Garden */}
          <div
            className="p-6 rounded-2xl border"
            style={{
              backgroundColor: activeTheme.bgCard,
              borderColor: activeTheme.borderColor
            }}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: activeTheme.borderColor }}>
              <Flower2 className="w-5 h-5" style={{ color: activeTheme.accentColor }} />
            </div>
            <h3 className="font-serif text-lg font-medium mb-2" style={{ color: activeTheme.textPrimary }}>
              Gentle Growth Garden
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: activeTheme.textSecondary }}>
              Watch seeds sprout, blossoms unfold, and fireflies gather as you write. Zero streak punishments or red warnings.
            </p>
          </div>

          {/* Feature 6: Ambient Sound Mixer */}
          <div
            className="p-6 rounded-2xl border"
            style={{
              backgroundColor: activeTheme.bgCard,
              borderColor: activeTheme.borderColor
            }}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: activeTheme.borderColor }}>
              <Volume2 className="w-5 h-5" style={{ color: activeTheme.accentColor }} />
            </div>
            <h3 className="font-serif text-lg font-medium mb-2" style={{ color: activeTheme.textPrimary }}>
              Procedural Sound Mixer
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: activeTheme.textSecondary }}>
              Mix rain, ocean waves, fireplace crackles, and gentle piano chords in real-time. Royalty-free, private, and offline ready.
            </p>
          </div>
        </div>
      </section>

      {/* 4. PRIVACY PLEDGE */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center border-t" style={{ borderColor: activeTheme.borderColor }}>
        <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-6" style={{ backgroundColor: activeTheme.borderColor }}>
          <Shield className="w-6 h-6" style={{ color: activeTheme.accentColor }} />
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold mb-4" style={{ color: activeTheme.textPrimary }}>
          Private by Design. Quiet by Nature.
        </h2>
        <p className="text-sm max-w-xl mx-auto leading-relaxed mb-6" style={{ color: activeTheme.textSecondary }}>
          Your diary is sacred. QuietInk stores your entries client-side on your own device.
          No third-party trackers, no behavioral advertising, and no prying eyes. What you write in the quiet room stays in the quiet room.
        </p>
        <div className="inline-flex items-center space-x-2 text-xs px-3 py-1.5 rounded-full border" style={{ borderColor: activeTheme.borderColor, color: activeTheme.textSecondary }}>
          <Lock className="w-3.5 h-3.5" style={{ color: activeTheme.accentColor }} />
          <span>Local Storage Encryption & Private Export Available</span>
        </div>
      </section>

      {/* 5. GENTLE TESTIMONIALS & REFLECTIONS WITH ROUND PICTURE SPACES */}
      {/* ===== QUIETINK CUSTOMIZATION AREA ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t text-center" style={{ borderColor: activeTheme.borderColor }}>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-[11px] font-sans uppercase tracking-widest mb-3 border" style={{ borderColor: activeTheme.borderColor, color: activeTheme.accentColor }}>
          <Quote className="w-3 h-3" />
          <span>Voices of Quiet Solitude</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-medium mb-2" style={{ color: activeTheme.textPrimary }}>
          Reflections from the Quiet Room
        </h2>
        <p className="text-xs max-w-md mx-auto mb-10 leading-relaxed" style={{ color: activeTheme.textSecondary }}>
          Personal thoughts, warm memories, and mindful experiences from fellow reflective writers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {siteConfig.reflections.map((item) => (
            <blockquote
              key={item.id}
              className="p-6 sm:p-7 rounded-3xl border text-left flex flex-col justify-between transition-all duration-300 hover:shadow-md group"
              style={{
                backgroundColor: activeTheme.bgCard,
                borderColor: activeTheme.borderColor
              }}
            >
              <div>
                <Quote className="w-6 h-6 mb-3 opacity-30 group-hover:opacity-60 transition-opacity" style={{ color: activeTheme.accentColor }} />
                <p className="font-serif text-sm sm:text-base italic mb-6 leading-relaxed" style={{ color: activeTheme.textPrimary }}>
                  "{item.quote}"
                </p>
              </div>

              {/* Author Attribution with Round Picture Space */}
              <div className="flex items-center space-x-4 pt-4 border-t" style={{ borderColor: activeTheme.borderColor }}>
                {/* Round Picture Space for Custom Photo */}
                <div
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 shadow-xs shrink-0 relative bg-black/5 dark:bg-white/5 transition-transform duration-300 group-hover:scale-105 flex items-center justify-center"
                  style={{ borderColor: activeTheme.accentColor }}
                  title="Round space for someone's picture"
                >
                  {item.pictureUrl ? (
                    <img
                      src={item.pictureUrl}
                      alt={item.author}
                      className="w-full h-full object-cover rounded-full"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.parentElement?.querySelector('.fallback-author-avatar') as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div
                    className="fallback-author-avatar w-full h-full items-center justify-center rounded-full"
                    style={{
                      display: item.pictureUrl ? 'none' : 'flex',
                      backgroundColor: activeTheme.bgInput,
                      color: activeTheme.accentColor
                    }}
                  >
                    <User className="w-6 h-6 opacity-80" />
                  </div>
                </div>

                {/* Author Info */}
                <div className="min-w-0 flex-1">
                  <cite className="text-sm font-serif not-italic block font-semibold tracking-tight truncate" style={{ color: activeTheme.textPrimary }}>
                    {item.author}
                  </cite>
                  <span className="text-xs font-sans block opacity-75 truncate" style={{ color: activeTheme.textSecondary }}>
                    {item.role}
                  </span>
                  <span className="text-[10px] font-sans text-amber-700/80 dark:text-amber-400/80 block mt-0.5">
                    ✦ Verified Journaler
                  </span>
                </div>
              </div>
            </blockquote>
          ))}
        </div>
      </section>

      {/* GENTLE SOCIAL CONNECTION & COMMUNITY */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center">
        <div
          className="p-6 sm:p-8 rounded-3xl border shadow-xs transition-all"
          style={{ backgroundColor: activeTheme.bgCard, borderColor: activeTheme.borderColor }}
        >
          <span className="text-[10px] uppercase tracking-widest font-semibold block mb-1" style={{ color: activeTheme.accentColor }}>
            Connect In The Quiet
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-medium mb-2" style={{ color: activeTheme.textPrimary }}>
            Join our gentle circle of writers & thinkers
          </h3>
          <p className="text-xs max-w-md mx-auto mb-6 leading-relaxed" style={{ color: activeTheme.textSecondary }}>
            Follow our daily prompts, thoughtful dispatches, and quiet updates across your preferred channels.
          </p>

          <SocialIcons
            activeTheme={activeTheme}
            variant="pill"
            size="md"
            showShareButton={true}
            align="center"
          />
        </div>
      </section>

      {/* 6. FINAL INVITATION FOOTER BANNER */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center border-t" style={{ borderColor: activeTheme.borderColor }}>
        <h2 className="font-serif text-3xl sm:text-4xl font-normal mb-4" style={{ color: activeTheme.textPrimary }}>
          Give your thoughts the quiet they deserve.
        </h2>
        <p className="text-sm max-w-md mx-auto mb-8" style={{ color: activeTheme.textSecondary }}>
          Begin with a single sentence. There is no right or wrong way to write in QuietInk.
        </p>
        <button
          onClick={onStartWriting}
          className="px-8 py-3.5 rounded-full text-sm font-medium tracking-wide inline-flex items-center space-x-2.5 transition-all shadow-sm cursor-pointer"
          style={{
            backgroundColor: activeTheme.accentColor,
            color: '#FFFFFF'
          }}
        >
          <PenLine className="w-4 h-4" />
          <span>Enter the Writing Room</span>
        </button>
      </section>
    </div>
  );
};
