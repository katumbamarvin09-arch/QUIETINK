# 17 — Future Features & Scalability Roadmap

QuietInk is architected so that the following advanced capabilities can be cleanly layered on top without needing to rewrite existing components.

---

## Planned Architecture Extensions

1. **AI-Assisted Reflection (Optional & User-Triggered)**:
   - Mindful questions: When requested, Gemini or another model can ask one gentle reflective question based on what you wrote, helping you explore feelings without being intrusive.
   - Privacy guarantee: Only triggers when explicitly invoked by clicking a "Reflect Deeper" button.
2. **Encrypted Cloud Synchronization**:
   - Multi-device synchronization using end-to-end client-side zero-knowledge encryption (Web Crypto API AES-GCM).
   - The server stores only encrypted cipher blobs; the user's passphrase decrypts the journal locally.
3. **Audio / Voice Journaling**:
   - Speech-to-text recording with Web Audio for hands-free audio reflections during walks.
4. **Installable PWA (Progressive Web App)**:
   - Service worker caching for 100% offline writing on iOS and Android devices.
5. **PDF & Bound Book Export**:
   - Print-ready PDF export with book-style serif formatting and table of contents for physical printing.
6. **Time Capsule Notifications**:
   - Web Push notifications or optional privacy-friendly email dispatches when a sealed time capsule reaches its unlock date.
