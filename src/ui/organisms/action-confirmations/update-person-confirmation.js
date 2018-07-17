import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { toast } from 'react-toastify';

import { AppConsumer } from 'index';

import { Button } from 'ui/atoms';

import { ActionConfirmation, Notification } from 'ui/molecules';

import { UPDATE_PERSON } from 'graphql/mutations/person';


class UpdatePersonConfirmationComponent extends React.Component {
  state = {
    isLoading: false,
  };

  handleConfirmButtonClick = () => {
    this.setState({ isLoading: true });

    this.props.onConfirmButtonClick && this.props.onConfirmButtonClick();

    this.props.updatePerson({
      variables: this.props.person,
    }).then((response) => {
      const name = response.data.updatePerson.name;

      const message = name ?
        <React.Fragment>
          Person <span>{ name }</span> was successfully updated
        </React.Fragment>
        :
        'Person was successfully updated';

      toast(
        <Notification
          theme={ 'success' }
          message={ message }
        />,
      );

      this.props.onSuccess && this.props.onSuccess();
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

          this.setState({ isLoading: false });
        }

        this.props.onError && this.props.onError();
      }
    });
  };

  render() {
    if (!this.props.person) return null;

    const person = this.props.context.persons.find((person) => {
      return person.id === this.props.person.id;
    });

    const confirmButton = (
      <Button
        loading={ this.state.isLoading }
        onClick={ this.handleConfirmButtonClick }
      >
        Yes, update the person
      </Button>
    );

    return (
      <div className={ this.props.className }>
        <ActionConfirmation
          title={ `Are you sure that you want to update person '${person.name}'?` }
          note={ 'You will not be able to restore data, even I will not be able to help you :(' }
          rejectButtonText={ 'No, cancel updating' }
          confirmButton={ confirmButton }
          onRejectButtonClick={ this.props.onRejectButtonClick }
          onConfirmButtonClick={ this.handleConfirmButtonClick }
        />
      </div>
    );
  }
};


UpdatePersonConfirmationComponent.propTypes = {
  className: PropTypes.string,
  person: PropTypes.object.isRequired,
  onRejectButtonClick: PropTypes.func.isRequired,
  onConfirmButtonClick: PropTypes.func,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  context: PropTypes.object,
  updatePerson: PropTypes.func,
};


const UpdatePersonConfirmationWithContext = React.forwardRef((props, ref) => (
  <AppConsumer>
    { (context) => <UpdatePersonConfirmationComponent { ...props } context={ context } ref={ ref }/> }
  </AppConsumer>
));


export const UpdatePersonConfirmation = graphql(UPDATE_PERSON, { name: 'updatePerson' })(UpdatePersonConfirmationWithContext);
