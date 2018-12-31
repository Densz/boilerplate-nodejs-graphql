const axios = require('axios');

const API_URL = 'http://localhost:8881/graphql';

const user = async variables =>
	axios.post(API_URL, {
		query: `
			query ($id: ID!) {
				user(id: $id) {
					id
					username
					email
					role
				}
			}
		`,
		variables,
	});

const signIn = async variables =>
	await axios.post(API_URL, {
		query: `
			mutation ($email: String!, $password: String!) {
				signIn(email: $email, password: $password) {
					token
				}
			}
		`,
		variables,
	});

const deleteUser = async (variables, token) =>
	axios.post(
		API_URL,
		{
			query: `
				mutation ($id: ID!) {
					deleteUser(id: $id)
				}
			`,
			variables,
		},
		{
			headers: {
				'x-token': token,
			},
		}
	);

module.exports = {
	user,
	signIn,
	deleteUser,
};
