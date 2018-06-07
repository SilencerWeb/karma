// @flow
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { Button } from './';

import { shortLeftArrow } from 'ui/outlines';


storiesOf('Button/raised', module)
  .add('primary', () => (
    <Button type={ 'raised' } theme="primary">Hi, I'm raised button :)</Button>
  ))
  .add('secondary', () => (
    <Button type={ 'raised' } theme="secondary">Hi, I'm raised button :)</Button>
  ));

storiesOf('Button/raised/as tag \'a\'', module)
  .add('primary', () => (
    <Button tag='a' type={ 'raised' } theme="primary">Hi, I'm raised button :)</Button>
  ))
  .add('secondary', () => (
    <Button tag='a' type={ 'raised' } theme="secondary">Hi, I'm raised button :)</Button>
  ));

storiesOf('Button/raised/iconic/left', module)
  .add('primary', () => (
    <Button
      type={ 'raised' }
      theme="primary"
      icon={ {
        svg: shortLeftArrow,
        position: 'left',
      } }
    >
      Hi, I'm raised button :)
    </Button>
  ))
  .add('secondary', () => (
    <Button
      type={ 'raised' }
      theme="secondary"
      icon={ {
        svg: shortLeftArrow,
        position: 'left',
      } }
    >
      Hi, I'm raised button :)
    </Button>
  ));

storiesOf('Button/raised/iconic/left/as tag \'a\'', module)
  .add('primary', () => (
    <Button
      tag='a'
      type={ 'raised' }
      theme="primary"
      icon={ {
        svg: shortLeftArrow,
        position: 'left',
      } }
    >
      Hi, I'm raised button :)
    </Button>
  ))
  .add('secondary', () => (
    <Button
      tag='a'
      type={ 'raised' }
      theme="secondary"
      icon={ {
        svg: shortLeftArrow,
        position: 'left',
      } }
    >
      Hi, I'm raised button :)
    </Button>
  ));

storiesOf('Button/raised/iconic/right', module)
  .add('primary', () => (
    <Button
      type={ 'raised' }
      theme="primary"
      icon={ {
        svg: shortLeftArrow,
        position: 'right',
        rotation: 180,
      } }
    >
      Hi, I'm raised button :)
    </Button>
  ))
  .add('secondary', () => (
    <Button
      type={ 'raised' }
      theme="secondary"
      icon={ {
        svg: shortLeftArrow,
        position: 'right',
        rotation: 180,
      } }
    >
      Hi, I'm raised button :)
    </Button>
  ));

storiesOf('Button/raised/iconic/right/as tag \'a\'', module)
  .add('primary', () => (
    <Button
      tag='a'
      type={ 'raised' }
      theme="primary"
      icon={ {
        svg: shortLeftArrow,
        position: 'right',
        rotation: 180,
      } }
    >
      Hi, I'm raised button :)
    </Button>
  ))
  .add('secondary', () => (
    <Button
      tag='a'
      type={ 'raised' }
      theme="secondary"
      icon={ {
        svg: shortLeftArrow,
        position: 'right',
        rotation: 180,
      } }
    >
      Hi, I'm raised button :)
    </Button>
  ));

storiesOf('Button/flat', module)
  .add('primary', () => (
    <Button type={ 'flat' } theme="primary">Hi, I'm flat button :)</Button>
  ))
  .add('secondary', () => (
    <Button type={ 'flat' } theme="secondary">Hi, I'm flat button :)</Button>
  ));

storiesOf('Button/flat/as tag \'a\'', module)
  .add('primary', () => (
    <Button tag='a' type={ 'flat' } theme="primary">Hi, I'm flat button :)</Button>
  ))
  .add('secondary', () => (
    <Button tag='a' type={ 'flat' } theme="secondary">Hi, I'm flat button :)</Button>
  ));

storiesOf('Button/flat/iconic/left', module)
  .add('primary', () => (
    <Button
      type={ 'flat' }
      theme="primary"
      icon={ {
        svg: shortLeftArrow,
        position: 'left',
      } }
    >
      Hi, I'm flat button :)
    </Button>
  ))
  .add('secondary', () => (
    <Button
      type={ 'flat' }
      theme="secondary"
      icon={ {
        svg: shortLeftArrow,
        position: 'left',
      } }
    >
      Hi, I'm flat button :)
    </Button>
  ));

storiesOf('Button/flat/iconic/left/as tag \'a\'', module)
  .add('primary', () => (
    <Button
      tag='a'
      type={ 'flat' }
      theme="primary"
      icon={ {
        svg: shortLeftArrow,
        position: 'left',
      } }
    >
      Hi, I'm flat button :)
    </Button>
  ))
  .add('secondary', () => (
    <Button
      tag='a'
      type={ 'flat' }
      theme="secondary"
      icon={ {
        svg: shortLeftArrow,
        position: 'left',
      } }
    >
      Hi, I'm flat button :)
    </Button>
  ));

storiesOf('Button/flat/iconic/right', module)
  .add('primary', () => (
    <Button
      type={ 'flat' }
      theme="primary"
      icon={ {
        svg: shortLeftArrow,
        position: 'right',
        rotation: 180,
      } }
    >
      Hi, I'm flat button :)
    </Button>
  ))
  .add('secondary', () => (
    <Button
      type={ 'flat' }
      theme="secondary"
      icon={ {
        svg: shortLeftArrow,
        position: 'right',
        rotation: 180,
      } }
    >
      Hi, I'm flat button :)
    </Button>
  ));

storiesOf('Button/flat/iconic/right/as tag \'a\'', module)
  .add('primary', () => (
    <Button
      tag='a'
      type={ 'flat' }
      theme="primary"
      icon={ {
        svg: shortLeftArrow,
        position: 'right',
        rotation: 180,
      } }
    >
      Hi, I'm flat button :)
    </Button>
  ))
  .add('secondary', () => (
    <Button
      tag='a'
      type={ 'flat' }
      theme="secondary"
      icon={ {
        svg: shortLeftArrow,
        position: 'right',
        rotation: 180,
      } }
    >
      Hi, I'm flat button :)
    </Button>
  ));

storiesOf('Button', module)
  .add('with onClick callback', () => (
    <Button type={ 'raised' } theme="primary" onClick={ () => alert('it works!') }>Hi, I'm raised button :)</Button>
  ));