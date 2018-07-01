import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import { AppConsumer } from 'index';

import { ActionCardList } from 'ui/molecules';

import { CommonTemplate } from 'ui/templates';

import { GET_ACTIONS } from 'graphql/queries/action';

export class MyActionsPage extends React.Component {
  state = {};

  render() {
    return (
      <CommonTemplate>
        <AppConsumer>
          { (context) => (
            <Query query={ GET_ACTIONS }>
              { ({ error, loading, data }) => {
                if (error) {
                  return <div>query GET_ACTIONS got error: ${ error.message }</div>;
                } else if (loading) {
                  return <div>query GET_ACTIONS is loading...</div>;
                }

                if (data.actions) {
                  const filteredActions = data.actions.filter((action) => {
                    return action.members.some((member) => {
                      return member.isUser ? member.user.id === context.user.id : false;
                    });
                  });

                  return (
                    <ActionCardList
                      actions={ filteredActions }
                      isActionCreating={ this.state.isActionCreating }
                      onCancelButtonClick={ this.handleCancelButtonClick }
                      onSaveButtonClick={ this.handleSaveButtonClick }
                    />
                  );
                }

                return null;
              } }
            </Query>
          ) }
        </AppConsumer>
      </CommonTemplate>
    );
  }
};


MyActionsPage.propTypes = {};
