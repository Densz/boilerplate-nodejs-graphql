const Sequelize = require('sequelize');
const config = require('../../../config/');

const sequelize = new Sequelize(
	process.env.TEST_DATABASE || config.postgres.database,
	config.postgres.username,
	config.postgres.password,
	{
		host: process.env.TEST_DATABASE ? 'postgres-test' : 'postgres',
		dialect: 'postgres',
	}
);

const models = {
	User: sequelize.import('./user'),
	Message: sequelize.import('./message'),
};

Object.keys(models).forEach(key => {
	if ('associate' in models[key]) {
		models[key].associate(models);
	}
});

const createUsersWithMessages = async date => {
	await models.User.create(
		{
			email: 'user@admin.com',
			username: 'user',
			password: 'yellowe',
			role: 'ADMIN',
			messages: [
				{
					text: 'Published the Road to learn React',
					createdAt: date.setSeconds(date.getSeconds() + 1),
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
					createdAt: date.setSeconds(date.getSeconds() + 1),
				},
				{
					text: 'Published a complete ...',
					createdAt: date.setSeconds(date.getSeconds() + 1),
				},
			],
		},
		{
			include: [models.Message],
		}
	);
};

module.exports = { sequelize, models, createUsersWithMessages };
