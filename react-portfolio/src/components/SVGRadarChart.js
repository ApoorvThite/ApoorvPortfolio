import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const SVGRadarChart = () => {
  const svgRef = useRef();
  const [hoveredPoint, setHoveredPoint] = useState(null);
  
  const data = {
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

  const center = 160;
  const maxRadius = 120;
  const levels = 5;

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Clear previous content
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    // Create background grid
    for (let level = 1; level <= levels; level++) {
      const radius = (maxRadius / levels) * level;
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', center);
      circle.setAttribute('cy', center);
      circle.setAttribute('r', radius);
      circle.setAttribute('fill', 'none');
      circle.setAttribute('stroke', '#2a2a2a');
      circle.setAttribute('stroke-width', '1');
      svg.appendChild(circle);
    }

    // Create axis lines and labels
    data.categories.forEach((category, index) => {
      const angle = (index * 2 * Math.PI) / data.categories.length - Math.PI / 2;
      const x = center + maxRadius * Math.cos(angle);
      const y = center + maxRadius * Math.sin(angle);

      // Axis line
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', center);
      line.setAttribute('y1', center);
      line.setAttribute('x2', x);
      line.setAttribute('y2', y);
      line.setAttribute('stroke', '#2a2a2a');
      line.setAttribute('stroke-width', '1');
      svg.appendChild(line);

      // Label
      const labelX = center + (maxRadius + 20) * Math.cos(angle);
      const labelY = center + (maxRadius + 20) * Math.sin(angle);
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', labelX);
      text.setAttribute('y', labelY);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dominant-baseline', 'middle');
      text.setAttribute('fill', '#9aa0a6');
      text.setAttribute('font-size', '12');
      text.textContent = category;
      svg.appendChild(text);
    });

    // Create data polygon
    let pathData = '';
    const points = [];
    
    data.scores.forEach((score, index) => {
      const angle = (index * 2 * Math.PI) / data.categories.length - Math.PI / 2;
      const radius = (score / 10) * maxRadius;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      points.push({ x, y, score, category: data.categories[index] });
      
      if (index === 0) {
        pathData += `M ${x} ${y}`;
      } else {
        pathData += ` L ${x} ${y}`;
      }
    });
    pathData += ' Z';

    // Data area
    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    polygon.setAttribute('d', pathData);
    polygon.setAttribute('fill', '#7DF9FF');
    polygon.setAttribute('fill-opacity', '0.25');
    polygon.setAttribute('stroke', '#7DF9FF');
    polygon.setAttribute('stroke-width', '2');
    svg.appendChild(polygon);

    // Data points
    points.forEach((point, index) => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', point.x);
      circle.setAttribute('cy', point.y);
      circle.setAttribute('r', '4');
      circle.setAttribute('fill', '#1a1a1a');
      circle.setAttribute('stroke', '#7DF9FF');
      circle.setAttribute('stroke-width', '2');
      circle.style.cursor = 'pointer';
      
      circle.addEventListener('mouseenter', () => {
        setHoveredPoint({
          category: point.category,
          score: point.score,
          note: data.notes[point.category]
        });
      });
      
      circle.addEventListener('mouseleave', () => {
        setHoveredPoint(null);
      });
      
      svg.appendChild(circle);
    });

  }, []);

  const average = (data.scores.reduce((a, b) => a + b, 0) / data.scores.length).toFixed(2);
  const overallRating = average >= 8.5 ? 'Strong' : (average >= 7.5 ? 'Outperform' : 'Neutral');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="panel"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-dark-text">Quant Rating</h3>
        <div className="text-sm text-dark-muted">
          Updated on {new Date().toLocaleDateString()}
        </div>
      </div>

      <div className="bg-gray-800 border border-dark-border rounded-lg p-3 mb-4 relative">
        <svg
          ref={svgRef}
          width="320"
          height="320"
          viewBox="0 0 320 320"
          className="w-full h-80"
        />
        
        {hoveredPoint && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-4 left-4 bg-gray-900 border border-gray-600 rounded-lg p-3 max-w-xs z-10"
          >
            <div className="font-semibold text-white mb-1">
              {hoveredPoint.category}: {hoveredPoint.score.toFixed(1)}
            </div>
            <div className="text-sm text-gray-300">
              {hoveredPoint.note}
            </div>
          </motion.div>
        )}
      </div>

      <motion.div 
        className="text-center mb-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      >
        <div className="text-2xl font-bold text-cyan-300 drop-shadow-lg">
          {average}
        </div>
      </motion.div>

      <div className="flex flex-wrap gap-2 mb-4">
        {data.categories.map((skill, index) => (
          <motion.span
            key={skill}
            className="bg-gray-800 border border-dark-border rounded-full px-3 py-1 text-sm text-gray-300 cursor-help"
            title={data.notes[skill]}
            whileHover={{ scale: 1.05, backgroundColor: '#374151' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            {skill}
          </motion.span>
        ))}
      </div>

      <div className="flex items-center gap-2 text-dark-text">
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
      </div>
    </motion.div>
  );
};

export default SVGRadarChart;
