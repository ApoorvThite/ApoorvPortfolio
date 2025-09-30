import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AnalystRatings = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const analysts = [
    {
      id: 1,
      name: 'Dr. Sarah Chen',
      title: 'Professor, Data Science',
      rating: 'Strong Buy',
      ratingClass: 'bg-green-900 text-green-200 border-green-700',
      quote: "Apoorv consistently brings data‑driven insights to group projects.",
      image: 'https://placehold.co/64x64/2a2a2a/7DF9FF?text=SC'
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      title: 'Senior ML Engineer',
      rating: 'Outperform',
      ratingClass: 'bg-blue-900 text-blue-200 border-blue-700',
      quote: "Strong technical foundation with excellent problem‑solving skills.",
      image: 'https://placehold.co/64x64/2a2a2a/ffd166?text=MR'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
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
        Analyst Ratings
      </motion.h3>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {analysts.map((analyst) => (
          <motion.div
            key={analyst.id}
            variants={cardVariants}
            className="bg-gray-800 border border-dark-border rounded-lg p-4 cursor-pointer overflow-hidden"
            whileHover={{ 
              scale: 1.02, 
              y: -2,
              boxShadow: "0 8px 25px rgba(0,0,0,0.3)"
            }}
            onHoverStart={() => setHoveredCard(analyst.id)}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <div className="flex items-center space-x-3">
              <motion.div 
                className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gray-600"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <img 
                  src={analyst.image} 
                  alt={analyst.name}
                  className="w-full h-full object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-transparent to-black opacity-0"
                  animate={{ 
                    opacity: hoveredCard === analyst.id ? 0.3 : 0 
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-dark-text">{analyst.name}</h4>
                    <p className="text-sm text-dark-muted">{analyst.title}</p>
                  </div>
                  <motion.span 
                    className={`px-2 py-1 rounded-full text-xs font-medium border ${analyst.ratingClass}`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {analyst.rating}
                  </motion.span>
                </div>
                
                <motion.p 
                  className="text-sm text-gray-300 italic"
                  animate={{
                    opacity: hoveredCard === analyst.id ? 1 : 0.8
                  }}
                >
                  "{analyst.quote}"
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AnalystRatings;
