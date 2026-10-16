import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { 
  X, 
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
  ExternalLink,
  MessageCircle,
  FileCode
} from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';

interface BusinessCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BusinessCardModal = ({ isOpen, onClose }: BusinessCardModalProps) => {
  const { language, t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const primaryEmail = 'richardbmelath@gmail.com';
  const primaryPhone = '+919544211720';
  const whatsappUrl = 'https://wa.me/919544211720';
  const portfolioUrl = 'https://richardbmelath.vercel.app/';
  const linkedinUrl = 'https://www.linkedin.com/in/richardbmelath/';
  const githubUrl = 'https://github.com/richard-b-melath';

  // Domain redirect URL for the QR code visiting card
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

  const vCardData = `BEGIN:VCARD
VERSION:3.0
N:Melath;Richard;Biju;;
FN:Richard Biju Melath
TITLE:Agentic AI Specialist & Software Developer
ORG:Universität Trier (M.Sc. Data Science)
TEL;TYPE=CELL,VOICE:${primaryPhone}
EMAIL;TYPE=INTERNET,PREF:${primaryEmail}
URL;TYPE=WORK:${portfolioUrl}
URL;TYPE=LINKEDIN:${linkedinUrl}
URL;TYPE=GITHUB:${githubUrl}
ADR;TYPE=HOME:;;Ernakulam;Kerala;;India
NOTE:Agentic AI Specialist & Software Developer - DoctorAssist.ai, FastAPI & Data Science @ Universität Trier
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
    toast.success(language === 'de' ? 'vCard heruntergeladen!' : 'vCard downloaded! Open to add Richard directly to contacts.');
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
    toast.success(language === 'de' ? 'Interaktive Karte (.html) mit klickbaren Links heruntergeladen!' : 'Interactive digital card (.html) downloaded with live clickable links!');
  };

  const copyDetails = () => {
    navigator.clipboard.writeText(
      `Richard Biju Melath\nAgentic AI Specialist & Software Developer\nM.Sc. Data Science @ Universität Trier\nEmail: ${primaryEmail}\nPhone: ${primaryPhone}\nWhatsApp: ${whatsappUrl}\nPortfolio: ${portfolioUrl}\nGitHub: ${githubUrl}\nLinkedIn: ${linkedinUrl}`
    );
    setCopied(true);
    toast.success(language === 'de' ? 'Kontaktdaten in die Zwischenablage kopiert!' : 'Contact info copied to clipboard!');
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
      toast.success(language === 'de' ? 'Karten-Link kopiert!' : 'Card link copied to clipboard!');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] p-0 bg-transparent border-none overflow-hidden [&>button]:hidden shadow-none">
        <div className="relative p-2 sm:p-6 flex flex-col items-center font-mono">
          
          {/* Custom Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 rounded-lg bg-white/10 hover:bg-white hover:text-black text-white border border-white/20 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>

          {/* 3D Interactive Card Wrapper */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              perspective: '1200px',
            }}
            className="w-full max-w-xl py-4"
          >
            <motion.div
              animate={{
                rotateX: tilt.x,
                rotateY: tilt.y,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative rounded-2xl bg-black border border-white/20 p-5 sm:p-8 shadow-[0_0_60px_rgba(255,255,255,0.08)] overflow-hidden tech-bracket"
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.04] via-transparent to-white/[0.02] pointer-events-none" />

              {/* Card Top */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-7 rounded bg-neutral-800 border border-white/30 p-0.5 flex items-center justify-center">
                    <div className="w-full h-full rounded border border-white/20 grid grid-cols-2 grid-rows-2 gap-0.5 p-0.5 bg-neutral-900" />
                  </div>
                  <Wifi size={16} className="rotate-90 text-neutral-500" />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-white font-bold px-2 py-0.5 rounded-full bg-white/10 border border-white/20">
                    DIGITAL VISITING CARD
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                <div className="md:col-span-7 space-y-3">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      Richard Biju Melath
                    </h2>
                    <p className="text-xs text-neutral-300 font-medium mt-0.5">
                      Agentic AI Specialist & Software Developer
                    </p>
                    <p className="text-[11px] text-neutral-500 mt-0.5">
                      DoctorAssist.ai • M.Sc. Data Science @ Trier
                    </p>
                  </div>

                  {/* Direct Clickable Contact Links */}
                  <div className="space-y-2 pt-1 text-xs text-neutral-300">
                    <a
                      href={`mailto:${primaryEmail}`}
                      className="flex items-center gap-2 hover:text-white transition-colors group cursor-pointer"
                      title="Send email"
                    >
                      <Mail size={13} className="text-neutral-400 group-hover:text-white shrink-0" />
                      <span className="truncate underline-offset-2 group-hover:underline text-[11px]">{primaryEmail}</span>
                    </a>

                    <a
                      href={`tel:${primaryPhone}`}
                      className="flex items-center gap-2 hover:text-white transition-colors group cursor-pointer"
                      title="Call phone"
                    >
                      <Phone size={13} className="text-neutral-400 group-hover:text-white shrink-0" />
                      <span className="underline-offset-2 group-hover:underline text-[11px]">+91 9544211720</span>
                    </a>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-white transition-colors group cursor-pointer"
                      title="Chat on WhatsApp"
                    >
                      <MessageCircle size={13} className="text-neutral-400 group-hover:text-white shrink-0" />
                      <span className="underline-offset-2 group-hover:underline text-[11px]">Chat on WhatsApp</span>
                    </a>

                    <div className="flex items-center gap-2 text-neutral-400">
                      <MapPin size={13} className="text-neutral-500 shrink-0" />
                      <span className="text-[11px]">Trier, Germany / Ernakulam, India</span>
                    </div>

                    <a
                      href={portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-white transition-colors group cursor-pointer"
                      title="Visit Portfolio"
                    >
                      <Globe size={13} className="text-neutral-400 group-hover:text-white shrink-0" />
                      <span className="text-white underline underline-offset-2 text-[11px]">richardbmelath.vercel.app</span>
                    </a>
                  </div>
                </div>

                {/* QR Code Section: Redirects directly to the domain visiting card /card */}
                <div className="md:col-span-5 flex flex-col items-center justify-center p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <div className="p-2.5 bg-white rounded-lg shadow-md">
                    <QRCodeCanvas
                      value={cardUrl}
                      size={110}
                      bgColor="#ffffff"
                      fgColor="#000000"
                      level="M"
                      className="rounded"
                    />
                  </div>
                  <span className="text-[9px] text-white font-semibold mt-2.5 uppercase tracking-wider">
                    Scan for Digital Card
                  </span>
                  <span className="text-[8px] text-neutral-400 mt-0.5 line-clamp-1">
                    Redirects to {cardUrl.replace('https://', '')}
                  </span>
                </div>
              </div>

              {/* Action Buttons: Download options with clickable links */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  {/* Download HTML with clickable links */}
                  <button
                    onClick={downloadHtmlCard}
                    className="h-8 px-3 rounded-lg bg-white text-black font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-neutral-200 transition-colors cursor-pointer"
                    title="Download interactive HTML card with live links"
                  >
                    <FileCode size={12} />
                    <span>Download (.html)</span>
                  </button>

                  {/* Save vCard */}
                  <button
                    onClick={downloadVCard}
                    className="h-8 px-2.5 rounded-lg border border-white/20 bg-white/5 text-white text-xs hover:bg-white/10 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    title="Save contact directly to phone"
                  >
                    <Download size={12} />
                    <span>.vcf</span>
                  </button>

                  {/* Copy Details */}
                  <button
                    onClick={copyDetails}
                    className="h-8 px-2.5 rounded-lg border border-white/20 bg-white/5 text-white text-xs hover:bg-white/10 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    title="Copy details"
                  >
                    {copied ? <Check size={12} className="text-white" /> : <Copy size={12} />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 justify-end">
                  {/* Link to Standalone /card Route */}
                  <a
                    href="/card"
                    className="h-8 px-2.5 rounded-lg border border-white/20 bg-white/5 hover:bg-white hover:text-black text-white text-xs flex items-center gap-1 transition-colors cursor-pointer"
                    title="Open full page card"
                  >
                    <ExternalLink size={12} />
                    <span>/card</span>
                  </a>

                  <button
                    onClick={handleShare}
                    className="h-8 px-2.5 rounded-lg border border-white/15 hover:bg-white/10 text-white text-xs flex items-center gap-1 transition-colors cursor-pointer"
                    title="Share link"
                  >
                    <Share2 size={12} />
                  </button>

                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white hover:text-black text-neutral-300 transition-colors"
                    title="LinkedIn"
                  >
                    <Linkedin size={13} />
                  </a>

                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white hover:text-black text-neutral-300 transition-colors"
                    title="GitHub"
                  >
                    <Github size={13} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
