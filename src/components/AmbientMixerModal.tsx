/*
====================================================================
QUIETINK AMBIENT SOUND MIXER MODAL
====================================================================
FILE: src/components/AmbientMixerModal.tsx
PURPOSE:
Interactive sound mixer allowing users to blend peaceful ambient sounds
such as Rain, Ocean Waves, Hearth Fire, Forest Rustle, Piano Chords,
Wind, and Café Warmth. Each channel has an independent volume slider
and on/off toggle.

CUSTOM AUDIO REPLACEMENT GUIDE:
Detailed instructions inside this component explain how you can place
your own MP3 or OGG audio files into 'public/audio/' and connect them.
====================================================================
*/

import React, { useState } from 'react';
import {
  X,
  Volume2,
  VolumeX,
  CloudRain,
  Waves,
  Wind,
  Flame,
  Trees,
  Music,
  Coffee,
  Info,
  Sliders
} from 'lucide-react';
import { ThemeConfig } from '../types/journal';
import { ambientAudio, SoundChannel, CUSTOM_AUDIO_SOURCES } from '../services/ambientAudio';

interface AmbientMixerModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTheme: ThemeConfig;
  onChannelsChanged?: () => void;
}

export const AmbientMixerModal: React.FC<AmbientMixerModalProps> = ({
  isOpen,
  onClose,
  activeTheme,
  onChannelsChanged,
}) => {
  const [channels, setChannels] = useState<SoundChannel[]>(ambientAudio.getChannels());
  const [isMasterMuted, setIsMasterMuted] = useState<boolean>(ambientAudio.isMuted());
  const [showHelpGuide, setShowHelpGuide] = useState<boolean>(false);

  if (!isOpen) return null;

  // Toggle individual sound channel
  const handleToggleSound = (id: string) => {
    ambientAudio.toggleChannel(id);
    setChannels(ambientAudio.getChannels());
    if (onChannelsChanged) onChannelsChanged();
  };

  // Change individual volume
  const handleVolumeChange = (id: string, newVolume: number) => {
    ambientAudio.setVolume(id, newVolume);
    setChannels(ambientAudio.getChannels());
    if (onChannelsChanged) onChannelsChanged();
  };

  // Master mute toggle
  const handleToggleMute = () => {
    const muted = ambientAudio.toggleMasterMute();
    setIsMasterMuted(muted);
    if (onChannelsChanged) onChannelsChanged();
  };

  // Stop all sounds
  const handleStopAll = () => {
    ambientAudio.stopAll();
    setChannels(ambientAudio.getChannels());
    if (onChannelsChanged) onChannelsChanged();
  };

  // Icon mapping
  const renderIcon = (id: string) => {
    switch (id) {
      case 'rain': return <CloudRain className="w-4 h-4" />;
      case 'ocean': return <Waves className="w-4 h-4" />;
      case 'wind': return <Wind className="w-4 h-4" />;
      case 'fireplace': return <Flame className="w-4 h-4" />;
      case 'forest': return <Trees className="w-4 h-4" />;
      case 'piano': return <Music className="w-4 h-4" />;
      case 'cafe': return <Coffee className="w-4 h-4" />;
      default: return <Volume2 className="w-4 h-4" />;
    }
  };

  return (
    <div
      id="ambient-mixer-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/50 overflow-y-auto"
    >
      <div
        id="ambient-mixer-container"
        className="w-full max-w-lg rounded-3xl border shadow-2xl p-6 sm:p-7 relative transition-all"
        style={{
          backgroundColor: activeTheme.bgCard,
          borderColor: activeTheme.borderColor,
          color: activeTheme.textPrimary
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b mb-5" style={{ borderColor: activeTheme.borderColor }}>
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: activeTheme.borderColor }}>
              <Sliders className="w-4 h-4" style={{ color: activeTheme.accentColor }} />
            </div>
            <div>
              <h3 className="font-serif text-xl font-medium leading-tight" style={{ color: activeTheme.textPrimary }}>
                Ambient Sound Mixer
              </h3>
              <span className="text-[11px] font-sans" style={{ color: activeTheme.textSecondary }}>
                Blend soothing sounds for digital solitude
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => setShowHelpGuide(!showHelpGuide)}
              className="p-1.5 rounded-full hover:opacity-75 cursor-pointer"
              title="How to replace with custom audio files"
            >
              <Info className="w-4 h-4" style={{ color: activeTheme.textSecondary }} />
            </button>
            <button
              id="close-mixer-btn"
              onClick={onClose}
              className="p-1.5 rounded-full hover:opacity-75 cursor-pointer"
              title="Close mixer"
            >
              <X className="w-4 h-4" style={{ color: activeTheme.textSecondary }} />
            </button>
          </div>
        </div>

        {/* Master Controls */}
        <div className="flex items-center justify-between p-3 rounded-2xl border mb-5 text-xs" style={{ backgroundColor: activeTheme.bgInput, borderColor: activeTheme.borderColor }}>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleToggleMute}
              className="p-1.5 rounded-lg border hover:opacity-75 cursor-pointer"
              style={{ borderColor: activeTheme.borderColor }}
              title={isMasterMuted ? "Unmute all" : "Mute all"}
            >
              {isMasterMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
            </button>
            <span className="font-medium" style={{ color: activeTheme.textPrimary }}>
              {isMasterMuted ? "Master Audio Muted" : "Master Audio Active"}
            </span>
          </div>

          <button
            onClick={handleStopAll}
            className="text-[11px] px-2.5 py-1 rounded-full border hover:opacity-80 cursor-pointer"
            style={{ borderColor: activeTheme.borderColor, color: activeTheme.textSecondary }}
          >
            Turn all off
          </button>
        </div>

        {/* Individual Sound Channels */}
        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
          {channels.map((ch) => (
            <div
              key={ch.id}
              className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                ch.enabled ? 'shadow-xs font-medium' : 'opacity-70'
              }`}
              style={{
                backgroundColor: ch.enabled ? activeTheme.bgInput : 'transparent',
                borderColor: ch.enabled ? activeTheme.accentColor : activeTheme.borderColor,
                color: activeTheme.textPrimary
              }}
            >
              {/* Toggle switch + Name */}
              <button
                onClick={() => handleToggleSound(ch.id)}
                className="flex items-center space-x-3 cursor-pointer flex-1 text-left focus:outline-none"
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
                  style={{
                    backgroundColor: ch.enabled ? activeTheme.accentColor : activeTheme.borderColor,
                    color: ch.enabled ? '#FFFFFF' : activeTheme.textSecondary
                  }}
                >
                  {renderIcon(ch.id)}
                </div>
                <div>
                  <span className="text-xs font-serif block font-medium">{ch.name}</span>
                  <span className="text-[10px] opacity-60 block">{ch.category}</span>
                </div>
              </button>

              {/* Volume Slider */}
              <div className="flex items-center space-x-2 w-32 sm:w-40">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={ch.volume}
                  onChange={(e) => handleVolumeChange(ch.id, parseFloat(e.target.value))}
                  disabled={!ch.enabled}
                  className="w-full accent-amber-700 cursor-pointer disabled:opacity-30 h-1.5 bg-neutral-200 rounded-lg"
                  aria-label={`${ch.name} Volume`}
                />
                <span className="text-[10px] font-mono w-7 text-right opacity-70">
                  {Math.round(ch.volume * 100)}%
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Audio File Replacement Guide Drawer */}
        {showHelpGuide && (
          <div className="mt-5 p-4 rounded-2xl border text-xs leading-relaxed" style={{ backgroundColor: activeTheme.bgInput, borderColor: activeTheme.borderColor }}>
            <h4 className="font-semibold mb-1" style={{ color: activeTheme.textPrimary }}>
              How to add your own legal audio files:
            </h4>
            <p className="mb-2" style={{ color: activeTheme.textSecondary }}>
              QuietInk synthesizes procedural audio in the browser. If you prefer your own MP3 files:
            </p>
            <ol className="list-decimal pl-5 space-y-1 text-[11px] font-mono" style={{ color: activeTheme.textSecondary }}>
              <li>Place MP3 files in: <span className="underline">public/audio/</span> (e.g., rain.mp3, fire.mp3)</li>
              <li>Open <span className="underline">src/services/ambientAudio.ts</span></li>
              <li>Set <span className="font-bold">USE_SYNTHETIC_AUDIO = false;</span></li>
              <li>Confirm file names match the CUSTOM_AUDIO_SOURCES map.</li>
            </ol>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t flex justify-end" style={{ borderColor: activeTheme.borderColor }}>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full text-xs font-medium cursor-pointer"
            style={{ backgroundColor: activeTheme.accentColor, color: '#FFFFFF' }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
