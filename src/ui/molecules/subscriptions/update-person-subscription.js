import * as React from 'react';
import { Subscription } from 'react-apollo';
import deepEqual from 'deep-equal';

import { AppConsumer } from 'index';

import { UPDATE_PERSON_SUBSCRIPTION } from 'graphql/subscriptions/person';


export const UpdatePersonSubscription = () => {
  return (
    <AppConsumer>
      { (context) => (
        <Subscription subscription={ UPDATE_PERSON_SUBSCRIPTION }>
          { ({ error, data }) => {
            if (error) {
              return <div>subscription UPDATE_PERSON_SUBSCRIPTION got error: ${ error.message }</div>;
            }

            if (data && data.personUpdated && data.personUpdated.node) {
              const updatedPerson = data.personUpdated.node;

              const personForUpdateIndex = context.persons.findIndex((person) => {
                return updatedPerson.id === person.id;
              });

              const isUpdated = !deepEqual(context.persons[personForUpdateIndex], updatedPerson);

              const isDeletedPerson = context.deletedPersonsIds.some((deletedPersonId) => {
                return deletedPersonId === updatedPerson.id;
              });

              if (isUpdated && !isDeletedPerson) {
                context.updatePersonOrAction(updatedPerson, 'persons');
              }
            }

            return null;
          } }
        </Subscription>
      ) }
    </AppConsumer>
  );
};
