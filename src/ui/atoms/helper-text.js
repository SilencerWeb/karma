import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { Icon } from 'ui/atoms';

import { transition } from 'ui/theme';


const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  color: #828282;
  transition: color ${transition}, opacity ${transition};
  
  svg {
    font-size: 1.5rem;
  }
  
  ${p => css`
  
    ${p.disabled && css`
      opacity: 0.5;
    `}
    
    ${p.error && !p.disabled && css`
      color: #db4437;
    `}
  
    ${p.icon && css`
  
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
      
      
      ${p.icon.rotation && css`
  
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
  id: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.shape({
    svg: PropTypes.any.isRequired,
    position: PropTypes.string,
    rotation: PropTypes.number,
  }),
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  children: PropTypes.string.isRequired,
};

HelperText.defaultProps = {
  icon: {
    position: 'right',
    rotation: 0,
  },
  disabled: false,
  error: false,
};
