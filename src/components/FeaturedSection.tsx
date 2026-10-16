import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Award, 
  ExternalLink, 
  Calendar, 
  Terminal, 
  FileCheck, 
  Sparkles,
  CheckCircle2,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const publications = [
  {
    id: 1,
    type: 'IEEE Publication',
    year: '2025',
    title: 'Harnessing Deep Learning for Early Detection of Plant Diseases: A Comprehensive Approach',
    venue: 'IEEE Conference Proceedings',
    publisher: 'IEEE Xplore',
    authors: 'Dr. Amrutha Muralidharan Nair, Devika P Sajith, Pavithra Deepu E, Madhavan V, Sarang R, Thomas Eldhose, Richard B Melath',
    summary: 'Comprehensive research investigating deep convolutional neural network architectures for precision botanical pathology detection and early automated mitigation in agricultural systems.',
    link: 'https://ieeexplore.ieee.org/abstract/document/11168593',
    badge: 'Peer-Reviewed IEEE Paper',
    images: ['/infosys1.jpg', '/infosys2.jpg'],
  },
  {
    id: 2,
    type: 'Journal Article',
    year: '2024',
    title: 'Automating Tomorrow: The Convergence of AI and Robotics',
    venue: 'International Journal of Intelligent Systems and Applications in Engineering (IJISAE)',
    publisher: 'IJISAE',
    authors: 'Gayathri Dili, Sarika S., Akshay S., Richard B Melath, Amrutha Muralidharan Nair, Sharika T. R.',
    summary: 'Systematic study exploring real-time autonomous robotics control systems, neural kinematics, and edge machine learning convergence for industrial automation.',
    link: 'https://ijisae.org/index.php/IJISAE/article/view/6543/5392',
    badge: 'International Journal Publication',
    images: ['/shankarani1.jpg', '/shankarani2.jpg'],
  },
];

const honors = [
  {
    id: 3,
    title: 'Shankarani AI – Institutional Appreciation',
    issuer: 'Adi Shankara Institute of Eng. & Tech.',
    date: '2024 – 2025',
    highlight: 'Certificate of Appreciation',
    description: 'Developed an AI chatbot dynamically extracting university data for thousands of student inquiries. The project inspired the formation of DotGen, an early-stage AI venture.',
    link: 'https://www.adishankara.ac.in/',
  },
  {
    id: 4,
    title: 'IBM Watsonx AI Hackathon & IEDC Challenge',
    issuer: 'IBM Kochi & Kerala Startup Mission',
    date: '2024',
    highlight: 'Shortlisted & Finalist',
    description: 'Selected and participated in the IBM Watsonx AI Hackathon at IBM Kochi office with the Project Sustainability Analyser, assessing environmental metrics with GenAI.',
    link: 'https://github.com/richard-b-melath/VOXIA',
  },
];

export const FeaturedSection = () => {
  const { t } = useLanguage();

  return (
    <section id="featured" className="py-20 px-4 sm:px-6 relative bg-black font-mono">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/15 text-white text-xs font-medium mb-3">
            <Terminal size={12} />
            <span>{t('research.tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
            {t('research.title1')} <span className="text-neutral-400">{t('research.title2')}</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400 leading-relaxed font-sans">
            {t('research.desc')}
          </p>
        </motion.div>

        {/* 2 Flagship Publications Cards */}
        <div className="mb-6">
          <div className="text-[11px] text-neutral-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            <BookOpen size={13} className="text-white" />
            <span>{t('research.peer')} ({publications.length})</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {publications.map((paper, idx) => (
              <motion.div
                key={paper.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 rounded-2xl border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between tech-bracket relative group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-white text-black font-semibold">
                      {paper.type}
                    </span>
                    <span className="text-xs text-neutral-400 flex items-center gap-1">
                      <Calendar size={11} /> {paper.year}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white leading-snug group-hover:text-neutral-200 transition-colors">
                    {paper.title}
                  </h3>

                  <p className="text-xs text-neutral-400 mt-2 font-sans font-medium">
                    {paper.venue}
                  </p>

                  <p className="mt-3 text-xs text-neutral-400 leading-relaxed font-sans line-clamp-3">
                    {paper.summary}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-neutral-500">
                    Publisher: {paper.publisher}
                  </span>
                  <a
                    href={paper.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white hover:text-black text-white text-xs transition-colors"
                  >
                    <span>View Paper</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 2 Concise Verified Honors Cards */}
        <div>
          <div className="text-[11px] text-neutral-500 uppercase tracking-widest mb-3 flex items-center gap-2 mt-8">
            <Award size={13} className="text-white" />
            <span>Honors & Hackathon Recognitions ({honors.length})</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {honors.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-5 rounded-xl border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between tech-bracket"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-neutral-400 bg-white/[0.04] border border-white/10 px-2 py-0.5 rounded">
                      {item.highlight}
                    </span>
                    <span className="text-xs text-neutral-500">{item.date}</span>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-white mt-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-neutral-400 mt-0.5">{item.issuer}</p>

                  <p className="mt-2.5 text-xs text-neutral-400 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-neutral-500 flex items-center gap-1">
                    <CheckCircle2 size={12} className="text-white" />
                    Verified Citation
                  </span>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:underline text-[11px] flex items-center gap-1"
                    >
                      <span>Link</span>
                      <ExternalLink size={10} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
