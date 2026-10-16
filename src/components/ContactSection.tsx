import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Github, 
  Linkedin, 
  Twitter, 
  Copy, 
  Check, 
  Clock, 
  ShieldCheck, 
  Terminal
} from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';

export const ContactSection = () => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const primaryEmail = 'richardbijumelath48@gmail.com';

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(true);
    toast.success('Email copied to clipboard!');
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, subject, message } = formData;
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const form = document.createElement('form');
      form.action =
        'https://docs.google.com/forms/d/e/1FAIpQLScMPWtn-nu7UfGdIu6Vx1_GYO-Loqj760R8x9vheNScdjdQKA/formResponse';
      form.method = 'POST';
      form.target = 'hidden_iframe';

      const entries = {
        'entry.1146036371': name,
        'entry.1086438456': email,
        'entry.1442822591': subject || 'General Portfolio Inquiry',
        'entry.1452443315': message,
      };

      Object.entries(entries).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);

      setTimeout(() => {
        setIsSubmitting(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
        toast.success('Message transmitted successfully. Will respond promptly.');
      }, 1200);
    } catch (err) {
      setIsSubmitting(false);
      toast.error(`Submission error. Please email directly at ${primaryEmail}`);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 relative bg-black font-mono">
      <div className="container mx-auto max-w-5xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/15 text-white text-xs font-medium mb-3">
            <Terminal size={12} />
            <span>{t('contact.tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
            {t('contact.title1')} <span className="text-neutral-400">{t('contact.title2')}</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400 leading-relaxed font-sans">
            {t('contact.desc')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
          {/* Left Column: Direct Info (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-4"
          >
            {/* Direct Contact Card */}
            <div className="glass-card p-5 sm:p-6 rounded-xl border border-white/10 tech-bracket space-y-3">
              <div>
                <h3 className="text-base font-bold text-white">
                  Richard Biju Melath
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  AI & Software Developer • Data Science
                </p>
              </div>

              {/* Email */}
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/10 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-[9px] uppercase text-neutral-500">Email</div>
                  <a
                    href={`mailto:${primaryEmail}`}
                    className="text-xs font-semibold text-white hover:underline truncate block"
                  >
                    {primaryEmail}
                  </a>
                </div>
                <button
                  onClick={() => copyToClipboard(primaryEmail)}
                  className="p-1.5 rounded-md bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors shrink-0 cursor-pointer"
                  title="Copy email"
                >
                  {copiedEmail ? <Check size={12} className="text-white" /> : <Copy size={12} />}
                </button>
              </div>

              {/* Phone */}
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[9px] uppercase text-neutral-500">Mobile & WhatsApp</div>
                  <a
                    href="tel:+919544211720"
                    className="text-xs font-semibold text-white hover:underline"
                  >
                    +91 9544211720
                  </a>
                </div>
                <span className="text-[10px] text-neutral-500 px-1.5 py-0.5 rounded bg-white/[0.04]">
                  IST
                </span>
              </div>

              {/* Location & Time */}
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/10 space-y-1">
                <div className="text-[9px] uppercase text-neutral-500">Location</div>
                <div className="text-xs text-white font-sans">
                  Ernakulam / Angamaly, Kerala, India
                </div>
                <div className="text-[10px] text-neutral-400 pt-1 flex items-center gap-1">
                  <Clock size={11} />
                  <span>Local IST: {currentTime || 'Loading...'}</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-card p-3.5 rounded-xl border border-white/10 flex items-center justify-between text-xs">
              <span className="text-neutral-500">Social Profiles:</span>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/richard-b-melath"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-md bg-white/5 hover:bg-white hover:text-black text-neutral-300 transition-colors"
                  title="GitHub"
                >
                  <Github size={14} />
                </a>
                <a
                  href="https://www.linkedin.com/in/richardbmelath/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-md bg-white/5 hover:bg-white hover:text-black text-neutral-300 transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin size={14} />
                </a>
                <a
                  href={`mailto:${primaryEmail}`}
                  className="p-1.5 rounded-md bg-white/5 hover:bg-white hover:text-black text-neutral-300 transition-colors"
                  title="Direct Mail"
                >
                  <Mail size={14} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Transmission Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="glass-card p-5 sm:p-6 rounded-xl border border-white/10 tech-bracket relative">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">{t('contact.form.title')}</h3>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    {t('contact.form.sub')}
                  </p>
                </div>
                <div className="w-7 h-7 rounded-md bg-white/[0.08] flex items-center justify-center text-white">
                  <Send size={13} />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase text-neutral-400 mb-1">
                      {t('contact.form.name')}
                    </label>
                    <input
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      className="w-full bg-neutral-950 border border-white/10 focus:border-white rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-neutral-400 mb-1">
                      {t('contact.form.email')}
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@domain.com"
                      className="w-full bg-neutral-950 border border-white/10 focus:border-white rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-neutral-400 mb-1">
                    {t('contact.form.subject')}
                  </label>
                  <input
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="e.g. Software Role / AI Consulting / Research"
                    className="w-full bg-neutral-950 border border-white/10 focus:border-white rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-neutral-400 mb-1">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Provide details about your project, team, or opportunity..."
                    className="w-full bg-neutral-950 border border-white/10 focus:border-white rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none transition-colors resize-none font-sans"
                  />
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-10 rounded-lg btn-future-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                          <Send size={13} />
                        </motion.div>
                        <span>{t('contact.form.submitting')}</span>
                      </>
                    ) : (
                      <>
                        <Send size={13} />
                        <span>{t('contact.form.submit')}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-4 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] text-neutral-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={11} className="text-white" />
                  Direct Encrypted Delivery
                </span>
                <span>Response Target: &lt; 24h</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <iframe name="hidden_iframe" style={{ display: 'none' }} title="hidden_submission_frame" />
    </section>
  );
};
