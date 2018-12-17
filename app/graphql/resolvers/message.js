const uuidv4 = require('uuid/v4');

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
		createMessage: async (parent, { text }, { me, models }) => {
			try {
				return await models.Message.create({
					text,
					userId: me.id,
				});
			} catch (err) {
				throw new Error(err);
			}
		},
		deleteMessage: async (parent, { id }, { models }) => {
			return await models.Message.destroy({ where: { id } });
		},
	},

	Message: {
		user: async (message, args, { models }) => {
			return await models.User.findById(message.userId);
		},
	},
};

module.exports = messageResolvers;
