import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SimpleResearch = () => {
  const [expandedPaper, setExpandedPaper] = useState(null);

  const papers = [
    {
      id: 1,
      title: 'Voice Biomarkers for Early Parkinson\'s Disease Detection Using Deep Learning',
      venue: 'ICASSP 2024',
      status: 'Published',
      role: 'Lead Author',
      oneLiner: 'LSTM-based voice analysis achieves 96% accuracy in early Parkinson\'s detection',
      metrics: {
        accuracy: '96%',
        samples: '2,847',
        citations: '12'
      },
      links: {
        pdf: '#',
        code: 'https://github.com/apoorv/parkinson-voice',
        demo: 'https://parkai-demo.streamlit.app'
      },
      abstract: 'Developed a deep learning approach using voice biomarkers for early Parkinson\'s disease detection. Our LSTM-based model achieved 96% accuracy on 2,847 voice samples, enabling detection up to 3 years before clinical diagnosis.',
      impact: 'Clinical screening applications and remote monitoring via smartphone apps'
    },
    {
      id: 2,
      title: 'Urban Soundscape Analysis for Smart City Planning Using Audio Machine Learning',
      venue: 'ICASSP 2024',
      status: 'Published',
      role: 'Lead Author',
      oneLiner: 'ML-based urban sound classification enables data-driven noise pollution policies',
      metrics: {
        accuracy: '89%',
        samples: '10,000',
        citations: '5'
      },
      links: {
        pdf: '#',
        code: 'https://github.com/apoorv/urban-soundscape',
        demo: null
      },
      abstract: 'Created a machine learning framework for automated urban soundscape analysis. CNN-based models achieved 89% accuracy in classifying urban sounds, providing actionable insights for city planners and policymakers.',
      impact: 'Smart city noise monitoring and urban planning policy development'
    }
  ];

  const totalCitations = papers.reduce((sum, paper) => sum + parseInt(paper.metrics.citations), 0);
  const avgAccuracy = papers.reduce((sum, paper) => sum + parseFloat(paper.metrics.accuracy), 0) / papers.length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h2 className="text-3xl font-bold text-dark-text mb-2">Research Papers</h2>
        <p className="text-dark-muted">Research pipeline and readiness overview</p>
      </motion.div>

      {/* Readiness KPIs */}
      <motion.div 
        variants={itemVariants}
        className="bg-dark-panel border border-dark-border rounded-lg p-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {/* Pipeline */}
          <div>
            <div className="text-sm text-dark-muted mb-1">Pipeline</div>
            <div className="text-lg font-semibold text-dark-text">2 Preprint · 1 In Prep</div>
          </div>
          {/* Artifact Coverage */}
          <div>
            <div className="text-sm text-dark-muted mb-1">Artifact Coverage</div>
            <div className="text-lg font-semibold text-dark-text">Code · Data · PDF · Poster · Slides → <span className="text-accent-cyan">4/5</span> (80%)</div>
          </div>
          {/* Reproducibility Readiness */}
          <div>
            <div className="text-sm text-dark-muted mb-1">Reproducibility Readiness</div>
            <div className="text-lg font-semibold text-dark-text">Env · Seeds · README · Run script → <span className="text-accent-green">✅ 3/4</span></div>
          </div>
        </div>
      </motion.div>

      {/* Papers */}
      <div className="space-y-4">
        {papers.map((paper) => (
          <motion.div
            key={paper.id}
            variants={itemVariants}
            className="bg-dark-panel border border-dark-border rounded-lg overflow-hidden hover:border-accent-cyan transition-all duration-200"
            whileHover={{ y: -2 }}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-900 text-green-200 rounded-full text-xs border border-green-700">
                      {paper.status}
                    </span>
                    <span className="px-2 py-1 bg-purple-900 text-purple-200 rounded-full text-xs border border-purple-700">
                      {paper.role}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-dark-text mb-2">{paper.title}</h3>
                  <div className="text-accent-cyan font-medium mb-2">{paper.venue}</div>
                  <p className="text-gray-300 text-sm">{paper.oneLiner}</p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-2 bg-gray-800 rounded">
                    <div className="text-sm font-semibold text-accent-green">{paper.metrics.accuracy}</div>
                    <div className="text-xs text-dark-muted">Accuracy</div>
                  </div>
                  <div className="p-2 bg-gray-800 rounded">
                    <div className="text-sm font-semibold text-dark-text">{paper.metrics.samples}</div>
                    <div className="text-xs text-dark-muted">Samples</div>
                  </div>
                  <div className="p-2 bg-gray-800 rounded">
                    <div className="text-sm font-semibold text-accent-yellow">{paper.metrics.citations}</div>
                    <div className="text-xs text-dark-muted">Citations</div>
                  </div>
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-2 mb-4">
                <motion.a
                  href={paper.links.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1 bg-red-900 bg-opacity-30 border border-red-700 rounded text-xs text-red-300 hover:bg-opacity-50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  📄 PDF
                </motion.a>
                <motion.a
                  href={paper.links.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1 bg-green-900 bg-opacity-30 border border-green-700 rounded text-xs text-green-300 hover:bg-opacity-50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  💻 Code
                </motion.a>
                {paper.links.demo && (
                  <motion.a
                    href={paper.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1 bg-blue-900 bg-opacity-30 border border-blue-700 rounded text-xs text-blue-300 hover:bg-opacity-50 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    🚀 Demo
                  </motion.a>
                )}
              </div>

              {/* Expand/Collapse */}
              <motion.button
                onClick={() => setExpandedPaper(expandedPaper === paper.id ? null : paper.id)}
                className="w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded text-sm font-medium text-gray-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                {expandedPaper === paper.id ? '▼ Hide Details' : '▶ Show Details'}
              </motion.button>

              {/* Expanded Content */}
              {expandedPaper === paper.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 pt-4 border-t border-dark-border space-y-4"
                >
                  <div>
                    <h4 className="font-semibold text-dark-text mb-2">Abstract</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{paper.abstract}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-dark-text mb-2">Impact</h4>
                    <p className="text-gray-300 text-sm">{paper.impact}</p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Conference Info */}
      <motion.div 
        variants={itemVariants}
        className="bg-gradient-to-r from-blue-900 to-purple-900 bg-opacity-20 border border-blue-700 rounded-lg p-6"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="text-2xl">🎤</div>
          <h3 className="text-lg font-semibold text-blue-400">ICASSP 2024</h3>
        </div>
        <p className="text-gray-300 text-sm">
          Presented both papers at the IEEE International Conference on Acoustics, Speech and Signal Processing. 
          Focus areas: Healthcare AI and Urban Analytics applications of machine learning.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SimpleResearch;
