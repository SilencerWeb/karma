import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number, object, array, select } from '@storybook/addon-knobs';

import { Footer } from './footer'


const stories = storiesOf('molecules/Footer', module);
stories.addDecorator(withKnobs);

stories.add('default', () => {
  return (
    <Footer/>
  )
});
