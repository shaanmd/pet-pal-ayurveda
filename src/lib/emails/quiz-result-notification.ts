/** HTML email sent to vet@amvn.com.au when someone completes the Dosha quiz. */
export function quizResultNotificationHtml({
  email,
  ownerName,
  petName,
  species,
  primaryDosha,
  vataScore,
  pittaScore,
  kaphaScore,
}: {
  email: string;
  ownerName: string;
  petName: string;
  species: string;
  primaryDosha: string;
  vataScore: number;
  pittaScore: number;
  kaphaScore: number;
}) {
  const doshaEmoji =
    primaryDosha === "vata" ? "🌬️" : primaryDosha === "pitta" ? "🔥" : "🌊";

  const speciesLabels: Record<string, string> = {
    dog: "Dog",
    cat: "Cat",
    horse: "Horse",
    bird: "Bird",
    "pocket-pet": "Pocket Pet",
  };

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
          <td style="background:#2d5a4a;padding:24px 40px;text-align:center;">
            <p style="margin:0;font-size:20px;font-weight:600;color:#faf8f5;">New Dosha Quiz Result ${doshaEmoji}</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px 40px;">
            <p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:#2c2419;">
              <strong>${ownerName || "Someone"}</strong> just completed the <strong>PetPal Ayurveda</strong> Dosha quiz for their ${speciesLabels[species] || "pet"}, <strong>${petName || "unnamed"}</strong>.
            </p>

            <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf8f5;border-radius:8px;">
              <tr>
                <td style="padding:12px 20px;border-bottom:1px solid #e8e2d9;">
                  <strong style="color:#6b5d4f;font-size:13px;text-transform:uppercase;letter-spacing:0.1em;">Owner</strong><br/>
                  <span style="font-size:16px;color:#2c2419;">${ownerName || "Not provided"}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 20px;border-bottom:1px solid #e8e2d9;">
                  <strong style="color:#6b5d4f;font-size:13px;text-transform:uppercase;letter-spacing:0.1em;">Email</strong><br/>
                  <a href="mailto:${email}" style="font-size:16px;color:#2d5a4a;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 20px;border-bottom:1px solid #e8e2d9;">
                  <strong style="color:#6b5d4f;font-size:13px;text-transform:uppercase;letter-spacing:0.1em;">Pet</strong><br/>
                  <span style="font-size:16px;color:#2c2419;">${petName || "Not provided"} (${speciesLabels[species] || "Unknown"})</span>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 20px;border-bottom:1px solid #e8e2d9;">
                  <strong style="color:#6b5d4f;font-size:13px;text-transform:uppercase;letter-spacing:0.1em;">Primary Dosha</strong><br/>
                  <span style="font-size:16px;color:#2c2419;">${doshaEmoji} ${primaryDosha.charAt(0).toUpperCase() + primaryDosha.slice(1)}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 20px;">
                  <strong style="color:#6b5d4f;font-size:13px;text-transform:uppercase;letter-spacing:0.1em;">Scores</strong><br/>
                  <span style="font-size:16px;color:#2c2419;">Vata: ${vataScore} · Pitta: ${pittaScore} · Kapha: ${kaphaScore}</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 40px;border-top:1px solid #e8e2d9;text-align:center;">
            <p style="margin:0;font-size:13px;color:#6b5d4f;">
              PetPal Ayurveda · Automated quiz notification
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`.trim();
}
