import { createClient } from "@supabase/supabase-js";
import type { QuizResultRow } from "./supabase-types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function saveQuizResult(data: Omit<QuizResultRow, "id" | "created_at">) {
  const { error } = await supabase.from("quiz_results").insert([data]);
  if (error) throw error;
}
