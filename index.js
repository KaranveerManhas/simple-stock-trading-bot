
// Store stock prices
let stockPrices = [];
let stockSymbol = null;

// Store trade history
let tradeHistory = [];
// Store profit / loss
let profitLoss = 0;

// Configuration
const shortTermPeriod = 3;  //Short-term moving average period
const longTermPeriod = 5;   //Long-term moving average period
let balance = 10000;        //Starting balance
let stockHoldings = 0;      //Current stock holdings
let position = null;        //Tracks current position(sell/buy)


// Fetch stock data
const fetchStockData = async () => {
    try {
        const response = await fetch("http://localhost:3000/getStock");
        const stockData = await response.json();
        
        const currentPrice = Math.round(stockData[0].currentPrice, 2);
        stockSymbol = stockData[0].symbol;

        // Store the most recent price
        stockPrices.push(currentPrice);

        // Maintain only the last long-term period prices
        if (stockPrices.length > longTermPeriod){
            stockPrices.shift(); //Remove the oldest price data
        }

        console.log(`Current Price : ${currentPrice}`);


        if (stockPrices.length >=longTermPeriod){
            tradeBasedOnMovingAverage(stockPrices);
        }

    }catch(err){
        console.log(err);
    }
} 

// Buy Stock
const buyStock = () => {
    const price = stockPrices[stockPrices.length-1];
    const shares = Math.floor(balance / price);
    stockHoldings += shares;

    balance -= shares * price;
    const trade = {
        type: "buy",
        price: price,
        shares: shares,
        timestamp: new Date()
    };
    tradeHistory.push(trade);
    console.log(`Bought ${shares} shares of ${stockSymbol} at ${price}`);
}

// Sell Stock
const sellStock = () => {
    if(stockHoldings > 0){
        console.log("Sell signal");
        position = "sell";
        const currentPrice = stockPrices[stockPrices.length-1];
        const shares = stockHoldings;
        balance += shares * currentPrice;
        stockHoldings = 0;

        const trade = {
            type: "sell",
            price: currentPrice,
            shares: shares,
            timestamp: new Date()
        };
        tradeHistory.push(trade);
        // Calculate profit/loss
        const boughtAt = tradeHistory.find(trade => trade.type === "buy").price;
        profitLoss += stockHoldings * (currentPrice - boughtAt);

        console.log(`Sold ${shares} shares of ${stockSymbol} at ${currentPrice}`);
    }
}

// Calculate Moving Average
const calculateMovingAverage = (prices, period) => {
    const sum = prices.slice(-period).reduce((acc, price) => acc + price, 0);
    return sum / period;
}

// Trade based on moving averages
const tradeBasedOnMovingAverage = (stockPrices) => {
    const shortTermMA = calculateMovingAverage(stockPrices, shortTermPeriod);
    const longTermMA = calculateMovingAverage(stockPrices, longTermPeriod);

    console.log(`Short-Term MA: ${shortTermMA}, Long-term MA: ${longTermMA}`);

    // Check for crossover conditions
    if(shortTermMA > longTermMA && position !="buy"){
        console.log("Buy signal");
        position = "buy";
        // Invoke Buy stock function
        buyStock();

    }else if (shortTermMA < longTermMA && position != 'sell'){
        // Invoke Sell stock function
        sellStock();
    }
}

// Call fetchStockData every 10 seconds
const stockDataInterval = setInterval(fetchStockData, 5000);

// Stop fetching stock data after 2 minutes
setTimeout(() => {
    clearInterval(stockDataInterval);

    // Log final report
    console.log('Final Report:');
    tradeHistory.forEach((trade, index) => {
        if (trade.type === 'buy') {
            console.log(`${index + 1}. Bought at $${trade.price} on ${trade.timestamp}`);
          } else if (trade.type === 'sell') {
            console.log(`${index + 1}. Sold at $${trade.price} on ${trade.timestamp}.Profit/Loss: $${profitLoss.toFixed(2)}`);
          }
    });
    console.log(`\nFinal Balance: $${balance.toFixed(2)}`);
}, 60000);