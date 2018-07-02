import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number, object, array, select } from '@storybook/addon-knobs';

import { CreateActionCard } from './create-action-card';


const stories = storiesOf('molecules/CreateActionCard', module);
stories.addDecorator(withKnobs);

stories.add('default', () => {
  return (
    <CreateActionCard/>
  );
});
