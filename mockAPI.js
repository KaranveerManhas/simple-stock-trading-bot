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
        peRatio: 25
    }
];

setInterval(() => {
    stockData[0].currentPrice += (Math.random() - 0.5) * 10;
 }, 1000);

app.get('/getStock', (req, res) => {
    console.log("Data sent");
    res.send(stockData);

});

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})