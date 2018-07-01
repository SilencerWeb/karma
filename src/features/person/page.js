import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { ApolloConsumer, Query } from 'react-apollo';

import { AppConsumer } from 'index';

import { Heading, Button, Icon, RetinaImage } from 'ui/atoms';

import { ActionCardList } from 'ui/molecules';

import { CommonTemplate } from 'ui/templates';

import { pencil, user } from 'ui/outlines';

import { color } from 'ui/theme';

import { GET_ACTIONS } from 'graphql/queries/action';


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

  ${p => css`
    
    ${p.new && css`
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${color.primary};
  
      svg {
        font-size: 10rem;
        color: #ffffff;
      }
    `}
  `}
`;


const PersonName = Heading.extend`
  margin-bottom: 0.8rem;
`;

const Karma = Heading.extend`
  
  ${p => css`
  
    ${p.status === 'positive' && css`
      color: #27ae60;
    `}
  
    ${p.status === 'neutral' && css`
      color: #bdbdbd;
    `}
    
    ${p.status === 'negative' && css`
      color: ${color.error};
    `}
  `}
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

  getPerson = (context) => {
    const person = context.persons.filter((person) => {
      return person.id === this.props.match.params.id;
    })[0];

    this.setState({
      person: person,
    });
  };

  handleAddActionButtonClick = () => {
    window.scrollTo(0, document.body.scrollHeight);

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
    let karmaStatus;
    let karma;

    if (this.state.person) {
      karma = this.state.person.karma;

      if (karma === 0) {
        karmaStatus = 'neutral';
      } else {
        karmaStatus = karma > 0 ? 'positive' : 'negative';

        if (karmaStatus === 'positive') {
          karma = `+${karma}`;
        }
      }
    }

    return (
      <CommonTemplate>
        <AppConsumer>
          { (context) => (
            <React.Fragment>
              { !this.state.person && context.persons && this.getPerson(context) }

              <Header>
                <HeaderBackground>
                  <EditBackgroundButton>
                    <Icon icon={ pencil }/>
                  </EditBackgroundButton>
                </HeaderBackground>

                <PersonAvatar new>
                  <Icon icon={ user }/>
                </PersonAvatar>

                <PersonName type={ 'title' }>
                  { this.state.person && this.state.person.name }
                </PersonName>

                <Karma type={ 'title' } status={ karmaStatus }>
                  { `${ karma }` }
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
                      const filteredActions = data.actions.filter((action) => {
                        return action.members.some((member) => {
                          return !member.isUser ? member.person.id === this.props.match.params.id : false;
                        });
                      });

                      return (
                        <ActionCardList
                          actions={ filteredActions }
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
        </AppConsumer>
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
