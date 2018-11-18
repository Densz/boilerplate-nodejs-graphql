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

module.exports = {
	users,
	messages,
};
