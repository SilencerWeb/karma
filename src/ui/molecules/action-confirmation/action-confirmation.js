import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { Button, Heading } from 'ui/atoms';


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
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
`;


export const ActionConfirmation = (props) => {
  return (
    <div className={ props.className }>
      <Header>
        <Title tag={ 'h3' } type={ 'title' }>{ props.title }</Title>
        { props.note && <Note>{ props.note }</Note> }
      </Header>

      <Footer>
        {
          props.rejectButton ?
            props.rejectButton
            :
            <ActionConfirmationButton
              type={ 'flat' }
              onClick={ props.onRejectButtonClick }
            >
              { props.rejectButtonText }
            </ActionConfirmationButton>
        }

        {
          props.confirmButton ?
            props.confirmButton
            :
            <ActionConfirmationButton onClick={ props.onConfirmButtonClick }>
              { props.confirmButtonText }
            </ActionConfirmationButton>
        }
      </Footer>
    </div>
  );
};


ActionConfirmation.propTypes = {
  className: PropTypes.string,
  title: PropTypes.any.isRequired,
  note: PropTypes.any,
  rejectButton: PropTypes.any,
  rejectButtonText: PropTypes.any,
  confirmButton: PropTypes.any,
  confirmButtonText: PropTypes.any,
  onRejectButtonClick: PropTypes.func,
  onConfirmButtonClick: PropTypes.func,
};
