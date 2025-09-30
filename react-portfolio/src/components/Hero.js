import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SparklineChart from './SparklineChart';

const Hero = ({ kpiData, currentMode }) => {
  const [typewriterText, setTypewriterText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  const texts = [
    "Building AI solutions for healthcare innovation",
    "Transforming data into actionable insights",
    "Creating intelligent systems that matter"
  ];

  useEffect(() => {
    const text = texts[currentTextIndex];
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setTypewriterText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
          setTypewriterText('');
        }, 2000);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [currentTextIndex]);

  const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const kpiVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.3
      }
    }
  };

  const sparklineData = {
    parkAi: [72, 75, 78, 82, 85, 88, 92, 96],
    ecoSplit: [1000, 1050, 1100, 1150, 1200]
  };

  return (
    <motion.section 
      variants={heroVariants}
      initial="hidden"
      animate="visible"
      className="panel hero-enhanced-bg"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <motion.div variants={itemVariants} className="space-y-6">
          <div>
            <motion.h1 
              className="text-4xl lg:text-5xl font-bold text-dark-text mb-4"
              variants={itemVariants}
            >
              Welcome to Apoorv's
              <span className="text-accent-cyan"> Portfolio Exchange</span>
            </motion.h1>
            
            <motion.div 
              className="text-xl text-dark-muted h-8 mb-6"
              variants={itemVariants}
            >
              {typewriterText}
              <span className="animate-pulse">|</span>
            </motion.div>
          </div>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button 
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Resume
            </motion.button>
            <motion.button 
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Top Projects
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex items-center space-x-4">
            <motion.img 
              src="https://placehold.co/160x160/1a1a1a/7DF9FF?text=AT" 
              alt="Apoorv Thite"
              className="w-20 h-20 rounded-full border-2 border-accent-cyan"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            />
            <div>
              <h3 className="text-xl font-semibold text-dark-text">Apoorv Thite</h3>
              <div className="space-y-1 text-sm text-dark-muted">
                <div><strong>Major:</strong> Applied Data Science</div>
                <div><strong>Minor:</strong> Economics</div>
                <div><strong>GPA:</strong> 3.80</div>
                <div><strong>Expected Graduation:</strong> December 2025</div>
                <div><strong>Target Roles:</strong> Data Analyst and Data Scientist</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center gap-6 mx-auto mt-4">
            {/* GitHub */}
            <motion.a
              href="https://github.com/ApoorvThite"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-dark-muted hover:text-accent-cyan transition-colors"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.92 }}
              title="GitHub"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0.297C5.373 0.297 0 5.67 0 12.297c0 5.292 3.438 9.787 8.207 11.387.6.111.793-.261.793-.58 0-.287-.011-1.244-.017-2.257-3.338.726-4.042-1.416-4.042-1.416-.546-1.389-1.333-1.76-1.333-1.76-1.089-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.833 2.809 1.303 3.495.996.108-.775.419-1.303.762-1.603-2.665-.303-5.467-1.333-5.467-5.931 0-1.31.469-2.381 1.237-3.221-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.984-.399 3.005-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.873.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.625-5.48 5.922.43.37.814 1.102.814 2.222 0 1.604-.015 2.896-.015 3.293 0 .321.19.697.8.579C20.565 22.08 24 17.587 24 12.297 24 5.67 18.627.297 12 .297z"/>
              </svg>
            </motion.a>

            {/* LinkedIn */}
            <motion.a
              href="https://linkedin.com/in/apoorvthite21"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-dark-muted hover:text-accent-cyan transition-colors"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.92 }}
              title="LinkedIn"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.451 20.451h-3.554v-5.569c0-1.328-.027-3.036-1.85-3.036-1.853 0-2.136 1.447-2.136 2.943v5.662H9.356V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.368-1.85 3.6 0 4.266 2.37 4.266 5.455v6.285zM5.337 7.433a2.063 2.063 0 1 1 0-4.126 2.063 2.063 0 0 1 0 4.126zM7.114 20.451H3.56V9h3.554v11.451zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
              </svg>
            </motion.a>

            {/* Medium */}
            <motion.a
              href="https://medium.com/@apoorvthite"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Medium"
              className="text-dark-muted hover:text-accent-cyan transition-colors"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.92 }}
              title="Medium"
            >
              <svg width="28" height="28" viewBox="0 0 1043.63 592.71" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M588.67 296.35c0 163.69-131.93 296.36-294.33 296.36S0 460.04 0 296.35 131.93 0 294.33 0s294.34 132.66 294.34 296.35M947.87 296.35c0 154.78-65.96 280.28-147.38 280.28s-147.38-125.5-147.38-280.28 65.96-280.29 147.38-280.29 147.38 125.51 147.38 280.29M1043.63 296.35c0 136.98-23.36 248.04-52.19 248.04s-52.19-111.06-52.19-248.04 23.36-248.05 52.19-248.05 52.19 111.07 52.19 248.05"/>
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>

      <motion.div 
        variants={itemVariants}
        className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {Object.entries(kpiData).map(([key, value], index) => (
          <motion.div
            key={key}
            variants={kpiVariants}
            className="text-center p-4 bg-gray-800 rounded-lg border border-dark-border"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-2xl font-bold text-accent-cyan mb-1">
              {value}
            </div>
            <div className="text-sm text-dark-muted capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <div className="bg-gray-800 rounded-lg p-4 border border-dark-border">
          <h4 className="text-lg font-semibold text-dark-text mb-3">Parkinson's AI Performance</h4>
          <SparklineChart 
            data={sparklineData.parkAi} 
            color="#29d391"
            height={60}
          />
          <div className="text-sm text-dark-muted mt-2">
            Accuracy improvement: 72% → 96% (+24%)
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 border border-dark-border">
          <h4 className="text-lg font-semibold text-dark-text mb-3">EcoSplit User Growth</h4>
          <SparklineChart 
            data={sparklineData.ecoSplit} 
            color="#7DF9FF"
            height={60}
          />
          <div className="text-sm text-dark-muted mt-2">
            Active users: 1,200+ and growing
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
