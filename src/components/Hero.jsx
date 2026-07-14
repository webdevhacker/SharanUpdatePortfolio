import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Mouse } from 'lucide-react';

const Typewriter = ({ text, typingSpeed = 150, erasingSpeed = 100, delayBeforeErase = 3000, delayBeforeType = 1000, className = "" }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout;
    if (isTyping) {
      if (displayedText.length < text.length) {
        timeout = setTimeout(() => {
          setDisplayedText(text.slice(0, displayedText.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, delayBeforeErase);
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(text.slice(0, displayedText.length - 1));
        }, erasingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(true);
        }, delayBeforeType);
      }
    }
    
    return () => clearTimeout(timeout);
  }, [displayedText, isTyping, text, typingSpeed, erasingSpeed, delayBeforeErase, delayBeforeType]);
  
  return <span className={className}>{displayedText}<span className="animate-pulse border-r-2 border-primary-500 ml-1"></span></span>;
};

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Floating Elements Background */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-12 h-12 border-4 border-primary-500/30 rounded-lg z-0"
        animate={{ rotate: 360, y: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute bottom-1/3 right-1/4 w-16 h-16 border-4 border-purple-500/30 rounded-full z-0"
        animate={{ rotate: -360, y: [0, 40, 0], x: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute top-1/3 right-1/3 w-8 h-8 bg-primary-400/20 rounded-full z-0"
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="section-container relative z-10 w-full">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-semibold tracking-wider mb-6">
              WEB DEVELOPER
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 min-h-[140px] md:min-h-[180px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Hello, I'm <br className="hidden sm:block" />
            <Typewriter text="Sharan Kumar" delayBeforeType={500} className="gradient-text" /> 
            <motion.span 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 1.8 }}
            >
              👋
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="mt-4 text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Experienced Web Developer adept at building responsive web applications. Collaborative and hardworking team player with critical thinking skills and a systematic approach.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a href="#experience" className="btn-primary group">
              View My Work
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="https://www.linkedin.com/in/sharanindian" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Let's Connect
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-slate-500 dark:text-slate-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <span className="text-sm font-medium mb-2 uppercase tracking-widest">Scroll</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Mouse className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
