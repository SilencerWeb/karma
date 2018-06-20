import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number, object, array, select } from '@storybook/addon-knobs';

import { Header } from '.'


const stories = storiesOf('molecules/Header', module);
stories.addDecorator(withKnobs);

stories.add('default', () => {
  return (
    <Header/>
  )
});
