import nodemailer from 'nodemailer';

export interface EmailPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface SmtpConfig {
  host?: string;
  port?: number | string;
  secure?: boolean | string;
  user?: string;
  pass?: string;
  to?: string;
}

export interface SendResult {
  success: boolean;
  messageId?: string;
  recipient?: string;
  timestamp?: string;
  error?: string;
}

export async function sendPortfolioEmail(
  payload: EmailPayload,
  config: SmtpConfig
): Promise<SendResult> {
  const { name, email, subject, message } = payload;

  if (!name || !email || !message) {
    return {
      success: false,
      error: 'Missing required fields: name, email, and message are mandatory.',
    };
  }

  const host = config.host || 'smtp.gmail.com';
  const port = Number(config.port) || 465;
  const isSecure = config.secure !== false && config.secure !== 'false';
  const user = config.user || 'richardbmelath@gmail.com';
  // Strip spaces in case Google App Password is formatted as "xxxx xxxx xxxx xxxx"
  const pass = (config.pass || '').replace(/\s+/g, '');
  const to = config.to || user;

  if (!pass) {
    return {
      success: false,
      error: 'Google App Password (SMTP_PASS) is not configured in .env. Please generate one at https://myaccount.google.com/apppasswords and add it to .env.',
    };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: isSecure,
    auth: {
      user,
      pass,
    },
  });

  const nowIso = new Date().toISOString();
  const formattedDate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'long',
  });

  const emailSubject = `[Portfolio] ${subject?.trim() || 'New Message'} from ${name.trim()}`;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Portfolio Message</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #050505; color: #f5f5f5; margin: 0; padding: 24px; }
    .card { max-width: 600px; margin: 0 auto; background: #0d0d0d; border: 1px solid #262626; border-radius: 12px; overflow: hidden; }
    .header { background: #141414; padding: 20px 24px; border-bottom: 1px solid #262626; }
    .header-badge { display: inline-block; font-size: 10px; font-family: monospace; letter-spacing: 1px; color: #ffffff; background: #262626; padding: 4px 10px; border-radius: 9999px; text-transform: uppercase; margin-bottom: 8px; }
    .title { font-size: 18px; font-weight: 700; margin: 0; color: #ffffff; }
    .body { padding: 24px; }
    .meta-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px; }
    .meta-table td { padding: 8px 0; border-bottom: 1px solid #1f1f1f; }
    .meta-label { color: #888888; width: 120px; font-family: monospace; font-size: 11px; text-transform: uppercase; }
    .meta-val { color: #ffffff; font-weight: 500; }
    .message-box { background: #141414; border: 1px solid #262626; border-radius: 8px; padding: 16px; margin-top: 16px; font-size: 14px; line-height: 1.6; color: #e5e5e5; white-space: pre-wrap; }
    .footer { padding: 16px 24px; background: #0a0a0a; border-top: 1px solid #1f1f1f; text-align: center; font-size: 11px; color: #666666; font-family: monospace; }
    .button { display: inline-block; background: #ffffff; color: #000000; text-decoration: none; font-weight: 600; font-size: 12px; padding: 10px 20px; border-radius: 6px; margin-top: 16px; font-family: monospace; text-transform: uppercase; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="header-badge">● SMTP DISPATCH // INBOX NOTIFICATION</div>
      <h1 class="title">New Message Transmitted via Portfolio</h1>
    </div>
    <div class="body">
      <table class="meta-table">
        <tr>
          <td class="meta-label">From Name:</td>
          <td class="meta-val">${name}</td>
        </tr>
        <tr>
          <td class="meta-label">Reply Email:</td>
          <td class="meta-val"><a href="mailto:${email}" style="color: #ffffff; text-decoration: underline;">${email}</a></td>
        </tr>
        <tr>
          <td class="meta-label">Subject:</td>
          <td class="meta-val">${subject?.trim() || 'General Inquiry'}</td>
        </tr>
        <tr>
          <td class="meta-label">Timestamp:</td>
          <td class="meta-val">${formattedDate} (IST)</td>
        </tr>
      </table>

      <div style="font-size: 11px; color: #888888; font-family: monospace; text-transform: uppercase; margin-bottom: 6px;">
        Transmitted Message Content:
      </div>
      <div class="message-box">
${message.trim()}
      </div>

      <div style="text-align: center; margin-top: 24px;">
        <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject || 'Your Portfolio Inquiry')}" class="button">
          Reply Directly to ${name} &rarr;
        </a>
      </div>
    </div>
    <div class="footer">
      Richard Biju Melath Portfolio • Automated Google SMTP Dispatcher
    </div>
  </div>
</body>
</html>
  `;

  const info = await transporter.sendMail({
    from: `"${name}" <${user}>`,
    replyTo: `"${name}" <${email}>`,
    to,
    subject: emailSubject,
    text: `New Portfolio Message\n\nFrom: ${name} (${email})\nSubject: ${subject || 'General Inquiry'}\nTime: ${formattedDate}\n\nMessage:\n${message}`,
    html: htmlContent,
  });

  return {
    success: true,
    messageId: info.messageId,
    recipient: to,
    timestamp: nowIso,
  };
}
