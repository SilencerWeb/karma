// @flow
import * as React from 'react';
import styled, { css } from 'styled-components';

import { Icon } from 'ui/atoms';

import { color } from 'ui/theme';


type props = {
  className?: string,
  tag?: string,
  type?: string,
  theme?: string,
  icon?: {
    svg: any,
    height?: number,
    position?: string,
    rotation?: number,
  },
  attributes?: {
    string: any,
  },
  onClick?: Function,
  children: React.Node,
};

const Wrapper = styled.button`
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
    vertical-align: middle;
  }

  ${props => props.buttonType === 'raised' && css`
    color: ${color.text.secondary};
    background-color: ${props => props.theme === 'primary' ? color.primary : color.secondary};
    border-radius: 0.4rem;
    box-shadow: 0 0.4rem 0.8rem rgba(176, 190, 197, 0.24);
  `}

  ${props => props.buttonType === 'flat' && css`
    color: ${props => props.theme === 'primary' ? color.primary : color.secondary};
    background-color: transparent;
  `}
  
  ${props => props.icon && props.icon.isIconic && css`

    ${props.icon.position === 'left' ? css`
      padding-left: 1.2rem;
      
      span {
        margin-left: 2rem;
      }
    ` : css`
      padding-right: 1.2rem;
      
      span {
        margin-right: 2rem;
      }
    `}
    
    ${props.icon.rotation && css`
      svg {
        transform: rotate(${props.icon.rotation}deg);
      }
    `}
  `}
`;

export const Button = (props: props) => {
  const DEFAULT_ICON_HEIGHT = 1.6;

  let icon;

  if (props.icon && props.icon.svg) {
    const iconHeight = props.icon.height || DEFAULT_ICON_HEIGHT;

    icon = <Icon icon={ props.icon.svg } height={ iconHeight }/>;
  }

  const WrapperWithAnotherTag = props.tag && props.tag !== 'button' ?
    Wrapper.withComponent(props.tag) : Wrapper;

  return (
    <WrapperWithAnotherTag
      className={ props.className }
      buttonType={ props.type || 'raised' }
      theme={ props.theme || 'primary' }
      icon={ props.icon && {
        isIconic: props.icon.svg,
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
      { props.icon && props.icon.position !== 'left' && icon /* Default icon position */ }
    </WrapperWithAnotherTag>
  );
};
