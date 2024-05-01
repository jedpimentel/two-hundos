import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql', // Adjust this URI to match your server
  }),
  cache: new InMemoryCache(),
});

export default client;