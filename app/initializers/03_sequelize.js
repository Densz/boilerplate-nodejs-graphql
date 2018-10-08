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
	})
	const User = sequelize.define('user', {
		username: Sequelize.STRING,
		birthday: Sequelize.DATE,
	})
	
	// sequelize.sync()
	// 	.then(() => User.create({
	// 		username: 'Denis ZHENGGGGG',
	// 		birthday: new Date(1980, 6, 20),
	// 	}))
	// 	.then(result => {
	// 		console.log(result.toJSON());
	// 	});
} catch(error) {
	console.log("OKAYYYY");
}