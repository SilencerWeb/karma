import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { font, color } from 'ui/theme';


export const Heading = styled.h1`
  font-family: ${font.family.primary};
  font-size: 5.2rem;
  font-weight: 300;
  color: ${color.text.primary};
  margin-top: 0;
  margin-bottom: 0;
  
  ${p => p.type && p.type === 'title' && css`
    font-family: ${font.family.secondary};
    font-weight: 700;
  `}
  
  ${p => p.theme && p.theme === 'white' && css`
    color: ${color.text.secondary};
  `}
  
  ${p => p.tag && css`

    ${p.tag === 'h2' && css`
      font-size: 3.6rem;
    `}
    
    ${p.tag === 'h3' && css`
      font-size: 2.4rem;
    `}
    
    ${p.tag === 'h4' && css`
      font-size: 1.8rem;
    `}
    
    ${p.tag === 'h5' && css`
      font-size: 1.6rem;
    `}
    
    ${p.tag === 'h6' && css`
      font-size: 1.2rem;
      
      ${p.type && p.type !== 'title' && css`
        font-weight: 500;
        text-transform: uppercase;
      `}
    `}
  `}
`;


Heading.propTypes = {
  tag: PropTypes.string,
  type: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
};

Heading.defaultProps = {
  tag: 'h1',
};
