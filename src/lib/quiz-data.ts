/**
 * Pet Dosha quiz: Vata, Pitta, Kapha.
 * Each question has 3 options; each option adds points to one or more doshas.
 */

export type DoshaType = "vata" | "pitta" | "kapha";

export type QuizOption = {
  label: string;
  doshas: Partial<Record<DoshaType, number>>; // 0–2 points per dosha
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: QuizOption[];
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "energy",
    question: "How would you describe your pet's typical energy level?",
    options: [
      { label: "Very active, quick to move, sometimes restless", doshas: { vata: 2 } },
      { label: "Moderate; intense in short bursts", doshas: { pitta: 2 } },
      { label: "Calm, steady, enjoys long naps", doshas: { kapha: 2 } },
    ],
  },
  {
    id: "body",
    question: "What best describes your pet's build?",
    options: [
      { label: "Lean, light, fine-boned", doshas: { vata: 2 } },
      { label: "Medium, athletic, well-proportioned", doshas: { pitta: 2 } },
      { label: "Solid, heavier frame, cuddly", doshas: { kapha: 2 } },
    ],
  },
  {
    id: "reaction",
    question: "How does your pet usually react to new situations or noise?",
    options: [
      { label: "Easily startled; needs time to settle", doshas: { vata: 2 } },
      { label: "Alert, may get vocal or assertive", doshas: { pitta: 2 } },
      { label: "Takes it in stride; rarely fazed", doshas: { kapha: 2 } },
    ],
  },
  {
    id: "play",
    question: "What type of play does your pet prefer?",
    options: [
      { label: "Quick games, chasing, variety", doshas: { vata: 2 } },
      { label: "Fetch, tug, anything competitive", doshas: { pitta: 2 } },
      { label: "Gentle interaction, cuddling, routine walks", doshas: { kapha: 2 } },
    ],
  },
  {
    id: "sleep",
    question: "How does your pet sleep?",
    options: [
      { label: "Light sleeper; moves a lot", doshas: { vata: 2 } },
      { label: "Moderate; prefers cool, quiet spots", doshas: { pitta: 2 } },
      { label: "Deep sleeper; loves cosy, soft spots", doshas: { kapha: 2 } },
    ],
  },
  {
    id: "weather",
    question: "How does your pet cope with cold vs heat?",
    options: [
      { label: "Dislikes cold; seeks warmth", doshas: { vata: 2 } },
      { label: "Sensitive to heat; seeks shade and cool", doshas: { pitta: 2 } },
      { label: "Handles both; prefers mild weather", doshas: { kapha: 2 } },
    ],
  },
  {
    id: "bonding",
    question: "How does your pet show affection?",
    options: [
      { label: "Quick bursts of excitement; then off again", doshas: { vata: 2 } },
      { label: "Loyal, sometimes possessive or intense", doshas: { pitta: 2 } },
      { label: "Steady, gentle, loves prolonged contact", doshas: { kapha: 2 } },
    ],
  },
];

export function computeDoshaScores(
  answers: Record<string, Partial<Record<DoshaType, number>>>
): Record<DoshaType, number> {
  const scores: Record<DoshaType, number> = {
    vata: 0,
    pitta: 0,
    kapha: 0,
  };
  for (const option of Object.values(answers)) {
    for (const [d, points] of Object.entries(option)) {
      if (d in scores && typeof points === "number") scores[d as DoshaType] += points;
    }
  }
  return scores;
}

export function getPrimaryDosha(scores: Record<DoshaType, number>): DoshaType {
  const entries = Object.entries(scores) as [DoshaType, number][];
  entries.sort((a, b) => b[1] - a[1]);
  return entries[0][0];
}
