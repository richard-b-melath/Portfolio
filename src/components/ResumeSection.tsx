'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Download,
  Eye,
  FileText,
  Award,
  Briefcase,
  GraduationCap
} from 'lucide-react';

const experiences = [
  {
    title: 'AI Intern',
    company: 'Senscript',
    period: 'June 2025 – Present',
    description: 'Built PDF parsing and email automation systems.',
    achievements: [
      'Extracted structured/unstructured data using PDFPlumber and Tabula',
      'Automated email classification and response generation',
      'Processed multiple PDF types with error handling rules'
    ]
  },
  {
    title: 'AI Intern',
    company: 'Information Kerala Mission',
    period: 'Aug 2024 – Jan 2025',
    description: 'Developed an AI chatbot for the HarithaMithram app.',
    achievements: [
      'Integrated ChatGPT API for dynamic query handling',
      'Enabled real-time complaint submission through chat',
      'Designed AI prompt logic and fallback routing'
    ]
  },
  {
  title: 'AI Chatbot Developer',
  company: 'Shankarini – College Chatbot Project',
  period: 'Aug 2024 – March 2025',
  description: 'Built a college-specific chatbot that scrapes content from the official website and answers student queries.',
  achievements: [
    'Used Python for web scraping and response logic',
    'Integrated ChatGPT API to respond based on scraped content',
    'Developed UI to allow user input and chatbot replies in real time'
  ]
  },
  {
    title: 'Web Development Intern',
    company: 'Star Innovations',
    period: 'Jul 14, 2024 – Oct 15, 2024',
    description: 'Worked under Dr. Binju Saju to deliver web prototypes.',
    achievements: [
      'Designed multi-page responsive UI in HTML/CSS',
      'Implemented animations and scroll routing',
      'Supported backend integration with client-side scripts'
    ]
  },
  {
    title: 'Game Development Intern',
    company: 'Tiltedu',
    period: 'May 2023 – Jun 2023',
    description: 'Built a 3D FPS game prototype in Unity.',
    achievements: [
      'Created character controller and gun mechanics using C#',
      'Imported Blender models for game assets',
      'Published MVP demo during internship program'
    ]
  }
];

const education = [
  {
    degree: 'B.Tech in CSE (Artificial Intelligence)',
    school: 'Adi Shankara Institute of Engineering and Technology',
    period: '2021 – 2025',
    focus: 'GPA: 8.52'
  },
  {
    degree: 'Higher Secondary Education',
    school: 'UHSS Mambra, Kerala',
    period: '2021',
    focus: 'Grade: 97.58%'
  },
  {
    degree: 'Secondary Education (SSLC)',
    school: 'L.F.C.H.S.S Koratty, Kerala',
    period: '2019',
    focus: 'Grade: 100%'
  }
];

const certifications = [
  'Certificate Course on Artificial Intelligence – Infosys & ICT Academy',
  'Generative AI – GPT3 Cloud Innovations (30-hour Add-on)',
  'Problem Solving through Programming in C – NPTEL',
  'Fundamentals of Artificial Intelligence – NPTEL',
  'Computer Vision & Image Processing – NPTEL',
  'Matlab Onramp Certification – MathWorks',
  'Computer Vision 101 – Infosys Springboard',
  'Artificial Intelligence Foundation – Infosys Springboard'
];

export const ResumeSection = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      window.open('/Richard_B_Melath_Resume.pdf', '_blank');
    }, 1500);
  };

  return (
    <section id="resume" className="py-20 px-6 bg-gradient-to-b from-background/50 to-background">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            My <span className="bg-gradient-primary bg-clip-text text-transparent">Resume</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            A summary of my academic record, internships, and certifications in AI, software engineering, and development.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-md mx-auto mb-12"
          >
            <Card className="holographic p-4 sm:p-6 md:p-8 hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                  <FileText size={24} className="text-primary-foreground sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">Download Resume</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-6">Get the full PDF of my updated resume</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={handleDownload} disabled={isDownloading} className="data-chip flex-1 text-sm sm:text-base">
                    {isDownloading ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                        <Download size={16} className="mr-2 sm:w-[18px] sm:h-[18px]" />
                      </motion.div>
                    ) : (
                      <Download size={16} className="mr-2 sm:w-[18px] sm:h-[18px]" />
                    )}
                    {isDownloading ? 'Preparing...' : 'Download'}
                  </Button>
                  <a
                    href="/Richard_B_Melath_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="outline" className="holographic border-primary/50 hover:border-primary w-full text-sm sm:text-base">
                      <Eye size={16} className="mr-2 sm:w-[18px] sm:h-[18px]" />
                      Preview
                    </Button>
                  </a>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card className="holographic p-8">
              <div className="flex items-center mb-6">
                <Briefcase className="text-primary mr-3" size={24} />
                <h3 className="text-2xl font-bold">Internship Experience</h3>
              </div>

              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.title + exp.company}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                    viewport={{ once: true }}
                    className="relative pl-6 border-l-2 border-primary/30 last:border-l-0"
                  >
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full animate-pulse-glow" />
                    <div className="mb-2">
                      <h4 className="text-lg font-semibold text-foreground">{exp.title}</h4>
                      <p className="text-primary font-medium">{exp.company}</p>
                      <p className="text-sm text-muted-foreground">{exp.period}</p>
                    </div>
                    <p className="text-muted-foreground mb-3">{exp.description}</p>
                    <ul className="space-y-1">
                      {exp.achievements.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start">
                          <span className="text-primary mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Education & Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Education */}
            <Card className="holographic p-6">
              <div className="flex items-center mb-6">
                <GraduationCap className="text-secondary mr-3" size={24} />
                <h3 className="text-xl font-bold">Education</h3>
              </div>

              <div className="space-y-6">
                {education.map((edu, index) => (
                  <motion.div
                    key={edu.degree}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.6 }}
                    viewport={{ once: true }}
                  >
                    <h4 className="font-semibold text-foreground">{edu.degree}</h4>
                    <p className="text-primary/50 font-medium">{edu.school}</p>
                    <p className="text-sm text-muted-foreground">{edu.period}</p>
                    <p className="text-sm text-muted-foreground">{edu.focus}</p>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Certifications */}
            <Card className="holographic p-6">
              <div className="flex items-center mb-6">
                <Award className="text-primary mr-3" size={24} />
                <h3 className="text-xl font-bold">Certifications</h3>
              </div>

              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.8 }}
                    viewport={{ once: true }}
                    className="flex items-center p-3 bg-primary/5 rounded-lg border border-primary/20"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full mr-3 animate-pulse-glow" />
                    <span className="text-sm font-medium">{cert}</span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
