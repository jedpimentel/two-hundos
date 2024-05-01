import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    // uri: 'http://localhost:4000/graphql', // Adjust this URI to match your server
    uri: process.env.REACT_APP_GRAPHQL_URI, // Dynamically set based on the environment
  }),
  cache: new InMemoryCache(),
});

export default client;