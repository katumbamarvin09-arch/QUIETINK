# 02 — Project Folder Structure

QuietInk is organized cleanly to separate configuration, user interfaces, persistent storage services, procedural audio synthesis, and documentation.

```
quietink/
├── public/                     # Static assets accessible to the browser
│   ├── images/                 # Your logo, avatars, and custom background images
│   │   └── atmospheres/        # Custom photos for Calm Mode
│   └── audio/                  # Optional custom MP3/OGG sound files
│
├── src/                        # Core application code
│   ├── config/
│   │   └── siteConfig.ts       # Central customization file (Branding, Owner, Links)
│   │
│   ├── types/
│   │   └── journal.ts          # TypeScript models (Entries, Capsules, Weather, Garden)
│   │
│   ├── data/
│   │   ├── prompts.ts          # Daily quiet questions and writing mode prompts
│   │   ├── atmospheres.ts      # 8 Calm Mode atmospheres, quotes, and sound mixes
│   │   └── themes.ts           # 7 color themes (Paper, Midnight, Forest, Ocean, etc.)
│   │
│   ├── services/
│   │   ├── ambientAudio.ts     # Procedural Web Audio synthesizer and mixer engine
│   │   └── storageService.ts   # Local-first storage with time-capsule lock enforcement
│   │
│   ├── components/
│   │   ├── Navbar.tsx          # Top navigation bar with theme and audio controls
│   │   ├── LandingPage.tsx     # Serene homepage sanctuary
│   │   ├── JournalDashboard.tsx# Personal dashboard with recent entries and weather
│   │   ├── WritingRoom.tsx     # Distraction-free Writing Room with Solitude Mode
│   │   ├── CalmModeModal.tsx   # Atmospheric canvas particle sanctuary
│   │   ├── AmbientMixerModal.tsx# Individual volume sliders for ambient sounds
│   │   ├── TimeCapsuleSection.tsx# Sealed memories locked until future dates
│   │   ├── FutureMeSection.tsx # Letters to Future Me in envelope format
│   │   ├── GrowthGarden.tsx    # My Quiet Garden visual growth metrics
│   │   ├── PersonalLibrary.tsx # Searchable archives and memory timeline
│   │   ├── UserProfileModal.tsx# Author settings, privacy vault, JSON/MD export
│   │   ├── AdminPanelModal.tsx # Platform administration and prompt curation
│   │   └── Footer.tsx          # Peaceful footer and links
│   │
│   ├── App.tsx                 # Top-level view router and application state
│   ├── main.tsx                # React DOM root mounting
│   └── index.css               # Tailwind CSS v4 styling & typography declarations
│
├── documentation/              # Complete guides and technical references (17 files)
├── .env.example                # Environment variable declarations
├── package.json                # Project dependencies and run scripts
└── README.md                   # Complete repository overview
```

---

## Directory Responsibilities

- **`src/config/siteConfig.ts`**: The single most important file for beginners. Personalize branding, owner name, social links, and defaults without touching UI code.
- **`src/services/ambientAudio.ts`**: Contains the sound synthesis engine. Generates continuous rainfall, ocean surf, fireplace crackles, and wind directly in the browser.
- **`src/services/storageService.ts`**: Manages all journal entries, time capsules, and future letters in private browser local storage.
- **`src/data/prompts.ts`**: Add, edit, or customize the daily quiet questions here.
