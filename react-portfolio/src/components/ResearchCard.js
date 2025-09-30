import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SparklineChart from './SparklineChart';

const ResearchCard = ({ paper }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState('abstract');

  const getRatingColor = (rating) => {
    switch (rating) {
      case 'Strong Evidence':
        return 'text-green-400 bg-green-900 border-green-700';
      case 'Promising':
        return 'text-yellow-400 bg-yellow-900 border-yellow-700';
      case 'Exploratory':
        return 'text-blue-400 bg-blue-900 border-blue-700';
      default:
        return 'text-gray-400 bg-gray-900 border-gray-700';
    }
  };

  const getRoleColor = (role) => {
    return role === 'Lead Author' 
      ? 'text-purple-400 bg-purple-900 border-purple-700'
      : 'text-cyan-400 bg-cyan-900 border-cyan-700';
  };

  const getReproducibilityColor = (status) => {
    switch (status) {
      case 'Reproducible':
        return 'text-green-400 bg-green-900 border-green-700';
      case 'Partially':
        return 'text-yellow-400 bg-yellow-900 border-yellow-700';
      case 'TBD':
        return 'text-gray-400 bg-gray-900 border-gray-700';
      default:
        return 'text-gray-400 bg-gray-900 border-gray-700';
    }
  };

  const formatMetric = (value) => {
    return (value * 100).toFixed(1) + '%';
  };

  return (
    <motion.div
      className="bg-dark-panel border border-dark-border rounded-lg overflow-hidden hover:border-accent-cyan transition-all duration-200"
      whileHover={{ y: -2, boxShadow: "0 8px 25px rgba(0,0,0,0.3)" }}
    >
      {/* Header */}
      <div className="p-6 border-b border-dark-border">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`px-2 py-1 rounded-full text-xs border ${getRatingColor(paper.rating)}`}>
                {paper.rating}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs border ${getRoleColor(paper.role)}`}>
                {paper.role}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs border ${getReproducibilityColor(paper.reproducibility)}`}>
                {paper.reproducibility}
              </span>
              <span className="px-2 py-1 bg-gray-800 rounded-full text-xs text-gray-300">
                {paper.domain}
              </span>
            </div>
            
            <motion.h3 
              className="text-xl font-bold text-dark-text mb-2 hover:text-accent-cyan cursor-pointer transition-colors"
              whileHover={{ scale: 1.01 }}
            >
              <a href={paper.pdfLink} target="_blank" rel="noopener noreferrer">
                {paper.title}
              </a>
            </motion.h3>
            
            <div className="flex items-center gap-4 mb-3">
              <span className="text-accent-cyan font-medium">{paper.venue}</span>
              <span className="text-dark-muted">{paper.year}</span>
            </div>
            
            <p className="text-gray-300 text-sm mb-4">{paper.targetThesis}</p>

            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="text-center p-2 bg-gray-800 rounded">
                <div className="text-sm font-semibold text-dark-text">{paper.stats.samples.toLocaleString()}</div>
                <div className="text-xs text-dark-muted">Samples</div>
              </div>
              <div className="text-center p-2 bg-gray-800 rounded">
                <div className="text-sm font-semibold text-accent-green">{formatMetric(paper.stats.accuracy)}</div>
                <div className="text-xs text-dark-muted">Accuracy</div>
              </div>
              <div className="text-center p-2 bg-gray-800 rounded">
                <div className="text-sm font-semibold text-accent-cyan">{formatMetric(paper.stats.f1Score)}</div>
                <div className="text-xs text-dark-muted">F1-Score</div>
              </div>
              <div className="text-center p-2 bg-gray-800 rounded">
                <div className="text-sm font-semibold text-accent-yellow">{formatMetric(paper.stats.auc)}</div>
                <div className="text-xs text-dark-muted">AUC</div>
              </div>
            </div>

            {/* Confidence Interval */}
            <div className="text-xs text-gray-400 mb-4">{paper.stats.confidenceInterval}</div>
          </div>

          {/* Right Side - Metrics & Sparklines */}
          <div className="w-full lg:w-80 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-green">{paper.citations}</div>
                <div className="text-xs text-dark-muted">Citations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-cyan">{paper.reads}</div>
                <div className="text-xs text-dark-muted">Reads</div>
              </div>
            </div>

            {/* Citations Sparkline */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-dark-muted">Citations (12mo)</span>
                <span className="text-xs text-accent-green">+{paper.citations}</span>
              </div>
              <SparklineChart 
                data={paper.citationsOverTime} 
                color="#29d391"
                height={30}
              />
            </div>

            {/* Reads Sparkline */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-dark-muted">Reads (12mo)</span>
                <span className="text-xs text-accent-cyan">+{paper.reads}</span>
              </div>
              <SparklineChart 
                data={paper.readsOverTime} 
                color="#7DF9FF"
                height={30}
              />
            </div>
          </div>
        </div>

        {/* Artifacts */}
        <div className="flex flex-wrap gap-2 mt-4">
          {paper.pdfLink && (
            <motion.a
              href={paper.pdfLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1 bg-red-900 bg-opacity-30 border border-red-700 rounded text-xs text-red-300 hover:bg-opacity-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📄 PDF
            </motion.a>
          )}
          {paper.codeLink && (
            <motion.a
              href={paper.codeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1 bg-green-900 bg-opacity-30 border border-green-700 rounded text-xs text-green-300 hover:bg-opacity-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              💻 Code
            </motion.a>
          )}
          {paper.datasetLink && (
            <motion.a
              href={paper.datasetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1 bg-blue-900 bg-opacity-30 border border-blue-700 rounded text-xs text-blue-300 hover:bg-opacity-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📊 Dataset
            </motion.a>
          )}
          {paper.posterLink && (
            <motion.a
              href={paper.posterLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1 bg-purple-900 bg-opacity-30 border border-purple-700 rounded text-xs text-purple-300 hover:bg-opacity-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🖼️ Poster
            </motion.a>
          )}
          {paper.slidesLink && (
            <motion.a
              href={paper.slidesLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1 bg-yellow-900 bg-opacity-30 border border-yellow-700 rounded text-xs text-yellow-300 hover:bg-opacity-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📋 Slides
            </motion.a>
          )}
          {paper.videoLink && (
            <motion.a
              href={paper.videoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1 bg-pink-900 bg-opacity-30 border border-pink-700 rounded text-xs text-pink-300 hover:bg-opacity-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🎥 Video
            </motion.a>
          )}
        </div>

        {/* Toggle Details Button */}
        <motion.button
          onClick={() => setShowDetails(!showDetails)}
          className="mt-4 w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded text-sm font-medium text-gray-300 hover:text-white transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {showDetails ? '▼ Hide Details' : '▶ Show Details'}
        </motion.button>
      </div>

      {/* Detail Drawer */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-dark-border overflow-hidden"
          >
            {/* Tabs */}
            <div className="flex border-b border-dark-border">
              {['abstract', 'method', 'results', 'impact'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-3 text-sm font-medium capitalize transition-colors ${
                    activeTab === tab
                      ? 'text-accent-cyan border-b-2 border-accent-cyan'
                      : 'text-dark-muted hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'abstract' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <h4 className="font-semibold text-dark-text">Abstract</h4>
                  <p className="text-gray-300 leading-relaxed">{paper.abstract}</p>
                </motion.div>
              )}

              {activeTab === 'method' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <h4 className="font-semibold text-dark-text">Method</h4>
                    <div className="text-2xl">{paper.method.diagram}</div>
                  </div>
                  <div className="space-y-2">
                    {paper.method.bullets.map((bullet, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-accent-cyan rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-300">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'results' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <h4 className="font-semibold text-dark-text">Key Results</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {paper.results.keyFindings.map((finding, index) => (
                      <div key={index} className="p-3 bg-gray-800 rounded">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-accent-green rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-300 text-sm">{finding}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'impact' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <h4 className="font-semibold text-dark-text">Real-World Applications</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {paper.impact.applications.map((application, index) => (
                      <div key={index} className="p-3 bg-gradient-to-r from-blue-900 to-purple-900 bg-opacity-20 border border-blue-700 rounded">
                        <div className="flex items-start gap-3">
                          <div className="text-blue-400">🎯</div>
                          <span className="text-gray-300 text-sm">{application}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ResearchCard;
