const faker = require('faker');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('boilerplate', 'root', 'root', {
	host: 'localhost',
	dialect: 'postgres',
});

sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});

const User = sequelize.define('accounts', {
	firstName: {
		type: Sequelize.STRING,
	},
	lastName: {
		type: Sequelize.STRING,
	},
});

sequelize.query('SELECT * FROM accounts').then(myTableRows => {
	console.log(myTableRows);
});
