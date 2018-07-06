import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { Icon } from 'ui/atoms';

import { color, transition } from 'ui/theme';


const WrapperAsButton = styled.button`
  display: inline-block;
  vertical-align: top;
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1;
  text-transform: uppercase;
  text-decoration: none;
  border: none;
  padding-top: 1.2rem;
  padding-right: 2rem;
  padding-bottom: 1.2rem;
  padding-left: 2rem;
  outline: none;
  cursor: pointer;
  transition: ${transition};
  
  span {
    vertical-align: middle;
  }

  ${p => css`

    ${p.type === 'raised' && css`
      color: ${color.text.secondary};
      border-radius: 0.4rem;
      box-shadow: 0 0.4rem 0.8rem rgba(176, 190, 197, 0.24);
      
      ${p.theme === 'primary' && css`
        background-color: ${color.primary};
      `}
      
      ${p.theme === 'secondary' && css`
        background-color: ${color.secondary};
      `}
    `}
  
    ${p.type === 'flat' && css`
      background-color: transparent;
      
      ${p.theme === 'primary' && css`
        color: ${color.primary};
      `}
      
      ${p.theme === 'secondary' && css`
        color: ${color.secondary};
      `}
    `}
    
    ${p.icon && css`

      svg {
        font-size: 1.6rem;
        vertical-align: middle;
      }
  
  
      ${p.iconPosition === 'left' && css`
        padding-left: 1.2rem;
        
        span {
          margin-left: 2rem;
        }
      `}
  
      ${p.iconPosition === 'right' && css`
        padding-right: 1.2rem;
        
        span {
          margin-right: 2rem;
        }
      `}
      
      
      ${p.iconRotation > 0 && css`
  
        svg {
          transform: rotate(${p.iconRotation}deg);
        }
      `}
    `}
  `}
`;

const WrapperAsLink = WrapperAsButton.withComponent('a');


export const Button = (props) => {
  const Wrapper = props.tag && props.tag === 'a' ? WrapperAsLink : WrapperAsButton;

  const icon = props.icon ? <Icon icon={ props.icon }/> : null;

  return (
    <Wrapper
      className={ props.className }
      type={ props.type }
      theme={ props.theme }
      icon={ props.icon }
      iconPosition={ props.iconPosition }
      iconRotation={ props.iconRotation }
      { ...props.attributes }
      onClick={ props.onClick }
    >
      { props.icon && props.iconPosition === 'left' && icon }
      <span>
        { props.children }
      </span>
      { props.icon && props.iconPosition === 'right' && icon }
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
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

Button.defaultProps = {
  tag: 'button',
  type: 'raised',
  theme: 'primary',
};
