import { ApolloLink, split } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { createUploadLink } from 'apollo-upload-client';

import { env, config } from 'config';

import { AUTH_TOKEN } from './constants';


const httpLink = new HttpLink({
  uri: env === 'local' ? `http://${config.PRISMA_ENDPOINT}` : `https://${config.PRISMA_ENDPOINT}`,
});

const middlewareAuthLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(AUTH_TOKEN);

  const authorizationHeader = token ? `Bearer ${token}` : null;

  operation.setContext({
    headers: {
      authorization: authorizationHeader,
    },
  });

  return forward(operation);
});

const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink);

const wsLink = new WebSocketLink({
  uri: env === 'local' ? `ws://${config.PRISMA_ENDPOINT}` : `wss://${config.PRISMA_ENDPOINT}`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem(AUTH_TOKEN),
    },
  },
});

const uploadLink = createUploadLink({
  uri: env === 'local' ? `http://${config.PRISMA_ENDPOINT}` : `https://${config.PRISMA_ENDPOINT}`,
});

const isFile = (value) => (
  (typeof File !== 'undefined' && value instanceof File) ||
  (typeof Blob !== 'undefined' && value instanceof Blob)
);

const isUpload = ({ variables }) => Object.values(variables).some(isFile);

const isSubscriptionOperation = ({ query }) => {
  const { kind, operation } = getMainDefinition(query);
  return kind === 'OperationDefinition' && operation === 'subscription';
};

const requestLink = split(isSubscriptionOperation, wsLink, httpLinkWithAuthToken);

const terminalLink = split(isUpload, uploadLink, requestLink);

export const client = new ApolloClient({
  link: terminalLink,
  cache: new InMemoryCache(),
});
