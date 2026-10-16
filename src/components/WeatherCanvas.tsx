import { useEffect, useRef } from 'react';
import { useEnvironment, WeatherType } from '@/context/EnvironmentContext';

export const WeatherCanvas = ({ className }: { className?: string } = {}) => {
  const { weather } = useEnvironment();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: -2000, y: -2000, vx: 0, vy: 0, isHovering: false });
  const splashesRef = useRef<{ x: number; y: number; vx: number; vy: number; alpha: number; r: number }[]>([]);

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

    let prevMouseX = -2000;
    let prevMouseY = -2000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      mousePos.current.vx = currentX - prevMouseX;
      mousePos.current.vy = currentY - prevMouseY;
      mousePos.current.x = currentX;
      mousePos.current.y = currentY;
      mousePos.current.isHovering = true;

      prevMouseX = currentX;
      prevMouseY = currentY;
    };

    const handleMouseLeave = () => {
      mousePos.current.isHovering = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // 1. SNOW PARTICLES (Winter mode)
    const snowCount = Math.min(Math.floor((width * height) / 11000), 110);
    const snowflakes = Array.from({ length: snowCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2.4 + 0.8,
      fallSpeed: Math.random() * 1.2 + 0.7,
      driftSpeed: Math.random() * 0.6 - 0.3,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.03 + 0.015,
      alpha: Math.random() * 0.65 + 0.25,
      layer: Math.random() > 0.7 ? 'front' : Math.random() > 0.4 ? 'mid' : 'back',
    }));

    // 2. RAIN PARTICLES (Rainy mode)
    const rainCount = Math.min(Math.floor((width * height) / 7000), 160);
    const raindrops = Array.from({ length: rainCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      len: Math.random() * 24 + 14,
      speed: Math.random() * 16 + 18,
      alpha: Math.random() * 0.4 + 0.2,
      thickness: Math.random() * 1.2 + 0.6,
    }));

    // 3. SUNNY DUST MOTES (Sunny mode)
    const sunMoteCount = Math.min(Math.floor((width * height) / 14000), 75);
    const sunMotes = Array.from({ length: sunMoteCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2.2 + 1.0,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4 - 0.2,
      alpha: Math.random() * 0.5 + 0.25,
      glow: Math.random() * Math.PI * 2,
    }));

    let windForce = 0;

    const render = (timestamp: number) => {
      ctx.clearRect(0, 0, width, height);

      const mx = mousePos.current.x;
      const my = mousePos.current.y;
      const hasMouse = mousePos.current.isHovering;

      // Mouse drag wind decay
      windForce *= 0.94;
      if (hasMouse) {
        windForce += (mousePos.current.vx * 0.03 - windForce) * 0.1;
      }

      // ==========================================
      // A. WINTER SNOWFALL MODE (DEFAULT)
      // ==========================================
      if (weather === 'snow' || weather === 'default') {
        for (let i = 0; i < snowflakes.length; i++) {
          const flake = snowflakes[i];
          flake.wobble += flake.wobbleSpeed;

          // Natural gentle sway + dynamic mouse wind
          const sway = Math.sin(flake.wobble) * 0.6;
          flake.x += sway + flake.driftSpeed + windForce * (flake.layer === 'front' ? 1.5 : 0.8);
          flake.y += flake.fallSpeed;

          // Interactive mouse gust deflection
          if (hasMouse) {
            const dx = mx - flake.x;
            const dy = my - flake.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 130) {
              const push = (130 - dist) / 130;
              flake.x -= (dx / dist) * push * 3.5;
              flake.y -= (dy / dist) * push * 3.5;
            }
          }

          // Screen wrap
          if (flake.y > height + 10) {
            flake.y = -10;
            flake.x = Math.random() * width;
          }
          if (flake.x < -20) flake.x = width + 20;
          if (flake.x > width + 20) flake.x = -20;

          // Draw snowflake with subtle soft glow
          ctx.beginPath();
          ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);

          if (flake.layer === 'front') {
            ctx.fillStyle = `rgba(255, 255, 255, ${flake.alpha})`;
            ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
            ctx.shadowBlur = 4;
          } else {
            ctx.fillStyle = `rgba(220, 230, 245, ${flake.alpha * 0.8})`;
            ctx.shadowBlur = 0;
          }
          ctx.fill();
        }
        ctx.shadowBlur = 0;
      }

      // ==========================================
      // B. CYBER RAIN MODE
      // ==========================================
      else if (weather === 'rain') {
        ctx.lineWidth = 1;

        for (let i = 0; i < raindrops.length; i++) {
          const drop = raindrops[i];
          drop.y += drop.speed;
          drop.x += windForce * 0.5 - 1.2; // Slight diagonal angle

          // Rain splash when hitting bottom or near mouse
          if (drop.y > height - 15) {
            if (Math.random() < 0.25 && splashesRef.current.length < 40) {
              splashesRef.current.push({
                x: drop.x,
                y: height - 6,
                vx: (Math.random() - 0.5) * 3,
                vy: -Math.random() * 2.5 - 1,
                alpha: 0.6,
                r: Math.random() * 1.2 + 0.8,
              });
            }
            drop.y = -drop.len;
            drop.x = Math.random() * width;
          }

          // Mouse umbrella deflection
          if (hasMouse) {
            const dx = mx - drop.x;
            const dy = my - drop.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 90) {
              drop.x -= (dx / dist) * 2;
            }
          }

          // Draw rain streak
          ctx.beginPath();
          ctx.strokeStyle = `rgba(220, 235, 255, ${drop.alpha})`;
          ctx.lineWidth = drop.thickness;
          ctx.moveTo(drop.x, drop.y);
          ctx.lineTo(drop.x - 1.5, drop.y + drop.len);
          ctx.stroke();
        }

        // Draw and update splashes
        for (let s = splashesRef.current.length - 1; s >= 0; s--) {
          const sp = splashesRef.current[s];
          sp.x += sp.vx;
          sp.y += sp.vy;
          sp.vy += 0.15; // Gravity
          sp.alpha *= 0.92;

          if (sp.alpha < 0.02) {
            splashesRef.current.splice(s, 1);
            continue;
          }

          ctx.beginPath();
          ctx.arc(sp.x, sp.y, sp.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200, 225, 255, ${sp.alpha})`;
          ctx.fill();
        }
      }

      // ==========================================
      // C. RADIANT SUNNY MODE
      // ==========================================
      else if (weather === 'sunny') {
        // Draw top-right subtle warm sun aura
        const sunX = width - 120;
        const sunY = 90;
        const sunGradient = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, Math.min(width * 0.7, 500));
        sunGradient.addColorStop(0, 'rgba(255, 245, 210, 0.18)');
        sunGradient.addColorStop(0.3, 'rgba(255, 230, 180, 0.08)');
        sunGradient.addColorStop(1, 'transparent');

        ctx.fillStyle = sunGradient;
        ctx.fillRect(0, 0, width, height);

        // Sun dust motes
        for (let i = 0; i < sunMotes.length; i++) {
          const mote = sunMotes[i];
          mote.glow += 0.025;
          mote.x += mote.vx;
          mote.y += mote.vy;

          if (hasMouse) {
            const dx = mx - mote.x;
            const dy = my - mote.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 120) {
              const push = (120 - dist) / 120;
              mote.x -= (dx / dist) * push * 2;
              mote.y -= (dy / dist) * push * 2;
            }
          }

          if (mote.y < -10) mote.y = height + 10;
          if (mote.y > height + 10) mote.y = -10;
          if (mote.x < -10) mote.x = width + 10;
          if (mote.x > width + 10) mote.x = -10;

          const pulseAlpha = mote.alpha + Math.sin(mote.glow) * 0.15;
          ctx.beginPath();
          ctx.arc(mote.x, mote.y, mote.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 245, 210, ${Math.max(0.1, pulseAlpha)})`;
          ctx.fill();
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
  }, [weather]);

  return (
    <canvas
      ref={canvasRef}
      className={className || "fixed inset-0 w-full h-full pointer-events-none z-[15]"}
    />
  );
};
