import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number, object, array, select } from '@storybook/addon-knobs';

import { HelperText } from './helper-text';

import { warning } from 'ui/outlines';


const stories = storiesOf('atoms/HelperText', module);
stories.addDecorator(withKnobs);

stories
  .add('default', () => {
    const content = text('content', 'Hi! I\'m helper text');

    const disabled = boolean('disabled', false);

    const error = boolean('error', false);

    return (
      <HelperText disabled={ disabled } error={ error }>
        { content }
      </HelperText>
    );
  })
  .add('iconic', () => {
    const content = text('content', 'Hi! I\'m helper text');

    const icon = boolean('helper text icon', false);
    const iconPosition = select('helper text icon\'s position', {
      left: 'left',
      right: 'right',
    }, 'right');
    const iconRotation = number('helper text icon\'s rotation (deg)', 0);

    const disabled = boolean('disabled', false);

    const error = boolean('error', false);

    return (
      <HelperText
        icon={ icon ? warning : null }
        iconPosition={ iconPosition }
        iconRotation={ iconRotation }
        disabled={ disabled }
        error={ error }
      >
        { content }
      </HelperText>
    );
  });
