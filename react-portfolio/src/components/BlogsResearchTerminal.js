import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Tiny inline sparkline (mock 30-day views)
const Sparkline = ({ points = [] , color = '#7DF9FF' }) => {
  const w = 120, h = 28, p = 4;
  if (!points.length) points = [3,5,4,6,7,6,8,9,7,10,9,11,13,12,12,14,13,15,14,16,15,17,15,17,18,16,19,18,20,22];
  const max = Math.max(...points), min = Math.min(...points);
  const d = points.map((v, i) => {
    const x = p + (i * (w - p*2)) / (points.length - 1);
    const y = h - p - ((v - min) / Math.max(1, (max - min))) * (h - p*2);
    return `${i===0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');
  const trendUp = points[points.length - 1] >= points[0];
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="opacity-80">
      <path d={d} fill="none" stroke={trendUp ? color : '#ffd166'} strokeWidth="2" />
    </svg>
  );
};

const BlogsResearchTerminal = () => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({ topic: 'all', year: 'all', length: 'all' });

  const posts = [
    {
      id: 'essay-1',
      type: 'Essay',
      title: 'Building Digital Wind Tunnels for Economics: The Rise of Autonomous Economic Agents and Multi-Agent Simulations',
      thesis: 'How autonomous agents and MAS can simulate policy and market dynamics — toward “digital wind tunnels” for economics.',
      tags: ['Economics', 'Agents', 'Multi-Agent', 'AI/ML'],
      date: '2025-07-24',
      read: '7 min',
      url: 'https://medium.com/@apoorvthite21/building-digital-wind-tunnels-for-economics-the-rise-of-autonomous-economic-agents-and-multi-agent-a7d3368d03cd',
      views30: [3,4,5,5,6,6,7,7,8,9,10,10,11,12,12,13,14,14,15,16,16,17,18,19,19,20,21,22,22,23],
      artifacts: {}
    },
    {
      id: 'essay-2',
      type: 'Essay',
      title: 'Fluctuations in the Stock Market and the Growth of AI: Exploring the Correlation',
      thesis: 'A compact exploration of how AI progress and market cycles may correlate — what signals matter and what is noise.',
      tags: ['Finance', 'AI/ML', 'Markets'],
      date: '2024-07-31',
      read: '5 min',
      url: 'https://medium.com/@apoorvthite21/fluctuations-in-the-stock-market-and-the-growth-of-ai-exploring-the-correlation-6874b93229d5',
      views30: [2,2,3,3,4,4,5,5,6,6,7,8,8,9,9,10,11,11,12,12,13,13,14,15,15,16,16,17,18,18],
      artifacts: {}
    },
    {
      id: 'essay-3',
      type: 'Essay',
      title: 'Understanding Machine Learning with a Simple House Price Prediction Example',
      thesis: 'Foundational walkthrough of a simple regression example to build ML intuition end-to-end.',
      tags: ['Machine Learning', 'Tutorial'],
      date: '2024-07-31',
      read: '5 min',
      url: 'https://medium.com/@apoorvthite21/understanding-machine-learning-with-a-simple-house-price-prediction-example-936c314e56f6',
      views30: [1,2,2,3,3,4,4,5,5,6,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15],
      artifacts: {}
    }
  ];

  const years = useMemo(() => ['all', ...new Set(posts.map(p => new Date(p.date).getFullYear()))], [posts]);
  const topics = useMemo(() => ['all', ...new Set(posts.flatMap(p => p.tags))], [posts]);
  const lengths = ['all', 'Memo', 'Note', 'Case', 'Essay'];

  const filtered = posts.filter(p => {
    const q = query.trim().toLowerCase();
    const qMatch = !q || p.title.toLowerCase().includes(q) || p.thesis.toLowerCase().includes(q) || p.tags.join(' ').toLowerCase().includes(q);
    const y = new Date(p.date).getFullYear();
    const yMatch = filters.year === 'all' || y === filters.year;
    const tMatch = filters.topic === 'all' || p.tags.includes(filters.topic);
    const lMatch = filters.length === 'all' || p.type === filters.length;
    return qMatch && yMatch && tMatch && lMatch;
  });

  const totalReads = 12450; // mock KPI
  const avgRead = Math.round(posts.reduce((acc, p) => acc + parseInt(p.read), 0) / posts.length) + ' min';
  const mostRead = posts[1].title;

  // Choose an icon for each post based on tags/type
  const getPostIcon = (post) => {
    const t = post.tags.join(' ').toLowerCase() + ' ' + post.type.toLowerCase();
    if (t.includes('finance') || t.includes('markets') || t.includes('stock')) return { icon: '📈', bg: 'bg-green-900/20', fg: 'text-green-300' };
    if (t.includes('economics') || t.includes('agents') || t.includes('multi-agent')) return { icon: '🧠', bg: 'bg-cyan-900/20', fg: 'text-cyan-300' };
    if (t.includes('machine learning') || t.includes('tutorial')) return { icon: '📘', bg: 'bg-blue-900/20', fg: 'text-blue-300' };
    if (post.type === 'Essay') return { icon: '📝', bg: 'bg-purple-900/20', fg: 'text-purple-300' };
    return { icon: '📄', bg: 'bg-gray-800', fg: 'text-gray-300' };
  };

  const chip = (label, active, onClick) => (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-sm border transition-colors ${active ? 'border-accent-cyan text-accent-cyan' : 'border-dark-border text-dark-muted hover:text-white'}`}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Header strip (KPI-style) */}
      <div className="panel flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-accent-cyan">Posts</span>
            <span className="text-dark-text font-semibold">{posts.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-accent-cyan">Avg read</span>
            <span className="text-dark-text font-semibold">{avgRead}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-accent-cyan">Most read</span>
            <span className="text-dark-text font-semibold truncate max-w-xs">{mostRead}</span>
          </div>
        </div>
        <div className="text-xs text-dark-muted">Market Research • Calm • Data-forward</div>
      </div>

      {/* Search + Filters */}
      <div className="panel">
        <div className="flex flex-col lg:flex-row gap-3 items-start lg:items-center justify-between">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search research notes, memos, cases"
            className="w-full lg:w-1/2 bg-gray-800 border border-dark-border rounded px-3 py-2 text-dark-text"
          />
          <div className="flex flex-wrap gap-2 items-center">
            {/* Topic */}
            <div className="flex gap-2 items-center">
              <span className="text-xs text-dark-muted">Topic</span>
              <div className="flex gap-2">
                {topics.map(t => (
                  <React.Fragment key={`topic-${t}`}>
                    {chip(t, filters.topic === t, () => setFilters(f => ({ ...f, topic: t })))}
                  </React.Fragment>
                ))}
              </div>
            </div>
            {/* Year */}
            <div className="flex gap-2 items-center">
              <span className="text-xs text-dark-muted">Year</span>
              <div className="flex gap-2">
                {years.map(y => (
                  <React.Fragment key={`year-${y}`}>
                    {chip(y, filters.year === y, () => setFilters(f => ({ ...f, year: y })) )}
                  </React.Fragment>
                ))}
              </div>
            </div>
            {/* Length */}
            <div className="flex gap-2 items-center">
              <span className="text-xs text-dark-muted">Length</span>
              <div className="flex gap-2">
                {lengths.map(l => (
                  <React.Fragment key={`length-${l}`}>
                    {chip(l, filters.length === l, () => setFilters(f => ({ ...f, length: l })) )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {filtered.map(post => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="panel hover:shadow-glow-cyan transition-shadow duration-200"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="text-xs px-2 py-0.5 rounded-full border border-dark-border text-dark-muted">
                  {post.type}
                </div>
                {(() => { const meta = getPostIcon(post); return (
                  <div className={`w-7 h-7 flex items-center justify-center rounded-lg border border-dark-border ${meta.bg} ${meta.fg}`} title={post.tags.join(', ')}>
                    <span className="text-sm leading-none">{meta.icon}</span>
                  </div>
                ); })()}
              </div>
              <h3 className="text-lg font-semibold text-dark-text mb-1">{post.title}</h3>
              <p className="text-sm text-gray-300 mb-3">{post.thesis}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map(t => (
                  <span key={t} className="text-xs px-2 py-1 rounded-full bg-gray-800 border border-dark-border text-dark-muted">#{t}</span>
                ))}
              </div>
              <div className="flex items-center justify-between text-xs text-dark-muted mb-4">
                <span>{new Date(post.date).toLocaleDateString()}</span>
                <span>{post.read}</span>
              </div>
              <div className="flex items-center gap-3">
                {post.url ? (
                  <motion.a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 rounded bg-accent-blue text-white text-sm"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Read
                  </motion.a>
                ) : (
                  <motion.button className="px-3 py-1 rounded bg-accent-blue text-white text-sm" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    Read
                  </motion.button>
                )}
                {post.artifacts?.pdf && (
                  <a href={post.artifacts.pdf} className="text-xs text-accent-cyan underline">PDF</a>
                )}
                {post.artifacts?.code && (
                  <a href={post.artifacts.code} target="_blank" rel="noopener noreferrer" className="text-xs text-accent-cyan underline">Code</a>
                )}
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {/* Post page behavior planned: MDX/Markdown rendering, TOC, artifacts, related posts, RSS */}
    </div>
  );
};

export default BlogsResearchTerminal;
