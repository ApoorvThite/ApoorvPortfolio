# React Portfolio Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation Steps

1. **Navigate to the React portfolio directory**
   ```bash
   cd "react-portfolio"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   - The app will automatically open at `http://localhost:3000`
   - If it doesn't open automatically, navigate to the URL manually

## 🛠️ Development Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject from Create React App (irreversible)
npm run eject
```

## 📁 Project Structure

```
react-portfolio/
├── public/
│   ├── index.html          # HTML template
│   └── favicon.ico         # Favicon
├── src/
│   ├── components/         # React components
│   │   ├── Header.js       # Navigation header
│   │   ├── Hero.js         # Hero section with typewriter
│   │   ├── CompanyFactSheet.js  # Donut chart & insights
│   │   ├── RadarChart.js   # Quant rating radar
│   │   ├── AnalystRatings.js    # Testimonial cards
│   │   ├── UpcomingListings.js  # Project pipeline
│   │   ├── RecentHeadlines.js   # News ticker
│   │   ├── RiskFactors.js  # Risk disclosures
│   │   ├── RecruiterToolkit.js  # Sidebar toolkit
│   │   ├── DonutChart.js   # SVG donut chart
│   │   └── SparklineChart.js    # Mini sparklines
│   ├── hooks/
│   │   └── useRadarChart.js     # ApexCharts radar hook
│   ├── App.js              # Main app component
│   ├── index.js            # Entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies & scripts
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
└── README.md               # Documentation
```

## 🎨 Customization

### Personal Information
Update your details in these files:
- `src/components/Hero.js` - Name, bio, links
- `src/components/CompanyFactSheet.js` - Skills data
- `src/components/RadarChart.js` - Skill ratings
- `src/components/AnalystRatings.js` - Testimonials

### Colors & Theme
Modify `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      'dark-bg': '#1a1a1a',        // Background
      'accent-green': '#29d391',    // Success/positive
      'accent-cyan': '#7DF9FF',     // Primary accent
      'accent-yellow': '#ffd166',   // Warning/neutral
      'accent-red': '#ff6b6b',      // Error/negative
    }
  }
}
```

### Content Updates

#### Skills Data (CompanyFactSheet.js)
```javascript
const sectorData = [
  { key: 'AI/ML', value: 35, color: '#29d391' },
  { key: 'Data Science', value: 25, color: '#7DF9FF' },
  // Add your skills here
];
```

#### Radar Chart Scores (RadarChart.js)
```javascript
const chartData = {
  categories: ['AI/ML', 'Data Science', 'Full-Stack', 'FinTech', 'Cloud/DevOps'],
  scores: [9.4, 9.0, 7.1, 8.7, 8.7], // Update your scores (0-10)
  notes: {
    'AI/ML': 'Your AI/ML experience description',
    // Add descriptions for each skill
  }
};
```

#### Projects (UpcomingListings.js)
```javascript
const listings = [
  {
    title: 'Your Project Name',
    description: 'Project description',
    progress: 85, // Completion percentage
    status: 'In Progress',
    date: 'Q4 2024'
  },
  // Add more projects
];
```

## 🚀 Deployment

### Netlify (Recommended)
1. Build the project: `npm run build`
2. Drag the `build` folder to Netlify
3. Or connect your GitHub repo for auto-deployment

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
   ```json
   "homepage": "https://yourusername.github.io/portfolio",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
3. Deploy: `npm run deploy`

## 🔧 Troubleshooting

### Common Issues

**Charts not rendering:**
- Ensure ApexCharts is installed: `npm install apexcharts react-apexcharts`
- Check browser console for errors

**Animations not working:**
- Verify Framer Motion installation: `npm install framer-motion`
- Check for JavaScript errors in console

**Styles not applying:**
- Ensure Tailwind is properly configured
- Run: `npm run build` to regenerate styles

**Development server won't start:**
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be v14+)

### Performance Tips
- Use `React.memo()` for components that don't change often
- Lazy load components with `React.lazy()`
- Optimize images and use WebP format
- Enable gzip compression on your server

## 📞 Support

If you encounter issues:
1. Check the browser console for errors
2. Ensure all dependencies are installed
3. Try clearing node_modules and reinstalling
4. Check that your Node.js version is compatible

## 🎯 Next Steps

After setup:
1. Update all personal information
2. Add your actual project data
3. Replace placeholder images
4. Test on different devices
5. Deploy to your preferred platform
6. Set up analytics (Google Analytics, etc.)

Happy coding! 🚀
