// @flow
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number, object, array, select } from '@storybook/addon-knobs';

import { FormField } from './';

import { warning } from 'ui/outlines';

import avatar_1x from 'assets/images/avatars/avatar.png';
import avatar2_1x from 'assets/images/avatars/avatar2.png';
import avatar3_1x from 'assets/images/avatars/avatar3.png';
import avatar4_1x from 'assets/images/avatars/avatar4.png';
import avatar5_1x from 'assets/images/avatars/avatar5.png';
import avatar6_1x from 'assets/images/avatars/avatar6.png';

import avatar_2x from 'assets/images/avatars/avatar@2x.png';
import avatar2_2x from 'assets/images/avatars/avatar2@2x.png';
import avatar3_2x from 'assets/images/avatars/avatar3@2x.png';
import avatar4_2x from 'assets/images/avatars/avatar4@2x.png';
import avatar5_2x from 'assets/images/avatars/avatar5@2x.png';
import avatar6_2x from 'assets/images/avatars/avatar6@2x.png';


const textFieldStories = storiesOf('molecules/FormField/TextField', module);
textFieldStories.addDecorator(withKnobs);

textFieldStories
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
    const limit = number('limit', 100);

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

const selectStories = storiesOf('molecules/FormField/Select', module);
selectStories.addDecorator(withKnobs);

selectStories
  .add('default', () => {
    const label = text('label', `Hi! I'm label`);

    const placeholder = text('placeholder', `Choose a person`);

    const type = select('type', {
      single: 'single',
      multi: 'multi',
    }, 'single');

    const theme = select('theme', {
      simple: 'simple',
      avatar: 'avatar',
    }, 'simple');

    const disabled = boolean('disabled', false);

    const error = boolean('error', false);

    const fullWidth = boolean('full width', false);

    const options = [
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
        placeholder={ placeholder }
        tag={ 'select' }
        options={ options }
        type={ type }
        theme={ theme }
        label={ label }
        disabled={ disabled }
        error={ error }
        fullWidth={ fullWidth }
      />
    );
  })
  .add('with helper text', () => {
    const label = text('label', `Hi! I'm label`);

    const placeholder = text('placeholder', `Choose a person`);

    const type = select('type', {
      single: 'single',
      multi: 'multi',
    }, 'single');

    const theme = select('theme', {
      simple: 'simple',
      avatar: 'avatar',
    }, 'simple');

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

    const options = [
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
        placeholder={ placeholder }
        tag={ 'select' }
        options={ options }
        type={ type }
        theme={ theme }
        label={ label }
        helperText={ helperText }
        disabled={ disabled }
        error={ error }
        fullWidth={ fullWidth }
      />
    );
  });
