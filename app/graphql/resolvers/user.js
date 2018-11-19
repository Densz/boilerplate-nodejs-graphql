const userResolvers = {
	Query: {
		// (parent, args, context, info) => { ... }
		me: (parents, args, { me }) => {
			return me;
		},
		user: (parent, { id }, { models }) => {
			return models.users[id];
		},
		users: (parent, args, { models }) => {
			console.log('models', models);
			return Object.values(models.users);
		},
	},

	User: {
		messages: (user, args, { models }) => {
			return Object.values(models.messages).filter(
				message => message.userId === user.id
			);
		},
		// example with parent argument
		email: user => {
			return user.email;
		},
	},
};

module.exports = userResolvers;
