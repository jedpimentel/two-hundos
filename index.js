require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const path = require('path');
const bodyParser = require('body-parser');
const chatGptRouter = require('./chatGPTRouter');

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

  
    type Mutation {
        createTextBox(content: String!, x: Int!, y: Int!): TextBox
        saveTextBox(id: ID!, content: String!): TextBox
        updatePosition(id: ID!, x: Int!, y: Int!): TextBox
        deleteTextBox(id: ID!): TextBox
        getChatGptResponse(prompt: String!): String
    }
`;
// saveTextBox(id: ID!, content: String!, x: Int!, y: Int!): TextBox

const TextBox = require('./models/TextBox');  // Adjust the path as necessary
// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    getAllTextBoxes: async () => {
        try {
        //   console.log('geting da ting')
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
  Mutation: {
      createTextBox: async (_, { content, x, y }) => {
          // Logic to create a text box
      },
      
    //   saveTextBox: async (_, { id, content, x, y }, { db }) => {
    //     // const result = await db.collection('textBoxes').updateOne(        
    //     const result = await TextBox.updateOne(
    //       { _id: id },
    //       { $set: { content, x, y, isSaved: true } }
    //     );
    //     return result.ops[0]; // or however your database driver returns the updated document
    //   },
      
    saveTextBox: async (_, { id, content, x, y }, { db }) => {
        // Assuming MongoDB for database operations
        const result = await TextBox.findOneAndUpdate(
            // { _id: new ObjectId(id) },
            { _id: id },
            { $set: { content } },
            { returnOriginal: false }
        );
        if (!result.value) {
            throw new Error('Failed to save the text box');
        }
        return result.value;
    },
    //   updatePosition: async (_, { id, x, y }) => {
    //       // Logic to update the position of a text box
    //   },
      updatePosition: async (_, { id, x, y }, { db }) => {
        // console.log('shoop da woop', id, x, y)
        try {
            // const result = await db.collection('textBoxes').findOneAndUpdate(
            const result = await TextBox.findOneAndUpdate(
                { _id: id },
                { $set: { x, y } },
                { returnNewDocument: true }
            );
            if (!result.value) throw new Error('TextBox not found');
            return result.value;
        } catch (error) {
          throw new Error('Failed to update position');
        }
      },
      deleteTextBox: async (_, { id }) => {
          // Logic to delete a text box
      },
    //   zoidberg
      getChatGptResponse: async (_, { prompt }) => {
        // console.log('got prompted', prompt)
        const apiKey = process.env.OPENAI_API_KEY;
        // console.log('key', apiKey)
        const API_PROMPT = `keep your response within 150 tokens. pretend you're two benjamin franklins, giving conflicting opinions to the following message: ${prompt}`;
        const API_ENDPOINT = "https://api.openai.com/v1/chat/completions"; //  newer
        // const API_ENDPOINT = "https://api.openai.com/v1/completions"; //  legacy
        const response = await fetch(API_ENDPOINT, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo-0125", // Specify the model here !!!!IMPORTANT !!!!1!1!1!1 https://platform.openai.com/docs/guides/text-generation
            // prompt: prompt,
            "messages": [{"role": "user", "content": API_PROMPT}],
            "temperature": 0.7,
            max_tokens: 150
          })
        });
        const data = await response.json();
        // console.log('received', data)
        // console.log('da ting', data.choices[0].message.content)
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch response from ChatGPT');
        }
        // return data.choices[0].text;
        return data.choices[0].message.content;
      }
      
  }
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

  
  // Middleware for parsing JSON bodies
  app.use(bodyParser.json());
  // Use the ChatGPT router
//   app.use('/api', chatGptRouter); // This will mount your router under "/api"
  app.use('/api', chatGptRouter); // This will mount your router under "/api"
//   /api/process-text

  // Create a new instance of ApolloServer
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
        // !!! not entrely sure about if it's getting passed right!!!!
        db: mongoose.connection,  // make sure your DB connection is correctly passed
    })
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