import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { injectGlobal } from 'styled-components';

import { globalStyles } from 'ui/theme';

import normalize from 'normalize.css/normalize.css';


// eslint-disable-next-line no-unused-expressions
injectGlobal`${normalize} ${globalStyles}`;

ReactDOM.render(<div />, document.getElementById('root'));
