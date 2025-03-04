const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { json } = require('body-parser');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const typeDefs = require('./taskSchema');
const taskResolver = require('./taskResolver');

const app = express();

async function setupServer() {
  try {
    const schema = makeExecutableSchema({
      typeDefs,
      resolvers: taskResolver,
    });

    const server = new ApolloServer({ schema });
    await server.start();

    app.use('/graphql', json(), expressMiddleware(server));

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}/graphql`));
  } catch (error) {
    console.error('Failed to start the Apollo server:', error);
  }
}

setupServer();
