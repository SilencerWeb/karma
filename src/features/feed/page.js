import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Query, Subscription } from 'react-apollo';

import { AppConsumer } from 'index';

import { PersonCardList } from 'ui/molecules';

import { CommonTemplate } from 'ui/templates';

import { GET_PERSONS } from 'graphql/queries/person';
import { PERSON_SUBSCRIPTION } from 'graphql/subscriptions/person';


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

                <Subscription subscription={ PERSON_SUBSCRIPTION }>
                  { ({ error, data }) => {
                    if (error) {
                      return <div>subscription PERSON_SUBSCRIPTION got error: ${ error.message }</div>;
                    }

                    if (data && data.personUpdate && data.personUpdate.node) {
                      const personUpdate = data.personUpdate.node;

                      const isNewPerson = context.persons.every((person) => {
                        return person.id !== personUpdate.id;
                      });

                      if (isNewPerson) {
                        context.addPerson(personUpdate);
                      }
                    }

                    return null;
                  } }
                </Subscription>

                {
                  !context.persons.length &&
                  <Query query={ GET_PERSONS }>
                    { ({ error, loading, data }) => {
                      if (error) {
                        return <div>query GET_PERSONS got error: ${ error.message }</div>;
                      } else if (loading) {
                        return <div>query GET_PERSONS is loading...</div>;
                      }

                      if (data && data.persons && data.persons.length) {
                        context.updatePersons(data.persons);
                      }

                      return null;
                    } }
                  </Query>
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
