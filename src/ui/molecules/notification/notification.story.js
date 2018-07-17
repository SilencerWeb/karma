import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number, object, array, select } from '@storybook/addon-knobs';

import { Notification } from './notification';


const stories = storiesOf('molecules/Notification', module);
stories.addDecorator(withKnobs);

stories.add('default', () => {
  return (
    <Notification
      theme={ 'success' }
      message={ 'You were successfully signed inYou were successfully signed inYou were successfully signed inYou were successfully signed inYou were successfully signed inYou were successfully signed inYou were successfully signed in' }
    />
  );
});
