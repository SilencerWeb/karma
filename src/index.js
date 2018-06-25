import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { injectGlobal } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import { globalStyles } from 'ui/theme';

import { Routes } from './routes';

import normalize from 'normalize.css/normalize.css';


injectGlobal`${normalize} ${globalStyles}`;

ReactDOM.render(
  <div>
    <BrowserRouter>
      <Routes/>
    </BrowserRouter>
  </div>,
  document.getElementById('root'));
