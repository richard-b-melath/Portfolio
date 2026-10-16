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

import { SmoothDecryptedText } from './SmoothDecryptedText';
import { CyberSnowman } from './CyberSnowman';

// --- ENHANCED DYNAMIC QUANTUM CONSTELLATION CANVAS ---
const InteractiveHeroCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: -2000, y: -2000, prevX: -2000, prevY: -2000, speed: 0, isHovering: false });
  const ringsRef = useRef<{ x: number; y: number; r: number; maxR: number; alpha: number }[]>([]);
  const sparksRef = useRef<{ x: number; y: number; vx: number; vy: number; alpha: number; life: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const setupCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    setupCanvasSize();
    window.addEventListener('resize', setupCanvasSize);

    let lastRingTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      const dx = currentX - mousePos.current.x;
      const dy = currentY - mousePos.current.y;
      const speed = Math.hypot(dx, dy);

      mousePos.current.prevX = mousePos.current.x;
      mousePos.current.prevY = mousePos.current.y;
      mousePos.current.x = currentX;
      mousePos.current.y = currentY;
      mousePos.current.speed = speed;
      mousePos.current.isHovering = true;

      // Spawn expanding sonar ripple if mouse is moving briskly
      const now = performance.now();
      if (speed > 4 && now - lastRingTime > 180) {
        lastRingTime = now;
        if (ringsRef.current.length < 8) {
          ringsRef.current.push({
            x: currentX,
            y: currentY,
            r: 8,
            maxR: Math.min(180, speed * 12 + 60),
            alpha: 0.35,
          });
        }
      }

      // Spawn subtle velocity spark particles
      if (speed > 3 && sparksRef.current.length < 35) {
        sparksRef.current.push({
          x: currentX + (Math.random() - 0.5) * 8,
          y: currentY + (Math.random() - 0.5) * 8,
          vx: -dx * 0.15 + (Math.random() - 0.5) * 0.8,
          vy: -dy * 0.15 + (Math.random() - 0.5) * 0.8,
          alpha: 0.7,
          life: 1.0,
        });
      }
    };

    const handleMouseLeave = () => {
      mousePos.current.isHovering = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Particle nodes setup
    const particleCount = Math.min(Math.floor((width * height) / 16000), 55);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.4 + 0.8,
      baseAlpha: Math.random() * 0.3 + 0.18,
      pulse: Math.random() * Math.PI * 2,
    }));

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const mx = mousePos.current.x;
      const my = mousePos.current.y;
      const hasMouse = mousePos.current.isHovering;

      // 1. Draw Expanding Sonar Wave Rings
      for (let r = ringsRef.current.length - 1; r >= 0; r--) {
        const ring = ringsRef.current[r];
        ring.r += 1.8;
        ring.alpha *= 0.965;

        if (ring.r >= ring.maxR || ring.alpha < 0.01) {
          ringsRef.current.splice(r, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${ring.alpha * 0.25})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 2. Draw Velocity Kinetic Sparks
      for (let s = sparksRef.current.length - 1; s >= 0; s--) {
        const spark = sparksRef.current[s];
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.vx *= 0.94;
        spark.vy *= 0.94;
        spark.life -= 0.035;

        if (spark.life <= 0) {
          sparksRef.current.splice(s, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(spark.x, spark.y, 1.2 * spark.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${spark.alpha * spark.life})`;
        ctx.fill();
      }

      // 3. Update & Draw Constellation Nodes with Gravitational Physics
      const distancesToMouse: { index: number; dist: number }[] = [];

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.pulse += 0.02;

        p1.x += p1.vx;
        p1.y += p1.vy;

        // Bounce gently / wrap bounds
        if (p1.x < 0) p1.x = width;
        if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        if (p1.y > height) p1.y = 0;

        // Smooth Magnetic Gravitational Swirl
        if (hasMouse) {
          const mdx = mx - p1.x;
          const mdy = my - p1.y;
          const mDist = Math.hypot(mdx, mdy);
          distancesToMouse.push({ index: i, dist: mDist });

          if (mDist < 200) {
            const force = Math.pow((200 - mDist) / 200, 1.3);
            const angle = Math.atan2(mdy, mdx);
            // Swirl + subtle attraction
            p1.vx += (Math.cos(angle + Math.PI / 2) * 0.35 - Math.cos(angle) * 0.2) * force * 0.4;
            p1.vy += (Math.sin(angle + Math.PI / 2) * 0.35 - Math.sin(angle) * 0.2) * force * 0.4;
            p1.vx *= 0.97;
            p1.vy *= 0.97;
          }
        }

        // Inter-particle network lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 125) {
            const alpha = (1 - dist / 125) * 0.16;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.55;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Node circle with subtle breathing pulse
        const pulseAlpha = p1.baseAlpha + Math.sin(p1.pulse) * 0.08;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.08, pulseAlpha)})`;
        ctx.fill();
      }

      // 4. Laser Vector Tethers to Cursor
      if (hasMouse && distancesToMouse.length > 0) {
        distancesToMouse.sort((a, b) => a.dist - b.dist);
        const closestCount = Math.min(4, distancesToMouse.length);

        for (let k = 0; k < closestCount; k++) {
          const item = distancesToMouse[k];
          if (item.dist < 220) {
            const p = particles[item.index];
            const tetherAlpha = (1 - item.dist / 220) * 0.32;

            const grad = ctx.createLinearGradient(mx, my, p.x, p.y);
            grad.addColorStop(0, `rgba(255, 255, 255, ${tetherAlpha * 1.2})`);
            grad.addColorStop(1, `rgba(255, 255, 255, ${tetherAlpha * 0.3})`);

            ctx.beginPath();
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.8;
            ctx.moveTo(mx, my);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();

            // Traveling energy spark along the tether
            const sparkOffset = ((time * 0.0015 + k * 0.25) % 1);
            const sparkX = mx + (p.x - mx) * sparkOffset;
            const sparkY = my + (p.y - my) * sparkOffset;

            ctx.beginPath();
            ctx.arc(sparkX, sparkY, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${tetherAlpha * 1.5})`;
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', setupCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
    />
  );
};

export const HeroSection = ({ onOpenTerminal }: { onOpenTerminal?: () => void } = {}) => {
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

      {/* Cryogenic Snowman companion in Hero Section */}
      <CyberSnowman />

      {/* MAIN VIEWPORT HERO: Spacious, focused, non-congested */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-24 pb-16 max-w-5xl mx-auto">

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
          className="space-y-4 w-full"
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white font-mono leading-tight">
            <SmoothDecryptedText text="RICHARD BIJU MELATH" duration={950} initialDelay={100} />
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
