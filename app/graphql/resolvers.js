const uuidv4 = require('uuid/v4');

let users = {
	1: {
		id: 1,
		email: 'user1@yellow.fr',
		messageIds: [1, 3, 4],
	},
	2: {
		id: 2,
		email: 'user2@yellow.fr',
		messageIds: [2],
	},
};

let messages = {
	1: {
		id: '1',
		text: 'Hello world',
		userId: 1,
	},
	2: {
		id: '2',
		text: 'Messages numero 2',
		userId: 2,
	},
	3: {
		id: '3',
		text: 'Tres bien',
		userId: 1,
	},
	4: {
		id: '4',
		text: 'Tres bien2',
		userId: 1,
	},
};

// A map of functions which return data for the schema
const resolvers = {
	Query: {
		// (parent, args, context, info) => { ... }
		me: (parents, args, { me }) => {
			return me;
		},
		user: (parent, { id }) => {
			return users[id];
		},
		users: () => {
			return Object.values(users);
		},
		// messages
		message: (parent, { id }) => {
			return messages[id];
		},
		messages: () => {
			return Object.values(messages);
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
		createMessage: (parent, { text }, { me }) => {
			const id = uuidv4();
			const message = {
				id,
				text,
				userId: me.id,
			};
			messages[id] = message;
			users[me.id].messageIds.push(id);
			return message;
		},
		updateMessage: (parent, { text, id }, { me }) => {
			messages[id] = {
				...messages[id],
				text,
			};
			return messages[id];
		},
		deleteMessage: (parent, { id }) => {
			// eslint-disable-next-line
			const { [id]: message, ...otherMessages } = messages;
			if (!message) {
				return false;
			}
			messages = otherMessages;
			return true;
		},
	},
};

module.exports = {
	resolvers,
	users,
};
