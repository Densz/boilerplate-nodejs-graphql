const uuidv4 = require('uuid/v4');

const messageResolvers = {
	Query: {
		// messages
		message: (parent, { id }, { models }) => {
			return models.messages[id];
		},
		messages: (parent, args, { models }) => {
			return Object.values(models.messages);
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

	Message: {
		user: (message, args, { models }) => {
			return models.users[message.userId];
		},
	},
};

module.exports = messageResolvers;
