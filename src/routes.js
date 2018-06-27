import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { FeedPage } from 'features/feed';
import { PersonPage } from 'features/person';
import { AuthenticationPage } from 'features/authentication';


export const Routes = () => (
  <React.Fragment>
    <Switch>
      <Route path={ '/' } exact component={ FeedPage }/>
      <Route path={ '/person' } component={ PersonPage }/>
      <Route path={ '/login' } exact render={ () => <AuthenticationPage type={ 'login' }/> }/>
      <Route path={ '/signup' } exact render={ () => <AuthenticationPage type={ 'signup' }/> }/>
    </Switch>
  </React.Fragment>
);
