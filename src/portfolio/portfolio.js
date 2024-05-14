// Portfolio.js
export const create = () => ({
  transactions: [],
  lastTransaction: null
});

export const purchase = (portfolio, symbol, quantity) => {
  const now = new Date();
  const transaction = {
    symbol,
    shares: quantity,
    timestamp: now
  };
  return {
    ...portfolio,
    transactions: [...portfolio.transactions, transaction],
    lastTransaction: transaction
  };
};

export const sell = (portfolio, symbol, quantity) => {
  const now = new Date();
  const transaction = {
    symbol,
    shares: -quantity,  // Negative to indicate selling
    timestamp: now
  };
  return {
    ...portfolio,
    transactions: [...portfolio.transactions, transaction],
    lastTransaction: transaction
  };
};

export const shares = (portfolio, symbol) => {
  return portfolio.transactions.reduce((acc, transaction) => {
    if (transaction.symbol === symbol) {
      acc += transaction.shares;
    }
    return acc;
  }, 0);
};

export const lastPurchase = (portfolio) => {
  return portfolio.lastTransaction;
};

export const value = (portfolio, priceLookup) => {
  return portfolio.transactions.reduce((totalValue, transaction) => {
    return totalValue + (shares(portfolio, transaction.symbol) * priceLookup(transaction.symbol));
  }, 0);
};
