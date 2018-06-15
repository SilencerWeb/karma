// @flow
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import { Label } from './';


const stories = storiesOf('Label', module);
stories.addDecorator(withKnobs);

stories.add('default', () => {
  const content = text('content', `Hi! I'm label`);

  const disabled = boolean('disabled', false);

  const error = boolean('error', false);

  return (
    <Label disabled={ disabled } error={ error }>
      { content }
    </Label>
  );
});
