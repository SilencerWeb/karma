// @flow
import * as React from 'react';
import styled, { css } from 'styled-components';

import { font, color } from 'ui/theme';


type props = {
  className?: string,
  tag?: string,
  title?: boolean,
  light?: boolean,
  children: React.Node
};

const StyledHeading = styled.h1`
  font-family: ${props => props.title ? font.family.secondary : font.family.primary};
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.title ? 700 : 300};
  color: ${props => props.light ? color.text.secondary : color.text.primary};
  margin-top: 0;
  margin-bottom: 0;
  
  ${props => props.isH6 && css`
    font-weight: 500;
    text-transform: uppercase;
  `}
`;

export const Heading = (props: props) => {
  const fontSizes = {
    h1: '5.2rem',
    h2: '3.6rem',
    h3: '2.4rem',
    h4: '1.8rem',
    h5: '1.6rem',
    h6: '1.2rem',
  };

  const HeadingWithAnotherTag = props.tag && props.tag !== 'h1' ?
    StyledHeading.withComponent(props.tag) : StyledHeading;

  return (
    <HeadingWithAnotherTag
      className={ props.className }
      title={ props.title }
      fontSize={ props.tag && fontSizes[props.tag] }
      light={ props.light }
      isH6={ props.tag === 'h6' }
    >
      { props.children }
    </HeadingWithAnotherTag>
  );
};

Heading.defaultProps = {
  className: '',
  tag: 'h1',
  title: false,
  light: false,
};
