import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RecruiterToolkit = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [generatedReport, setGeneratedReport] = useState('');

  const toggleToolkit = () => {
    setIsVisible(!isVisible);
  };

  const generateReport = () => {
    // Simulate AI report generation
    const report = `
Based on the job description analysis, here's Apoorv's compatibility assessment:

🎯 **Match Score: 87%**

**Strengths:**
• Strong AI/ML background aligns with technical requirements
• Proven track record in healthcare applications (Parkinson's detection)
• Full-stack development experience for end-to-end solutions
• Academic excellence with 3.80 GPA and Dean's List recognition

**Key Projects Alignment:**
• SmartSkillMatch platform demonstrates job matching expertise
• EcoSplit shows product development and user growth capabilities
• Research publications indicate strong analytical and communication skills

**Recommendations:**
• Schedule technical interview focusing on ML model deployment
• Discuss healthcare domain experience and regulatory considerations
• Explore collaboration potential with existing data science team

**Next Steps:**
• Technical screening call (30 min)
• Portfolio deep-dive session (45 min)
• Team culture fit interview (30 min)
    `;
    
    setGeneratedReport(report);
  };

  const sidebarVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={toggleToolkit}
        className="fixed top-4 right-4 z-50 bg-accent-blue text-white p-3 rounded-full shadow-lg hover:bg-opacity-90"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      </motion.button>

      {/* Sidebar */}
      <AnimatePresence>
        {isVisible && (
          <motion.aside
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed top-0 right-0 h-full w-80 bg-dark-panel border-l border-dark-border z-40 p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-dark-text">Recruiter Toolkit</h3>
              <motion.button
                onClick={toggleToolkit}
                className="text-dark-muted hover:text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
            </div>

            <div className="space-y-4">
              <motion.button
                onClick={() => window.open('resume.pdf', '_blank')}
                className="w-full bg-accent-blue text-white py-3 px-4 rounded-lg font-medium hover:bg-opacity-90 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                📄 Export 1-Pager
              </motion.button>

              <motion.button
                onClick={() => setShowModal(true)}
                className="w-full bg-accent-green text-white py-3 px-4 rounded-lg font-medium hover:bg-opacity-90 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                🤖 AI Compatibility Report
              </motion.button>

              <motion.button
                onClick={() => window.open('mailto:apoorv@example.com?subject=Interview Opportunity', '_blank')}
                className="w-full bg-accent-cyan text-dark-bg py-3 px-4 rounded-lg font-medium hover:bg-opacity-90 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                📅 Book 15-min Slot
              </motion.button>

              <motion.button
                className="w-full bg-gray-700 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-600 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                📦 Send Project Bundle
              </motion.button>
            </div>

            <div className="mt-8 p-4 bg-gray-800 rounded-lg border border-dark-border">
              <h4 className="font-semibold text-dark-text mb-2">Quick Stats</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-dark-muted">Response Rate:</span>
                  <span className="text-accent-green">98%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-muted">Avg. Response Time:</span>
                  <span className="text-accent-cyan">2 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-muted">Interview Success:</span>
                  <span className="text-accent-yellow">85%</span>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* AI Report Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="bg-dark-panel border border-dark-border rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-dark-text">AI Compatibility Report</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-dark-muted hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-dark-text mb-2">
                    Job Description
                  </label>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the job description here..."
                    className="w-full h-32 bg-gray-800 border border-dark-border rounded-lg p-3 text-white placeholder-gray-400 resize-none"
                  />
                </div>

                <motion.button
                  onClick={generateReport}
                  disabled={!jobDescription.trim()}
                  className="w-full bg-accent-green text-white py-3 px-4 rounded-lg font-medium hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: jobDescription.trim() ? 1.02 : 1 }}
                  whileTap={{ scale: jobDescription.trim() ? 0.98 : 1 }}
                >
                  Generate Compatibility Report
                </motion.button>

                {generatedReport && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-800 border border-dark-border rounded-lg p-4"
                  >
                    <h4 className="font-semibold text-dark-text mb-3">Generated Report</h4>
                    <div className="text-sm text-gray-300 whitespace-pre-line">
                      {generatedReport}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-25 z-30"
            onClick={toggleToolkit}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default RecruiterToolkit;
