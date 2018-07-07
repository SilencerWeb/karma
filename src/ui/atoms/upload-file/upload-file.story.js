import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number, object, array, select } from '@storybook/addon-knobs';

import { UploadFile } from './upload-file';


const stories = storiesOf('atoms/UploadFile', module);
stories.addDecorator(withKnobs);

stories.add('default', () => {
  return (
    <UploadFile>
      Add file
    </UploadFile>
  );
});
