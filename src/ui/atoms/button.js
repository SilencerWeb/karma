import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { Icon } from 'ui/atoms';

import { color } from 'ui/theme';


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
  
  span {
    vertical-align: middle;
  }
  
  svg {
    font-size: 1.6rem;
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
  
      ${p.icon.position === 'left' && css`
        padding-left: 1.2rem;
        
        span {
          margin-left: 2rem;
        }
      `}
  
      ${p.icon.position === 'right' && css`
        padding-right: 1.2rem;
        
        span {
          margin-right: 2rem;
        }
      `}
      
      
      ${p.icon.rotation && css`
  
        svg {
          transform: rotate(${p.icon.rotation}deg);
        }
      `}
    `}
  `}
`;

const WrapperAsLink = WrapperAsButton.withComponent('a');


export const Button = (props) => {
  const Wrapper = props.tag && props.tag === 'a' ? WrapperAsLink : WrapperAsButton;

  const icon = props.icon && props.icon.svg ? <Icon icon={ props.icon.svg }/> : null;

  return (
    <Wrapper
      id={ props.id }
      className={ props.className }
      type={ props.type }
      theme={ props.theme }
      icon={ props.icon && {
        position: props.icon.position,
        rotation: props.icon.rotation,
      } }
      { ...props.attributes }
      onClick={ props.onClick }
    >
      { props.icon && props.icon.position === 'left' && icon }
      <span>
        { props.children }
      </span>
      { props.icon && props.icon.position === 'right' && icon }
    </Wrapper>
  );
};


Button.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  tag: PropTypes.string,
  type: PropTypes.string,
  theme: PropTypes.string,
  icon: PropTypes.shape({
    svg: PropTypes.any.isRequired,
    position: PropTypes.string,
    rotation: PropTypes.number,
  }),
  attributes: PropTypes.object,
  onClick: PropTypes.func,
  children: PropTypes.string.isRequired,
};

Button.defaultProps = {
  tag: 'button',
  type: 'raised',
  theme: 'primary',
  svg: {
    position: 'right',
    rotation: 0,
  },
};
