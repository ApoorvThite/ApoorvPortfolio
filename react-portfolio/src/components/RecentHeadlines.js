import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const RecentHeadlines = () => {
  const [isPaused, setIsPaused] = useState(false);

  const headlines = [
    {
      id: 1,
      title: 'Parkinson\'s Detection Model Achieves 96% Accuracy',
      date: '2024-03-15',
      category: 'Research',
      link: '#'
    },
    {
      id: 2,
      title: 'EcoSplit App Reaches 1,200+ Active Users',
      date: '2024-03-10',
      category: 'Product',
      link: '#'
    },
    {
      id: 3,
      title: 'Published Paper on Urban Soundscape Analysis',
      date: '2024-03-05',
      category: 'Academic',
      link: '#'
    },
    {
      id: 4,
      title: 'SmartSkillMatch Platform Beta Launch',
      date: '2024-02-28',
      category: 'Product',
      link: '#'
    },
    {
      id: 5,
      title: 'Dean\'s List Recognition - All Semesters',
      date: '2024-02-20',
      category: 'Academic',
      link: '#'
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Research':
        return 'text-green-400 border-green-400';
      case 'Product':
        return 'text-blue-400 border-blue-400';
      case 'Academic':
        return 'text-yellow-400 border-yellow-400';
      default:
        return 'text-gray-400 border-gray-400';
    }
  };

  return (
    <div className="panel">
      <motion.h3 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-lg font-semibold text-dark-text mb-4"
      >
        Recent Headlines
      </motion.h3>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3 max-h-64 overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          className="space-y-3"
          animate={{
            y: isPaused ? 0 : [-0, -20, -40, -60, -80]
          }}
          transition={{
            duration: isPaused ? 0 : 15,
            repeat: isPaused ? 0 : Infinity,
            ease: "linear"
          }}
        >
          {[...headlines, ...headlines].map((headline, index) => (
            <motion.a
              key={`${headline.id}-${index}`}
              href={headline.link}
              variants={itemVariants}
              className="block bg-gray-800 border border-dark-border rounded-lg p-3 hover:border-accent-cyan transition-all duration-200 group"
              whileHover={{ 
                scale: 1.02,
                x: 5
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-dark-text group-hover:text-accent-cyan transition-colors line-clamp-2">
                  {headline.title}
                </h4>
                <span className={`text-xs px-2 py-1 rounded border ${getCategoryColor(headline.category)} ml-2 flex-shrink-0`}>
                  {headline.category}
                </span>
              </div>
              <div className="text-xs text-dark-muted">
                {new Date(headline.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RecentHeadlines;
