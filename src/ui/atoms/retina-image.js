import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';


const Wrapper = styled.div`

`;


export const RetinaImage = (props) => {
  return (
    <img
      className={ props.className }
      src={ props.src._1x }
      srcSet={ `${props.src._2x} 2x` }
      alt={ props.alt }
    />
  );
};


RetinaImage.propTypes = {
  className: PropTypes.string,
  src: PropTypes.shape({
    _1x: PropTypes.string.isRequired,
    _2x: PropTypes.string.isRequired,
  }).isRequired,
  alt: PropTypes.string.isRequired,
};
