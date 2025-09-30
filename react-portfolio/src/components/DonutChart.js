import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const DonutChart = ({ data }) => {
  const svgRef = useRef();
  const [hoveredSlice, setHoveredSlice] = useState(null);
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, content: '' });

  const center = 110;
  const radius = 80;
  const innerRadius = 48;
  const total = data.reduce((sum, item) => sum + item.value, 0);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Clear previous paths
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    let startAngle = -Math.PI / 2; // Start at top

    data.forEach((item, index) => {
      const angle = (item.value / total) * Math.PI * 2;
      const endAngle = startAngle + angle;

      // Create path for arc
      const largeArc = angle > Math.PI ? 1 : 0;
      const x0 = center + radius * Math.cos(startAngle);
      const y0 = center + radius * Math.sin(startAngle);
      const x1 = center + radius * Math.cos(endAngle);
      const y1 = center + radius * Math.sin(endAngle);

      const xi0 = center + innerRadius * Math.cos(endAngle);
      const yi0 = center + innerRadius * Math.sin(endAngle);
      const xi1 = center + innerRadius * Math.cos(startAngle);
      const yi1 = center + innerRadius * Math.sin(startAngle);

      const pathData = [
        `M ${x0} ${y0}`,
        `A ${radius} ${radius} 0 ${largeArc} 1 ${x1} ${y1}`,
        `L ${xi0} ${yi0}`,
        `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${xi1} ${yi1}`,
        'Z'
      ].join(' ');

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', pathData);
      path.setAttribute('fill', item.color);
      path.setAttribute('data-key', item.key);
      path.style.filter = `drop-shadow(0 0 4px ${item.color}40)`;
      path.style.cursor = 'pointer';
      path.style.transition = 'all 0.2s ease';

      // Hover effects
      path.addEventListener('mouseenter', (e) => {
        const mid = (startAngle + endAngle) / 2;
        const offset = 6;
        const tx = offset * Math.cos(mid);
        const ty = offset * Math.sin(mid);
        path.setAttribute('transform', `translate(${tx}, ${ty})`);
        
        setHoveredSlice(item.key);
        setTooltip({
          show: true,
          x: e.offsetX + 12,
          y: e.offsetY - 12,
          content: `${item.key}: ${item.value}%`
        });
      });

      path.addEventListener('mouseleave', () => {
        path.removeAttribute('transform');
        setHoveredSlice(null);
        setTooltip({ show: false, x: 0, y: 0, content: '' });
      });

      svg.appendChild(path);
      startAngle = endAngle;
    });
  }, [data, total]);

  return (
    <div className="relative">
      <motion.svg
        ref={svgRef}
        width="220"
        height="220"
        viewBox="0 0 220 220"
        className="drop-shadow-lg"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      
      {tooltip.show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute pointer-events-none bg-gray-900 text-white text-xs px-2 py-1 rounded border border-gray-600 z-10"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translate(-50%, -120%)'
          }}
        >
          {tooltip.content}
        </motion.div>
      )}
    </div>
  );
};

export default DonutChart;
