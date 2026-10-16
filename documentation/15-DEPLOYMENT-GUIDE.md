# 15 — Beginner-Friendly Deployment Guide

This guide explains how to take QuietInk from your local computer to a live, secure website accessible to the world.

---

## The Deployment Journey

```
LOCAL COMPUTER
      │  (1. Write and test code)
      ▼
GIT REPOSITORY (GitHub / GitLab)
      │  (2. Version control and push changes)
      ▼
HOSTING PLATFORM (Vercel / Cloud Run / Netlify / Railway)
      │  (3. Automated build and static deployment)
      ▼
DOMAIN & SSL (e.g. quietink.com)
      │  (4. Connect custom DNS and automated HTTPS certificate)
      ▼
LIVE QUIET SANCTUARY (Accessible worldwide)
```

---

## Step-by-Step Instructions

### Step 1: Push Code to GitHub
1. Initialize git in your project directory:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of QuietInk"
   ```
2. Create a new repository on [GitHub](https://github.com).
3. Connect your local repository and push:
   ```bash
   git remote add origin https://github.com/[YOUR_USERNAME]/quietink.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploying to Vercel or Netlify (Zero Configuration)
1. Sign up for [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
2. Click **Add New Project** and select your GitHub repository.
3. Keep default settings:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Click **Deploy**. In under 60 seconds, you will receive a live URL!

### Step 3: Connecting a Custom Domain
1. In your hosting dashboard, go to **Settings > Domains**.
2. Enter your custom domain (e.g., `myquietjournal.com`).
3. Update your DNS records at your domain registrar (GoDaddy, Namecheap, Google Domains) to point to the provided CNAME / A records.
4. SSL/HTTPS certificates will provision automatically.
