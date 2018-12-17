const user = (sequelize, DataTypes) => {
	const User = sequelize.define('user', {
		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
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

	return User;
};

module.exports = user;
