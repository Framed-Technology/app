const investments = [
  {
    id: "GOVT",
    name: "Government Bond ETF",
    description: "Seeks to track an index composed of U.S. Treasury bonds",
    link: "https://www.ig.com/en/bonds/what-are-government-bonds",
  },
  {
    id: "VTC",
    name: "Corporate Bond ETF",
    description: "Seeks to track an index composed of U.S. Corporate bonds",
    link: "https://www.investor.gov/introduction-investing/investing-basics/investment-products/bonds-or-fixed-income-products",
  },
  {
    id: "GLD",
    name: "Gold ETF",
    description: "Seeks to track the price of gold bullion in the OTC market",
    link: "[https://www.investopedia.com/articles/investing/122515/gld-ishares-gold-trust-etf.asp#:~:text=GLD tracks the price of,tracking error of around 0.93%25](https://www.investopedia.com/articles/investing/122515/gld-ishares-gold-trust-etf.asp#:~:text=GLD%20tracks%20the%20price%20of,tracking%20error%20of%20around%200.93%25).",
  },
  {
    id: "SPY",
    name: "S&P500 Index ETF",
    description: "Seeks to track an index composed of the 500 largest U.S. corporations",
    link: "https://www.investopedia.com/articles/investing/090414/sp-500-etfs-what-every-investor-should-know.asp",
  },
  {
    id: "EEM",
    name: "Emerging Markets ETF",
    description: "Seeks to track an index composed of large- and mid-sized emerging market equities",
    link: "https://www.investopedia.com/terms/e/emerging-market-etf.asp",
  },
  {
    id: "USRT",
    name: "REIT ETF",
    description: "Seeks to track an index composed of U.S. real estate equities",
    link: "https://www.investor.gov/introduction-investing/investing-basics/investment-products/real-estate-investment-trusts-reits",

  },

  {
    id: "JNJ",
    name: "Johnson & Johnson",
    description: "An Income Equity",
    link: "https://corporatefinanceinstitute.com/resources/career-map/sell-side/capital-markets/income-stocks/",
  },

  {
    id: "AMZN",
    name: "Amazon",
    description: "A Growth Equity",
    link: "https://corporatefinanceinstitute.com/resources/career-map/sell-side/capital-markets/growth-stocks/",
  },

  {
    id: "IBIT",
    name: "Bitcoin ETF",
    description: "Seeks to reflect the performance of the price of bitcoin",
    link: "https://medium.com/free-code-camp/explain-bitcoin-like-im-five-73b4257ac833",
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
