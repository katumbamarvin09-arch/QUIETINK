# QuietInk — "Give Your Thoughts a Quiet Place"

> A peaceful digital journaling sanctuary crafted for personal reflection, daily writing, and mindful digital solitude.

QuietInk feels like entering a quiet room on the internet rather than opening a demanding productivity tool. There are no streaks to break, no public likes, no algorithmic feeds, and no aggressive notifications.

---

## Key Features

- **The Writing Room (Solitude Mode)**: Distraction-free notebook canvas with autosave, font sizing, word metrics, and full-screen solitude focus.
- **Calm Mode Atmospheres**: 8 immersive environments (Rainy Window, Ocean Mist, Deep Forest, Hearth & Embers, Quiet Café, Midnight, Golden Sunrise, Old Library) with procedural HTML5 canvas particle animations.
- **Procedural Ambient Sound Mixer**: Built-in real-time Web Audio synthesizer for rainfall, ocean waves, fireplace crackles, piano chords, and wind — no external audio downloads required.
- **Time Capsules**: Sealed reflections locked away until your chosen future date (1 month, 6 months, 1 year, or custom).
- **Letters to Future Me**: Intimate dispatches across time written in a sealed-envelope aesthetic.
- **Emotional Weather**: Gentle atmospheric moods (☀️ Bright, 🌤️ Calm, 🌥️ Cloudy, 🌧️ Heavy, 🌙 Quiet, 🌈 Hopeful).
- **My Quiet Garden**: A visual garden that gently blossoms as you write, without guilt or streak penalties.
- **Personal Library & Timeline**: Full-text search and chronological monthly memory timeline.
- **Author Sanctuary & Privacy Vault**: Client-side data sovereignty, JSON backup download, and Markdown export.
- **7 Serene Color Themes**: Warm Paper, Midnight Sanctuary, Pine & Moss, Ocean Depths, Cozy Café, Pure Minimal, and Soft Sunrise.
- **Central Configuration**: Single file (`src/config/siteConfig.ts`) to personalize branding, owner details, social links, and defaults.

---

## Technology Stack

- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS v4
- **Icons**: Lucide React
- **Audio Engine**: Web Audio API (procedural synthesis for rain, waves, fire, wind, piano)
- **Data & Storage**: Client-side Local Storage persistence with Time Capsule lock validation
- **Documentation**: 17 comprehensive technical and design guides in `/documentation`

---

## Quick Start Guide

### Option A: One-Click Runner Scripts
- **macOS / Linux**:
  ```bash
  ./run.sh
  ```
- **Windows**:
  Double-click `start.bat` or run:
  ```cmd
  start.bat
  ```

### Option B: Standard NPM
```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open in your browser
http://localhost:3000
```

### Option C: Docker
```bash
docker build -t quietink .
docker run -p 3000:3000 quietink
```

---

## Personalization Checklist ("Make QuietInk Your Own")

- [ ] Open `src/config/siteConfig.ts`
- [ ] Replace `siteName` with your brand name
- [ ] Replace `siteTagline` with your slogan
- [ ] Replace `ownerName` with your name or pen name
- [ ] Replace `contactEmail` with your contact email
- [ ] Replace `socialLinks` with your personal accounts
- [ ] Add your custom logo in `public/images/`
- [ ] Add optional custom MP3 sounds in `public/audio/`
- [ ] Customize writing prompts in `src/data/prompts.ts`

---

## Documentation System

Explore the in-depth guides in the `/documentation` directory:

1. `01-GETTING-STARTED.md`
2. `02-PROJECT-STRUCTURE.md`
3. `03-PERSONALIZATION-GUIDE.md`
4. `04-DESIGN-THEMES.md`
5. `05-JOURNAL-SYSTEM.md`
6. `06-CALM-MODE.md`
7. `07-AMBIENT-AUDIO-GUIDE.md`
8. `08-TIME-CAPSULE-GUIDE.md`
9. `09-FUTURE-ME-GUIDE.md`
10. `10-DATABASE-GUIDE.md`
11. `11-AUTHENTICATION-GUIDE.md`
12. `12-FILE-STORAGE-GUIDE.md`
13. `13-ADMIN-GUIDE.md`
14. `14-SECURITY-GUIDE.md`
15. `15-DEPLOYMENT-GUIDE.md`
16. `16-TROUBLESHOOTING.md`
17. `17-FUTURE-FEATURES.md`

---

## Privacy Covenant

QuietInk is built upon the sacred principle that private thoughts belong exclusively to their author. No third-party behavioral trackers or hidden telemetry scripts exist within this codebase.
