// @flow
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number, object, array, select } from '@storybook/addon-knobs';

import { TextField } from './';

import { pencil } from 'ui/outlines';


const stories = storiesOf('TextField', module);
stories.addDecorator(withKnobs);

stories
  .add('default', () => {
    const placeholder = text('placeholder', `Hi! I'm text field`);

    const disabled = boolean('disabled', false);

    const error = boolean('error', false);

    const fullWidth = boolean('full width', false);

    return (
      <TextField
        placeholder={ placeholder }
        disabled={ disabled }
        error={ error }
        fullWidth={ fullWidth }
      />
    );
  })
  .add('iconic', () => {
    const placeholder = text('placeholder', `Hi! I'm text field`);

    const icon = {
      svg: pencil,
      height: number(`icon's height (rem)`, 1.6),
      position: select(`icon's position`, {
        left: 'left',
        right: 'right',
      }, 'right'),
      rotation: number(`icon's rotation (deg)`, 0),
    };

    const disabled = boolean('disabled', false);

    const error = boolean('error', false);

    const fullWidth = boolean('full width', false);

    return (
      <TextField
        placeholder={ placeholder }
        icon={ icon }
        disabled={ disabled }
        error={ error }
        fullWidth={ fullWidth }
      />
    );
  });
