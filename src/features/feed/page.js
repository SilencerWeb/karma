import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { ApolloConsumer, Query, Mutation } from 'react-apollo';

import { PersonCardList } from 'ui/molecules';

import { CommonTemplate } from 'ui/templates';

import { PERSONS } from 'graphql/queries/person';
import { CREATE_PERSON } from 'graphql/mutations/person';


export class FeedPage extends React.Component {
  state = {};

  render() {

    return (
      <CommonTemplate>
        <ApolloConsumer>
          { () => (
            <Query query={ PERSONS }>
              { ({ error, loading, data }) => {
                if (error) {
                  return <p>Error :( { error.message }</p>;
                } else if (loading) {
                  return <p>Loading...</p>;
                }

                return (
                  <PersonCardList persons={ data.persons }/>
                );
              } }
            </Query>
          ) }
        </ApolloConsumer>
      </CommonTemplate>
    );
  }
};


FeedPage.propTypes = {};
