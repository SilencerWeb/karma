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
  uri: 'https://karma-api.herokuapp.com/',
});


const AppContext = React.createContext({
  isLoggedIn: false,
  toggleLoggedIn: () => {
  },
});

export const AppConsumer = AppContext.Consumer;


class App extends React.Component {
  state = {
    isLoggedIn: false,
  };

  toggleLoggedIn = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        isLoggedIn: !prevState.isLoggedIn,
      };
    });
  };

  render() {
    const appProviderValue = {
      isLoggedIn: this.state.isLoggedIn,
      toggleLoggedIn: this.toggleLoggedIn,
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
