import * as React from 'react';
import styled, { css } from 'styled-components';
import { lighten, rgba } from 'polished';
import PropTypes from 'prop-types';
import Ink from 'react-ink';

import { Icon } from 'ui/atoms';

import { color, transition } from 'ui/theme';


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
  transition: ${transition};
  
  span {
    vertical-align: middle;
  }

  ${p => css`

    ${p.type === 'raised' && css`
      color: ${color.text.secondary};
      box-shadow: 0 0.3rem 0.1rem -0.2rem ${rgba('#000', 0.2)}, 
                  0 0.2rem 0.2rem 0 ${rgba('#000', 0.14)}, 
                  0 0.1rem 0.5rem 0 ${rgba('#000', 0.12)};
      
      ${p.theme === 'primary' && css`
        background-color: ${color.primary};
        
        &:hover {
          background-color: ${lighten(0.15, color.primary)}
        }
      `}
      
      ${p.theme === 'secondary' && css`
        background-color: ${color.secondary};
        
        &:hover {
          background-color: ${lighten(0.15, color.secondary)}
        }
      `}
    `}
  
    ${p.type === 'flat' && css`
      background-color: transparent;
      
      ${p.theme === 'primary' && css`
        color: ${color.primary};
        
        &:hover {
          background-color: ${rgba(color.primary, 0.1)}
        }
      `}
      
      ${p.theme === 'secondary' && css`
        color: ${color.secondary};
        
        &:hover {
          background-color: ${rgba(color.secondary, 0.1)}
        }
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

      <Ink/>
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
