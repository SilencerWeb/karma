import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { ApolloConsumer, Query } from 'react-apollo';

import { AppConsumer } from 'index';

import { PersonCardList } from 'ui/molecules';

import { CommonTemplate } from 'ui/templates';

import { GET_PERSONS } from 'graphql/queries/person';


export class FeedPage extends React.Component {
  state = {};

  render() {

    return (
      <CommonTemplate>
        <AppConsumer>
          { (context) => (
            context.isLoggedIn ?
              <React.Fragment>
                <PersonCardList/>

                {
                  !context.persons.length &&
                  <ApolloConsumer>
                    { () => (
                      <Query query={ GET_PERSONS }>
                        { ({ error, loading, data }) => {
                          if (error) {
                            return <p>Error :( { error.message }</p>;
                          } else if (loading) {
                            return <p>Loading...</p>;
                          }

                          context.updatePersons(data.persons);

                          return null;
                        } }
                      </Query>
                    ) }
                  </ApolloConsumer>
                }
              </React.Fragment>
              :
              <div>Please, log in :)</div>
          ) }
        </AppConsumer>
      </CommonTemplate>
    );
  }
};


FeedPage.propTypes = {};
