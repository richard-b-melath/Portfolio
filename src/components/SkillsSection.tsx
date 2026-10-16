import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Server, 
  Layout, 
  Database, 
  Globe, 
  Cpu, 
  Terminal, 
  Search,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface SkillCategory {
  title: string;
  icon: any;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Artificial Intelligence & Machine Learning',
    icon: Brain,
    skills: [
      'Large Language Models (LLMs)',
      'Generative AI & RAG',
      'Conversational AI',
      'Deep Learning',
      'Machine Learning',
      'Multi-Agent Systems',
      'Prompt Engineering',
      'Gemini & ChatGPT APIs',
      'NLP (Natural Language Processing)'
    ],
  },
  {
    title: 'Backend Engineering & Architecture',
    icon: Server,
    skills: [
      'FastAPI (Python)',
      'Flask',
      'Uvicorn Stack',
      'RESTful APIs',
      'Docker Containerization',
      'System Design',
      'Python Automation (PDFPlumber, Tabula)',
      'Microservices Architecture'
    ],
  },
  {
    title: 'Databases & Cloud Infrastructure',
    icon: Database,
    skills: [
      'MongoDB (NoSQL)',
      'PostgreSQL',
      'MySQL',
      'Google Cloud Platform (GCP)',
      'Git & GitHub / GitLab',
      'Linux / Bash Scripting'
    ],
  },
  {
    title: 'Frontend & Interactive Web',
    icon: Layout,
    skills: [
      'React.js',
      'JavaScript (ESNext)',
      'TypeScript',
      'HTML5 / CSS3',
      'Tailwind CSS',
      'Vite & Modern Tooling'
    ],
  },
];

const languages = [
  { name: 'English', level: 'C1 Proficient / B2 Working', note: 'Academic & Professional' },
  { name: 'German', level: 'A2 (B1 in Preparation)', note: 'Little Flower Academy' },
  { name: 'Malayalam', level: 'Native / Mother Tongue', note: 'Primary Language' },
];

export const SkillsSection = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 relative bg-black font-mono">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/15 text-white text-xs font-medium mb-3">
            <Cpu size={12} />
            <span>{t('skills.tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
            {t('skills.title1')} <span className="text-neutral-400">{t('skills.title2')}</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400 leading-relaxed font-sans">
            {t('skills.desc')}
          </p>

          {/* Quick Search */}
          <div className="mt-6 max-w-sm mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 w-3.5 h-3.5" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('skills.search')}
              className="w-full bg-neutral-950 border border-white/15 focus:border-white rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-neutral-600 focus:outline-none transition-colors"
            />
          </div>
        </motion.div>

        {/* 4 Clean Skill Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {skillCategories.map((category, idx) => {
            const Icon = category.icon;
            const filteredSkills = category.skills.filter((s) =>
              s.toLowerCase().includes(searchQuery.toLowerCase())
            );

            if (searchQuery && filteredSkills.length === 0) return null;

            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                viewport={{ once: true }}
                className="glass-card p-5 sm:p-6 rounded-xl border border-white/10 hover:border-white/30 transition-all tech-bracket"
              >
                <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-white/10">
                  <div className="w-7 h-7 rounded-md bg-white/[0.06] border border-white/10 flex items-center justify-center text-white">
                    <Icon size={14} />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-white">
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {filteredSkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-xs rounded-md bg-white/[0.03] border border-white/10 text-neutral-300 hover:text-white hover:border-white/30 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Language Skills - Clean & Simplistic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
          className="glass-card p-5 rounded-xl border border-white/10"
        >
          <div className="flex items-center gap-2 mb-4 text-xs font-bold text-white">
            <Globe size={14} />
            <span>Language Proficiencies</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {languages.map((lang) => (
              <div
                key={lang.name}
                className="p-3 rounded-lg bg-white/[0.02] border border-white/5"
              >
                <div className="text-xs font-bold text-white">{lang.name}</div>
                <div className="text-[11px] text-neutral-300 mt-0.5">{lang.level}</div>
                <div className="text-[10px] text-neutral-500 mt-0.5 font-sans">{lang.note}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
