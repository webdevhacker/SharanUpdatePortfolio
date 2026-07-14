import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import thewebpeoplelogo from "../assets/thewebpeople.jpeg";
import vibhaalogo from "../assets/vibhaa.png";
import datalorelogo from "../assets/datalore.jpg";
import anideatechlogo from "../assets/anideatech.png";

const experiences = [
  {
    title: "Web Developer",
    company_name: "The Web People",
    date: "July 2025 - Present",
    logo: thewebpeoplelogo,
    points: [
      "Developing powerful Content Management System(CMS) using WordPress.",
      "Created website using custom coding with wordpress.",
      "Expertise in elementor page designs."
    ]
  },
  {
    title: "Sr. Web Developer",
    company_name: "An Idea Tech",
    date: "July 2023 - June 2025",
    logo: anideatechlogo,
    points: [
      "Used WordPress, HTML and Node.js to build strong and engaging web applications.",
      "Helped to create and deliver digital solutions by sharing ideas and offering technical skills for different client’s projects.",
      "Committed to staying current with web development trends by continuously learning new technologies."
    ]
  },
  {
    title: "Jr. Web Developer",
    company_name: "Vibhaa Tech Innovations Pvt. Ltd",
    date: "Aug 2022 - Nov 2022",
    logo: vibhaalogo,
    points: [
      "Planned website development, converting mockups into usable web interfaces.",
      "Collaborated with the design team to improve user experience.",
      "Ensured responsive design and cross-browser compatibility for all projects."
    ]
  },
  {
    title: "Data Science Intern",
    company_name: "DataLore Labs Pvt. Ltd",
    date: "July 2019 - Aug 2019",
    logo: datalorelogo,
    points: [
      "Implemented annual income prediction in Machine Learning using Decision Tree algorithm.",
      "Assisted in data cleaning and preprocessing large datasets for analysis."
    ]
  }
];

const ExperienceCard = ({ experience, index }) => {
  const ref = useRef(null);
  // Trigger when the element crosses the middle 20% of the screen
  const isCentered = useInView(ref, { margin: "-40% 0px -40% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} flex-row group cursor-pointer`}
    >
      <div className="order-1 w-5/12 hidden md:block"></div>
      <div className={`z-20 flex items-center order-1 bg-white shadow-xl w-14 h-14 md:w-16 md:h-16 rounded-full justify-center overflow-hidden border-4 ml-4 md:ml-0 shrink-0 transition-all duration-500 ${isCentered ? 'scale-125 border-primary-400 shadow-[0_0_20px_rgba(14,165,233,0.6)]' : 'border-slate-100 dark:border-slate-800'} group-hover:scale-125 group-hover:border-primary-400 group-hover:shadow-[0_0_20px_rgba(14,165,233,0.6)]`}>
        <img src={experience.logo} alt={experience.company_name} className="w-full h-full object-contain p-1.5" />
      </div>
      <div className={`order-1 glass-card p-5 md:p-6 rounded-lg w-[calc(100%-6rem)] md:w-5/12 ml-4 md:ml-0 transition-colors duration-300 ${isCentered ? 'border-primary-500/50' : ''} group-hover:border-primary-500/50`}>
        <h3 className="font-bold text-lg md:text-xl text-slate-800 dark:text-white mb-1">{experience.title}</h3>
        <h4 className="font-semibold text-primary-600 dark:text-primary-400 mb-2 text-sm md:text-base">{experience.company_name}</h4>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mb-4">{experience.date}</p>
        <ul className="list-disc ml-5 space-y-2 text-slate-600 dark:text-slate-300">
          {experience.points.map((point, i) => (
            <li key={i} className="text-xs md:text-sm leading-relaxed">{point}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="experience" className="section-container relative" ref={ref}>
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Work <span className="gradient-text">Experience</span></h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-4">
          I've worked with all sorts of companies, leveling up my skills and teaming up with smart people. Here's the rundown:
        </p>
      </div>

      <div className="relative wrap overflow-hidden p-2 md:p-4 h-full">
        {/* Background line */}
        <div className="absolute bg-slate-200 dark:bg-slate-700 w-1 h-full md:left-1/2 left-[2.25rem] md:-translate-x-1/2 rounded-full"></div>
        {/* Animated growing line */}
        <motion.div
          className="absolute bg-gradient-to-b from-primary-400 to-purple-500 w-1 h-full md:left-1/2 left-[2.25rem] md:-translate-x-1/2 origin-top z-10 rounded-full shadow-[0_0_15px_rgba(14,165,233,0.5)]"
          style={{ scaleY }}
        ></motion.div>

        {experiences.map((exp, index) => (
          <ExperienceCard key={index} experience={exp} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Experience;
