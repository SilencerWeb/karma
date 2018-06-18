import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number, object, array, select } from '@storybook/addon-knobs';

import { PersonCard } from './';

import avatar_1x from 'assets/images/avatars/large/avatar.png';
import avatar_2x from 'assets/images/avatars/large/avatar@2x.png';


const stories = storiesOf('molecules/PersonCard', module);
stories.addDecorator(withKnobs);

stories
  .add('default', () => {
    const avatar = {
      _1x: avatar_1x,
      _2x: avatar_2x,
    };

    const name = text('name', 'Alex Walker');

    const position = text('position', 'Best friend');

    const karma = number('karma', 10);

    const description = text('description', `Music fan. Alcohol enthusiast. Creator. Devoted social media geek. Total analyst. Coffee lover. Beer junkie. Coffee maven. Avid alcohol lover. Twitter expert. Lifelong tv ninja. Creator. Passionate tv nerd. Problem solver. Proud alcohol evangelist. Lifelong web junkie. Coffee maven. Unapologetic social media advocate. Analyst. Tv trailblazer. Zombie geek. Twitter aficionado. Reader.`);

    return (
      <PersonCard
        avatar={ avatar }
        name={ name }
        position={ position }
        karma={ karma }
        description={ description }
      />
    );
  })
  .add('creating person', () => {
    const name = text('name', 'Name');

    const position = text('position', 'Position');

    const description = text('description', `Enter description`);

    return (
      <PersonCard
        name={ name }
        position={ position }
        karma={ 0 }
        description={ description }
        create
        onCancel={ () => console.log('canceled') }
        onSave={ () => console.log('saved') }
      />
    );
  });
