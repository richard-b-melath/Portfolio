import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Github, 
  Code2, 
  ArrowUpRight, 
  X, 
  Activity, 
  Search, 
  Terminal, 
  CheckCircle2, 
  Layers,
  Cpu
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export interface ProjectItem {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  category: 'AI & Multi-Agent' | 'Production & Backends' | 'Web Applications';
  badge: string;
  image: string;
  description: string;
  architecture: string[];
  tech: string[];
  metrics: string[];
  github?: string;
  live?: string;
}

const projects: ProjectItem[] = [
  {
    id: 'doctorassist',
    code: 'SYS-01',
    title: 'DoctorAssist.ai Medical Platform',
    subtitle: 'Clinical AI Decision Support & Scalable Microservices',
    category: 'Production & Backends',
    badge: 'Clinical Healthcare Startup',
    image: '/doctorassist.jpg',
    description: 'Developed features for an AI-driven medical software platform in a fast-paced startup environment. Designed and implemented backend microservices using FastAPI, responsive React frontend components, and MongoDB database architecture with Docker containerization.',
    architecture: [
      'FastAPI asynchronous REST microservices with strict Pydantic validation',
      'MongoDB schemas for medical record structures and patient data integrity',
      'Docker containerized deployment pipeline ensuring seamless environment consistency',
      'Modular React frontend modules tailored for clinical practitioners',
    ],
    tech: ['FastAPI', 'Python', 'React', 'Docker', 'MongoDB', 'REST APIs'],
    metrics: ['Production Deployed', 'Scalable Microservices', 'Clinical Healthcare AI'],
    live: 'https://richardbmelath.vercel.app/',
  },
  {
    id: 'courtroom-ai',
    code: 'SYS-02',
    title: 'AI Courtroom Simulation (LegalTech Multi-Agent)',
    subtitle: 'Multi-Agent Autonomous Legal Sandbox & Case Reasoning',
    category: 'AI & Multi-Agent',
    badge: 'Codex Hackathon Build',
    image: '/ibm1.jpg',
    description: 'Developed at the Codex Community Hackathon (Kochi) to make legal understanding intuitive. Analyzes case documents and simulates courtroom dynamics with autonomous agents acting as judge, lawyers, and witnesses generating arguments and case summaries.',
    architecture: [
      'Document intelligence engine parsing legal briefs into facts, parties, and claims',
      'Multi-agent roleplay orchestration (Judge, Defense, Prosecution, Witnesses)',
      'Interactive AI courtroom sandbox providing legal reasoning visualization',
    ],
    tech: ['Python', 'Multi-Agent Systems', 'LLM Prompt Engineering', 'NLP', 'FastAPI'],
    metrics: ['Autonomous Multi-Agent', 'Hackathon Finalist Platform', 'Document Parsing'],
    github: 'https://github.com/richard-b-melath',
  },
  {
    id: 'shankarani',
    code: 'SYS-03',
    title: 'Shankarani – Campus Digital Assistant',
    subtitle: 'Dynamic Web-Scraping & Institutional RAG Assistant',
    category: 'AI & Multi-Agent',
    badge: 'Institutional Award Winner',
    image: '/shankarani1.jpg',
    description: 'Built an AI assistant for Adi Shankara Institute that dynamically extracts website circulars and indexes academic updates to answer thousands of student inquiries in real time. The project inspired the formation of DotGen, an early-stage AI venture.',
    architecture: [
      'Automated web-scraping daemon continuously syncing official announcements',
      'Contextual LLM retrieval engine answering campus circulars and exam schedules',
      'Seamless integration into university digital portals with conversational fallback',
    ],
    tech: ['Python', 'Web Scraping', 'ChatGPT API', 'NLP', 'React', 'HTML5/JS'],
    metrics: ['Institutional Appreciation', 'Sparked DotGen AI Venture', 'Active Campus Adoption'],
    live: 'https://www.adishankara.ac.in/',
  },
  {
    id: 'harithamithram',
    code: 'SYS-04',
    title: 'HarithaMithram AI Sanitation Assistant',
    subtitle: 'Statewide Municipal Civic Bot – Information Kerala Mission',
    category: 'AI & Multi-Agent',
    badge: 'Govt. of Kerala Civic Tech',
    image: '/harithamithram1.jpg',
    description: 'Developed for the Information Kerala Mission government platform. An intelligent chatbot assisting citizens and municipal personnel with waste collection schedules, FAQs, and automated civic grievance registration using ChatGPT and Gemini APIs.',
    architecture: [
      'Integrated ChatGPT API with structured government databases for context-aware replies',
      'Citizen grievance conversational registration and automated ticket routing',
      'Custom prompt guardrails tailored for regional civic terminologies',
    ],
    tech: ['Python', 'ChatGPT API', 'Gemini', 'LLMs', 'Flask', 'Prompt Tuning'],
    metrics: ['Statewide Gov Deployment', 'Automated Issue Reporting', 'Fine-Tuned LLM Pipeline'],
  },
  {
    id: 'sustainability',
    code: 'SYS-05',
    title: 'Project Sustainability Analyser',
    subtitle: 'IBM Watsonx Environmental Mitigation Platform',
    category: 'Production & Backends',
    badge: 'IBM Watsonx Hackathon',
    image: '/ibm2.jpg',
    description: 'Developed using Flask and IBM Watson foundation tools to analyze enterprise initiatives against environmental benchmarks, predicting ecological sustainability risks and recommending greener product alternatives.',
    architecture: [
      'IBM Watsonx prompt orchestration evaluating lifecycle carbon metrics',
      'Flask REST backend computing predictive project sustainability scores',
      'Actionable recommendations database recommending eco-friendly engineering materials',
    ],
    tech: ['GenAI', 'Python', 'Flask', 'IBM Watsonx', 'Prompt Engineering'],
    metrics: ['IBM Kochi Finalist', 'Automated Eco Recommendations', 'GenAI Impact Scoring'],
    github: 'https://github.com/richard-b-melath/VOXIA',
  },
  {
    id: 'brahma25',
    code: 'SYS-06',
    title: 'Brahma25 & Prayag24 Web Experiences',
    subtitle: 'High-Traffic National Festival Platforms',
    category: 'Web Applications',
    badge: 'National Inter-College Techfest',
    image: '/prayag24.jpg',
    description: 'Designed and launched the official platforms brahma25.live and Prayag24 for the national-level inter-college technical and cultural festivals organized by ASIET, handling high concurrent attendee traffic and live schedules.',
    architecture: [
      'High-performance React & Tailwind component hierarchy with sub-second page loads',
      'Mobile-first responsive layouts supporting multi-track event schedules',
      'Interactive timelines, countdown feeds, and attendee registration forms',
    ],
    tech: ['React.js', 'TypeScript', 'Tailwind CSS', 'Vite', 'REST APIs'],
    metrics: ['Thousands of Concurrent Visits', 'National Techfest Portal', 'Zero-Downtime Peak Traffic'],
    live: 'https://richardbmelath.vercel.app/',
  },
];

