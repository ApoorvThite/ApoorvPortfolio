import React from 'react';
import { motion } from 'framer-motion';

const ResearchFilters = ({ selectedFilters, setSelectedFilters, sortBy, setSortBy, papers }) => {
  const domainOptions = ['all', ...new Set(papers.map(p => p.domain))];
  const yearOptions = ['all', ...[...new Set(papers.map(p => p.year.toString()))].sort().reverse()];
  const venueOptions = ['all', 'ICASSP', 'ICAIF', 'NeurIPS', 'Workshop'];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'citations', label: 'Citations' },
    { value: 'impact', label: 'Impact Score' }
  ];

  const updateFilter = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark-panel border border-dark-border rounded-lg p-4"
    >
      <div className="flex flex-wrap gap-6 items-center">
        {/* Research Filters */}
        <div className="flex flex-wrap gap-4">
          {/* Domain Filter */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-dark-muted font-medium">Domain:</label>
            <select
              value={selectedFilters.domain}
              onChange={(e) => updateFilter('domain', e.target.value)}
              className="bg-gray-800 border border-dark-border rounded px-3 py-1 text-sm text-white focus:border-accent-cyan focus:outline-none"
            >
              {domainOptions.map(option => (
                <option key={option} value={option}>
                  {option === 'all' ? 'All Domains' : option}
                </option>
              ))}
            </select>
          </div>

          {/* Year Filter */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-dark-muted font-medium">Year:</label>
            <select
              value={selectedFilters.year}
              onChange={(e) => updateFilter('year', e.target.value)}
              className="bg-gray-800 border border-dark-border rounded px-3 py-1 text-sm text-white focus:border-accent-cyan focus:outline-none"
            >
              {yearOptions.map(option => (
                <option key={option} value={option}>
                  {option === 'all' ? 'All Years' : option}
                </option>
              ))}
            </select>
          </div>

          {/* Venue Filter */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-dark-muted font-medium">Venue:</label>
            <select
              value={selectedFilters.venue}
              onChange={(e) => updateFilter('venue', e.target.value)}
              className="bg-gray-800 border border-dark-border rounded px-3 py-1 text-sm text-white focus:border-accent-cyan focus:outline-none"
            >
              {venueOptions.map(option => (
                <option key={option} value={option}>
                  {option === 'all' ? 'All Venues' : option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-2 ml-auto">
          <label className="text-sm text-dark-muted font-medium">Sort by:</label>
          <div className="flex bg-gray-800 rounded-lg p-1">
            {sortOptions.map((option) => (
              <motion.button
                key={option.value}
                onClick={() => setSortBy(option.value)}
                className={`px-3 py-1 rounded text-sm font-medium transition-all duration-200 ${
                  sortBy === option.value
                    ? 'bg-accent-blue text-white'
                    : 'text-dark-muted hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {option.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      <div className="flex flex-wrap gap-2 mt-3">
        {Object.entries(selectedFilters).map(([key, value]) => {
          if (value === 'all') return null;
          
          return (
            <motion.span
              key={`${key}-${value}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-2 py-1 bg-accent-blue bg-opacity-20 border border-accent-blue rounded-full text-xs text-accent-blue"
            >
              <span>{key}: {value}</span>
              <button
                onClick={() => updateFilter(key, 'all')}
                className="hover:text-white transition-colors"
              >
                ×
              </button>
            </motion.span>
          );
        })}
        
        {Object.values(selectedFilters).some(v => v !== 'all') && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => setSelectedFilters({ domain: 'all', year: 'all', venue: 'all' })}
            className="px-2 py-1 text-xs text-dark-muted hover:text-white transition-colors"
          >
            Clear all
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default ResearchFilters;
