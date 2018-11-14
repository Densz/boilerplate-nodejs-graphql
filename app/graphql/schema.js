const { gql } = require('apollo-server');

// The GraphQL Schema
const schema = gql`
	type Query {
		me: User
		users: [User!]
		user(id: ID!): User

		messages: [Message!]
		message(id: ID!): Message!
	}

	type User {
		id: ID!
		email: String!
		messageIds: [String!]
		messages: [Message!]
	}

	type Message {
		id: ID!
		text: String!
		user: User!
	}

	type Mutation {
		createMessage(text: String!): Message!
		updateMessage(text: String!, id: ID!): Message!
		deleteMessage(id: ID!): Boolean!
	}
`;

module.exports = {
	schema,
};
