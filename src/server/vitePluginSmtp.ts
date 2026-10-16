import type { Plugin } from 'vite';
import { sendPortfolioEmail } from './smtpService';

export function vitePluginSmtp(env: Record<string, string>): Plugin {
  return {
    name: 'vite-plugin-smtp',
    configureServer(server) {
      server.middlewares.use('/api/send-email', async (req, res) => {
        if (req.method === 'OPTIONS') {
          res.statusCode = 200;
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
          res.end();
          return;
        }

        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: false, error: 'Method Not Allowed. Use POST.' }));
          return;
        }

        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });

        req.on('end', async () => {
          try {
            const payload = JSON.parse(body || '{}');

            const result = await sendPortfolioEmail(payload, {
              host: process.env.SMTP_HOST || env.SMTP_HOST,
              port: process.env.SMTP_PORT || env.SMTP_PORT,
              secure: process.env.SMTP_SECURE || env.SMTP_SECURE,
              user: process.env.SMTP_USER || env.SMTP_USER,
              pass: process.env.SMTP_PASS || env.SMTP_PASS,
              to: process.env.SMTP_TO || env.SMTP_TO,
            });

            res.statusCode = result.success ? 200 : 400;
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.end(JSON.stringify(result));
          } catch (err: any) {
            console.error('Vite dev server SMTP error:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.end(JSON.stringify({ success: false, error: err?.message || 'Server error while sending email.' }));
          }
        });
      });
    },
  };
}
