import * as React from 'react';
import { Subscription } from 'react-apollo';

import { AppConsumer } from 'index';

import { CREATE_ACTION_SUBSCRIPTION } from 'graphql/subscriptions/action';


export const CreateActionSubscription = () => {
  return (
    <AppConsumer>
      { (context) => (
        <Subscription subscription={ CREATE_ACTION_SUBSCRIPTION }>
          { ({ error, data }) => {
            if (error) {
              return <div>subscription CREATE_ACTION_SUBSCRIPTION got error: ${ error.message }</div>;
            }

            if (data && data.actionCreated && data.actionCreated.node) {
              const createdAction = data.actionCreated.node;

              const isNewAction = context.actions.every((action) => {
                return action.id !== createdAction.id;
              });

              const isDeletedAction = context.deletedActionsIds.some((deletedActionId) => {
                return deletedActionId === createdAction.id;
              });

              if (isNewAction && !isDeletedAction) {
                context.addPersonOrAction(createdAction, 'actions');
              }
            }

            return null;
          } }
        </Subscription>
      ) }
    </AppConsumer>
  );
};
