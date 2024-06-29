import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const graphqlUrl = process.env.REACT_APP_GRAPHQL_URL;

if (!graphqlUrl) {
  throw new Error('REACT_APP_GRAPHQL_URL is not set');
}

const httpLink = createHttpLink({
  uri: graphqlUrl, // Update this to your backend URL
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;