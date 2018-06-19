import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';


const Wrapper = styled.svg`
  display: inline-block;
  vertical-align: top;

  ${p => css`

    ${p.svgWidth && p.svgHeight && css`
      width: ${p.svgWidth / p.svgHeight}em;
      height: 1em;
      font-size: ${p.height || p.svgHeight / 10}rem; // p.svgHeight / 10 is transfer from PX into REM
    `};
  `}

  fill: currentColor;
`;


export const Icon = (props) => {
  const svgWidth = props.icon.node.viewBox.animVal.width;
  const svgHeight = props.icon.node.viewBox.animVal.height;

  return (
    <Wrapper className={ props.className } svgWidth={ svgWidth } svgHeight={ svgHeight } height={ props.height }>
      <use xlinkHref={ `#${props.icon.id}` }/>
    </Wrapper>
  );
};


Icon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.any.isRequired,
  height: PropTypes.number,
};
