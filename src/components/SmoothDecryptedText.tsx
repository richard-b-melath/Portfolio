import React, { useEffect, useState, useRef, useCallback } from 'react';

interface SmoothDecryptedTextProps {
  text: string;
  className?: string;
  initialDelay?: number;
  duration?: number;
  scrambleSpeed?: number;
  hoverTrigger?: boolean;
}

// Curated high-tech glyphs for authentic sci-fi cryptographic feel
const GLYPHS = '01Ξ∇λδΩΨ01X_<>[]*!$+/ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const SmoothDecryptedText: React.FC<SmoothDecryptedTextProps> = ({
  text,
  className = '',
  initialDelay = 150,
  duration = 900,
  hoverTrigger = true,
}) => {
  // Array of characters and their state
  const [charsState, setCharsState] = useState<{ char: string; resolved: boolean }[]>(() =>
    text.split('').map((c) => ({ char: c, resolved: true }))
  );

  const isAnimatingRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const startDecryption = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }

    const textLength = text.length;
    if (textLength === 0) return;

    // Per-character timeline
    const totalDuration = duration;
    // Stagger window: character i starts between 0 and staggerWindow
    const staggerWindow = totalDuration * 0.65;
    const charDuration = totalDuration - staggerWindow;

    const charTimelines = text.split('').map((char, index) => {
      if (char === ' ') {
        return { start: 0, end: 0, targetChar: ' ', isSpace: true };
      }
      const start = (index / Math.max(textLength - 1, 1)) * staggerWindow;
      const end = start + charDuration;
      return { start, end, targetChar: char, isSpace: false };
    });

    isAnimatingRef.current = true;
    startTimeRef.current = performance.now();

    // Frame throttle for switching random glyphs smoothly
    let lastGlyphCycle = 0;
    const currentGlyphs = new Array(textLength).fill('');

    const tick = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(elapsed / totalDuration, 1);

      // Cycle random glyphs every ~45ms for buttery, non-jarring visuals
      const shouldCycleGlyphs = now - lastGlyphCycle > 45;
      if (shouldCycleGlyphs) {
        lastGlyphCycle = now;
      }

      let allDone = true;

      const nextState = charTimelines.map((tl, index) => {
        if (tl.isSpace) {
          return { char: ' ', resolved: true };
        }

        if (elapsed >= tl.end) {
          return { char: tl.targetChar, resolved: true };
        }

        allDone = false;

        if (elapsed < tl.start) {
          // Hasn't started resolving yet, keep cycling smoothly or show previous
          if (shouldCycleGlyphs || !currentGlyphs[index]) {
            currentGlyphs[index] = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
          return { char: currentGlyphs[index], resolved: false };
        }

        // Mid-decryption: easing deceleration
        const charProgress = (elapsed - tl.start) / (tl.end - tl.start);
        
        // As it approaches 1.0, slow down random changes for a smooth lock-in feel
        const switchProbability = 1 - Math.pow(charProgress, 2);
        if (shouldCycleGlyphs && Math.random() < Math.max(switchProbability, 0.25)) {
          currentGlyphs[index] = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }

        return {
          char: currentGlyphs[index] || tl.targetChar,
          resolved: false,
        };
      });

      setCharsState(nextState);

      if (!allDone && progress < 1) {
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        // Complete lock
        setCharsState(text.split('').map((c) => ({ char: c, resolved: true })));
        isAnimatingRef.current = false;
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);
  }, [text, duration]);

  useEffect(() => {
    const timer = setTimeout(() => {
      startDecryption();
    }, initialDelay);

    return () => {
      clearTimeout(timer);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [startDecryption, initialDelay]);

  const handleMouseEnter = () => {
    if (hoverTrigger) {
      startDecryption();
    }
  };

  // Group characters into words so words never break mid-word across lines
  const words: { wordIdx: number; chars: { char: string; resolved: boolean; globalIdx: number }[] }[] = [];
  let currentWord: { char: string; resolved: boolean; globalIdx: number }[] = [];
  let wordCounter = 0;

  charsState.forEach((item, globalIdx) => {
    if (item.char === ' ') {
      if (currentWord.length > 0) {
        words.push({ wordIdx: wordCounter++, chars: currentWord });
        currentWord = [];
      }
    } else {
      currentWord.push({ ...item, globalIdx });
    }
  });

  if (currentWord.length > 0) {
    words.push({ wordIdx: wordCounter++, chars: currentWord });
  }

  return (
    <span
      onMouseEnter={handleMouseEnter}
      className={`inline-flex flex-wrap items-center justify-center gap-x-[0.32em] gap-y-1 select-none cursor-default font-mono ${className}`}
      title={hoverTrigger ? 'Hover to decode' : undefined}
    >
      {words.map((w) => (
        <span key={w.wordIdx} className="inline-block whitespace-nowrap">
          {w.chars.map((item) => (
            <span
              key={item.globalIdx}
              className={`inline-block transition-all duration-75 ${
                item.resolved
                  ? 'text-white font-black'
                  : 'text-neutral-400 font-semibold opacity-90 scale-[1.03]'
              }`}
              style={
                !item.resolved
                  ? {
                      textShadow: '0 0 8px rgba(255, 255, 255, 0.45)',
                    }
                  : undefined
              }
            >
              {item.char}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
};
