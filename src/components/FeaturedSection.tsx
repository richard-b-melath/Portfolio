'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Award, Newspaper, Trophy, Star, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';

const achievements = [
  {
  id: 1,
  type: 'feature',
  title: 'AI Innovation Award',
  description: 'Recognized for developing an innovative AI chatbot solution that significantly improved user engagement and automated customer service processes at ASIET.',
  images: ['/shankarani1.jpg', '/shankarani3.jpg', '/shankarani4.jpg', '/shankarani2.jpg'],
  date: '2025',
  category: 'Media Feature',
  icon: Newspaper
},
{
  id: 2,
  type: 'award',
  title: 'Best Student Project - AI Department',
  description: 'Our final-year project, "AI-powered Waste Management Personnel Assistant for the Harithamithram App," was awarded the Best Project in the AI Department for its innovative use of AI and machine learning techniques.',
  images: ['/harithamithram1.jpg', '/harithamithram2.jpg', '/harithamithram3.jpg'],
  date: '2025',
  category: 'Technology Innovation',
  icon: Trophy
},
{
  id: 3,
  type: 'award',
  title: 'Top 10 in All-India Hackathon by IBM',
  description: 'Our team "VOXIA" secured a top 10 position in the All-India Hackathon conducted by IBM, showcasing our innovative AI solution "Sustainable Project Analyzer" and strong teamwork.',
  images: ['/ibm1.jpg', '/ibm2.jpg', '/ibm3.jpg'],
  date: '2024',
  category: 'Hackathon',
  icon: Award
},
{
  id: 4,
  type: 'award',
  title: 'Completed 15-Day Training in AI & ML by Infosys CSR',
  description: 'Successfully completed a comprehensive 15-day training program in Artificial Intelligence and Machine Learning conducted by Infosys CSR, strengthening practical skills in AI technologies and applications.',
  images: ['/infosys1.jpg', '/infosys2.jpg', '/infosys3.jpg'],
  date: '2024',
  category: 'Course Completion',
  icon: Star
}
];

