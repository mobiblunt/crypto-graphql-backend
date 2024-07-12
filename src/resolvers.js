const { getBitcoinPrice } = require('./services/bitcoinService');

const resolvers = {
  Query: {
    calculatePrice: async (_, { type, margin, exchangeRate }) => {
      const bitcoinPriceUSD = await getBitcoinPrice();
      
      let adjustedPrice;
      if (type === 'sell') {
        adjustedPrice = bitcoinPriceUSD * (1 - margin / 100);
      } else {
        adjustedPrice = bitcoinPriceUSD * (1 + margin / 100);
      }
      
      return adjustedPrice * exchangeRate;
    },
  },
};

module.exports = resolvers;