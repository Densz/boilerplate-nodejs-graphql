const { gql } = require('apollo-server');

const messageSchema = gql`
	extend type Query {
		messages: [Message!]
		message(id: ID!): Message!
	}

	extend type Mutation {
		createMessage(text: String!): Message!
		deleteMessage(id: ID!): Boolean!
	}

	type Message {
		id: ID!
		text: String!
		userId: Int
		user: User!
	}
`;

module.exports = messageSchema;
