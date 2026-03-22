import { NextResponse } from "next/server";
import { saveQuizResult } from "@/lib/supabase";
import { getResend, FROM_EMAIL, ADMIN_EMAIL } from "@/lib/resend";
import { quizResultNotificationHtml } from "@/lib/emails/quiz-result-notification";
import type { DoshaType } from "@/lib/quiz-data";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, primaryDosha, vataScore, pittaScore, kaphaScore } = body;

    if (!email || !primaryDosha) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const scores = {
      vataScore: vataScore ?? 0,
      pittaScore: pittaScore ?? 0,
      kaphaScore: kaphaScore ?? 0,
    };

    // Save to Supabase and send admin notification in parallel
    await Promise.allSettled([
      saveQuizResult({
        email,
        primary_dosha: primaryDosha as DoshaType,
        vata_score: scores.vataScore,
        pitta_score: scores.pittaScore,
        kapha_score: scores.kaphaScore,
      }),
      getResend().emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `Dosha Quiz: ${email} — ${primaryDosha.charAt(0).toUpperCase() + primaryDosha.slice(1)}`,
        html: quizResultNotificationHtml({
          email,
          primaryDosha,
          ...scores,
        }),
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("quiz-result API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
