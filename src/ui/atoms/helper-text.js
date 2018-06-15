// @flow
import * as React from 'react';
import styled, { css } from 'styled-components';

import { Icon } from 'ui/atoms';

import { transition } from 'ui/theme';


type props = {
  className?: string,
  disabled?: boolean,
  error?: boolean,
  icon?: {
    svg: any,
    height?: number,
    position?: string,
    rotation?: number,
  },
  children: string,
};


const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  color: #828282;
  transition: color ${transition}, opacity ${transition};
  
  ${p => p.disabled && css`
    opacity: 0.5;
  `}
  
  ${p => p.error && !p.disabled && css`
    color: #db4437;
  `}

  ${p => p.icon && css`

    ${p.icon.position === 'left' ? css`
      
      span {
        margin-left: 1.2rem;
      }
    ` : css`

      span {
        margin-right: 1.2rem;
      }
    `}
    
    // p.icon.rotation > 0 is because of the bug with styled-components where if you pass 0 it doesn't go below this line
    ${p.icon.rotation > 0 && css`

      svg {
        transform: rotate(${p.icon.rotation}deg);
      }
    `}
  `}
`;


export const HelperText = (props: props) => {
  const DEFAULT_HELPER_TEXT_ICON_HEIGHT = 1.5;

  let icon;

  if (props.icon && props.icon.svg) {
    let iconHeight = props.icon.height || DEFAULT_HELPER_TEXT_ICON_HEIGHT;

    icon = <Icon icon={ props.icon.svg } height={ iconHeight }/>;
  }

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
      { props.icon && props.icon.position !== 'left' && icon }
    </Wrapper>
  );
};
