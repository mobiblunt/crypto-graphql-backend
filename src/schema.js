const { gql } = require('apollo-server-express');

const typeDefs = gql`
  enum TradeType {
    buy
    sell
  }

  type Query {
    calculatePrice(type: TradeType!, margin: Float!, exchangeRate: Float!): Float!
  }
`;

module.exports = typeDefs;