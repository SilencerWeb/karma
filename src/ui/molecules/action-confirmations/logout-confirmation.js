import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { AppConsumer } from 'index';

import { Button, Heading } from 'ui/atoms';

import { exit } from 'ui/outlines';

import { color } from 'ui/theme';

import { AUTH_TOKEN } from 'constants.js';


const Highlight = styled.span`
  display: inline-block;
  vertical-align: top;
  color: ${color.primary};
`;

const Title = Heading.withComponent('h2');

const Header = styled.div`
  margin-bottom: 4rem;
`;

const ActionConfirmationButton = styled(Button)`
  margin-right: 0.8rem;
  
  &:last-child {
    margin-right: 0;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Wrapper = styled.div`
`;


export const LogoutConfirmation = (props) => {
  return (
    <Wrapper className={ props.className }>
      <AppConsumer>
        { (context) => (
          <React.Fragment>
            <Header>
              <Title tag={ 'h3' } type={ 'title' }>
                Are you sure that you want to
                <Highlight>&nbsp;logout</Highlight>
                ?
              </Title>
            </Header>

            <Footer>
              <ActionConfirmationButton
                type={ 'flat' }
                onClick={ () => context.hideModal() }
              >
                No, stay logged in
              </ActionConfirmationButton>

              <ActionConfirmationButton
                icon={ exit }
                iconPosition={ 'right' }
                onClick={ () => {
                  localStorage.removeItem(AUTH_TOKEN);

                  context.hideModal();

                  context.logout();
                } }
              >
                Yes, logout
              </ActionConfirmationButton>
            </Footer>
          </React.Fragment>
        ) }
      </AppConsumer>
    </Wrapper>
  );
};


LogoutConfirmation.propTypes = {
  className: PropTypes.string,
};
