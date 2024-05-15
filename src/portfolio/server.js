import express from 'express';
import { create, purchase, sell, shares, lastPurchase, value } from './Portfolio.js';

const app = express();
app.use(express.json());

let portfolio = create(); // Initialize a new portfolio

// Endpoint to handle stock purchases
app.post('/purchase', (req, res) => {
  const { symbol, quantity } = req.body;
  portfolio = purchase(portfolio, symbol, quantity);
  res.status(201).send({ message: 'Purchase successful', portfolio });
});

// Endpoint to handle selling stocks
app.post('/sell', (req, res) => {
  const { symbol, quantity } = req.body;
  portfolio = sell(portfolio, symbol, quantity);
  res.status(201).send({ message: 'Sell successful', portfolio });
});

// Endpoint to get shares of a specific stock
app.get('/shares/:symbol', (req, res) => {
  const sharesCount = shares(portfolio, req.params.symbol);
  res.status(200).send({ symbol: req.params.symbol, shares: sharesCount });
});

// Endpoint to get the last transaction
app.get('/lastTransaction', (req, res) => {
  const lastTrans = lastPurchase(portfolio);
  res.status(200).send({ lastTransaction: lastTrans });
});

// Endpoint to get the total value of the portfolio
app.get('/value', (req, res) => {
  const totalValue = value(portfolio);
  res.status(200).send({ totalValue });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app; // Export for testing
