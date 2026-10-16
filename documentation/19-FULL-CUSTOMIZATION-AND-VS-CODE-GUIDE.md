# 19 — The Complete Customization Guide in All Languages (VS Code on Windows)

Welcome! This guide is written in plain English specifically for **Windows users using Visual Studio Code**. It shows you how to customize every part of QuietInk across all the languages used in this project:
1. **The Code Languages**: HTML, CSS (Tailwind), TypeScript / React (TSX), and JSON.
2. **The Spoken Languages**: How to translate the site into any human language (English, Oluganda, Español, Français, Kiswahili, etc.).

---

## Part 1: How the Logo Was Updated & How to Use Your Own Image

### 1. What was done:
- A high-resolution, vector-crisp version of your **gold emblem logo** (with the golden quill pen, open parchment book, ink calligraphy swoosh, golden celestial ring, and "QuietInk: Your Journal, Your Space" typography) was created at:
  ```
  public/images/quietink-logo.svg
  ```
- It is now prominently featured in:
  - The **Top Navigation Bar** (in a circular white badge)
  - The **Home Page Hero** (with hover-zoom and sparkle)
  - The **Footer**

### 2. If you want to use your exact PNG file (`quietink logo.png`):
1. In Windows File Explorer, copy your `quietink logo.png` file into the folder:
   ```
   quietink/public/images/quietink-logo.png
   ```
2. In VS Code, open **`src/config/siteConfig.ts`**.
3. Around line 46, change:
   ```typescript
   logoPath: "/images/quietink-logo.svg",
   ```
   to:
   ```typescript
   logoPath: "/images/quietink-logo.png",
   ```
4. Save the file. The site will immediately switch to your PNG image!

---

## Part 2: Super-Easy 1-Click Running on Windows

We modified the project so you never have to memorize terminal commands:

### Method A: The 1-Click Double-Click (Easiest)
1. Open your project folder in Windows File Explorer.
2. Double-click the file named **`start.bat`**.
3. **What happens automatically:**
   - It checks if Node.js is installed.
   - It automatically installs any missing packages (`npm install`).
   - It **automatically opens your web browser** to `http://localhost:3000`.
   - It starts your website!

### Method B: The 1-Click Keyboard Shortcut in VS Code
1. Open the project in VS Code (**File > Open Folder...**).
2. Press **`Ctrl + Shift + B`** on your keyboard.
3. VS Code will run the dedicated background task and start the site!

---

## Part 3: Customizing in All Code Languages (VS Code)

### 1. HTML (`index.html`)
The HTML file controls the page title that appears in browser tabs, the favicon icon, and the web fonts:

- **File**: `index.html`
- **To change the browser tab title**:
  Find `<title>` on line 6:
  ```html
  <title>QuietInk — Give Your Thoughts a Quiet Place</title>
  ```
  Replace the text with your desired title.
- **To change fonts**:
  Look at lines 12–14 where Google Fonts are loaded (`Lora`, `Cormorant Garamond`, `Plus Jakarta Sans`). You can replace these with any font from [fonts.google.com](https://fonts.google.com).

---

### 2. CSS & Tailwind CSS (`src/index.css`)
CSS controls visual appearance, colors, margins, fonts, and dark mode transitions:

- **File**: `src/index.css`
- **To change default text selection colors**:
  Change `selection:bg-[#E8DFD3]` in `index.html` or `index.css`.
- **To change theme color palettes**:
  Open **`src/data/themes.ts`**. Each theme has simple hex color codes:
  ```typescript
  {
    id: 'paper',
    name: 'Warm Paper',
    bgPage: '#FBF9F5',      // Main background color
    bgCard: '#FFFFFF',      // Card box background
    textPrimary: '#2C2926', // Main text color
    accentColor: '#8C6D58', // Buttons & highlights
  }
  ```
  Simply change any hex code (e.g., `#8C6D58` to `#2563EB` for blue or `#059669` for emerald).

---

### 3. TypeScript & React (TSX) (`src/config/siteConfig.ts` & `src/components/`)
This is the brain of your website:

#### A. The Master Control Center: `src/config/siteConfig.ts`
This single file lets you customize 90% of the website without coding:
- **`siteName`**: Website name.
- **`siteTagline`**: Subtitle / slogan.
- **`ownerName`**: Your name or pen name.
- **`contactEmail`**: Your email address.
- **`socialLinks`**: Your Twitter/X, Instagram, Substack, GitHub links.
- **`preferences.defaultTheme`**: Choose default theme (`'paper'`, `'midnight'`, `'forest'`, etc.).

#### B. Daily Reflection Questions: `src/data/prompts.ts`
Want to add your own journaling questions? Open this file and add questions to the `JOURNAL_PROMPTS` list:
```typescript
"What was the most peaceful moment of your day today?",
```

#### C. Peaceful Atmospheres: `src/data/atmospheres.ts`
Contains the 8 tranquil environments (Rainy Window, Ocean Mist, Hearth & Embers, etc.). You can change quotes, titles, and sound effects here.

#### D. Making Elements Movable on Click & Drag: `src/components/MovableThoughts.tsx`
This component is fully commented for beginners. It demonstrates:
1. `useState` to store coordinates `(x, y)` in memory.
2. `onClick` to add pixels to position when clicked.
3. `motion.div drag` to enable smooth mouse/finger dragging.

---

### 4. JSON Files (`package.json`, `metadata.json`)
JSON files store project settings:
- **`metadata.json`**: Controls the name and capabilities in Google AI Studio.
- **`package.json`**: Lists dependencies (like `react`, `lucide-react`, `motion`).
- **`.vscode/tasks.json`**: Configures VS Code one-click tasks.

---

## Part 4: Customizing in All Spoken Human Languages (i18n)

QuietInk includes an Internationalization dictionary system located at:
```
src/i18n/translations.ts
```

### 1. How It Works
The website now includes built-in translations for:
- 🇬🇧 **English** (`en`)
- 🇺🇬 **Oluganda** (`lg`)
- 🇪🇸 **Español** (`es`)
- 🇫🇷 **Français** (`fr`)
- 🇹🇿 **Kiswahili** (`sw`)

You can switch between them right now using the **globe icon (🌐)** in the top navigation bar!

### 2. How to Add Any Other Language (e.g., German, Arabic, Japanese)
1. Open **`src/i18n/translations.ts`**.
2. Add your language to `SUPPORTED_LANGUAGES`:
   ```typescript
   { code: 'de', label: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
   ```
3. Copy one of the translation dictionaries and fill in the translated words:
   ```typescript
   de: {
     siteName: 'QuietInk',
     tagline: 'Dein Tagebuch, Dein Raum',
     startWriting: 'Schreiben beginnen',
     calmMode: 'Ruhemodus',
     ...
   }
   ```
4. Save the file. Your new language will instantly appear in the dropdown!

---

## Quick Reference Summary

| What you want to change | File to open in VS Code |
| :--- | :--- |
| **Site Name, Tagline, Owner, Socials** | `src/config/siteConfig.ts` |
| **Logo image** | `public/images/` & `src/config/siteConfig.ts` |
| **Browser tab title & Favicon** | `index.html` |
| **Theme colors (Paper, Midnight, etc.)** | `src/data/themes.ts` |
| **Journaling prompts & questions** | `src/data/prompts.ts` |
| **Peaceful atmospheres & sounds** | `src/data/atmospheres.ts` |
| **Movable / Draggable cards** | `src/components/MovableThoughts.tsx` |
| **Translations / Spoken languages** | `src/i18n/translations.ts` |
| **Run the website on Windows** | Double-click `start.bat` or press `Ctrl+Shift+B` |
