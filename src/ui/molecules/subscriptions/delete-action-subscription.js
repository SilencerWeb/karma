import * as React from 'react';
import { Subscription } from 'react-apollo';

import { AppConsumer } from 'index';

import { DELETE_ACTION_SUBSCRIPTION } from 'graphql/subscriptions/action';


export const DeleteActionSubscription = () => {
  return (
    <AppConsumer>
      { (context) => (
        <Subscription subscription={ DELETE_ACTION_SUBSCRIPTION }>
          { ({ error, data }) => {
            if (error) {
              return <div>subscription DELETE_ACTION_SUBSCRIPTION got error: ${ error.message }</div>;
            }

            if (data && data.actionDeleted && data.actionDeleted.previousValues) {
              const deletedActionId = data.actionDeleted.previousValues.id;

              const isDeleted = context.actions.every((action) => {
                return deletedActionId !== action.id;
              });

              if (!isDeleted) {
                context.deletePersonOrAction(deletedActionId, 'actions');
              }
            }

            return null;
          } }
        </Subscription>
      ) }
    </AppConsumer>
  );
};
