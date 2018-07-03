import * as React from 'react';
import { Query } from 'react-apollo';

import { AppConsumer } from 'index';

import { GET_ACTIONS } from 'graphql/queries/action';


export const GetActionsQuery = () => {
  return (
    <AppConsumer>
      { (context) => (
        <Query query={ GET_ACTIONS }>
          { ({ error, loading, data }) => {
            if (error) {
              return <div>query GET_ACTIONS got error: ${ error.message }</div>;
            } else if (loading) {
              return <div>query GET_ACTIONS is loading...</div>;
            }

            if (data.actions && data.actions.length) {
              context.updatePersonsOrActions(data.actions, 'actions', true);
            }

            return null;
          } }
        </Query>
      ) }
    </AppConsumer>
  );
};
