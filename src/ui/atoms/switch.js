import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { color, transition } from 'ui/theme';


const Track = styled.div`
  width: 3.4rem;
  height: 1.4rem;
  background: #3c4858;
  border-radius: 10rem;
  opacity: 0.24;
  transition: ${transition};
`;

const Thumb = styled.span`
  position: absolute;
  top: 50%;
  left: -0.4rem;
  width: 2rem;
  height: 2rem;
  background: #f1f1f1;
  border-radius: 50%;
  box-shadow: 0 0.1rem 0.2rem rgba(60, 72, 88, 0.24);
  transform: translateY(-50%);
  transition: ${transition};
`;

const IconWrapper = styled.div`
  position: relative;
  margin-right: 0.8rem;
  margin-left: 0.8rem;
`;

const Wrapper = styled.label`
  position: relative;
  display: flex;
  width: fit-content;
  align-items: center;
  transition: ${transition};
  
  input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    visibility: hidden;
    
    &:checked {
    
      ~ ${Track} {
        background-color: ${color.primary};
      }
    
      ~ ${Thumb} {
        left: -0.2rem;
        background-color: ${color.primary};
        box-shadow: 0 0.1rem 0.2rem rgba(0, 181, 255, 0.48);
        transform: translate(100%, -50%);
      }
    }
  }
  
  ${p => css`
  
    ${p.disabled && css`
      opacity: 0.5;
      cursor: not-allowed;
    `}
  `}
`;


export const Switch = (props) => {
  return (
    <Wrapper className={ props.className } disabled={ props.disabled }>
      <span>{ props.content.off }</span>
      <IconWrapper>
        <input type="checkbox" checked={ props.checked } disabled={ props.disabled }/>
        <Track/>
        <Thumb/>
      </IconWrapper>
      <span>{ props.content.on }</span>
    </Wrapper>
  );
};


Switch.propTypes = {
  className: PropTypes.string,
  content: {
    off: PropTypes.string.isRequired,
    on: PropTypes.string.isRequired,
  },
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
};

Switch.propTypes = {
  disabled: false,
};
