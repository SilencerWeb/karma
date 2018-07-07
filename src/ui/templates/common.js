import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { Container } from 'ui/atoms';

import { Header, Footer } from 'ui/molecules';


const ContainerInner = styled.div`
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  > ${Container} {
    flex-grow: 1;
    display: flex;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
  
  ${p => css`
    
    ${p.centeredContent && css`
      > ${Container} {
        align-items: center;
      }
    `}
  `}
`;


export const CommonTemplate = (props) => {
  return (
    <Wrapper centeredContent={ props.centeredContent }>
      <Header/>
      <Container>
        <ContainerInner>
          { props.children }
        </ContainerInner>
      </Container>
      <Footer/>
    </Wrapper>
  );
};


CommonTemplate.propTypes = {
  centeredContent: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
