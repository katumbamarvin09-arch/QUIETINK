# 16 — Troubleshooting & Common Issues Guide

This guide helps you diagnose and resolve common development and deployment issues.

---

## 1. Website Won't Load or Blank Screen
- **Cause**: JavaScript syntax error or missing module import.
- **Diagnosis**: Open your browser's Developer Tools (`F12` or `Right-Click > Inspect > Console`). Look for red error messages.
- **Fix**: Check `compile_applet` or run `npm run build` in the terminal to identify the exact line causing the issue.

---

## 2. Audio Not Playing When Clicking Ambient Sounds
- **Cause**: Browser Autoplay Policy. Modern browsers (Chrome, Safari, Firefox) prevent web audio from playing until the user interacts with the page (clicks a button).
- **Diagnosis**: Check the console for `The AudioContext was not allowed to start`.
- **Fix**: Click anywhere on the page, click the **Mixer** button, or click **Unmute**. QuietInk automatically resumes the AudioContext on the first user click.

---

## 3. Custom Images Missing (404 Not Found)
- **Cause**: File placed in the wrong folder or typo in file name.
- **Diagnosis**: Inspect network tab in Developer Tools for 404 status.
- **Fix**: In Vite, static files must sit in the `public/` directory (e.g. `public/images/logo.png`). When referencing them in code, use absolute paths from root: `src="/images/logo.png"`. Do **not** use `public/images/logo.png` in the `src` attribute.

---

## 4. Mobile Layout Broken or Horizontal Scrollbar
- **Cause**: Fixed pixel widths on wide containers.
- **Fix**: Ensure parent containers use `max-w-7xl mx-auto px-4 w-full` and avoid hardcoded widths like `w-[900px]`. Use `w-full max-w-lg` instead.

---

## 5. Changes to Prompts or Config Not Appearing
- **Cause**: Browser cache or Vite HMR refresh pending.
- **Fix**: Hard reload your browser (`Ctrl + Shift + R` or `Cmd + Shift + R`).
