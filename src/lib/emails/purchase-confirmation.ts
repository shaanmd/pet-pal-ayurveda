/** HTML email sent to the buyer after a successful Square payment. */
export function purchaseConfirmationHtml({
  buyerName,
  amount,
  orderId,
}: {
  buyerName: string;
  amount: string;
  orderId: string;
}) {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width" /></head>
<body style="margin:0;padding:0;background:#faf8f5;font-family:Georgia,'Times New Roman',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf8f5;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(45,90,74,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:#2d5a4a;padding:32px 40px;text-align:center;">
            <p style="margin:0;font-size:24px;font-weight:600;color:#faf8f5;">🌿 PetPal Ayurveda</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <h1 style="margin:0 0 16px;font-size:22px;color:#2c2419;">Thank you for your order${buyerName ? `, ${buyerName}` : ""}!</h1>
            <p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#6b5d4f;">
              Your pre-order for <strong>PetPal Ayurveda: The Complete Guide</strong> has been confirmed.
            </p>

            <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf8f5;border-radius:8px;padding:20px;margin-bottom:24px;">
              <tr>
                <td style="padding:12px 20px;">
                  <p style="margin:0 0 8px;font-size:13px;text-transform:uppercase;letter-spacing:0.1em;color:#6b5d4f;">Order ID</p>
                  <p style="margin:0;font-size:16px;font-weight:600;color:#2c2419;">${orderId}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 20px;">
                  <p style="margin:0 0 8px;font-size:13px;text-transform:uppercase;letter-spacing:0.1em;color:#6b5d4f;">Amount paid</p>
                  <p style="margin:0;font-size:16px;font-weight:600;color:#2c2419;">${amount}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 20px;">
                  <p style="margin:0 0 8px;font-size:13px;text-transform:uppercase;letter-spacing:0.1em;color:#6b5d4f;">Item</p>
                  <p style="margin:0;font-size:16px;font-weight:600;color:#2c2419;">PetPal Ayurveda — Digital Guide (Pre-order)</p>
                </td>
              </tr>
            </table>

            <h2 style="margin:0 0 12px;font-size:18px;color:#2c2419;">What happens next?</h2>
            <ul style="margin:0 0 24px;padding-left:20px;font-size:15px;line-height:1.8;color:#6b5d4f;">
              <li>You'll receive the digital book as soon as it launches.</li>
              <li>Early-bird buyers get all future updates and bonus content free.</li>
              <li>Try the <a href="https://petpalayurveda.com/quiz" style="color:#2d5a4a;font-weight:600;">free Pet Dosha Quiz</a> while you wait!</li>
            </ul>

            <p style="margin:0;font-size:15px;line-height:1.6;color:#6b5d4f;">
              Questions? Reply to this email — we'd love to hear from you.
            </p>
          </td>
        </tr>

        <!-- Footer -->
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
</html>`.trim();
}
