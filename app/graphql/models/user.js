const bcrypt = require('bcryptjs');

const user = (sequelize, DataTypes) => {
	const User = sequelize.define('user', {
		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
			validate: {
				notEmpty: true,
				isEmail: true,
			},
		},
		username: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
				len: [7, 42],
			},
		},
		role: {
			type: DataTypes.STRING,
		},
	});

	User.associate = models => {
		User.hasMany(models.Message, { onDelete: 'CASCADE' });
	};

	User.findByEmail = async email => {
		let user = await User.findOne({
			where: { email },
		});
		return user;
	};

	User.beforeCreate(async user => {
		user.password = await user.generatePasswordHash();
	});

	User.prototype.generatePasswordHash = async function() {
		const saltRounds = 10;
		return await bcrypt.hash(this.password, saltRounds);
	};

	User.prototype.validatePassword = async function(password) {
		return await bcrypt.compare(password, this.password);
	};

	return User;
};

module.exports = user;
