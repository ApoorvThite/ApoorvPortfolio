import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ResearchCard from './ResearchCard';
import ResearchFilters from './ResearchFilters';
import SparklineChart from './SparklineChart';

const ResearchCoverage = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    domain: 'all',
    year: 'all',
    venue: 'all'
  });
  const [sortBy, setSortBy] = useState('recent');

  const papers = [
    {
      id: 1,
      title: 'Voice Biomarkers for Early Parkinson\'s Disease Detection Using Deep Learning',
      venue: 'ICASSP 2024',
      year: 2024,
      domain: 'Health',
      role: 'Lead Author',
      rating: 'Strong Evidence',
      pdfLink: '#',
      codeLink: 'https://github.com/apoorv/parkinson-voice',
      datasetLink: '#',
      posterLink: '#',
      slidesLink: '#',
      videoLink: '#',
      targetThesis: 'LSTM-based voice analysis achieves 96% accuracy in early Parkinson\'s detection',
      stats: {
        samples: 2847,
        accuracy: 0.96,
        f1Score: 0.94,
        auc: 0.98,
        confidenceInterval: '95% CI: 0.94-0.98'
      },
      citations: 23,
      reads: 456,
      citationsOverTime: [0, 2, 5, 8, 12, 15, 18, 20, 21, 22, 23, 23],
      readsOverTime: [12, 25, 45, 78, 120, 180, 250, 320, 380, 420, 445, 456],
      reproducibility: 'Reproducible',
      abstract: 'Early detection of Parkinson\'s disease (PD) remains challenging due to subtle initial symptoms. This study presents a novel deep learning approach using voice biomarkers for early PD detection. We developed an LSTM-based model trained on 2,847 voice samples from PD patients and healthy controls. Our method achieved 96% accuracy, 94% F1-score, and 98% AUC, significantly outperforming traditional approaches. The model identifies subtle voice changes imperceptible to human listeners, enabling detection up to 3 years before clinical diagnosis. We provide comprehensive reproducibility artifacts including code, datasets, and detailed methodology.',
      method: {
        diagram: '🧠→🎤→📊',
        bullets: [
          'Voice recordings from 1,200+ participants (600 PD, 600 controls)',
          'LSTM neural network with attention mechanism',
          '5-fold cross-validation with stratified sampling',
          'SHAP explainability analysis for clinical interpretability'
        ]
      },
      results: {
        keyFindings: [
          'Achieved 96% accuracy vs 78% baseline',
          'Detected PD 3 years before clinical diagnosis',
          'Identified 12 key voice biomarkers',
          'Validated across 3 independent datasets'
        ]
      },
      impact: {
        applications: [
          'Clinical screening in neurology departments',
          'Remote monitoring via smartphone apps',
          'Population health surveillance programs',
          'Drug trial patient stratification'
        ]
      }
    },
    {
      id: 2,
      title: 'Urban Soundscape Analysis for Smart City Planning Using Audio Machine Learning',
      venue: 'ICASSP 2024',
      year: 2024,
      domain: 'Urban',
      role: 'Lead Author',
      rating: 'Promising',
      pdfLink: '#',
      codeLink: 'https://github.com/apoorv/urban-soundscape',
      datasetLink: '#',
      posterLink: '#',
      slidesLink: '#',
      videoLink: null,
      targetThesis: 'ML-based urban sound classification enables data-driven noise pollution policies',
      stats: {
        samples: 10000,
        accuracy: 0.89,
        f1Score: 0.87,
        auc: 0.92,
        confidenceInterval: '95% CI: 0.86-0.92'
      },
      citations: 8,
      reads: 234,
      citationsOverTime: [0, 0, 1, 2, 3, 4, 5, 6, 7, 7, 8, 8],
      readsOverTime: [5, 15, 35, 65, 95, 125, 155, 185, 205, 220, 230, 234],
      reproducibility: 'Reproducible',
      abstract: 'Urban noise pollution significantly impacts quality of life and public health. This research presents a comprehensive machine learning framework for automated urban soundscape analysis. We collected and annotated 10,000 audio samples across diverse urban environments, developing CNN-based models for sound source classification. Our approach achieves 89% accuracy in identifying traffic, construction, human activity, and natural sounds. The system enables real-time monitoring and provides actionable insights for urban planners and policymakers.',
      method: {
        diagram: '🏙️→🎧→🤖',
        bullets: [
          'Multi-city audio collection (NYC, SF, Chicago)',
          'CNN with mel-spectrogram feature extraction',
          'Transfer learning from AudioSet pretrained models',
          'Temporal analysis for noise pattern detection'
        ]
      },
      results: {
        keyFindings: [
          '89% accuracy across 8 sound categories',
          'Identified peak noise hours and locations',
          'Correlated noise levels with health outcomes',
          'Generated policy recommendations for 3 cities'
        ]
      },
      impact: {
        applications: [
          'Smart city noise monitoring systems',
          'Urban planning and zoning decisions',
          'Public health policy development',
          'Real estate development guidelines'
        ]
      }
    },
    {
      id: 3,
      title: 'Algorithmic Trading Strategies Using Sentiment Analysis and Market Microstructure',
      venue: 'ICAIF 2023',
      year: 2023,
      domain: 'Finance',
      role: 'Co-author',
      rating: 'Promising',
      pdfLink: '#',
      codeLink: 'https://github.com/apoorv/trading-sentiment',
      datasetLink: '#',
      posterLink: '#',
      slidesLink: '#',
      videoLink: '#',
      targetThesis: 'Social sentiment combined with microstructure data improves trading returns by 15%',
      stats: {
        samples: 50000,
        accuracy: 0.73,
        f1Score: 0.71,
        auc: 0.79,
        confidenceInterval: '95% CI: 0.70-0.76'
      },
      citations: 12,
      reads: 189,
      citationsOverTime: [0, 1, 2, 4, 6, 7, 8, 9, 10, 11, 12, 12],
      readsOverTime: [8, 20, 35, 55, 75, 95, 120, 145, 165, 175, 185, 189],
      reproducibility: 'Partially',
      abstract: 'This study investigates the integration of social media sentiment analysis with high-frequency market microstructure data for algorithmic trading. We developed a multi-modal approach combining Twitter sentiment, Reddit discussions, and order book dynamics to predict short-term price movements. Our ensemble model achieved 73% accuracy in predicting 5-minute price directions, generating 15% excess returns over baseline strategies. The research demonstrates the value of alternative data sources in quantitative finance.',
      method: {
        diagram: '📱→💭→📈',
        bullets: [
          'Real-time Twitter/Reddit sentiment extraction',
          'Order book imbalance and flow toxicity metrics',
          'Ensemble model with LSTM and gradient boosting',
          'Risk-adjusted backtesting on 2-year dataset'
        ]
      },
      results: {
        keyFindings: [
          '15% excess returns vs buy-and-hold',
          'Sharpe ratio improvement from 0.8 to 1.2',
          'Sentiment signals most effective during volatility',
          'Reduced maximum drawdown by 25%'
        ]
      },
      impact: {
        applications: [
          'Quantitative hedge fund strategies',
          'Retail trading algorithm development',
          'Risk management system enhancement',
          'Market making optimization'
        ]
      }
    },
    {
      id: 4,
      title: 'Federated Learning for Privacy-Preserving Healthcare Analytics',
      venue: 'NeurIPS Workshop 2023',
      year: 2023,
      domain: 'Health',
      role: 'Co-author',
      rating: 'Exploratory',
      pdfLink: '#',
      codeLink: 'https://github.com/apoorv/federated-health',
      datasetLink: null,
      posterLink: '#',
      slidesLink: '#',
      videoLink: '#',
      targetThesis: 'Federated learning enables collaborative healthcare AI while preserving patient privacy',
      stats: {
        samples: 5000,
        accuracy: 0.84,
        f1Score: 0.82,
        auc: 0.88,
        confidenceInterval: '95% CI: 0.81-0.87'
      },
      citations: 5,
      reads: 145,
      citationsOverTime: [0, 0, 0, 1, 2, 2, 3, 4, 4, 5, 5, 5],
      readsOverTime: [3, 12, 25, 45, 65, 85, 105, 120, 130, 138, 142, 145],
      reproducibility: 'TBD',
      abstract: 'Healthcare data silos limit the development of robust AI models due to privacy regulations and institutional barriers. This work explores federated learning approaches for collaborative healthcare analytics without centralizing sensitive patient data. We demonstrate the feasibility of training diagnostic models across multiple hospitals while maintaining HIPAA compliance. Our federated approach achieves 84% accuracy, comparable to centralized training, while preserving patient privacy and enabling broader collaboration.',
      method: {
        diagram: '🏥→🔒→🤝',
        bullets: [
          'Multi-institutional collaboration (5 hospitals)',
          'Differential privacy with gradient perturbation',
          'Secure aggregation protocols',
          'HIPAA-compliant implementation framework'
        ]
      },
      results: {
        keyFindings: [
          '84% accuracy vs 86% centralized baseline',
          'Zero patient data exposure across institutions',
          'Successful deployment at 5 hospital systems',
          'Reduced model bias through diverse populations'
        ]
      },
      impact: {
        applications: [
          'Multi-hospital diagnostic AI systems',
          'Pharmaceutical clinical trial analytics',
          'Population health research collaborations',
          'Regulatory-compliant AI development'
        ]
      }
    }
  ];

  // Calculate KPIs
  const totalPapers = papers.length;
  const totalCitations = papers.reduce((sum, paper) => sum + paper.citations, 0);
  const totalReads = papers.reduce((sum, paper) => sum + paper.reads, 0);
  const avgEffectSize = (papers.reduce((sum, paper) => sum + paper.stats.accuracy, 0) / papers.length * 100).toFixed(1);
  const reproducibleCount = papers.filter(p => p.reproducibility === 'Reproducible').length;
  const reproduciblePercent = Math.round((reproducibleCount / totalPapers) * 100);

  // Filter and sort papers
  const filteredPapers = papers.filter(paper => {
    const domainMatch = selectedFilters.domain === 'all' || paper.domain === selectedFilters.domain;
    const yearMatch = selectedFilters.year === 'all' || paper.year.toString() === selectedFilters.year;
    const venueMatch = selectedFilters.venue === 'all' || paper.venue.includes(selectedFilters.venue);
    return domainMatch && yearMatch && venueMatch;
  });

  const sortedPapers = [...filteredPapers].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return b.year - a.year;
      case 'citations':
        return b.citations - a.citations;
      case 'impact':
        return b.stats.accuracy - a.stats.accuracy;
      default:
        return 0;
    }
  });

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
      <motion.div variants={itemVariants} className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-dark-text mb-2">Research Coverage</h2>
          <p className="text-dark-muted">Published research with trading-style analytics and impact metrics</p>
        </div>
      </motion.div>

      {/* KPI Strip */}
      <motion.div 
        variants={itemVariants}
        className="bg-dark-panel border border-dark-border rounded-lg p-6"
      >
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-accent-cyan mb-1">{totalPapers}</div>
            <div className="text-sm text-dark-muted">Papers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent-green mb-1">{totalCitations}</div>
            <div className="text-sm text-dark-muted">Citations</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent-yellow mb-1">{totalReads}</div>
            <div className="text-sm text-dark-muted">Reads</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">{avgEffectSize}%</div>
            <div className="text-sm text-dark-muted">Avg Effect Size</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">{reproduciblePercent}%</div>
            <div className="text-sm text-dark-muted">Reproducible</div>
          </div>
        </div>

        {/* Citation Trend */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-dark-muted">Citation Trend (12 months)</span>
            <span className="text-xs text-accent-green">+{totalCitations} total</span>
          </div>
          <SparklineChart 
            data={papers[0].citationsOverTime} 
            color="#29d391"
            height={40}
          />
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants}>
        <ResearchFilters 
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          sortBy={sortBy}
          setSortBy={setSortBy}
          papers={papers}
        />
      </motion.div>

      {/* Research Papers Grid */}
      <motion.div 
        variants={containerVariants}
        className="space-y-6"
      >
        <AnimatePresence>
          {sortedPapers.map((paper) => (
            <motion.div
              key={paper.id}
              variants={itemVariants}
              layout
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <ResearchCard paper={paper} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {sortedPapers.length === 0 && (
        <motion.div 
          variants={itemVariants}
          className="text-center py-12 text-dark-muted"
        >
          No papers found matching the current filters.
        </motion.div>
      )}

      {/* Research Impact Summary */}
      <motion.div 
        variants={itemVariants}
        className="bg-gradient-to-r from-blue-900 to-purple-900 bg-opacity-20 border border-blue-700 rounded-lg p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="text-2xl">🔬</div>
          <h3 className="text-lg font-semibold text-blue-400">Research Impact</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div>
            <h4 className="font-medium text-dark-text mb-2">Domains</h4>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-sm text-gray-300">Healthcare AI</span>
                <span className="text-sm text-accent-green">2 papers</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-300">Urban Analytics</span>
                <span className="text-sm text-accent-cyan">1 paper</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-300">FinTech</span>
                <span className="text-sm text-accent-yellow">1 paper</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-dark-text mb-2">Venues</h4>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-sm text-gray-300">ICASSP</span>
                <span className="text-sm text-accent-green">2 papers</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-300">ICAIF</span>
                <span className="text-sm text-accent-cyan">1 paper</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-300">NeurIPS Workshop</span>
                <span className="text-sm text-accent-yellow">1 paper</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-dark-text mb-2">Collaboration</h4>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-sm text-gray-300">Lead Author</span>
                <span className="text-sm text-accent-green">2 papers</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-300">Co-author</span>
                <span className="text-sm text-accent-cyan">2 papers</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-300">H-index</span>
                <span className="text-sm text-accent-yellow">4</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResearchCoverage;
