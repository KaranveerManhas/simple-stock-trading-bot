const express = require('express');
const app = express();
const port = 3000;

// app.use(express.json());

const stockData = [
    {
        symbol: "AAPL",
        currentPrice: 150,
        open: 145,
        high: 151,
        low: 144,
        volume: 1000000,
        peRatio: 25
    }
];

setInterval(() => {
    stockData[0].currentPrice += Math.random() * 5 - 2.5;
    stockData[0].open += Math.random() * 2 - 1;
    stockData[0].high += Math.random() * 3 - 1.5;
    stockData[0].low += Math.random() * 1.5 - 0.75;
    stockData[0].volume += Math.random() * 10000 - 5000;
    stockData[0].peRatio += Math.random() * 0.5 - 0.25;
 }, 10000);

app.get('/getStock', (req, res) => {
    console.log("Data sent");
    res.send(stockData);

});

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})