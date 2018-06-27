import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { media } from 'ui/mixins';


export const Container = styled.div`
  max-width: 114rem;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  
  ${media.down.lg(css`
    max-width: 96rem;
  `)}
  
  ${media.down.md(css`
    max-width: 72rem;
  `)}
  
  ${media.down.sm(css`
    max-width: 57.6rem;
  `)}
  
  ${media.down.xs(css`
    max-width: 100%;
    padding-right: 1.5rem;
    padding-left: 1.5rem;
  `)}
`;


Container.propTypes = {};
