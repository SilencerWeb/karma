// @flow
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number, object, array, select } from '@storybook/addon-knobs';

import { Radio } from './';


const stories = storiesOf('Radio', module);
stories.addDecorator(withKnobs);

stories.add('default', () => {
  const content = text('content', `Hi! I'm radio`);

  const disabled = boolean('disabled', false);

  return (
    <Radio disabled={ disabled }>{ content }</Radio>
  );
});
