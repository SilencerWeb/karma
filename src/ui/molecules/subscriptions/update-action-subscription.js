import * as React from 'react';
import { Subscription } from 'react-apollo';
import deepEqual from 'deep-equal';

import { AppConsumer } from 'index';

import { UPDATE_ACTION_SUBSCRIPTION } from 'graphql/subscriptions/action';


export const UpdateActionSubscription = () => {
  return (
    <AppConsumer>
      { (context) => (
        <Subscription subscription={ UPDATE_ACTION_SUBSCRIPTION }>
          { ({ error, data }) => {
            if (error) {
              return <div>subscription UPDATE_ACTION_SUBSCRIPTION got error: ${ error.message }</div>;
            }

            if (data && data.actionUpdated && data.actionUpdated.node) {
              const updatedAction = data.actionUpdated.node;

              const actionForUpdateIndex = context.actions.findIndex((action) => {
                return updatedAction.id === action.id;
              });

              const isUpdated = !deepEqual(context.actions[actionForUpdateIndex], updatedAction);

              const isDeletedAction = context.deletedActionsIds.some((deletedActionId) => {
                return deletedActionId === updatedAction.id;
              });

              if (isUpdated && !isDeletedAction) {
                context.updatePersonOrAction(updatedAction, 'actions');
              }
            }

            return null;
          } }
        </Subscription>
      ) }
    </AppConsumer>
  );
};
