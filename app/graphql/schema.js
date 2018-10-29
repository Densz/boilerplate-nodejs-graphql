const { gql } = require('apollo-server');

// The GraphQL Schema
const typeDefs = gql`
  type Book {
    title: String
    author: Author
  }

  type Author {
    books: [Book]
  }

  type Query {
    author: Author
  }
`;

module.exports = {
	typeDefs,
};
