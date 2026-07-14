import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ onLoadingComplete }) => {
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    // The animation takes about 3 seconds total (2s draw, 1s fill). 
    // We'll wait 3.5s then trigger removal.
    const timer = setTimeout(() => {
      setIsRemoving(true);
      setTimeout(() => {
        onLoadingComplete();
      }, 800); // Wait for exit animation
    }, 3500);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {!isRemoving && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-light-bg dark:bg-dark-bg transition-colors duration-300"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="relative w-full max-w-lg px-4 flex flex-col items-center">
            <svg viewBox="0 0 600 120" className="w-full h-auto drop-shadow-2xl">
              <text 
                x="50%" 
                y="50%" 
                dominantBaseline="middle" 
                textAnchor="middle" 
                className="text-6xl md:text-7xl font-extrabold tracking-[0.3em] logo-text-animate dark:stroke-primary-400 stroke-primary-600"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                LOADING
              </text>
            </svg>
            <motion.div 
              className="mt-8 h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden w-48"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.div 
                className="h-full bg-gradient-to-r from-primary-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
