// @flow
import * as React from 'react';
import styled, { css } from 'styled-components';

import { Icon } from 'ui/atoms';

import { color, transition } from 'ui/theme';


type props = {
  id?: string,
  className?: string,
  tag?: string,
  placeholder?: string,
  value?: string,
  icon?: {
    svg: any,
    height?: number,
    position?: string,
    rotation?: number,
  },
  disabled?: boolean,
  error?: boolean,
  fullWidth: boolean,
  onChange: Function,
};


const Input = styled.input`
  width: 100%;
  min-height: 2.8rem;
  font-weight: 300;
  color: ${color.text.primary};
  background-color: transparent;
  border: none;
  border-bottom: 0.1rem solid #bdbdbd;
  padding-bottom: 0.8rem;
  outline: none;
  transition: color ${transition}, border-bottom-color ${transition}, opacity ${transition};
  
  &:hover {
    border-bottom-color: #828282;
  }
  
  &:focus {
    border-bottom-color: #00b5ff;
  }
  
  &::placeholder {
    color: #828282;
  }
  
  ${p => p.error && !p.disabled && css`
    border-bottom-color: #db4437;
  
    &:hover {
      border-bottom-color: #db4437;
    }
    
    &:focus {
      border-bottom-color: #db4437;
    }
  `}
  
  ${p => p.disabled && css`
    opacity: 0.5;
    cursor: not-allowed;
  
    &:hover {
      border-bottom-color: #bdbdbd;
    }
    
    &:focus {
      border-bottom-color: #bdbdbd;
    }
  `}
`;

const Textarea = Input.withComponent('textarea').extend`
  resize: vertical;
`;

const Wrapper = styled.div`
  position: relative;
  max-width: 20rem;
  margin-bottom: 0.4rem;
  
  &:last-child {
    margin-bottom: 0;
  }

  ${p => p.icon && css`

    svg {
      position: absolute;
      top: calc(50% - 0.45rem);
      transform: translateY(-50%);
      transition: ${transition};
    }

    ${p.icon.position === 'left' ? css`

      ${Input} {
        padding-left: 2.4rem;
      }
      
      svg {
        left: 0;
      }
    ` : css`

      ${Input} {
        padding-right: 2.4rem;
      }
      
      svg {
        right: 0;
      }
    `}
    
    // p.icon.rotation > 0 is because of the bug with styled-components where if you pass 0 it doesn't go below this line
    ${p.icon.rotation > 0 && css`

      svg {
        transform: translateY(-50%) rotate(${p.icon.rotation}deg);
      }    
    `}
  `}
  
  ${p => p.disabled && css`

    svg {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `}
  
  ${p => p.fullWidth && css`
    max-width: initial;
  `}
`;


export const TextField = (props: props) => {
  const DEFAULT_HELPER_TEXT_ICON_HEIGHT = 1.6;

  let icon;

  if (props.icon && props.icon.svg) {
    let iconHeight = props.icon.height || DEFAULT_HELPER_TEXT_ICON_HEIGHT;

    icon = <Icon icon={ props.icon.svg } height={ iconHeight }/>;
  }

  const Field = props.tag && props.tag === 'textarea' ? Textarea : Input;

  return (
    <Wrapper
      className={ props.className }
      icon={ props.icon && {
        position: props.icon.position,
        rotation: props.icon.rotation,
      } }
      disabled={ props.disabled }
      fullWidth={ props.fullWidth }
    >
      { props.icon && props.icon.position === 'left' && icon }
      <Field
        id={ props.id }
        placeholder={ props.placeholder }
        value={ props.value }
        disabled={ props.disabled }
        error={ props.error }
        onChange={ props.onChange }
        onFocus={ props.onFocus }
        onBlur={ props.onBlur }
      />
      { props.icon && props.icon.position !== 'left' && icon /* Default icon position */ }
    </Wrapper>
  );
};
