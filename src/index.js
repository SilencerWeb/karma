import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled, { css, injectGlobal } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import { client } from 'client';

import { Overlay } from 'ui/atoms';

import {
  Modal,
  ContactForm,
  DeletePersonConfirmation,
  DeleteActionConfirmation,
  LogoutConfirmation,
  DiscardPersonChangesConfirmation,
  DiscardCreatingPersonConfirmation,

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

import { globalStyles, transition } from 'ui/theme';

import { Routes } from 'routes';

import { AUTH_TOKEN } from './constants';

import normalize from 'normalize.css/normalize.css';


injectGlobal`${normalize} ${globalStyles}`;


const AppContext = React.createContext();

export const AppConsumer = AppContext.Consumer;


const StyledModal = styled(Modal)`
  margin-top: auto;
  margin-bottom: auto;
`;

const ModalsWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-top: 4rem;
  padding-bottom: 4rem;
  opacity: 0;
  visibility: hidden;
  transition: ${transition};
  overflow-x: hidden;
  overflow-y: auto;
  
  ${p => css`
    
    ${p.visible && css`
      opacity: 1;
      visibility: visible;
    `}
  `}
`;


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

    visibleModal: '',
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


  changePersonForDeleteId = (id) => {
    this.setState({ personForDeleteId: id });
  };

  changeEditingPersonId = (id) => {
    this.setState({ editingPersonId: id });
  };

  changeDiscardConfirmationFunction = (discardConfirmationFunction) => {
    this.setState({ discardConfirmationFunction: discardConfirmationFunction });
  };


  changeActionForDeleteId = (id) => {
    this.setState({ actionForDeleteId: id });
  };

  changeEditingActionId = (id) => {
    this.setState({ editingActionId: id });
  };


  showModal = (modalName) => {
    document.querySelector('body').style.overflow = 'hidden';

    this.setState({
      visibleModal: modalName,
    });
  };

  hideModal = () => {
    this.setState({
      visibleModal: '',
    });

    document.querySelector('body').style.overflow = '';
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

      changePersonForDeleteId: this.changePersonForDeleteId,
      changeEditingPersonId: this.changeEditingPersonId,
      discardConfirmationFunction: this.state.discardConfirmationFunction,
      changeDiscardConfirmationFunction: this.changeDiscardConfirmationFunction,

      changeActionForDeleteId: this.changeActionForDeleteId,
      changeEditingActionId: this.changeEditingActionId,

      showModal: this.showModal,
      hideModal: this.hideModal,
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

            <Overlay visible={ !!this.state.visibleModal }/>

            <ModalsWrapper visible={ !!this.state.visibleModal }>
              {
                this.state.visibleModal === 'ContactForm' &&
                <StyledModal>
                  <ContactForm/>
                </StyledModal>
              }

              {
                this.state.visibleModal === 'DeletePersonConfirmation' &&
                this.state.deletedPersonsIds.every((deletedPersonId) => deletedPersonId !== this.state.personForDeleteId) &&
                <StyledModal>
                  <DeletePersonConfirmation id={ this.state.personForDeleteId }/>
                </StyledModal>
              }

              {
                this.state.visibleModal === 'DeleteActionConfirmation' &&
                this.state.deletedActionsIds.every((deletedActionId) => deletedActionId !== this.state.actionForDeleteId) &&
                <StyledModal>
                  <DeleteActionConfirmation id={ this.state.actionForDeleteId }/>
                </StyledModal>
              }

              {
                this.state.visibleModal === 'LogoutConfirmation' &&
                <StyledModal>
                  <LogoutConfirmation/>
                </StyledModal>
              }

              {
                this.state.visibleModal === 'DiscardPersonChangesConfirmation' &&
                <StyledModal>
                  <DiscardPersonChangesConfirmation id={ this.state.editingPersonId }/>
                </StyledModal>
              }

              {
                this.state.visibleModal === 'DiscardCreatingPersonConfirmation' &&
                <StyledModal>
                  <DiscardCreatingPersonConfirmation/>
                </StyledModal>
              }
            </ModalsWrapper>
          </AppContext.Provider>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}


ReactDOM.render(<App/>, document.getElementById('root'));
