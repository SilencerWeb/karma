/* eslint-disable react/prop-types */

import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { FeedPage } from 'features/feed';
import { PersonPage } from 'features/person';
import { AuthenticationPage } from 'features/authentication';
import { MyActionsPage } from 'features/my-actions';

import { AUTH_TOKEN } from './constants';


const LoggedInRoute = ({ component: Component, ...rest }) => (
  <Route
    render={ props => localStorage.getItem(AUTH_TOKEN) ? <Component { ...props }/> : <Redirect to={ '/' }/> }
    { ...rest }
  />
);

const NotLoggedInRoute = ({ component: Component, ...rest }) => (
  <Route
    render={ props => !localStorage.getItem(AUTH_TOKEN) ? <Component { ...props }/> : <Redirect to={ '/' }/> }
    { ...rest }
  />
);


export const Routes = () => (
  <Switch>
    <Route path={ '/' } exact component={ FeedPage }/>

    <NotLoggedInRoute path={ '/login' } exact render={ () => <AuthenticationPage type={ 'login' }/> }/>
    <NotLoggedInRoute path={ '/signup' } exact render={ () => <AuthenticationPage type={ 'signup' }/> }/>

    <LoggedInRoute path={ '/:user/persons/:id' } exact component={ PersonPage }/>
    <LoggedInRoute path={ '/my-actions' } exact component={ MyActionsPage }/>
  </Switch>
);
