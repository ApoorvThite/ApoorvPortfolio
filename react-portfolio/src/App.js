import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import CompanyFactSheet from './components/CompanyFactSheet';
import AnalystRatings from './components/AnalystRatings';
import UpcomingListings from './components/UpcomingListings';
import RecentHeadlines from './components/RecentHeadlines';
import RiskFactors from './components/RiskFactors';
import RecruiterToolkit from './components/RecruiterToolkit';
import SVGRadarChart from './components/SVGRadarChart';
import ProjectsWatchlist from './components/ProjectsWatchlist';
import ExperiencePortfolio from './components/ExperiencePortfolio';
import SimpleResearch from './components/SimpleResearch';
import BlogsResearchTerminal from './components/BlogsResearchTerminal';
import ContactOrderTicket from './components/ContactOrderTicket';
import TradingBackground from './components/TradingBackground';

function App() {
  const [currentMode, setCurrentMode] = useState('general');
  const [activeSection, setActiveSection] = useState('home');

  const kpiData = {
    general: {
      totalProjects: 12,
      githubStars: 47,
      contributions: 156,
      experience: '2+ Years'
    },
    recruiter: {
      totalProjects: 8,
      githubStars: 47,
      contributions: 156,
      experience: 'Ready to Start'
    },
    alumni: {
      totalProjects: 12,
      githubStars: 47,
      contributions: 156,
      experience: 'Open to Mentor'
    }
  };

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'research', label: 'Research Papers' },
    { id: 'blog', label: 'Blogs' },
    { id: 'contact', label: 'Contact' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text relative">
      <TradingBackground />
      <div className="relative z-10">
        <Header 
          sections={sections}
          currentMode={currentMode}
          setCurrentMode={setCurrentMode}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        <main className="container mx-auto px-4 py-8">
          <AnimatePresence mode="wait">
            {activeSection === 'home' && (
              <motion.div
                key="home"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="space-y-8"
              >
              <motion.div variants={sectionVariants}>
                <Hero 
                  kpiData={kpiData[currentMode]}
                  currentMode={currentMode}
                />
              </motion.div>

              <motion.div 
                variants={sectionVariants}
                className="grid grid-cols-12 gap-6"
              >
                <div className="col-span-12">
                  <h2 className="text-2xl font-bold text-dark-text mb-6">Company Fact Sheet</h2>
                  <div className="grid grid-cols-12 gap-6">
                    <motion.div 
                      variants={sectionVariants}
                      className="col-span-12 lg:col-span-6"
                    >
                      <CompanyFactSheet />
                    </motion.div>
                    
                    <motion.div 
                      variants={sectionVariants}
                      className="col-span-12 lg:col-span-6"
                    >
                      <SVGRadarChart />
                    </motion.div>

                    <motion.div 
                      variants={sectionVariants}
                      className="col-span-12 lg:col-span-6"
                    >
                      <AnalystRatings />
                    </motion.div>

                    <motion.div 
                      variants={sectionVariants}
                      className="col-span-12 lg:col-span-6"
                    >
                      <UpcomingListings />
                    </motion.div>

                    <motion.div 
                      variants={sectionVariants}
                      className="col-span-12 lg:col-span-5"
                    >
                      <RecentHeadlines />
                    </motion.div>

                    <motion.div 
                      variants={sectionVariants}
                      className="col-span-12 lg:col-span-7"
                    >
                      <RiskFactors />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
              </motion.div>
            )}

          {activeSection === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <ProjectsWatchlist />
            </motion.div>
          )}

          {activeSection === 'experience' && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <ExperiencePortfolio />
            </motion.div>
          )}

          {activeSection === 'research' && (
            <motion.div
              key="research"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <SimpleResearch />
            </motion.div>
          )}

          {activeSection === 'blog' && (
            <motion.div
              key="blog"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <BlogsResearchTerminal />
            </motion.div>
          )}

          {activeSection === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <ContactOrderTicket />
            </motion.div>
          )}

          {activeSection !== 'home' && activeSection !== 'projects' && activeSection !== 'experience' && activeSection !== 'research' && activeSection !== 'contact' && activeSection !== 'blog' && (
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center py-20"
            >
              <h2 className="text-3xl font-bold text-dark-text mb-4">
                {sections.find(s => s.id === activeSection)?.label}
              </h2>
              <p className="text-dark-muted">
                This section is under construction. Coming soon!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      </div>
    </div>
  );
}

export default App;
