import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number, object, array, select } from '@storybook/addon-knobs';

import { Logo } from '.'


const stories = storiesOf('atoms/Logo', module);
stories.addDecorator(withKnobs);

stories.add('default', () => {
  return (
    <Logo/>
  )
});
