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
  
      ${p.icon.position === 'left' && css`
        
        span {
          margin-left: 1.2rem;
        }
      `}
  
      ${p.icon.position === 'right' && css`
        
      span {
          margin-right: 1.2rem;
        }
      `}
      
      
      ${p.icon.rotation && p.icon.rotation > 0 && css`
  
        svg {
          transform: rotate(${p.icon.rotation}deg);
        }
      `}
    `}
  `}
`;


export const HelperText = (props) => {
  const icon = props.icon && props.icon.svg ? <Icon icon={ props.icon.svg }/> : null;

  return (
    <Wrapper
      className={ props.className }
      disabled={ props.disabled }
      error={ props.error }
      icon={ props.icon && {
        position: props.icon.position,
        rotation: props.icon.rotation,
      } }
    >
      { props.icon && props.icon.position === 'left' && icon }
      <span>{ props.children }</span>
      { props.icon && props.icon.position === 'right' && icon }
    </Wrapper>
  );
};


HelperText.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.shape({
    svg: PropTypes.any.isRequired,
    position: PropTypes.string.isRequired,
    rotation: PropTypes.number,
  }),
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  children: PropTypes.string.isRequired,
};

HelperText.defaultProps = {
  disabled: false,
  error: false,
};
