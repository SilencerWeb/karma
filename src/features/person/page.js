import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import deepEqual from 'deep-equal';

import { AppConsumer } from 'index';

import { Heading, Button, Icon, RetinaImage } from 'ui/atoms';

import { ActionCardList } from 'ui/molecules';

import { CommonTemplate } from 'ui/templates';

import { pencil, user, trashCan } from 'ui/outlines';

import { font, color } from 'ui/theme';

import { DELETE_PERSON } from 'graphql/mutations/person';


const HeaderBackground = styled.div`
  position: absolute;
  top: -2rem;
  left: 50%;
  width: 100vw;
  height: 24rem;
  background: linear-gradient(90deg, #00b5ff 0%, #a24bff 100%);
  transform: translateX(-50%);
`;

const BackgroundButton = styled(Button)`
  position: absolute;
  top: 0.8rem;

  svg {
    font-size: 3.2rem;
  }
  
  ${p => css`
    
    ${p.right && css`
      right: 1.6rem;
    `}
    
    ${p.left && css`
      left: 1.6rem;
    `}
  `}
`;

const EditPersonInfoButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;

  svg {
    font-size: 3.2rem;
  }
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

  img {
    width: 100%;
  }

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

const PersonPosition = Heading.extend`
  display: block;
  color: #828282;
  margin-bottom: 0.8rem;
`.withComponent('span');

const Karma = Heading.extend`
  display: block;
  
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

const PersonInfo = styled.div`
  position: relative;
  width: 40rem;
`;

const Header = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  text-align: center;
  padding-top: 7rem;
  margin-bottom: 6rem;
`;

const Subtitle = Heading.withComponent('h2');

const EditAboutButton = styled(Button)`

  svg {
    font-size: 1.8rem;
  }
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

const ActionsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.4rem;
`;

export class PersonPage extends React.Component {
  state = {
    isActionCreating: false,
    shouldRedirectToMainPage: false,
  };

  getPerson = (context) => {
    const person = context.persons.filter((person) => {
      return person.id === this.props.match.params.id;
    })[0];

    if (person === undefined) {
      this.setState({ shouldRedirectToMainPage: true });

      return;
    }

    const shouldPersonBeUpdated = !deepEqual(this.state.person, person);

    if (shouldPersonBeUpdated) {
      this.setState({ person: person });
    }
  };

  handleAddActionButtonClick = () => {
    window.scrollTo(0, document.body.scrollHeight);

    this.setState({ isActionCreating: true });
  };

  handleDeleteButtonClick = (deletePerson) => {
    deletePerson({
      variables: {
        id: this.state.person.id,
      },
    }).then(() => {
      this.setState({ shouldRedirectToMainPage: true });
    });
  };

  handleCancelButtonClick = () => {
    this.setState({ isActionCreating: false });
  };

  handleSaveButtonClick = () => {
    this.setState({ isActionCreating: false });
  };

  render() {
    const name = this.state.person && this.state.person.name ? this.state.person.name : null;
    const position = this.state.person && this.state.person.position ? this.state.person.position : null;
    const description = this.state.person && this.state.person.description ? this.state.person.description : null;
    const avatar = this.state.person && this.state.person.avatar && this.state.person.avatar.url ? this.state.person.avatar.url : null;

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
        { this.state.shouldRedirectToMainPage && <Redirect to={ '/' }/> }

        <AppConsumer>
          { (context) => (
            <React.Fragment>
              { context.persons && this.getPerson(context) }

              <Header>
                <HeaderBackground>
                  <Mutation mutation={ DELETE_PERSON }>
                    { (deletePerson, { loading, error }) => {
                      if (error) {
                        return <div>mutation DELETE_PERSON got error: ${ error.message }</div>;
                      } else if (loading) {
                        return <div>mutation DELETE_PERSON is loading...</div>;
                      }

                      return (
                        <BackgroundButton
                          type={ 'icon' }
                          theme={ 'white' }
                          left
                          onClick={ () => this.handleDeleteButtonClick(deletePerson) }
                        >
                          <Icon icon={ trashCan }/>
                        </BackgroundButton>
                      );
                    }
                    }
                  </Mutation>

                  <BackgroundButton type={ 'icon' } theme={ 'white' } right>
                    <Icon icon={ pencil }/>
                  </BackgroundButton>
                </HeaderBackground>

                <PersonInfo>
                  <EditPersonInfoButton type={ 'icon' } theme={ 'white' }>
                    <Icon icon={ pencil }/>
                  </EditPersonInfoButton>

                  <PersonAvatar new={ !avatar }>
                    { !avatar ?
                      <Icon icon={ user }/>
                      :
                      <img src={ avatar } alt={ name }/>
                    }

                  </PersonAvatar>

                  <PersonName type={ 'title' }>
                    { name }
                  </PersonName>

                  <PersonPosition type={ 'title' } tag={ 'h3' }>
                    { position }
                  </PersonPosition>

                  <Karma type={ 'title' } tag={ 'h2' } status={ karmaStatus }>
                    { `${ karma }` }
                  </Karma>
                </PersonInfo>
              </Header>

              <About>
                <AboutHeader>
                  <Subtitle tag={ 'h2' }>
                    About
                  </Subtitle>

                  <EditAboutButton type={ 'icon' } theme={ 'gray' }>
                    <Icon icon={ pencil }/>
                  </EditAboutButton>
                </AboutHeader>

                <p> { description }</p>
              </About>

              <div>
                <ActionsHeader>
                  <Subtitle tag={ 'h2' }>
                    Action list
                  </Subtitle>

                  <Button onClick={ this.handleAddActionButtonClick }>Add an action</Button>
                </ActionsHeader>

                <ActionCardList
                  memberId={ this.state.person && this.state.person.id }
                  isActionCreating={ this.state.isActionCreating }
                  onCancelButtonClick={ this.handleCancelButtonClick }
                  onSaveButtonClick={ this.handleSaveButtonClick }
                />
              </div>
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
