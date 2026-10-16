import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Crosshair, Clock } from 'lucide-react';

interface FuturisticHudProps {
  onOpenTerminal: () => void;
  scrollProgress: number;
}

export const FuturisticHud = ({ onOpenTerminal, scrollProgress }: FuturisticHudProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [utcTime, setUtcTime] = useState('');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(
        now.toISOString().substring(11, 19) + ' UTC'
      );
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
          className="h-full bg-gradient-to-r from-white/70 via-white to-white/70 shadow-[0_0_12px_rgba(255,255,255,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Dynamic Cursor Ambient Spotlight Aura */}
      <div
        className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.03), transparent 70%)`,
        }}
      />

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
              X:{String(mousePos.x).padStart(4, '0')} Y:{String(mousePos.y).padStart(4, '0')}
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
