import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RoamingRobot = () => {
  const [news, setNews] = useState([]);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  // Fetch News from Hacker News
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
        const ids = await response.json();
        const top5Ids = ids.slice(0, 5); // Just top 5 to keep it fresh
        
        const storyPromises = top5Ids.map(id =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.json())
        );

        const stories = await Promise.all(storyPromises);
        setNews(stories);
      } catch (error) {
        console.error("Failed to fetch HN news:", error);
      }
    };
    fetchNews();
  }, []);

  // Cycle through news every 5 seconds
  useEffect(() => {
    if (news.length === 0) return;
    const interval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % news.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [news]);

  return (
    <motion.div
      className="fixed bottom-4 right-4 md:bottom-12 md:right-12 z-[100] pointer-events-none drop-shadow-2xl scale-[0.6] md:scale-[0.8] origin-bottom-right"
    >
      <motion.div
        className="relative flex items-center justify-center pointer-events-auto cursor-pointer"
        animate={{ y: [-15, 0, -15] }} // Floating effect (modified to avoid clipping bottom)
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
      >
        {/* TABLET SCREEN (Left side) */}
        <div className="relative z-20 mr-[-30px] mt-10">
          <div className="w-56 h-40 bg-slate-900 rounded-xl border-8 border-slate-800 shadow-2xl p-2 flex flex-col relative transform -rotate-2">
            {/* The actual screen */}
            <div className="w-full h-full bg-gradient-to-b from-cyan-400 to-blue-500 rounded flex flex-col overflow-hidden relative shadow-[inset_0_0_15px_rgba(0,0,0,0.4)]">
              {/* Scanline effect */}
              <motion.div 
                className="absolute top-0 left-0 w-full h-1 bg-white/30"
                animate={{ y: [0, 130] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Top Bar */}
              <div className="bg-slate-900/40 text-[10px] text-white px-2 py-1 font-bold tracking-widest text-center shadow-sm">
                TECH NEWS LIVE
              </div>
              
              {/* News Content */}
              <div className="flex-1 p-2 flex items-center justify-center text-white text-center">
                {news.length === 0 ? (
                  <span className="text-sm font-mono animate-pulse">Loading data...</span>
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentNewsIndex}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <a 
                        href={news[currentNewsIndex]?.url || `https://news.ycombinator.com/item?id=${news[currentNewsIndex]?.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs md:text-sm font-semibold leading-tight hover:underline line-clamp-4"
                      >
                        {news[currentNewsIndex]?.title}
                      </a>
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            </div>
            
            {/* Robot's hand holding the tablet */}
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-8 h-12 bg-slate-100 border border-slate-300 rounded-l-2xl z-30 shadow-md">
              {/* Finger lines */}
              <div className="w-4 h-[1px] bg-slate-300 my-2 mx-auto"></div>
              <div className="w-4 h-[1px] bg-slate-300 my-2 mx-auto"></div>
              <div className="w-4 h-[1px] bg-slate-300 my-2 mx-auto"></div>
            </div>
          </div>
        </div>

        {/* ROBOT BODY (Right side) */}
        <div className="relative flex flex-col items-center">
          
          {/* Head */}
          <motion.div 
            className="w-32 h-28 bg-white rounded-[50px] shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.1),0_10px_15px_rgba(0,0,0,0.2)] border border-slate-200 flex items-center justify-center relative z-20"
            animate={{ rotateZ: [-2, 2, -2] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Visor */}
            <div className="w-24 h-14 bg-slate-900 rounded-2xl overflow-hidden relative shadow-[inset_0_5px_10px_rgba(0,0,0,0.5)]">
              {/* Visor reflection */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10 rounded-b-[40px]"></div>
              {/* Glowing Eyes */}
              <motion.div 
                className="absolute top-1/2 left-0 w-full h-2 bg-cyan-400 blur-md opacity-80"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
            {/* Ears */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-4 h-12 bg-cyan-500 rounded-l-full shadow-inner border border-cyan-600"></div>
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-4 h-12 bg-cyan-500 rounded-r-full shadow-inner border border-cyan-600"></div>
          </motion.div>

          {/* Neck */}
          <div className="w-10 h-8 bg-slate-700 -mt-2 shadow-inner z-10 flex flex-col justify-evenly py-1">
             <div className="w-full h-1 bg-slate-600"></div>
             <div className="w-full h-1 bg-slate-600"></div>
          </div>

          {/* Torso */}
          <div className="w-40 h-44 bg-white rounded-t-[60px] rounded-b-[40px] shadow-[inset_-15px_-15px_30px_rgba(0,0,0,0.1),0_15px_25px_rgba(0,0,0,0.3)] border border-slate-200 relative z-20 flex flex-col items-center pt-8">
            {/* Chest Detail */}
            <div className="w-20 h-16 bg-slate-800 rounded-3xl shadow-inner relative overflow-hidden">
               <motion.div 
                 className="absolute bottom-2 left-2 w-3 h-3 bg-red-500 rounded-full"
                 animate={{ opacity: [1, 0, 1] }}
                 transition={{ duration: 1, repeat: Infinity }}
               />
               <div className="absolute top-2 right-2 flex space-x-1">
                 <div className="w-2 h-4 bg-green-400 rounded-sm"></div>
                 <div className="w-2 h-6 bg-green-400 rounded-sm"></div>
               </div>
            </div>
            {/* Stomach Joint */}
            <div className="absolute -bottom-6 w-16 h-12 bg-slate-700 rounded-full shadow-inner z-[-1]"></div>
          </div>

          {/* Right Arm (Reaching out to hold tablet) */}
          <div className="absolute top-36 left-0 origin-right -rotate-12 z-0">
             <div className="w-12 h-12 bg-slate-700 rounded-full shadow-inner absolute -left-6 top-0"></div>
             <div className="w-32 h-10 bg-white rounded-full border border-slate-200 absolute -left-32 top-1 shadow-md"></div>
          </div>

          {/* Left Arm (Resting on hip) */}
          <div className="absolute top-36 right-0 origin-left rotate-[45deg] z-30">
             <div className="w-12 h-12 bg-slate-700 rounded-full shadow-inner absolute -right-6 top-0 z-10"></div>
             <div className="w-24 h-10 bg-white rounded-full border border-slate-200 absolute -right-24 top-1 shadow-md z-0"></div>
          </div>

          {/* Legs & Thrusters (Instead of walking, it flies smoothly around) */}
          <div className="flex space-x-8 mt-6 z-10 relative">
             <div className="w-14 h-24 bg-white rounded-t-3xl rounded-b-lg shadow-[inset_-5px_-5px_15px_rgba(0,0,0,0.1)] border border-slate-200 flex flex-col items-center relative">
                <div className="w-10 h-10 bg-slate-800 rounded-full absolute -top-5 shadow-inner"></div>
                {/* Wheels/Thruster cap */}
                <div className="w-16 h-12 bg-slate-800 rounded-t-2xl absolute -bottom-2 z-10 flex justify-center shadow-xl">
                   <div className="w-10 h-2 bg-cyan-400 mt-8 rounded-full shadow-[0_0_15px_cyan]"></div>
                </div>
                {/* Thruster Fire */}
                <motion.div 
                  className="absolute -bottom-16 w-10 h-16 bg-gradient-to-t from-transparent via-cyan-400 to-white rounded-full blur-sm z-0"
                  animate={{ height: [60, 80, 60], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                ></motion.div>
             </div>
             
             <div className="w-14 h-24 bg-white rounded-t-3xl rounded-b-lg shadow-[inset_-5px_-5px_15px_rgba(0,0,0,0.1)] border border-slate-200 flex flex-col items-center relative">
                <div className="w-10 h-10 bg-slate-800 rounded-full absolute -top-5 shadow-inner"></div>
                {/* Wheels/Thruster cap */}
                <div className="w-16 h-12 bg-slate-800 rounded-t-2xl absolute -bottom-2 z-10 flex justify-center shadow-xl">
                   <div className="w-10 h-2 bg-cyan-400 mt-8 rounded-full shadow-[0_0_15px_cyan]"></div>
                </div>
                {/* Thruster Fire */}
                <motion.div 
                  className="absolute -bottom-16 w-10 h-16 bg-gradient-to-t from-transparent via-cyan-400 to-white rounded-full blur-sm z-0"
                  animate={{ height: [60, 80, 60], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                ></motion.div>
             </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RoamingRobot;
