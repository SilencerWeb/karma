import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { Icon } from 'ui/atoms';

import { color, transition } from 'ui/theme';


const Input = styled.input`
  display: inline-block;
  vertical-align: top;
  width: 100%;
  min-height: 3.4rem;
  font-weight: 300;
  line-height: 1.5;
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
  
  ${p => css` 
  
    ${p.error && !p.disabled && css`
      border-bottom-color: #db4437;
    
      &:hover {
        border-bottom-color: #db4437;
      }
      
      &:focus {
        border-bottom-color: #db4437;
      }
    `}
    
    ${p.disabled && css`
      opacity: 0.5;
      cursor: not-allowed;
    
      &:hover {
        border-bottom-color: #bdbdbd;
      }
      
      &:focus {
        border-bottom-color: #bdbdbd;
      }
    `}
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

  ${p => css`

    ${p.icon && css`
  
      svg {
        position: absolute;
        top: calc(50% - 0.45rem);
        font-size: 1.6rem;
        transform: translateY(-50%);
        transition: ${transition};
      }
  
  
      ${p.icon.position === 'left' && css`
  
        ${Input} {
          padding-left: 2.4rem;
        }
        
        svg {
          left: 0;
        }
      `}
  
      ${p.icon.position === 'right' && css`
  
        ${Input} {
          padding-right: 2.4rem;
        }
        
        svg {
          right: 0;
        }
      `}
      
      
      ${p.icon.rotation && css`
  
        svg {
          transform: translateY(-50%) rotate(${p.icon.rotation}deg);
        }    
      `}
    `}
    
    ${p.disabled && css`
  
      svg {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `}
    
    ${p.fullWidth && css`
      max-width: initial;
    `}
  `}
`;


export const TextField = (props) => {
  const icon = props.icon && props.icon.svg ? <Icon icon={ props.icon.svg }/> : null;

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
      { props.icon && props.icon.position === 'right' && icon }
    </Wrapper>
  );
};


TextField.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  tag: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  icon: {
    svg: PropTypes.any.isRequired,
    position: PropTypes.string,
    rotation: PropTypes.number,
  },
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  fullWidth: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

TextField.propTypes = {
  tag: 'input',
  icon: {
    position: 'right',
    rotation: 0,
  },
  disabled: false,
  error: false,
  fullWidth: false,
};
