const Sequelize = require('sequelize');

try {
	const sequelize = new Sequelize('boilerplate', 'root', 'root', {
		host: 'postgres',
		dialect: 'postgres',
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
		operatorsAliases: false,
	});
	// const User = sequelize.define('user', {
	// 	username: Sequelize.STRING,
	// 	birthday: Sequelize.DATE,
	// })
} catch (error) {
	console.log({ error });
}
