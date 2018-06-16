// @flow
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number, object, array, select } from '@storybook/addon-knobs';

import { FormField } from './';

import { warning } from 'ui/outlines';


const stories = storiesOf('FormField', module);
stories.addDecorator(withKnobs);

stories
  .add('default', () => {
    const label = text('label', `Hi! I'm label`);

    const placeholder = text('placeholder', `Hi! I'm input`);

    const tag = select('tag', {
      input: 'input',
      textarea: 'textarea',
    }, 'input');

    const disabled = boolean('disabled', false);

    const error = boolean('error', false);

    const fullWidth = boolean('full width', false);

    return (
      <FormField
        placeholder={ placeholder }
        tag={ tag }
        label={ label }
        disabled={ disabled }
        error={ error }
        fullWidth={ fullWidth }
      />
    );
  })
  .add('with helper text', () => {
    const label = text('label', `Hi! I'm label`);

    const tag = select('tag', {
      input: 'input',
      textarea: 'textarea',
    }, 'input');

    const helperText = {
      content: text('helper text content', `Hi! I'm helper text`),
      icon: {
        svg: warning,
        height: number(`helper text icon's height (rem)`, 1.5),
        position: select(`helper text icon's position`, {
          left: 'left',
          right: 'right',
        }, 'right'),
        rotation: number(`helper text icon's rotation (deg)`, 0),
      },
    };

    const disabled = boolean('disabled', false);

    const error = boolean('error', false);

    const fullWidth = boolean('full width', false);

    return (
      <FormField
        tag={ tag }
        label={ label }
        helperText={ helperText }
        disabled={ disabled }
        error={ error }
        fullWidth={ fullWidth }
      />
    );
  })
  .add('limited textarea', () => {
    const limit = number('limit', 5000);

    const disabled = boolean('disabled', false);

    const error = boolean('error', false);

    const fullWidth = boolean('full width', false);

    return (
      <FormField
        tag={ 'textarea' }
        label={ 'Textarea with limited symbols length' }
        limit={ limit }
        disabled={ disabled }
        error={ error }
        fullWidth={ fullWidth }
      />
    );
  });
