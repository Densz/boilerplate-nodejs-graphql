const { combineResolvers } = require('graphql-resolvers');
const { isAuthenticated, isMessageOwner } = require('./authorization');

const messageResolvers = {
	Query: {
		// messages
		message: async (parent, { id }, { models }) => {
			return await models.Message.findById(id);
		},
		messages: async (parent, args, { models }) => {
			return await models.Message.findAll();
		},
	},

	Mutation: {
		createMessage: combineResolvers(
			isAuthenticated,
			async (parent, { text }, { me, models }) => {
				return await models.Message.create({
					text,
					userId: me.id,
				});
			}
		),
		deleteMessage: combineResolvers(
			isAuthenticated,
			isMessageOwner,
			async (parent, { id }, { models }) => {
				return await models.Message.destroy({ where: { id } });
			}
		),
	},

	Message: {
		user: async (message, args, { models }) => {
			return await models.User.findById(message.userId);
		},
	},
};

module.exports = messageResolvers;
