import { NextResponse } from "next/server";
import crypto from "crypto";
import { getResend, FROM_EMAIL, ADMIN_EMAIL } from "@/lib/resend";
import { purchaseConfirmationHtml } from "@/lib/emails/purchase-confirmation";
import { orderNotificationHtml } from "@/lib/emails/order-notification";

/**
 * Square sends webhook events for payment completions.
 * This endpoint:
 *  1. Verifies the Square webhook signature
 *  2. Sends a purchase confirmation email to the buyer
 *  3. Sends an order notification email to vet@amvn.com.au
 *
 * Setup in Square Dashboard → Webhooks:
 *   URL: https://petpalayurveda.com/api/webhooks/square
 *   Events: payment.updated
 */
export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-square-hmacsha256-signature");

    // Verify webhook signature if secret is configured
    const webhookSecret = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY;
    if (webhookSecret) {
      const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(
          // Square signs: webhook_url + body
          (process.env.SQUARE_WEBHOOK_URL ?? "") + body
        )
        .digest("base64");

      if (signature !== expectedSignature) {
        console.error("Square webhook signature mismatch");
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
      }
    }

    const event = JSON.parse(body);

    // Only process payment.updated events where status is COMPLETED
    if (event.type !== "payment.updated") {
      return NextResponse.json({ ok: true, skipped: true });
    }

    const payment = event.data?.object?.payment;
    if (!payment) {
      console.error("No payment data in webhook event");
      return NextResponse.json({ error: "No payment data" }, { status: 400 });
    }

    // payment.updated fires for all status changes — only send emails on COMPLETED
    if (payment.status !== "COMPLETED") {
      return NextResponse.json({ ok: true, skipped: true, status: payment.status });
    }

    const orderId = payment.order_id ?? payment.id ?? "N/A";
    const amountMoney = payment.amount_money;
    const amount = amountMoney
      ? `$${(amountMoney.amount / 100).toFixed(2)} ${amountMoney.currency ?? "USD"}`
      : "N/A";

    // Extract buyer info from the payment
    const buyerEmail =
      payment.buyer_email_address ??
      payment.receipt_email ??
      "";
    const buyerName =
      payment.cardholder_name ??
      payment.buyer_email_address?.split("@")[0] ??
      "";

    // Send both emails concurrently
    const resend = getResend();
    const emailPromises: Promise<unknown>[] = [];

    // 1. Buyer confirmation (only if we have their email)
    if (buyerEmail) {
      emailPromises.push(
        resend.emails.send({
          from: FROM_EMAIL,
          to: buyerEmail,
          subject: "Your PetPal Ayurveda pre-order is confirmed!",
          html: purchaseConfirmationHtml({ buyerName, amount, orderId }),
          replyTo: ADMIN_EMAIL,
        })
      );
    }

    // 2. Admin notification
    emailPromises.push(
      resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `New pre-order: ${buyerName || buyerEmail || "Unknown"} — ${amount}`,
        html: orderNotificationHtml({ buyerName, buyerEmail, amount, orderId }),
      })
    );

    const results = await Promise.allSettled(emailPromises);

    // Log any failures
    results.forEach((result, i) => {
      if (result.status === "rejected") {
        console.error(`Email ${i} failed:`, result.reason);
      }
    });

    return NextResponse.json({ ok: true, emailsSent: results.length });
  } catch (err) {
    console.error("Square webhook error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
