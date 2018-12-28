const { expect } = require('chai');
const userApi = require('./api');

describe('Users', () => {
	describe('user(id: String!): User', () => {
		it('returns a user when user can be found', async () => {
			const expectedResult = {
				data: {
					user: {
						id: '1',
						username: 'user',
						email: 'user@admin.com',
						role: 'ADMIN',
					},
				},
			};

			const result = await userApi.user({ id: '1' });
			expect(result.data).to.eql(expectedResult);
		});

		it('returns null when user cannot be found', async () => {
			const expectedResult = {
				data: {
					user: null,
				},
			};

			const result = await userApi.user({ id: '42' });
			expect(result.data).to.eql(expectedResult);
		});
	});
});
