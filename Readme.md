# Trading Bot Simulator

This project is a simple trading bot simulator built with Node.js. It simulates trading behavior based on predefined rules and conditions while tracking profit/loss and performance metrics. The bot interacts with a mock API that provides stock price updates.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Trading Logic](#trading-logic)
- [Profit/Loss Tracking](#profitloss-tracking)
- [License](#license)

## Features

- Continuous monitoring of stock prices using mock data.
- Basic trading strategy implemented to decide when to buy or sell.
- Logging of trades and performance metrics.
- Simulates realistic stock price movements.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
    git clone https://github.com/yourusername/trading-bot.git
    ```
2. Navigate to project directory:
    ```bash
    cd trading-bot
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

### Running the Mock API
1. In a terminal, start the mock API:
    ```bash
    node mockAPI.js
    ```
2. The API will run on http://localhost:3000

### Running the Trading Bot
1. Open another terminal, navigate to the project directory, and run the trading bot:
    ```bash
    node index.js
    ```
2. The trading bot will begin fetching stock data and simulating trades every 10 seconds.

## API Endpoints
 - GET /getStock
    - Returns the current stock data

### Sample response
    ```json
    [
        {
            "symbol": "AAPL",
            "currentPrice": 150,
            "open": 145,
            "high": 151,
            "low": 144,
            "volume": 1000000,
            "peRatio": 25,
            "averagePrice": 150,
            "volatility": 2,
            "trend": 1
        }
    ]
    ```
### Trading Logic
- The trading bot uses a simple moving average crossover strategy to determine whether to buy or sell a stock. 
- Buy Signal
The bot checks the stock price every 10 seconds and executes trades based on the conditions outlined.

### Profit/Loss Tracking
- The bot tracks its positions, balance, and overall profit/loss
- At the end of the trading session(3 minutes), a summary report is logged to the console showing trades made and the final profit/loss statement.

### License
This project is licensed under the ISC license.