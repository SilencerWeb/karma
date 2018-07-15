import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import { AppConsumer } from 'index';

import { Button } from 'ui/atoms';

import { ActionConfirmation } from 'ui/molecules';

import { trashCan } from 'ui/outlines';

import { DELETE_ACTION } from 'graphql/mutations/action';


class DeleteActionConfirmationComponent extends React.Component {
  state = {
    isLoading: false,
  };

  handleConfirmButtonClick = () => {
    this.setState({ isLoading: true });

    this.props.onConfirmButtonClick && this.props.onConfirmButtonClick();

    this.props.deleteAction({
      variables: {
        id: this.props.id,
      },
    }).then(() => {
      this.props.onSuccess && this.props.onSuccess();
    }).catch(() => {
      this.props.onError && this.props.onError();
    });
  };

  render() {
    if (!this.props.id) return;

    const action = this.props.context.actions.find((action) => {
      return action.id === this.props.id;
    });

    const confirmButton = (
      <Button
        theme={ 'error' }
        icon={ trashCan }
        loading={ this.state.isLoading }
        onClick={ this.handleConfirmButtonClick }
      >
        Yes, delete this action
      </Button>
    );

    return (
      <div className={ this.props.className }>
        <ActionConfirmation
          title={ `Are you sure that you want to delete action '${action.name}'?` }
          note={ 'You will not be able to restore data, even I will not be able to help you :(' }
          rejectButtonText={ 'No, cancel deleting' }
          confirmButton={ confirmButton }
          onRejectButtonClick={ this.props.onRejectButtonClick }
        />
      </div>
    );
  }
};


DeleteActionConfirmationComponent.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  onRejectButtonClick: PropTypes.func.isRequired,
  onConfirmButtonClick: PropTypes.func,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  context: PropTypes.object,
  deleteAction: PropTypes.func,
};


const DeleteActionConfirmationWithContext = React.forwardRef((props, ref) => (
  <AppConsumer>
    { (context) => <DeleteActionConfirmationComponent { ...props } context={ context } ref={ ref }/> }
  </AppConsumer>
));


export const DeleteActionConfirmation = graphql(DELETE_ACTION, { name: 'deleteAction' })(DeleteActionConfirmationWithContext);
