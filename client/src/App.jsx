import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import ZakatPage from './pages/ZakatPage';
import FinancePage from './pages/FinancePage';
import GoldPricePage from './pages/GoldPricePage';
import EducationPage from './pages/EducationPage';
import UtilityPage from './pages/UtilityPage';
import StaticPage from './pages/StaticPage';
import AdmissionPage from './pages/AdmissionPage';
import FitnessPage from './pages/FitnessPage';

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/zakat-calculator-bangladesh" element={<ZakatPage />} />

                {/* Financial Calculators */}
                <Route path="/dps-profit-calculator" element={<FinancePage type="dps" />} />
                <Route path="/fdr-profit-calculator" element={<FinancePage type="fdr" />} />
                <Route path="/emi-loan-calculator" element={<FinancePage type="emi" />} />

                {/* Gold */}
                <Route path="/gold-price-calculator-bangladesh" element={<GoldPricePage />} />

                {/* Education */}
                <Route path="/ssc-hsc-gpa-calculator" element={<EducationPage type="gpa" />} />
                <Route path="/university-cgpa-calculator" element={<EducationPage type="cgpa" />} />
                <Route path="/percentage-to-gpa-converter" element={<EducationPage type="percent-to-gpa" />} />

                {/* Utilities */}
                <Route path="/age-calculator-bangladesh" element={<UtilityPage type="age" />} />
                <Route path="/salary-tax-calculator-bangladesh" element={<UtilityPage type="tax" />} />

                {/* Admission */}
                <Route path="/admission-gpa-marks-calculator" element={<AdmissionPage />} />

                {/* Fitness */}
                <Route path="/bmi-calculator-bangladesh" element={<FitnessPage type="bmi" />} />

                {/* Static Pages */}
                <Route path="/about" element={<StaticPage type="about" />} />
                <Route path="/privacy-policy" element={<StaticPage type="privacy" />} />
                <Route path="/terms-of-service" element={<StaticPage type="terms" />} />
                <Route path="/contact" element={<StaticPage type="contact" />} />

                {/* Catch all */}
                <Route path="*" element={<div className="p-20 text-center text-2xl font-bold">404 - Page Not Found</div>} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;
