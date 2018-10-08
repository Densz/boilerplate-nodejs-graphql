const { gql } = require('apollo-server');

// The GraphQL Schema
const typeDefs = gql`
	type Query {
		hello: String
	}
`;

module.exports = {
	typeDefs,
};
