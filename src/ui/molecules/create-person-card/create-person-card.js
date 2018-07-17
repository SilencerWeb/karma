import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { ApolloConsumer, Mutation } from 'react-apollo';
import { toast } from 'react-toastify';

import { Icon } from 'ui/atoms';

import { PersonCard, Notification } from 'ui/molecules';

import { plus } from 'ui/outlines';

import { color, transition } from 'ui/theme';

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
  transition: ${transition};
  
  &:hover {
    box-shadow: 0 0.8rem 1.6rem rgba(176, 190, 197, 0.44), 0 -0.8rem 1.6rem rgba(176, 190, 197, 0.44);
  }
  
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
                      karma={ 0 }
                      create
                      onCancelButtonClick={ this.handleCancelButtonClick }
                      onSaveButtonClick={ (person) => {
                        return createPerson({
                          variables: person,
                        }).then((response) => {
                          const name = response.data.createPerson.name;

                          const message = name ?
                            <React.Fragment>
                              Person <span>{ name }</span> was successfully created
                            </React.Fragment>
                            :
                            'Person was successfully created';

                          toast(
                            <Notification
                              theme={ 'success' }
                              message={ message }
                            />,
                          );

                          this.setState({
                            isCreating: false,
                          });
                        }).catch((error) => {
                          if (error) {
                            const errorMessage = error.graphQLErrors[0].message;

                            if (errorMessage) {
                              toast(
                                <Notification
                                  theme={ 'error' }
                                  message={ 'Something went wrong. Please, try again later.' }
                                  errorMessage={ errorMessage }
                                />,
                              );

                              throw new Error(errorMessage);
                            }
                          }
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
