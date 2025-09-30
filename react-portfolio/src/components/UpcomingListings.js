import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const UpcomingListings = () => {
  const [progressValues, setProgressValues] = useState({});

  const listings = [
    {
      id: 1,
      title: 'SmartSkillMatch',
      description: 'AI-powered job matching platform',
      progress: 85,
      status: 'In Progress',
      statusColor: 'text-yellow-400',
      date: 'Q4 2024'
    },
    {
      id: 2,
      title: 'Healthcare Analytics Dashboard',
      description: 'Real-time patient data visualization',
      progress: 60,
      status: 'Development',
      statusColor: 'text-blue-400',
      date: 'Q1 2025'
    },
    {
      id: 3,
      title: 'FinTech Risk Assessment',
      description: 'ML-based credit scoring system',
      progress: 40,
      status: 'Planning',
      statusColor: 'text-gray-400',
      date: 'Q2 2025'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      const newProgress = {};
      listings.forEach(listing => {
        newProgress[listing.id] = listing.progress;
      });
      setProgressValues(newProgress);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

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

  return (
    <div className="panel">
      <motion.h3 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-lg font-semibold text-dark-text mb-4"
      >
        Upcoming Listings
      </motion.h3>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {listings.map((listing) => (
          <motion.div
            key={listing.id}
            variants={itemVariants}
            className="bg-gray-800 border border-dark-border rounded-lg p-4"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
            }}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-dark-text mb-1">{listing.title}</h4>
                <p className="text-sm text-dark-muted mb-2">{listing.description}</p>
                <div className="flex items-center space-x-4 text-xs">
                  <span className={`font-medium ${listing.statusColor}`}>
                    {listing.status}
                  </span>
                  <span className="text-dark-muted">
                    Expected: {listing.date}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-accent-cyan">
                  {progressValues[listing.id] || 0}%
                </div>
              </div>
            </div>
            
            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-accent-blue to-accent-cyan rounded-full"
                initial={{ width: 0 }}
                animate={{ 
                  width: `${progressValues[listing.id] || 0}%` 
                }}
                transition={{ 
                  duration: 1.5, 
                  ease: "easeOut",
                  delay: 0.2 
                }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default UpcomingListings;
