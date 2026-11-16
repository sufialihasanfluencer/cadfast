import nodemailer from "nodemailer";

export interface SendPaymentEmailOptions {
  toEmail: string;
  userName?: string | null;
  paymentId: string;
  orderId?: string;
  amount: number;
  planName?: string;
  licenseKey?: string;
}

/**
 * Creates and configures the Nodemailer Gmail transporter
 */
function getEmailTransporter() {
  const user = process.env.SMTP_USER || "ykandoi20330@gmail.com";
  const pass = process.env.SMTP_PASS || "luguszcizatvccoo";

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for 587
    auth: {
      user,
      pass,
    },
  });
}

/**
 * Deterministic License Key Generator
 */
export function generateLicenseKey(seedText: string): string {
  let hashNum = 0;
  for (let i = 0; i < seedText.length; i++) {
    hashNum = (hashNum << 5) - hashNum + seedText.charCodeAt(i);
    hashNum |= 0;
  }
  const cleanHex = Math.abs(hashNum).toString(16).toUpperCase().padStart(8, "A");
  return `CADFAST-PRO-${cleanHex.substring(0, 4)}-${cleanHex.substring(4, 8)}-2026`;
}

/**
 * Dispatches a formal executive payment confirmation & license activation email
 */
export async function sendPaymentSuccessEmail(options: SendPaymentEmailOptions): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const transporter = getEmailTransporter();
    const adminEmail = process.env.ADMIN_NOTIFY_EMAIL || "ykandoi20330@gmail.com";
    const senderEmail = process.env.SMTP_USER || "ykandoi20330@gmail.com";

    const customerName = options.userName || "Valued Architect";
    const licenseKey = options.licenseKey || generateLicenseKey(options.toEmail + options.paymentId);
    
    const now = new Date();
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 30);

    const formattedDate = now.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const formattedExpiry = expiry.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const formattedAmount = `₹${options.amount.toLocaleString("en-IN")}.00 INR`;

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Receipt & License Activation</title>
</head>
<body style="margin: 0; padding: 0; background-color: #07090e; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e2e8f0;">
  
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #07090e; padding: 30px 10px;">
    <tr>
      <td align="center">
        
        <!-- Main Email Container -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width: 620px; background-color: #0f1422; border-radius: 20px; border: 1px solid #1e293b; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);">
          
          <!-- Header Banner -->
          <tr>
            <td style="padding: 35px 35px 25px; background: linear-gradient(135deg, #182136 0%, #0f1422 100%); border-bottom: 2px solid #ef4444;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-size: 24px; font-weight: 900; letter-spacing: -0.5px; color: #ffffff;">
                      CAD <span style="color: #ef4444;">FAST</span>
                    </span>
                    <span style="display: inline-block; margin-left: 8px; padding: 2px 7px; background-color: rgba(239, 68, 68, 0.2); border: 1px solid rgba(239, 68, 68, 0.5); border-radius: 6px; font-size: 11px; font-weight: 700; color: #f87171;">
                      AI
                    </span>
                    <div style="font-size: 11px; color: #94a3b8; font-family: monospace; letter-spacing: 1px; margin-top: 3px;">
                      AUTOCAD INTELLIGENCE • OFFICIAL LICENSE RECEIPT
                    </div>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; padding: 6px 12px; background-color: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 20px; font-size: 11px; font-weight: 800; color: #34d399; letter-spacing: 0.5px;">
                      ● PLAN ACTIVE
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 35px 35px 20px;">
              <p style="margin: 0 0 16px; font-size: 16px; color: #ffffff; font-weight: 600;">
                Dear ${customerName},
              </p>
              <p style="margin: 0 0 24px; font-size: 14px; line-height: 1.6; color: #cbd5e1;">
                Thank you for your payment. Your subscription to the <strong style="color: #ffffff;">CAD FAST Pro Suite</strong> has been successfully confirmed and activated. Your account has been provisioned with unlimited access to our neural CAD drafting engine and standalone desktop software.
              </p>

              <!-- Official License Key Card -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #131b2c 0%, #172136 100%); border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 14px; margin-bottom: 28px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);">
                <tr>
                  <td style="padding: 22px;">
                    <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #34d399; margin-bottom: 6px;">
                      ★ YOUR OFFICIAL SOFTWARE LICENSE KEY
                    </div>
                    <div style="font-size: 22px; font-weight: 900; font-family: 'Courier New', Courier, monospace; letter-spacing: 2px; color: #ffffff; padding: 10px 14px; background-color: #0b0f19; border-radius: 8px; border: 1px solid #1e293b; display: inline-block;">
                      ${licenseKey}
                    </div>
                    <div style="font-size: 12px; color: #94a3b8; margin-top: 10px;">
                      Validity: <strong style="color: #ffffff;">30 Days</strong> (Valid until <strong style="color: #34d399;">${formattedExpiry}</strong>)
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Software Access Instructions -->
              <div style="font-size: 14px; font-weight: 700; color: #ffffff; margin-bottom: 12px;">
                How to Activate & Access Your Software:
              </div>
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 28px;">
                <tr>
                  <td style="padding: 10px 14px; background-color: #141a29; border-radius: 10px; margin-bottom: 8px;">
                    <span style="font-weight: 700; color: #ef4444;">1. Open CAD FAST Software:</span>
                    <span style="font-size: 13px; color: #94a3b8; display: block; margin-top: 2px;">Launch the CAD FAST standalone software on your Windows or Mac PC, or open the AutoCAD plugin.</span>
                  </td>
                </tr>
                <tr><td height="8"></td></tr>
                <tr>
                  <td style="padding: 10px 14px; background-color: #141a29; border-radius: 10px; margin-bottom: 8px;">
                    <span style="font-weight: 700; color: #ef4444;">2. Enter Credentials:</span>
                    <span style="font-size: 13px; color: #94a3b8; display: block; margin-top: 2px;">Enter your registered email (<strong style="color: #ffffff;">${options.toEmail}</strong>) or paste the License Key generated above.</span>
                  </td>
                </tr>
                <tr><td height="8"></td></tr>
                <tr>
                  <td style="padding: 10px 14px; background-color: #141a29; border-radius: 10px;">
                    <span style="font-weight: 700; color: #ef4444;">3. Unlimited Text-to-CAD:</span>
                    <span style="font-size: 13px; color: #94a3b8; display: block; margin-top: 2px;">Prompt any residential or commercial floor plan and export clean, layered Autodesk DXF and DWG files immediately.</span>
                  </td>
                </tr>
              </table>

              <!-- Payment Receipt Details Table -->
              <div style="font-size: 14px; font-weight: 700; color: #ffffff; margin-bottom: 12px;">
                Payment Transaction Receipt:
              </div>
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #0b0f19; border: 1px solid #1e293b; border-radius: 12px; font-size: 13px; margin-bottom: 28px;">
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #1e293b; color: #94a3b8;">Transaction Reference:</td>
                  <td align="right" style="padding: 12px 16px; border-bottom: 1px solid #1e293b; font-family: monospace; font-weight: 700; color: #ffffff;">${options.paymentId}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #1e293b; color: #94a3b8;">Order ID:</td>
                  <td align="right" style="padding: 12px 16px; border-bottom: 1px solid #1e293b; font-family: monospace; color: #ffffff;">${options.orderId || "N/A"}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #1e293b; color: #94a3b8;">Payment Date:</td>
                  <td align="right" style="padding: 12px 16px; border-bottom: 1px solid #1e293b; color: #ffffff;">${formattedDate}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #1e293b; color: #94a3b8;">Plan Subscribed:</td>
                  <td align="right" style="padding: 12px 16px; border-bottom: 1px solid #1e293b; font-weight: 700; color: #f87171;">CAD FAST Pro (Fixed Monthly)</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #1e293b; color: #94a3b8;">Commercial Rights:</td>
                  <td align="right" style="padding: 12px 16px; border-bottom: 1px solid #1e293b; font-weight: 600; color: #34d399;">100% Royalty-Free & Sanction Ready</td>
                </tr>
                <tr>
                  <td style="padding: 14px 16px; font-weight: 700; color: #ffffff; font-size: 14px;">Total Amount Paid:</td>
                  <td align="right" style="padding: 14px 16px; font-weight: 800; color: #10b981; font-size: 16px;">${formattedAmount}</td>
                </tr>
              </table>

              <!-- Support Note -->
              <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #94a3b8;">
                Need help with software installation or license activation? Reply directly to this email or reach our 24/7 dedicated engineering support desk at <a href="mailto:${senderEmail}" style="color: #f87171; text-decoration: none; font-weight: 600;">${senderEmail}</a>.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 35px; background-color: #07090e; border-top: 1px solid #1e293b; text-align: center; font-size: 11px; color: #64748b; line-height: 1.6;">
              <div>© 2026 CAD FAST Inc. All rights reserved.</div>
              <div style="margin-top: 4px;">AutoCAD® is a registered trademark of Autodesk, Inc. CAD FAST is an independent AI CAD productivity suite.</div>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
    `;

    const info = await transporter.sendMail({
      from: `"CAD FAST Official" <${senderEmail}>`,
      to: options.toEmail,
      bcc: adminEmail !== options.toEmail ? adminEmail : undefined,
      subject: `Payment Successful & License Activated: CAD FAST Pro [REF: ${options.paymentId}]`,
      html: htmlContent,
    });

    console.log(`✓ Payment success email sent to ${options.toEmail} and admin: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error: unknown) {
    console.error("Error sending payment success email:", error);
    const msg = error instanceof Error ? error.message : "Email dispatch failed";
    return { success: false, error: msg };
  }
}
