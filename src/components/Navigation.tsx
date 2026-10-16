import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, CreditCard, Download, Terminal, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface NavigationProps {
  onOpenBusinessCard?: () => void;
  onOpenTerminal?: () => void;
}

const navKeys = [
  { key: 'nav.home', href: '#home' },
  { key: 'nav.about', href: '#about' },
  { key: 'nav.research', href: '#featured' },
  { key: 'nav.projects', href: '#projects' },
  { key: 'nav.skills', href: '#skills' },
  { key: 'nav.experience', href: '#resume' },
  { key: 'nav.contact', href: '#contact' },
];

export const Navigation = ({ onOpenBusinessCard, onOpenTerminal }: NavigationProps) => {
  const { language, setLanguage, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // ScrollSpy logic to detect active section
      const sections = navKeys.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 py-4 pointer-events-none"
    >
      <div
        className={`w-full max-w-5xl mx-auto flex items-center justify-between px-3 sm:px-5 py-2.5 rounded-xl transition-all duration-300 pointer-events-auto ${
          isScrolled
            ? 'bg-black/90 border border-white/15 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.85)]'
            : 'bg-black/50 border border-white/10 backdrop-blur-md'
        }`}
      >
        {/* Brand Monogram */}
        <a href="#home" className="flex items-center space-x-2.5 group">
          <div className="flex items-center justify-center w-7 h-7 rounded-md bg-white text-black font-mono font-bold text-xs tracking-wider group-hover:scale-105 transition-transform">
            <span>RM</span>
          </div>
          <span className="font-mono font-bold text-xs text-white tracking-wider uppercase group-hover:text-neutral-300 transition-colors hidden sm:inline-block">
            Richard Biju Melath
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-0.5 p-1 rounded-lg bg-white/[0.03] border border-white/10">
          {navKeys.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            const label = t(item.key);
            return (
              <a
                key={item.key}
                href={item.href}
                className={`relative px-3 py-1.5 text-xs font-mono tracking-wider transition-all duration-200 rounded-md ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-white/15 rounded-md border border-white/20"
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          {/* Language Switcher: Segmented EN / DE Toggle */}
          <div className="flex items-center p-0.5 rounded-lg border border-white/15 bg-white/[0.04] font-mono text-[11px]">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded-md transition-all cursor-pointer font-semibold ${
                language === 'en'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="English (Primary)"
              aria-label="Set English"
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('de')}
              className={`px-2 py-1 rounded-md transition-all cursor-pointer font-semibold ${
                language === 'de'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Deutsch"
              aria-label="Auf Deutsch schalten"
            >
              DE
            </button>
          </div>

          {/* Digital Business Card */}
          {onOpenBusinessCard && (
            <button
              onClick={onOpenBusinessCard}
              className="hidden sm:flex items-center gap-1.5 h-8 px-3 rounded-lg border border-white/15 bg-white/[0.04] hover:bg-white/10 text-neutral-200 font-mono text-[11px] transition-all cursor-pointer"
              title={language === 'de' ? 'Digitale Visitenkarte öffnen' : 'Digital Visiting Card'}
            >
              <CreditCard size={12} className="text-white" />
              <span>{t('nav.card')}</span>
            </button>
          )}

          {/* Direct Resume Link */}
          <a
            href={language === 'de' ? '/Resume/RICHARD_CV_GER_N.pdf' : '/Resume/RICHARD_CV_ENG_N.pdf'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex"
            title={language === 'de' ? 'Lebenslauf herunterladen (PDF)' : 'Download CV (PDF)'}
          >
            <button
              className="h-8 px-3.5 rounded-lg bg-white text-black font-mono font-semibold text-[11px] uppercase tracking-wider hover:bg-neutral-200 transition-all flex items-center gap-1 cursor-pointer"
            >
              <span>{t('nav.cv')}</span>
              <Download size={11} />
            </button>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-4 right-4 bg-black/95 border border-white/15 rounded-xl p-4 shadow-2xl backdrop-blur-2xl md:hidden pointer-events-auto font-mono"
          >
            <div className="flex flex-col space-y-2">
              {/* Mobile Language Switcher */}
              <div className="flex items-center justify-between pb-2 mb-1 border-b border-white/10 text-xs">
                <span className="text-neutral-400 flex items-center gap-1.5">
                  <Globe size={13} />
                  <span>Language / Sprache</span>
                </span>
                <div className="flex items-center p-0.5 rounded-lg border border-white/15 bg-white/[0.04] text-[11px]">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-2.5 py-1 rounded-md transition-all font-semibold ${
                      language === 'en'
                        ? 'bg-white text-black'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLanguage('de')}
                    className={`px-2.5 py-1 rounded-md transition-all font-semibold ${
                      language === 'de'
                        ? 'bg-white text-black'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    DE
                  </button>
                </div>
              </div>

              {navKeys.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-3 py-2 text-xs rounded-lg transition-colors ${
                    activeSection === item.href.substring(1)
                      ? 'bg-white text-black font-semibold'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {t(item.key)}
                </a>
              ))}

              <div className="pt-2 border-t border-white/10 flex gap-2">
                {onOpenTerminal && (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenTerminal();
                    }}
                    className="flex-1 py-2 text-xs rounded-lg border border-white/20 bg-white/5 text-white flex items-center justify-center gap-1.5"
                  >
                    <Terminal size={12} />
                    <span>Terminal</span>
                  </button>
                )}
                {onOpenBusinessCard && (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenBusinessCard();
                    }}
                    className="flex-1 py-2 text-xs rounded-lg border border-white/20 bg-white/5 text-white flex items-center justify-center gap-1.5"
                  >
                    <CreditCard size={12} />
                    <span>{t('nav.card')}</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};