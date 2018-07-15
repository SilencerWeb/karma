import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';


ReactModal.setAppElement('#root');


const ChildrenWrapper = styled.div`
  max-width: 50rem;
  background-color: #ffffff;
  border-radius: 1.6rem;
  box-shadow: 0 0.4rem 0.8rem rgba(176, 190, 197, 0.24);
  padding-top: 3.2rem;
  padding-right: 3.2rem;
  padding-bottom: 3.2rem;
  padding-left: 3.2rem;
`;


export const Modal = (props) => {
  return (
    <ReactModal
      className={ 'modal' }
      isOpen={ props.isOpen }
    >
      <ChildrenWrapper>
        { props.children }
      </ChildrenWrapper>
    </ReactModal>
  );
};


Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};
