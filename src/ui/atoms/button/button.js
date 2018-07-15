import * as React from 'react';
import styled, { css } from 'styled-components';
import { lighten, rgba } from 'polished';
import PropTypes from 'prop-types';
import Ink from 'react-ink';
import MDSpinner from 'react-md-spinner';

import { Icon } from 'ui/atoms';

import { color, transition } from 'ui/theme';


const Text = styled.span`
  display: inline-block;
  vertical-align: middle;
`;

const WrapperAsButton = styled.button`
  position: relative;
  display: inline-block;
  vertical-align: top;
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1;
  text-transform: uppercase;
  text-decoration: none;
  border: none;
  border-radius: 0.4rem;
  padding-top: 1.2rem;
  padding-right: 2rem;
  padding-bottom: 1.2rem;
  padding-left: 2rem;
  outline: none;
  cursor: pointer;
  transition: background-color ${transition}, box-shadow ${transition};

  ${p => css`

    ${p.type === 'raised' && css`
      color: ${color.text.secondary};
      box-shadow: 0 0.4rem 0.8rem rgba(176, 190, 197, 0.24);
      
      ${!p.disabled && !p.loading && css`

        &:hover {
          box-shadow: 0 0.4rem 0.8rem rgba(176, 190, 197, 0.44);
        }
      `}
      
      ${p.theme === 'primary' && css`
        background-color: ${color.primary};
        
        ${!p.disabled && !p.loading && css`

          &:hover {
            background-color: ${lighten(0.15, color.primary)}
          }
        `}
      `}
      
      ${p.theme === 'secondary' && css`
        background-color: ${color.secondary};
        
        ${!p.disabled && !p.loading && css`

          &:hover {
            background-color: ${lighten(0.15, color.secondary)}
          }
        `}
      `}
      
      ${p.theme === 'error' && css`
        background-color: ${color.error};
        
        ${!p.disabled && !p.loading && css`

          &:hover {
            background-color: ${lighten(0.15, color.error)}
          }
        `}
      `}
    `}
  
    ${p.type === 'flat' && css`
      background-color: transparent;
      
      ${p.theme === 'primary' && css`
        color: ${color.primary};
        
        ${!p.disabled && !p.loading && css`

          &:hover {
            background-color: ${rgba(color.primary, 0.1)}
          }
        `}
      `}
      
      ${p.theme === 'secondary' && css`
        color: ${color.secondary};
        
        ${!p.disabled && !p.loading && css`

          &:hover {
            background-color: ${rgba(color.secondary, 0.1)}
          }
        `}
      `}
    `}
    
    ${p.type === 'icon' && css`
      background-color: transparent;
      border-radius: 50%;
      padding-top: 1.2rem;
      padding-right: 1.2rem;
      padding-bottom: 1.2rem;
      padding-left: 1.2rem;
      
      ${p.theme === 'primary' && css`
        color: ${color.primary};
        
        ${!p.disabled && !p.loading && css`

          &:hover {
            background-color: ${rgba(color.primary, 0.1)}
          }
        `}
      `}
      
      ${p.theme === 'secondary' && css`
        color: ${color.secondary};
        
        ${!p.disabled && !p.loading && css`

          &:hover {
            background-color: ${rgba(color.secondary, 0.1)}
          }
        `}
      `}
      
      ${p.theme === 'gray' && css`
        color: #3c4858;
        
        ${!p.disabled && !p.loading && css`

          &:hover {
            background-color: ${rgba('#3c4858', 0.1)}
          }
        `}
      `}
      
      ${p.theme === 'white' && css`
        color: #ffffff;
        
        ${!p.disabled && !p.loading && css`

          &:hover {
            background-color: ${rgba('#ffffff', 0.1)}
          }
        `}
      `}
    `}
    
    ${(p.icon || p.loading) && css`

      svg {
        font-size: 1.6rem;
        vertical-align: middle;
      }
  
  
      ${p.iconPosition === 'left' && css`
        padding-left: 1.2rem;
        
        ${Text} {
          margin-left: 2rem;
        }
      `}
  
      ${p.iconPosition === 'right' && css`
        padding-right: 1.2rem;
        
        ${Text} {
          margin-right: 2rem;
        }
      `}
      
      
      ${p.iconRotation > 0 && css`
  
        svg {
          transform: rotate(${p.iconRotation}deg);
        }
      `}
    `}
    
    ${p.disabled && !p.loading && css`
      opacity: 0.4;
      cursor: not-allowed;
    `}
    
    ${p.loading && css`
      cursor: progress;
    `}
  `}
`;

const WrapperAsLink = WrapperAsButton.withComponent('a');


export const Button = (props) => {
  const Wrapper = props.tag && props.tag === 'a' ? WrapperAsLink : WrapperAsButton;

  let icon = props.icon ? <Icon icon={ props.icon }/> : null;

  if (props.loading) {
    icon = <MDSpinner size={ 16 } singleColor={ '#fff' }/>;
  }

  return (
    <Wrapper
      className={ props.className }
      type={ props.type }
      theme={ props.theme }
      icon={ props.icon }
      iconPosition={ props.iconPosition }
      iconRotation={ props.iconRotation }
      { ...props.attributes }
      loading={ props.loading }
      disabled={ props.disabled }
      onClick={ !props.disabled && !props.loading ? props.onClick : null }
    >
      { (props.icon || props.loading ) && props.iconPosition === 'left' && icon }
      <Text>
        { props.children }
      </Text>
      { (props.icon || props.loading ) && props.iconPosition === 'right' && icon }

      { !props.withoutRipple && !props.disabled && !props.loading && <Ink/> }
    </Wrapper>
  );
};


Button.propTypes = {
  className: PropTypes.string,
  tag: PropTypes.string,
  type: PropTypes.string,
  theme: PropTypes.string,
  icon: PropTypes.any,
  iconPosition: PropTypes.string,
  iconRotation: PropTypes.number,
  attributes: PropTypes.object,
  withoutRipple: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.any.isRequired,
};

Button.defaultProps = {
  tag: 'button',
  type: 'raised',
  theme: 'primary',
  iconPosition: 'left',
};
