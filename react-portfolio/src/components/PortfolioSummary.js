import React from 'react';
import { motion } from 'framer-motion';

const PortfolioSummary = ({ positions }) => {
  const openPositions = positions.filter(p => p.status === 'open');
  const closedPositions = positions.filter(p => p.status === 'closed');
  
  // Calculate total realized gains
  const totalRealizedGains = closedPositions.reduce((total, position) => {
    return total + position.pnl.realized.length;
  }, 0);

  // Calculate total unrealized gains
  const totalUnrealizedGains = openPositions.reduce((total, position) => {
    return total + position.pnl.unrealized.length;
  }, 0);

  // Calculate total dividends (awards, publications, etc.)
  const totalDividends = positions.reduce((total, position) => {
    return total + position.dividends.length;
  }, 0);

  // Calculate total earnings calls
  const totalEarningsCalls = positions.reduce((total, position) => {
    return total + position.earningsCalls.length;
  }, 0);

  // Calculate portfolio diversity (different types)
  const positionTypes = [...new Set(positions.map(p => p.type))];
  
  // Calculate average duration
  const totalMonths = positions.reduce((total, position) => {
    const start = new Date(position.entryDate);
    const end = position.exitDate ? new Date(position.exitDate) : new Date();
    const months = Math.round((end - start) / (1000 * 60 * 60 * 24 * 30));
    return total + months;
  }, 0);
  const avgDuration = Math.round(totalMonths / positions.length);

  const summaryStats = [
    {
      label: 'Portfolio Value',
      value: `${positions.length} Positions`,
      subValue: `${openPositions.length} Active`,
      color: 'text-accent-cyan',
      bgColor: 'bg-cyan-900',
      icon: '💼'
    },
    {
      label: 'Realized P&L',
      value: `+${totalRealizedGains} Gains`,
      subValue: `${closedPositions.length} Closed`,
      color: 'text-green-400',
      bgColor: 'bg-green-900',
      icon: '📈'
    },
    {
      label: 'Unrealized P&L',
      value: `+${totalUnrealizedGains} Gains`,
      subValue: `${openPositions.length} Open`,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-900',
      icon: '⏳'
    },
    {
      label: 'Dividends',
      value: `${totalDividends} Awards`,
      subValue: 'Publications & Recognition',
      color: 'text-purple-400',
      bgColor: 'bg-purple-900',
      icon: '🏆'
    },
    {
      label: 'Earnings Calls',
      value: `${totalEarningsCalls} Events`,
      subValue: 'Demos & Presentations',
      color: 'text-blue-400',
      bgColor: 'bg-blue-900',
      icon: '🎤'
    },
    {
      label: 'Diversification',
      value: `${positionTypes.length} Sectors`,
      subValue: `Avg ${avgDuration}mo Duration`,
      color: 'text-orange-400',
      bgColor: 'bg-orange-900',
      icon: '🎯'
    }
  ];

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
      className="bg-dark-panel border border-dark-border rounded-lg p-6"
    >
      <motion.h3 
        variants={itemVariants}
        className="text-lg font-semibold text-dark-text mb-4"
      >
        Portfolio Summary
      </motion.h3>
      
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4"
      >
        {summaryStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            className={`${stat.bgColor} bg-opacity-20 border border-opacity-50 rounded-lg p-4 text-center hover:scale-105 transition-transform cursor-pointer`}
            style={{ borderColor: `var(--${stat.color.split('-')[1]}-${stat.color.split('-')[2]})` }}
            whileHover={{ y: -2 }}
          >
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className={`text-lg font-bold ${stat.color} mb-1`}>
              {stat.value}
            </div>
            <div className="text-xs text-dark-muted">{stat.label}</div>
            <div className="text-xs text-gray-400 mt-1">{stat.subValue}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Performance Indicators */}
      <motion.div 
        variants={itemVariants}
        className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4"
      >
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-dark-muted">Success Rate</span>
            <span className="text-sm font-semibold text-green-400">100%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-green-400 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-dark-muted">Portfolio Growth</span>
            <span className="text-sm font-semibold text-accent-cyan">+{positions.length * 20}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-accent-cyan h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '85%' }}
              transition={{ duration: 1.5, delay: 0.7 }}
            />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-dark-muted">Risk-Adjusted Return</span>
            <span className="text-sm font-semibold text-yellow-400">High</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-yellow-400 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '90%' }}
              transition={{ duration: 1.5, delay: 0.9 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Market Outlook */}
      <motion.div 
        variants={itemVariants}
        className="mt-6 p-4 bg-gradient-to-r from-green-900 to-blue-900 bg-opacity-20 border border-green-700 rounded-lg"
      >
        <div className="flex items-center gap-3">
          <div className="text-2xl">📊</div>
          <div>
            <h4 className="font-semibold text-green-400">Market Outlook: Bullish</h4>
            <p className="text-sm text-gray-300">
              Strong performance across all sectors with consistent growth in AI/ML and FinTech positions. 
              Active diversification strategy showing positive returns.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PortfolioSummary;
