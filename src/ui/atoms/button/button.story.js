import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number, object, array, select } from '@storybook/addon-knobs';

import { Button } from './button';

import { shortLeftArrow } from 'ui/outlines';


const stories = storiesOf('atoms/Button', module);
stories.addDecorator(withKnobs);

stories
  .add('default', () => {
    const content = text('content', 'Hi, I\'m button');

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

    return (
      <Button tag={ tag } type={ type } theme={ theme }>
        { content }
      </Button>
    );
  })
  .add('iconic', () => {
    const content = text('content', 'Hi, I\'m button');

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

    const icon = boolean('icon', false);
    const iconPosition = select('icon\'s position', {
      left: 'left',
      right: 'right',
    }, 'right');
    const iconRotation = number('icon\'s rotation (deg)', 0);

    return (
      <Button
        tag={ tag }
        type={ type }
        theme={ theme }
        icon={ icon && shortLeftArrow }
        iconPosition={ iconPosition }
        iconRotation={ iconRotation }
      >
        { content }
      </Button>
    );
  });
