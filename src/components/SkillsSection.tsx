import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const skillCategories = [
  {
    category: 'AI / ML & Automation',
    color: 'primary',
    skills: [
      { name: 'Python & Libraries (NumPy, Pandas)', level: 90 },
      { name: 'Machine Learning (Scikit-learn)', level: 85 },
      { name: 'LLMs (ChatGPT, Gemini)', level: 80 },
      { name: 'Prompt Engineering & Watsonx', level: 80 },
      { name: 'UiPath & Automation', level: 75 }
    ]
  },
  {
    category: 'Web Development',
    color: 'primary',
    skills: [
      { name: 'HTML, CSS, JS', level: 90 },
      { name: 'Flask & REST APIs', level: 85 },
      { name: 'WordPress & Wix Studio', level: 80 },
      { name: 'SQL (Intermediate)', level: 70 },
      { name: 'Google Cloud (Beginner)', level: 60 }
    ]
  },
  {
    category: 'Game / Graphics Dev',
    color: 'primary',
    skills: [
      { name: 'C# & Unity', level: 88 },
      { name: 'Blender', level: 80 },
      { name: '3D Game Mechanics', level: 85 },
      { name: 'Visual Studio', level: 78 },
      { name: 'Git & GitHub', level: 90 }
    ]
  }
];

export const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 px-6 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Technical <span className="bg-gradient-primary bg-clip-text text-transparent">Skills</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            My skill set spans across artificial intelligence, machine learning, web development, and 3D game creation.
            I thrive at the intersection of software engineering and creative problem-solving.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="holographic p-8 h-full">
                <div className="text-center mb-8">
                  <h3 className={`text-2xl font-bold mb-4 ${
                    category.color === 'primary' 
                      ? 'text-primary' 
                      : 'text-secondary'
                  }`}>
                    {category.category}
                  </h3>
                </div>

                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.3 
                      }}
                      viewport={{ once: true }}
                      className="space-y-3"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-foreground font-medium">{skill.name}</span>
                        <span className={`text-sm font-bold ${
                          category.color === 'primary' 
                            ? 'text-primary' 
                            : 'text-secondary'
                        }`}>
                          {skill.level}%
                        </span>
                      </div>
                      
                      <div className="relative">
                        <div className="w-full bg-muted/20 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ 
                              duration: 1.5, 
                              delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.5,
                              ease: 'easeOut'
                            }}
                            viewport={{ once: true }}
                            className={`h-2 rounded-full relative overflow-hidden ${
                              category.color === 'primary' 
                                ? 'bg-gradient-primary' 
                                : 'bg-gradient-secondary'
                            }`}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Tools */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold mb-8 text-foreground">
            Additional Tools & Platforms
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'PDFPlumber', 'Tabula', 'ChatGPT API', 'Gemini API', 'Visual Studio Code', 
              'NPTEL Platform', 'Infosys Springboard', 'MathWorks Matlab', 'GitHub Pages', 
              'Wix', 'WordPress', 'IBM Watsonx', 'Google Colab'
            ].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 + 0.8 }}
                viewport={{ once: true }}
                className="px-4 py-2 bg-card/50 border border-primary/20 rounded-full text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
