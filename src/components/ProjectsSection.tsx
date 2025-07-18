'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Play } from 'lucide-react';

const allProjects = [
  {
    title: 'Shankarini – College Chatbot',
    description: 'AI assistant scraping college website to provide live student support.',
    image: './tm.png',
    tech: ['LLM', 'Web Scraping', 'Chatbot'],
    github: '#',
    live: 'https://www.adishankara.ac.in/',
    category: 'AI/ML',
  },
  {
    title: 'Waste Management Assistant',
    description: 'AI chatbot with real-time updates, LLM fine-tuning, and issue tracking.',
    image: './tm.png',
    tech: ['Python', 'Gemini', 'ChatGPT', 'LLM'],
    github: '#',
    live: '#',
    category: 'AI/ML',
  },
  {
    title: 'Food Recommendation System',
    description: 'ML-powered system suggesting meals using NLP & user preferences.',
    image: './tm.png',
    tech: ['Flask', 'ML', 'NLP'],
    github: 'https://github.com/richard-b-melath/Food-Recommendation-System-using-taste',
    live: '#',
    category: 'Web App',
  },
  {
    title: 'Sustainability Analyser',
    description: 'Predict and recommend sustainable alternatives using Watsonx & Flask.',
    image: './tm.png',
    tech: ['Python', 'Watsonx', 'Prompt Engineering'],
    github: 'https://github.com/richard-b-melath/VOXIA',
    live: '#',
    category: 'AI/ML',
  },
  {
    title: 'FPS Game Development',
    description: 'Unity-based 3D shooter game using C# scripting and Blender assets.',
    image: './tm.png',
    tech: ['Unity', 'C#', 'Blender'],
    github: '#',
    live: '#',
    category: 'Game Dev',
  },
  {
    title: 'Prayag24 Event Website',
    description: 'Official responsive event website for the AI department fest.',
    image: './tm.png',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: '#',
    live: 'https://www.prayag24.live/',
    category: 'Web App',
  },
];

const categories = ['All', 'AI/ML', 'Web App', 'Game Dev'];

export const ProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAll, setShowAll] = useState(false);

  const filteredProjects =
    selectedCategory === 'All'
      ? allProjects
      : allProjects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="bg-gradient-primary bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            Real-world applications powered by AI, ML, automation, and clean design.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className={`px-5 py-2 rounded-full ${
                selectedCategory === category
                  ? 'bg-primary text-background'
                  : 'border-primary/30 hover:border-primary text-foreground'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Filtered Projects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="holographic overflow-hidden h-full hover:scale-105 transition-all duration-500">
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute bottom-4 left-4 bg-primary/20 text-primary text-sm px-3 py-1 rounded-full backdrop-blur-sm border border-primary/30">
                    {project.category}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-medium px-2 py-1 border border-secondary/20 bg-secondary/10 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    {/* Live Demo */}
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={project.live === '#' || !project.live}
                      className="flex-1"
                      asChild
                    >
                      {project.live === '#' || !project.live ? (
                        <div className="opacity-50 cursor-not-allowed flex justify-center items-center">
                          <Play size={16} className="mr-2" />
                          Live Demo
                        </div>
                      ) : (
                        <a href={project.live} target="_blank" rel="noopener noreferrer">
                          <Play size={16} className="mr-2" />
                          Live Demo
                        </a>
                      )}
                    </Button>

                    {/* GitHub */}
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={project.github === '#' || !project.github}
                      className="flex-1"
                      asChild
                    >
                      {project.github === '#' || !project.github ? (
                        <div className="opacity-50 cursor-not-allowed flex justify-center items-center">
                          <Github size={16} className="mr-2" />
                          Code
                        </div>
                      ) : (
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github size={16} className="mr-2" />
                          Code
                        </a>
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Toggle Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button
            onClick={() => setShowAll(!showAll)}
            size="lg"
            variant="outline"
            className="holographic border-primary/50 hover:border-primary px-8 py-3"
          >
            {showAll ? 'Close All Projects' : 'View All Projects'}
          </Button>
        </motion.div>

        {/* All Projects Section */}
        {showAll && (
          <div className="mt-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h3 className="text-2xl font-bold text-foreground">All Projects</h3>
              <p className="text-muted-foreground text-sm mt-2">Browse every project I've built.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allProjects.map((project, index) => (
                <motion.div
                  key={project.title + '-all'}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  {/* Card block (same as above) */}
                  <Card className="holographic overflow-hidden h-full hover:scale-105 transition-all duration-500">
                    <div className="relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute bottom-4 left-4 bg-primary/20 text-primary text-sm px-3 py-1 rounded-full backdrop-blur-sm border border-primary/30">
                        {project.category}
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">{project.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs font-medium px-2 py-1 border border-secondary/20 bg-secondary/10 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={project.live === '#' || !project.live}
                          className="flex-1"
                          asChild
                        >
                          {project.live === '#' || !project.live ? (
                            <div className="opacity-50 cursor-not-allowed flex justify-center items-center">
                              <Play size={16} className="mr-2" />
                              Live Demo
                            </div>
                          ) : (
                            <a href={project.live} target="_blank" rel="noopener noreferrer">
                              <Play size={16} className="mr-2" />
                              Live Demo
                            </a>
                          )}
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          disabled={project.github === '#' || !project.github}
                          className="flex-1"
                          asChild
                        >
                          {project.github === '#' || !project.github ? (
                            <div className="opacity-50 cursor-not-allowed flex justify-center items-center">
                              <Github size={16} className="mr-2" />
                              Code
                            </div>
                          ) : (
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github size={16} className="mr-2" />
                              Code
                            </a>
                          )}
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
