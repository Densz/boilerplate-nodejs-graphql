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

const apollo = new ApolloServer({ typeDefs, resolvers });

const app = express();
apollo.applyMiddleware({ app });

//  Create the HTTPS or HTTP server, per configuration
var server;
if (config.ssl) {
  // Assumes certificates are in .ssl folder from package root. Make sure the files
  // are secured.
  server = https.createServer(
    {
      key: fs.readFileSync(`./ssl/${process.env.NODE_ENV}/server.key`),
      cert: fs.readFileSync(`./ssl/${process.env.NODE_ENV}/server.crt`),
    },
    app
  );
} else {
  server = http.createServer(app);
}

// Add subscription support
// https://github.com/davidyaha/graphql-redis-subscriptions
apollo.installSubscriptionHandlers(server);

app.listen({ port: config.port }, () => {
  console.log(
    '🚀 Server ready at',
    `http${config.ssl ? 's' : ''}://${config.hostname}:${config.port}${
      apollo.graphqlPath
    }`
  );
});
