import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SparklineChart from './SparklineChart';

const ProjectCard = ({ project, timeframe }) => {
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'text-green-400 bg-green-900 border-green-700';
      case 'WIP':
        return 'text-yellow-400 bg-yellow-900 border-yellow-700';
      case 'Completed':
        return 'text-blue-400 bg-blue-900 border-blue-700';
      default:
        return 'text-gray-400 bg-gray-900 border-gray-700';
    }
  };

  const getChangeIndicator = () => {
    const recent = project.commits.slice(-7);
    const previous = project.commits.slice(-14, -7);
    const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
    const previousAvg = previous.reduce((a, b) => a + b, 0) / previous.length;
    const change = ((recentAvg - previousAvg) / previousAvg * 100).toFixed(1);
    
    if (change > 0) {
      return { text: `+${change}%`, color: 'text-green-400', icon: '↗' };
    } else if (change < 0) {
      return { text: `${change}%`, color: 'text-red-400', icon: '↘' };
    } else {
      return { text: '0%', color: 'text-gray-400', icon: '→' };
    }
  };

  // Speedometer helpers
  const clampDisplayImpact = (score) => {
    const safe = Number.isFinite(score) ? score : 0;
    return Math.max(60, Math.min(100, safe));
  };

  const getImpactLabel = (scoreRaw) => {
    const score = clampDisplayImpact(scoreRaw);
    if (score >= 90) return 'Business-ready';
    if (score >= 80) return 'High impact';
    if (score >= 70) return 'Impactful (needs polish)';
    if (score >= 50) return 'Prototype';
    return 'Early concept';
  };


  const change = getChangeIndicator();
  const displayImpact = clampDisplayImpact(project.impact);

  return (
    <motion.div
      className="bg-dark-panel border border-dark-border rounded-lg overflow-hidden hover:border-accent-cyan transition-all duration-200"
      whileHover={{ y: -2, boxShadow: "0 8px 25px rgba(0,0,0,0.3)" }}
      onHoverStart={() => setShowQuickActions(true)}
      onHoverEnd={() => setShowQuickActions(false)}
    >
      {/* Header */}
      <div className="p-4 border-b border-dark-border">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{project.logo}</div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-dark-text">{project.shortName}</h3>
                <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
              <p className="text-sm text-dark-muted">{project.name}</p>
            </div>
          </div>
          
          <div className="text-right">
            {/* Impact Speedometer */}
            <div className="flex flex-col items-end">
              <div className="w-24 h-14 relative">
                {/* Semi-circle gauge with gradient fill */}
                <svg viewBox="0 0 100 60" className="w-full h-full">
                  <defs>
                    <linearGradient id={`impactGrad-${project.shortName}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f87171" />
                      <stop offset="50%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#34d399" />
                    </linearGradient>
                  </defs>
                  {/* Track */}
                  <path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke="#374151" strokeWidth="8" strokeLinecap="round" pathLength="100" />
                  {/* Value arc using stroke-dasharray */}
                  <path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke={`url(#impactGrad-${project.shortName})`} strokeWidth="8" strokeLinecap="round" pathLength="100" strokeDasharray={`${displayImpact} 100`} />
                  {/* Needle */}
                  {(() => {
                    const score = displayImpact;
                    const angle = Math.PI * (1 - score / 100);
                    const cx = 50, cy = 50, r = 36;
                    const x = cx + r * Math.cos(angle);
                    const y = cy - r * Math.sin(angle);
                    return (
                      <g>
                        <line x1={cx} y1={cy} x2={x} y2={y} stroke="#e5e7eb" strokeWidth="2" />
                        <circle cx={cx} cy={cy} r="3" fill="#9ca3af" />
                      </g>
                    );
                  })()}
                </svg>
              </div>
              <div className="text-xs text-gray-300 leading-tight">
                <span className="font-semibold text-dark-text">Impact: {displayImpact}</span>
              </div>
              <div className="text-[10px] text-dark-muted">{getImpactLabel(displayImpact)}</div>
            </div>
            <div className={`text-xs ${change.color} flex items-center gap-1 mt-1`}>
              <span>{change.icon}</span>
              <span>{change.text}</span>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-gray-300 mb-3">{project.oneLiner}</p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300">
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-400">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-dark-border">
        {['overview', 'activity', 'details'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-3 py-2 text-sm font-medium capitalize transition-colors ${
              activeTab === tab
                ? 'text-accent-cyan border-b-2 border-accent-cyan'
                : 'text-dark-muted hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* Commits Activity Sparkline */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-dark-muted">Commits Activity</span>
                <span className="text-xs text-dark-muted">{timeframe} days</span>
              </div>
              <SparklineChart
                data={project.commits.slice(-parseInt(timeframe))}
                color="#7DF9FF"
                height={40}
              />
            </div>

            {/* Crisp project bullets */}
            {project.bullets && (
              <div className="mt-2">
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>
                    <span className="text-dark-muted font-medium">Problem:</span> {project.bullets.problem}
                  </li>
                  <li>
                    <span className="text-dark-muted font-medium">Solution:</span> {project.bullets.solution}
                  </li>
                  <li>
                    <span className="text-dark-muted font-medium">Impact:</span> {project.bullets.impact}
                  </li>
                  <li>
                    <span className="text-dark-muted font-medium">Future scope:</span> {project.bullets.future}
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-dark-muted">Contribution Volume (30d)</span>
              <span className="text-sm font-semibold text-accent-cyan">{project.contribVolume}</span>
            </div>
            
            <div className="space-y-2">
              {project.changelog.slice(0, 3).map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-2 bg-gray-800 rounded">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    item.type === 'commit' ? 'bg-accent-cyan' :
                    item.type === 'blog' ? 'bg-accent-yellow' :
                    item.type === 'feature' ? 'bg-accent-green' :
                    item.type === 'paper' ? 'bg-purple-400' :
                    'bg-gray-400'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-300">{item.text}</p>
                    <p className="text-xs text-dark-muted">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'details' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-dark-muted">Lines of Code</div>
                <div className="text-sm font-semibold text-dark-text">{project.linesOfCode.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-xs text-dark-muted">Files</div>
                <div className="text-sm font-semibold text-dark-text">{project.files}</div>
              </div>
              <div>
                <div className="text-xs text-dark-muted">Last Release</div>
                <div className="text-sm font-semibold text-dark-text">{project.lastRelease}</div>
              </div>
              <div>
                <div className="text-xs text-dark-muted">Last Update</div>
                <div className="text-sm font-semibold text-dark-text">{project.lastUpdate}</div>
              </div>
            </div>
            
            <div>
              <div className="text-xs text-dark-muted mb-2">Tech Stack</div>
              <div className="flex flex-wrap gap-1">
                {project.stack.map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions (Order Ticket) */}
      <motion.div
        className="border-t border-dark-border p-3"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: showQuickActions ? 1 : 0.7 }}
      >
        <div className="grid grid-cols-2 gap-2">
          <motion.a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded text-xs font-medium text-gray-300 hover:text-white transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>📂</span>
            Code
          </motion.a>
          
          <motion.a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-3 py-2 bg-accent-blue hover:bg-opacity-90 rounded text-xs font-medium text-white transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>🚀</span>
            Demo
          </motion.a>
          
          {(project.caseStudy ? (
            <motion.button
              onClick={() => setIsCaseStudyOpen(true)}
              className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded text-xs font-medium text-gray-300 hover:text-white transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>📊</span>
              Case Study
            </motion.button>
          ) : (
            <motion.a
              href={project.caseStudyLink}
              className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded text-xs font-medium text-gray-300 hover:text-white transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>📊</span>
              Case Study
            </motion.a>
          ))}
          
          <motion.button
            className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded text-xs font-medium text-gray-300 hover:text-white transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>📖</span>
            README
          </motion.button>
        </div>
      </motion.div>

      {/* Case Study Modal */}
      {isCaseStudyOpen && project.caseStudy && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center p-4 lg:p-8"
          role="dialog"
          aria-modal="true"
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-60" onClick={() => setIsCaseStudyOpen(false)} />
          {/* Panel */}
          <div className="relative w-full max-w-3xl bg-dark-panel border border-dark-border rounded-xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-dark-border bg-gray-900/60 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{project.logo}</div>
                <div>
                  <h3 className="text-lg font-semibold text-dark-text">{project.name} ({project.shortName}) — One-Page Case Study</h3>
                  <p className="text-xs text-dark-muted">{project.oneLiner}</p>
                </div>
              </div>
              <button
                onClick={() => setIsCaseStudyOpen(false)}
                className="text-dark-muted hover:text-white text-xl px-2"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            {/* Body */}
            <div className="max-h-[75vh] overflow-y-auto px-5 py-4 space-y-5">
              {project.caseStudy.sections?.map((sec, idx) => (
                <div key={idx} className="space-y-2">
                  <h4 className="text-sm font-bold text-accent-cyan">{sec.title}</h4>
                  {Array.isArray(sec.content) ? (
                    <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                      {sec.content.map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-300 whitespace-pre-wrap">{sec.content}</p>
                  )}
                </div>
              ))}
            </div>
            {/* Footer */}
            <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-dark-border bg-gray-900/60">
              {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-xs text-accent-cyan underline">Code</a>
              )}
              {project.demoLink && (
                <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="text-xs text-accent-blue underline">Demo</a>
              )}
              <button onClick={() => setIsCaseStudyOpen(false)} className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 text-xs">Close</button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProjectCard;
