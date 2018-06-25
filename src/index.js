import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { injectGlobal } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

import { globalStyles } from 'ui/theme';

import { Routes } from './routes';

import normalize from 'normalize.css/normalize.css';


injectGlobal`${normalize} ${globalStyles}`;


const client = new ApolloClient({
  uri: 'https://eu1.prisma.sh/silencerweb-d7143d/karma-api/develop',
});

ReactDOM.render(
  <ApolloProvider client={ client }>
    <BrowserRouter>
      <Routes/>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
);
