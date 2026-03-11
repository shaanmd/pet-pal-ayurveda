/**
 * Content for each Dosha result.
 * Can later be loaded from Supabase (e.g. dosha_tips table).
 */
import type { DoshaType } from "./quiz-data";

export type DoshaResultContent = {
  title: string;
  subtitle: string;
  description: string;
  massageTips: string[];
  pdfUrl?: string; // Optional: link to Canva PDF
};

export const DOSHA_RESULTS: Record<DoshaType, DoshaResultContent> = {
  vata: {
    title: "Your pet is Vata-dominant",
    subtitle: "Air & space — light, quick, creative",
    description:
      "Vata pets are often lively, sensitive, and quick to react. They benefit from calm, warm environments and gentle, grounding touch. Regular, predictable routines help them feel secure.",
    massageTips: [
      "Use slow, warm, grounding strokes rather than quick or light touches.",
      "Focus on the lower back and hindquarters to support stability.",
      "Keep sessions short (5–10 minutes) to avoid overstimulation.",
      "Use a warm (not hot) environment; Vata types are sensitive to cold.",
      "Consider light, warm oil (e.g. sesame) if your vet approves.",
    ],
    pdfUrl: undefined, // Add your Canva PDF link when ready
  },
  pitta: {
    title: "Your pet is Pitta-dominant",
    subtitle: "Fire & water — intense, focused, driven",
    description:
      "Pitta pets are often alert, athletic, and can be strong-willed. They thrive with cooling, calming routines and moderate-intensity exercise. Avoid overheating and overstimulation.",
    massageTips: [
      "Use cooling, calming strokes; avoid vigorous or heating techniques.",
      "Focus on the chest and belly to support digestion and calm.",
      "Keep the room cool and avoid midday heat after massage.",
      "Shorter, regular sessions work better than long, intense ones.",
      "Lavender or chamomile-infused oils (vet-approved) can support relaxation.",
    ],
    pdfUrl: undefined,
  },
  kapha: {
    title: "Your pet is Kapha-dominant",
    subtitle: "Earth & water — steady, loving, calm",
    description:
      "Kapha pets are typically calm, affectionate, and enjoy routine. They benefit from gentle movement and light stimulation to support circulation and energy without overwhelming them.",
    massageTips: [
      "Use invigorating but gentle strokes to encourage circulation.",
      "Focus on limbs and joints to support mobility and warmth.",
      "Slightly longer sessions (10–15 minutes) are often well tolerated.",
      "Morning or early afternoon massage can help maintain energy balance.",
      "Light, non-greasy oils (e.g. sunflower) can be used if your vet agrees.",
    ],
    pdfUrl: undefined,
  },
};
