// Portfolio.test.js
import { create, purchase, sell, shares, lastPurchase, value } from './Portfolio';

describe('Portfolio Module Tests', () => {
  let portfolio;

  beforeEach(() => {
    portfolio = create();
  });

  test('create initializes an empty portfolio', () => {
    expect(portfolio).toEqual({ transactions: [], lastTransaction: null });
  });

  describe('purchase functionality', () => {
    test('adds shares to portfolio', () => {
      portfolio = purchase(portfolio, 'AAPL', 10);
      expect(shares(portfolio, 'AAPL')).toBe(10);
    });

    test('updates last transaction on purchase', () => {
      portfolio = purchase(portfolio, 'AAPL', 10);
      expect(lastPurchase(portfolio)).toEqual({
        symbol: 'AAPL',
        shares: 10,
        timestamp: expect.any(Date)
      });
    });
  });

  describe('sell functionality', () => {
    test('reduces shares in portfolio', () => {
      portfolio = purchase(portfolio, 'AAPL', 20);
      portfolio = sell(portfolio, 'AAPL', 5);
      expect(shares(portfolio, 'AAPL')).toBe(15);
    });

    test('updates last transaction on sell', () => {
      portfolio = purchase(portfolio, 'AAPL', 20);
      portfolio = sell(portfolio, 'AAPL', 5);
      expect(lastPurchase(portfolio)).toEqual({
        symbol: 'AAPL',
        shares: -5,
        timestamp: expect.any(Date)
      });
    });
  });

  describe('value calculation', () => {
    test('value calculates total portfolio value', () => {
      const mockPriceLookup = jest.fn(symbol => {
        const prices = { 'AAPL': 200, 'IBM': 100 };
        return prices[symbol];
      });
      portfolio = purchase(portfolio, 'AAPL', 10);
      portfolio = purchase(portfolio, 'IBM', 10);
      const totalValue = value(portfolio, mockPriceLookup);
      expect(totalValue).toBe(3000);
      expect(mockPriceLookup).toHaveBeenCalledWith('AAPL');
      expect(mockPriceLookup).toHaveBeenCalledWith('IBM');
    });
  });
});
