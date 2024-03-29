const { gql } = require('apollo-server');

const messageSchema = gql`
	extend type Query {
		messages(offset: Int, limit: Int): [Message!]
		message(id: ID!): Message!
	}

	extend type Mutation {
		createMessage(text: String!): Message!
		deleteMessage(id: ID!): Boolean!
	}

	extend type Subscription {
		messageCreated: MessageCreated!
	}

	type MessageCreated {
		message: Message!
	}

	type Message {
		id: ID!
		text: String!
		createdAt: Date!
		userId: Int
		user: User!
	}
`;

module.exports = messageSchema;
