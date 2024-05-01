import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URI, // Dynamically set based on the environment

    // local live mode
    // uri: 'http://localhost:4000/graphql', // Adjust this URI to match your server

    // commit this version when deploying!
    // uri: '/graphql', // let's go humans!
  }),
  cache: new InMemoryCache(),
});

export default client;