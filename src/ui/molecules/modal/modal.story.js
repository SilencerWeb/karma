import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number, object, array, select } from '@storybook/addon-knobs';

import { Modal } from './modal';

import { ContactForm } from 'ui/molecules';


const stories = storiesOf('molecules/Modal', module);
stories.addDecorator(withKnobs);

stories.add('default', () => {
  return (
    <Modal>
      <ContactForm/>
    </Modal>
  );
});
