const jwt = require('jsonwebtoken');

const createToken = async (user, secret, expiresIn) => {
	const { id, email, username } = user;

	return await jwt.sign({ id, email, username }, secret, { expiresIn });
};

const userResolvers = {
	Query: {
		users: async (parent, args, { models }) => {
			return await models.User.findAll();
		},
		user: async (parent, { id }, { models }) => {
			return await models.User.findById(id);
		},
		me: async (parent, args, { models, me }) => {
			if (!me) {
				return null;
			}
			return await models.User.findById(me.id);
		},
	},

	Mutation: {
		signUp: async (
			parent,
			{ username, email, password },
			{ models, secret }
		) => {
			const user = await models.User.create({
				username,
				email,
				password,
			});
			return { token: createToken(user, secret, '30m') };
		},
	},

	User: {
		messages: async (user, args, { models }) => {
			return await models.Message.findAll({
				where: {
					userId: user.id,
				},
			});
		},
	},
};

module.exports = userResolvers;
