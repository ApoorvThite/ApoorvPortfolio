import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const SparklineChart = ({ data, color = '#7DF9FF', height = 60, width = '100%' }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || !data.length) return;

    const svgWidth = svg.clientWidth || 300;
    const svgHeight = height;
    const padding = 4;

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = Math.max(1, max - min);

    // Clear previous content
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    // Create path
    let pathData = '';
    data.forEach((value, index) => {
      const x = (index / (data.length - 1)) * (svgWidth - 2 * padding) + padding;
      const y = svgHeight - padding - ((value - min) / range) * (svgHeight - 2 * padding);
      
      if (index === 0) {
        pathData += `M ${x} ${y}`;
      } else {
        pathData += ` L ${x} ${y}`;
      }
    });

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData);
    path.setAttribute('stroke', color);
    path.setAttribute('stroke-width', '2');
    path.setAttribute('fill', 'none');
    path.setAttribute('vector-effect', 'non-scaling-stroke');
    path.style.filter = `drop-shadow(0 0 4px ${color}40)`;

    // Animate path drawing
    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;
    path.style.animation = 'drawPath 1s ease-out forwards';

    svg.appendChild(path);

    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes drawPath {
        to {
          stroke-dashoffset: 0;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, [data, color, height]);

  return (
    <motion.div 
      className="w-full"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="w-full"
        preserveAspectRatio="none"
      />
    </motion.div>
  );
};

export default SparklineChart;
