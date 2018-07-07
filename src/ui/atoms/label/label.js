import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { color, transition } from 'ui/theme';


export const Label = styled.label`
  display: inline-block;
  vertical-align: top;
  width: 100%;
  font-size: 1.2rem;
  color: #828282;
  padding-bottom: 0.8rem;
  transition: color ${transition}, opacity ${transition};
  
  &:last-child {
    margin-bottom: 0;
  }
  
  ${p => css`
    
    ${p.disabled && css`
      opacity: 0.5;
    `}
  
    ${p.error && !p.disabled && css`
      color: ${color.error};
    `}
  `}
`;


Label.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  children: PropTypes.any.isRequired,
};

Label.defaultProps = {
  disabled: false,
  error: false,
};
