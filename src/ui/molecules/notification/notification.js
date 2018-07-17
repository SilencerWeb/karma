import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { Icon, Heading } from 'ui/atoms';

import { checkInCircle, block, roundInfoButton } from 'ui/outlines';

import { color } from 'ui/theme';


const StyledIcon = styled(Icon)`
  font-size: 2rem;
`;

const IconWrapper = styled.div`
  flex: 0 0 2rem;
  margin-right: 0.8rem;
`;

const Title = Heading.withComponent('h3');

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
`;

const Text = styled.p`
  padding-left: 2.8rem;
  margin-top: auto;
  margin-bottom: auto;
  
  span {
    font-weight: 500;
  }
`;

const Wrapper = styled.div`
  background-color: #ffffff;
  
  ${p => css`
  
    ${p.theme === 'success' && css`
      
      ${Title}, svg {
        color: #27ae60;
      }
    `}
    
    ${p.theme === 'error' && css`

      ${Title}, svg {
        color: ${color.error};
      }
    `}
    
    ${p.theme === 'info' && css`

      ${Title}, svg {
        color: ${color.primary};
      }
    `}
    
    ${p.theme === 'only-message' && css`

      ${Text} {
        padding-top: 0.8rem;
        padding-right: 0.8rem;
        padding-bottom: 0.8rem;
        padding-left: 0.8rem;
      }
    `}
  `}
`;


export const Notification = (props) => {
  let icon;
  let title;

  switch (props.theme) {
    case 'success':
      icon = checkInCircle;
      title = 'Success';
      break;
    case 'error':
      icon = block;
      title = 'Error';
      break;
    case 'info':
      icon = roundInfoButton;
      title = 'Info';
      break;
  }

  if (props.icon) icon = props.icon;

  if (props.title) title = props.title;

  return (
    <Wrapper className={ props.className } theme={ props.theme }>
      {
        props.theme !== 'only-message' &&
        <Header>
          <IconWrapper>
            <StyledIcon icon={ icon }/>
          </IconWrapper>

          <Title tag={ 'h4' } type={ 'title' }>{ title }</Title>
        </Header>
      }

      <Text>
        { props.message }
        <br/>
        { props.errorMessage && <span>Error: { props.errorMessage }</span> }
      </Text>
    </Wrapper>
  );
};


Notification.propTypes = {
  className: PropTypes.string,
  theme: PropTypes.oneOf(['success', 'error', 'info', 'only-message']).isRequired,
  icon: PropTypes.any,
  title: PropTypes.string,
  message: PropTypes.any.isRequired,
  errorMessage: PropTypes.string,
};
