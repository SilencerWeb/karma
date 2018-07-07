import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { transition } from 'ui/theme';


const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transition: ${transition};
  
  ${p => css`
  
    ${p.visible && css`
      opacity: 1;
      visibility: visible;
    `}
  `}
`;


export const Overlay = (props) => {
  return (
    <Wrapper className={ props.className } visible={ props.visible }/>
  );
};


Overlay.propTypes = {
  className: PropTypes.string,
  visible: PropTypes.bool,
};
