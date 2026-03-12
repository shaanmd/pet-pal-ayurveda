import { createClient } from "@supabase/supabase-js";
import type { QuizResultRow } from "./supabase-types";

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase env vars are not set.");
  return createClient(url, key);
}

export async function saveQuizResult(data: Omit<QuizResultRow, "id" | "created_at">) {
  const { error } = await getClient().from("petpal_quiz_results").insert([data]);
  if (error) throw error;
}
