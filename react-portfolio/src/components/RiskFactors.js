import React from 'react';
import { motion } from 'framer-motion';

const RiskFactors = () => {
  const risks = [
    {
      id: 1,
      text: "May occasionally over-engineer solutions due to enthusiasm for clean code architecture.",
      isPlayful: false
    },
    {
      id: 2,
      text: "Tendency to deep-dive into research papers during coffee breaks.",
      isPlayful: true
    },
    {
      id: 3,
      text: "Learning curve associated with emerging technologies and frameworks.",
      isPlayful: false
    },
    {
      id: 4,
      text: "May suggest 'just one more feature' during project demos.",
      isPlayful: true
    },
    {
      id: 5,
      text: "Time zone coordination challenges for distributed team collaboration.",
      isPlayful: false
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="panel">
      <motion.h3 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-lg font-semibold text-dark-text mb-4"
      >
        Risk Factors
      </motion.h3>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {risks.map((risk) => (
          <motion.div
            key={risk.id}
            variants={itemVariants}
            className="bg-gray-800 border border-gray-600 rounded-lg p-3 text-sm text-gray-300 italic cursor-pointer"
            whileHover={{ 
              scale: risk.isPlayful ? 1.02 : 1.01,
              rotate: risk.isPlayful ? -1 : 0,
              y: risk.isPlayful ? -2 : 0,
              boxShadow: risk.isPlayful 
                ? "0 4px 20px rgba(255, 209, 102, 0.1)" 
                : "0 2px 10px rgba(0,0,0,0.2)"
            }}
            transition={{ 
              duration: 0.2,
              ease: "easeOut"
            }}
          >
            <div className="flex items-start space-x-2">
              <span className="text-yellow-400 mt-0.5">⚠️</span>
              <p className="flex-1 leading-relaxed">
                {risk.text}
              </p>
              {risk.isPlayful && (
                <motion.span 
                  className="text-yellow-400 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  ☕
                </motion.span>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-4 text-xs text-dark-muted italic"
      >
        * Risk factors are provided for informational purposes and should not be considered as investment advice.
      </motion.div>
    </div>
  );
};

export default RiskFactors;
