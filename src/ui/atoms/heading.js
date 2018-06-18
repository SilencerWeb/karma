import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { font, color } from 'ui/theme';


export const Heading = styled.h1`
  margin-top: 0;
  margin-bottom: 0;
  
  ${p => css`
  
    ${p.type === 'simple' && css`
      font-family: ${font.family.primary};
      font-weight: 300;
    `}
    
    ${p.type === 'title' && css`
      font-family: ${font.family.secondary};
      font-weight: 700;
    `}
    
    
    ${p.theme === 'dark' && css`
      color: ${color.text.primary};
    `}
    
    ${p.theme === 'light' && css`
      color: ${color.text.secondary};
    `}
    
    
    ${p.tag === 'h1' && css`
      font-size: 5.2rem;
    `}

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
      text-transform: uppercase;
      
      ${p.type !== 'title' && css`
        font-weight: 500;
      `}
    `}
  `}
`;


Heading.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  tag: PropTypes.string,
  type: PropTypes.string,
  theme: PropTypes.string,
};

Heading.defaultProps = {
  tag: 'h1',
  type: 'simple',
  theme: 'dark',
};
