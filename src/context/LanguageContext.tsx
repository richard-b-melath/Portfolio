import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.research': 'Research',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.experience': 'Experience',
    'nav.contact': 'Contact',
    'nav.card': 'Card',
    'nav.cv': 'CV',

    // Hero
    'hero.badge': 'AGENTIC AI • M.SC. DATA SCIENCE @ TRIER',
    'hero.subtitle1': 'AGENTIC AI SPECIALIST',
    'hero.subtitle2': 'SYSTEMS ENGINEER',
    'hero.bio': "Master's student in Data Science at Trier University, Germany. Passionate engineer who loves to build things that work.",
    'hero.btn.projects': 'Explore Projects',
    'hero.btn.resume': 'Resume [PDF]',
    'hero.scroll': 'Scroll Down',

    // Hero metrics
    'metric.1.val': 'DoctorAssist.ai',
    'metric.1.label': 'Software Developer',
    'metric.1.desc': 'Clinical AI Platform • FastAPI & React',

    'metric.2.val': '2 Publications',
    'metric.2.label': 'IEEE & IJISAE Co-Author',
    'metric.2.desc': 'Deep Learning & AI Robotics Research',

    'metric.3.val': 'M.Sc. Data Science',
    'metric.3.label': 'Universität Trier',
    'metric.3.desc': 'Germany • Advanced Studies',

    'metric.4.val': '8.52 CGPA',
    'metric.4.label': 'B.Tech CSE (AI)',
    'metric.4.desc': 'Adi Shankara Institute (APJAKTU)',

    // About
    'about.tag': '01 // EXECUTIVE SUMMARY',
    'about.title1': 'Engineering AI',
    'about.title2': '& Scalable Systems',
    'about.desc': 'Specializing in agentic AI architectures, clinical intelligence platforms, and high-performance backend systems.',
    'about.profile.title': 'Profile & Core Trajectory',
    'about.profile.sub': 'Data Science & Autonomous Intelligent Systems',
    'about.p1': "Master's student in Data Science at Trier University, Germany. Agentic AI specialist and systems engineer dedicated to building intelligent systems that work reliably in production.",
    'about.p2': 'Proven experience developing clinical AI backends at DoctorAssist.ai, multi-agent reasoning workflows, and document intelligence pipelines. Co-author of peer-reviewed deep learning research indexed in IEEE and IJISAE.',
    'about.badge1.title': 'Specialization',
    'about.badge1.val': 'Agentic AI & LLMs',
    'about.badge1.sub': 'Autonomous Systems & RAG',
    'about.badge2.title': 'Research',
    'about.badge2.val': '2x IEEE & IJISAE',
    'about.badge2.sub': 'Peer-Reviewed Publications',
    'about.badge3.title': 'Academic Focus',
    'about.badge3.val': 'M.Sc. Data Science',
    'about.badge3.sub': 'Universität Trier, Germany',
    'about.role.label': 'Latest Engineering Role',
    'about.role.desc': 'Engineered features for an AI-driven medical software platform. Designed FastAPI microservices, responsive React interfaces, MongoDB database architecture, and Docker containerized deployments.',
    'about.role.link': 'Experience',
    'about.edu.title': 'M.Sc. Data Science & B.Tech CSE (AI)',
    'about.edu.desc': 'Universität Trier (Germany) • Adi Shankara Institute (8.52 CGPA)',

    // Research
    'research.tag': '02 // RESEARCH & HONORS',
    'research.title1': 'Publications &',
    'research.title2': 'Honors',
    'research.desc': 'Peer-reviewed scientific contributions in artificial intelligence, deep learning, and verified competitive achievements.',
    'research.peer': 'Peer-Reviewed Publications',
    'research.view': 'View Paper',
    'research.honors': 'Honors & Hackathon Recognitions',
    'research.verified': 'Verified Citation',

    // Projects
    'projects.tag': '03 // FEATURED PROJECTS',
    'projects.title1': 'Curated',
    'projects.title2': 'Systems',
    'projects.desc': 'Practical AI applications, multi-agent reasoning sandboxes, and production backend services.',
    'projects.filter.all': 'All Projects',
    'projects.filter.ai': 'AI & Multi-Agent',
    'projects.filter.backend': 'Production & Backends',
    'projects.filter.web': 'Web Applications',
    'projects.search': 'Search stack, project...',
    'projects.btn.arch': 'Architecture',
    'projects.btn.live': 'Live',

    // Skills
    'skills.tag': '04 // TECHNICAL SKILLS MATRIX',
    'skills.title1': 'Skills &',
    'skills.title2': 'Tooling',
    'skills.desc': 'Core technical competencies applied across software engineering, machine learning pipelines, and research.',
    'skills.search': 'Search skill (e.g. FastAPI, LLM, Docker)...',
    'skills.lang.title': 'Language Proficiencies',

    // Resume
    'resume.tag': '05 // CAREER RECORD',
    'resume.title1': 'Experience &',
    'resume.title2': 'Education',
    'resume.desc': 'Verified chronology of industry software development, internships, and academic credentials.',
    'resume.download': 'Download CV',
    'resume.tab.exp': 'Work Experience',
    'resume.tab.edu': 'Education',
    'resume.tab.cert': 'Certifications',

    // Contact
    'contact.tag': '06 // CONNECT & INITIATE',
    'contact.title1': 'Get in',
    'contact.title2': 'Touch',
    'contact.desc': 'Open for technical software engineering roles, research collaborations, or intelligent systems development.',
    'contact.form.title': 'Direct Message',
    'contact.form.sub': 'Transmissions delivered straight to active inbox',
    'contact.form.name': 'Name *',
    'contact.form.email': 'Email *',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message *',
    'contact.form.submit': 'Send Message',
    'contact.form.submitting': 'Transmitting...',

    // Visiting Card
    'card.modal.title': 'DIGITAL vCard',
    'card.modal.scan': 'Scan for Digital Visiting Card',
    'card.btn.save': 'Save Contact (.vcf)',
    'card.btn.download': 'Download Card (.html)',
    'card.btn.copied': 'Copied',
    'card.btn.copy': 'Copy Info',
    'card.btn.share': 'Share',
    'card.btn.open': 'Open Full Card Page',
  },
  de: {
    // Nav
    'nav.home': 'Startseite',
    'nav.about': 'Über mich',
    'nav.research': 'Forschung',
    'nav.projects': 'Projekte',
    'nav.skills': 'Fähigkeiten',
    'nav.experience': 'Werdegang',
    'nav.contact': 'Kontakt',
    'nav.card': 'Visitenkarte',
    'nav.cv': 'Lebenslauf',

    // Hero
    'hero.badge': 'AGENTIC AI • M.SC. DATA SCIENCE @ TRIER',
    'hero.subtitle1': 'SPEZIALIST FÜR AGENTIC AI',
    'hero.subtitle2': 'SYSTEMINGENIEUR',
    'hero.bio': 'Masterstudent in Data Science an der Universität Trier. Leidenschaftlicher Entwickler, der funktionierende Systeme baut.',
    'hero.btn.projects': 'Projekte entdecken',
    'hero.btn.resume': 'Lebenslauf [PDF]',
    'hero.scroll': 'Nach unten scrollen',

    // Hero metrics
    'metric.1.val': 'DoctorAssist.ai',
    'metric.1.label': 'Softwareentwickler',
    'metric.1.desc': 'Klinische KI-Plattform • FastAPI & React',

    'metric.2.val': '2 Publikationen',
    'metric.2.label': 'IEEE & IJISAE Koautor',
    'metric.2.desc': 'Deep Learning & KI-Robotik Forschung',

    'metric.3.val': 'M.Sc. Data Science',
    'metric.3.label': 'Universität Trier',
    'metric.3.desc': 'Deutschland • Masterstudium',

    'metric.4.val': '8.52 CGPA',
    'metric.4.label': 'B.Tech CSE (KI)',
    'metric.4.desc': 'Adi Shankara Institut (APJAKTU)',

    // About
    'about.tag': '01 // PROFILÜBERSICHT',
    'about.title1': 'KI & Skalierbare',
    'about.title2': 'Systeme',
    'about.desc': 'Spezialisiert auf Agentic AI-Architekturen, klinische KI-Plattformen und hochperformante Backend-Systeme.',
    'about.profile.title': 'Profil & Werdegang',
    'about.profile.sub': 'Data Science & Autonome Intelligente Systeme',
    'about.p1': 'Masterstudent in Data Science an der Universität Trier. Spezialist für Agentic AI und Systemingenieur mit Leidenschaft für robuste, produktionsreife Lösungen.',
    'about.p2': 'Praktische Erfahrung in der Entwicklung von klinischen KI-Backends bei DoctorAssist.ai, Multi-Agenten-Reasoning-Systemen und Dokumenten-Intelligenz. Koautor begutachteter Forschungspublikationen in IEEE und IJISAE.',
    'about.badge1.title': 'Spezialisierung',
    'about.badge1.val': 'Agentic AI & LLMs',
    'about.badge1.sub': 'Autonome Systeme & RAG',
    'about.badge2.title': 'Forschung',
    'about.badge2.val': '2x IEEE & IJISAE',
    'about.badge2.sub': 'Begutachtete Publikationen',
    'about.badge3.title': 'Aktuelles Studium',
    'about.badge3.val': 'M.Sc. Data Science',
    'about.badge3.sub': 'Universität Trier, Deutschland',
    'about.role.label': 'Aktuelle Softwareentwickler-Rolle',
    'about.role.desc': 'Entwicklung von Funktionen für eine KI-gestützte medizinische Softwareplattform. Konzeption von FastAPI-Microservices, React-Komponenten, MongoDB-Integration und Docker-Containerisierung.',
    'about.role.link': 'Werdegang',
    'about.edu.title': 'M.Sc. Data Science & B.Tech CSE (KI)',
    'about.edu.desc': 'Universität Trier (Deutschland) • Adi Shankara Institut (8.52 CGPA)',

    // Research
    'research.tag': '02 // FORSCHUNG & AUSZEICHNUNGEN',
    'research.title1': 'Publikationen &',
    'research.title2': 'Erfolge',
    'research.desc': 'Begutachtete wissenschaftliche Beiträge in KI, Deep Learning sowie anerkannte Wettbewerbserfolge.',
    'research.peer': 'Begutachtete Publikationen (Peer-Reviewed)',
    'research.view': 'Paper ansehen',
    'research.honors': 'Auszeichnungen & Hackathon-Erfolge',
    'research.verified': 'Verifizierter Nachweis',

    // Projects
    'projects.tag': '03 // AUSGEWÄHLTE PROJEKTE',
    'projects.title1': 'Entwickelte',
    'projects.title2': 'Systeme',
    'projects.desc': 'Praktische KI-Anwendungen, Multi-Agenten-Reasoning-Systeme und produktive Backend-Dienste.',
    'projects.filter.all': 'Alle Projekte',
    'projects.filter.ai': 'KI & Multi-Agenten',
    'projects.filter.backend': 'Backend & Produktion',
    'projects.filter.web': 'Webanwendungen',
    'projects.search': 'Technologie oder Projekt suchen...',
    'projects.btn.arch': 'Architektur',
    'projects.btn.live': 'Live-Demo',

    // Skills
    'skills.tag': '04 // TECHNISCHE KOMPETENZEN',
    'skills.title1': 'Fähigkeiten &',
    'skills.title2': 'Werkzeuge',
    'skills.desc': 'Kernkompetenzen angewandt in Software-Engineering, Machine-Learning-Pipelines und Forschung.',
    'skills.search': 'Fähigkeit suchen (z. B. FastAPI, LLM, Docker)...',
    'skills.lang.title': 'Sprachkenntnisse',

    // Resume
    'resume.tag': '05 // WERDEGANG & AUSBILDUNG',
    'resume.title1': 'Erfahrung &',
    'resume.title2': 'Bildung',
    'resume.desc': 'Verifizierter Werdegang in Softwareentwicklung, Industrie-Praktika und akademischen Abschlüssen.',
    'resume.download': 'Lebenslauf (CV)',
    'resume.tab.exp': 'Berufserfahrung',
    'resume.tab.edu': 'Bildungsweg',
    'resume.tab.cert': 'Zertifikate',

    // Contact
    'contact.tag': '06 // KONTAKTAUFNAHME',
    'contact.title1': 'Kontakt',
    'contact.title2': 'Aufnehmen',
    'contact.desc': 'Offen für Software-Engineering-Positionen, Forschungskooperationen und KI-Systementwicklung.',
    'contact.form.title': 'Direkte Nachricht',
    'contact.form.sub': 'Nachrichten werden direkt an das aktive Postfach übermittelt',
    'contact.form.name': 'Name *',
    'contact.form.email': 'E-Mail-Adresse *',
    'contact.form.subject': 'Betreff',
    'contact.form.message': 'Nachricht *',
    'contact.form.submit': 'Nachricht senden',
    'contact.form.submitting': 'Wird gesendet...',

    // Visiting Card
    'card.modal.title': 'DIGITALE VISITENKARTE',
    'card.modal.scan': 'Scannen für digitale Visitenkarte',
    'card.btn.save': 'Kontakt speichern (.vcf)',
    'card.btn.download': 'Karte herunterladen (.html)',
    'card.btn.copied': 'Kopiert',
    'card.btn.copy': 'Daten kopieren',
    'card.btn.share': 'Teilen',
    'card.btn.open': 'Vollständige Kartenseite öffnen',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('portfolio_lang');
    if (saved === 'de' || saved === 'en') return saved;
    // Check browser language
    if (typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('de')) {
      return 'de';
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('portfolio_lang', lang);
  };

  const toggleLanguage = () => {
    const next = language === 'en' ? 'de' : 'en';
    setLanguage(next);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
