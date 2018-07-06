import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number, object, array, select } from '@storybook/addon-knobs';

import { ContactForm } from './contact-form';


const stories = storiesOf('molecules/ContactForm', module);
stories.addDecorator(withKnobs);

stories.add('default', () => {
  return (
    <ContactForm/>
  );
});
