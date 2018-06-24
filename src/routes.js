import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { FeedPage } from 'features/feed';
import { PersonPage } from 'features/person';


export const Routes = () => (
  <React.Fragment>
    <Switch>
      <Route path={ '/' } exact component={ FeedPage }/>
      <Route path={ '/person' } exact component={ PersonPage }/>
    </Switch>
  </React.Fragment>
);
