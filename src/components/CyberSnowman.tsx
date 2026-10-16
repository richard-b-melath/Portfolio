import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Heart } from 'lucide-react';
import { useEnvironment } from '@/context/EnvironmentContext';

interface CyberSnowmanProps {
  className?: string;
}

export const CyberSnowman: React.FC<CyberSnowmanProps> = ({ className }) => {
  const { showSnowman, setShowSnowman } = useEnvironment();
  const [isWiggling, setIsWiggling] = useState(false);
  const [speechText, setSpeechText] = useState("Hello! I'm Snow-AI 2.0! Stay warm out there! ❄️");
  const [clickCount, setClickCount] = useState(0);

  if (!showSnowman) return null;

  const handleInteraction = () => {
    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 600);

    const quotes = [
      "Brrr! Data Science at Trier University is cool! ❄️",
      "Agentic AI & LLMs deployed! 🤖",
      "Have you checked out DoctorAssist.ai? Clinical AI in action! 🩺",
      "Snowing in Trier, Germany! 🇩🇪",
      "Try typing 'merry christmas' in the CLI for decorations! 🎄",
      "Beep Boop! Sending cryptographic warmth! ❤️",
    ];

    setSpeechText(quotes[clickCount % quotes.length]);
    setClickCount((prev) => prev + 1);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.6, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: 30 }}
        transition={{ type: 'spring', damping: 15, stiffness: 200 }}
        className={className || "absolute bottom-8 right-6 sm:bottom-12 sm:right-12 z-30 font-mono"}
      >
        <div className="relative group">
          {/* Dismiss button */}
          <button
            onClick={() => setShowSnowman(false)}
            className="absolute -top-2 -right-2 z-50 w-5 h-5 rounded-full bg-neutral-900 border border-white/20 text-neutral-400 hover:text-white flex items-center justify-center text-[10px] cursor-pointer shadow-lg hover:scale-110 transition-transform"
            title="Dismiss Snowman"
          >
            <X size={10} />
          </button>

          {/* Interactive Speech Bubble */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            key={speechText}
            className="absolute -top-16 -left-20 w-52 p-2.5 rounded-xl bg-neutral-900/95 border border-white/20 backdrop-blur-md shadow-2xl text-[10px] text-neutral-200 pointer-events-none"
          >
            <div className="flex items-center gap-1 text-[9px] text-neutral-400 font-bold uppercase tracking-wider mb-0.5">
              <Sparkles size={9} className="text-cyan-400" />
              <span>SNOW-AI // v2.0</span>
            </div>
            <p className="leading-tight font-sans text-white">{speechText}</p>
            {/* Arrow tail */}
            <div className="absolute -bottom-1.5 right-12 w-3 h-3 bg-neutral-900 border-r border-b border-white/20 rotate-45" />
          </motion.div>

          {/* Snowman Figure */}
          <motion.div
            onClick={handleInteraction}
            animate={
              isWiggling
                ? { rotate: [0, -8, 8, -6, 6, 0], y: [0, -6, 0] }
                : { y: [0, -2, 0] }
            }
            transition={
              isWiggling
                ? { duration: 0.5 }
                : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
            }
            className="cursor-pointer flex flex-col items-center select-none"
            title="Click to interact with Snowman!"
          >
            {/* Top Hat */}
            <div className="flex flex-col items-center relative -mb-1 z-20">
              <div className="w-8 h-7 bg-neutral-900 border border-white/20 rounded-t-md relative flex items-center justify-center">
                {/* Cyber LED Hatband */}
                <div className="absolute bottom-1 w-full h-1.5 bg-gradient-to-r from-cyan-500 via-white to-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                <span className="text-[7px] font-bold text-white tracking-widest">AI</span>
              </div>
              <div className="w-14 h-1.5 bg-neutral-800 border border-white/20 rounded-full -mt-0.5" />
            </div>

            {/* Head Sphere */}
            <div className="w-12 h-11 rounded-full bg-gradient-to-b from-white via-neutral-100 to-neutral-200 border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.4)] relative flex items-center justify-center z-10">
              {/* Glowing Digital Eyes */}
              <div className="flex gap-2.5 -mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.9)] animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.9)] animate-pulse" />
              </div>

              {/* Glowing Carrot Sensor */}
              <div className="absolute top-[52%] left-1/2 -translate-x-1/2 w-3.5 h-1.5 bg-orange-500 rounded-r-full shadow-[0_0_6px_rgba(249,115,22,0.8)] rotate-6" />

              {/* Digital Dot Smile */}
              <div className="absolute bottom-1.5 flex gap-1">
                <span className="w-0.5 h-0.5 rounded-full bg-neutral-700" />
                <span className="w-0.5 h-0.5 rounded-full bg-neutral-700" />
                <span className="w-0.5 h-0.5 rounded-full bg-neutral-700" />
              </div>
            </div>

            {/* Cyber Scarf */}
            <div className="w-14 h-3 bg-neutral-900 border border-white/30 rounded-md relative -my-1 z-20 flex items-center justify-between px-1.5 shadow-md">
              <span className="w-1 h-1 rounded-full bg-cyan-400" />
              <span className="text-[7px] text-white tracking-widest font-mono">TRIER</span>
              <span className="w-1 h-1 rounded-full bg-cyan-400" />
            </div>

            {/* Middle Sphere with Buttons */}
            <div className="w-16 h-14 rounded-full bg-gradient-to-b from-white via-neutral-100 to-neutral-200 border border-white/25 shadow-lg relative flex flex-col items-center justify-center z-0">
              {/* LED Cyber Buttons */}
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 border border-white/40 my-0.5" />
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 border border-white/40 my-0.5" />

              {/* Stick Arms */}
              <div className="absolute -left-4 top-4 w-5 h-0.5 bg-amber-800/80 -rotate-25 rounded-full" />
              <div className="absolute -right-4 top-4 w-5 h-0.5 bg-amber-800/80 rotate-25 rounded-full" />
            </div>

            {/* Bottom Sphere */}
            <div className="w-20 h-16 rounded-full bg-gradient-to-b from-white via-neutral-100 to-neutral-200 border border-white/20 shadow-2xl relative flex items-center justify-center -mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 border border-white/40" />

              {/* Ground Snow Shadow */}
              <div className="absolute -bottom-1.5 w-16 h-2 rounded-full bg-white/20 blur-sm pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
