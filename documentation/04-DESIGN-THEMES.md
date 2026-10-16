# 04 — Design & Color Themes Guide

QuietInk includes 7 carefully calibrated, peaceful color themes.
Unlike generic websites with harsh saturated colors or cold dark modes, each QuietInk palette is designed for optical comfort and relaxed reading.

---

## The 7 Built-In Themes

1. **Warm Paper (`paper`)** — Default
   - *Atmosphere*: Tactile cream notebook, warm espresso typography.
   - *Colors*: `#FAF7F2` background, `#2B2621` primary text, `#8C6D58` accent.
2. **Midnight Sanctuary (`midnight`)**
   - *Atmosphere*: Deep nocturnal twilight for late-night reflection without eye strain.
   - *Colors*: `#0B0F19` background, `#E2E8F0` text, `#6366F1` indigo accent.
3. **Pine & Moss (`forest`)**
   - *Atmosphere*: Earthy woodland tones, sage accents, and moss greens.
   - *Colors*: `#0F1A15` background, `#E1EBE4` text, `#4E8767` emerald accent.
4. **Ocean Depths (`ocean`)**
   - *Atmosphere*: Tranquil marine depths and ocean mist.
   - *Colors*: `#081624` background, `#E0EEF8` text, `#38BDF8` sky accent.
5. **Cozy Café (`cafe`)**
   - *Atmosphere*: Roasted coffee beans, cinnamon bark, and steamed milk tones.
   - *Colors*: `#F5EFEB` background, `#38271D` text, `#9C6644` walnut accent.
6. **Pure Minimal (`minimal`)**
   - *Atmosphere*: Stark distraction-free monochrome ink on paper.
   - *Colors*: `#FFFFFF` background, `#111827` text, `#1F2937` dark gray accent.
7. **Soft Sunrise (`sunrise`)**
   - *Atmosphere*: Early dawn light, pale peach, and morning optimism.
   - *Colors*: `#FFF9F5` background, `#3C2317` text, `#D97706` amber accent.

---

## How to Customize or Add New Themes

Open **`src/data/themes.ts`**.
Each theme defines:
- `bgPage`: Base page canvas background
- `bgCard`: Card container background
- `bgInput`: Writing surface background
- `textPrimary`: Main headline and body text color
- `textSecondary`: Subdued metadata text color
- `accentColor`: Button and focal element color
- `borderColor`: Subtle border dividers

You can edit any hex code or add an 8th theme to the `themes` map.
