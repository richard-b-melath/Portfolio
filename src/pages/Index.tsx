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
import { ParticleBackground } from '@/components/ParticleBackground';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

const Index = () => {
  const [isBusinessCardOpen, setIsBusinessCardOpen] = useState(false);
  const [showCardButton, setShowCardButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show business card button after scrolling past hero section
      const heroHeight = window.innerHeight;
      setShowCardButton(window.scrollY > heroHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative">
        <HeroSection />
        <AboutSection />
        <FeaturedSection />
        <SkillsSection />
        <ProjectsSection />
        <ResumeSection />
        <ContactSection />
      </main>

      {/* Floating Business Card Button */}
      {showCardButton && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, x: 100 }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 z-40"
        >
          <Button
            onClick={() => setIsBusinessCardOpen(true)}
            className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 p-0 shadow-lg hover:shadow-xl transition-all duration-300"
            title="View Digital Business Card"
          >
            <CreditCard size={20} className="sm:w-[22px] sm:h-[22px] lg:w-[24px] lg:h-[24px]" />
          </Button>
        </motion.div>
      )}

      {/* Business Card Modal */}
      <BusinessCardModal 
        isOpen={isBusinessCardOpen} 
        onClose={() => setIsBusinessCardOpen(false)} 
      />

      {/* Footer */}
      <footer className="py-8 sm:py-10 lg:py-12 px-4 sm:px-6 border-t border-border bg-card">
  <div className="container mx-auto max-w-6xl">
    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
      
      {/* Left: Copyright */}
      <div className="text-center md:text-left">
        <p className="text-muted-foreground font-light text-sm sm:text-base">
          © {new Date().getFullYear()} Richard B Melath. Crafted with code and creativity.
        </p>
      </div>

      {/* Right: Social Links */}
      <div className="flex flex-wrap justify-center space-x-4 sm:space-x-6">
        <a
          href="https://github.com/richard-b-melath"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm sm:text-base"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/richardbmelath/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm sm:text-base"
        >
          LinkedIn
        </a>
        <a
          href="https://richardbmelath.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm sm:text-base"
        >
          Portfolio
        </a>
      </div>
    </div>
  </div>
</footer>

    </div>
  );
};

export default Index;
