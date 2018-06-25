import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { color } from 'ui/theme';


const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  line-height: 1;
  text-decoration: none;
  color: ${color.text.secondary};
  background-image: linear-gradient(to top, #d500f9, #ff1744);
  border-radius: 50%;
  box-shadow: 0 0.4rem 0.8rem 0 rgba(235, 11, 159, 0.24);
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
