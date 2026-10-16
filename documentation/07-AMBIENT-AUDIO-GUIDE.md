# 07 — Ambient Sound Mixer & Audio Guide

QuietInk includes a built-in real-time ambient sound mixer.

---

## How Procedural Web Audio Works

Instead of forcing you to download large, copyrighted MP3 files that could be blocked by browser CORS or license violations, QuietInk uses the browser's native **Web Audio API**:
- **Soft Rain**: Pink & brown filtered noise simulating continuous rainfall.
- **Ocean Waves**: Low-frequency noise modulated with an 8-second LFO swell.
- **Gentle Wind**: Sweeping bandpass filter across filtered noise.
- **Fireplace Crackle**: Filtered base warmth with randomized spark bursts.
- **Quiet Chords**: Resonant pentatonic sine wave harmonics playing at peaceful intervals.
- **Forest Rustle & Warm Café**: Subtle acoustic room tone.

This means the ambient audio works **100% offline and immediately out of the box** in any modern web browser!

---

## How to Add Your Own MP3 / OGG Audio Files

If you have legal, royalty-free audio tracks that you own or have licensed:

1. **Folder Location**:
   Save your files into the `public/audio/` directory:
   - `public/audio/rain.mp3`
   - `public/audio/ocean.mp3`
   - `public/audio/wind.mp3`
   - `public/audio/fire.mp3`
   - `public/audio/forest.mp3`
   - `public/audio/piano.mp3`
   - `public/audio/cafe.mp3`

2. **File Formats**:
   Use **MP3** or **OGG** formatted with 44.1 kHz, 128 kbps stereo. Keep file sizes under 2–3 MB to ensure quick loading.

3. **Connecting Custom Files**:
   Open **`src/services/ambientAudio.ts`**:
   - Set: `export const USE_SYNTHETIC_AUDIO = false;`
   - Verify the `CUSTOM_AUDIO_SOURCES` paths match your file names.

4. **Legal Note**:
   Only use sounds you have recorded yourself, or that are licensed under Creative Commons Zero (CC0) / Public Domain. Never upload commercial music without licensing.
