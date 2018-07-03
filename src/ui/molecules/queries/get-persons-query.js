import * as React from 'react';
import { Query } from 'react-apollo';

import { AppConsumer } from 'index';

import { GET_PERSONS } from 'graphql/queries/person';


export const GetPersonsQuery = () => {
  return (
    <AppConsumer>
      { (context) => (
        <Query query={ GET_PERSONS }>
          { ({ error, loading, data }) => {
            if (error) {
              return <div>query GET_PERSONS got error: ${ error.message }</div>;
            } else if (loading) {
              return <div>query GET_PERSONS is loading...</div>;
            }

            if (data && data.persons && data.persons.length) {
              context.updatePersonsOrActions(data.persons, 'persons', true);
            }

            return null;
          } }
        </Query>
      ) }
    </AppConsumer>
  );
};
