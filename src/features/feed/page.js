import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { PersonCardList } from 'ui/molecules';

import { CommonTemplate } from 'ui/templates';

import avatar_1x from 'assets/images/avatars/large/avatar.png';
import avatar_2x from 'assets/images/avatars/large/avatar@2x.png';


export class FeedPage extends React.Component {
  state = {
    persons: [
      {
        id: 0,
        avatar: {
          _1x: avatar_1x,
          _2x: avatar_2x,
        },
        name: 'Alex Walker',
        position: 'Best friend',
        karma: 10,
        description: 'Music fan. Alcohol enthusiast. Creator. Devoted social media geek. Total analyst. Coffee lover. Beer junkie. Coffee maven. Avid alcohol lover. Twitter expert. Lifelong tv ninja. Creator. Passionate tv nerd. Problem solver. Proud alcohol evangelist. Lifelong web junkie. Coffee maven. Unapologetic social media advocate. Analyst. Tv trailblazer. Zombie geek. Twitter aficionado. Reader.',
      },
      {
        id: 1,
        avatar: {
          _1x: avatar_1x,
          _2x: avatar_2x,
        },
        name: 'Alex Walker 2',
        position: 'Best friend',
        karma: 0,
        description: 'Music fan. Alcohol enthusiast. Creator. Devoted social media geek. Total analyst. Coffee lover. Beer junkie. Coffee maven. Avid alcohol lover. Twitter expert. Lifelong tv ninja. Creator. Passionate tv nerd. Problem solver. Proud alcohol evangelist. Lifelong web junkie. Coffee maven. Unapologetic social media advocate. Analyst. Tv trailblazer. Zombie geek. Twitter aficionado. Reader.',
      },
      {
        id: 2,
        avatar: {
          _1x: avatar_1x,
          _2x: avatar_2x,
        },
        name: 'Alex Walker 3',
        position: 'Best friend',
        karma: -10,
        description: 'Music fan. Alcohol enthusiast. Creator. Devoted social media geek. Total analyst. Coffee lover. Beer junkie. Coffee maven. Avid alcohol lover. Twitter expert. Lifelong tv ninja. Creator. Passionate tv nerd. Problem solver. Proud alcohol evangelist. Lifelong web junkie. Coffee maven. Unapologetic social media advocate. Analyst. Tv trailblazer. Zombie geek. Twitter aficionado. Reader.',
      },
      {
        id: 3,
        avatar: {
          _1x: avatar_1x,
          _2x: avatar_2x,
        },
        name: 'Alex Walker 4',
        position: 'Best friend',
        karma: 10,
        description: 'Music fan. Alcohol enthusiast. Creator. Devoted social media geek. Total analyst. Coffee lover. Beer junkie. Coffee maven. Avid alcohol lover. Twitter expert. Lifelong tv ninja. Creator. Passionate tv nerd. Problem solver. Proud alcohol evangelist. Lifelong web junkie. Coffee maven. Unapologetic social media advocate. Analyst. Tv trailblazer. Zombie geek. Twitter aficionado. Reader.',
      },
      {
        id: 4,
        avatar: {
          _1x: avatar_1x,
          _2x: avatar_2x,
        },
        name: 'Alex Walker 5',
        position: 'Best friend',
        karma: 0,
        description: 'Music fan. Alcohol enthusiast. Creator. Devoted social media geek. Total analyst. Coffee lover. Beer junkie. Coffee maven. Avid alcohol lover. Twitter expert. Lifelong tv ninja. Creator. Passionate tv nerd. Problem solver. Proud alcohol evangelist. Lifelong web junkie. Coffee maven. Unapologetic social media advocate. Analyst. Tv trailblazer. Zombie geek. Twitter aficionado. Reader.',
      },
      {
        id: 5,
        avatar: {
          _1x: avatar_1x,
          _2x: avatar_2x,
        },
        name: 'Alex Walker 6',
        position: 'Best friend',
        karma: -10,
        description: 'Music fan. Alcohol enthusiast. Creator. Devoted social media geek. Total analyst. Coffee lover. Beer junkie. Coffee maven. Avid alcohol lover. Twitter expert. Lifelong tv ninja. Creator. Passionate tv nerd. Problem solver. Proud alcohol evangelist. Lifelong web junkie. Coffee maven. Unapologetic social media advocate. Analyst. Tv trailblazer. Zombie geek. Twitter aficionado. Reader.',
      },
    ],
  };

  handleSaveClick = (person) => {
    const state = this.state;

    state.persons.push(person);

    this.setState(state);
  };

  render() {

    return (
      <CommonTemplate>
        <PersonCardList persons={ this.state.persons } onSave={ this.handleSaveClick }/>
      </CommonTemplate>
    );
  }
};


FeedPage.propTypes = {};
