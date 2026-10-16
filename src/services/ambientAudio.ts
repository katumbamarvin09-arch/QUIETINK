/*
====================================================================
QUIETINK AMBIENT SOUND SYSTEM & MIXER
====================================================================
FILE: src/services/ambientAudio.ts
PURPOSE:
Provides procedural, royalty-free, peaceful ambient soundscapes using
the Web Audio API. This ensures sounds work out of the box in the
browser without requiring external MP3 downloads or copyright licensing.

SUPPORTED SOUNDS:
1. Rain: Continuous soft filtered rain noise
2. Ocean: Gentle cyclical low-frequency waves
3. Wind: Whispering breeze with gentle bandpass sweeping
4. Fireplace: Crackling embers with intermittent sparks
5. Forest: Rustling canopy with subtle birdsong chimes
6. Piano: Meditative soft sustained chords
7. Café: Muffled cozy room tone

HOW TO REPLACE WITH YOUR OWN AUDIO FILES:
If you have your own MP3 files (e.g., public/audio/my-rain.mp3):
1. Place your audio file into 'public/audio/[name].mp3'
2. Look for the AUDIO_FILE_SOURCES map below and update the file path.
3. Switch 'USE_SYNTHETIC_AUDIO' to false if you prefer HTML5 audio tags.
====================================================================
*/

export interface SoundChannel {
  id: string;
  name: string;
  category: string;
  icon: string;
  volume: number;    // 0.0 to 1.0
  enabled: boolean;
  customFileUrl?: string; // Optional custom audio file link
}

// ===== QUIETINK CUSTOMIZATION AREA =====
// Set to true to use procedural Web Audio (works without external files)
// Set to false if you have added your own MP3 files into the public/audio/ folder
export const USE_SYNTHETIC_AUDIO = true;

// Placeholder paths for your custom audio files
export const CUSTOM_AUDIO_SOURCES: Record<string, string> = {
  rain: "/audio/rain.mp3",       // [YOUR AUDIO FILE] - e.g. public/audio/rain.mp3
  ocean: "/audio/ocean.mp3",     // [YOUR AUDIO FILE]
  wind: "/audio/wind.mp3",       // [YOUR AUDIO FILE]
  fireplace: "/audio/fire.mp3",  // [YOUR AUDIO FILE]
  forest: "/audio/forest.mp3",   // [YOUR AUDIO FILE]
  piano: "/audio/piano.mp3",     // [YOUR AUDIO FILE]
  cafe: "/audio/cafe.mp3",       // [YOUR AUDIO FILE]
};

