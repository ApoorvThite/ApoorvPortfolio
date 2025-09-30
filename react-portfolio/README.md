# Apoorv Thite Portfolio - React Version

A modern, interactive portfolio website built with React, Tailwind CSS, and Framer Motion, designed to showcase skills and projects in a trading platform-inspired interface.

## 🚀 Features

- **Trading Platform UI**: Inspired by Robinhood/Webull with dark theme and financial-style components
- **Interactive Charts**: 
  - Donut chart for skill allocation with hover effects
  - Radar chart for quantitative skill ratings
  - Sparkline charts for project metrics
- **Smooth Animations**: Powered by Framer Motion for engaging user experience
- **Responsive Design**: Fully responsive across all device sizes
- **Recruiter Toolkit**: AI-powered compatibility reports and quick actions
- **Mode Switching**: Different views for recruiters, alumni, and general visitors

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library
- **ApexCharts** - Interactive charts and data visualization
- **PostCSS & Autoprefixer** - CSS processing

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🎨 Customization

### Colors
Update the color scheme in `tailwind.config.js`:
```javascript
colors: {
  'dark-bg': '#1a1a1a',
  'accent-green': '#29d391',
  'accent-cyan': '#7DF9FF',
  // ... more colors
}
```

### Content
- Update personal information in `src/components/Hero.js`
- Modify skill data in `src/components/CompanyFactSheet.js`
- Add your projects in `src/components/UpcomingListings.js`
- Update analyst testimonials in `src/components/AnalystRatings.js`

### Charts
- Radar chart data: Update scores and categories in the radar chart component
- Donut chart: Modify sector allocation percentages
- Sparklines: Add your project metrics data

## 📱 Components

- `Header` - Navigation and mode switching
- `Hero` - Main introduction with typewriter effect
- `CompanyFactSheet` - Skills donut chart with analyst insights
- `AnalystRatings` - Testimonial cards with hover effects
- `UpcomingListings` - Project pipeline with progress bars
- `RecentHeadlines` - Auto-scrolling news ticker
- `RiskFactors` - Playful risk disclosures
- `RecruiterToolkit` - AI-powered recruiter tools

## 🎯 Key Features

### Interactive Animations
- Staggered component loading
- Hover effects on all interactive elements
- Smooth page transitions
- Chart animations on scroll

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interactions
- Optimized for all screen sizes

### Performance
- Lazy loading of components
- Optimized animations
- Minimal bundle size
- Fast loading times

## 🔧 Development

### Available Scripts
- `npm start` - Development server
- `npm run build` - Production build
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Project Structure
```
src/
├── components/          # React components
├── hooks/              # Custom hooks
├── App.js              # Main app component
├── index.js            # Entry point
└── index.css           # Global styles
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](issues).

## 📞 Contact

- **Email**: [your-email@example.com]
- **LinkedIn**: [your-linkedin-profile]
- **GitHub**: [your-github-profile]

---

Built with ❤️ using React, Tailwind CSS, and Framer Motion
