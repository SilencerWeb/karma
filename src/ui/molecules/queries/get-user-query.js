import * as React from 'react';
import { Query } from 'react-apollo';

import { AppConsumer } from 'index';

import { GET_USER } from 'graphql/queries/user';


export const GetUserQuery = () => {
  return (
    <AppConsumer>
      { (context) => (
        <Query query={ GET_USER }>
          { ({ error, loading, data }) => {
            if (error) {
              return <div>query GET_USER got error: ${ error.message }</div>;
            } else if (loading) {
              return <div>query GET_USER is loading...</div>;
            }

            if (data && data.user) {
              const user = data.user;

              context.updateUser({
                id: user.id,
                email: user.email,
                name: user.name,
                nickname: user.nickname,
              }, true);
            }

            return null;
          } }
        </Query>
      ) }
    </AppConsumer>
  );
};
