import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown, Github, Linkedin, Mail, ArrowRight } from 'lucide-react';

// --- PROFESSIONAL PARTICLE BACKGROUND ---
const ProfessionalParticleNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      baseOpacity: number;
    }> = [];

    const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
    for (let i = 0; i < Math.min(particleCount, 40); i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: 0,
        baseOpacity: Math.random() * 0.4 + 0.1,
      });
    }

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;

        const dx = mousePos.current.x - particle.x;
        const dy = mousePos.current.y - particle.y;
        const distance = Math.hypot(dx, dy);

        if (distance < 150) {
          const force = (150 - distance) / 150 * 0.0008;
          particle.vx += (dx / distance) * force;
          particle.vy += (dy / distance) * force;
          particle.opacity = Math.min(0.8, particle.baseOpacity + (150 - distance) / 150 * 0.3);
        } else {
          particle.opacity = particle.baseOpacity;
        }

        particle.vx *= 0.995;
        particle.vy *= 0.995;
      });

      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(other => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.hypot(dx, dy);

          if (distance < 120) {
            const opacity = (120 - distance) / 120 * 0.15;
            const gradient = ctx.createLinearGradient(particle.x, particle.y, other.x, other.y);
            gradient.addColorStop(0, `rgba(255,255,255,${opacity * particle.opacity})`);
            gradient.addColorStop(1, `rgba(255,255,255,${opacity * other.opacity})`);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });
      });

      particles.forEach(particle => {
        if (particle.opacity > 0.05) {
          ctx.shadowColor = 'rgba(255,255,255,0.5)';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${particle.opacity})`;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      const breathingOpacity = 0.03 + Math.sin(time * 0.01) * 0.02;
      ctx.fillStyle = `rgba(255,255,255,${breathingOpacity})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }} />
  );
};

// --- HERO SECTION ---
export const HeroSection = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        <ProfessionalParticleNetwork />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background/60 z-10" />

      <div className="relative z-20 text-center max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-2"
          >
            <p className="text-accent text-sm font-medium tracking-wider uppercase">
              Welcome to My Portfolio
            </p>
            <div className="w-12 h-px bg-accent mx-auto" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-light text-foreground tracking-tight"
          >
            Richard B Melath
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground font-light max-w-3xl mx-auto leading-relaxed"
          >
            AI & Software Developer crafting minimal, functional, and impactful solutions through clean code and thoughtful innovation.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="pt-8 space-y-6"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#resume" rel="noopener noreferrer">
                <Button 
                  size="lg" 
                  className="bg-foreground text-background hover:bg-foreground/90 px-8 py-6 text-base font-medium group"
                >
                  View Resume
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <a href="#contact">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-foreground/20 hover:border-foreground/40 px-8 py-6 text-base font-medium"
                >
                  Let’s Connect
                </Button>
              </a>
            </div>

            <div className="flex justify-center items-center space-x-8 pt-4">
              <a href="https://github.com/richard-b-melath" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors duration-300 group">
                <Github size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <div className="w-px h-4 bg-border" />
              <a href="https://www.linkedin.com/in/richardbmelath/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors duration-300 group">
                <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <div className="w-px h-4 bg-border" />
              <a href="mailto:richardbiju318@gmail.com" className="text-muted-foreground hover:text-accent transition-colors duration-300 group">
                <Mail size={20} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 group"
      >
        <div className="flex flex-col items-center space-y-2">
          <div className="w-px h-8 bg-muted-foreground/40" />
          <ChevronDown size={20} className="text-muted-foreground group-hover:text-accent transition-colors animate-bounce" />
        </div>
      </motion.button>
    </section>
  );
};
