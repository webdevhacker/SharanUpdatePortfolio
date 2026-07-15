import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, CalendarClock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ darkMode, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showFlag, setShowFlag] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Clock effect
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleFlagClick = () => {
    setShowFlag(true);
    setTimeout(() => {
      setShowFlag(false);
    }, 5000);
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Blog', href: 'https://blog.isharankumar.com', external: true },
  ];

  const formattedDateTime = currentTime.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
            ? 'bg-white/90 dark:bg-dark-bg/90 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-slate-800'
            : 'bg-transparent'
          }`}
      >
        {/* Top Header Bar */}
        <div className={`w-full transition-all duration-300 ${isScrolled ? 'h-0 overflow-hidden opacity-0' : 'h-10 bg-gradient-to-r from-primary-600 via-purple-600 to-primary-600 bg-[length:200%_auto] animate-gradient border-b border-white/10 shadow-inner'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between text-xs font-medium text-white tracking-wide">
            <div className="flex items-center space-x-1.5 md:space-x-2 truncate">
              <CalendarClock size={14} className="text-white/80 shrink-0" />
              <span className="font-mono hidden md:inline-block whitespace-nowrap">
                {currentTime.toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                <span className="mx-2 text-white/50">|</span>
                {currentTime.toLocaleTimeString()}
              </span>
              <span className="font-mono text-[10px] md:hidden whitespace-nowrap tracking-tighter">
                {currentTime.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: '2-digit' })}
                <span className="mx-1 text-white/50">|</span>
                {currentTime.toLocaleTimeString()}
              </span>
            </div>
            
            <div className="flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">
              <span className="italic text-white/90">with love</span>
              <motion.button 
                onClick={handleFlagClick} 
                className="w-6 h-4 flex flex-col shadow-sm ml-2 origin-left rounded-[1px] overflow-hidden"
                animate={{ skewY: [0, -1, 0, 1, 0], scaleX: [1, 0.98, 1, 0.98, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                title="View Flag"
              >
                <div className="w-full h-1/3 bg-[#FF9933]"></div>
                <div className="w-full h-1/3 bg-white flex items-center justify-center py-[1px]">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-[#000080]">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8"/>
                    {Array.from({length: 24}).map((_, i) => (
                      <line key={i} x1="50" y1="50" x2="50" y2="5" stroke="currentColor" strokeWidth="6" transform={`rotate(${i * 15} 50 50)`} />
                    ))}
                    <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="6" />
                  </svg>
                </div>
                <div className="w-full h-1/3 bg-[#138808]"></div>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <a href="#home" className="text-xl md:text-2xl font-bold gradient-text whitespace-nowrap">SHARAN KUMAR</a>
            </div>

            {/* Right Side: Links & Theme */}
            <div className="hidden lg:flex items-center">
              <div className="flex items-center space-x-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-slate-600 hover:text-primary-600 dark:text-slate-300 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    {link.name}
                  </a>
                ))}

                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ml-2"
                  aria-label="Toggle Dark Mode"
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={toggleTheme}
                className="p-2 mr-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-slate-600 dark:text-slate-300"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-dark-card border-b border-slate-200 dark:border-slate-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Full Screen Flag Popup */}
      <AnimatePresence>
        {showFlag && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 cursor-pointer"
            onClick={() => setShowFlag(false)}
          >
            <div className="flex flex-col items-center justify-center w-full" onClick={(e) => e.stopPropagation()}>
              <motion.div 
                initial={{ scale: 0.8, rotateX: 20 }}
                animate={{ 
                  scale: 1, 
                  rotateX: [0, 5, -5, 0],
                  y: [0, -10, 10, 0]
                }}
                transition={{ 
                  duration: 0.5, 
                  rotateX: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
                className="w-full max-w-4xl aspect-video rounded-lg overflow-hidden shadow-[0_0_60px_rgba(255,153,51,0.4)] border-4 border-white/20 flex flex-col"
              >
                <div className="w-full h-1/3 bg-[#FF9933] relative overflow-hidden">
                   {/* Waving shadow effect */}
                   <motion.div 
                     animate={{ x: ["-100%", "100%"] }} 
                     transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                     className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent skew-x-12"
                   />
                </div>
                <div className="w-full h-1/3 bg-white flex items-center justify-center relative overflow-hidden">
                  <motion.div 
                     animate={{ x: ["-100%", "100%"] }} 
                     transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                     className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent skew-x-12 z-10"
                   />
                   <div className="h-[90%] aspect-square p-1 z-0">
                      <motion.svg 
                        viewBox="0 0 100 100" 
                        className="w-full h-full text-[#000080]"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      >
                        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                        {Array.from({length: 24}).map((_, i) => (
                          <line key={i} x1="50" y1="50" x2="50" y2="5" stroke="currentColor" strokeWidth="1" transform={`rotate(${i * 15} 50 50)`} />
                        ))}
                        <circle cx="50" cy="50" r="8" fill="currentColor" />
                      </motion.svg>
                   </div>
                </div>
                <div className="w-full h-1/3 bg-[#138808] relative overflow-hidden">
                   <motion.div 
                     animate={{ x: ["-100%", "100%"] }} 
                     transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                     className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-transparent skew-x-12"
                   />
                </div>
              </motion.div>

              {/* Jai Hind Text */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="mt-8 md:mt-12 text-4xl md:text-7xl font-black uppercase tracking-[0.2em]"
                style={{
                  background: 'linear-gradient(to bottom, #FF9933 0%, #FF9933 33%, #FFFFFF 33%, #FFFFFF 66%, #138808 66%, #138808 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Jai Hind
              </motion.h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
