// @flow
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, object, text, boolean, number } from '@storybook/addon-knobs';

import { Button } from './';

import { shortLeftArrow } from 'ui/outlines';


const stories = storiesOf('Button', module);

stories.addDecorator(withKnobs);

stories.add('default', () => {
  const tag = select('tag', {
    button: 'button',
    a: 'a',
  }, 'button');

  const type = select('type', {
    raised: 'raised',
    flat: 'flat',
  }, 'raised');

  const theme = select('theme', {
    primary: 'primary',
    secondary: 'secondary',
  }, 'primary');

  const icon = {
    svg: shortLeftArrow,
    height: number(`icon's height (rem)`, 1.6),
    position: select(`icon's position`, {
      left: 'left',
      right: 'right',
    }, 'right'),
    rotation: number(`icon's rotation (deg)`, 0),
  };

  const attributes = object('attributes', {});

  const onClick = () => alert('onClick works!');
  const shouldOnClickWork = boolean('onClick', false);

  const content = text('content', `Hi, I'm button :)`);

  return (
    <Button
      tag={ tag }
      type={ type }
      theme={ theme }
      icon={ icon }
      attributes={ attributes }
      onClick={ shouldOnClickWork && onClick }
    >
      { content }
    </Button>
  );
});
