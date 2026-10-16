# 03 — Personalization Guide ("Make QuietInk Your Own")

This guide explains how you can personalize every aspect of your QuietInk website without breaking any core logic.

---

## 1. Branding & Identity (The Central Config)

Open the file: **`src/config/siteConfig.ts`**

Look for the `siteConfig` object:

```typescript
export const siteConfig = {
  // Brand Identity
  siteName: "QuietInk", // [YOUR WEBSITE NAME]
  siteTagline: "Give Your Thoughts a Quiet Place.", // [YOUR TAGLINE]
  siteShortDescription: "A peaceful digital sanctuary...", // [YOUR ABOUT TEXT]

  // Owner & Contact Information
  ownerName: "[YOUR NAME HERE]", // [YOUR NAME]
  contactEmail: "hello@example.com", // [YOUR EMAIL]

  // Copyright
  copyrightText: "© 2026 QuietInk. All thoughts remain your private sanctuary.", // [YOUR COPYRIGHT TEXT]

  // Social Media Links
  socialLinks: {
    twitter: "https://twitter.com/yourhandle",
    instagram: "https://instagram.com/yourhandle",
    github: "https://github.com/yourhandle",
    substack: "https://yourhandle.substack.com",
  },
};
```

---

## 2. Replacing the Logo and Favicon

1. **Logo image**:
   - Place your logo file in `public/images/my-logo.svg` or `public/images/my-logo.png`.
   - In `src/config/siteConfig.ts`, update `logoPath: "/images/my-logo.svg"`.
2. **Favicon**:
   - Place your favicon file in `public/favicon.ico`.
   - Ensure `<link rel="icon" href="/favicon.ico" />` in `index.html` points to your file.

---

## 3. Customizing Daily Writing Prompts

Open **`src/data/prompts.ts`**:
- Simply add new strings to the `dailyPrompts` array.
- Example:
  ```typescript
  export const dailyPrompts: string[] = [
    "What is a gentle thought you would like to carry through tonight?",
    // Add your own questions here...
  ];
  ```

---

## 4. Customizing the Hero Text & Home Page

Open **`src/components/LandingPage.tsx`**:
- Look for `<h1>` with id `hero-heading` to customize the big headline.
- Look for `<p>` with id `hero-subtext` to change the main subtitle.
- Look for the `Reflections from the Quiet Room` section to replace the placeholder testimonials with your own quotes.
