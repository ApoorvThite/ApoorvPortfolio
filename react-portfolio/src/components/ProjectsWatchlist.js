import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';
import ProjectFilters from './ProjectFilters';

const ProjectsWatchlist = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30');
  const [selectedFilters, setSelectedFilters] = useState({
    stack: 'all',
    domain: 'all',
    status: 'all'
  });
  const [sortBy, setSortBy] = useState('impact');

  const projects = [
    {
      id: 11,
      name: 'GreenBucks',
      shortName: 'GBUX',
      logo: '♻️',
      oneLiner: 'Budgeting that scores your spend\'s carbon impact and nudges greener habits',
      caseStudy: {
        sections: [
          {
            title: '1) Executive Summary',
            content: `GreenBucks is a personal-finance web app that turns raw bank transactions into actionable sustainability insights. It connects via Plaid to ingest transactions, computes carbon impact per purchase with a Carbon Impact API, and uses goal-based nudges to shift spending toward greener alternatives—without sacrificing budget control.\nTagline: Budgeting that scores your spend’s carbon impact and nudges greener habits.`
          },
          {
            title: '2) User & Use Case',
            content: [
              'Who: Students/young professionals who already track spending (Mint/Simplifi/Sheets) and care about sustainability but lack clear, per-purchase carbon visibility.',
              'Core JTBD: “Help me see where my money goes, how carbon-intensive it is, and how to improve—automatically.”'
            ]
          },
          {
            title: '3) How a User Uses It (End-to-End Journey)',
            content: [
              'Secure Connect (2–3 min): User connects checking/credit accounts with Plaid (OAuth flow). Consent screen explains data use; PII minimized and tokenized.',
              'Auto-Ingest & Categorize (instant): Transactions pulled (last 90 days). Merchant and category normalized; rules applied (e.g., groceries vs. takeout).',
              'Carbon Scoring (seconds): For each transaction, the Carbon Impact API estimates kg CO₂e using merchant/category + price, refined by known product/brand signals where available. A Green Score (0–100) is computed at purchase, category, and month levels.',
              'Goals & Nudges (ongoing): User sets monthly green targets (e.g., raise “green spend share” from 22% → 30%). Weekly nudges: swap suggestions, category caps, and merchant alternatives.',
              'Review & Act (weekly): Dashboard shows spend vs. budget, CO₂e trend, green share, and top emitters. One-click actions: re-categorize, set a category cap, accept a suggested swap, mark recurring.',
              'Month-End Reflection: “Earnings-style” summary: total spend, total CO₂e, % goal met, top improvements, and 2–3 concrete next steps. Optional export (CSV/PDF).'
            ]
          },
          {
            title: '4) Product Anatomy (What’s Inside)',
            content: [
              'Ingestion: Plaid Items → Webhooks for new transactions → ETL normalize.',
              'Scoring: Carbon Impact API → per-transaction kg CO₂e → roll-ups (category, merchant, month).',
              'Intelligence: Green Score = scaled inverse of CO₂e vs. category baseline; Green Spend Share = % of spend at greener-than-median merchants/items; Nudge Engine = rules + heuristics.',
              'UX: React (cards, sparklines), goal progress ring, weekly digest, accessible color tokens.',
              'Privacy/Security: tokenized access; no card numbers stored; encrypted at rest/in transit; clear data-deletion flow.'
            ]
          },
          {
            title: '5) Impact (What Changes for the User)',
            content: [
              'Near-term (first 4–6 weeks): Awareness of top emitting categories and merchant patterns; 1–2 swap nudges/week.',
              'Outcomes: Green spend share trends upward (+5–10 pp early cohorts); goal adherence improves; clarity on footprint changes.',
              'Illustrative KPIs: Linked Accounts; Carbon Tracked (30d); Green Spend Share; Goal Adherence; Nudge Acceptance Rate.'
            ]
          },
          {
            title: '6) Example Scenario (Concrete Walkthrough)',
            content: [
              'Aarya connects 2 cards; 1,200 transactions imported (90d).',
              'Dashboard flags Restaurants/Delivery as top emitters; Groceries show high-packaging subcategories.',
              'Weekly nudge: groceries swap list, a cap on delivery spend, two greener merchants nearby.',
              'After 1 month: green spend share 24% → 32%, CO₂e per $ declines; monthly green goal met.'
            ]
          },
          {
            title: '7) Why It Works (Design Principles)',
            content: [
              'Frictionless inputs: Plaid + API (no manual itemization).',
              'Explainable metrics: every nudge/score links back to transactions.',
              'Behavioral fit: gentle caps + swaps; visible, adjustable goals.',
              'On-theme analytics: clean terminal vibe; sparklines, deltas, concise chips.'
            ]
          }
        ]
      },
      bullets: {
        problem: 'Budget apps don’t connect spending to environmental impact or nudge better habits.',
        solution: 'End-to-end app with Plaid bank sync, Carbon Impact API per transaction, and goal-based nudges (weekly/monthly green targets with notifications).',
        impact: 'Automated categorization + carbon scoring turns raw statements into actionable insights; early runs show higher “green spend share” and better month-end goal adherence.',
        future: 'Rewards/marketplace for eco-merchants, anomaly detection for mislabeled transactions, social/teammate challenges.'
      },
      tags: ['FinTech', 'Sustainability', 'Personal Finance'],
      stack: ['TypeScript', 'React', 'Node.js', 'Plaid', 'Carbon API'],
      domain: 'FinTech',
      status: 'Active',
      stars: 0,
      lastUpdate: 'today',
      commits: [4,6,7,9,8,10,11,12,11,10,12,13,14,13,12],
      starsOverTime: [0,0,0,0,0,0,0,0,0,0],
      impact: 82,
      complexity: 68,
      linesOfCode: 2800,
      files: 40,
      lastRelease: 'v0.4.0',
      demoLink: '',
      githubLink: 'https://github.com/apoorv/greenbucks',
      caseStudyLink: '#',
      effortVsImpact: { effort: 62, impact: 82 },
      contribVolume: 42,
      changelog: [
        { type: 'feature', text: 'Added Carbon API scoring per transaction', date: '3 days ago' },
        { type: 'commit', text: 'Plaid link + webhook ingestion', date: '1 week ago' },
        { type: 'milestone', text: 'Goals and weekly green targets MVP', date: '2 weeks ago' }
      ]
    },
    {
      id: 1,
      name: 'SmartSkillMatch',
      shortName: 'SSKM',
      logo: '🎯',
      oneLiner: 'AI resume ↔ JD matcher with gap analysis & learning roadmap',
      bullets: {
        problem: 'Candidates struggle to see resume–JD gaps and what to learn next.',
        solution: 'Streamlit app that parses PDFs, maps skills vs JD, and generates a learning roadmap with resources.',
        impact: 'Cut manual review time by ~70%; produced clear “matched/missing” skills and tailored learning plans.',
        future: 'Add ATS-parsing robustness, multi-JD comparison, and aggregate analytics for cohorts.'
      },
      tags: ['AI/ML', 'NLP', 'Career'],
      stack: ['Python', 'Streamlit', 'OpenAI', 'PyMuPDF', 'Plotly'],
      domain: 'AI/ML',
      status: 'Active',
      stars: 23,
      lastUpdate: '3 days ago',
      commits: [5,7,9,8,10,12,14,13,12,11,12,13,14,15,16],
      starsOverTime: [0,2,5,9,12,15,17,19,20,23],
      impact: 72,
      complexity: 70,
      linesOfCode: 3400,
      files: 42,
      lastRelease: 'v0.9.0',
      demoLink: 'https://smartskillmatch-demo.example.com',
      githubLink: 'https://github.com/apoorv/smartskillmatch',
      caseStudyLink: '#',
      effortVsImpact: { effort: 70, impact: 72 },
      contribVolume: 64,
      changelog: [
        { type: 'feature', text: 'Added gap analysis & upskilling roadmap', date: '3 days ago' },
        { type: 'commit', text: 'PDF resume parsing improvements (PyMuPDF)', date: '1 week ago' },
        { type: 'demo', text: 'Deployed Streamlit demo', date: '2 weeks ago' }
      ]
    },
    {
      id: 2,
      name: 'StartupX – Agentic Startup Evaluator',
      shortName: 'STUX',
      logo: '🚀',
      oneLiner: 'Agents that score ideas, size markets, and draft decks/Q&A',
      bullets: {
        problem: 'Early founders need fast, structured validation (market size, risks, pitch assets).',
        solution: 'Agentic workflow that scores ideas, estimates TAM/SAM/SOM, and drafts deck sections + VC Q&A.',
        impact: 'Standardized idea reviews; turned fuzzy ideas into consistent, comparable reports.',
        future: 'Live market data connectors, investor-style scorecards, and PDF deck export.'
      },
      tags: ['Agents', 'LLM', 'Product'],
      stack: ['TypeScript', 'React', 'LangChain', 'OpenAI'],
      domain: 'AI/ML',
      status: 'WIP',
      stars: 8,
      lastUpdate: '5 days ago',
      commits: [2,3,4,5,6,4,5,6,7,5,4,6,7,8,9],
      starsOverTime: [0,1,2,3,4,5,6,7,8,8],
      impact: 65,
      complexity: 68,
      linesOfCode: 1800,
      files: 28,
      lastRelease: 'v0.2.0',
      demoLink: 'https://startupx-demo.example.com',
      githubLink: 'https://github.com/apoorv/startupx-agent-evaluator',
      caseStudyLink: '#',
      effortVsImpact: { effort: 60, impact: 65 },
      contribVolume: 22,
      changelog: [
        { type: 'feature', text: 'Agent loop added for idea scoring', date: '5 days ago' },
        { type: 'commit', text: 'Deck generator MVP', date: '1 week ago' },
        { type: 'demo', text: 'Hosted demo link published', date: '2 weeks ago' }
      ]
    },
    {
      id: 3,
      name: 'Automated MLOps Pipeline on AWS',
      shortName: 'MLOP',
      logo: '⚙️',
      oneLiner: 'CI/CD → SageMaker train/deploy with (planned) monitoring',
      bullets: {
        problem: 'Slow, manual ML deployment with poor reproducibility.',
        solution: 'CI/CD to launch SageMaker training and deploy endpoints; versioned data/model artifacts in S3.',
        impact: 'Hours-to-minutes deploys; auditable runs and rollback safety.',
        future: 'Add Model Monitor (data drift), shadow deployments, and cost dashboards.'
      },
      tags: ['MLOps', 'AWS', 'CI/CD'],
      stack: ['Python', 'AWS SageMaker', 'S3', 'IAM/OIDC', 'GitHub Actions'],
      domain: 'AI/ML',
      status: 'Active',
      stars: 18,
      lastUpdate: '1 day ago',
      commits: [3,4,6,8,10,11,13,12,11,12,13,15,16,17,18],
      starsOverTime: [0,1,2,4,6,9,12,14,16,18],
      impact: 76,
      complexity: 82,
      linesOfCode: 4100,
      files: 58,
      lastRelease: 'v0.7.0',
      demoLink: '',
      githubLink: 'https://github.com/apoorv/aws-mlops-pipeline',
      caseStudyLink: '#',
      effortVsImpact: { effort: 78, impact: 76 },
      contribVolume: 48,
      changelog: [
        { type: 'commit', text: 'SageMaker training/deploy pipeline green', date: '1 day ago' },
        { type: 'feature', text: 'Added IaC for roles with OIDC', date: '4 days ago' },
        { type: 'milestone', text: 'CI workflow passing on main', date: '1 week ago' }
      ]
    },
    {
      id: 4,
      name: 'UrbanIQ',
      shortName: 'URBQ',
      logo: '🏙️',
      oneLiner: 'Satellite + demographics fusion for city insights',
      bullets: {
        problem: 'City planners lack an easy way to fuse satellite signals with population data.',
        solution: 'TS/React interface + Python ETL to join remote-sensing features with demographics.',
        impact: 'Produced comparable city blocks with quick filters for hotspots and trends.',
        future: 'Bring-your-own-geo upload, time-lapse layers, and exportable policy briefs.'
      },
      tags: ['Geo', 'Analytics', 'Civic'],
      stack: ['TypeScript', 'React', 'GeoJSON', 'Python ETL'],
      domain: 'Urban',
      status: 'WIP',
      stars: 6,
      lastUpdate: '6 days ago',
      commits: [1,2,2,3,4,3,4,5,6,5,6,6,7,8,8],
      starsOverTime: [0,1,1,2,3,3,4,5,5,6],
      impact: 60,
      complexity: 64,
      linesOfCode: 2200,
      files: 34,
      lastRelease: 'v0.1.3',
      demoLink: 'https://urbaniq-demo.example.com',
      githubLink: 'https://github.com/apoorv/urbaniq',
      caseStudyLink: '#',
      effortVsImpact: { effort: 55, impact: 60 },
      contribVolume: 18,
      changelog: [
        { type: 'feature', text: 'Added choropleth for demographic overlays', date: '6 days ago' },
        { type: 'commit', text: 'ETL for satellite tiles baseline', date: '2 weeks ago' },
        { type: 'demo', text: 'Published demo map', date: '3 weeks ago' }
      ]
    },
    {
      id: 5,
      name: 'Urban Soundscape & Well-being',
      shortName: 'USWB',
      logo: '🎧',
      oneLiner: 'Classify urban audio and link to well-being indices',
      bullets: {
        problem: 'Hard to quantify how urban noise profiles relate to quality of life.',
        solution: 'Audio ML (mel-spec CNN) + spatial joins to correlate sound classes with well-being indices.',
        impact: 'Early signal that certain acoustic profiles track with survey outcomes.',
        future: 'Larger in-situ dataset, domain adaptation, differential privacy for geo release.'
      },
      tags: ['Audio ML', 'Urban', 'Research'],
      stack: ['Python', 'Librosa', 'CNN', 'Pandas', 'GeoPandas'],
      domain: 'Research',
      status: 'In progress',
      stars: 14,
      lastUpdate: '2 weeks ago',
      commits: [2,3,5,7,8,6,5,4,3,4,5,6,6,5,5],
      starsOverTime: [0,1,2,3,5,7,9,11,12,14],
      impact: 68,
      complexity: 78,
      linesOfCode: 2600,
      files: 36,
      lastRelease: 'v0.3.0',
      demoLink: '',
      githubLink: 'https://github.com/apoorv/urban-sound-wellbeing',
      caseStudyLink: '#',
      effortVsImpact: { effort: 66, impact: 68 },
      contribVolume: 20,
      changelog: [
        { type: 'paper', text: 'Preparing dataset alignment with well-being indices', date: '2 weeks ago' },
        { type: 'commit', text: 'CNN baseline + evaluation', date: '1 month ago' },
        { type: 'milestone', text: 'Audio ingestion pipeline ready', date: '2 months ago' }
      ]
    },
    {
      id: 6,
      name: 'NVDA Stock Forecasting (LSTM)',
      shortName: 'NVDA',
      logo: '📊',
      oneLiner: 'Sequence model to forecast NVDA returns',
      bullets: {
        problem: 'Naive heuristics miss temporal dependencies in equity returns.',
        solution: 'LSTM sequence model with sliding windows and baseline comparisons.',
        impact: 'Showed conditions where sequence models outperform simple lags.',
        future: 'Regime detection, risk-aware loss functions, and cross-asset generalization.'
      },
      tags: ['Time Series', 'Finance', 'LSTM'],
      stack: ['Python', 'Keras/TensorFlow', 'yfinance', 'scikit-learn'],
      domain: 'Finance',
      status: 'Archive/Study',
      stars: 9,
      lastUpdate: '3 months ago',
      commits: [1,1,2,2,3,2,2,3,3,3,2,2,1,1,1],
      starsOverTime: [0,1,1,2,3,4,5,6,7,9],
      impact: 50,
      complexity: 58,
      linesOfCode: 1200,
      files: 16,
      lastRelease: 'v1.0.0',
      demoLink: '',
      githubLink: 'https://github.com/apoorv/nvda-lstm-forecast',
      caseStudyLink: '#',
      effortVsImpact: { effort: 40, impact: 50 },
      contribVolume: 8,
      changelog: [
        { type: 'blog', text: 'Write-up on model performance and pitfalls', date: '3 months ago' },
        { type: 'commit', text: 'Finalized notebook and results', date: '4 months ago' },
        { type: 'milestone', text: 'Baseline comparisons complete', date: '5 months ago' }
      ]
    },
    {
      id: 7,
      name: 'Agentic Strategy Backtester',
      shortName: 'ASTB',
      logo: '🧪',
      oneLiner: 'JSON-driven strategies + agent loop for research',
      bullets: {
        problem: 'Mixing strategy logic with research loops makes experiments unrepeatable.',
        solution: 'JSON-first strategy spec + agent loop; CLI to run/replay experiments.',
        impact: 'Cleaner ablations and apples-to-apples backtests.',
        future: 'Transaction-cost models, walk-forward validation, and plugin risk rules.'
      },
      tags: ['Backtesting', 'Agents', 'CLI'],
      stack: ['Python', 'Pydantic', 'Backtesting libs'],
      domain: 'Research',
      status: 'WIP',
      stars: 7,
      lastUpdate: '1 week ago',
      commits: [1,2,3,4,5,6,5,4,5,6,6,7,7,8,8],
      starsOverTime: [0,1,1,2,3,4,5,6,6,7],
      impact: 58,
      complexity: 62,
      linesOfCode: 1600,
      files: 22,
      lastRelease: 'v0.3.0',
      demoLink: '',
      githubLink: 'https://github.com/apoorv/agentic-backtester',
      caseStudyLink: '#',
      effortVsImpact: { effort: 55, impact: 58 },
      contribVolume: 16,
      changelog: [
        { type: 'commit', text: 'Strategy schema with Pydantic', date: '1 week ago' },
        { type: 'feature', text: 'Agent loop prototype', date: '2 weeks ago' },
        { type: 'blog', text: 'Design memo on agentic research', date: '3 weeks ago' }
      ]
    },
    {
      id: 8,
      name: 'Elections & Stock Trends (2000–2024)',
      shortName: 'ELXN',
      logo: '🗳️',
      oneLiner: 'Exploratory analysis of markets around U.S. elections',
      bullets: {
        problem: 'Anecdotes about elections and markets lack systematic evidence.',
        solution: 'Collected pre/post-election windows and analyzed sector/index behavior.',
        impact: 'Clear visuals of typical drift/volatility patterns around elections.',
        future: 'Macro controls (rates, CPI), international elections, and factor-tilted portfolios.'
      },
      tags: ['EDA', 'Finance', 'Elections'],
      stack: ['Python', 'Pandas', 'Matplotlib', 'Plotly'],
      domain: 'Finance',
      status: 'Complete/Read-only',
      stars: 11,
      lastUpdate: '1 month ago',
      commits: [1,2,1,2,1,2,1,2,1,1,1,1,1,1,1],
      starsOverTime: [0,1,2,3,4,6,7,9,10,11],
      impact: 54,
      complexity: 40,
      linesOfCode: 900,
      files: 12,
      lastRelease: 'v1.0.0',
      demoLink: '',
      githubLink: 'https://github.com/apoorv/elections-stock-trends',
      caseStudyLink: '#',
      effortVsImpact: { effort: 35, impact: 54 },
      contribVolume: 10,
      changelog: [
        { type: 'blog', text: 'Insights: volatility around debates', date: '1 month ago' },
        { type: 'commit', text: 'Cleaned FRED + Yahoo Finance data', date: '2 months ago' },
        { type: 'milestone', text: 'Initial charts and notebook', date: '3 months ago' }
      ]
    },
    {
      id: 9,
      name: 'Spotify EDA (R)',
      shortName: 'SPTR',
      logo: '🎶',
      oneLiner: 'Large-scale track analysis & visualizations',
      bullets: {
        problem: 'Playlist/track decisions are made without large-scale descriptive insight.',
        solution: 'Tidyverse EDA on >100k tracks with genre/tempo/key distributions and trends.',
        impact: 'Reusable figures that inform recommender features and curation rules.',
        future: 'Time-aware trend analysis and artist/label segmentation.'
      },
      tags: ['R', 'EDA', 'Music'],
      stack: ['R', 'tidyverse', 'ggplot2'],
      domain: 'EDA',
      status: 'Complete',
      stars: 13,
      lastUpdate: '2 months ago',
      commits: [1,1,2,2,3,3,4,3,2,2,2,1,1,1,1],
      starsOverTime: [0,1,2,3,4,5,7,9,11,13],
      impact: 52,
      complexity: 38,
      linesOfCode: 650,
      files: 10,
      lastRelease: 'v1.0.0',
      demoLink: '',
      githubLink: 'https://github.com/apoorv/spotify-eda-r',
      caseStudyLink: '#',
      effortVsImpact: { effort: 30, impact: 52 },
      contribVolume: 7,
      changelog: [
        { type: 'commit', text: 'Added genre distribution plots', date: '2 months ago' },
        { type: 'feature', text: 'Energy/valence clustering', date: '3 months ago' },
        { type: 'milestone', text: 'Initial data ingest', date: '4 months ago' }
      ]
    },
    {
      id: 10,
      name: 'Spotify Recommender (Python)',
      shortName: 'SPRP',
      logo: '💡',
      oneLiner: 'KNN/similarity + clustering “mood” playlists',
      bullets: {
        problem: 'Cold-start and “mood” matching aren’t obvious from raw metadata.',
        solution: 'Similarity/KNN with clustering (e.g., t-SNE/UMAP) to form mood neighborhoods.',
        impact: 'Prototype playlists that feel coherent without heavy training.',
        future: 'Hybrid model with implicit feedback and session-based reranking.'
      },
      tags: ['Recommender', 'Python', 'Music'],
      stack: ['Python', 'scikit-learn', 't-SNE', 'UMAP'],
      domain: 'AI/ML',
      status: 'Prototype',
      stars: 6,
      lastUpdate: '3 weeks ago',
      commits: [1,2,3,3,4,4,5,5,6,6,5,5,4,4,3],
      starsOverTime: [0,1,1,2,3,4,5,5,6,6],
      impact: 48,
      complexity: 50,
      linesOfCode: 1200,
      files: 18,
      lastRelease: 'v0.1.0',
      demoLink: '',
      githubLink: 'https://github.com/apoorv/spotify-recommender',
      caseStudyLink: '#',
      effortVsImpact: { effort: 40, impact: 48 },
      contribVolume: 12,
      changelog: [
        { type: 'commit', text: 'Added UMAP mood clustering', date: '3 weeks ago' },
        { type: 'feature', text: 'KNN-based recommendations', date: '1 month ago' },
        { type: 'milestone', text: 'Initial dataset curated', date: '2 months ago' }
      ]
    }
  ];

  const filteredProjects = projects.filter(project => {
    const stackMatch = selectedFilters.stack === 'all' || 
      project.stack.some(tech => tech.toLowerCase().includes(selectedFilters.stack.toLowerCase()));
    const domainMatch = selectedFilters.domain === 'all' || project.domain === selectedFilters.domain;
    const statusMatch = selectedFilters.status === 'all' || project.status === selectedFilters.status;
    
    return stackMatch && domainMatch && statusMatch;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case 'stars':
        return b.stars - a.stars;
      case 'impact':
        return b.impact - a.impact;
      case 'activity':
        return b.contribVolume - a.contribVolume;
      case 'updated':
        return new Date(b.lastUpdate) - new Date(a.lastUpdate);
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
      className="space-y-6 projects-ghost-candles"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 relative z-10">
        <div>
          <h2 className="text-3xl font-bold text-dark-text mb-2">Top Projects</h2>
          <p className="text-dark-muted">Real-time project portfolio with trading-style analytics</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {/* Timeframe toggles */}
          {['7', '30', '90', '365'].map((days) => (
            <motion.button
              key={days}
              onClick={() => setSelectedTimeframe(days)}
              className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                selectedTimeframe === days
                  ? 'bg-accent-blue text-white'
                  : 'bg-gray-800 text-dark-muted hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {days === '7' ? '1W' : days === '30' ? '1M' : days === '90' ? '3M' : '1Y'}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Filters and Sort */}
      <motion.div variants={itemVariants} className="relative z-10">
        <ProjectFilters 
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </motion.div>

      {/* Projects Grid */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10"
      >
        <AnimatePresence>
          {sortedProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              layout
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard 
                project={project} 
                timeframe={selectedTimeframe}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Summary Stats */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8"
      >
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-accent-green">{projects.length}</div>
          <div className="text-sm text-dark-muted">Total Projects</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-accent-cyan">
            {projects.reduce((sum, p) => sum + p.stars, 0)}
          </div>
          <div className="text-sm text-dark-muted">Total Stars</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-accent-yellow">
            {projects.reduce((sum, p) => sum + p.linesOfCode, 0).toLocaleString()}
          </div>
          <div className="text-sm text-dark-muted">Lines of Code</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-accent-red">
            {projects.filter(p => p.status === 'Active').length}
          </div>
          <div className="text-sm text-dark-muted">Active Projects</div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectsWatchlist;
