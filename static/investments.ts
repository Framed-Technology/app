const investments = [
  {
    id: "SPY",
    name: "S&P500 Index ETF",
    description:
      "Seeks to track an index composed of the 500 largest U.S. corporations",
    rvol: 6.6,
    link: "https://www.investopedia.com/articles/investing/090414/sp-500-etfs-what-every-investor-should-know.asp",
  },
  {
    id: "GOVT",
    name: "Government Bond ETF",
    description: "Seeks to track an index composed of U.S. Treasury bonds",
    rvol: 4.5,
    link: "https://www.ig.com/en/bonds/what-are-government-bonds",
  },
  {
    id: "JNJ",
    name: "Johnson & Johnson",
    description: "An Income Equity",
    rvol: 7.5,
    link: "https://corporatefinanceinstitute.com/resources/career-map/sell-side/capital-markets/income-stocks/",
  },
  {
    id: "EEM",
    name: "Emerging Markets ETF",
    description:
      "Seeks to track an index composed of large- and mid-sized emerging market equities",
    rvol: 7.4,
    link: "https://www.investopedia.com/terms/e/emerging-market-etf.asp",
  },
  {
    id: "AMZN",
    name: "Amazon",
    description: "A Growth Stock",
    rvol: 9.8,
    link: "https://corporatefinanceinstitute.com/resources/career-map/sell-side/capital-markets/growth-stocks/",
  },
  {
    id: "USRT",
    name: "REIT ETF",
    description:
      "Seeks to track an index composed of U.S. real estate equities",
    rvol: 8.2,
    link: "https://www.investor.gov/introduction-investing/investing-basics/investment-products/real-estate-investment-trusts-reits",
  },
  {
    id: "VTC",
    name: "Corporate Bond ETF",
    description: "Seeks to track an index composed of U.S. Corporate bonds",
    rvol: 5.0,
    link: "https://www.investor.gov/introduction-investing/investing-basics/investment-products/bonds-or-fixed-income-products",
  },
  {
    id: "GLD",
    name: "Gold ETF",
    description: "Seeks to track the price of gold bullion in the OTC market",
    rvol: 6.7,
    link: "https://www.investopedia.com/articles/investing/122515/gld-ishares-gold-trust-etf.asp#:~:text=GLD tracks the price of,tracking error of around 0.93%25](https://www.investopedia.com/articles/investing/122515/gld-ishares-gold-trust-etf.asp#:~:text=GLD%20tracks%20the%20price%20of,tracking%20error%20of%20around%200.93%25).",
  },
];

const investmentMap = investments.reduce<{
  [key: string]: (typeof investments)[number];
}>((p, c) => {
  p[c.id] = c;
  return p;
}, {});

export { investments, investmentMap };
export type Investment = (typeof investments)[number];
