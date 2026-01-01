import { intervalToDuration } from 'date-fns';

export const calculateAge = (dob) => {
  if (!dob) return null;
  const start = new Date(dob);
  const end = new Date(); // Current date

  if (isNaN(start.getTime())) return null;

  // Prevent future dates from showing negative age
  if (start > end) {
    return {
      years: 0,
      months: 0,
      days: 0,
    };
  }

  const duration = intervalToDuration({
    start,
    end,
  });

  return {
    years: duration.years || 0,
    months: duration.months || 0,
    days: duration.days || 0,
  };
};

export const calculateSalaryTax = (monthlySalary) => {
  const annualSalary = Number(monthlySalary) * 12;
  const exemption = 350000; // Increased for 2024-25 approx
  
  if (annualSalary <= exemption) return 0;

  let taxable = annualSalary - exemption;
  let tax = 0;

  // Slabs: Next 1L @ 5%, Next 3L @ 10%, Next 4L @ 15%, Next 5L @ 20%, Rest @ 25% (Simplified)
  // User slabs: 300k (0%), 100k (5%), 300k (10%), Rest (15%) - Using user version as requested
  
  const slabs = [
    { limit: 100000, rate: 0.05 },
    { limit: 300000, rate: 0.10 },
    { limit: Infinity, rate: 0.15 },
  ];

  for (const slab of slabs) {
    if (taxable <= 0) break;
    const amountInSlab = Math.min(taxable, slab.limit);
    tax += amountInSlab * slab.rate;
    taxable -= amountInSlab;
  }

  return Math.round(tax);
};
