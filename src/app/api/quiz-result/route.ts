import { NextResponse } from "next/server";
import { saveQuizResult } from "@/lib/supabase";
import type { DoshaType } from "@/lib/quiz-data";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, primaryDosha, vataScore, pittaScore, kaphaScore } = body;

    if (!email || !primaryDosha) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await saveQuizResult({
      email,
      primary_dosha: primaryDosha as DoshaType,
      vata_score: vataScore ?? 0,
      pitta_score: pittaScore ?? 0,
      kapha_score: kaphaScore ?? 0,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("quiz-result API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
