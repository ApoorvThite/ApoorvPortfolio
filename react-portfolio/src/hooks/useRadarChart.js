import { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

const useRadarChart = (containerId, data, options = {}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container || !data) return;

    const defaultOptions = {
      chart: {
        type: 'radar',
        height: 320,
        foreColor: '#cfcfcf',
        toolbar: { show: false },
        animations: { enabled: true }
      },
      series: [{ name: 'Score', data: data.scores }],
      xaxis: {
        categories: data.categories,
        labels: { style: { colors: '#9aa0a6' } }
      },
      yaxis: { show: false, min: 0, max: 10 },
      plotOptions: {
        radar: {
          polygons: {
            strokeColors: '#2a2a2a',
            fill: { colors: ['#151515', '#121212'] }
          }
        }
      },
      stroke: { width: 2, colors: ['#7DF9FF'] },
      fill: { opacity: 0.25, colors: ['#7DF9FF'] },
      markers: { 
        size: 4, 
        colors: ['#1a1a1a'], 
        strokeColors: '#7DF9FF', 
        strokeWidth: 2 
      },
      tooltip: {
        custom: function({ series, seriesIndex, dataPointIndex, w }) {
          const cat = w.globals.labels[dataPointIndex];
          const val = series[seriesIndex][dataPointIndex];
          const notes = data.notes || {};
          const note = notes[cat] || '';
          
          return `<div style="padding:8px 10px;background:#121212;border:1px solid #2a2a2a;color:#eaeaea;border-radius:6px;">
                    <div style="font-weight:600;margin-bottom:4px;">${cat}: ${val.toFixed(2)}</div>
                    <div style="font-size:.85rem;color:#9aa0a6;max-width:220px;">${note}</div>
                  </div>`;
        }
      },
      ...options
    };

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new ApexCharts(container, defaultOptions);
    chartRef.current.render();

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [containerId, data, options]);

  return chartRef.current;
};

export default useRadarChart;
