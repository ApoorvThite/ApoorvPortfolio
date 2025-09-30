import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PositionCard = ({ position, isOpen }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showDetails, setShowDetails] = useState(false);

  const getStatusColor = (status) => {
    return status === 'open' 
      ? 'text-green-400 bg-green-900 border-green-700'
      : 'text-blue-400 bg-blue-900 border-blue-700';
  };

  const getVolatilityColor = (level) => {
    switch (level) {
      case 'High':
        return 'text-red-400 bg-red-900 border-red-700';
      case 'Medium':
        return 'text-yellow-400 bg-yellow-900 border-yellow-700';
      case 'Low':
        return 'text-green-400 bg-green-900 border-green-700';
      default:
        return 'text-gray-400 bg-gray-900 border-gray-700';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  };

  const calculateDuration = () => {
    const start = new Date(position.entryDate);
    const end = position.exitDate ? new Date(position.exitDate) : new Date();
    const months = Math.round((end - start) / (1000 * 60 * 60 * 24 * 30));
    return `${months} months`;
  };

  const allPnL = [...position.pnl.realized, ...position.pnl.unrealized];

  return (
    <motion.div
      className="bg-dark-panel border border-dark-border rounded-lg overflow-hidden hover:border-accent-cyan transition-all duration-200"
      whileHover={{ y: -2, boxShadow: "0 8px 25px rgba(0,0,0,0.3)" }}
      onHoverStart={() => setShowDetails(true)}
      onHoverEnd={() => setShowDetails(false)}
    >
      {/* Header */}
      <div className="p-6 border-b border-dark-border">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="text-3xl">{position.logo}</div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-xl font-bold text-dark-text">{position.ticker}</h3>
                <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(position.status)}`}>
                  {position.status === 'open' ? 'ACTIVE' : 'CLOSED'}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs border ${getVolatilityColor(position.volatility.level)}`}>
                  {position.volatility.level} Vol
                </span>
              </div>
              <h4 className="text-lg text-dark-text">{position.company}</h4>
              <p className="text-dark-muted">{position.role}</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-dark-muted">Entry/Exit</div>
            <div className="font-semibold text-dark-text">
              {formatDate(position.entryDate)} - {position.exitDate ? formatDate(position.exitDate) : 'Present'}
            </div>
            <div className="text-sm text-accent-cyan">{calculateDuration()}</div>
          </div>
        </div>

        <p className="text-gray-300 mb-4">{position.description}</p>

        {/* Position Size */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center p-3 bg-gray-800 rounded">
            <div className="text-sm text-dark-muted">Team Size</div>
            <div className="font-semibold text-dark-text">{position.positionSize.teamSize}</div>
          </div>
          <div className="text-center p-3 bg-gray-800 rounded">
            <div className="text-sm text-dark-muted">Ownership</div>
            <div className="font-semibold text-dark-text text-xs">{position.positionSize.ownership}</div>
          </div>
          <div className="text-center p-3 bg-gray-800 rounded">
            <div className="text-sm text-dark-muted">Codebase</div>
            <div className="font-semibold text-dark-text text-xs">{position.positionSize.codebaseSize}</div>
          </div>
        </div>

        {/* P&L Summary */}
        <div className="flex flex-wrap gap-2">
          {allPnL.slice(0, 3).map((pnl, index) => (
            <span 
              key={index}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                pnl.type === 'positive' 
                  ? 'bg-green-900 text-green-200 border border-green-700'
                  : pnl.type === 'negative'
                  ? 'bg-red-900 text-red-200 border border-red-700'
                  : 'bg-gray-800 text-gray-300 border border-gray-600'
              }`}
            >
              {pnl.metric}: {pnl.value}
            </span>
          ))}
          {allPnL.length > 3 && (
            <span className="px-3 py-1 rounded-full text-xs bg-gray-800 text-gray-400 border border-gray-600">
              +{allPnL.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-dark-border">
        {['overview', 'pnl', 'dividends', 'earnings'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-4 py-3 text-sm font-medium capitalize transition-colors ${
              activeTab === tab
                ? 'text-accent-cyan border-b-2 border-accent-cyan'
                : 'text-dark-muted hover:text-white'
            }`}
          >
            {tab === 'pnl' ? 'P&L' : tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <div>
              <h5 className="font-semibold text-dark-text mb-2">Key Projects</h5>
              <div className="space-y-2">
                {position.keyProjects.map((project, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent-cyan rounded-full"></div>
                    <span className="text-gray-300">{project}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h5 className="font-semibold text-dark-text mb-2">Tech Stack</h5>
              <div className="flex flex-wrap gap-2">
                {position.techStack.map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h5 className="font-semibold text-dark-text mb-2">Volatility Factors</h5>
              <div className="space-y-1">
                {position.volatility.factors.map((factor, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                    <span className="text-gray-300 text-sm">{factor}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pnl' && (
          <div className="space-y-4">
            {position.pnl.realized.length > 0 && (
              <div>
                <h5 className="font-semibold text-green-400 mb-3">Realized P&L</h5>
                <div className="space-y-2">
                  {position.pnl.realized.map((pnl, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-green-900 bg-opacity-20 border border-green-700 rounded">
                      <span className="text-gray-300">{pnl.metric}</span>
                      <span className="font-semibold text-green-400">{pnl.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {position.pnl.unrealized.length > 0 && (
              <div>
                <h5 className="font-semibold text-cyan-400 mb-3">
                  {position.status === 'open' ? 'Unrealized P&L' : 'Final Results'}
                </h5>
                <div className="space-y-2">
                  {position.pnl.unrealized.map((pnl, index) => (
                    <div key={index} className={`flex justify-between items-center p-3 rounded border ${
                      pnl.type === 'positive' 
                        ? 'bg-green-900 bg-opacity-20 border-green-700'
                        : pnl.type === 'negative'
                        ? 'bg-red-900 bg-opacity-20 border-red-700'
                        : 'bg-gray-800 border-gray-600'
                    }`}>
                      <span className="text-gray-300">{pnl.metric}</span>
                      <span className={`font-semibold ${
                        pnl.type === 'positive' ? 'text-green-400' :
                        pnl.type === 'negative' ? 'text-red-400' : 'text-gray-300'
                      }`}>
                        {pnl.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'dividends' && (
          <div className="space-y-3">
            <h5 className="font-semibold text-dark-text mb-3">Awards & Recognition</h5>
            {position.dividends.map((dividend, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-800 rounded">
                <div className={`w-3 h-3 rounded-full mt-1 ${
                  dividend.type === 'award' ? 'bg-yellow-400' :
                  dividend.type === 'publication' ? 'bg-blue-400' :
                  dividend.type === 'promotion' ? 'bg-green-400' :
                  'bg-purple-400'
                }`}></div>
                <div className="flex-1">
                  <h6 className="font-medium text-dark-text">{dividend.title}</h6>
                  <p className="text-sm text-dark-muted">{formatDate(dividend.date)}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${
                  dividend.type === 'award' ? 'bg-yellow-900 text-yellow-200' :
                  dividend.type === 'publication' ? 'bg-blue-900 text-blue-200' :
                  dividend.type === 'promotion' ? 'bg-green-900 text-green-200' :
                  'bg-purple-900 text-purple-200'
                }`}>
                  {dividend.type}
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="space-y-3">
            <h5 className="font-semibold text-dark-text mb-3">Earnings Calls & Presentations</h5>
            {position.earningsCalls.map((call, index) => (
              <div key={index} className="p-4 bg-gray-800 rounded">
                <div className="flex justify-between items-start mb-2">
                  <h6 className="font-medium text-dark-text">{call.title}</h6>
                  <span className={`px-2 py-1 rounded text-xs ${
                    call.type === 'demo' ? 'bg-green-900 text-green-200' :
                    call.type === 'talk' ? 'bg-blue-900 text-blue-200' :
                    call.type === 'blog' ? 'bg-purple-900 text-purple-200' :
                    'bg-gray-700 text-gray-300'
                  }`}>
                    {call.type}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-dark-muted">{formatDate(call.date)}</p>
                  <p className="text-sm text-accent-cyan">{call.audience}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <motion.div
        className="border-t border-dark-border p-4"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: showDetails ? 1 : 0.7 }}
      >
        <div className="flex gap-2">
          <motion.button
            className="flex-1 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded text-xs font-medium text-gray-300 hover:text-white transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            📊 View Details
          </motion.button>
          <motion.button
            className="flex-1 px-3 py-2 bg-accent-blue hover:bg-opacity-90 rounded text-xs font-medium text-white transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            📄 Reference Letter
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PositionCard;
