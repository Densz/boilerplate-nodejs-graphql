const Sequelize = require('sequelize');
const config = require('../../../config/');

// TODO: Need to use config here
const sequelize = new Sequelize('boilerplate', 'root', 'root', {
	host: 'postgres',
	dialect: 'postgres',
});

const models = {
	User: sequelize.import('./user'),
	Message: sequelize.import('./message'),
};

Object.keys(models).forEach(key => {
	if ('associate' in models[key]) {
		models[key].associate(models);
	}
});

const createUsersWithMessages = async () => {
	await models.User.create(
		{
			email: 'user@test.fr',
			username: 'user',
			password: 'yellowe',
			messages: [
				{
					text: 'Published the Road to learn React',
				},
			],
		},
		{
			include: [models.Message],
		}
	);
	await models.User.create(
		{
			email: 'ddavids@test.fr',
			username: 'ddavids',
			password: 'yellowe',
			messages: [
				{
					text: 'Happy to release ...',
				},
				{
					text: 'Published a complete ...',
				},
			],
		},
		{
			include: [models.Message],
		}
	);
};

module.exports = { sequelize, models, createUsersWithMessages };
