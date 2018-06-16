// @flow
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number, object, array, select } from '@storybook/addon-knobs';

import { Checkbox } from './';


const stories = storiesOf('atoms/Checkbox', module);
stories.addDecorator(withKnobs);

stories.add('default', () => {
  const content = text('content', `Hi! I'm checkbox`);

  const disabled = boolean('disabled', false);

  return (
    <Checkbox disabled={ disabled }>{ content }</Checkbox>
  );
});
