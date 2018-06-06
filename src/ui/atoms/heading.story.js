// @flow
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { Heading } from './';


storiesOf('Heading/dark/simple', module)
  .add('h1', () => (
    <Heading>Hello, I'm heading :)</Heading>
  ))
  .add('h2', () => (
    <Heading tag={ 'h2' }>Hello, I'm heading :)</Heading>
  ))
  .add('h3', () => (
    <Heading tag={ 'h3' }>Hello, I'm heading :)</Heading>
  ))
  .add('h4', () => (
    <Heading tag={ 'h4' }>Hello, I'm heading :)</Heading>
  ))
  .add('h5', () => (
    <Heading tag={ 'h5' }>Hello, I'm heading :)</Heading>
  ))
  .add('h6', () => (
    <Heading tag={ 'h6' }>Hello, I'm heading :)</Heading>
  ));

storiesOf('Heading/dark/titles', module)
  .add('h1', () => (
    <Heading title>Hello, I'm heading :)</Heading>
  ))
  .add('h2', () => (
    <Heading tag={ 'h2' } title>Hello, I'm heading :)</Heading>
  ))
  .add('h3', () => (
    <Heading tag={ 'h3' } title>Hello, I'm heading :)</Heading>
  ))
  .add('h4', () => (
    <Heading tag={ 'h4' } title>Hello, I'm heading :)</Heading>
  ));


storiesOf('Heading/light/simple', module)
  .add('h1', () => (
    <Heading light>Hello, I'm heading :)</Heading>
  ))
  .add('h2', () => (
    <Heading tag={ 'h2' } light>Hello, I'm heading :)</Heading>
  ))
  .add('h3', () => (
    <Heading tag={ 'h3' } light>Hello, I'm heading :)</Heading>
  ))
  .add('h4', () => (
    <Heading tag={ 'h4' } light>Hello, I'm heading :)</Heading>
  ))
  .add('h5', () => (
    <Heading tag={ 'h5' } light>Hello, I'm heading :)</Heading>
  ))
  .add('h6', () => (
    <Heading tag={ 'h6' } light>Hello, I'm heading :)</Heading>
  ));

storiesOf('Heading/light/titles', module)
  .add('h1', () => (
    <Heading title light>Hello, I'm heading :)</Heading>
  ))
  .add('h2', () => (
    <Heading tag={ 'h2' } title light>Hello, I'm heading :)</Heading>
  ))
  .add('h3', () => (
    <Heading tag={ 'h3' } title light>Hello, I'm heading :)</Heading>
  ))
  .add('h4', () => (
    <Heading tag={ 'h4' } title light>Hello, I'm heading :)</Heading>
  ));
