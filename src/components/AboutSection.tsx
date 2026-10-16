import { motion } from 'framer-motion';
import { 
  Brain, 
  Server, 
  BookOpen, 
  Sparkles, 
  GraduationCap, 
  Terminal, 
  ShieldCheck, 
  ArrowUpRight,
  Cpu
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const AboutSection = () => {
  const { language, t } = useLanguage();

  const corePillars = [
    {
      code: '01 // ARCHITECTURE',
      icon: Server,
      title: language === 'de' ? 'Skalierbare Backend-Systeme' : 'Scalable Backend Systems',
      description: language === 'de'
        ? 'FastAPI-Microservices, Docker-Containerisierung, asynchrone Endpunkte und robuste Datenarchitekturen mit MongoDB und SQL.'
        : 'FastAPI microservices, Docker containerization, asynchronous endpoints, and resilient data modeling with MongoDB and SQL.',
    },
    {
      code: '02 // INTELLIGENCE',
      icon: Brain,
      title: language === 'de' ? 'Agentic AI & LLM-Systeme' : 'Agentic AI & LLM Systems',
      description: language === 'de'
        ? 'Multi-Agenten-Reasoning, kontextsensitive RAG-Pipelines und produktive Sprachmodell-Integrationen mit strukturierter Evaluierung.'
        : 'Multi-agent reasoning simulations, context-aware RAG pipelines, and production LLM integrations with structured evaluation.',
    },
    {
      code: '03 // RESEARCH',
      icon: BookOpen,
      title: language === 'de' ? 'Wissenschaftliche Forschung' : 'Scientific Research',
      description: language === 'de'
        ? 'Koautor begutachteter Veröffentlichungen in Deep Learning & Robotik (IEEE & IJISAE); Masterstudium Data Science an der Uni Trier.'
        : 'Co-author of peer-reviewed research in deep learning and robotics indexed in IEEE and IJISAE; pursuing M.Sc. Data Science.',
    },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 relative bg-black">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-neutral-300 text-xs font-mono font-medium mb-3">
            <Terminal size={12} className="text-white" />
            <span>{t('about.tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white font-mono uppercase">
            {t('about.title1')} <span className="text-neutral-400">{t('about.title2')}</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-400 leading-relaxed font-sans max-w-2xl mx-auto">
            {t('about.desc')}
          </p>
        </motion.div>

        {/* Clean Executive Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* Left Column: Clean Minimalist Portrait & Quick Ident (lg:col-span-4) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-4 flex flex-col"
          >
            <div className="glass-card p-5 sm:p-6 rounded-2xl h-full flex flex-col justify-between border border-white/10 tech-bracket relative group">
              <div>
                {/* Telemetry Header */}
                <div className="flex items-center justify-between mb-4 text-[10px] font-mono">
                  <div className="flex items-center gap-2 text-neutral-300">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span>TRIER, GERMANY</span>
                  </div>
                  <span className="text-neutral-500 tracking-wider">M.SC. DATA SCIENCE</span>
                </div>

                {/* Portrait Container */}
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-neutral-950 border border-white/10 group">
                  <img
                    src="/richard_portrait.jpg"
                    alt="Richard Biju Melath"
                    className="w-full h-full object-cover grayscale contrast-110 brightness-95 group-hover:scale-[1.03] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 ease-out"
                  />

                  {/* Subtle Monochrome Vignette & Cyber Accent */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                  {/* Clean Bottom Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-black/80 backdrop-blur-md border border-white/10">
                    <div className="text-sm font-bold text-white font-mono tracking-tight">
                      Richard Biju Melath
                    </div>
                    <div className="text-xs text-neutral-300 font-sans mt-0.5">
                      Agentic AI Specialist & Systems Engineer
                    </div>
                  </div>
                </div>
              </div>

              {/* Status & Focus Tags */}
              <div className="mt-4 pt-3.5 border-t border-white/10 space-y-2.5">
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span>Current Status:</span>
                  <span className="text-white font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Open to AI & Dev Roles
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                  <span className="px-2.5 py-1 rounded-md bg-white/[0.04] text-neutral-300 border border-white/10">
                    Agentic AI
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-white/[0.04] text-neutral-300 border border-white/10">
                    LLMs & RAG
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-white/[0.04] text-neutral-300 border border-white/10">
                    FastAPI
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-white text-black font-semibold">
                    DoctorAssist.ai
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Executive Narrative & Core Value Indicators (lg:col-span-8) */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-5">
            
            {/* Executive Narrative Dossier */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              viewport={{ once: true }}
              className="glass-card p-6 sm:p-7 rounded-2xl border border-white/10 tech-bracket relative group flex-1 flex flex-col justify-between"
            >
              <div>
                {/* Dossier Header */}
                <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-white">
                      <Sparkles size={14} />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white font-mono tracking-tight">
                        {t('about.profile.title')}
                      </h3>
                      <p className="text-[11px] text-neutral-500 font-mono">
                        {t('about.profile.sub')}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-white bg-white/10 border border-white/20 px-2.5 py-0.5 rounded-full">
                    PRODUCTION & RESEARCH
                  </span>
                </div>

                {/* Clean, High-Legibility Narrative */}
                <div className="space-y-3.5 text-neutral-300 text-xs sm:text-sm leading-relaxed font-sans">
                  <p>{t('about.p1')}</p>
                  <p>{t('about.p2')}</p>
                </div>
              </div>

              {/* 3 Key Value Indicator Cards - Crisp & Spacious */}
              <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
                {/* Badge 1: Specialization (Elevated from old "Focus") */}
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-neutral-500 uppercase tracking-wider">
                      {t('about.badge1.title')}
                    </span>
                    <Cpu size={12} className="text-neutral-400" />
                  </div>
                  <div className="text-sm font-bold text-white mt-1">
                    {t('about.badge1.val')}
                  </div>
                  <div className="text-[10px] text-neutral-400 mt-0.5 font-sans">
                    {t('about.badge1.sub')}
                  </div>
                </div>

                {/* Badge 2: Research */}
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-neutral-500 uppercase tracking-wider">
                      {t('about.badge2.title')}
                    </span>
                    <BookOpen size={12} className="text-neutral-400" />
                  </div>
                  <div className="text-sm font-bold text-white mt-1">
                    {t('about.badge2.val')}
                  </div>
                  <div className="text-[10px] text-neutral-400 mt-0.5 font-sans">
                    {t('about.badge2.sub')}
                  </div>
                </div>

                {/* Badge 3: Academic Focus */}
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-neutral-500 uppercase tracking-wider">
                      {t('about.badge3.title')}
                    </span>
                    <GraduationCap size={12} className="text-neutral-400" />
                  </div>
                  <div className="text-sm font-bold text-white mt-1">
                    {t('about.badge3.val')}
                  </div>
                  <div className="text-[10px] text-neutral-400 mt-0.5 font-sans">
                    {t('about.badge3.sub')}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Dual Highlights: Live Production Role & Academic Credentials */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* DoctorAssist.ai Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="glass-card p-5 rounded-2xl border border-white/10 tech-bracket flex flex-col justify-between hover:border-white/20 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                      {t('about.role.label')}
                    </span>
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white font-mono">
                    DoctorAssist.ai
                  </h4>
                  <p className="text-xs text-neutral-400 font-mono mt-0.5">
                    Saraswatha Healthcare Research • Bangalore
                  </p>

                  <p className="mt-2.5 text-xs text-neutral-300 leading-relaxed font-sans">
                    {t('about.role.desc')}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400 font-mono">
                  <span className="flex items-center gap-1.5 text-[11px]">
                    <ShieldCheck size={13} className="text-white" />
                    Clinical AI Platform
                  </span>
                  <a 
                    href="#experience" 
                    className="text-white hover:underline flex items-center gap-1 text-[11px] font-medium"
                  >
                    {t('about.role.link')} <ArrowUpRight size={12} />
                  </a>
                </div>
              </motion.div>

              {/* Academic Credentials Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                viewport={{ once: true }}
                className="glass-card p-5 rounded-2xl border border-white/10 tech-bracket flex flex-col justify-between hover:border-white/20 transition-colors"
              >
                <div>
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-white shrink-0">
                      <GraduationCap size={15} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white font-mono">
                        {t('about.edu.title')}
                      </h4>
                      <p className="text-xs text-neutral-400 mt-0.5 font-sans">
                        {t('about.edu.desc')}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3.5 text-xs text-neutral-300 font-sans leading-relaxed">
                    Advanced research in high-dimensional data analysis, autonomous agents, and deep neural architectures.
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-black bg-white px-2 py-0.5 rounded font-semibold text-[10px]">
                    B.Tech CGPA: 8.52
                  </span>
                  <span className="text-neutral-400 text-[10px]">
                    Trier, Germany
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* 3 Core Capability Pillars - Clean, Spacious & Uncongested */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {corePillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="glass-card p-5 rounded-xl border border-white/10 hover:border-white/30 transition-all duration-200 group tech-bracket relative font-mono"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                    <Icon size={15} />
                  </div>
                  <span className="text-[10px] text-neutral-500">
                    {pillar.code}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-white">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-xs text-neutral-400 leading-relaxed font-sans">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

