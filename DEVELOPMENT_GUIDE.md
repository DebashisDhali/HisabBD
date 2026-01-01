# Bangladesh Calculator Hub - Extension Guide

This guide explains how to add new calculators to the platform while maintaining SEO and design consistency.

## 1. Create Calculation Logic
Create a new file in `client/src/calculators/[name].js`.
Example:
```javascript
export const calculateDPS = (monthlyDeposit, interestRate, years) => {
  // Logic here
  return { profit, totalAmount };
};
```

## 2. Create the Calculator Page
Create a new component in `client/src/pages/[Name]Page.jsx` using the `CalculatorLayout`.

```javascript
import React, { useState, useEffect } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import { useLanguage } from '../context/LanguageContext';

const DPSPage = () => {
  const { t } = useLanguage();
  // ... state and effects
  
  return (
    <CalculatorLayout 
      title={t('ডিপিএস প্রফিট ক্যালকুলেটর', 'DPS Profit Calculator')}
      description={t('আপনার ডিপিএস এর লাভের টাকা হিসাব করুন...', 'Calculate your DPS profit...')}
    >
      <div className="card">
        {/* Form and Results */}
      </div>
    </CalculatorLayout>
  );
};
```

## 3. Register Route
Add the new route in `client/src/App.jsx`.

## 4. Add to Home Page
Add the calculator link to the relevant category in `client/src/pages/HomePage.jsx`.

## 5. Update Sitemap
Add the new URL to the `server/index.js` sitemap route.

---
## SEO Best Practices
- Use ৳ symbol for currency in Bangla mode.
- Ensure the description includes relevant keywords (Bangladesh, Calculator, Banking, etc.).
- Keep the `CalculatorLayout` consistency for H1 and Meta tags.
