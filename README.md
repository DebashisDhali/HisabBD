# Bangladesh Calculator Hub

A production-ready, SEO-optimized MERN stack application featuring essential calculators for the Bangladesh market.

## Features
- **MERN Stack**: MongoDB (Ready for History/Users), Express, React (Vite), Node.js.
- **Multilingual Support**: Default Bangla with English toggle.
- **High Performance**: Vite-powered frontend with Google Fonts (Outfit).
- **SEO Optimized**: Dynamic meta tags, clean URLs, Sitemap, and Robots.txt.
- **Monetization Ready**: Dedicated AdSense placeholders.
- **Mobile First**: Fully responsive layout using Tailwind CSS.

## Project Structure
- `/client`: React frontend (Vite, Tailwind, React Router)
- `/server`: Node.js/Express backend (Sitemap, API)

## Setup Instructions

### 1. Prerequisites
- Node.js installed
- MongoDB installed (optional for Phase 1)

### 2. Backend Setup
```bash
cd server
npm install
npm start
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```

## Phase 1 Calculators
- [x] Zakat Calculator
- [ ] DPS Profit Calculator
- [ ] FDR Calculator
- [ ] EMI Loan Calculator
- [ ] Gold Price Calculator
- [ ] GPA Calculator
- [ ] CGPA Calculator
- [ ] Percentage to GPA Converter
- [ ] Age Calculator
- [ ] Salary Tax Calculator

## SEO & Monetization
- **Meta Tags**: Handled via `react-helmet-async` in `CalculatorLayout`.
- **Sitemap**: Generated dynamically at `/sitemap.xml`.
- **Ads**: Components ready for Google AdSense integration.

## License
MIT
