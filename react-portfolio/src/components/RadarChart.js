import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import useRadarChart from '../hooks/useRadarChart';

const RadarChart = () => {
  const chartData = {
    categories: ['AI/ML', 'Data Science', 'Full-Stack', 'FinTech', 'Cloud/DevOps'],
    scores: [9.4, 9.0, 7.1, 8.7, 8.7],
    notes: {
      'AI/ML': 'Deep learning (LSTM, CNN), SHAP explainability, GenAI agents.',
      'Data Science': 'Strong in stats, EDA, predictive modeling with real datasets.',
      'Full-Stack': 'React/Streamlit apps (SmartSkillMatch, StartupX, EcoSplit).',
      'FinTech': 'Stock forecasting, backtesting frameworks, elections & markets.',
      'Cloud/DevOps': 'AWS SageMaker pipelines, CI/CD with GitHub Actions, IAM/OIDC.'
    }
  };

  const chart = useRadarChart('skills-radar', chartData);
  const average = (chartData.scores.reduce((a, b) => a + b, 0) / chartData.scores.length).toFixed(2);
  const overallRating = average >= 8.5 ? 'Strong' : (average >= 7.5 ? 'Outperform' : 'Neutral');

  useEffect(() => {
    // Set date
    const dateEl = document.getElementById('qr-date');
    if (dateEl) {
      const d = new Date();
      dateEl.textContent = `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${d.getFullYear()}`;
    }

    // Set legend tooltips
    const legendNotes = {
      'AI/ML': 'Deep learning (LSTM, CNN), SHAP explainability, GenAI agents.',
      'Data Science': 'Strong in stats, EDA, predictive modeling with real datasets.',
      'Full‑Stack': 'React/Streamlit apps (SmartSkillMatch, StartupX, EcoSplit).',
      'Full-Stack': 'React/Streamlit apps (SmartSkillMatch, StartupX, EcoSplit).',
      'FinTech': 'Stock forecasting, backtesting frameworks, elections & markets.',
      'Cloud/DevOps': 'AWS SageMaker pipelines, CI/CD with GitHub Actions, IAM/OIDC.'
    };

    setTimeout(() => {
      document.querySelectorAll('.qr-legend .pill').forEach((pill) => {
        const key = pill.textContent.trim();
        if (legendNotes[key]) {
          pill.setAttribute('title', legendNotes[key]);
        }
      });
    }, 100);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="panel"
    >
      <motion.div 
        variants={itemVariants}
        className="flex justify-between items-center mb-2"
      >
        <h3 className="text-lg font-semibold text-dark-text">Quant Rating</h3>
        <div className="text-sm text-dark-muted">
          Updated on <span id="qr-date"></span>
        </div>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="bg-gray-800 border border-dark-border rounded-lg p-3 mb-4"
      >
        <div id="skills-radar" className="w-full h-80"></div>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="text-center mb-4"
      >
        <motion.div 
          className="text-2xl font-bold text-cyan-300 drop-shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        >
          {average}
        </motion.div>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="flex flex-wrap gap-2 mb-4"
      >
        {chartData.categories.map((skill, index) => (
          <motion.span
            key={skill}
            className="bg-gray-800 border border-dark-border rounded-full px-3 py-1 text-sm text-gray-300 pill cursor-help"
            whileHover={{ scale: 1.05, backgroundColor: '#374151' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="flex items-center gap-2 text-dark-text"
      >
        <strong>Overall Rating:</strong>
        <motion.span 
          className="inline-flex items-center gap-2 bg-green-900 border border-green-700 text-green-200 px-2 py-1 rounded-full text-sm"
          whileHover={{ scale: 1.05 }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4l6 6h-4v10H10V10H6l6-6z" fill="#1db954"/>
          </svg>
          {overallRating}
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default RadarChart;
