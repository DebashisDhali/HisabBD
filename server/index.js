const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet({
  contentSecurityPolicy: false, // For easier integration with Ads and external scripts
}));
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Sitemap Generation Logic
app.get('/sitemap.xml', async (req, res) => {
  try {
    const links = [
      { url: '/', changefreq: 'daily', priority: 1.0 },
      { url: '/zakat-calculator-bangladesh', changefreq: 'monthly', priority: 0.9 },
      { url: '/dps-profit-calculator', changefreq: 'monthly', priority: 0.8 },
      { url: '/fdr-profit-calculator', changefreq: 'monthly', priority: 0.8 },
      { url: '/emi-loan-calculator', changefreq: 'monthly', priority: 0.8 },
      { url: '/gold-price-calculator-bangladesh', changefreq: 'monthly', priority: 0.8 },
      { url: '/ssc-hsc-gpa-calculator', changefreq: 'monthly', priority: 0.8 },
      { url: '/university-cgpa-calculator', changefreq: 'monthly', priority: 0.8 },
      { url: '/percentage-to-gpa-converter', changefreq: 'monthly', priority: 0.7 },
      { url: '/age-calculator-bangladesh', changefreq: 'monthly', priority: 0.8 },
      { url: '/salary-tax-calculator-bangladesh', changefreq: 'monthly', priority: 0.8 },
      { url: '/about', changefreq: 'yearly', priority: 0.5 },
      { url: '/privacy-policy', changefreq: 'yearly', priority: 0.3 },
      { url: '/terms-of-service', changefreq: 'yearly', priority: 0.3 },
      { url: '/contact', changefreq: 'monthly', priority: 0.5 }
    ];


    const stream = new SitemapStream({ hostname: process.env.SITE_URL || 'https://bdcalculatorhub.com' });
    res.header('Content-Type', 'application/xml');
    
    const xml = await streamToPromise(Readable.from(links).pipe(stream)).then(data => data.toString());
    res.send(xml);
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
