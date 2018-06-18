import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { transition } from 'ui/theme';


export const Label = styled.label`
  display: inline-block;
  vertical-align: top;
  width: 100%;
  font-size: 1.2rem;
  color: #828282;
  margin-bottom: 0.8rem;
  transition: color ${transition}, opacity ${transition};
  
  &:last-child {
    margin-bottom: 0;
  }
  
  ${p => css`
  
    ${p.error && !p.disabled && css`
      color: #db4437;
    `}
    
    ${p.disabled && css`
      opacity: 0.5;
    `}
  `}
`;


Label.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  children: PropTypes.string.isRequired,
};

Label.defaultProps = {
  disabled: false,
  error: false,
};
