import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { Container, Button } from 'ui/atoms';


const Copyright = styled.p`
  margin-top: 0;
  margin-bottom: 0;
`;

const Wrapper = styled.div`
  background: #ffffff;
  box-shadow: 0px -0.4rem 0.8rem rgba(176, 190, 197, 0.24);
  padding-top: 2rem;
  padding-bottom: 2rem;
  
  ${Container} {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;


export const Footer = (props) => {
  return (
    <Wrapper className={ props.className }>
      <Container>
        <div>
          <Copyright>Copyright © 2018 by Gorodov Maksim. All rights reserved.</Copyright>
        </div>
        <div>
          <Button>Contact me</Button>
        </div>
      </Container>
    </Wrapper>
  );
};


Footer.propTypes = {
  className: PropTypes.string,
};
