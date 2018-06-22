import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { injectGlobal } from 'styled-components';
import { HashRouter } from 'react-router-dom';

import { globalStyles } from 'ui/theme';

import { Routes } from './routes';

import normalize from 'normalize.css/normalize.css';


injectGlobal`${normalize} ${globalStyles}`;

ReactDOM.render(
  <div>
    <HashRouter>
      <Routes/>
    </HashRouter>
  </div>,
  document.getElementById('root'));
