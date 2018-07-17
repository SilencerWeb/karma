import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { toast } from 'react-toastify';

import { AppConsumer } from 'index';

import { Button } from 'ui/atoms';

import { ActionConfirmation, Notification } from 'ui/molecules';

import { UPDATE_ACTION } from 'graphql/mutations/action';


class UpdateActionConfirmationComponent extends React.Component {
  state = {
    isLoading: false,
  };

  handleConfirmButtonClick = () => {
    this.setState({ isLoading: true });

    this.props.onConfirmButtonClick && this.props.onConfirmButtonClick();

    this.props.updateAction({
      variables: this.props.action,
    }).then((response) => {
      const title = response.data.updateAction.title;

      const message = title ?
        <React.Fragment>
          Action <span>{ title }</span> was successfully updated
        </React.Fragment>
        :
        'Action was successfully updated';

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
    if (!this.props.action) return null;

    const action = this.props.context.actions.find((action) => {
      return action.id === this.props.action.id;
    });

    const confirmButton = (
      <Button
        loading={ this.state.isLoading }
        onClick={ this.handleConfirmButtonClick }
      >
        Yes, update the action
      </Button>
    );

    return (
      <div className={ this.props.className }>
        <ActionConfirmation
          title={ `Are you sure that you want to update action '${action.title}'?` }
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


UpdateActionConfirmationComponent.propTypes = {
  className: PropTypes.string,
  action: PropTypes.object.isRequired,
  onRejectButtonClick: PropTypes.func.isRequired,
  onConfirmButtonClick: PropTypes.func,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  context: PropTypes.object,
  updateAction: PropTypes.func,
};


const UpdateActionConfirmationWithContext = React.forwardRef((props, ref) => (
  <AppConsumer>
    { (context) => <UpdateActionConfirmationComponent { ...props } context={ context } ref={ ref }/> }
  </AppConsumer>
));


export const UpdateActionConfirmation = graphql(UPDATE_ACTION, { name: 'updateAction' })(UpdateActionConfirmationWithContext);
