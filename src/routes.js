import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { FeedPage } from 'features/feed/page';


export const Routes = () => (
  <React.Fragment>
    <Switch>
      <Route path={ '/' } exact component={ FeedPage }/>
    </Switch>
  </React.Fragment>
);
