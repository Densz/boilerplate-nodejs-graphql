const uuidv4 = require('uuid/v4');

// A map of functions which return data for the schema
const resolvers = {
	Query: {
		// (parent, args, context, info) => { ... }
		me: (parents, args, { me }) => {
			return me;
		},
		user: (parent, { id }, { models }) => {
			return models.users[id];
		},
		users: (parent, args, { models }) => {
			return Object.values(models.users[id]);
		},
		// messages
		message: (parent, { id }, { models }) => {
			return models.messages[id];
		},
		messages: (parent, args, { models }) => {
			return Object.values(models.messages);
		},
	},

	User: {
		email: user => {
			return user.email;
		},
		messages: user => {
			return Object.values(messages).filter(
				message => message.userId === user.id
			);
		},
	},

	Message: {
		user: message => {
			return users[message.userId];
		},
	},

	Mutation: {
		createMessage: (parent, { text }, { me, models }) => {
			const id = uuidv4();
			const message = {
				id,
				text,
				userId: me.id,
			};
			models.messages[id] = message;
			models.users[me.id].messageIds.push(id);
			return message;
		},
		updateMessage: (parent, { text, id }, { me }) => {
			messages[id] = {
				...messages[id],
				text,
			};
			return messages[id];
		},
		deleteMessage: (parent, { id }, { models }) => {
			// eslint-disable-next-line
			const { [id]: message, ...otherMessages } = models.messages;
			if (!message) {
				return false;
			}
			models.messages = otherMessages;
			return true;
		},
	},
};

module.exports = {
	resolvers,
};
