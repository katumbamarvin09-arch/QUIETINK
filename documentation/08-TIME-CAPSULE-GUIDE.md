# 08 — Time Capsule Guide & Locking Architecture

The **Time Capsule** feature allows you to preserve thoughts, prayers, anxieties, or celebrations for your future self.

---

## How It Works

1. **Write & Seal**: Enter a title, message, and select a sealing duration:
   - 1 Month
   - 6 Months (Recommended)
   - 1 Year
   - Custom Date (via calendar picker)
2. **Lock State**:
   - The capsule is stored with `sealedAt` and `unlockDate` timestamps.
   - While `currentDate < unlockDate`, the capsule's inner message is concealed.
   - A countdown badge displays the days remaining until unlocking.
3. **Unlocking Day**:
   - Once the unlock timestamp passes, the capsule unlocks, allowing you to read what you felt and thought months or years prior.

---

## Frontend Prototype vs. Production Database Security

- **In the current client-side prototype**:
  - Locking is enforced by `storageService.ts` and UI state logic.
  - While sealed, the message text is masked in the interface.
- **In a Production Full-Stack Setup**:
  - The server-side API (`GET /api/capsules`) **must not transmit** the `message` field in the response payload if `unlockDate > NOW()`.
  - The server database query enforces:
    ```sql
    SELECT id, title, sealed_at, unlock_date,
           CASE WHEN unlock_date <= NOW() THEN message ELSE NULL END as message
    FROM time_capsules WHERE user_id = $1;
    ```
  - This guarantees that even an experienced user inspecting browser network requests cannot read the message until the lock timestamp arrives.
