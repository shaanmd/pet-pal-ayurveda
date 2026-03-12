/**
 * Supabase types for PetPal Ayurveda.
 * Create a table `quiz_results` with columns matching this type,
 * then use the optional API route or server action to persist results.
 */

export type DoshaType = "vata" | "pitta" | "kapha";

export type QuizResultRow = {
  id?: string;
  created_at?: string;
  email: string;
  primary_dosha: DoshaType;
  vata_score: number;
  pitta_score: number;
  kapha_score: number;
  /** Optional: for dynamic tips from Supabase */
  tips_json?: Record<string, unknown>;
};

/** Example RPC or table for dosha-specific tips (Option B dynamic result) */
export type DoshaTipRow = {
  dosha: DoshaType;
  title: string;
  subtitle: string;
  description: string;
  massage_tips: string[];
  pdf_url?: string;
};
