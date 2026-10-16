import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  Eye, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Calendar, 
  Building2, 
  CheckCircle2, 
  Terminal,
  MapPin
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const experiences = [
  {
    role: 'Software Developer',
    company: 'DoctorAssist.ai (Saraswatha Healthcare Research Pvt. Ltd.)',
    location: 'Bangalore, India',
    period: '29/10/2025 – 27/02/2026',
    type: 'Production Role',
    summary: 'Developed features for an AI-driven medical software platform in a fast-paced healthcare startup.',
    highlights: [
      'Designed and implemented backend services with FastAPI and frontend components with React',
      'Managed application data handling and schemas using MongoDB',
      'Containerized microservices using Docker for scalable and consistent deployment',
      'Contributed to the high-level scalable system architecture design',
    ],
    tech: ['FastAPI', 'Python', 'React', 'MongoDB', 'Docker'],
  },
  {
    role: 'AI & Automation Intern',
    company: 'Senscript Technologies Pvt. Ltd.',
    location: 'Kochi, India',
    period: '02/06/2025 – 23/10/2025',
    type: 'Enterprise AI Internship',
    summary: 'Engineered document data extraction pipelines and automated email response systems.',
    highlights: [
      'Extracted structured and unstructured data from PDFs using PDFPlumber and Tabula',
      'Built automated email processing system that analyzes incoming emails and generates context responses',
      'Organized extracted business data for downstream processing pipelines',
      'Collaborated with development teams to test and improve automation reliability',
    ],
    tech: ['Python', 'PDFPlumber', 'Tabula', 'NLP', 'Process Automation'],
  },
  {
    role: 'AI Intern',
    company: 'Information Kerala Mission (Govt. of Kerala)',
    location: 'Kerala, India',
    period: '07/08/2024 – 06/01/2025',
    type: 'Government Civic Tech',
    summary: 'Developed an AI-powered conversational chatbot for the state Harithamithram waste management platform.',
    highlights: [
      'Integrated ChatGPT API with structured government databases for context-aware responses',
      'Built conversational features for waste collection schedules, FAQs, and issue reporting',
      'Improved citizen access and interaction with municipal services via conversational AI',
      'Refined prompt safety and response accuracy with the core engineering team',
    ],
    tech: ['Python', 'ChatGPT API', 'LLMs', 'Flask', 'Civic Tech'],
  },
];

const education = [
  {
    degree: 'M.Sc. Data Science',
    institution: 'Universität Trier',
    location: 'Germany',
    period: '01/10/2026 – CURRENT',
    score: 'Master’s Degree',
    highlight: 'Advanced Studies in Data Science & Intelligent Systems',
  },
  {
    degree: 'B.Tech in Computer Science and Engineering (Artificial Intelligence)',
    institution: 'Adi Shankara Institute of Engineering and Technology (APJAKTU)',
    location: 'Kalady, India',
    period: '01/08/2021 – 31/05/2025',
    score: 'Final GPA: 8.52 / 10',
    highlight: 'EQF Level 6 • First Class with Distinction',
  },
  {
    degree: 'German Language (B1 in Preparation)',
    institution: 'Little Flower Academy',
    location: 'India',
    period: '02/03/2026 – 28/08/2026',
    score: 'CEFR B1 Target',
    highlight: 'German Language Fluency',
  },
  {
    degree: 'Higher Secondary Certificate (Science Stream)',
    institution: 'Union Higher Secondary School (UHSS) Mambra',
    location: 'Mambra, India',
    period: '2019 – 2021',
    score: 'Final Score: 97.58%',
    highlight: 'Physics, Chemistry, Mathematics, Biology',
  },
  {
    degree: 'Secondary School Leaving Certificate (SSLC)',
    institution: 'Little Flower Convent Higher Secondary School (LFCHSS)',
    location: 'Koratty, India',
    period: '2018 – 2019',
    score: 'Grade: Full A+ (Highest Grade)',
    highlight: 'Full A+ in all subjects',
  },
];

const certifications = [
  'Certificate Course on Artificial Intelligence – Infosys Foundation & ICT Academy (Azure AI)',
  'Generative AI-30 hours Specialization – GPT3 Cloud Innovations',
  'Problem Solving through Programming in C – NPTEL',
  'Fundamentals of Artificial Intelligence – NPTEL',
  'Computer Vision and Image Processing – NPTEL',
  'Matlab Onramp Certification – MathWorks',
  'Computer Vision 101 – Infosys Springboard',
  'Artificial Intelligence Foundation – Infosys Springboard',
];

