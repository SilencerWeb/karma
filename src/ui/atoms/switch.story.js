import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number, object, array, select } from '@storybook/addon-knobs';

import { Switch } from '.';


const stories = storiesOf('atoms/Switch', module);
stories.addDecorator(withKnobs);

stories.add('default', () => {
  const content = {
    off: text('content off', 'off'),
    on: text('content on', 'on'),
  };

  const disabled = boolean('disabled', false);

  return (
    <Switch content={ content } disabled={ disabled }/>
  );
});
