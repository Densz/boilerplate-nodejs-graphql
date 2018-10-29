// A map of functions which return data for the schema
const resolvers = {
	Query: {
		author(args) {
			return find(authors, { id: args.id });
		},
	},
	Author: {
		books(author) {
			return filter(books, { author: author.name });
		},
	},
};

module.exports = {
	resolvers,
};
