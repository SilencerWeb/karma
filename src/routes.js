import * as React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';

import { AppConsumer } from './index';

import { FeedPage } from 'features/feed';
import { PersonPage } from 'features/person';
import { AuthenticationPage } from 'features/authentication';

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <AppConsumer>
    { (context) => (
      <Route
        render={ props => context.isLoggedIn ? <Component { ...props }/> : <Redirect to={ '/' }/> }
        { ...rest }
      />
    ) }
  </AppConsumer>
);

ProtectedRoute.propTypes = {
  component: PropTypes.element,
};


export const Routes = () => (
  <Switch>
    <AppConsumer>
      { (context) => (
        <React.Fragment>
          <Route path={ '/' } exact component={ FeedPage }/>
          <Route path={ '/login' } exact render={ () => <AuthenticationPage type={ 'login' }/> }/>
          <Route path={ '/signup' } exact render={ () => <AuthenticationPage type={ 'signup' }/> }/>

          <ProtectedRoute path={ '/person' } component={ PersonPage }/>
        </React.Fragment>
      ) }
    </AppConsumer>
  </Switch>
);
