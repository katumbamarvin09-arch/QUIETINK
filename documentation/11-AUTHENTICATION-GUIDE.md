# 11 — Authentication & User Account Architecture

QuietInk requires strict authentication practices to safeguard private writings.

---

## Core Security Rules for Authentication

1. **Never Store Plaintext Passwords**:
   - Always hash passwords with `bcrypt`, `argon2`, or `scrypt` with a salt cost factor of at least 12.
2. **Never Expose Auth Secrets to the Frontend**:
   - Session tokens, database URLs, and encryption secrets belong strictly on the server (`process.env.AUTH_SECRET`).
3. **HTTP-Only Cookies**:
   - Issue JWTs or session IDs inside `HttpOnly; Secure; SameSite=Strict` cookies. This prevents malicious scripts (XSS) from reading the user's session token.
4. **Session Expiry & Inactivity**:
   - Quiet journaling apps should support gentle re-authentication timeouts if left unattended on public computers.

---

## Architecture Flow

```
[Browser User]
    │  1. Enters Email & Password
    ▼
[Express / Next.js Server]
    │  2. Validates email & hashes password
    │  3. Compares with Database hash (bcrypt.compare)
    ▼
[Database]
    │  4. Returns User Profile
    ▼
[Server]
    │  5. Generates encrypted Session Cookie
    ▼
[Browser User]
    │  6. Receives cookie; accesses private sanctuary
```
