import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.closest('a') ||
        e.target.closest('button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Outer trailing circle */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border-2 border-primary-500 pointer-events-none z-[100] hidden md:block mix-blend-difference"
        animate={{
          x: mousePosition.x - (isHovering ? 24 : 16),
          y: mousePosition.y - (isHovering ? 24 : 16),
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.5
        }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-primary-500 pointer-events-none z-[100] hidden md:block"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          width: 8,
          height: 8,
          scale: isHovering ? 0 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.1
        }}
      />
      {/* Glow effect trailing */}
      <motion.div
        className="fixed top-0 left-0 w-64 h-64 rounded-full bg-primary-500/20 mix-blend-screen filter blur-[60px] pointer-events-none z-0 hidden md:block"
        animate={{
          x: mousePosition.x - 128,
          y: mousePosition.y - 128,
        }}
        transition={{
          type: "tween",
          ease: "linear",
          duration: 0.2
        }}
      />
    </>
  );
};

export default CustomCursor;
