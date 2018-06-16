// @flow
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { Switch } from './';


storiesOf('atoms/Switch', module)
  .add('default', () => (
    <Switch/>
  ));
