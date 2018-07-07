import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';


const Wrapper = styled.div`
  max-width: 50rem;
  background-color: #ffffff;
  border-radius: 1.6rem;
  box-shadow: 0 0.4rem 0.8rem rgba(176, 190, 197, 0.24);
  padding-top: 3.2rem;
  padding-right: 3.2rem;
  padding-bottom: 3.2rem;
  padding-left: 3.2rem;
`;


export class Modal extends React.Component {
  state = {};

  render() {
    return (
      <Wrapper className={ this.props.className }>
        { this.props.children }
      </Wrapper>
    );
  }
}


Modal.propTypes = {
  className: PropTypes.string,
  children: PropTypes.element.isRequired,
};
