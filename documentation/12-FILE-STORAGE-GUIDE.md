# 12 — File Storage Architecture Guide

This guide explains how QuietInk handles images, audio files, and user attachments.

---

## Why You Should Not Store Files in the Database

Large binary files (images, audio MP3s, videos) should **never** be stored as raw BLOBs directly inside relational databases:
- It dramatically bloats the database size.
- It degrades database query performance.
- It makes backups and migrations slow and expensive.

---

## The Correct Storage Pattern

```
User uploads avatar / photo
         │
         ▼
[Backend Storage API]
         │
         ▼
[Cloud Object Storage] (e.g., S3, Google Cloud Storage, or public folder)
         │  (Returns secure URL: https://storage.example.com/avatar123.jpg)
         ▼
[Database Record]
Stores only the reference URL string:
UPDATE users SET avatar_url = 'https://storage.example.com/avatar123.jpg';
```

---

## Local Development vs. Production

1. **Local Development**:
   - Place files directly in `public/images/` or `public/audio/`.
   - Access them via `/images/filename.jpg` or `/audio/filename.mp3`.
2. **Production Cloud Hosting**:
   - Use an S3-compatible bucket or Google Cloud Storage.
   - Configure a CDN (Cloudflare or Fastly) for caching static audio files.
