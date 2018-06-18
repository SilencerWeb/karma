// @flow
import * as React from 'react';
import styled, { css } from 'styled-components';

import { Icon } from 'ui/atoms';

import { PersonCard } from 'ui/molecules';

import { plus } from 'ui/outlines';

import { color } from 'ui/theme';


type props = {
  className?: string
};

type state = {};


const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 0.4rem;
  box-shadow: 0 0.8rem 1.6rem rgba(176, 190, 197, 0.24), 0 -0.8rem 1.6rem rgba(176, 190, 197, 0.24);
  padding-top: 3.2rem;
  padding-right: 2.4rem;
  padding-bottom: 3.2rem;
  padding-left: 2.4rem;
  cursor: pointer;
  
  svg {
    font-size: 10rem;
    color: ${color.primary};
  }
`;


export class CreatePersonCard extends React.Component<props, state> {
  state = {
    isCreating: false,
  };

  handleWrapperClick = () => {
    this.setState({
      isCreating: true,
    });
  };

  handleCancelClick = () => {
    this.setState({
      isCreating: false,
    });
  };

  handleSaveClick = () => {
    console.log('saved!');
  };

  render() {
    const name = 'John Doe';
    const position = 'Buddy';
    const description = `Music fan. Alcohol enthusiast. Creator. Devoted social media geek. Total analyst. Coffee lover. Beer junkie. Coffee maven. Avid alcohol lover. Twitter expert. Lifelong tv ninja. Creator. Passionate tv nerd. Problem solver. Proud alcohol evangelist. Lifelong web junkie. Coffee maven. Unapologetic social media advocate. Analyst. Tv trailblazer. Zombie geek. Twitter aficionado. Reader.`;

    return (
      <React.Fragment>
        {
          !this.state.isCreating ?
            <Wrapper className={ this.props.className } onClick={ this.handleWrapperClick }>
              <Icon icon={ plus }/>
            </Wrapper>
            :
            <PersonCard
              name={ name }
              position={ position }
              karma={ 0 }
              description={ description }
              create
              onCancel={ this.handleCancelClick }
              onSave={ this.handleSaveClick }
            />
        }
      </React.Fragment>
    );
  }
}
