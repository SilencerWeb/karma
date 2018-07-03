import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { AppConsumer } from 'index';

import { PersonCardList } from 'ui/molecules';

import { CommonTemplate } from 'ui/templates';


export class FeedPage extends React.Component {
  state = {};

  render() {
    return (
      <CommonTemplate>
        <AppConsumer>
          { (context) => (
            context.isLoggedIn ?
              <PersonCardList/>
              :
              <div>Please, log in :)</div>
          ) }
        </AppConsumer>
      </CommonTemplate>
    );
  }
};


FeedPage.propTypes = {};
