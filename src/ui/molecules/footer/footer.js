import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { AppConsumer } from 'index';

import { Container, Button, Icon } from 'ui/atoms';

import { heart } from 'ui/outlines';

import { color } from 'ui/theme';


const MadeBy = styled.p`
  margin-top: 0;
  margin-bottom: 0;
  
  svg {
    vertical-align: middle;
    font-size: 1.6rem;
    color: ${color.error};
  }
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
      <AppConsumer>
        { (context) => (
          <Container>
            <div>
              <MadeBy>Made with <Icon icon={ heart }/> by Maksim Gorodov</MadeBy>
            </div>
            <div>
              <Button onClick={ () => context.showModal('ContactForm') }>Contact me</Button>
            </div>
          </Container>
        ) }
      </AppConsumer>
    </Wrapper>
  );
};


Footer.propTypes = {
  className: PropTypes.string,
};
