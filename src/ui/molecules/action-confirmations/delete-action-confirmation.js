import * as React from 'react';
import styled, { css } from 'styled-components';
import { lighten } from 'polished';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import { AppConsumer } from 'index';

import { Button, Heading } from 'ui/atoms/index';

import { trashCan } from 'ui/outlines/index';

import { color } from 'ui/theme';

import { DELETE_ACTION } from 'graphql/mutations/action';


const Highlight = styled.span`
  display: inline-block;
  vertical-align: top;
  color: ${color.error};
`;

const Title = Heading.extend`
  margin-bottom: 1.2rem;
`.withComponent('h2');

const Note = styled.p`
  margin-top: 0;
  margin-bottom: 0;
`;

const Header = styled.div`
  margin-bottom: 4rem;
`;

const ActionConfirmationButton = styled(Button)`
  margin-right: 0.8rem;
  
  &:last-child {
    margin-right: 0;
  } 
  
  ${p => css`
    
    ${p.delete && css`
      background-color: ${color.error};
      
      &:hover {
        background-color: ${lighten(0.15, color.error)};
      }
    `}
  `}
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Wrapper = styled.div`
`;


export const DeleteActionConfirmationComponent = (props) => {
  const action = props.context.actions.find((action) => {
    return action.id === props.id;
  });

  return (
    <Wrapper className={ props.className }>
      <Header>
        <Title tag={ 'h3' } type={ 'title' }>
          Are you sure that you want to
          <Highlight>&nbsp;delete&nbsp;</Highlight>
          action '{ action.title }'?
        </Title>
        <Note>You will not be able to restore data, even I will not be able to help you :(</Note>
      </Header>

      <Footer>
        <ActionConfirmationButton
          type={ 'flat' }
          onClick={ () => props.context.hideModal() }
        >
          No, cancel
        </ActionConfirmationButton>

        <Mutation mutation={ DELETE_ACTION }>
          { (deleteAction, { loading, error }) => {
            if (error) {
              return <div>mutation DELETE_ACTION got error: ${ error.message }</div>;
            } else if (loading) {
              return <div>mutation DELETE_ACTION is loading...</div>;
            }

            return (
              <ActionConfirmationButton
                icon={ trashCan }
                iconPosition={ 'left' }
                delete
                onClick={ () => {
                  deleteAction({
                    variables: {
                      id: props.id,
                    },
                  }).then(() => {
                    props.context.hideModal();

                    props.context.changeActionForDeleteId(null);
                  });
                } }
              >
                Yes, delete this action
              </ActionConfirmationButton>
            );
          }
          }
        </Mutation>
      </Footer>
    </Wrapper>
  );
};


DeleteActionConfirmationComponent.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  context: PropTypes.object,
};


const DeleteActionConfirmationWithContext = React.forwardRef((props, ref) => (
  <AppConsumer>
    { (context) => <DeleteActionConfirmationComponent { ...props } context={ context } ref={ ref }/> }
  </AppConsumer>
));

export const DeleteActionConfirmation = DeleteActionConfirmationWithContext;
