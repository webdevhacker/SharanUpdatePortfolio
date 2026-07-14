import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  { name: 'React', category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'JavaScript', category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  { name: 'Tailwind CSS', category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'CSS', category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
  { name: 'HTML', category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
  { name: 'Node.js', category: 'Backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
  { name: 'PHP', category: 'Backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg' },
  { name: 'Python', category: 'Backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  { name: 'WordPress', category: 'CMS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-plain.svg' },
  { name: 'Git', category: 'Version Control', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
  { name: 'GitHub', category: 'Version Control', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
];

const Skills = () => {
  return (
    <section id="skills" className="section-container relative">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">My <span className="gradient-text">Skills</span></h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          A collection of technologies I've been working with recently.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="glass-card p-6 flex flex-col items-center justify-center w-36 h-36 hover:scale-110 transition-transform duration-300 group cursor-default"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 mb-3 group-hover:bg-primary-100 dark:group-hover:bg-slate-700 transition-colors">
              <img src={skill.icon} alt={skill.name} className={`w-10 h-10 object-contain ${skill.name === 'GitHub' || skill.name === 'WordPress' ? 'dark:invert' : ''}`} />
            </div>
            <h3 className="font-semibold text-slate-800 dark:text-white text-center text-sm">{skill.name}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
