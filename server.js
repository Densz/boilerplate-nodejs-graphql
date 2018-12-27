const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const fs = require('fs');
const https = require('https');
const http = require('http');
const jwt = require('jsonwebtoken');
const config = require('./config/');
const schema = require('./app/graphql/schema/');
const resolvers = require('./app/graphql/resolvers/');
const {
	sequelize,
	models,
	createUsersWithMessages,
} = require('./app/graphql/models/');

const eraseDatabaseOnSync = true; // FIXME: Reset database on save with nodemon

const getMe = async req => {
	const token = req.headers['x-token'];

	if (token) {
		try {
			return await jwt.verify(token, config.secret);
		} catch (e) {
			throw new AuthenticationError('Your session expired. Sign in again');
		}
	}
};

class Server {
	constructor() {
		this.app = express();
		this.apollo = new ApolloServer({
			typeDefs: schema,
			resolvers,
			formatError: error => {
				// remove the internal sequelize error message
				// leave only the important validation error
				const message = error.message
					.replace('SequelizeValidationError: ', '')
					.replace('Validation error: ', '');

				return {
					...error,
					message,
				};
			},
			context: async ({ req }) => {
				const me = await getMe(req);

				return {
					models,
					me,
					secret: config.secret,
				};
			},
		});
		this.server = this.configServer();
		this.router = express.Router();
		this.initMiddlewares();
		this.initRoutes();
		this.start();
	}

	initMiddlewares() {
		this.app.use(cors());
		this.app.use(bodyParser.urlencoded({ extended: false }));
		this.app.use(bodyParser.json());
		this.apollo.applyMiddleware({ app: this.app, path: '/graphql' });
		this.app.use(this.router);
	}

	configServer() {
		//  Create the HTTPS or HTTP server, per configuration
		let server;
		if (config.ssl) {
			// Assumes certificates are in .ssl folder from package root. Make sure the files
			// are secured.
			server = https.createServer(
				{
					key: fs.readFileSync(`./ssl/${process.env.NODE_ENV}/server.key`),
					cert: fs.readFileSync(`./ssl/${process.env.NODE_ENV}/server.crt`),
				},
				this.app
			);
		} else {
			server = http.createServer(this.app);
		}
		return server;
	}

	initRoutes() {
		this.router.get('/', (req, res) => {
			res.send('🚀 Hello GraphQL API!');
		});
	}

	start() {
		sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
			if (eraseDatabaseOnSync) {
				createUsersWithMessages(new Date());
			}
			this.app.listen({ port: config.port }, () => {
				console.log(
					'🚀 Server ready at',
					`http${config.ssl ? 's' : ''}://${config.hostname}:${config.port}${
						this.apollo.graphqlPath
					}`
				);
			});
		});
	}
}

new Server();