export const FeaturedSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<{[key: number]: number}>({});
  const [modalOpen, setModalOpen] = useState<{ achievementId: number; imageIndex: number } | null>(null);

  const nextImage = (achievementId: number, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [achievementId]: ((prev[achievementId] || 0) + 1) % totalImages
    }));
  };

  const prevImage = (achievementId: number, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [achievementId]: ((prev[achievementId] || 0) - 1 + totalImages) % totalImages
    }));
  };

  const openModal = (achievementId: number, imageIndex: number) => {
    setModalOpen({ achievementId, imageIndex });
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  };

  const closeModal = () => {
    setModalOpen(null);
    document.body.style.overflow = 'unset'; // Restore scroll
  };

  const nextModalImage = () => {
    if (!modalOpen) return;
    const achievement = achievements.find(a => a.id === modalOpen.achievementId);
    if (!achievement) return;
    
    const nextIndex = (modalOpen.imageIndex + 1) % achievement.images.length;
    setModalOpen({ ...modalOpen, imageIndex: nextIndex });
  };

  const prevModalImage = () => {
    if (!modalOpen) return;
    const achievement = achievements.find(a => a.id === modalOpen.achievementId);
    if (!achievement) return;
    
    const prevIndex = (modalOpen.imageIndex - 1 + achievement.images.length) % achievement.images.length;
    setModalOpen({ ...modalOpen, imageIndex: prevIndex });
  };

  const ImageCarousel = ({ achievement }: { achievement: typeof achievements[0] }) => {
    const currentIndex = currentImageIndex[achievement.id] || 0;
    const hasMultipleImages = achievement.images.length > 1;

    return (
      <div className="relative mb-4 rounded-lg overflow-hidden bg-muted/20 aspect-video flex items-center justify-center border border-primary/10 group/carousel">
        <img
          src={achievement.images[currentIndex]}
          alt={`${achievement.title} - Image ${currentIndex + 1}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
          onClick={() => openModal(achievement.id, currentIndex)}
          onError={(e) => {
            // Fallback for missing images
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = `
                <div class="w-full h-full flex items-center justify-center">
                  <div class="text-center">
                    <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      ${achievement.type === 'award' ? '<svg class="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>' : '<svg class="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clip-rule="evenodd"></path><path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V9a1 1 0 00-1-1h-1v-1z"></path></svg>'}
                    </div>
                    <p class="text-sm text-muted-foreground">Image Coming Soon</p>
                  </div>
                </div>
              `;
            }
          }}
        />
        
        {/* Navigation Arrows - Only show if multiple images */}
        {hasMultipleImages && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage(achievement.id, achievement.images.length);
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover/carousel:opacity-100 transition-all duration-200 hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage(achievement.id, achievement.images.length);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover/carousel:opacity-100 transition-all duration-200 hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}

        {/* Image Counter - Only show if multiple images */}
        {hasMultipleImages && (
          <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-xs font-medium opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-200">
            {currentIndex + 1} / {achievement.images.length}
          </div>
        )}

        {/* Image Dots Indicator - Only show if multiple images */}
        {hasMultipleImages && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-200">
            {achievement.images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(prev => ({ ...prev, [achievement.id]: index }));
                }}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex 
                    ? 'bg-white scale-110' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  // Image Modal Component
  const ImageModal = () => {
    if (!modalOpen) return null;
    
    const achievement = achievements.find(a => a.id === modalOpen.achievementId);
    if (!achievement) return null;

    const currentImage = achievement.images[modalOpen.imageIndex];
    const hasMultipleImages = achievement.images.length > 1;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
        onClick={closeModal}
      >
        <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors z-10"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* Main Image */}
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={currentImage}
            alt={`${achievement.title} - Image ${modalOpen.imageIndex + 1}`}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Navigation for multiple images */}
          {hasMultipleImages && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevModalImage();
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextModalImage();
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Dots Navigation */}
          {hasMultipleImages && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">\
              {achievement.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalOpen({ ...modalOpen, imageIndex: index });
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === modalOpen.imageIndex
                      ? 'bg-white scale-110'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    );
  };
  return (
    <section id="featured" className="py-20 px-6 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="bg-gradient-primary bg-clip-text text-transparent">Achievements</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Recognition and awards that highlight my journey in AI development and software engineering excellence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="holographic p-6 h-full hover:scale-105 transition-all duration-300 group">
                <div className="flex flex-col h-full">
                  {/* Header with Icon and Category */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <achievement.icon size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-primary font-medium">{achievement.category}</p>
                        <p className="text-xs text-muted-foreground">{achievement.date}</p>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      achievement.type === 'award' 
                        ? 'bg-amber-500/10 text-amber-600 border border-amber-500/20' 
                        : 'bg-blue-500/10 text-blue-600 border border-blue-500/20'
                    }`}>
                      {achievement.type === 'award' ? 'Award' : 'Feature'}
                    </div>
                  </div>

                  {/* Image Carousel */}
                  <ImageCarousel achievement={achievement} />

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                      {achievement.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>

                  {/* Footer with animated line */}
                  <div className="mt-4 pt-4">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent group-hover:via-primary/60 transition-colors" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card className="holographic p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                <Star size={24} className="text-primary-foreground" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">Want to Collaborate?</h3>
            <p className="text-muted-foreground mb-6">
              Let's work together to create innovative solutions and achieve remarkable results.
            </p>
            <a href="#contact">
              <button className="px-6 py-3 bg-gradient-primary text-primary-foreground font-semibold rounded-lg hover:scale-105 transition-transform duration-200">
                Get In Touch
              </button>
            </a>
          </Card>
        </motion.div>
      </div>

      {/* Image Modal */}
      <ImageModal />
    </section>
  );
};
