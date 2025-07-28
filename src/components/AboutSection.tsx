import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Code, Brain, FlaskConical, Users } from 'lucide-react';

const highlights = [
  {
    icon: Brain,
    title: 'AI Development',
    description: 'Building intelligent solutions with LLMs, fine-tuning, and real-time AI integration.',
  },
  {
    icon: FlaskConical,
    title: 'ML Engineering',
    description: 'Developing data-driven applications using NLP, recommendation systems, and prediction models.',
  },
  {
    icon: Code,
    title: 'Software Projects',
    description: 'Delivering clean, scalable code in Python, C, and full-stack environments.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Working closely with diverse teams in internships, hackathons, and research initiatives.',
  }
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            About <span className="bg-gradient-primary bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I'm Richard B. Melath, a developer passionate about solving real-world problems using AI and clean software engineering.
            I love building systems that are functional, elegant, and impactful — from AI chatbots to full-stack apps.
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Story */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4 sm:space-y-6"
          >
            <Card className="holographic p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">My Journey</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                My journey began with a curiosity for automation and game development, eventually evolving into a
                deep dive into machine learning, LLMs, and full-stack development. Interning at organizations like
                Senscript and Information Kerala Mission allowed me to work with real-world AI applications.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From chatbots and email automation to sustainable project analysis, I enjoy creating systems that
                are both innovative and practical. I continuously explore new tools and love working on projects
                that make a real impact.
              </p>
            </Card>

            {/* Skills/Stack Tags */}
            <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4">
              <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 border border-primary/20 rounded-full text-primary font-medium text-sm sm:text-base">
                Python & Flask
              </span>
              <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-secondary/10 border border-primary/20 rounded-full text-primary font-medium text-sm sm:text-base">
                Machine Learning
              </span>
              <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 border border-primary/20 rounded-full text-primary font-medium text-sm sm:text-base">
                Generative AI (GPT, Gemini)
              </span>
              <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-secondary/10 border border-primary/20 rounded-full text-primary font-medium text-sm sm:text-base">
                Unity & C#
              </span>
              <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 border border-primary/20 rounded-full text-primary font-medium text-sm sm:text-base">
                HTML/CSS, JS
              </span>
            </div>
          </motion.div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.6 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="holographic p-6 h-full hover:scale-105 transition-all duration-300 cursor-pointer">
                  <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                    <highlight.icon size={32} />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{highlight.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {highlight.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
        >
          {[
            { number: '10+', label: 'Projects Built' },
            { number: '4+', label: 'Internships Completed' },
            { number: '15+', label: 'Tech Tools Used' },
            { number: '3+', label: 'Hackathons Participated' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
