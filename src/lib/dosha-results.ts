/**
 * Dosha result content for pets — based on Ayurvedic principles applied to animals.
 * Sources: classical Ayurvedic texts (Charaka Samhita, Ashtanga Hridayam),
 * veterinary integrative medicine, and the authors' practice.
 */
import type { DoshaType } from "./quiz-data";

export type DoshaResultContent = {
  title: string;
  subtitle: string;
  emoji: string;
  description: string;
  traits: string[];
  massageTips: string[];
  dietTips: string[];
  herbTips: string[];
  lifestyleTips: string[];
  commonImbalances: string[];
  pdfUrl?: string;
};

export const DOSHA_RESULTS: Record<DoshaType, DoshaResultContent> = {
  vata: {
    title: "Your pet is Vata-dominant",
    subtitle: "Air & Space — light, quick, sensitive",
    emoji: "🌬️",
    description:
      "Vata-dominant pets are spirited, curious, and creative — always alert to the world around them. They are quick to learn but can become anxious or unsettled when routines shift. Warmth, gentle grounding touch, and a predictable daily rhythm help them feel secure and balanced.",
    traits: [
      "Lean, light build — often wiry or fine-boned",
      "High energy in bursts, followed by fatigue",
      "Easily startled by loud sounds or sudden changes",
      "Irregular appetite and digestion",
      "Sensitive to cold; seeks warmth and cosy spots",
      "Affectionate in bursts; can be restless during rest",
    ],
    massageTips: [
      "Use slow, long, grounding strokes — never quick or flicking motions.",
      "Begin at the head and neck, move slowly down the spine toward the tail.",
      "Focus especially on the lower back and hindquarters — the seat of Vata.",
      "Keep sessions to 5–10 minutes; Vata pets overstimulate quickly.",
      "Work in a warm, quiet room free from distractions.",
      "Warm sesame oil (or plain coconut oil) may be applied in small amounts — always check with your vet first.",
      "End with gentle, sustained palm pressure on the sacrum to ground energy.",
    ],
    dietTips: [
      "Warm, moist, easily digestible meals — lightly cooked is ideal.",
      "Small, consistent meals at set times to support irregular Vata digestion.",
      "Warming foods: cooked chicken or turkey, sweet potato, rice, pumpkin.",
      "Add a small amount of warm broth or ghee to dry food.",
      "Avoid raw, cold, or very dry foods which aggravate Vata air qualities.",
      "Always ensure fresh water is available and at room temperature.",
    ],
    herbTips: [
      "Ashwagandha — an adaptogen that calms the nervous system and builds resilience. Use vet-approved dosing.",
      "Brahmi (Bacopa) — supports mental calm and nervous system balance.",
      "Shatavari — nourishing and grounding; supports digestion and immunity.",
      "Warm ginger in micro-amounts — gentle digestive support.",
      "⚠️ Always consult your integrative vet before introducing any herb or supplement.",
    ],
    lifestyleTips: [
      "Keep a predictable daily schedule — same mealtimes, walk times, sleep spots.",
      "Create a warm, draught-free sleeping area with soft bedding.",
      "Gentle, consistent exercise — short walks rather than intense play sessions.",
      "Avoid over-scheduling or too much novelty; Vata thrives on calm routine.",
      "Quiet time after meals supports digestion — avoid vigorous play post-feeding.",
    ],
    commonImbalances: [
      "Anxiety, fearfulness, or excessive barking/vocalising",
      "Dry skin, coat, or itchiness",
      "Constipation or irregular digestion",
      "Joint stiffness or cracking (especially in cold weather)",
      "Weight loss or poor appetite",
    ],
  },

  pitta: {
    title: "Your pet is Pitta-dominant",
    subtitle: "Fire & Water — intense, focused, driven",
    emoji: "🔥",
    description:
      "Pitta-dominant pets are confident, sharp, and goal-oriented. They have strong digestion, clear focus, and a natural leadership quality. When out of balance, their fire can become frustration, overheating, or digestive upset. Cooling, calming practices bring out the best in your Pitta pet.",
    traits: [
      "Medium, athletic, well-muscled build",
      "Intense, focused gaze — highly alert",
      "Strong appetite and efficient digestion",
      "Can be assertive, competitive, or territorial",
      "Dislikes heat; seeks shade, cool floors, and cool water",
      "Loyal and protective; may be selective with strangers",
    ],
    massageTips: [
      "Use cooling, calming strokes — steady and medium pressure.",
      "Avoid vigorous rubbing or warming techniques that generate heat.",
      "Focus on the chest, belly, and solar plexus region — centre of Pitta.",
      "Work in a cool room; avoid sessions during hot afternoon hours.",
      "Coconut oil has a natural cooling quality and is generally well-tolerated (vet approval advised).",
      "Keep sessions calm and deliberate — Pitta pets respond to confident, unhurried touch.",
      "Finish with a gentle cooling pass from head to tail using the backs of your hands.",
    ],
    dietTips: [
      "Cooling, fresh, lightly cooked meals — avoid anything spicy, greasy, or rich.",
      "Lean proteins: chicken, turkey, white fish.",
      "Cooling vegetables: zucchini, cucumber (in moderation), peas, leafy greens.",
      "Keep meals at room temperature or slightly cool — avoid serving food warm.",
      "Ensure abundant fresh, cool water at all times; Pitta pets can dehydrate.",
      "Avoid heavy, oily, or fermented foods which stoke digestive fire further.",
    ],
    herbTips: [
      "Triphala — a classic Ayurvedic blend for gentle detox and digestive balance.",
      "Coriander and fennel — cooling carminatives that soothe the gut.",
      "Amla (Indian Gooseberry) — cooling, vitamin C–rich immune support.",
      "Aloe vera — cooling and anti-inflammatory (use a pet-safe preparation).",
      "⚠️ Always consult your integrative vet before introducing any herb or supplement.",
    ],
    lifestyleTips: [
      "Exercise in the early morning or evening — avoid midday heat.",
      "Provide access to shade, cool tiles, and cool fresh water outdoors.",
      "Avoid overstimulating competitive games that ramp up intensity.",
      "Mental enrichment (puzzle feeders, training) channels Pitta focus positively.",
      "Allow for downtime and recovery — Pitta pets can push themselves too hard.",
    ],
    commonImbalances: [
      "Skin rashes, hot spots, or inflammatory conditions",
      "Acid reflux or sensitive digestion",
      "Irritability, snapping, or territorial behaviour",
      "Eye inflammation or redness",
      "Overheating or panting excessively in moderate temperatures",
    ],
  },

  kapha: {
    title: "Your pet is Kapha-dominant",
    subtitle: "Earth & Water — steady, loving, calm",
    emoji: "🌿",
    description:
      "Kapha-dominant pets are the heart of the home — deeply loyal, patient, and profoundly affectionate. Their steady nature brings peace to any household. When Kapha accumulates, they may become sluggish or gain weight easily. Gentle stimulation, regular movement, and a lighter diet keep them vibrant and healthy.",
    traits: [
      "Solid, heavier frame — well-padded, cuddly build",
      "Slow, deliberate movements — never rushed",
      "Deep, heavy sleeper; loves long naps in cosy spots",
      "Steady appetite; prone to weight gain",
      "Tolerates both heat and cold reasonably well",
      "Deeply affectionate, gentle, and patient with family",
    ],
    massageTips: [
      "Use brisk, invigorating strokes — more stimulating than for Vata or Pitta.",
      "Focus on the limbs, joints, and chest to encourage circulation and warmth.",
      "Work from the extremities toward the heart to support lymphatic flow.",
      "Sessions of 10–15 minutes are generally well tolerated.",
      "Morning massage is ideal — helps energise a slow Kapha start to the day.",
      "Dry massage (without oil) or light mustard oil (vet-approved) has a warming, stimulating effect.",
      "Pay attention to the lungs/chest area — Kapha tends to accumulate congestion there.",
    ],
    dietTips: [
      "Light, warm, easily digestible meals — avoid heavy, fatty, or very moist foods.",
      "Lean proteins in moderate portions; avoid rich meats or excessive fat.",
      "Warming spices in micro-amounts: a pinch of turmeric or ginger can aid digestion.",
      "Two structured meals per day — avoid free-feeding which encourages overeating.",
      "Limit starchy treats and high-carbohydrate snacks.",
      "Encourage hydration — Kapha pets can be reluctant drinkers.",
    ],
    herbTips: [
      "Trikatu (ginger, black pepper, long pepper) — warming blend that kindles digestive fire. Vet-approved micro-dosing only.",
      "Turmeric — anti-inflammatory, supports joint health and immunity.",
      "Hawthorn berry — supports cardiovascular health and circulation.",
      "Punarnava — traditional Kapha-reducing herb; supports kidney and fluid balance.",
      "⚠️ Always consult your integrative vet before introducing any herb or supplement.",
    ],
    lifestyleTips: [
      "Daily movement is essential — regular walks and gentle play prevent stagnation.",
      "Vary routes and activities to keep a Kapha pet mentally stimulated.",
      "Avoid overfeeding or using food as primary reward — opt for play or affection.",
      "Keep sleeping areas moderately warm but not overly soft or padded.",
      "Morning routines with brisk activity help offset the slow Kapha tendency.",
    ],
    commonImbalances: [
      "Weight gain or obesity",
      "Sluggish digestion or excess mucus",
      "Respiratory congestion or frequent coughs/colds",
      "Low energy, reluctance to exercise",
      "Swelling, water retention, or skin folds that trap moisture",
    ],
  },
};
