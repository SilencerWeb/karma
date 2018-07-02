import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number, object, array, select } from '@storybook/addon-knobs';

import { TextField } from './text-field';

import { pencil } from 'ui/outlines';


const stories = storiesOf('atoms/TextField', module);
stories.addDecorator(withKnobs);

stories
  .add('default', () => {
    const placeholder = text('placeholder', 'Hi! I\'m text field');

    const disabled = boolean('disabled', false);

    const error = boolean('error', false);

    return (
      <TextField
        placeholder={ placeholder }
        disabled={ disabled }
        error={ error }
      />
    );
  })
  .add('iconic', () => {
    const placeholder = text('placeholder', 'Hi! I\'m text field');

    const icon = boolean('helper text icon', false);
    const iconPosition = select('helper text icon\'s position', {
      left: 'left',
      right: 'right',
    }, 'right');
    const iconRotation = number('helper text icon\'s rotation (deg)', 0);

    const disabled = boolean('disabled', false);

    const error = boolean('error', false);

    return (
      <TextField
        placeholder={ placeholder }
        icon={ icon ? pencil : null }
        iconPosition={ iconPosition }
        iconRotation={ iconRotation }
        disabled={ disabled }
        error={ error }
      />
    );
  });
