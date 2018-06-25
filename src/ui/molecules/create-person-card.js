import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { Icon } from 'ui/atoms';

import { PersonCard } from 'ui/molecules';

import { plus } from 'ui/outlines';

import { color } from 'ui/theme';


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


export class CreatePersonCard extends React.Component {
  state = {
    isCreating: false,
  };

  handleWrapperClick = () => {
    this.setState({
      isCreating: true,
    });
  };

  handleCancelButtonClick = () => {
    this.props.onCancelButtonClick && this.props.onCancelButtonClick();

    this.setState({
      isCreating: false,
    });
  };

  handleSaveButtonClick = (person) => {
    this.props.onSaveButtonClick(person);

    this.setState({
      isCreating: false,
    });
  };

  render() {
    const name = 'John Doe';
    const position = 'Buddy';
    const description = 'Music fan. Alcohol enthusiast. Creator. Devoted social media geek. Total analyst. Coffee lover. Beer junkie. Coffee maven. Avid alcohol lover. Twitter expert. Lifelong tv ninja. Creator. Passionate tv nerd. Problem solver. Proud alcohol evangelist. Lifelong web junkie. Coffee maven. Unapologetic social media advocate. Analyst. Tv trailblazer. Zombie geek. Twitter aficionado. Reader.';

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
              onCancelButtonClick={ this.handleCancelButtonClick }
              onSaveButtonClick={ this.handleSaveButtonClick }
            />
        }
      </React.Fragment>
    );
  }
}


CreatePersonCard.propTypes = {
  className: PropTypes.string,
  onCancelButtonClick: PropTypes.func,
  onSaveButtonClick: PropTypes.func.isRequired,
};
