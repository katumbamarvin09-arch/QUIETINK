/*
====================================================================
QUIETINK CALM MODE & ATMOSPHERE SANCTUARY
====================================================================
FILE: src/components/CalmModeModal.tsx
PURPOSE:
Provides the signature QuietInk Calm Mode experience.
Allows the user to immerse themselves in 8 peaceful atmospheric
environments (Rain, Ocean, Forest, Fireplace, Café, Midnight, Sunrise,
Old Library). Features a dynamic procedural HTML5 canvas with gentle
drifting rain, warm fireplace embers, ocean wave ripples, or night
stars, paired with instant ambient audio presets.

HOW TO REPLACE WITH CUSTOM IMAGES / AUDIO:
1. Put your background image in: public/images/atmospheres/[name].jpg
2. Put your ambient audio in: public/audio/[name].mp3
3. See the placeholders marked below with [YOUR BACKGROUND IMAGE]
====================================================================
*/

import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Volume2, Info, ArrowRight } from 'lucide-react';
import { Atmosphere, ThemeConfig } from '../types/journal';
import { atmospheres, getAtmosphereById } from '../data/atmospheres';
import { ambientAudio } from '../services/ambientAudio';

interface CalmModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTheme: ThemeConfig;
  onStartWritingWithAtmosphere: (atmosphereId: string) => void;
}

