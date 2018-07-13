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
  
    ${p.error && !p.disabled && css`
      border-bottom-color: ${color.error};
    
      &:hover {
        border-bottom-color: ${color.error};
      }
      
      &:focus {
        border-bottom-color: ${color.error};
      }
    `}
  `}
`;

const Textarea = Input.withComponent('textarea').extend`
  resize: vertical;
`;

const Wrapper = styled.div`
  position: relative;
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
  
  
      ${p.iconPosition === 'left' && css`
  
        ${Input} {
          padding-left: 2.4rem;
        }
        
        svg {
          left: 0;
        }
      `}
  
      ${p.iconPosition === 'right' && css`
  
        ${Input} {
          padding-right: 2.4rem;
        }
        
        svg {
          right: 0;
        }
      `}
      
      
      ${p.iconRotation > 0 && css`
  
        svg {
          transform: translateY(-50%) rotate(${p.iconRotation}deg);
        }    
      `}
    `}
    
    ${p.disabled && css`
  
      svg {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `}
  `}
`;


export const TextField = (props) => {
  const icon = props.icon ? <Icon icon={ props.icon }/> : null;

  const Field = props.tag && props.tag === 'textarea' ? Textarea : Input;

  return (
    <Wrapper
      className={ props.className }
      icon={ props.icon }
      iconPosition={ props.iconPosition }
      iconRotation={ props.iconRotation }
      disabled={ props.disabled }
    >
      { props.icon && props.iconPosition === 'left' && icon }
      <Field
        id={ props.id }
        name={ props.name }
        type={ props.type }
        value={ props.value }
        placeholder={ props.placeholder }
        disabled={ props.disabled }
        error={ props.error }
        onChange={ props.onChange }
        onFocus={ props.onFocus }
        onBlur={ props.onBlur }
        { ...props.attributes }
      />
      { props.icon && props.iconPosition === 'right' && icon }
    </Wrapper>
  );
};


TextField.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  tag: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  placeholder: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  icon: PropTypes.any,
  iconPosition: PropTypes.string,
  iconRotation: PropTypes.number,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  attributes: PropTypes.object,
};

TextField.defaultProps = {
  tag: 'input',
  disabled: false,
  error: false,
};
