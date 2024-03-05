const investments = [
  {
    id: "SPY",
    name: "S&P500",
    description: "An index that tracks the 500 largest companies in the US",
    link: "https://www.investopedia.com/terms/c/corporatebond.asp",
  },
  {
    id: "NZB",
    name: "Corporate Bond ETF",
    description: "Debt issued by companies",
    link: "https://www.investopedia.com/terms/c/corporatebond.asp",
  },
  {
    id: "TSLA",
    name: "Tesla Inc.",
    description: "Equity in Tesla Motors",
    link: "https://www.investopedia.com/terms/c/corporatebond.asp",
  },
  {
    id: "AMZN",
    name: "Amazon Inc.",
    description: "Equity in Microsoft",
    link: "https://www.investopedia.com/terms/c/corporatebond.asp",
  },
  {
    id: "NGB",
    name: "Government Bond ETF",
    description: "Debt issues by the US Goverment",
    link: "https://www.investopedia.com/terms/c/corporatebond.asp",
  },
  {
    id: "BTC",
    name: "Bitcoin",
    description: "Debt issues by the US Goverment",
    link: "https://www.investopedia.com/terms/g/government-bond.asp",
  },
];

const investmentMap = investments.reduce<{
  [key: string]: (typeof investments)[number];
}>((p, c) => {
  p[c.id] = c;
  return p;
}, {});


export { investments, investmentMap };
export type Investment = typeof investments[number] 
