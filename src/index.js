import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { injectGlobal } from 'styled-components';

import { PersonCard } from 'ui/molecules';

import { globalStyles } from 'ui/theme';

import normalize from 'normalize.css/normalize.css';


injectGlobal`${normalize} ${globalStyles}`;

ReactDOM.render(
  <div>
    <PersonCard
      name={ 'Name' }
      position={ 'Position' }
      karma={ 0 }
      description={ 'Description' }
      create
      onCancel={ () => console.log('canceled') }
      onSave={ () => console.log('saved') }
    />
  </div>,
  document.getElementById('root'));
