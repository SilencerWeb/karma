import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { transition } from 'ui/theme';


const Wrapper = styled.div`
  max-width: 50rem;
  background-color: #ffffff;
  border-radius: 1.6rem;
  box-shadow: 0 0.4rem 0.8rem rgba(176, 190, 197, 0.24);
  padding-top: 3.2rem;
  padding-right: 3.2rem;
  padding-bottom: 3.2rem;
  padding-left: 3.2rem;
  margin-right: auto;
  margin-left: auto;
  opacity: 0;
  visibility: hidden;
  transition: ${transition};
  
  ${p => css`
    
    ${p.visible && css`
      opacity: 1;
      visibility: visible;
    `}
  `}
`;


export class Modal extends React.Component {
  state = {};

  render() {
    return (
      <Wrapper className={ this.props.className } visible={ this.props.visible }>
        { this.props.children }
      </Wrapper>
    );
  }
}


Modal.propTypes = {
  className: PropTypes.string,
  visible: PropTypes.bool,
  children: PropTypes.element.isRequired,
};
