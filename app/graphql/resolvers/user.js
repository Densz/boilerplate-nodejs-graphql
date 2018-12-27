const jwt = require('jsonwebtoken');
const { AuthenticationError, UserInputError } = require('apollo-server');
const { combineResolvers } = require('graphql-resolvers');
const { isAdmin } = require('./authorization');

const createToken = async (user, secret, expiresIn) => {
	const { id, email, username, role } = user;

	return await jwt.sign({ id, email, username, role }, secret, { expiresIn });
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
			// '30m' 30 minutes expiration date
			return { token: createToken(user, secret, '30m') };
		},
		signIn: async (parent, { email, password }, { models, secret }) => {
			const user = await models.User.findByEmail(email);

			if (!user) {
				throw new UserInputError(`No user found with ${email} credentials`);
			}
			const isValid = await user.validatePassword(password);
			if (!isValid) {
				throw new AuthenticationError('Invalid password.');
			}
			return { token: createToken(user, secret, '30m') };
		},
		deleteUser: combineResolvers(
			isAdmin,
			async (parent, { id }, { models }) => {
				return await models.User.destroy({
					where: { id },
				});
			}
		),
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
