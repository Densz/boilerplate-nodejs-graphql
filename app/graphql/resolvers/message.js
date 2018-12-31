const { combineResolvers } = require('graphql-resolvers');
const { isAuthenticated, isMessageOwner } = require('./authorization');
const { EVENTS, pubsub } = require('../subscription/');

const messageResolvers = {
	Query: {
		// messages
		message: async (parent, { id }, { models }) => {
			return await models.Message.findById(id);
		},
		messages: async (parent, { offset = 0, limit = 100 }, { models }) => {
			return await models.Message.findAll({ offset, limit });
		},
	},

	Mutation: {
		createMessage: combineResolvers(
			isAuthenticated,
			async (parent, { text }, { me, models }) => {
				const message = await models.Message.create({
					text,
					userId: me.id,
				});
				pubsub.publish(EVENTS.MESSAGE.CREATED, {
					messageCreated: { message },
				});
				return message;
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
		user: async (message, args, { loaders }) => {
			return await loaders.user.load(message.userId);
		},
	},

	Subscription: {
		messageCreated: {
			subscribe: () => pubsub.asyncIterator(EVENTS.MESSAGE.CREATED),
		},
	},
};

module.exports = messageResolvers;
