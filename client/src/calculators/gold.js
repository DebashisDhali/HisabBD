export const calculateGoldPrice = (price24k, grams, karat) => {
  const p = Number(price24k);
  const g = Number(grams);
  const k = Number(karat);

  if (!p || !g) return 0;

  let purity = 1;
  if (k === 22) purity = 0.916;
  else if (k === 21) purity = 0.875;
  else if (k === 18) purity = 0.75;
  else if (k === 24) purity = 1.0;
  
  const adjustedPrice = p * purity;
  return Math.max(0, Math.round(adjustedPrice * g));
};
