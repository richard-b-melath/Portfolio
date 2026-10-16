import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Crosshair, Clock } from 'lucide-react';

interface FuturisticHudProps {
  onOpenTerminal: () => void;
  scrollProgress: number;
}

export const FuturisticHud = ({ onOpenTerminal, scrollProgress }: FuturisticHudProps) => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isInside, setIsInside] = useState(false);
  const [utcTime, setUtcTime] = useState('');

  // Smooth interpolated position for the trailing reticle companion
  const reticlePos = useRef({ x: -1000, y: -1000 });
  const [renderedReticle, setRenderedReticle] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    let animFrame: number;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsInside(true);
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    const handleMouseLeave = () => {
      setIsInside(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Smooth lerp for the cursor companion
    const loop = () => {
      reticlePos.current.x += (mousePos.x - reticlePos.current.x) * 0.18;
      reticlePos.current.y += (mousePos.y - reticlePos.current.y) * 0.18;
      setRenderedReticle({
        x: Math.round(reticlePos.current.x * 10) / 10,
        y: Math.round(reticlePos.current.y * 10) / 10,
      });
      animFrame = requestAnimationFrame(loop);
    };
    animFrame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animFrame);
    };
  }, [mousePos.x, mousePos.y]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toISOString().substring(11, 19) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Precision Top Scroll Indicator Line */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-white/[0.06] z-50 pointer-events-none">
        <motion.div
          className="h-full bg-gradient-to-r from-white/70 via-white to-white/70 shadow-[0_0_14px_rgba(255,255,255,0.85)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Layer 1: Wide Ambient Atmospheric Mouse Spotlight */}
      <div
        className="fixed inset-0 pointer-events-none z-20 transition-opacity duration-300"
        style={{
          opacity: isInside ? 1 : 0,
          background: `radial-gradient(850px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.04), transparent 70%)`,
        }}
      />

      {/* Layer 2: High-Tech Cyber Grid Reveal Layer (illuminates technical grid pattern under cursor) */}
      <div
        className="fixed inset-0 pointer-events-none z-20 transition-opacity duration-500"
        style={{
          opacity: isInside ? 0.85 : 0,
          backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.25) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          maskImage: `radial-gradient(320px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 0, 0, 0.85), transparent 75%)`,
          WebkitMaskImage: `radial-gradient(320px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 0, 0, 0.85), transparent 75%)`,
        }}
      />

      {/* Layer 3: Smooth Lagging Cybernetic Reticle Companion (Desktop Only) */}
      {isInside && (
        <div
          className="fixed pointer-events-none z-30 hidden lg:block transition-opacity duration-200"
          style={{
            transform: `translate3d(${renderedReticle.x - 18}px, ${renderedReticle.y - 18}px, 0)`,
          }}
        >
          <div className="w-9 h-9 relative opacity-60">
            {/* Corner brackets */}
            <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/60" />
            <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/60" />
            <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/60" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/60" />
            {/* Center micro dot */}
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-white/80" />
          </div>
        </div>
      )}

      {/* Sleek Minimalist Bottom-Left Telemetry HUD Bar (Desktop) */}
      <div className="fixed bottom-4 left-4 z-40 hidden md:flex items-center gap-2 pointer-events-auto">
        <div className="glass-card px-3 py-1.5 rounded-lg border border-white/10 text-[10px] font-mono text-neutral-400 flex items-center gap-2.5 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
            </span>
            <span className="text-white font-medium text-[9px]">ONLINE</span>
          </div>

          <span className="text-white/20">|</span>

          <div className="flex items-center gap-1 text-[9px]">
            <Crosshair size={10} className="text-white/70" />
            <span className="tracking-wider">
              X:{String(Math.max(0, Math.round(mousePos.x))).padStart(4, '0')}{' '}
              Y:{String(Math.max(0, Math.round(mousePos.y))).padStart(4, '0')}
            </span>
          </div>

          <span className="text-white/20">|</span>

          <div className="flex items-center gap-1 text-[9px]">
            <Clock size={10} className="text-white/70" />
            <span>{utcTime || '00:00:00 UTC'}</span>
          </div>

          <span className="text-white/20">|</span>

          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/[0.08] hover:bg-white text-white hover:text-black border border-white/20 transition-all font-mono font-medium text-[9px] tracking-wider cursor-pointer"
            title="Open Interactive HUD Terminal"
          >
            <Terminal size={10} />
            <span>CLI [~]</span>
          </button>
        </div>
      </div>
    </>
  );
};
