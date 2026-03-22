import { NextResponse } from "next/server";
import { getResend, FROM_EMAIL, ADMIN_EMAIL } from "@/lib/resend";

export async function POST(req: Request) {
  try {
    const { email, source } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const resend = getResend();

    // Send welcome email to subscriber
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "You're on the PetPal Ayurveda waitlist!",
      replyTo: ADMIN_EMAIL,
      html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width" /></head>
<body style="margin:0;padding:0;background:#faf8f5;font-family:Georgia,'Times New Roman',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf8f5;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(45,90,74,0.08);">
        <tr>
          <td style="background:#2d5a4a;padding:32px 40px;text-align:center;">
            <p style="margin:0;font-size:24px;font-weight:600;color:#faf8f5;">🌿 PetPal Ayurveda</p>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            <h1 style="margin:0 0 16px;font-size:22px;color:#2c2419;">You're on the list!</h1>
            <p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:#6b5d4f;">
              Thanks for joining the PetPal Ayurveda waitlist. We'll let you know when pricing changes or the book launches.
            </p>
            <p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:#6b5d4f;">
              In the meantime, why not discover your pet's Dosha?
            </p>
            <a href="https://petpalayurveda.com/quiz"
               style="display:inline-block;background:#2d5a4a;color:#faf8f5;padding:12px 28px;border-radius:8px;font-weight:600;font-size:16px;text-decoration:none;">
              Take the free Pet Dosha Quiz
            </a>
            <p style="margin:24px 0 0;font-size:16px;line-height:1.6;color:#6b5d4f;">
              Want the best price? The early-bird pre-order is available now at
              <a href="https://petpalayurveda.com/pre-order" style="color:#2d5a4a;font-weight:600;">petpalayurveda.com/pre-order</a>.
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 40px;border-top:1px solid #e8e2d9;text-align:center;">
            <p style="margin:0;font-size:13px;color:#6b5d4f;">
              © ${new Date().getFullYear()} PetPal Ayurveda · <a href="https://petpalayurveda.com" style="color:#2d5a4a;">petpalayurveda.com</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`.trim(),
    });

    // Notify admin about new subscriber
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New waitlist signup: ${email}`,
      html: `<p>New waitlist signup from <strong>${source || "website"}</strong>:</p><p><a href="mailto:${email}">${email}</a></p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Waitlist API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
