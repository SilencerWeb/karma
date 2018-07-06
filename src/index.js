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

import {
  GetUserQuery,
  GetPersonsQuery,
  GetActionsQuery,

  CreatePersonSubscription,
  UpdatePersonSubscription,
  DeletePersonSubscription,

  CreateActionSubscription,
  UpdateActionSubscription,
  DeleteActionSubscription,
} from 'ui/molecules';

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


const AppContext = React.createContext();

export const AppConsumer = AppContext.Consumer;


class App extends React.Component {
  state = {
    isLoggedIn: false,

    user: null,
    didGetUserQueryMount: false,

    persons: [],
    deletedPersonsIds: [],
    didGetPersonsQueryMount: false,

    actions: [],
    deletedActionsIds: [],
    didGetActionsQueryMount: false,
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


  updateUser = (user, didGetUserQueryMount) => {
    if (didGetUserQueryMount !== undefined) {
      this.setState({
        user: user,
        didGetUserQueryMount: true,
      });
    } else {
      this.setState({ user: user });
    }
  };


  addPersonOrAction = (newElement, elementType) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        [elementType]: [...prevState[elementType], newElement],
      };
    });
  };

  updatePersonOrAction = (updatedElement, elementType) => {
    this.setState((prevState) => {
      const elements = [...prevState[elementType]];

      const elementForUpdateIndex = elements.findIndex((element) => {
        return updatedElement.id === element.id;
      });

      elements.splice(elementForUpdateIndex, 1, updatedElement);

      return {
        ...prevState,
        [elementType]: elements,
      };
    });
  };

  updatePersonsOrActions = (elements, elementType, didGetElementsQueryMount) => {
    if (didGetElementsQueryMount !== undefined) {

      const didGetElementsQueryMount = elementType === 'persons' ?
        'didGetPersonsQueryMount' : 'didGetActionsQueryMount';

      this.setState({
        [elementType]: elements,
        [didGetElementsQueryMount]: true,
      });
    } else {
      this.setState({ [elementType]: elements });
    }
  };

  deletePersonOrAction = (elementId, elementType) => {
    this.setState((prevState) => {
      const elements = [...prevState[elementType]];

      const elementForDeletingIndex = elements.findIndex((element) => {
        return element.id === elementId;
      });

      elements.splice(elementForDeletingIndex, 1);

      const deletedElementsIds = elementType === 'persons' ? 'deletedPersonsIds' : 'deletedActionsIds';

      return {
        ...prevState,
        [elementType]: elements,
        [deletedElementsIds]: [...prevState[deletedElementsIds], elementId],
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
      deletedPersonsIds: this.state.deletedPersonsIds,

      actions: this.state.actions,
      deletedActionsIds: this.state.deletedActionsIds,

      addPersonOrAction: this.addPersonOrAction,
      updatePersonOrAction: this.updatePersonOrAction,
      updatePersonsOrActions: this.updatePersonsOrActions,
      deletePersonOrAction: this.deletePersonOrAction,
    };

    return (
      <ApolloProvider client={ client }>
        <BrowserRouter>
          <AppContext.Provider value={ appProviderValue }>
            <Routes/>

            {
              this.state.isLoggedIn &&
              <React.Fragment>
                { !this.state.didGetUserQueryMount && <GetUserQuery/> }
                { !this.state.didGetPersonsQueryMount && <GetPersonsQuery/> }
                { !this.state.didGetActionsQueryMount && <GetActionsQuery/> }

                <CreatePersonSubscription/>
                <UpdatePersonSubscription/>
                <DeletePersonSubscription/>

                <CreateActionSubscription/>
                <UpdateActionSubscription/>
                <DeleteActionSubscription/>
              </React.Fragment>
            }
          </AppContext.Provider>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}


ReactDOM.render(<App/>, document.getElementById('root'));
