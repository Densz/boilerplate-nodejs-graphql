const { gql } = require('apollo-server');

// TODO: SPLIT typeDefs and Resolvers
// The GraphQL Schema
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// A map of functions which return data for the schema
const resolvers = {
  Query: {
    hello: () => 'world',
  },
};

module.exports = { 
  typeDefs, 
  resolvers,
};
