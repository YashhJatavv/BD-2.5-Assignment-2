let express = require("express");
let cors = require("cors");

let app = express();
let port = 3000;

app.use(cors());

//Data.
let stocks = [
  {
    id: 1,
    name: "reliance industries",
    price: 2500,
    growth: 3.5,
    industry: "finance",
    exchange: "nse",
  },
  {
    id: 2,
    name: "hdfc bank",
    price: 1800,
    growth: 4.2,
    industry: "finance",
    exchange: "bse",
  },
  {
    id: 3,
    name: "icici bank",
    price: 1600,
    growth: 5.1,
    industry: "finance",
    exchange: "nse",
  },
  {
    id: 4,
    name: "tata consultancy services",
    price: 3200,
    growth: 2.9,
    industry: "finance",
    exchange: "bse",
    price: 1900,
  },
  {
    id: 5,
    name: "infosys",
    price: 2900,
    growth: 3.8,
    industry: "finance",
    exchange: "nse",
  },
  {
    id: 6,
    name: "dr. reddy's laboratories",
    price: 2100,
    growth: 4.7,
    industry: "pharma",
    exchange: "bse",
  },
  {
    id: 7,
    name: "sun pharmaceutical",
    price: 2300,
    growth: 3.2,
    industry: "pharma",
    exchange: "nse",
  },
  {
    id: 8,
    name: "cipla",
    growth: 2.6,
    price: 2100,
    exchange: "bse",
    industry: "pharma",
  },
  {
    id: 9,
    name: "ntpc",
    price: 1200,
    growth: 4.1,
    industry: "power",
    exchange: "nse",
  },
  {
    id: 10,
    name: "power grid corporation",
    price: 1500,
    growth: 3.4,
    industry: "power",
    exchange: "bse",
  },
  {
    id: 11,
    name: "adani power",
    price: 2200,
    growth: 5.3,
    industry: "power",
    exchange: "nse",
  },
  {
    id: 12,
    name: "lupin",
    price: 2000,
    growth: 4.5,
    industry: "pharma",
    exchange: "bse",
  },
  {
    id: 13,
    name: "axis bank",
    price: 1750,
    growth: 2.8,
    industry: "finance",
    exchange: "nse",
  },
  {
    id: 14,
    name: "state bank of india",
    price: 1450,
    growth: 3.6,
    industry: "finance",
    exchange: "bse",
  },
  {
    id: 15,
    name: "bajaj finance",
    price: 2650,
    growth: -2.9,
    industry: "finance",
    exchange: "nse",
  },
  {
    id: 16,
    name: "dr. reddy's laboratories",
    price: 1950,
    growth: 4.3,
    industry: "pharma",
    exchange: "bse",
  },
  {
    id: 17,
    name: "biocon",
    price: 1850,
    growth: 3.9,
    industry: "pharma",
    exchange: "nse",
  },
  {
    id: 18,
    name: "torrent power",
    price: 1600,
    growth: 2.4,
    industry: "power",
    exchange: "bse",
  },
  {
    id: 19,
    name: "tata power",
    price: 1750,
    growth: 4.0,
    industry: "power",
    exchange: "nse",
  },
  {
    id: 20,
    name: "jsw energy",
    price: 1450,
    growth: 3.1,
    industry: "power",
    exchange: "bse",
  },
];

//Home
app.get("/", (req, res) => {
  res.send("Welcome to Advani Stock Exchange...");
});

//Endpoint 1: Get the stocks sorted by pricing.
//Express code snippet to sort the stocks based on the pricing low-to-high or high-to-low.
app.get("/stocks/sort/pricing", (req, res) => {
  let pricing = req.query.pricing;
  let sortedStocks = stocks.slice();

  function sortStocksByPricing(stocks1_object, stocks2_object){
    if(pricing === "high-to-low"){
      return stocks2_object.price - stocks1_object.price;
    }else{
      return stocks1_object.price - stocks2_object.price;
    }
  };

  sortedStocks.sort(sortStocksByPricing);
  res.json({ stocks : sortedStocks });
});

// //Endpoint 2: Get the stocks sorted based on their Growth.
// //Express code snippet to sort stocks based on their individual growth rate.
app.get("/stocks/sort/growth", (req, res) => {
  let growth = req.query.growth;
  let sortedStocks = stocks.slice();

  function sortStocksByGrowth(stocks1_object, stocks2_object){
    if(growth === "high-to-low"){
      return stocks2_object.growth - stocks1_object.growth;
    }else{
      return stocks1_object.growth - stocks2_object.growth;
    }
  };

  sortedStocks.sort(sortStocksByGrowth);
  res.json({ stocks : sortedStocks });
});

//Endpoint 3: Filter the stocks based on the 2 Stock Exchange (NSE. and BSE).
//Express code snippet to filter stocks based on the two available stock exchanges.
function filterByExchange(stocks, exchange){
  return stocks.exchange.toLowerCase() === exchange;
};

app.get("/stocks/filter/exchange", (req, res) => {
  let exchange = (req.query.exchange).toLowerCase();
  let sortedStocks = stocks.filter(stock => filterByExchange(stock, exchange));
  res.json({ stocks : sortedStocks });
});

//Endpoint 4: Filter the stocks based on the Industrial Sector.
//Express code snippet to filter stocks based on the selected sector.
function filterByIndustry(stocks, industry){
  return stocks.industry.toLowerCase() === industry;
};

app.get("/stocks/filter/industry", (req, res) => {
  let industry = (req.query.industry).toLowerCase();
  let sortedStocks = stocks.filter(stock => filterByIndustry(stock, industry));
  res.json({ stocks : sortedStocks });
});

//Endpoint 5: Send all available stocks
function allStocks(stocks){
  return stocks;
};

app.get("/stocks", (req, res) => {
  res.json(allStocks(stocks));
});


app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
})