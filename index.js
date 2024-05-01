require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// console.log(process.env.MONGODB_CONNECTION_STRING) // somehow I just do not feel comfy letting this stay active
if(!process.env.MONGODB_CONNECTION_STRING) throw "lolwut, check your .env"
mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});


// const app = express();
// const PORT = process.env.PORT || 3000;
const PORT = process.env.PORT || 4000;

// Define your schema
const typeDefs = gql`
  type TextBox {
    id: ID!
    content: String
    x: Int
    y: Int
    lastEdited: String
  }

  type Query {
    hello: String,
    getAllTextBoxes: [TextBox]
  }
`;

const TextBox = require('./models/TextBox');  // Adjust the path as necessary
// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    getAllTextBoxes: async () => {
        try {
          console.log('geting da ting')
          return await TextBox.find();  // Fetch all text boxes from MongoDB
        } catch (error) {
            console.log('NOOOOOOOOO')
            console.log('OOOOOOOOO')
            console.log('OOOOOOOOO!')
            console.error(error);
          return [];
        }
      },
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


//   WOLOLO, CHECK THIS LOGIC YO
    // Serve static files from the React app
    app.use(express.static(path.join(__dirname, 'frontend/build')));

    // The "catchall" handler: for any request that doesn't
    // match one above, send back React's index.html file.
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/frontend/build/index.html'));
    });
/// sorry for indent chaos





  app.listen({ port: PORT }, () => {
    // assuming the logs are being viewed locally
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
  });
}
startServer();