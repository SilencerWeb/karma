// @flow
import * as React from 'react';
import styled, { css } from 'styled-components';

import { color, transition } from 'ui/theme';


type props = {
  className?: string,
  checked?: boolean,
  disabled?: boolean,
  children: string,
};


const Checkmark = styled.span`
  position: absolute;
  top: 50%;
  left: 0;
  display: inline-block;
  vertical-align: top;
  width: 1.8rem;
  height: 1.8rem;
  border: 0.2rem solid #828282;
  border-radius: 50%;
  transform: translateY(-50%);
  transition: ${transition};
  
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0.8rem;
    height: 0.8rem;
    background-color: ${color.primary};
    border-radius: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    visibility: hidden;
    transition: ${transition};
  }
`;

const Text = styled.span`
  display: inline-block;
  vertical-align: top;
`;

const Wrapper = styled.label`
  position: relative;
  display: inline-block;
  vertical-align: top;
  padding-left: 3rem;
  transition: ${transition};

  input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    visibility: hidden;
    
    &:checked {
      
      ~ ${Checkmark} {
        border-color: ${color.primary};
        
        &:after {
          opacity: 1;
          visibility: visible;
        }
      }
    }
  }
  
  ${p => p.disabled && css`
    opacity: 0.5;
  `}
`;


export const Radio = (props: props) => {
  return (
    <Wrapper className={ props.className } disabled={ props.disabled }>
      <input type="checkbox" checked={ props.checked }/>
      <Checkmark/>
      <Text>{ props.children }</Text>
    </Wrapper>
  );
};
