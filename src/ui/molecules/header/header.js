import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Logo, Button, RetinaImage, Container } from 'ui/atoms';

import avatar_1x from 'assets/images/avatars/sm/avatar.png';
import avatar_2x from 'assets/images/avatars/sm/avatar@2x.png';


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
  
  a {
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
  const avatarSources = {
    _1x: avatar_1x,
    _2x: avatar_2x,
  };

  return (
    <Wrapper className={ props.className }>
      <Container>
        <div>
          <Link to={ '/' }>
            <Logo/>
          </Link>
        </div>
        <ContainerRightSide>
          {
            props.isLoggedIn ?
              <React.Fragment>
                <Avatar>
                  <RetinaImage src={ avatarSources } alt={ '' }/>
                </Avatar>
                <Button>Add an action</Button>
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
    </Wrapper>
  );
};


Header.propTypes = {
  className: PropTypes.string,
  isLoggedIn: PropTypes.bool,
};
