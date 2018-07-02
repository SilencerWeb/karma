import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number, object, array, select } from '@storybook/addon-knobs';

import { ActionCard } from './action-card';

const stories = storiesOf('molecules/ActionCard', module);
stories.addDecorator(withKnobs);

stories
  .add('default', () => {
    const title = text('title', 'Action name');

    const date = text('date', '12.05.2018');

    const description = text('description', 'Music fan. Alcohol enthusiast. Creator. Devoted social media geek. Total analyst. Coffee lover. Beer junkie. Coffee maven. Avid alcohol lover. Twitter expert. Lifelong tv ninja. Creator. Passionate tv nerd. Problem solver. Proud alcohol evangelist. Lifelong web junkie. Coffee maven. Unapologetic social media advocate. Analyst. Tv trailblazer. Zombie geek. Twitter aficionado. Reader.');

    const karma = select('karma', {
      positive: 'positive',
      neutral: 'neutral',
      negative: 'negative',
    }, 'positive');

    const executors = select('executors', {
      left: 'left',
      right: 'right',
    }, 'left');

    return (
      <ActionCard
        title={ title }
        date={ date }
        description={ description }
        karma={ karma }
        executors={ executors }
        // eslint-disable-next-line
        onEditButtonClick={ () => console.log('edited!') }
        // eslint-disable-next-line
        onMoreButtonClick={ () => console.log('more') }
      />
    );
  }).add('creating action', () => {
  const title = text('title', 'Action name');

  const date = text('date', '12.05.2018');

  const description = text('description', 'Music fan. Alcohol enthusiast. Creator. Devoted social media geek. Total analyst. Coffee lover. Beer junkie. Coffee maven. Avid alcohol lover. Twitter expert. Lifelong tv ninja. Creator. Passionate tv nerd. Problem solver. Proud alcohol evangelist. Lifelong web junkie. Coffee maven. Unapologetic social media advocate. Analyst. Tv trailblazer. Zombie geek. Twitter aficionado. Reader.');

  return (
    <ActionCard
      title={ title }
      date={ date }
      description={ description }
      karma={ 'neutral' }
      create
      // eslint-disable-next-line
      onCancelButtonClick={ () => console.log('canceled!') }
      // eslint-disable-next-line
      onSaveButtonClick={ () => console.log('saved!') }
    />
  );
});
