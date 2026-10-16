import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ChevronDown,
  Download,
  Briefcase,
  BookOpen,
  GraduationCap,
  Layers
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// --- MINIMALIST MONOCHROME PARTICLES CANVAS ---
const InteractiveHeroCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: -2000, y: -2000, isHovering: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isHovering: true,
      };
    };
    const handleMouseLeave = () => {
      mousePos.current.isHovering = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const particleCount = Math.min(Math.floor((width * height) / 22000), 40);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.3 + 0.8,
      baseAlpha: Math.random() * 0.3 + 0.15,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mx = mousePos.current.x;
      const my = mousePos.current.y;
      const hasMouse = mousePos.current.isHovering;

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0) p1.x = width;
        if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        if (p1.y > height) p1.y = 0;

        if (hasMouse) {
          const mdx = mx - p1.x;
          const mdy = my - p1.y;
          const mDist = Math.hypot(mdx, mdy);
          if (mDist < 140) {
            const force = (140 - mDist) / 140;
            p1.x -= (mdx / mDist) * force * 1.6;
            p1.y -= (mdy / mDist) * force * 1.6;

            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${force * 0.25})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mx, my);
            ctx.stroke();
          }
        }

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.14;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p1.baseAlpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-70"
    />
  );
};

// --- KINETIC TITLE SCRAMBLE ---
const KineticTitle = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = '01#_<>[]*!$+/ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const scramble = useCallback(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(() =>
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2;
    }, 25);
  }, [text]);

  useEffect(() => {
    scramble();
  }, [scramble]);

  return (
    <span
      onMouseEnter={scramble}
      className="cursor-default select-none transition-colors"
      title="Hover to decode"
    >
      {displayText}
    </span>
  );
};

export const HeroSection = () => {
  const { t, language } = useLanguage();

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const metrics = [
    {
      index: '01 //',
      value: t('metric.1.val'),
      label: t('metric.1.label'),
      desc: t('metric.1.desc'),
      icon: Briefcase,
    },
    {
      index: '02 //',
      value: t('metric.2.val'),
      label: t('metric.2.label'),
      desc: t('metric.2.desc'),
      icon: BookOpen,
    },
    {
      index: '03 //',
      value: t('metric.3.val'),
      label: t('metric.3.label'),
      desc: t('metric.3.desc'),
      icon: GraduationCap,
    },
    {
      index: '04 //',
      value: t('metric.4.val'),
      label: t('metric.4.label'),
      desc: t('metric.4.desc'),
      icon: Layers,
    },
  ];

  return (
    <section id="home" className="relative bg-black bg-grid-pattern overflow-hidden">
      {/* Background Minimalist Constellation Canvas */}
      <InteractiveHeroCanvas />

      {/* Radial Vignette */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none z-[1]" />

      {/* MAIN VIEWPORT HERO: Spacious, focused, non-congested */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-24 pb-16 max-w-4xl mx-auto">

        {/* Subtle Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border border-white/10 text-xs font-mono mb-8"
        >
          <span className="text-neutral-300 text-[11px] tracking-wider uppercase">
            {t('hero.badge')}
          </span>
        </motion.div>

        {/* Master Name Headline - Clean, Majestic Spacing */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white font-mono leading-none">
            <KineticTitle text="RICHARD BIJU MELATH" />
          </h1>
          <p className="text-xs sm:text-sm md:text-base font-mono text-neutral-400 tracking-widest uppercase flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            <span className="text-white font-semibold">{t('hero.subtitle1')}</span>
            <span className="text-neutral-600">/</span>
            <span>{t('hero.subtitle2')}</span>
          </p>
        </motion.div>

        {/* Simplistic, Impactful Bio Statement */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-sm sm:text-base md:text-lg text-neutral-400 font-normal max-w-xl mx-auto leading-relaxed font-sans"
        >
          {t('hero.bio')}
        </motion.p>

        {/* 2 Clean, Razor-Sharp Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-9 flex flex-col sm:flex-row gap-3.5 justify-center items-center w-full max-w-xs sm:max-w-none font-mono"
        >
          <button
            onClick={scrollToProjects}
            className="w-full sm:w-auto h-11 px-7 rounded-xl btn-future-white text-xs uppercase tracking-wider flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>{t('hero.btn.projects')}</span>
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href={language === 'de' ? '/Resume/RICHARD_CV_GER_N.pdf' : '/Resume/RICHARD_CV_ENG_N.pdf'}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <button
              className="w-full sm:w-auto h-11 px-6 rounded-xl btn-future-outline text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download size={13} className="text-neutral-400 group-hover:text-white transition-colors" />
              <span>{t('hero.btn.resume')}</span>
            </button>
          </a>
        </motion.div>

        {/* Subtle Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          onClick={() => {
            const el = document.getElementById('highlights');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="mt-16 group flex flex-col items-center gap-1.5 text-neutral-500 hover:text-white transition-colors cursor-pointer"
          aria-label="Scroll to Highlights"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase">{t('hero.scroll')}</span>
          <ChevronDown size={14} className="animate-bounce text-neutral-400 group-hover:text-white" />
        </motion.button>
      </div>

      {/* DEDICATED HIGHLIGHTS & STATS BAND: Placed below the initial fold with breathing room */}
      <div id="highlights" className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.label}
                className="glass-card p-5 rounded-xl text-left border border-white/10 hover:border-white/30 transition-all duration-200 group tech-bracket relative"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-neutral-500">
                    {item.index}
                  </span>
                  <div className="w-7 h-7 rounded-md bg-white/[0.06] border border-white/10 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                    <IconComponent size={14} />
                  </div>
                </div>

                <div className="text-base sm:text-lg font-bold text-white tracking-tight font-mono">
                  {item.value}
                </div>
                <div className="font-medium text-xs text-neutral-300 mt-0.5">
                  {item.label}
                </div>
                <div className="text-[10px] text-neutral-500 mt-1 line-clamp-1 font-mono">
                  {item.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
