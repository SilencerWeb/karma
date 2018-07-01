/* eslint-disable react/prop-types */

import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { AppConsumer } from './index';

import { FeedPage } from 'features/feed';
import { PersonPage } from 'features/person';
import { AuthenticationPage } from 'features/authentication';
import { MyActionsPage } from 'features/my-actions';


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


export const Routes = () => (
  <Switch>
    <AppConsumer>
      { (context) => (
        <React.Fragment>
          <Route path={ '/' } exact component={ FeedPage }/>
          <Route path={ '/login' } exact render={ () => <AuthenticationPage type={ 'login' }/> }/>
          <Route path={ '/signup' } exact render={ () => <AuthenticationPage type={ 'signup' }/> }/>

          <ProtectedRoute path={ '/:user/persons/:id' } exact component={ PersonPage }/>

          <ProtectedRoute path={ '/my-actions' } exact component={ MyActionsPage }/>
        </React.Fragment>
      ) }
    </AppConsumer>
  </Switch>
);