export const ResumeSection = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'experience' | 'education' | 'certifications'>('experience');

  return (
    <section id="resume" className="py-20 px-4 sm:px-6 relative bg-black font-mono">
      <div className="container mx-auto max-w-5xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/15 text-white text-xs font-medium mb-3">
            <Terminal size={12} />
            <span>{t('resume.tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
            {t('resume.title1')} <span className="text-neutral-400">{t('resume.title2')}</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400 leading-relaxed font-sans">
            {t('resume.desc')}
          </p>

          {/* Dual Resume Download Hub: English & German CV options */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-2xl mx-auto">
            {/* English CV Card */}
            <div className="p-4 rounded-xl bg-neutral-950 border border-white/15 hover:border-white/30 transition-all text-left flex flex-col justify-between group tech-bracket">
              <div>
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                      <FileText size={16} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white tracking-tight">Curriculum Vitae (English)</div>
                      <div className="text-[10px] text-neutral-400 mt-0.5">Primary International • PDF (415 KB)</div>
                    </div>
                  </div>
                  <span className="text-[9px] uppercase px-1.5 py-0.5 rounded font-mono font-bold bg-white text-black shrink-0">
                    EN
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-white/10 mt-2">
                <a
                  href="/Resume/RICHARD_CV_ENG_N.pdf"
                  download="Richard_Biju_Melath_CV_ENG.pdf"
                  className="flex-1"
                >
                  <button className="w-full h-8 px-3 rounded-lg bg-white text-black font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-neutral-200 transition-colors cursor-pointer">
                    <Download size={12} />
                    <span>{language === 'de' ? 'Download (EN)' : 'Download (EN)'}</span>
                  </button>
                </a>
                <a
                  href="/Resume/RICHARD_CV_ENG_N.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 px-2.5 rounded-lg border border-white/20 bg-white/5 hover:bg-white/15 text-white text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  title="View in new tab"
                >
                  <Eye size={12} />
                  <span className="text-[11px]">{language === 'de' ? 'Vorschau' : 'View'}</span>
                </a>
              </div>
            </div>

            {/* German CV Card */}
            <div className="p-4 rounded-xl bg-neutral-950 border border-white/15 hover:border-white/30 transition-all text-left flex flex-col justify-between group tech-bracket">
              <div>
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                      <FileText size={16} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white tracking-tight">Lebenslauf (Deutsch)</div>
                      <div className="text-[10px] text-neutral-400 mt-0.5">Europass Format • PDF (414 KB)</div>
                    </div>
                  </div>
                  <span className="text-[9px] uppercase px-1.5 py-0.5 rounded font-mono font-bold bg-white text-black shrink-0">
                    DE
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-white/10 mt-2">
                <a
                  href="/Resume/RICHARD_CV_GER_N.pdf"
                  download="Richard_Biju_Melath_CV_GER.pdf"
                  className="flex-1"
                >
                  <button className="w-full h-8 px-3 rounded-lg bg-white text-black font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-neutral-200 transition-colors cursor-pointer">
                    <Download size={12} />
                    <span>{language === 'de' ? 'Download (DE)' : 'Download (DE)'}</span>
                  </button>
                </a>
                <a
                  href="/Resume/RICHARD_CV_GER_N.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 px-2.5 rounded-lg border border-white/20 bg-white/5 hover:bg-white/15 text-white text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  title="In neuem Tab ansehen"
                >
                  <Eye size={12} />
                  <span className="text-[11px]">{language === 'de' ? 'Vorschau' : 'View'}</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tab Selection */}
        <div className="flex justify-center gap-2 mb-10 text-xs">
          <button
            onClick={() => setActiveTab('experience')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'experience'
                ? 'bg-white text-black font-semibold'
                : 'bg-neutral-950 border border-white/10 text-neutral-400 hover:text-white'
            }`}
          >
            {t('resume.tab.exp')} ({experiences.length})
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'education'
                ? 'bg-white text-black font-semibold'
                : 'bg-neutral-950 border border-white/10 text-neutral-400 hover:text-white'
            }`}
          >
            {t('resume.tab.edu')} ({education.length})
          </button>
          <button
            onClick={() => setActiveTab('certifications')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'certifications'
                ? 'bg-white text-black font-semibold'
                : 'bg-neutral-950 border border-white/10 text-neutral-400 hover:text-white'
            }`}
          >
            {t('resume.tab.cert')} ({certifications.length})
          </button>
        </div>

        {/* Tab 1: Experience Timeline */}
        {activeTab === 'experience' && (
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.role + exp.company}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="glass-card p-5 sm:p-6 rounded-xl border border-white/10 hover:border-white/30 transition-all tech-bracket"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <div>
                    <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 text-neutral-300">
                      {exp.type}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white mt-1.5">
                      {exp.role}
                    </h3>
                    <div className="text-xs text-neutral-400 flex items-center gap-1.5 mt-0.5">
                      <Building2 size={13} className="text-white" />
                      <span>{exp.company}</span>
                      <span className="text-neutral-600">•</span>
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  <div className="text-xs text-neutral-400 self-start sm:self-auto mt-2 sm:mt-0 px-2 py-1 rounded bg-white/[0.02] border border-white/5 flex items-center gap-1">
                    <Calendar size={12} />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed mt-2 font-sans">
                  {exp.summary}
                </p>

                <ul className="mt-3 space-y-1.5 font-sans">
                  {exp.highlights.map((item, i) => (
                    <li key={i} className="text-xs text-neutral-400 flex items-start gap-2">
                      <CheckCircle2 size={13} className="text-white shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-1">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-[10px] rounded bg-white/[0.04] text-neutral-300 border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Tab 2: Education List */}
        {activeTab === 'education' && (
          <div className="space-y-4">
            {education.map((edu, index) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                viewport={{ once: true }}
                className="glass-card p-4 sm:p-5 rounded-xl border border-white/10 tech-bracket"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <h4 className="text-sm sm:text-base font-bold text-white">
                    {edu.degree}
                  </h4>
                  <span className="text-xs text-neutral-400">{edu.period}</span>
                </div>

                <div className="text-xs text-neutral-400 font-sans">
                  {edu.institution} • {edu.location}
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-neutral-500 font-sans">{edu.highlight}</span>
                  <span className="text-black bg-white font-bold px-2 py-0.5 rounded text-[11px]">
                    {edu.score}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Tab 3: Certifications */}
        {activeTab === 'certifications' && (
          <div className="glass-card p-5 rounded-xl border border-white/10 space-y-2 tech-bracket">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: index * 0.03 }}
                viewport={{ once: true }}
                className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 flex items-center gap-2.5"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                <span className="text-xs font-sans text-neutral-300">
                  {cert}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
