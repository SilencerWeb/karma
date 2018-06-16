// @flow
import * as React from 'react';
import styled, { css } from 'styled-components';


type props = {
  className?: string,
  src: {
    _1x: string,
    _2x: string,
  },
  alt: string,
};


const Wrapper = styled.div`

`;


export const RetinaImage = (props: props) => {
  return (
    <img
      className={ props.className }
      src={ props.src._1x }
      srcSet={ props.src._2x && `${props.src._2x} 2x` }
      alt={ props.alt }
    />
  );
};
