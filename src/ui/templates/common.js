import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { Container } from 'ui/atoms';

import { Header, Footer } from 'ui/molecules';


const Wrapper = styled.div`

  > ${Container} {
    padding-top: 2rem;
    padding-bottom: 6rem;
  }
`;


export const CommonTemplate = (props) => {
  return (
    <Wrapper>
      <Header/>
      <Container>
        { props.children }
      </Container>
      <Footer/>
    </Wrapper>
  );
};


CommonTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};
