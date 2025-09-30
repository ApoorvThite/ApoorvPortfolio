import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PositionCard from './PositionCard';
import PortfolioSummary from './PortfolioSummary';

const ExperiencePortfolio = () => {
  const [activeTab, setActiveTab] = useState('open');
  const [sortBy, setSortBy] = useState('recent');
  const [filterBy, setFilterBy] = useState('all');

  const positions = [
    {
      id: 1,
      ticker: 'CREW',
      company: 'Crewasis AI',
      role: 'AI Research Intern',
      type: 'Internship',
      status: 'open',
      entryDate: '2024-06-01',
      exitDate: null,
      duration: '4 months',
      positionSize: {
        teamSize: 8,
        ownership: 'Lead ML Engineer',
        codebaseSize: '15K+ lines'
      },
      pnl: {
        realized: [],
        unrealized: [
          { metric: 'Model Accuracy', value: '+24%', type: 'positive' },
          { metric: 'Processing Speed', value: '+180%', type: 'positive' },
          { metric: 'Research Output', value: '3 papers', type: 'neutral' }
        ]
      },
      volatility: {
        level: 'High',
        factors: ['Cutting-edge research', 'Rapid prototyping', 'Novel datasets']
      },
      dividends: [
        { type: 'publication', title: 'Voice Biomarkers for Parkinson\'s Detection', date: '2024-08-15' },
        { type: 'award', title: 'Best Research Intern Q3 2024', date: '2024-09-01' }
      ],
      earningsCalls: [
        { type: 'demo', title: 'ParkAI Live Demo to Stakeholders', date: '2024-08-20', audience: '25+ attendees' },
        { type: 'talk', title: 'ML in Healthcare - Penn State Tech Talk', date: '2024-09-10', audience: '100+ students' }
      ],
      techStack: ['Python', 'TensorFlow', 'SHAP', 'Streamlit', 'AWS'],
      keyProjects: ['ParkAI Voice Analysis', 'Healthcare ML Pipeline', 'Explainable AI Dashboard'],
      logo: '🧠',
      description: 'Leading AI research for healthcare applications, focusing on voice biomarkers and explainable ML models.'
    },
    {
      id: 2,
      ticker: 'AERO',
      company: 'Aerolens Technologies',
      role: 'Software Development Intern',
      type: 'Internship',
      status: 'open',
      entryDate: '2024-01-15',
      exitDate: null,
      duration: '8 months',
      positionSize: {
        teamSize: 12,
        ownership: 'Full-Stack Developer',
        codebaseSize: '25K+ lines'
      },
      pnl: {
        realized: [],
        unrealized: [
          { metric: 'User Engagement', value: '+65%', type: 'positive' },
          { metric: 'Load Time', value: '-40%', type: 'positive' },
          { metric: 'Feature Delivery', value: '12 features', type: 'neutral' }
        ]
      },
      volatility: {
        level: 'Medium',
        factors: ['Agile sprints', 'Client feedback loops', 'Tech stack evolution']
      },
      dividends: [
        { type: 'promotion', title: 'Promoted to Senior Intern', date: '2024-07-01' },
        { type: 'certification', title: 'AWS Cloud Practitioner', date: '2024-05-15' }
      ],
      earningsCalls: [
        { type: 'demo', title: 'EcoSplit Product Demo', date: '2024-06-15', audience: '50+ stakeholders' },
        { type: 'blog', title: 'Building Sustainable FinTech - Medium', date: '2024-07-20', audience: '500+ views' }
      ],
      techStack: ['React', 'Node.js', 'MongoDB', 'AWS', 'Docker'],
      keyProjects: ['EcoSplit Mobile App', 'Payment Gateway Integration', 'Analytics Dashboard'],
      logo: '✈️',
      description: 'Developing sustainable fintech solutions with focus on environmental impact tracking and user experience.'
    },
    {
      id: 3,
      ticker: 'PSU',
      company: 'Penn State Research',
      role: 'Undergraduate Researcher',
      type: 'Research',
      status: 'open',
      entryDate: '2023-09-01',
      exitDate: null,
      duration: '13 months',
      positionSize: {
        teamSize: 6,
        ownership: 'Research Lead',
        codebaseSize: '8K+ lines'
      },
      pnl: {
        realized: [],
        unrealized: [
          { metric: 'Research Impact', value: '2 publications', type: 'positive' },
          { metric: 'Dataset Size', value: '10K samples', type: 'neutral' },
          { metric: 'Model Performance', value: '+15%', type: 'positive' }
        ]
      },
      volatility: {
        level: 'Low',
        factors: ['Academic timeline', 'Peer review process', 'Funding cycles']
      },
      dividends: [
        { type: 'publication', title: 'Urban Soundscape Analysis - ICASSP 2024', date: '2024-03-15' },
        { type: 'award', title: 'Dean\'s List - All Semesters', date: '2024-05-01' }
      ],
      earningsCalls: [
        { type: 'talk', title: 'Audio ML Research Presentation', date: '2024-04-10', audience: '75+ researchers' },
        { type: 'case_study', title: 'Urban Planning ML Applications', date: '2024-02-28', audience: 'Academic community' }
      ],
      techStack: ['Python', 'Librosa', 'PyTorch', 'Jupyter', 'Pandas'],
      keyProjects: ['Urban Soundscape Analysis', 'Audio Classification Models', 'Research Data Pipeline'],
      logo: '🎓',
      description: 'Conducting research in audio machine learning and urban planning applications with published results.'
    },
    {
      id: 4,
      ticker: 'FRLC',
      company: 'Freelance Consulting',
      role: 'Data Science Consultant',
      type: 'Consulting',
      status: 'closed',
      entryDate: '2023-05-01',
      exitDate: '2023-12-15',
      duration: '7 months',
      positionSize: {
        teamSize: 3,
        ownership: 'Lead Consultant',
        codebaseSize: '12K+ lines'
      },
      pnl: {
        realized: [
          { metric: 'Client Efficiency', value: '+300%', type: 'positive' },
          { metric: 'Cost Reduction', value: '-60%', type: 'positive' },
          { metric: 'Revenue Generated', value: '$25K+', type: 'positive' }
        ],
        unrealized: []
      },
      volatility: {
        level: 'High',
        factors: ['Multiple clients', 'Diverse requirements', 'Tight deadlines']
      },
      dividends: [
        { type: 'certification', title: 'Google Data Analytics Certificate', date: '2023-08-01' },
        { type: 'award', title: 'Top Freelancer - 5 Star Rating', date: '2023-11-15' }
      ],
      earningsCalls: [
        { type: 'case_study', title: 'SmartSkillMatch Case Study', date: '2023-10-20', audience: 'Industry professionals' },
        { type: 'blog', title: 'Freelancing in Data Science - LinkedIn', date: '2023-09-05', audience: '1K+ connections' }
      ],
      techStack: ['Python', 'SQL', 'Tableau', 'FastAPI', 'PostgreSQL'],
      keyProjects: ['Job Matching Algorithm', 'Business Intelligence Dashboard', 'Automated Reporting System'],
      logo: '💼',
      description: 'Provided data science consulting services to startups and small businesses, delivering measurable ROI.'
    },
    {
      id: 5,
      ticker: 'HACK',
      company: 'HackPSU Organization',
      role: 'Technical Lead',
      type: 'Leadership',
      status: 'closed',
      entryDate: '2023-01-15',
      exitDate: '2024-04-30',
      duration: '15 months',
      positionSize: {
        teamSize: 25,
        ownership: 'Tech Infrastructure',
        codebaseSize: '20K+ lines'
      },
      pnl: {
        realized: [
          { metric: 'Event Attendance', value: '+150%', type: 'positive' },
          { metric: 'Participant Satisfaction', value: '4.8/5', type: 'positive' },
          { metric: 'Sponsor Engagement', value: '+80%', type: 'positive' }
        ],
        unrealized: []
      },
      volatility: {
        level: 'Medium',
        factors: ['Event coordination', 'Volunteer management', 'Sponsor requirements']
      },
      dividends: [
        { type: 'award', title: 'Outstanding Leadership Award', date: '2024-04-15' },
        { type: 'certification', title: 'Event Management Certification', date: '2023-12-01' }
      ],
      earningsCalls: [
        { type: 'demo', title: 'HackPSU 2024 Opening Ceremony', date: '2024-03-15', audience: '500+ participants' },
        { type: 'talk', title: 'Building Tech Communities - Panel', date: '2024-02-20', audience: '200+ students' }
      ],
      techStack: ['React', 'Node.js', 'Firebase', 'Docker', 'GitHub Actions'],
      keyProjects: ['Event Management Platform', 'Judge Scoring System', 'Sponsor Portal'],
      logo: '⚡',
      description: 'Led technical infrastructure for major hackathon events, managing platforms serving 500+ participants.'
    }
  ];

  const openPositions = positions.filter(p => p.status === 'open');
  const closedPositions = positions.filter(p => p.status === 'closed');
  const currentPositions = activeTab === 'open' ? openPositions : closedPositions;

  const sortedPositions = [...currentPositions].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.entryDate) - new Date(a.entryDate);
      case 'duration':
        return b.duration.localeCompare(a.duration);
      case 'impact':
        const aImpact = [...a.pnl.realized, ...a.pnl.unrealized].length;
        const bImpact = [...b.pnl.realized, ...b.pnl.unrealized].length;
        return bImpact - aImpact;
      default:
        return 0;
    }
  });

  const filteredPositions = sortedPositions.filter(position => {
    if (filterBy === 'all') return true;
    return position.type.toLowerCase() === filterBy.toLowerCase();
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
          <h2 className="text-3xl font-bold text-dark-text mb-2">Experience Portfolio</h2>
          <p className="text-dark-muted">Professional positions with quantified impact and trading-style analytics</p>
        </div>
      </motion.div>

      {/* Portfolio Summary */}
      <motion.div variants={itemVariants}>
        <PortfolioSummary positions={positions} />
      </motion.div>

      {/* Position Tabs */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div className="flex bg-gray-800 rounded-lg p-1">
          <motion.button
            onClick={() => setActiveTab('open')}
            className={`px-4 py-2 rounded text-sm font-medium transition-all duration-200 ${
              activeTab === 'open'
                ? 'bg-accent-green text-white'
                : 'text-dark-muted hover:text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Open Positions ({openPositions.length})
          </motion.button>
          <motion.button
            onClick={() => setActiveTab('closed')}
            className={`px-4 py-2 rounded text-sm font-medium transition-all duration-200 ${
              activeTab === 'closed'
                ? 'bg-accent-blue text-white'
                : 'text-dark-muted hover:text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Trade History ({closedPositions.length})
          </motion.button>
        </div>

        <div className="flex gap-4">
          {/* Filter */}
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="bg-gray-800 border border-dark-border rounded px-3 py-2 text-sm text-white focus:border-accent-cyan focus:outline-none"
          >
            <option value="all">All Types</option>
            <option value="internship">Internships</option>
            <option value="research">Research</option>
            <option value="consulting">Consulting</option>
            <option value="leadership">Leadership</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-800 border border-dark-border rounded px-3 py-2 text-sm text-white focus:border-accent-cyan focus:outline-none"
          >
            <option value="recent">Most Recent</option>
            <option value="duration">Duration</option>
            <option value="impact">Impact</option>
          </select>
        </div>
      </motion.div>

      {/* Positions Grid */}
      <motion.div 
        variants={containerVariants}
        className="space-y-4"
      >
        <AnimatePresence>
          {filteredPositions.map((position) => (
            <motion.div
              key={position.id}
              variants={itemVariants}
              layout
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <PositionCard 
                position={position}
                isOpen={activeTab === 'open'}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredPositions.length === 0 && (
        <motion.div 
          variants={itemVariants}
          className="text-center py-12 text-dark-muted"
        >
          No positions found matching the current filters.
        </motion.div>
      )}
    </motion.div>
  );
};

export default ExperiencePortfolio;
