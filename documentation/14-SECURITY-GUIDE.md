# 14 — Security & Privacy Architecture

This document provides a comprehensive security review of QuietInk.

---

## Security Principles Implemented

1. **No Hardcoded Secrets**:
   - Zero API keys, passwords, or secret credentials are hardcoded into source code.
   - All server credentials use environment variables via `.env.example`.
2. **Client-Side Data Sovereignty**:
   - In default mode, journals stay on the user's browser sandbox via Local Storage.
   - Users can export full backups or purge local records at any time.
3. **Cross-Site Scripting (XSS) Prevention**:
   - React automatically escapes rendered strings to prevent inline `<script>` injection attacks.
   - HTML inputs are sanitized and typed.
4. **Time-Capsule Cryptographic Locking Concept**:
   - In production, server APIs omit sealed message payloads until the target timestamp is verified server-side.
5. **HTTPS Enforcement**:
   - Production deployments must strictly use HTTPS/SSL to prevent eavesdropping on writing packets in transit.
