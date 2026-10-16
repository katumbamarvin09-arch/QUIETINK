# 10 — Database Architecture & Data Models

This guide describes how QuietInk's data models are structured and how they map to relational (PostgreSQL, SQLite) or document (Firestore, MongoDB) databases.

---

## Entity Relationship Overview

```
USERS
  ├── JOURNAL_ENTRIES (1 to Many)
  ├── TIME_CAPSULES (1 to Many)
  ├── FUTURE_LETTERS (1 to Many)
  ├── GROWTH_GARDEN_DATA (1 to 1)
  └── USER_SETTINGS (1 to 1)
```

---

## SQL Schema Definition (PostgreSQL / SQLite)

```sql
-- 1. USERS TABLE
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    display_name VARCHAR(100),
    tagline VARCHAR(255),
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. JOURNAL ENTRIES TABLE
CREATE TABLE journal_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    emotional_weather VARCHAR(50) DEFAULT 'calm',
    writing_mode VARCHAR(50) DEFAULT 'free',
    category VARCHAR(100) DEFAULT 'Reflections',
    tags TEXT[], -- Array of strings
    word_count INT DEFAULT 0,
    reading_time_minutes INT DEFAULT 1,
    is_favorite BOOLEAN DEFAULT FALSE,
    is_archived BOOLEAN DEFAULT FALSE,
    atmosphere_used VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. TIME CAPSULES TABLE (Secure Locking)
CREATE TABLE time_capsules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    unlock_note VARCHAR(255),
    sealed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    unlock_date TIMESTAMP WITH TIME ZONE NOT NULL
);

-- 4. LETTERS TO FUTURE ME
CREATE TABLE future_letters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    recipient VARCHAR(100) DEFAULT 'Future Me',
    opening VARCHAR(100) DEFAULT 'Dear future me,',
    message TEXT NOT NULL,
    category VARCHAR(100) DEFAULT 'Personal Growth',
    written_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    scheduled_open_date TIMESTAMP WITH TIME ZONE NOT NULL,
    is_opened BOOLEAN DEFAULT FALSE
);
```

---

## Beginner Explanation

- **`UUID`**: A universally unique identifier (like a random fingerprint) ensuring no two entries collide.
- **`FOREIGN KEY (user_id)`**: Guarantees that entries belong only to the author who wrote them.
- **`ON DELETE CASCADE`**: If a user chooses to delete their account, all their journals are automatically deleted with no orphaned data left behind.
