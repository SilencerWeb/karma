import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { injectGlobal } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { ApolloLink, split } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import { globalStyles } from 'ui/theme';

import { Routes } from 'routes';

import { AUTH_TOKEN } from 'constants.js';

import { env, config } from 'config';

import normalize from 'normalize.css/normalize.css';


injectGlobal`${normalize} ${globalStyles}`;


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

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLinkWithAuthToken,
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});


const AppContext = React.createContext({
  isLoggedIn: false,
  login: null,
  logout: null,

  user: null,
  updateUser: null,

  persons: [],
  addPerson: null,
  updatePersons: null,
  deletePersons: null,
});

export const AppConsumer = AppContext.Consumer;


class App extends React.Component {
  state = {
    isLoggedIn: false,
    user: null,
    persons: [],
  };

  login = (user) => {
    this.setState({
      isLoggedIn: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        nickname: user.nickname,
      },
    });
  };

  logout = () => {
    this.setState({
      isLoggedIn: false,
      persons: [],
    });

    client.cache.reset();
  };

  updateUser = (user) => {
    this.setState({ user: user });
  };

  updatePersons = (persons) => {
    this.setState({ persons: persons });
  };

  addPerson = (person) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        persons: [...prevState.persons, person],
      };
    });
  };

  deletePerson = (personId) => {
    this.setState((prevState) => {
      const persons = [...prevState.persons];

      const personIndexForDeleting = persons.findIndex((person) => {
        return person.id === personId;
      });

      persons.splice(personIndexForDeleting, 1);

      return {
        ...prevState,
        persons: persons,
      };
    });
  };

  componentDidMount = () => {
    const token = localStorage.getItem(AUTH_TOKEN);

    if (token) {
      this.setState({
        isLoggedIn: true,
      });
    }
  };

  render() {
    const appProviderValue = {
      isLoggedIn: this.state.isLoggedIn,
      login: this.login,
      logout: this.logout,

      user: this.state.user,
      updateUser: this.updateUser,

      persons: this.state.persons,
      addPerson: this.addPerson,
      updatePersons: this.updatePersons,
      deletePerson: this.deletePerson,
    };

    return (
      <ApolloProvider client={ client }>
        <BrowserRouter>
          <AppContext.Provider value={ appProviderValue }>
            <Routes/>
          </AppContext.Provider>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}


ReactDOM.render(<App/>, document.getElementById('root'), );
