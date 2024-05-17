import request from 'supertest';
import app from './server.js';

describe('Smoke tests for portfolio server', () => {
  test('POST /purchase should make a purchase', async () => {
    const response = await request(app)
      .post('/purchase')
      .send({ symbol: 'AAPL', quantity: 10 })
      .expect(201)
      .expect('Content-Type', /json/);

    expect(response.body.message).toEqual('Purchase successful');
    expect(response.body.portfolio.transactions.length).toBeGreaterThan(0);
  });

  test('POST /sell should sell stocks', async () => {
    // First, ensure there are stocks to sell
    await request(app).post('/purchase').send({ symbol: 'AAPL', quantity: 20 });

    const response = await request(app)
      .post('/sell')
      .send({ symbol: 'AAPL', quantity: 5 })
      .expect(201)
      .expect('Content-Type', /json/);

    expect(response.body.message).toEqual('Sell successful');
    expect(response.body.portfolio.transactions.length).toBeGreaterThan(1); // Purchase and sell
  });

  test('GET /value should return the portfolio value', async () => {
    await request(app).post('/purchase').send({ symbol: 'AAPL', quantity: 42 });

    const response = await request(app)
      .get('/value')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body.totalValue).toBe(42);
  });
});
