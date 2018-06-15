// @flow
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number, object, array, select } from '@storybook/addon-knobs';

import { HelperText } from './';

import { warning } from 'ui/outlines';


const stories = storiesOf('HelperText', module);
stories.addDecorator(withKnobs);

stories
  .add('default', () => {
    const content = text('content', `Hi! I'm helper text`);

    const disabled = boolean('disabled', false);

    const error = boolean('error', false);

    return (
      <HelperText disabled={ disabled } error={ error }>
        { content }
      </HelperText>
    );
  })
  .add('iconic', () => {
    const content = text('content', `Hi! I'm helper text`);

    const icon = {
      svg: warning,
      height: number(`icon's height (rem)`, 1.6),
      position: select(`icon's position`, {
        left: 'left',
        right: 'right',
      }, 'right'),
      rotation: number(`icon's rotation (deg)`, 0),
    };

    const disabled = boolean('disabled', false);

    const error = boolean('error', false);

    return (
      <HelperText
        icon={ icon }
        disabled={ disabled }
        error={ error }>
        { content }
      </HelperText>
    );
  });
