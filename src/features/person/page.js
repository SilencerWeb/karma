import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { Heading, Button, Icon, RetinaImage } from 'ui/atoms';

import { ActionCardList } from 'ui/molecules';

import { CommonTemplate } from 'ui/templates';

import { pencil } from 'ui/outlines';

import avatar_1x from 'assets/images/avatars/sm/avatar.png';
import avatar_2x from 'assets/images/avatars/sm/avatar@2x.png';

import avatar2_1x from 'assets/images/avatars/sm/avatar2.png';
import avatar2_2x from 'assets/images/avatars/sm/avatar2@2x.png';

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
    actions: [
      {
        id: 0,
        title: 'Action name',
        date: '12.05.2018',
        description: 'Music fan. Alcohol enthusiast. Creator. Devoted social media geek. Total analyst. Coffee lover. Beer junkie. Coffee maven. Avid alcohol lover. Twitter expert. Lifelong tv ninja. Creator. Passionate tv nerd. Problem solver. Proud alcohol evangelist. Lifelong web junkie. Coffee maven. Unapologetic social media advocate. Analyst. Tv trailblazer. Zombie geek. Twitter aficionado. Reader.',
        karma: 'positive',
        executors: 'left',
        members: {
          left: [
            {
              avatar: {
                _1x: avatar_1x,
                _2x: avatar_2x,
              },
            },
            {
              avatar: {
                _1x: avatar_1x,
                _2x: avatar_2x,
              },
            },
          ],
          right: [
            {
              avatar: {
                _1x: avatar2_1x,
                _2x: avatar2_2x,
              },
            },
          ],
        },
      },
    ],
    isActionCreating: false,
  };

  handleAddActionButtonClick = () => {
    this.setState({ isActionCreating: true });
  };

  handleCancelButtonClick = () => {

    this.setState({ isActionCreating: false });
  };

  handleSaveButtonClick = (action) => {

    this.setState((prevState) => {
      const state = { ...prevState };

      state.actions.push(action);

      state.isActionCreating = false;

      return state;
    });
  };

  render() {

    return (
      <CommonTemplate>
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
            Alex Walker
          </PersonName>

          <Karma type={ 'title' }>
            +10
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

          <p>Music fan. Alcohol enthusiast. Creator. Devoted social media geek. Total analyst. Coffee lover. Beer junkie. Coffee maven. Avid alcohol lover. Twitter expert. Lifelong tv ninja. Creator. Passionate tv nerd. Problem solver. Proud alcohol evangelist. Lifelong web junkie. Coffee maven. Unapologetic social media advocate. Analyst. Tv trailblazer. Zombie geek. Twitter aficionado. Reader.</p>
        </About>

        <Actions>
          <ActionsHeader>
            <Subtitle tag={ 'h2' }>
              Action list
            </Subtitle>

            <Button onClick={ this.handleAddActionButtonClick }>Add an action</Button>
          </ActionsHeader>

          <ActionCardList
            actions={ this.state.actions }
            isActionCreating={ this.state.isActionCreating }
            onCancelButtonClick={ this.handleCancelButtonClick }
            onSaveButtonClick={ this.handleSaveButtonClick }
          />
        </Actions>
      </CommonTemplate>
    );
  }
};


PersonPage.propTypes = {};
