const express = require('express');
const app = express();
const port = 3000;


let stockData = [
    {
        symbol: "AAPL",
        currentPrice: 150,
        open: 145,
        high: 151,
        low: 144,
        volume: 1000000,
        peRatio: 25,
        averagePrice: 150,  // Mean price to revert to
        volatility: 2,      // Volatility factor for price changes
        trend: 1            // Direction of the trend (1 = upward, -1 = downward)
    }
];

// Function to simulate stock price changes
const updateStockPrice = () => {
    let stock = stockData[0];

    // Random short-term fluctuation
    let randomFluctuation = (Math.random() - 0.5) * stock.volatility * 2;

    // Apply trend influence to the price (trend is 1 for upward, -1 for downward)
    let trendInfluence = stock.trend * (Math.random() * stock.volatility);

    // Combine the random fluctuation with the trend influence
    stock.currentPrice += randomFluctuation + trendInfluence;

    // Strengthen mean reversion to bring price back toward the average
    let deviationFromAverage = stock.currentPrice - stock.averagePrice;
    stock.currentPrice -= deviationFromAverage * 0.05; // Stronger reversion to the mean

    // Randomly reverse the trend more frequently
    if (Math.random() < 0.1) {
        stock.trend = stock.trend * -1;  // Reverse the trend with a 10% chance
    }

    // Gradually dampen the trend over time to prevent endless trending
    stock.trend += (Math.random() - 0.5) * 0.1; // Small random trend adjustments

    // Keep the price within a reasonable range
    stock.currentPrice = Math.max(stock.low * 0.5, Math.min(stock.currentPrice, stock.high * 1.5));
};

// Update the stock price every second
setInterval(updateStockPrice, 3000);



app.get('/getStock', (req, res) => {
    res.send(stockData);

});

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})