export const CalmModeModal: React.FC<CalmModeModalProps> = ({
  isOpen,
  onClose,
  activeTheme,
  onStartWritingWithAtmosphere,
}) => {
  const [selectedAtmosphere, setSelectedAtmosphere] = useState<Atmosphere>(atmospheres[0]);
  const [showAssetGuide, setShowAssetGuide] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Apply atmosphere audio preset when atmosphere changes
  const handleSelectAtmosphere = (atmo: Atmosphere) => {
    setSelectedAtmosphere(atmo);
    ambientAudio.applyPreset(atmo.defaultSounds);
  };

  // Procedural visual canvas animation loop (Rain, Embers, Stars, Waves)
  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle state
    const particles: Array<{
      x: number;
      y: number;
      speed: number;
      size: number;
      opacity: number;
      wobble?: number;
    }> = [];

    const count = selectedAtmosphere.canvasEffect === 'rain' ? 80 : 45;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: selectedAtmosphere.canvasEffect === 'rain' ? 3 + Math.random() * 4 : 0.4 + Math.random() * 0.8,
        size: selectedAtmosphere.canvasEffect === 'rain' ? 1 + Math.random() * 1.5 : 1.5 + Math.random() * 2.5,
        opacity: 0.2 + Math.random() * 0.5,
        wobble: Math.random() * Math.PI * 2
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const effect = selectedAtmosphere.canvasEffect;

      particles.forEach((p) => {
        if (effect === 'rain') {
          // Rain streaks
          ctx.strokeStyle = `rgba(200, 225, 255, ${p.opacity * 0.4})`;
          ctx.lineWidth = p.size;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - 1, p.y + p.speed * 4);
          ctx.stroke();

          p.y += p.speed;
          if (p.y > height) {
            p.y = -10;
            p.x = Math.random() * width;
          }
        } else if (effect === 'fire') {
          // Rising warm embers
          ctx.fillStyle = `rgba(255, 140, 50, ${p.opacity * 0.6})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          p.y -= p.speed * 0.8;
          p.x += Math.sin(p.wobble || 0) * 0.5;
          if (p.wobble !== undefined) p.wobble += 0.02;

          if (p.y < 0) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
        } else {
          // Soft floating stars or dust motes
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.4})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          p.y -= p.speed * 0.3;
          if (p.y < 0) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen, selectedAtmosphere]);

  if (!isOpen) return null;

  return (
    <div
      id="calm-mode-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 backdrop-blur-md bg-black/60 overflow-y-auto"
    >
      <div
        id="calm-mode-container"
        className="relative w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border flex flex-col my-auto transition-all"
        style={{
          borderColor: activeTheme.borderColor,
          backgroundColor: activeTheme.bgCard,
          color: activeTheme.textPrimary
        }}
      >
        {/* Atmosphere Dynamic Header Canvas */}
        <div className={`relative h-64 sm:h-80 w-full bg-gradient-to-b ${selectedAtmosphere.bgGradient} overflow-hidden p-6 sm:p-8 flex flex-col justify-between text-white`}>
          {/* Animated HTML5 Particle Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

          {/* Top Bar: Close & Guide Trigger */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>QuietInk Calm Mode</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowAssetGuide(!showAssetGuide)}
                className="bg-black/30 hover:bg-black/50 text-white/80 hover:text-white p-2 rounded-full border border-white/10 cursor-pointer transition-colors"
                title="How to replace with custom photos and sounds"
              >
                <Info className="w-4 h-4" />
              </button>
              <button
                id="close-calm-mode-btn"
                onClick={onClose}
                className="bg-black/30 hover:bg-black/50 text-white/80 hover:text-white p-2 rounded-full border border-white/10 cursor-pointer transition-colors"
                title="Close Calm Mode"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Atmosphere Details & Quote */}
          <div className="relative z-10 max-w-xl">
            <h2 className="font-serif text-3xl sm:text-4xl font-normal mb-2 tracking-tight">
              {selectedAtmosphere.name}
            </h2>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-4">
              {selectedAtmosphere.description}
            </p>
            <blockquote className="font-serif italic text-xs sm:text-sm border-l-2 border-white/40 pl-3 text-white/90">
              "{selectedAtmosphere.quote}"
            </blockquote>
          </div>

          {/* Action to enter Writing Room with this atmosphere */}
          <div className="relative z-10 flex justify-end">
            <button
              onClick={() => {
                onStartWritingWithAtmosphere(selectedAtmosphere.id);
                onClose();
              }}
              className="px-5 py-2 rounded-full text-xs font-medium bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/20 transition-all flex items-center space-x-2 cursor-pointer"
            >
              <span>Write in this Atmosphere</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Atmosphere Selector Grid */}
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: activeTheme.textSecondary }}>
              Select Atmosphere Sanctuary
            </span>
            <span className="text-[11px] opacity-75" style={{ color: activeTheme.textSecondary }}>
              Audio presets tune automatically
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {atmospheres.map((atmo) => {
              const isSelected = selectedAtmosphere.id === atmo.id;
              return (
                <button
                  key={atmo.id}
                  onClick={() => handleSelectAtmosphere(atmo)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected ? 'ring-2 shadow-sm font-medium' : 'hover:opacity-80'
                  }`}
                  style={{
                    backgroundColor: isSelected ? activeTheme.borderColor : activeTheme.bgInput,
                    borderColor: isSelected ? activeTheme.accentColor : activeTheme.borderColor,
                    color: activeTheme.textPrimary
                  }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-serif text-sm font-medium">{atmo.name}</span>
                    {isSelected && <Sparkles className="w-3 h-3" style={{ color: activeTheme.accentColor }} />}
                  </div>
                  <p className="text-[11px] line-clamp-2 leading-relaxed opacity-70" style={{ color: activeTheme.textSecondary }}>
                    {atmo.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Asset Customization Guide Drawer */}
          {showAssetGuide && (
            <div className="mt-6 p-4 rounded-2xl border text-xs leading-relaxed" style={{ backgroundColor: activeTheme.bgInput, borderColor: activeTheme.borderColor }}>
              <h4 className="font-semibold mb-1" style={{ color: activeTheme.textPrimary }}>
                How to add your own background photos and audio:
              </h4>
              <p className="mb-2" style={{ color: activeTheme.textSecondary }}>
                QuietInk is completely customizable. You can replace the procedural backgrounds and sounds with your own media:
              </p>
              <ul className="list-disc pl-5 space-y-1 mb-2 font-mono text-[11px]" style={{ color: activeTheme.textSecondary }}>
                <li>Background photos: Place into <span className="underline">public/images/atmospheres/{selectedAtmosphere.id}.jpg</span></li>
                <li>Ambient sounds: Place into <span className="underline">public/audio/{selectedAtmosphere.id}.mp3</span></li>
                <li>Configuration: Edit <span className="underline">src/data/atmospheres.ts</span> to update quotes or presets.</li>
              </ul>
              <p className="italic text-[11px]" style={{ color: activeTheme.textSecondary }}>
                Note: QuietInk includes procedural Web Audio synthesis so it works immediately out-of-the-box without requiring copyrighted downloads.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