export const ProjectsSection = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filterOptions = [
    { id: 'all', label: t('projects.filter.all'), match: 'All Projects' },
    { id: 'ai', label: t('projects.filter.ai'), match: 'AI & Multi-Agent' },
    { id: 'backend', label: t('projects.filter.backend'), match: 'Production & Backends' },
    { id: 'web', label: t('projects.filter.web'), match: 'Web Applications' },
  ];

  const filteredProjects = useMemo(() => {
    const selectedFilter = filterOptions.find((f) => f.id === activeCategory);
    const targetMatch = selectedFilter?.match || 'All Projects';

    return projects.filter((p) => {
      const matchesCategory =
        targetMatch === 'All Projects' || p.category === targetMatch;
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, filterOptions]);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 relative bg-black font-mono">
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
            <Terminal size={12} />
            <span>{t('projects.tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
            {t('projects.title1')} <span className="text-neutral-400">{t('projects.title2')}</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400 leading-relaxed font-sans">
            {t('projects.desc')}
          </p>
        </motion.div>

        {/* Clean Filter Pills & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-8">
          <div className="flex flex-wrap gap-1.5 p-1 rounded-lg bg-neutral-950 border border-white/10 text-xs">
            {filterOptions.map((opt) => {
              const isActive = activeCategory === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setActiveCategory(opt.id)}
                  className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-white text-black font-semibold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          <div className="relative w-full sm:w-64">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('projects.search')}
              className="w-full bg-neutral-950 border border-white/15 focus:border-white rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-neutral-600 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Projects Grid - 2x3 clean layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              viewport={{ once: true }}
              className="glass-card rounded-xl border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between tech-bracket relative group"
            >
              <div>
                {/* Image Banner */}
                <div className="relative aspect-video bg-neutral-950 overflow-hidden rounded-t-xl scanline">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 filter grayscale contrast-125 group-hover:filter-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono border bg-black/80 text-white border-white/20">
                      {project.code} // {project.badge}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <h3 className="text-sm sm:text-base font-bold text-white flex items-center justify-between">
                    <span>{project.title}</span>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-neutral-400 hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
                      title="Inspect details"
                    >
                      <ArrowUpRight size={15} />
                    </button>
                  </h3>
                  <p className="text-[11px] text-neutral-400 mt-0.5">{project.subtitle}</p>
                  
                  <p className="mt-2.5 text-xs text-neutral-400 leading-relaxed font-sans line-clamp-3">
                    {project.description}
                  </p>

                  <div className="mt-3.5 flex flex-wrap gap-1">
                    {project.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-[10px] rounded bg-white/[0.04] text-neutral-300 border border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-1.5 py-0.5 text-[10px] rounded bg-white/[0.04] text-neutral-500 border border-white/10">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 sm:p-5 pt-0 border-t border-white/10 mt-2 flex items-center gap-2">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="flex-1 h-8 rounded-lg border border-white/15 bg-white/[0.03] hover:bg-white/10 text-white text-[11px] font-medium flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <Activity size={12} />
                  <span>{t('projects.btn.arch')}</span>
                </button>

                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <button
                      className="w-full h-8 rounded-lg bg-white text-black font-semibold text-[11px] uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <ExternalLink size={12} />
                      <span>{t('projects.btn.live')}</span>
                    </button>
                  </a>
                )}

                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <button
                      className="w-8 h-8 rounded-lg border border-white/15 hover:bg-white/10 text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                      title="GitHub"
                    >
                      <Github size={13} />
                    </button>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Architecture Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-neutral-950 max-w-xl w-full max-h-[88vh] overflow-y-auto rounded-2xl p-5 sm:p-6 border border-white/20 tech-bracket relative shadow-2xl"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/10 hover:bg-white hover:text-black text-white transition-colors"
              >
                <X size={15} />
              </button>

              <div className="flex items-center gap-2 mb-2 text-xs">
                <span className="px-2 py-0.5 rounded bg-white text-black font-semibold text-[10px]">
                  {selectedProject.code}
                </span>
                <span className="text-neutral-400">• {selectedProject.badge}</span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white">
                {selectedProject.title}
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">{selectedProject.subtitle}</p>

              <div className="mt-4 rounded-lg overflow-hidden aspect-video border border-white/10 bg-black">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <h4 className="text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5">
                    Overview
                  </h4>
                  <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                    {selectedProject.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-[11px] uppercase tracking-wider text-neutral-400 mb-2">
                    Key Architecture Details
                  </h4>
                  <ul className="space-y-1.5 font-sans">
                    {selectedProject.architecture.map((item, idx) => (
                      <li key={idx} className="text-xs text-neutral-300 flex items-start gap-2">
                        <CheckCircle2 size={13} className="text-white shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-[11px] uppercase tracking-wider text-neutral-400 mb-2">
                    Stack Used
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-[10px] rounded bg-white/[0.06] text-white border border-white/15"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2.5">
                  {selectedProject.live && (
                    <a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-lg bg-white text-black font-semibold text-xs flex items-center gap-1.5 hover:bg-neutral-200"
                    >
                      <span>Live Site</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-lg border border-white/20 bg-white/5 text-white text-xs flex items-center gap-1.5 hover:bg-white/10"
                    >
                      <Github size={13} />
                      <span>Source</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
