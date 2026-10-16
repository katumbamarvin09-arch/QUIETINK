/*
====================================================================
QUIETINK WRITING PROMPTS DATA FILE
====================================================================
FILE: src/data/prompts.ts
PURPOSE:
Provides daily quiet questions, contemplative reflection prompts,
and mode-specific inspirations for the writing room.

HOW TO ADD NEW PROMPTS:
To add a new prompt, simply insert a new string into the 'dailyPrompts'
array or into one of the category-specific arrays below.

EXAMPLE:
"What is something gentle you noticed today?"
====================================================================
*/

import { WritingMode } from '../types/journal';

// ===== QUIETINK CUSTOMIZATION AREA =====
// You can freely edit, add, or remove prompts from this list.

/**
 * Daily rotating quiet questions.
 * These are gentle, open-ended invitations to write.
 */
export const dailyPrompts: string[] = [
  "What is currently taking up the most quiet space in your mind?",
  "What made today meaningful, even in a small or unnoticed way?",
  "What did you learn about yourself in the quiet moments of this week?",
  "What is one thing you are genuinely grateful for right now?",
  "What would you like to remember about today five years from now?",
  "What is something you need to gently forgive yourself for?",
  "Describe a place where you always feel completely safe and at peace.",
  "What conversation brought warmth or clarity to your day?",
  "If today had a color and a texture, what would they be?",
  "What is a heavy thought you would like to set down on this page?",
  "What does quietness mean to you in a noisy world?",
  "Write about an ordinary moment today that held unexpected beauty.",
  "What is one gentle promise you want to keep to yourself tomorrow?",
  "What feeling have you been carrying that hasn't had a chance to speak?",
  "If you could whisper three words of reassurance to yourself, what would they be?"
];

/**
 * Prompts mapped to specific Writing Modes.
 * When the user selects a mode in the Writing Room,
 * the appropriate prompt is offered as a gentle option.
 */
export const modePrompts: Record<WritingMode, string[]> = {
  free: [
    "Write without pausing. Let whatever wants to emerge find its way onto the page.",
    "No rules, no judgment. Only your thoughts and this quiet screen.",
    "Begin with the words: 'Right now, I am noticing...'"
  ],
  thoughts: [
    "What is something you've been turning over in your head all day?",
    "Untangle one complicated thought into simple, honest sentences.",
    "What thoughts feel true right now, and which ones are just noise?"
  ],
  gratitude: [
    "List three small, specific sensory details you appreciated today.",
    "Who is someone whose existence makes the world a little softer for you?",
    "What is a hardship that unexpectedly taught you something valuable?"
  ],
  reflection: [
    "How have you changed over the past season of your life?",
    "What worked well today, and what would you approach differently with grace?",
    "Look back on a decision you made recently. How does it feel now?"
  ],
  goals: [
    "What is a gentle aspiration you want to nurture without rushing?",
    "What kind of person do you want to be tomorrow morning?",
    "What boundary would give you more peace in your daily routine?"
  ],
  ideas: [
    "What is a creative spark, invention, or story idea that crossed your mind?",
    "If there were no limits of time or resources, what would you create?",
    "Connect two unrelated things you observed recently into a new concept."
  ],
  letter: [
    "Write a letter to someone you wish you could speak with honestly.",
    "Write a letter thanking a past version of yourself for surviving hard days.",
    "Write a message to your future self about what you hope they still cherish."
  ],
  daily: [
    "How did today begin, what was the quiet center, and how is it ending?",
    "What was the emotional weather of your morning, afternoon, and evening?",
    "A summary of today's quiet chapter in the story of your life."
  ]
};

/**
 * Helper function to retrieve a random daily prompt
 */
export function getRandomDailyPrompt(): string {
  const randomIndex = Math.floor(Math.random() * dailyPrompts.length);
  return dailyPrompts[randomIndex];
}

/**
 * Helper function to get a prompt for a specific writing mode
 */
export function getPromptForMode(mode: WritingMode): string {
  const list = modePrompts[mode] || dailyPrompts;
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}
