import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number, object, array, select } from '@storybook/addon-knobs';

import { FormField } from './form-field';

import { warning } from 'ui/outlines';

import avatar_1x from 'assets/images/avatars/xs/avatar.png';
import avatar2_1x from 'assets/images/avatars/xs/avatar2.png';
import avatar3_1x from 'assets/images/avatars/xs/avatar3.png';
import avatar4_1x from 'assets/images/avatars/xs/avatar4.png';
import avatar5_1x from 'assets/images/avatars/xs/avatar5.png';
import avatar6_1x from 'assets/images/avatars/xs/avatar6.png';

import avatar_2x from 'assets/images/avatars/xs/avatar@2x.png';
import avatar2_2x from 'assets/images/avatars/xs/avatar2@2x.png';
import avatar3_2x from 'assets/images/avatars/xs/avatar3@2x.png';
import avatar4_2x from 'assets/images/avatars/xs/avatar4@2x.png';
import avatar5_2x from 'assets/images/avatars/xs/avatar5@2x.png';
import avatar6_2x from 'assets/images/avatars/xs/avatar6@2x.png';


const textFieldStories = storiesOf('molecules/FormField/TextField', module);
textFieldStories.addDecorator(withKnobs);

textFieldStories
  .add('default', () => {
    const label = text('label', 'Hi! I\'m label');

    const placeholder = text('placeholder', 'Hi! I\'m input');

    const tag = select('tag', {
      input: 'input',
      textarea: 'textarea',
    }, 'input');

    const disabled = boolean('disabled', false);

    const error = boolean('error', false);

    return (
      <FormField
        tag={ tag }
        placeholder={ placeholder }
        label={ label }
        disabled={ disabled }
        error={ error }
      />
    );
  })
  .add('with helper text', () => {
    const label = text('label', 'Hi! I\'m label');

    const tag = select('tag', {
      input: 'input',
      textarea: 'textarea',
    }, 'input');

    const helperText = text('helper text', 'Hi! I\'m helper text');
    const helperTextIcon = boolean('helper text icon', false);
    const helperTextIconPosition = select('helper text icon\'s position', {
      left: 'left',
      right: 'right',
    }, 'right');
    const helperTextIconRotation = number('helper text icon\'s rotation (deg)', 0);

    const disabled = boolean('disabled', false);

    const error = boolean('error', false);

    return (
      <FormField
        tag={ tag }
        label={ label }
        helperText={ helperText }
        helperTextIcon={ helperTextIcon ? warning : null }
        helperTextIconPosition={ helperTextIconPosition }
        helperTextIconRotation={ helperTextIconRotation }
        disabled={ disabled }
        error={ error }
      />
    );
  })
  .add('limited textarea', () => {
    const textFieldLimit = number('text field limit', 100);

    const disabled = boolean('disabled', false);

    const error = boolean('error', false);

    return (
      <FormField
        tag={ 'textarea' }
        textFieldLimit={ textFieldLimit }
        label={ 'Textarea with limited symbols length' }
        disabled={ disabled }
        error={ error }
      />
    );
  });

const selectStories = storiesOf('molecules/FormField/Select', module);
selectStories.addDecorator(withKnobs);

selectStories
  .add('default', () => {
    const label = text('label', 'Hi! I\'m label');

    const placeholder = text('placeholder', 'Choose a person');

    const selectType = select('type', {
      single: 'single',
      multi: 'multi',
    }, 'single');

    const selectTheme = select('theme', {
      simple: 'simple',
      avatar: 'avatar',
    }, 'simple');

    const disabled = boolean('disabled', false);

    const error = boolean('error', false);

    const selectOptions = [
      {
        label: 'Neil Roberts',
        value: 'neil roberts',
        isDisabled: true,
        avatar: {
          _1x: avatar_1x,
          _2x: avatar_2x,
        },
      },
      {
        label: 'Ray Clarke',
        value: 'ray clarke',
        avatar: {
          _1x: avatar2_1x,
          _2x: avatar2_2x,
        },
      },
      {
        label: 'Theresa Mason',
        value: 'theresa mason',
        avatar: {
          _1x: avatar3_1x,
          _2x: avatar3_2x,
        },
      },
      {
        label: 'Samantha Kennedy',
        value: 'samantha kennedy',
        avatar: {
          _1x: avatar4_1x,
          _2x: avatar4_2x,
        },
      },
      {
        label: 'Alice Kelly',
        value: 'alice kelly',
        avatar: {
          _1x: avatar5_1x,
          _2x: avatar5_2x,
        },
      },
      {
        label: 'Liam Hughes',
        value: 'liam hughes',
        avatar: {
          _1x: avatar6_1x,
          _2x: avatar6_2x,
        },
      },
    ];

    return (
      <FormField
        tag={ 'select' }
        placeholder={ placeholder }
        selectOptions={ selectOptions }
        selectType={ selectType }
        selectTheme={ selectTheme }
        label={ label }
        disabled={ disabled }
        error={ error }
      />
    );
  })
  .add('with helper text', () => {
    const label = text('label', 'Hi! I\'m label');

    const placeholder = text('placeholder', 'Choose a person');

    const selectType = select('type', {
      single: 'single',
      multi: 'multi',
    }, 'single');

    const selectTheme = select('theme', {
      simple: 'simple',
      avatar: 'avatar',
    }, 'simple');

    const helperText = text('helper text', 'Hi! I\'m helper text');
    const helperTextIcon = boolean('helper text icon', false);
    const helperTextIconPosition = select('helper text icon\'s position', {
      left: 'left',
      right: 'right',
    }, 'right');
    const helperTextIconRotation = number('helper text icon\'s rotation (deg)', 0);

    const disabled = boolean('disabled', false);

    const error = boolean('error', false);

    const selectOptions = [
      {
        label: 'Neil Roberts',
        value: 'neil roberts',
        isDisabled: true,
        avatar: {
          _1x: avatar_1x,
          _2x: avatar_2x,
        },
      },
      {
        label: 'Ray Clarke',
        value: 'ray clarke',
        avatar: {
          _1x: avatar2_1x,
          _2x: avatar2_2x,
        },
      },
      {
        label: 'Theresa Mason',
        value: 'theresa mason',
        avatar: {
          _1x: avatar3_1x,
          _2x: avatar3_2x,
        },
      },
      {
        label: 'Samantha Kennedy',
        value: 'samantha kennedy',
        avatar: {
          _1x: avatar4_1x,
          _2x: avatar4_2x,
        },
      },
      {
        label: 'Alice Kelly',
        value: 'alice kelly',
        avatar: {
          _1x: avatar5_1x,
          _2x: avatar5_2x,
        },
      },
      {
        label: 'Liam Hughes',
        value: 'liam hughes',
        avatar: {
          _1x: avatar6_1x,
          _2x: avatar6_2x,
        },
      },
    ];

    return (
      <FormField
        tag={ 'select' }
        placeholder={ placeholder }
        selectOptions={ selectOptions }
        selectType={ selectType }
        selectTheme={ selectTheme }
        label={ label }
        helperText={ helperText }
        helperTextIcon={ helperTextIcon ? warning : null }
        helperTextIconPosition={ helperTextIconPosition }
        helperTextIconRotation={ helperTextIconRotation }
        disabled={ disabled }
        error={ error }
      />
    );
  });
