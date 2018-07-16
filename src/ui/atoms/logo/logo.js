import * as React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { rgba } from 'polished';
import PropTypes from 'prop-types';

import { font, color } from 'ui/theme';


const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  font-family: ${font.family.secondary};
  font-size: 2rem;
  line-height: 1;
  text-decoration: none;
  color: ${color.text.secondary};
  background-image: linear-gradient(to right bottom, ${color.primary}, ${color.secondary});
  border-radius: 50%;
  box-shadow: 0 0.4rem 0.8rem 0 ${rgba(color.primary, 0.24)};
`;


export const Logo = (props) => {
  return (
    <Wrapper className={ props.className }>
      K
    </Wrapper>
  );
};


Logo.propTypes = {
  className: PropTypes.string,
};
