import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Gift } from 'lucide-react';
import { useEnvironment } from '@/context/EnvironmentContext';

export const ChristmasDecorations: React.FC = () => {
  const { showChristmas, setShowChristmas } = useEnvironment();

  if (!showChristmas) return null;

  // LED bulb colors
  const ledColors = [
    'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.9)]',
    'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]',
    'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.9)]',
    'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]',
    'bg-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.9)]',
  ];

  return (
    <AnimatePresence>
      <div className="pointer-events-none z-30 select-none">
        {/* 1. Hanging Cyber LED Garland at Top of Viewport */}
        <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 pointer-events-none">
          {Array.from({ length: 24 }).map((_, i) => {
            const color = ledColors[i % ledColors.length];
            return (
              <div key={i} className="flex flex-col items-center">
                {/* Thin hanging wire */}
                <div
                  className="w-[1px] bg-white/30"
                  style={{ height: `${(Math.sin(i * 0.5) * 8 + 12)}px` }}
                />
                {/* Twinkling LED bulb */}
                <motion.div
                  animate={{
                    opacity: [0.4, 1, 0.4],
                    scale: [0.85, 1.15, 0.85],
                  }}
                  transition={{
                    duration: 1.2 + (i % 5) * 0.25,
                    repeat: Infinity,
                    delay: (i % 7) * 0.18,
                  }}
                  className={`w-2 h-2.5 rounded-full ${color}`}
                />
              </div>
            );
          })}
        </div>

        {/* 2. Floating Festive Holiday Telemetry Badge (Top Right) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 right-6 z-40 pointer-events-auto"
        >
          <div className="glass-card px-3.5 py-1.5 rounded-full border border-red-500/30 bg-neutral-950/90 text-[10px] font-mono flex items-center gap-2 shadow-2xl backdrop-blur-xl">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-white font-bold tracking-wider">
              🎄 MERRY CHRISTMAS 2026
            </span>
            <button
              onClick={() => setShowChristmas(false)}
              className="ml-1 p-0.5 rounded-full text-neutral-400 hover:text-white cursor-pointer"
              title="Close Christmas decorations"
            >
              <X size={11} />
            </button>
          </div>
        </motion.div>

        {/* 3. Origami Cyber Tree (Bottom Left) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          className="fixed bottom-6 left-6 z-30 pointer-events-auto hidden md:block"
        >
          <div className="relative group p-2 flex flex-col items-center">
            {/* Twinkling Star on Top */}
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ rotate: { duration: 12, repeat: Infinity, ease: 'linear' }, scale: { duration: 2, repeat: Infinity } }}
              className="text-amber-300 drop-shadow-[0_0_10px_rgba(252,211,77,0.9)] -mb-1 z-10"
            >
              <Sparkles size={16} />
            </motion.div>

            {/* Tree Triangles */}
            <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-b-[20px] border-b-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)] -mb-2" />
            <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[26px] border-b-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)] -mb-2" />
            <div className="w-0 h-0 border-l-[26px] border-l-transparent border-r-[26px] border-r-transparent border-b-[32px] border-b-emerald-600 drop-shadow-[0_0_12px_rgba(5,150,105,0.5)]" />

            {/* Tree Trunk */}
            <div className="w-3.5 h-3.5 bg-amber-900 border border-white/20 rounded-b-sm" />

            {/* Gift Box under Tree */}
            <div className="absolute -bottom-1 -right-2 flex items-center justify-center w-5 h-5 rounded bg-red-600 border border-white/30 shadow-[0_0_8px_rgba(220,38,38,0.8)]">
              <Gift size={11} className="text-white" />
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
