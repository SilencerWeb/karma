import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled, { css, injectGlobal } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ToastContainer, toast, cssTransition } from 'react-toastify';

import { client } from 'client';

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

  Notification,
} from 'ui/molecules';

import { globalStyles } from 'ui/theme';

import { Routes } from 'routes';

import { AUTH_TOKEN } from './constants';

import normalize from 'normalize.css/normalize.css';
import reactToastify from 'react-toastify/dist/ReactToastify.min.css';
// eslint-disable-next-line import/no-unassigned-import
import 'animate.css/animate.min.css';


injectGlobal`${normalize} ${reactToastify} ${globalStyles}`;


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
    }, () => {
      toast(
        <Notification
          theme={ 'success' }
          message={ `Welcome, ${user.name ? user.name : user.nickname}` }
        />,
      );
    });
  };

  logout = () => {
    const user = { ...this.state.user };

    this.setState({
      isLoggedIn: false,

      user: null,
      didGetUserQueryMount: false,

      persons: [],
      deletedPersonsIds: [],
      didGetPersonsQueryMount: false,

      actions: [],
      deletedActionsIds: [],
      didGetActionsQueryMount: false,
    }, () => {
      client.cache.reset();

      toast(
        <Notification
          theme={ 'success' }
          message={ `See ya, ${user.name ? user.name : user.nickname}` }
        />,
      );
    });
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

            <ToastContainer
              autoClose={ 3000 }
              closeButton={ false }
              transition={
                cssTransition({
                  enter: 'fadeInRight',
                  exit: 'fadeOutRight',
                })
              }
              hideProgressBar={ true }
              newestOnTop={ true }
              draggablePercent={ 40 }
            />
          </AppContext.Provider>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}


ReactDOM.render(<App/>, document.getElementById('root'));
