# Guide: How to Include & Customize Social Media Icons

This guide explains how social media icons work in QuietInk, how you can customize your links using **VS Code on Windows**, and how to add any new icons you like.

---

## 1. Quickest Method: Edit `src/config/siteConfig.ts` in VS Code

All social links for your website are centralized in one file.

1. In **VS Code for Windows**, press `Ctrl + P` to open the file finder.
2. Type `siteConfig.ts` and press **Enter**.
3. Scroll to the `socialLinks` object (around line 50):

```typescript
// Social Media Links (Set to empty string "" to hide any platform)
socialLinks: {
  twitter: "https://x.com/yourhandle",         // X (Twitter)
  instagram: "https://instagram.com/yourhandle", // Instagram
  github: "https://github.com/yourhandle",       // GitHub
  linkedin: "https://linkedin.com/in/yourhandle",// LinkedIn
  youtube: "https://youtube.com/@yourhandle",    // YouTube
  substack: "https://yourhandle.substack.com",   // Substack
  discord: "https://discord.gg/yourinvite",      // Discord (or "" to hide)
  facebook: "",                                  // Facebook (hidden if empty)
  tiktok: "",                                    // TikTok (hidden if empty)
  bluesky: "",                                   // Bluesky (hidden if empty)
  whatsapp: "",                                  // WhatsApp (hidden if empty)
  email: "hello@example.com",                    // Email
},
```

### How to Hide an Icon
If you don't use a platform (for example, TikTok or Facebook), simply leave its value as empty quotes `""`. The icon will **automatically vanish** from the site with no broken layout!

### How to Show an Icon
Type your URL or profile handle between the quotes. As soon as you save the file (`Ctrl + S`), the icon will appear.

---

## 2. Interactive In-App Method: Using the Admin Panel

You can also preview and change your icons directly while browsing:

1. Scroll down to the website footer and click **Admin** (or click your user profile).
2. Click the **Social Media Icons** tab.
3. You will see:
   - A **Live Component Preview** where you can switch between **Circles**, **Pills**, and **Minimal** icon styles.
   - Live input fields for every social network.
   - A **Test Link** button ($\nearrow$) to test that your link opens your profile.
   - **Save to Website**: Instantly updates your site on your computer.
   - **Copy for VS Code**: Copies the clean TypeScript code ready to paste into `siteConfig.ts`.

---

## 3. Where Social Media Icons Appear

1. **Website Footer**: Located at the bottom of every page with a clean theme-matched circular badge row and a quick **Share Sanctuary** button.
2. **Landing Page Community Card**: A pill-styled interactive row inviting readers to follow and connect.
3. **Any Other Page**: You can drop the `<SocialIcons />` component into any component you want!

---

## 4. How to Insert Social Icons Anywhere in Your Code

Import the component:

```tsx
import { SocialIcons } from './components/SocialIcons';
```

And drop it into JSX:

```tsx
{/* Default circular icon buttons */}
<SocialIcons activeTheme={activeTheme} variant="circle" size="md" />

{/* Pill badges with platform names */}
<SocialIcons activeTheme={activeTheme} variant="pill" size="md" />

{/* Minimal monochrome icons */}
<SocialIcons activeTheme={activeTheme} variant="minimal" size="sm" />
```

Available Props:
- `variant`: `'circle'` | `'pill'` | `'minimal'`
- `size`: `'sm'` | `'md'` | `'lg'`
- `showShareButton`: `true` | `false` (adds a 1-click share/copy button)
- `align`: `'left'` | `'center'` | `'right'`

---

## 5. Adding a Brand New Social Icon

All SVG vector paths are neatly organized inside `src/components/SocialIcons.tsx`.

If you ever want to add a platform (e.g. Spotify, Threads, Mastodon):
1. Open `src/components/SocialIcons.tsx`.
2. Add its name to `SocialPlatformId`:
   ```typescript
   export type SocialPlatformId = ... | 'spotify';
   ```
3. Add its SVG path to `SocialPlatformIcons`:
   ```typescript
   spotify: ({ className = 'w-4 h-4', style }) => (
     <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
       {/* SVG path here */}
     </svg>
   ),
   ```
4. Add the label and placeholder in `PLATFORM_METADATA`:
   ```typescript
   spotify: {
     label: 'Spotify',
     placeholder: 'https://open.spotify.com/user/yourhandle',
     brandColor: '#1DB954',
   },
   ```
5. Add it to `siteConfig.ts` in `socialLinks`.

That's it! It will automatically render everywhere with hover animations, theme styling, and accessibility tags.
