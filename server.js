const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const fs = require('fs');
const https = require('https');
const http = require('http');
const config = require(process.env.NODE_ENV === 'production'
	? './config/config.prod'
	: './config/config.dev');

require('./app/initializers/03_sequelize');

const { schema } = require('./app/graphql/schema');
const { resolvers, users } = require('./app/graphql/resolvers');
const models = require('./app/graphql/models');

class Server {
	constructor() {
		this.app = express();
		this.apollo = new ApolloServer({
			typeDefs: schema,
			resolvers,
			context: {
				models,
				me: models.users[1],
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
		this.app.listen({ port: config.port }, () => {
			console.log(
				'🚀 Server ready at',
				`http${config.ssl ? 's' : ''}://${config.hostname}:${config.port}${
					this.apollo.graphqlPath
				}`
			);
		});
	}
}

new Server();