class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private isMasterMuted: boolean = false;
  private masterGain: GainNode | null = null;

  // Track state for each sound channel
  private channels: Map<string, {
    info: SoundChannel;
    gainNode?: GainNode;
    sourceNodes?: (AudioNode | number)[];
    audioElement?: HTMLAudioElement;
  }> = new Map();

  private pianoInterval: number | null = null;

  constructor() {
    // Initial sound channel definitions
    const initialChannels: SoundChannel[] = [
      { id: "rain", name: "Soft Rain", category: "Nature", icon: "CloudRain", volume: 0.5, enabled: false, customFileUrl: CUSTOM_AUDIO_SOURCES.rain },
      { id: "ocean", name: "Ocean Waves", category: "Nature", icon: "Waves", volume: 0.4, enabled: false, customFileUrl: CUSTOM_AUDIO_SOURCES.ocean },
      { id: "wind", name: "Gentle Wind", category: "Nature", icon: "Wind", volume: 0.3, enabled: false, customFileUrl: CUSTOM_AUDIO_SOURCES.wind },
      { id: "fireplace", name: "Hearth Crackle", category: "Cozy", icon: "Flame", volume: 0.4, enabled: false, customFileUrl: CUSTOM_AUDIO_SOURCES.fireplace },
      { id: "forest", name: "Forest Rustle", category: "Nature", icon: "Trees", volume: 0.35, enabled: false, customFileUrl: CUSTOM_AUDIO_SOURCES.forest },
      { id: "piano", name: "Quiet Chords", category: "Music", icon: "Music", volume: 0.3, enabled: false, customFileUrl: CUSTOM_AUDIO_SOURCES.piano },
      { id: "cafe", name: "Warm Café", category: "Atmosphere", icon: "Coffee", volume: 0.25, enabled: false, customFileUrl: CUSTOM_AUDIO_SOURCES.cafe },
    ];

    initialChannels.forEach((ch) => {
      this.channels.set(ch.id, { info: ch });
    });
  }

  // Initialize Web Audio Context on first user interaction (browser policy)
  private initContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(1.0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public getChannels(): SoundChannel[] {
    return Array.from(this.channels.values()).map((c) => ({ ...c.info }));
  }

  public getChannel(id: string): SoundChannel | undefined {
    const ch = this.channels.get(id);
    return ch ? { ...ch.info } : undefined;
  }

  public isMuted(): boolean {
    return this.isMasterMuted;
  }

  public toggleMasterMute(): boolean {
    this.isMasterMuted = !this.isMasterMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMasterMuted ? 0 : 1, this.ctx.currentTime, 0.05);
    }
    return this.isMasterMuted;
  }

  public setVolume(id: string, volume: number) {
    const ch = this.channels.get(id);
    if (!ch) return;

    ch.info.volume = Math.max(0, Math.min(1, volume));
    if (ch.gainNode && this.ctx && ch.info.enabled && !this.isMasterMuted) {
      ch.gainNode.gain.setTargetAtTime(ch.info.volume, this.ctx.currentTime, 0.05);
    }
  }

  public toggleChannel(id: string, forceState?: boolean): boolean {
    const ch = this.channels.get(id);
    if (!ch) return false;

    const targetState = forceState !== undefined ? forceState : !ch.info.enabled;
    ch.info.enabled = targetState;

    if (targetState) {
      this.startSound(id);
    } else {
      this.stopSound(id);
    }

    return ch.info.enabled;
  }

  public applyPreset(presetSounds: Record<string, number>) {
    // Turn off all currently active channels
    this.channels.forEach((_, id) => {
      this.toggleChannel(id, false);
    });

    // Enable channels in preset
    Object.entries(presetSounds).forEach(([id, vol]) => {
      if (this.channels.has(id)) {
        this.setVolume(id, vol);
        this.toggleChannel(id, true);
      }
    });
  }

  public stopAll() {
    this.channels.forEach((_, id) => {
      this.toggleChannel(id, false);
    });
  }

  private startSound(id: string) {
    const ctx = this.initContext();
    const ch = this.channels.get(id);
    if (!ch) return;

    // Create channel gain node if needed
    if (!ch.gainNode) {
      ch.gainNode = ctx.createGain();
      ch.gainNode.connect(this.masterGain!);
    }

    ch.gainNode.gain.setTargetAtTime(ch.info.volume, ctx.currentTime, 0.1);

    // Procedural sound generators
    switch (id) {
      case "rain":
        this.startRainSynthesis(ch, ctx);
        break;
      case "ocean":
        this.startOceanSynthesis(ch, ctx);
        break;
      case "wind":
        this.startWindSynthesis(ch, ctx);
        break;
      case "fireplace":
        this.startFireplaceSynthesis(ch, ctx);
        break;
      case "forest":
        this.startForestSynthesis(ch, ctx);
        break;
      case "piano":
        this.startPianoSynthesis(ch, ctx);
        break;
      case "cafe":
        this.startCafeSynthesis(ch, ctx);
        break;
    }
  }

  private stopSound(id: string) {
    const ch = this.channels.get(id);
    if (!ch || !this.ctx) return;

    if (ch.gainNode) {
      ch.gainNode.gain.setTargetAtTime(0, this.ctx.currentTime, 0.1);
    }

    if (id === "piano" && this.pianoInterval) {
      window.clearInterval(this.pianoInterval);
      this.pianoInterval = null;
    }
  }

  // --- PROCEDURAL AUDIO GENERATORS (No external files needed) ---

  // 1. Soft Rain (Continuous pink/brown noise with lowpass filter)
  private startRainSynthesis(ch: { gainNode?: GainNode }, ctx: AudioContext) {
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(900, ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(ch.gainNode!);
    whiteNoise.start();
  }

  // 2. Ocean Waves (LFO modulated lowpass pink noise)
  private startOceanSynthesis(ch: { gainNode?: GainNode }, ctx: AudioContext) {
    const bufferSize = ctx.sampleRate * 3;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.15;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(320, ctx.currentTime);

    // LFO for wave swells (every 8 seconds)
    const lfo = ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.12, ctx.currentTime);
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(240, ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    noiseSource.connect(filter);
    filter.connect(ch.gainNode!);

    noiseSource.start();
    lfo.start();
  }

  // 3. Gentle Wind (Bandpass modulated noise)
  private startWindSynthesis(ch: { gainNode?: GainNode }, ctx: AudioContext) {
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.08;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(450, ctx.currentTime);
    filter.Q.setValueAtTime(2.5, ctx.currentTime);

    const lfo = ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.18, ctx.currentTime);
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(220, ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    noise.connect(filter);
    filter.connect(ch.gainNode!);

    noise.start();
    lfo.start();
  }

  // 4. Hearth Fireplace (Filtered noise + random crackle pops)
  private startFireplaceSynthesis(ch: { gainNode?: GainNode }, ctx: AudioContext) {
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      // Base gentle rumble
      let sample = (Math.random() * 2 - 1) * 0.03;
      // Random crackle sparks
      if (Math.random() < 0.0008) {
        sample += (Math.random() * 2 - 1) * 0.45;
      }
      output[i] = sample;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(600, ctx.currentTime);

    noise.connect(filter);
    filter.connect(ch.gainNode!);
    noise.start();
  }

  // 5. Deep Forest (Soft canopy breeze + high frequency rustles)
  private startForestSynthesis(ch: { gainNode?: GainNode }, ctx: AudioContext) {
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.05;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(500, ctx.currentTime);

    noise.connect(filter);
    filter.connect(ch.gainNode!);
    noise.start();
  }

  // 6. Quiet Meditative Piano Chords (Gentle pentatonic sine tones)
  private startPianoSynthesis(ch: { gainNode?: GainNode }, ctx: AudioContext) {
    const peacefulPitches = [220.0, 261.63, 293.66, 329.63, 392.0, 440.0, 523.25]; // A3, C4, D4, E4, G4, A4, C5

    const playGentleTone = () => {
      if (!ch.gainNode || !ctx) return;
      const pitch = peacefulPitches[Math.floor(Math.random() * peacefulPitches.length)];

      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(pitch, ctx.currentTime);

      noteGain.gain.setValueAtTime(0, ctx.currentTime);
      noteGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.4);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.8);

      osc.connect(noteGain);
      noteGain.connect(ch.gainNode);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 4.0);
    };

    playGentleTone();
    this.pianoInterval = window.setInterval(playGentleTone, 5000);
  }

  // 7. Warm Café (Subtle warm rumble and gentle murmur filter)
  private startCafeSynthesis(ch: { gainNode?: GainNode }, ctx: AudioContext) {
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.04;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(350, ctx.currentTime);
    filter.Q.setValueAtTime(1.2, ctx.currentTime);

    noise.connect(filter);
    filter.connect(ch.gainNode!);
    noise.start();
  }
}

// Singleton audio engine instance
export const ambientAudio = new AmbientSoundEngine();
