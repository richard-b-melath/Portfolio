export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface EmailDispatchResponse {
  success: boolean;
  provider: 'google_smtp' | 'formsubmit_fallback';
  messageId?: string;
  recipient: string;
  timestamp: string;
  ticketId: string;
  error?: string;
}

export async function sendContactEmail(data: ContactFormData): Promise<EmailDispatchResponse> {
  const ticketId = `TX-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  const nowIso = new Date().toISOString();
  const primaryRecipient = 'richardbmelath@gmail.com';

  // 1. Try primary SMTP endpoint (/api/send-email)
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        ...data,
        ticketId,
      }),
    });

    if (response.ok) {
      const json = await response.json();
      if (json.success) {
        return {
          success: true,
          provider: 'google_smtp',
          messageId: json.messageId,
          recipient: json.recipient || primaryRecipient,
          timestamp: json.timestamp || nowIso,
          ticketId,
        };
      }
      // If server responded with a specific error (e.g. missing SMTP_PASS)
      if (json.error && json.error.includes('SMTP_PASS')) {
        throw new Error(json.error);
      }
    }
  } catch (err: any) {
    console.warn('Direct SMTP endpoint attempt:', err?.message);
    // If it's a configuration error with SMTP_PASS, re-throw so the user gets informed
    if (err?.message && err.message.includes('SMTP_PASS')) {
      throw err;
    }
  }

  // 2. Fallback to FormSubmit AJAX (uses SMTP mailer to forward to richardbmelath@gmail.com)
  // This guarantees that in static hosting or while testing before .env is populated, emails still arrive!
  try {
    const fallbackRes = await fetch(`https://formsubmit.co/ajax/${primaryRecipient}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        _subject: `[Portfolio Dispatch ${ticketId}] ${data.subject || 'New Message'} from ${data.name}`,
        message: data.message,
        ticketId,
        _template: 'table',
        _captcha: 'false',
      }),
    });

    if (fallbackRes.ok) {
      return {
        success: true,
        provider: 'formsubmit_fallback',
        recipient: primaryRecipient,
        timestamp: nowIso,
        ticketId,
      };
    }
  } catch (fallbackErr) {
    console.error('Fallback email delivery error:', fallbackErr);
  }

  throw new Error(
    `Delivery failed. Please configure SMTP_PASS in .env or write directly to ${primaryRecipient}`
  );
}
