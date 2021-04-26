import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { setContext } from 'apollo-link-context';

const GRAPHQL_URI = process.env.REACT_APP_GRAPHQL_URI;
const GRAPHQL_SUB_URI = process.env.REACT_APP_GRAPHQL_SUB_URI;

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('loggedUserToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const httpLink = new HttpLink({
  uri: GRAPHQL_URI,
});

const wsLink = new WebSocketLink({
  uri: GRAPHQL_SUB_URI,
  options: { reconnect: true },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

export default client;
