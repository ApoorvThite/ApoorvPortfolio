import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import DonutChart from './DonutChart';

const CompanyFactSheet = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const sectorData = [
    { key: 'AI/ML', value: 35, color: '#29d391' },
    { key: 'Data Science', value: 25, color: '#7DF9FF' },
    { key: 'Full‑Stack', value: 20, color: '#ffd166' },
    { key: 'FinTech', value: 20, color: '#ff6b6b' },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className="panel"
    >
      <motion.h3 
        variants={itemVariants}
        className="text-lg font-semibold text-dark-text mb-4"
      >
        Sector Allocation
      </motion.h3>
      
      <div className="flex flex-col lg:flex-row items-start gap-4">
        <motion.div variants={itemVariants} className="flex-shrink-0">
          <DonutChart data={sectorData} />
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex-1 space-y-4">
          <div className="bg-gray-800 border border-dark-border border-l-4 border-l-accent-blue rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="rating-chip">Strong Buy</span>
              <span className="text-dark-text font-medium">Analyst Insight</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              AI/ML represents the largest allocation in Apoorv's skill portfolio, driven by research in 
              Parkinson's detection and applied ML in healthcare. Data Science continues steady growth, 
              with FinTech and Full-Stack supporting diversification.
            </p>
          </div>
        </motion.div>
      </div>

      <motion.ul 
        variants={containerVariants}
        className="mt-4 space-y-2"
      >
        {sectorData.map((item, index) => (
          <motion.li
            key={item.key}
            variants={itemVariants}
            className="donut-legend-item"
            whileHover={{ scale: 1.02, x: 5 }}
          >
            <div 
              className="w-3 h-3 rounded-full shadow-sm"
              style={{ 
                backgroundColor: item.color,
                boxShadow: `0 0 6px ${item.color}`
              }}
            />
            <span className="flex-1">{item.key}</span>
            <span className="text-dark-muted">{item.value}%</span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};

export default CompanyFactSheet;
