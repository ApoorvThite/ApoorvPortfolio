import React from 'react';
import { motion } from 'framer-motion';

const Header = ({ sections, activeSection, setActiveSection, currentMode, setCurrentMode }) => {
  const headerVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.header 
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className="bg-dark-panel border-b border-dark-border sticky top-0 z-50 backdrop-blur-sm bg-opacity-95"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.02 }}
          >
            <h1 className="text-xl font-bold text-dark-text">Apoorv Thite Exchange</h1>
            <div className="flex bg-gray-800 rounded-lg p-1">
              {['recruiter', 'alumni'].map((mode) => (
                <motion.button
                  key={mode}
                  onClick={() => setCurrentMode(mode)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-all duration-200 ${
                    currentMode === mode
                      ? 'bg-accent-blue text-white'
                      : 'text-dark-muted hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <nav className="flex space-x-6">
            {sections.map((section, index) => (
              <motion.button
                key={section.id}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveSection(section.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeSection === section.id
                    ? 'bg-accent-blue text-white'
                    : 'text-dark-muted hover:text-white hover:bg-gray-800'
                }`}
              >
                {section.label}
              </motion.button>
            ))}
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
