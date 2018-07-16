import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import { AppConsumer } from 'index';

import { Button } from 'ui/atoms';

import { ActionConfirmation } from 'ui/molecules';

import { trashCan } from 'ui/outlines';

import { DELETE_PERSON } from 'graphql/mutations/person';


class DeletePersonConfirmationComponent extends React.Component {
  state = {
    isLoading: false,
  };

  handleConfirmButtonClick = () => {
    this.setState({ isLoading: true });

    this.props.onConfirmButtonClick && this.props.onConfirmButtonClick();

    this.props.deletePerson({
      variables: {
        id: this.props.id,
      },
    }).then(() => {
      this.props.onSuccess && this.props.onSuccess();
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.log('error!', error);

      this.props.onError && this.props.onError();
    });
  };

  render() {
    const person = this.props.context.persons.find((person) => {
      return person.id === this.props.id;
    });

    if (!person) return null;

    const confirmButton = (
      <Button
        theme={ 'error' }
        icon={ trashCan }
        loading={ this.state.isLoading }
        onClick={ this.handleConfirmButtonClick }
      >
        Yes, delete the person
      </Button>
    );

    return (
      <div className={ this.props.className }>
        <ActionConfirmation
          title={ `Are you sure that you want to delete person '${person.name}'?` }
          note={ 'You will not be able to restore data, even I will not be able to help you :(' }
          rejectButtonText={ 'No, cancel deleting' }
          confirmButton={ confirmButton }
          onRejectButtonClick={ this.props.onRejectButtonClick }
        />
      </div>
    );
  }
};


DeletePersonConfirmationComponent.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  onRejectButtonClick: PropTypes.func.isRequired,
  onConfirmButtonClick: PropTypes.func,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  context: PropTypes.object,
  deletePerson: PropTypes.func,
};


const DeletePersonConfirmationWithContext = React.forwardRef((props, ref) => (
  <AppConsumer>
    { (context) => <DeletePersonConfirmationComponent { ...props } context={ context } ref={ ref }/> }
  </AppConsumer>
));


export const DeletePersonConfirmation = graphql(DELETE_PERSON, { name: 'deletePerson' })(DeletePersonConfirmationWithContext);
