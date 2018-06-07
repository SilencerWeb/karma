// @flow
import * as React from 'react';
import styled, { css } from 'styled-components';

import { font, color } from 'ui/theme';


type props = {
  className?: string,
  tag?: string,
  type?: string,
  theme?: string,
  children: React.Node
};

const Wrapper = styled.h1`
  font-family: ${props => props.type === 'simple' ? font.family.primary : font.family.secondary};
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.type === 'simple' ? 300 : 700};
  color: ${props => props.theme === 'dark' ? color.text.primary : color.text.secondary};
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

  const WrapperWithAnotherTag = props.tag && props.tag !== 'h1' ?
    Wrapper.withComponent(props.tag) : Wrapper;

  return (
    <WrapperWithAnotherTag
      className={ props.className }
      type={ props.type || 'simple' }
      theme={ props.theme || 'dark' }
      fontSize={ props.tag && fontSizes[props.tag] || fontSizes['h1'] }
      isH6={ props.tag === 'h6' }
    >
      { props.children }
    </WrapperWithAnotherTag>
  );
};
