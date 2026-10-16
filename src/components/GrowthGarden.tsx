/*
====================================================================
QUIETINK GROWTH GARDEN (MY QUIET GARDEN)
====================================================================
FILE: src/components/GrowthGarden.tsx
PURPOSE:
Visually celebrates the user's journaling journey without high-pressure
streak counters or shame mechanics. Every entry planted nurtures a seed,
blossoming into flowers, trees, and soft night fireflies.

PHILOSOPHY:
A garden does not punish the soil when winter arrives. It simply waits.
Users are welcomed back with warmth no matter how long it has been
since their last visit.
====================================================================
*/

import React from 'react';
import { Flower2, Sparkles, Sprout, Trees, Sun, Moon, Heart } from 'lucide-react';
import { GrowthGardenData, ThemeConfig } from '../types/journal';

interface GrowthGardenProps {
  activeTheme: ThemeConfig;
  gardenData: GrowthGardenData;
  onStartWriting: () => void;
}

export const GrowthGarden: React.FC<GrowthGardenProps> = ({
  activeTheme,
  gardenData,
  onStartWriting,
}) => {
  // Generate visual floral elements based on data
  const flowerIcons = ['🌸', '🌼', '🌷', '🌺', '🌿', '🌱', '🌻', '🍃'];
  const totalPlants = Math.min(48, Math.max(6, gardenData.totalEntries * 3 + gardenData.bloomingFlowers * 2));

  return (
    <div id="growth-garden-root" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      {/* 1. SECTION HEADER */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-4 border" style={{ backgroundColor: activeTheme.borderColor, borderColor: activeTheme.borderColor }}>
          <Flower2 className="w-6 h-6" style={{ color: activeTheme.accentColor }} />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-normal mb-3 tracking-tight" style={{ color: activeTheme.textPrimary }}>
          My Quiet Garden
        </h1>
        <p className="text-xs sm:text-sm leading-relaxed" style={{ color: activeTheme.textSecondary }}>
          A gentle visual space that unfolds as you write. No streaks, no broken chains,
          and no shame for taking time away. Every word you pen enriches this soil.
        </p>
      </div>

      {/* 2. THE VISUAL GARDEN SANCTUARY */}
      <div
        className="rounded-3xl border shadow-sm p-6 sm:p-10 mb-12 relative overflow-hidden text-center"
        style={{
          backgroundColor: activeTheme.bgCard,
          borderColor: activeTheme.borderColor
        }}
      >
        {/* Subtle decorative sky backdrop */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b text-xs" style={{ borderColor: activeTheme.borderColor, color: activeTheme.textSecondary }}>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4" style={{ color: activeTheme.accentColor }} />
            <span className="font-serif text-sm font-medium" style={{ color: activeTheme.textPrimary }}>
              Garden Sanctuary (Level {gardenData.gentleLevel})
            </span>
          </div>

          <div className="flex items-center space-x-1 text-[11px]">
            <span>{gardenData.firefliesGathered} fireflies gathered</span>
          </div>
        </div>

        {/* Garden Flora Grid */}
        <div className="min-h-[220px] py-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {Array.from({ length: totalPlants }).map((_, idx) => {
            const icon = flowerIcons[idx % flowerIcons.length];
            return (
              <div
                key={idx}
                className="transform hover:scale-125 transition-transform duration-300 select-none cursor-default p-2 rounded-xl"
                style={{ backgroundColor: activeTheme.bgInput }}
                title={`A thought planted in solitude`}
              >
                <span className="text-2xl sm:text-3xl block animate-fade-in">{icon}</span>
              </div>
            );
          })}
        </div>

        {/* Garden Soil Status Message */}
        <div className="mt-8 pt-6 border-t max-w-md mx-auto" style={{ borderColor: activeTheme.borderColor }}>
          <p className="font-serif italic text-sm mb-2" style={{ color: activeTheme.textPrimary }}>
            "The quiet thoughts you sow today will quietly bloom in tomorrow's character."
          </p>
          <span className="text-[11px]" style={{ color: activeTheme.textSecondary }}>
            {gardenData.totalEntries === 0
              ? "Your garden is resting quietly, waiting for your first seed."
              : `Your soil holds ${gardenData.totalEntries} reflections and ${gardenData.totalWordsWritten.toLocaleString()} words of wisdom.`}
          </span>
        </div>
      </div>

      {/* 3. GENTLE STATS TILES (NO SHAME, ONLY CELEBRATION) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        <div className="p-5 rounded-2xl border text-center" style={{ backgroundColor: activeTheme.bgCard, borderColor: activeTheme.borderColor }}>
          <Sprout className="w-5 h-5 mx-auto mb-2" style={{ color: activeTheme.accentColor }} />
          <span className="font-serif text-2xl font-medium block" style={{ color: activeTheme.textPrimary }}>
            {gardenData.seedsPlanted}
          </span>
          <span className="text-[11px] uppercase tracking-wider block" style={{ color: activeTheme.textSecondary }}>
            Seeds Planted
          </span>
        </div>

        <div className="p-5 rounded-2xl border text-center" style={{ backgroundColor: activeTheme.bgCard, borderColor: activeTheme.borderColor }}>
          <Flower2 className="w-5 h-5 mx-auto mb-2" style={{ color: activeTheme.accentColor }} />
          <span className="font-serif text-2xl font-medium block" style={{ color: activeTheme.textPrimary }}>
            {gardenData.bloomingFlowers}
          </span>
          <span className="text-[11px] uppercase tracking-wider block" style={{ color: activeTheme.textSecondary }}>
            Blooming Flowers
          </span>
        </div>

        <div className="p-5 rounded-2xl border text-center" style={{ backgroundColor: activeTheme.bgCard, borderColor: activeTheme.borderColor }}>
          <Moon className="w-5 h-5 mx-auto mb-2" style={{ color: activeTheme.accentColor }} />
          <span className="font-serif text-2xl font-medium block" style={{ color: activeTheme.textPrimary }}>
            {gardenData.firefliesGathered}
          </span>
          <span className="text-[11px] uppercase tracking-wider block" style={{ color: activeTheme.textSecondary }}>
            Night Fireflies
          </span>
        </div>

        <div className="p-5 rounded-2xl border text-center" style={{ backgroundColor: activeTheme.bgCard, borderColor: activeTheme.borderColor }}>
          <Heart className="w-5 h-5 mx-auto mb-2" style={{ color: activeTheme.accentColor }} />
          <span className="font-serif text-2xl font-medium block" style={{ color: activeTheme.textPrimary }}>
            {gardenData.gentleLevel}
          </span>
          <span className="text-[11px] uppercase tracking-wider block" style={{ color: activeTheme.textSecondary }}>
            Sanctuary Level
          </span>
        </div>
      </div>

      {/* 4. CALL TO WRITE */}
      <div className="text-center">
        <button
          onClick={onStartWriting}
          className="px-8 py-3 rounded-full text-xs font-medium tracking-wide inline-flex items-center space-x-2 transition-transform active:scale-95 shadow-xs cursor-pointer"
          style={{
            backgroundColor: activeTheme.accentColor,
            color: '#FFFFFF'
          }}
        >
          <Sprout className="w-4 h-4" />
          <span>Plant a New Thought Today</span>
        </button>
      </div>
    </div>
  );
};
