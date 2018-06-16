// @flow
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number, object, array, select } from '@storybook/addon-knobs';

import { Heading } from './';


const stories = storiesOf('atoms/Heading', module);
stories.addDecorator(withKnobs);

stories.add('default', () => {
  const tag = select('tag', {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
  }, 'h1');

  const type = select('type', {
    simple: 'simple',
    title: 'title',
  }, 'simple');

  const theme = select('theme', {
    dark: 'dark',
    light: 'light',
  }, 'dark');

  const content = text('content', `Hi, I'm heading`);

  return (
    <Heading
      tag={ tag }
      type={ type }
      theme={ theme }
    >
      { content }
    </Heading>
  );
});
