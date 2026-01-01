export const calculateDPS = (monthlyDeposit, interestRate, years) => {
  const P = Number(monthlyDeposit);
  const r = Number(interestRate);
  const t = Number(years);
  
  if (!P || !r || !t) return { maturity: 0, deposit: 0, profit: 0 };

  const n = t * 12;
  const monthlyRate = r / 12 / 100;

  // Formula: M = P * [ ((1 + i)^n - 1) / i ] * (1 + i)
  const maturityValue = P * ((Math.pow(1 + monthlyRate, n) - 1) / monthlyRate) * (1 + monthlyRate);
  const totalDeposit = P * n;
  const totalProfit = maturityValue - totalDeposit;

  return {
    maturity: Math.max(0, Math.round(maturityValue)),
    deposit: Math.max(0, Math.round(totalDeposit)),
    profit: Math.max(0, Math.round(totalProfit))
  };
};

export const calculateFDR = (principal, interestRate, years, isIslamic = false) => {
  const P = Number(principal);
  const r = Number(interestRate);
  const t = Number(years);

  if (!P || !r || !t) return { maturity: 0, profit: 0 };

  // Maturity = Principal * (1 + r/100)^years
  const maturityValue = P * Math.pow(1 + r / 100, t);
  const totalProfit = maturityValue - P;

  return {
    maturity: Math.max(0, Math.round(maturityValue)),
    profit: Math.max(0, Math.round(totalProfit)),
    isIslamic
  };
};

export const calculateEMI = (principal, interestRate, years) => {
  const P = Number(principal);
  const r = Number(interestRate);
  const t = Number(years);

  if (!P || !r || !t) return { emi: 0, totalPayment: 0, totalInterest: 0 };

  const monthlyRate = r / 12 / 100;
  const n = t * 12;

  // EMI = [P * r * (1 + r)^n] / [(1 + r)^n - 1]
  const emi = (P * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - P;

  return {
    emi: Math.max(0, Math.round(emi)),
    totalPayment: Math.max(0, Math.round(totalPayment)),
    totalInterest: Math.max(0, Math.round(totalInterest))
  };
};
