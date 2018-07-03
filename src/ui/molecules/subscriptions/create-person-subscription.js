import * as React from 'react';
import { Subscription } from 'react-apollo';

import { AppConsumer } from 'index';

import { CREATE_PERSON_SUBSCRIPTION } from 'graphql/subscriptions/person';


export const CreatePersonSubscription = () => {
  return (
    <AppConsumer>
      { (context) => (
        <Subscription subscription={ CREATE_PERSON_SUBSCRIPTION }>
          { ({ error, data }) => {
            if (error) {
              return <div>subscription CREATE_PERSON_SUBSCRIPTION got error: ${ error.message }</div>;
            }

            if (data && data.personCreated && data.personCreated.node) {
              const createdPerson = data.personCreated.node;

              const isNewPerson = context.persons.every((person) => {
                return person.id !== createdPerson.id;
              });

              const isDeletedPerson = context.deletedPersonsIds.some((deletedPersonId) => {
                return deletedPersonId === createdPerson.id;
              });

              if (isNewPerson && !isDeletedPerson) {
                context.addPersonOrAction(createdPerson, 'persons');
              }
            }

            return null;
          } }
        </Subscription>
      ) }
    </AppConsumer>
  );
};
