import * as React from 'react';
import styled, { css } from 'styled-components';
import { lighten } from 'polished';
import PropTypes from 'prop-types';

import { AppConsumer } from 'index';

import { Button, Heading } from 'ui/atoms/index';

import { color } from 'ui/theme';


const Highlight = styled.span`
  display: inline-block;
  vertical-align: top;
  color: ${color.primary};
`;

const Title = Heading.extend`
  margin-bottom: 1.2rem;
`.withComponent('h2');

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


export const DiscardCreatingPersonConfirmationComponent = (props) => {
  return (
    <Wrapper className={ props.className }>
      <Header>
        <Title tag={ 'h3' } type={ 'title' }>
          Are you sure that you want to
          <Highlight>&nbsp;discard&nbsp;</Highlight>
          creating new person?
        </Title>
      </Header>

      <Footer>
        <ActionConfirmationButton
          type={ 'flat' }
          onClick={ () => props.context.hideModal() }
        >
          No, cancel discarding
        </ActionConfirmationButton>

        <ActionConfirmationButton
          onClick={ () => {
            props.context.discardConfirmationFunction();

            props.context.hideModal();
          } }
        >
          Yes, discard creating
        </ActionConfirmationButton>
      </Footer>
    </Wrapper>
  );
};


DiscardCreatingPersonConfirmationComponent.propTypes = {
  className: PropTypes.string,
  context: PropTypes.object,
};


const DiscardCreatingPersonConfirmationWithContext = React.forwardRef((props, ref) => (
  <AppConsumer>
    { (context) => <DiscardCreatingPersonConfirmationComponent { ...props } context={ context } ref={ ref }/> }
  </AppConsumer>
));


export const DiscardCreatingPersonConfirmation = DiscardCreatingPersonConfirmationWithContext;
