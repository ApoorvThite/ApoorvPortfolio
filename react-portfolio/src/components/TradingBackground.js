import React from 'react';
import { motion } from 'framer-motion';

const TradingBackground = () => {
  return (
    <>
      {/* Subtle Market Ticker Sweep - Less Frequent */}
      <motion.div
        className="market-ticker fixed top-0 left-0 w-full h-1 z-0"
        initial={{ x: '-100%' }}
        animate={{ x: '100vw' }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
          delay: 8,
          repeatDelay: 20
        }}
      />

      {/* Corner Accent Glows - More Subtle */}
      <div className="fixed top-0 left-0 w-80 h-80 bg-gradient-radial from-accent-cyan/3 to-transparent pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-80 h-80 bg-gradient-radial from-accent-green/3 to-transparent pointer-events-none z-0" />
    </>
  );
};

export default TradingBackground;
