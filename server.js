const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./graphql/schema');
const { resolvers } = require('./graphql/resolvers');
const fs = require('fs');
const https = require('https');
const http = require('http');

const config = require(process.env.NODE_ENV === 'production'
	? './config/config.prod'
	: './config/config.dev').config;

class Server {
	constructor() {
		this.app = express();
		this.apollo = new ApolloServer({ typeDefs, resolvers });
		this.server = this.configServer();
		
		this.apolloMiddleware();
		this.pubSup();
		this.initRoutes();
		this.start();
	}

	apolloMiddleware() {
		this.apollo.applyMiddleware({ app: this.app });
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

	pubSup() {
		// Add subscription support
		// https://github.com/davidyaha/graphql-redis-subscriptions
		this.apollo.installSubscriptionHandlers(this.server);
	}

	initRoutes() {
		this.app.get('/', (req, res) => {
			res.send('Hello graphql api');
		})
	}

	start() {
		this.app.listen({ port: config.port }, () => {
			console.log(
				'🚀 Server ready at',
				`http${config.ssl ? 's' : ''}://${config.hostname}:${config.port}${this.apollo.graphqlPath}`
			);
		});
	}
}

new Server();