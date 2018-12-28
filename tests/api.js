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

module.exports = {
	user,
};
