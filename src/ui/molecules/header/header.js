import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { AppConsumer } from 'index';

import { Logo, Button, RetinaImage, Container } from 'ui/atoms';

import { AUTH_TOKEN } from 'constants.js';


const Avatar = styled.div`
  width: 4rem;
  height: 4rem;
  margin-right: 1.6rem;
  
  img {
    max-width: 100%;
  }
`;

const ContainerRightSide = styled.div`
  display: flex;
  align-items: center;
  
  a, button {
    display: inline-block;
    vertical-align: top;
    margin-right: 0.8rem;
    
    &:last-child {
      margin-right: 0;
    }
  }
`;

const Wrapper = styled.header`
  background: #ffffff;
  box-shadow: 0 0.4rem 0.8rem rgba(176, 190, 197, 0.24);
  padding-top: 1.2rem;
  padding-bottom: 1.2rem;
  
  ${Container} {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;


export const Header = (props: props) => {
  const handleLogoutButtonClick = (context) => {
    localStorage.removeItem(AUTH_TOKEN);

    context.logout();
  };

  return (
    <Wrapper className={ props.className }>
      <AppConsumer>
        { (context) => (
          <Container>
            <div>
              <Link to={ '/' }>
                <Logo/>
              </Link>
            </div>
            <ContainerRightSide>
              {
                context.isLoggedIn ?
                  <React.Fragment>
                    <Link to={ '/my-actions' }>
                      <Button>
                        My actions
                      </Button>
                    </Link>
                    <Button onClick={ () => handleLogoutButtonClick(context) }>
                      Logout
                    </Button>
                  </React.Fragment>
                  :
                  <React.Fragment>
                    <Link to={ '/signup' }>
                      <Button>
                        Register
                      </Button>
                    </Link>

                    <Link to={ '/login' }>
                      <Button>
                        Login
                      </Button>
                    </Link>
                  </React.Fragment>
              }
            </ContainerRightSide>
          </Container>
        ) }
      </AppConsumer>
    </Wrapper>
  );
};


Header.propTypes = {
  className: PropTypes.string,
};
