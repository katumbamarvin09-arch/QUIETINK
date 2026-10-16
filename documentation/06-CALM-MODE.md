# 06 — Calm Mode & Atmospheres Guide

Calm Mode is QuietInk's signature environmental immersion feature.

---

## The 8 Signature Atmospheres

1. **Rainy Window**: Soft rain tapping on a warm windowpane.
2. **Ocean Mist**: Rhythmic tides rolling along a quiet shore.
3. **Deep Forest**: Sunlight filtering through tall pines and cedar needles.
4. **Hearth & Embers**: Crackling fireplace logs in a quiet study.
5. **Quiet Café**: Rainy afternoon corner booth with distant espresso warmth.
6. **Midnight Solitude**: Deep indigo twilight under a canopy of stars.
7. **Golden Sunrise**: Pale dawn light greeting a peaceful new morning.
8. **Old Library**: Dust motes drifting between rows of antique books.

---

## Procedural Visual Particles

In `src/components/CalmModeModal.tsx`, an HTML5 `<canvas>` renders lightweight procedural visual effects:
- Downward falling rain streaks
- Rising glowing fireplace embers
- Drifting celestial stars and fireflies

---

## Adding Custom Background Photos

If you want to use your own photography instead of the gradients:
1. Save your photograph in `public/images/atmospheres/` (e.g., `public/images/atmospheres/rain.jpg`).
2. Update `src/data/atmospheres.ts` to reference your image path.
3. Common mistake: Ensure file names are all lowercase with no spaces.
