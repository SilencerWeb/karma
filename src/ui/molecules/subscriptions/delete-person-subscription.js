import * as React from 'react';
import { Subscription } from 'react-apollo';

import { AppConsumer } from 'index';

import { DELETE_PERSON_SUBSCRIPTION } from 'graphql/subscriptions/person';


export const DeletePersonSubscription = () => {
  return (
    <AppConsumer>
      { (context) => (
        <Subscription subscription={ DELETE_PERSON_SUBSCRIPTION }>
          { ({ error, data }) => {
            if (error) {
              return <div>subscription DELETE_PERSON_SUBSCRIPTION got error: ${ error.message }</div>;
            }

            if (data && data.personDeleted && data.personDeleted.previousValues) {
              const deletedPersonId = data.personDeleted.previousValues.id;

              const isDeleted = context.persons.every((person) => {
                return deletedPersonId !== person.id;
              });

              if (!isDeleted) {
                context.deletePersonOrAction(deletedPersonId, 'persons');
              }
            }

            return null;
          } }
        </Subscription>
      ) }
    </AppConsumer>
  );
};
