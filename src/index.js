import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { injectGlobal } from 'styled-components';

import { TextField } from 'ui/atoms';

import { pencil } from 'ui/outlines';

import { globalStyles } from 'ui/theme';

import normalize from 'normalize.css/normalize.css';


injectGlobal`${normalize} ${globalStyles}`;

ReactDOM.render(<div>
  <TextField fullWidth disabled icon={ {
    svg: pencil,
    position: 'right',
  } }/>
</div>, document.getElementById('root'));
