const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 3000;
const PORT = process.env.PORT || 4000;

// Define your schema
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

// const server = new ApolloServer({ typeDefs, resolvers });

// server.applyMiddleware({ app, path: '/graphql' });

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}${server.graphqlPath}`);
// });

// app.get('/', (req, res) => {
//   res.send('Two Hundos!');
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });



async function startServer() {
  const app = express();

  // Create a new instance of ApolloServer
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // Start Apollo Server
//   await server.start();  // Make sure to await the start method
  try {
    await server.start();
    // server.applyMiddleware({ app });
    server.applyMiddleware({ app, path: '/graphql' });
  } catch (error) {
    console.error('Failed to start the Apollo Server', error);
  }

  // Apply middleware to the Express application
//   server.applyMiddleware({ app });
//   server.applyMiddleware({ app, path: '/graphql' });

  // Start the Express server
  app.listen({ port: PORT }, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}
startServer();