import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { ApolloConsumer, Query } from 'react-apollo';

import { Heading, Button, Icon, RetinaImage } from 'ui/atoms';

import { ActionCardList } from 'ui/molecules';

import { CommonTemplate } from 'ui/templates';

import { pencil } from 'ui/outlines';

import { GET_PERSON } from 'graphql/queries/person';
import { GET_ACTIONS } from 'graphql/queries/action';

import avatar3_1x from 'assets/images/avatars/lg/avatar.png';
import avatar3_2x from 'assets/images/avatars/lg/avatar@2x.png';


const EditButton = styled.button`
  background-color: transparent;
  border: none;
  padding-top: 0;
  padding-right: 0;
  padding-bottom: 0;
  padding-left: 0;
  outline: none;
  cursor: pointer;

  svg {
    font-size: 2.4rem;
  }
`;

const HeaderBackground = styled.div`
  position: absolute;
  top: -2rem;
  left: 50%;
  width: 100vw;
  height: 24rem;
  background: linear-gradient(90deg, #00b5ff 0%, #a24bff 100%);
  transform: translateX(-50%);
`;

const EditBackgroundButton = EditButton.extend`
  position: absolute;
  top: 2rem;
  right: 2rem;
  color: #ffffff;
`;

const PersonAvatar = styled.div`
  position: relative;
  z-index: 1;
  width: 30rem;
  height: 30rem;
  border-radius: 50%;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 2.4rem;
`;

const PersonName = Heading.extend`
  margin-bottom: 0.8rem;
`;

const Karma = Heading.extend`
  color: #27ae60;
`.withComponent('span');

const Header = styled.div`
  position: relative;
  text-align: center;
  padding-top: 7rem;
  margin-bottom: 6rem;
`;

const AboutHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
`;

const About = styled.div`
  margin-bottom: 4rem;
  
  p {
    margin-top: 0;
    margin-bottom: 0; 
  }
`;

const Subtitle = Heading.withComponent('h2');

const ActionsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.4rem;
`;

const Actions = styled.div`

`;

export class PersonPage extends React.Component {
  state = {
    isActionCreating: false,
  };

  handleAddActionButtonClick = () => {
    this.setState({
      isActionCreating: true,
    });
  };

  handleCancelButtonClick = () => {
    this.setState({
      isActionCreating: false,
    });
  };

  handleSaveButtonClick = () => {
    this.setState({
      isActionCreating: false,
    });
  };

  render() {
    return (
      <CommonTemplate>
        <ApolloConsumer>
          { () => (
            <React.Fragment>
              {
                !this.state.person &&
                <Query query={ GET_PERSON } variables={ { id: this.props.match.params.id } }>
                  { ({ error, loading, data }) => {
                    if (error) {
                      return <div>query GET_PERSONS got error: ${ error.message }</div>;
                    } else if (loading) {
                      return <div>query GET_PERSONS is loading...</div>;
                    }

                    if (data.person) {
                      this.setState({ person: data.person });
                    }

                    return null;
                  }
                  }
                </Query>
              }

              <Header>
                <HeaderBackground>
                  <EditBackgroundButton>
                    <Icon icon={ pencil }/>
                  </EditBackgroundButton>
                </HeaderBackground>

                <PersonAvatar>
                  <RetinaImage src={ { _1x: avatar3_1x, _2x: avatar3_2x } } alt={ '' }/>
                </PersonAvatar>

                <PersonName type={ 'title' }>
                  { this.state.person && this.state.person.name }
                </PersonName>

                <Karma type={ 'title' }>
                  { this.state.person && `${this.state.person.karma}` }
                </Karma>
              </Header>

              <About>
                <AboutHeader>
                  <Subtitle tag={ 'h2' }>
                    About
                  </Subtitle>

                  <EditButton>
                    <Icon icon={ pencil }/>
                  </EditButton>
                </AboutHeader>

                <p> { this.state.person && this.state.person.description }</p>
              </About>

              <Actions>
                <ActionsHeader>
                  <Subtitle tag={ 'h2' }>
                    Action list
                  </Subtitle>

                  <Button onClick={ this.handleAddActionButtonClick }>Add an action</Button>
                </ActionsHeader>


                <Query query={ GET_ACTIONS }>
                  { ({ error, loading, data }) => {
                    if (error) {
                      return <div>query GET_ACTIONS got error: ${ error.message }</div>;
                    } else if (loading) {
                      return <div>query GET_ACTIONS is loading...</div>;
                    }

                    if (data.actions) {
                      return (
                        <ActionCardList
                          actions={ data.actions }
                          isActionCreating={ this.state.isActionCreating }
                          onCancelButtonClick={ this.handleCancelButtonClick }
                          onSaveButtonClick={ this.handleSaveButtonClick }
                        />
                      );
                    }

                    return null;
                  } }
                </Query>
              </Actions>
            </React.Fragment>
          ) }
        </ApolloConsumer>

      </CommonTemplate>
    );
  }
};


PersonPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
