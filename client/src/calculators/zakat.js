export const calculateZakat = (assets) => {
  const {
    cashHand,
    cashBank,
    goldValue,
    silverValue,
    investmentValue,
    businessGoods,
    debtsRecievable,
    liabilities,
    nisabValue
  } = assets;

  const totalAssets = 
    Number(cashHand || 0) + 
    Number(cashBank || 0) + 
    Number(goldValue || 0) + 
    Number(silverValue || 0) + 
    Number(investmentValue || 0) + 
    Number(businessGoods || 0) + 
    Number(debtsRecievable || 0);

  const netWealth = totalAssets - Number(liabilities || 0);
  
  if (netWealth < Number(nisabValue || 0)) {
    return {
      isZakatEligible: false,
      netWealth,
      zakatPayable: 0,
      totalAssets
    };
  }

  const zakatPayable = netWealth * 0.025;

  return {
    isZakatEligible: true,
    netWealth: Math.max(0, netWealth),
    zakatPayable: Math.max(0, zakatPayable),
    totalAssets: Math.max(0, totalAssets)
  };
};
