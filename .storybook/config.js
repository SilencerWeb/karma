import * as React from 'react';
import { configure, addDecorator } from '@storybook/react';
import styled, { injectGlobal } from 'styled-components';

import { globalStyles } from '../src/ui/theme';

import normalize from 'normalize.css/normalize.css';

injectGlobal`${normalize} ${globalStyles}`;

const RootDecorator = styled.div`
  min-height: 100vh;
  background-color: #f0f0f0;
  padding: 30px;
`;

addDecorator((fn) => {
  return (
    <RootDecorator>
      { fn() }
    </RootDecorator>
  );
});

configure(() => {
  const req = require.context('../src/', true, /\.story\.js$/);

  req.keys().forEach(req);
}, module);