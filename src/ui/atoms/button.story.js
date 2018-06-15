// @flow
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number, object, array, select } from '@storybook/addon-knobs';

import { Button } from './';

import { shortLeftArrow } from 'ui/outlines';


const stories = storiesOf('Button', module);
stories.addDecorator(withKnobs);

stories
  .add('default', () => {
    const content = text('content', `Hi, I'm button`);

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
      <Button
        tag={ tag }
        type={ type }
        theme={ theme }
      >
        { content }
      </Button>
    );
  })
  .add('iconic', () => {
    const content = text('content', `Hi, I'm button`);

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

    return (
      <Button
        tag={ tag }
        type={ type }
        theme={ theme }
        icon={ icon }
      >
        { content }
      </Button>
    );
  });
