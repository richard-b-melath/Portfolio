import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { FeaturedSection } from '@/components/FeaturedSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ResumeSection } from '@/components/ResumeSection';
import { ContactSection } from '@/components/ContactSection';
import { BusinessCardModal } from '@/components/BusinessCardModal';
import { FuturisticHud } from '@/components/FuturisticHud';
import { HudTerminalModal } from '@/components/HudTerminalModal';
import { Button } from '@/components/ui/button';
import { CreditCard, ArrowUp, Github, Linkedin, Mail, Twitter, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Index = () => {
  const [isBusinessCardOpen, setIsBusinessCardOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [showFloatingActions, setShowFloatingActions] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
      setShowFloatingActions(window.scrollY > 400);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateFromTerminal = (sectionId: string) => {
    setIsTerminalOpen(false);
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black relative overflow-x-hidden">
      {/* Global Futuristic HUD Overlay (Mouse Telemetry, Top Laser Progress, Ambient Aura) */}
      <FuturisticHud
        onOpenTerminal={() => setIsTerminalOpen(true)}
        scrollProgress={scrollProgress}
      />

      {/* Top Floating Glass Navigation */}
      <Navigation
        onOpenBusinessCard={() => setIsBusinessCardOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Main Sections Content */}
      <main className="relative z-10">
        <HeroSection onOpenTerminal={() => setIsTerminalOpen(true)} />
        <AboutSection />
        <FeaturedSection />
        <ProjectsSection />
        <SkillsSection />
        <ResumeSection />
        <ContactSection />
      </main>

      {/* Floating Action Buttons Bottom Right */}
      <AnimatePresence>
        {showFloatingActions && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-2.5"
          >
            {/* Terminal Quick Button */}
            <button
              onClick={() => setIsTerminalOpen(true)}
              className="w-11 h-11 rounded-xl bg-neutral-900 border border-white/20 hover:border-white text-white flex items-center justify-center transition-all hover:scale-105 shadow-xl cursor-pointer"
              title="Interactive Terminal [~]"
            >
              <Terminal size={16} />
            </button>

            {/* Business Card Button */}
            <button
              onClick={() => setIsBusinessCardOpen(true)}
              className="w-11 h-11 rounded-xl bg-white text-black font-semibold flex items-center justify-center transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)] cursor-pointer"
              title="Digital Business Card"
            >
              <CreditCard size={16} />
            </button>

            {/* Scroll to Top with Circular Progress */}
            <button
              onClick={scrollToTop}
              className="relative w-11 h-11 rounded-xl bg-neutral-950 border border-white/15 flex items-center justify-center text-white hover:text-white transition-all hover:scale-105 shadow-lg cursor-pointer"
              title="Scroll to Top"
            >
              <svg className="absolute inset-0 w-full h-full -rotate-90 p-1 pointer-events-none">
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  className="stroke-white/10"
                  strokeWidth="2"
                  fill="none"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  className="stroke-white transition-all duration-150"
                  strokeWidth="2"
                  strokeDasharray="88"
                  strokeDashoffset={88 - (scrollProgress * 88) / 100}
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <ArrowUp size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive HUD Terminal CLI Modal */}
      <HudTerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onNavigate={handleNavigateFromTerminal}
      />

      {/* Titanium Digital Business Card Modal */}
      <BusinessCardModal
        isOpen={isBusinessCardOpen}
        onClose={() => setIsBusinessCardOpen(false)}
      />

      {/* Minimalist Futuristic Monochrome Footer */}
      <footer className="py-16 px-4 sm:px-6 border-t border-white/10 bg-black mt-16 relative z-10 font-mono">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
            {/* Brand column */}
            <div className="md:col-span-5 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-bold text-xs tracking-wider">
                  RM
                </div>
                <span className="font-bold text-base tracking-tight text-white uppercase">
                  Richard B Melath
                </span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed max-w-sm font-sans">
                AI & Software Developer specializing in production healthcare intelligence, large language model architectures, and scalable cloud backends.
              </p>
              <div className="pt-2 text-[11px] text-neutral-500">
                SYSTEM: VERIFIED // ARCHITECTURE 2026
              </div>
            </div>

            {/* Quick sitemap */}
            <div className="md:col-span-4">
              <h4 className="text-[10px] uppercase text-neutral-400 tracking-widest mb-3">
                System Sitemap
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <a href="#home" className="text-neutral-400 hover:text-white transition-colors">00 // Home</a>
                <a href="#about" className="text-neutral-400 hover:text-white transition-colors">01 // Dossier</a>
                <a href="#featured" className="text-neutral-400 hover:text-white transition-colors">02 // Milestones</a>
                <a href="#projects" className="text-neutral-400 hover:text-white transition-colors">03 // Systems</a>
                <a href="#skills" className="text-neutral-400 hover:text-white transition-colors">04 // Matrix</a>
                <a href="#resume" className="text-neutral-400 hover:text-white transition-colors">05 // Roadmap</a>
                <a href="#contact" className="text-neutral-400 hover:text-white transition-colors">06 // Connect</a>
                <button
                  onClick={() => setIsTerminalOpen(true)}
                  className="text-left text-white underline hover:text-neutral-300 transition-colors"
                >
                  CLI Terminal
                </button>
              </div>
            </div>

            {/* Social channels */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-[10px] uppercase text-neutral-400 tracking-widest mb-3">
                Transmission Links
              </h4>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/richard-b-melath"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white hover:text-black text-neutral-300 transition-colors"
                  title="GitHub"
                >
                  <Github size={15} />
                </a>
                <a
                  href="https://www.linkedin.com/in/richardbmelath/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white hover:text-black text-neutral-300 transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin size={15} />
                </a>
                <a
                  href="https://x.com/RicharBMelath"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white hover:text-black text-neutral-300 transition-colors"
                  title="X (Twitter)"
                >
                  <Twitter size={15} />
                </a>
                <a
                  href="mailto:richardbijumelath48@gmail.com"
                  className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white hover:text-black text-neutral-300 transition-colors"
                  title="Email"
                >
                  <Mail size={15} />
                </a>
              </div>
              <p className="text-[11px] text-neutral-500">
                Ernakulam / Angamaly, Kerala, India
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
            <p>
              © {new Date().getFullYear()} Richard Biju Melath. Engineered in React, TypeScript & Tailwind.
            </p>
            <p className="flex items-center gap-1.5 text-neutral-400">
              <span>MINIMALIST FUTURISTIC MONOCHROME // v2.5.0</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
