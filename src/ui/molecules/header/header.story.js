import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number, object, array, select } from '@storybook/addon-knobs';
import { MemoryRouter } from 'react-router-dom';

import { Header } from './header';


const stories = storiesOf('molecules/Header', module);
stories.addDecorator(withKnobs);

stories.add('default', () => {
  return (
    <MemoryRouter>
      <Header/>
    </MemoryRouter>
  );
});
