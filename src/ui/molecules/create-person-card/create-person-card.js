import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { ApolloConsumer, Mutation } from 'react-apollo';

import { Icon } from 'ui/atoms';

import { PersonCard } from 'ui/molecules';

import { plus } from 'ui/outlines';

import { color } from 'ui/theme';

import { GET_PERSONS } from 'graphql/queries/person';
import { CREATE_PERSON } from 'graphql/mutations/person';


const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 58.5rem;
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
    this.setState({
      isCreating: false,
    });
  };

  render() {
    const placeholderName = 'John Doe';
    const placeholderPosition = 'Buddy';
    const placeholderDescription = 'Music fan. Alcohol enthusiast. Creator. Devoted social media geek. Total analyst. Coffee lover. Beer junkie. Coffee maven. Avid alcohol lover. Twitter expert. Lifelong tv ninja. Creator. Passionate tv nerd. Problem solver. Proud alcohol evangelist. Lifelong web junkie. Coffee maven. Unapologetic social media advocate. Analyst. Tv trailblazer. Zombie geek. Twitter aficionado. Reader.';

    return (
      <React.Fragment>
        {
          !this.state.isCreating ?
            <Wrapper className={ this.props.className } onClick={ this.handleWrapperClick }>
              <Icon icon={ plus }/>
            </Wrapper>
            :
            <ApolloConsumer>
              { () => (
                <Mutation mutation={ CREATE_PERSON }>
                  { (createPerson) => (
                    <PersonCard
                      name={ placeholderName }
                      position={ placeholderPosition }
                      karma={ 0 }
                      description={ placeholderDescription }
                      create
                      onCancelButtonClick={ this.handleCancelButtonClick }
                      onSaveButtonClick={ (person) => {
                        createPerson({
                          variables: {
                            name: person.name,
                            position: person.position,
                            description: person.description,
                          },
                          refetchQueries: [{ query: GET_PERSONS }],
                        });

                        this.setState({
                          isCreating: false,
                        });
                      } }
                    />
                  ) }
                </Mutation>
              ) }
            </ApolloConsumer>
        }
      </React.Fragment>
    );
  }
}


CreatePersonCard.propTypes = {
  className: PropTypes.string,
};
