const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('../src/schema');
const resolvers = require('../src/resolvers');
const { getBitcoinPrice } = require('../src/services/bitcoinService');

jest.mock('../src/services/bitcoinService');

const testServer = new ApolloServer({
  typeDefs,
  resolvers,
});

describe('calculatePrice query', () => {
  it('calculates the correct price for buy order', async () => {
    getBitcoinPrice.mockResolvedValue(50000);

    const query = `
      query {
        calculatePrice(type: buy, margin: 2, exchangeRate: 500)
      }
    `;

    const response = await testServer.executeOperation({ query });
    expect(response.errors).toBeUndefined();
    expect(response.data.calculatePrice).toBeCloseTo(25500000, 2);
  });

  it('calculates the correct price for sell order', async () => {
    getBitcoinPrice.mockResolvedValue(50000);

    const query = `
      query {
        calculatePrice(type: sell, margin: 2, exchangeRate: 500)
      }
    `;

    const response = await testServer.executeOperation({ query });
    expect(response.errors).toBeUndefined();
    expect(response.data.calculatePrice).toBeCloseTo(24500000, 2);
  });

  it('throws an error for invalid trade type', async () => {
    const query = `
      query {
        calculatePrice(type: invalid, margin: 2, exchangeRate: 500)
      }
    `;

    const response = await testServer.executeOperation({ query });
    expect(response.errors).toBeDefined();
  });
});