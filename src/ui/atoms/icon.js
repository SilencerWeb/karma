import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';


const SVG = styled.svg`
  display: inline-block;
  vertical-align: top;

  ${(p) => p.icon && css`
    width: ${p.icon.node.viewBox.animVal.width / p.icon.node.viewBox.animVal.height}em;
    height: 1em;
    font-size: ${p.height || (p.icon.node.viewBox.animVal.height / 10)}rem;
  `};

  fill: currentColor;
`;

export const Icon = (props) => {
  return (
    <SVG className={ props.className } icon={ props.icon } height={ props.height }>
      <use xlinkHref={ `#${props.icon.id}` }/>
    </SVG>
  );
};

Icon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.any.isRequired,
  height: PropTypes.number,
};

Icon.defaultProps = {
  className: null,
  height: null,
};
