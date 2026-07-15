import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TopProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setVisible(false), 500);
          return 100;
        }
        // randomly increment
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div 
          className="fixed top-0 left-0 h-1 z-[99999] bg-gradient-to-r from-primary-400 via-purple-500 to-primary-600 shadow-[0_0_10px_rgba(14,165,233,0.7)]"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
      )}
    </AnimatePresence>
  );
};

export default TopProgressBar;
