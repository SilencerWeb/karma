import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { Icon } from 'ui/atoms';

import { color, transition } from 'ui/theme';


const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  color: #828282;
  transition: color ${transition}, opacity ${transition};
  
  ${p => css`
  
    ${p.disabled && css`
      opacity: 0.5;
    `}
    
    ${p.error && !p.disabled && css`
      color: ${color.error};
    `}
  
    ${p.icon && css`

      svg {
        font-size: 1.5rem;
      }
  
      ${p.iconPosition === 'left' && css`
        
        span {
          margin-left: 1.2rem;
        }
      `}
  
      ${p.iconPosition === 'right' && css`
        
      span {
          margin-right: 1.2rem;
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


export const HelperText = (props) => {
  const icon = props.icon ? <Icon icon={ props.icon }/> : null;

  return (
    <Wrapper
      className={ props.className }
      icon={ props.icon }
      iconPosition={ props.iconPosition }
      iconRotation={ props.iconRotation }
      disabled={ props.disabled }
      error={ props.error }
    >
      { props.icon && props.iconPosition === 'left' && icon }
      <span>{ props.children }</span>
      { props.icon && props.iconPosition === 'right' && icon }
    </Wrapper>
  );
};


HelperText.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.any,
  iconPosition: PropTypes.string,
  iconRotation: PropTypes.number,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
    PropTypes.node,
  ]).isRequired,
};

HelperText.defaultProps = {
  disabled: false,
  error: false,
};
