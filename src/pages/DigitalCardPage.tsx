import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  Share2, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Copy, 
  Check, 
  Linkedin, 
  Github, 
  Wifi, 
  ArrowLeft,
  MessageCircle,
  FileCode,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';

export const DigitalCardPage = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const primaryEmail = 'richardbmelath@gmail.com';
  const primaryPhone = '+919544211720';
  const whatsappUrl = 'https://wa.me/919544211720';
  const portfolioUrl = 'https://richardbmelath.vercel.app/';
  const linkedinUrl = 'https://www.linkedin.com/in/richardbmelath/';
  const githubUrl = 'https://github.com/richard-b-melath';

  // Current domain URL for this card
  const cardUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/card` 
    : 'https://richardbmelath.vercel.app/card';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // vCard representation for mobile import
  const vCardData = `BEGIN:VCARD
VERSION:3.0
N:Melath;Richard;Biju;;
FN:Richard Biju Melath
TITLE:AI & Software Developer | Agentic AI Specialist
ORG:Universität Trier (M.Sc. Data Science)
TEL;TYPE=CELL,VOICE:${primaryPhone}
EMAIL;TYPE=INTERNET,PREF:${primaryEmail}
URL;TYPE=WORK:${portfolioUrl}
URL;TYPE=LINKEDIN:${linkedinUrl}
URL;TYPE=GITHUB:${githubUrl}
ADR;TYPE=HOME:;;Ernakulam;Kerala;;India
NOTE:Agentic AI Specialist & Software Engineer. M.Sc. Data Science @ Universität Trier.
END:VCARD`;

  const downloadVCard = () => {
    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Richard_Biju_Melath.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success(language === 'de' ? 'vCard heruntergeladen!' : 'vCard downloaded! Open to add directly to contacts.');
  };

  // Download standalone interactive HTML visiting card with clickable links
  const downloadHtmlCard = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="${language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Richard Biju Melath - Digital Visiting Card</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #000000;
      color: #ffffff;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .card {
      background: #0a0a0a;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 20px;
      padding: 32px;
      max-width: 520px;
      width: 100%;
      box-shadow: 0 0 50px rgba(255, 255, 255, 0.1);
      position: relative;
    }
    .badge {
      display: inline-block;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      padding: 4px 10px;
      border-radius: 9999px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.05);
      margin-bottom: 20px;
    }
    h1 { font-size: 24px; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 4px; }
    .role { color: #d4d4d8; font-size: 13px; font-weight: 600; margin-bottom: 2px; }
    .org { color: #a1a1aa; font-size: 12px; margin-bottom: 24px; }
    .links { display: flex; flex-direction: column; gap: 10px; }
    .link-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 14px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #ffffff;
      text-decoration: none;
      font-size: 13px;
      transition: all 0.2s;
    }
    .link-item:hover {
      background: #ffffff;
      color: #000000;
      border-color: #ffffff;
    }
    .footer {
      margin-top: 24px;
      padding-top: 16px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      text-align: center;
      font-size: 11px;
      color: #71717a;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">OFFICIAL DIGITAL VISITING CARD</div>
    <h1>Richard Biju Melath</h1>
    <div class="role">Agentic AI Specialist & Software Developer</div>
    <div class="org">M.Sc. Data Science @ Universität Trier • DoctorAssist.ai</div>

    <div class="links">
      <a href="mailto:${primaryEmail}" class="link-item">
        <span>✉</span> <strong>Email:</strong> ${primaryEmail}
      </a>
      <a href="tel:${primaryPhone}" class="link-item">
        <span>✆</span> <strong>Phone:</strong> ${primaryPhone}
      </a>
      <a href="${whatsappUrl}" target="_blank" class="link-item">
        <span>💬</span> <strong>WhatsApp:</strong> Direct Chat
      </a>
      <a href="${linkedinUrl}" target="_blank" class="link-item">
        <span>in</span> <strong>LinkedIn:</strong> linkedin.com/in/richardbmelath
      </a>
      <a href="${githubUrl}" target="_blank" class="link-item">
        <span>⌨</span> <strong>GitHub:</strong> github.com/richard-b-melath
      </a>
      <a href="${portfolioUrl}" target="_blank" class="link-item">
        <span>🌐</span> <strong>Website:</strong> richardbmelath.vercel.app
      </a>
    </div>

    <div class="footer">
      Live visiting card generated from <a href="${cardUrl}" style="color: #ffffff;">${cardUrl}</a>
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Richard_Biju_Melath_Visiting_Card.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success(language === 'de' ? 'Interaktive Karte heruntergeladen!' : 'Interactive digital card (.html) downloaded with live links!');
  };

  const copyDetails = () => {
    navigator.clipboard.writeText(
      `Richard Biju Melath\nAgentic AI Specialist & Software Developer\nM.Sc. Data Science @ Universität Trier\nEmail: ${primaryEmail}\nPhone: ${primaryPhone}\nWhatsApp: ${whatsappUrl}\nWebsite: ${portfolioUrl}\nLinkedIn: ${linkedinUrl}\nGitHub: ${githubUrl}`
    );
    setCopied(true);
    toast.success(language === 'de' ? 'Daten kopiert!' : 'Contact details copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Richard Biju Melath - Digital Visiting Card',
          text: 'Richard Biju Melath - Agentic AI Specialist & Software Developer',
          url: cardUrl,
        });
      } catch (err) {
        copyDetails();
      }
    } else {
      navigator.clipboard.writeText(cardUrl);
      toast.success(language === 'de' ? 'Karten-Link kopiert!' : 'Visiting card link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono flex flex-col justify-between p-4 sm:p-6 bg-grid-pattern relative overflow-x-hidden selection:bg-white selection:text-black">
      {/* Top Header Navigation */}
      <header className="max-w-xl w-full mx-auto flex items-center justify-between py-4">
        <a
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} />
          <span>{language === 'de' ? 'Zurück zum Portfolio' : 'Back to Portfolio'}</span>
        </a>

        {/* Language Switcher Button */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-white/15 bg-white/[0.04] hover:bg-white/10 text-xs text-white transition-all cursor-pointer"
          title="Switch Language / Sprache wechseln"
        >
          <span className={language === 'en' ? 'font-bold text-white' : 'text-neutral-500'}>EN</span>
          <span className="text-neutral-600">/</span>
          <span className={language === 'de' ? 'font-bold text-white' : 'text-neutral-500'}>DE</span>
        </button>
      </header>

      {/* Main 3D Visiting Card Container */}
      <main className="flex-1 flex flex-col items-center justify-center my-6">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: '1200px' }}
          className="w-full max-w-xl"
        >
          <motion.div
            animate={{
              rotateX: tilt.x,
              rotateY: tilt.y,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative rounded-2xl bg-black border border-white/20 p-6 sm:p-8 shadow-[0_0_60px_rgba(255,255,255,0.08)] overflow-hidden tech-bracket"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Subtle silver specular sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.04] via-transparent to-white/[0.02] pointer-events-none" />

            {/* Card Top: Chip, NFC and Live Beacon */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-7 rounded bg-neutral-800 border border-white/30 p-0.5 flex items-center justify-center">
                  <div className="w-full h-full rounded border border-white/20 grid grid-cols-2 grid-rows-2 gap-0.5 p-0.5 bg-neutral-900" />
                </div>
                <Wifi size={16} className="rotate-90 text-neutral-500" />
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-[10px] tracking-widest uppercase text-white font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>OFFICIAL DIGITAL CARD</span>
              </div>
            </div>

            {/* Title & Organization */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Richard Biju Melath
              </h1>
              <p className="text-xs sm:text-sm text-neutral-300 font-semibold mt-1">
                Agentic AI Specialist & Software Developer
              </p>
              <p className="text-[11px] text-neutral-500 mt-0.5">
                M.Sc. Data Science @ Universität Trier • DoctorAssist.ai
              </p>
            </div>

            {/* Direct Clickable Contact Links Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 text-xs">
              {/* Email Link */}
              <a
                href={`mailto:${primaryEmail}`}
                className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 hover:border-white hover:bg-white hover:text-black text-neutral-200 transition-all flex items-center gap-2.5 group"
              >
                <Mail size={14} className="shrink-0 text-neutral-400 group-hover:text-black" />
                <div className="min-w-0">
                  <div className="text-[9px] uppercase text-neutral-500 group-hover:text-neutral-700">Email</div>
                  <div className="truncate font-semibold text-[11px]">{primaryEmail}</div>
                </div>
              </a>

              {/* Phone Link */}
              <a
                href={`tel:${primaryPhone}`}
                className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 hover:border-white hover:bg-white hover:text-black text-neutral-200 transition-all flex items-center gap-2.5 group"
              >
                <Phone size={14} className="shrink-0 text-neutral-400 group-hover:text-black" />
                <div className="min-w-0">
                  <div className="text-[9px] uppercase text-neutral-500 group-hover:text-neutral-700">Phone</div>
                  <div className="truncate font-semibold text-[11px]">+91 9544211720</div>
                </div>
              </a>

              {/* WhatsApp Link */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 hover:border-white hover:bg-white hover:text-black text-neutral-200 transition-all flex items-center gap-2.5 group"
              >
                <MessageCircle size={14} className="shrink-0 text-neutral-400 group-hover:text-black" />
                <div className="min-w-0">
                  <div className="text-[9px] uppercase text-neutral-500 group-hover:text-neutral-700">WhatsApp</div>
                  <div className="truncate font-semibold text-[11px]">Chat on WhatsApp</div>
                </div>
              </a>

              {/* Website Link */}
              <a
                href={portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 hover:border-white hover:bg-white hover:text-black text-neutral-200 transition-all flex items-center gap-2.5 group"
              >
                <Globe size={14} className="shrink-0 text-neutral-400 group-hover:text-black" />
                <div className="min-w-0">
                  <div className="text-[9px] uppercase text-neutral-500 group-hover:text-neutral-700">Portfolio</div>
                  <div className="truncate font-semibold text-[11px]">richardbmelath.vercel.app</div>
                </div>
              </a>

              {/* LinkedIn Link */}
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 hover:border-white hover:bg-white hover:text-black text-neutral-200 transition-all flex items-center gap-2.5 group"
              >
                <Linkedin size={14} className="shrink-0 text-neutral-400 group-hover:text-black" />
                <div className="min-w-0">
                  <div className="text-[9px] uppercase text-neutral-500 group-hover:text-neutral-700">LinkedIn</div>
                  <div className="truncate font-semibold text-[11px]">in/richardbmelath</div>
                </div>
              </a>

              {/* GitHub Link */}
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 hover:border-white hover:bg-white hover:text-black text-neutral-200 transition-all flex items-center gap-2.5 group"
              >
                <Github size={14} className="shrink-0 text-neutral-400 group-hover:text-black" />
                <div className="min-w-0">
                  <div className="text-[9px] uppercase text-neutral-500 group-hover:text-neutral-700">GitHub</div>
                  <div className="truncate font-semibold text-[11px]">richard-b-melath</div>
                </div>
              </a>
            </div>

            {/* QR Code Section: Encodes this actual domain card URL */}
            <div className="p-4 rounded-xl bg-neutral-950 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              <div className="text-left space-y-1">
                <div className="text-xs font-bold text-white uppercase flex items-center gap-1.5">
                  <Sparkles size={12} />
                  <span>Scan to Open & Save Card</span>
                </div>
                <p className="text-[11px] text-neutral-400 font-sans max-w-xs">
                  Scan with your smartphone camera to immediately access this card on the domain with live clickable links.
                </p>
                <div className="text-[10px] text-neutral-500 underline pt-1">
                  {cardUrl}
                </div>
              </div>

              <div className="p-2 bg-white rounded-lg shrink-0 shadow-lg">
                <QRCodeCanvas
                  value={cardUrl}
                  size={95}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="M"
                  className="rounded"
                />
              </div>
            </div>

            {/* Action Buttons: Save vCard, Download HTML Card, Share */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pt-4 border-t border-white/10">
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                {/* Save to contacts (.vcf) */}
                <button
                  onClick={downloadVCard}
                  className="flex-1 sm:flex-none h-9 px-4 rounded-lg bg-white text-black font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  <Download size={13} />
                  <span>{language === 'de' ? 'vCard Speichern' : 'Save Contact (.vcf)'}</span>
                </button>

                {/* Download Standalone HTML Card */}
                <button
                  onClick={downloadHtmlCard}
                  className="flex-1 sm:flex-none h-9 px-3.5 rounded-lg border border-white/20 bg-white/5 hover:bg-white/15 text-white text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  title="Download offline card with active links"
                >
                  <FileCode size={13} />
                  <span>{language === 'de' ? 'Karte Herunterladen' : 'Download Card (.html)'}</span>
                </button>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={copyDetails}
                  className="h-9 px-3 rounded-lg border border-white/15 hover:bg-white/10 text-white text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copied ? t('card.btn.copied') : t('card.btn.copy')}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="h-9 px-3 rounded-lg border border-white/15 hover:bg-white/10 text-white text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Share2 size={13} />
                  <span>{t('card.btn.share')}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-xl w-full mx-auto text-center py-4 border-t border-white/10 text-[11px] text-neutral-500">
        Richard Biju Melath • <a href="/" className="text-white hover:underline">richardbmelath.vercel.app</a>
      </footer>
    </div>
  );
};

export default DigitalCardPage;
