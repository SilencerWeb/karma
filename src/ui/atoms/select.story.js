// @flow
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number, object, array, select } from '@storybook/addon-knobs';

import { Select } from './';

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


const stories = storiesOf('Select', module);
stories.addDecorator(withKnobs);

stories
  .add('default', () => {
    const placeholder = text('placeholder', `Choose a person`);

    const type = select('type', {
      single: 'single',
      multi: 'multi',
    }, 'single');

    const disabled = boolean('disabled', false);

    const error = boolean('error', false);

    const fullWidth = boolean('full width', false);

    const options = [
      {
        label: 'Neil Roberts',
        value: 'neil roberts',
        isDisabled: true,
      },
      {
        label: 'Ray Clarke',
        value: 'ray clarke',
      },
      {
        label: 'Theresa Mason',
        value: 'theresa mason',
      },
      {
        label: 'Samantha Kennedy',
        value: 'samantha kennedy',
      },
      {
        label: 'Alice Kelly',
        value: 'alice kelly',
      },
      {
        label: 'Liam Hughes',
        value: 'liam hughes',
      },
    ];

    return (
      <Select
        placeholder={ placeholder }
        options={ options }
        type={ type }
        theme={ 'simple' }
        disabled={ disabled }
        error={ error }
        fullWidth={ fullWidth }
      />
    );
  })
  .add('with avatars', () => {
    const placeholder = text('placeholder', `Choose a person`);

    const type = select('type', {
      single: 'single',
      multi: 'multi',
    }, 'single');

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
      <Select
        placeholder={ placeholder }
        options={ options }
        type={ type }
        theme={ 'avatar' }
        disabled={ disabled }
        error={ error }
        fullWidth={ fullWidth }
      />
    );
  });
