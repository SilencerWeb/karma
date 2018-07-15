import * as React from 'react';
import styled, { css } from 'styled-components';
import { rgba } from 'polished';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import MDSpinner from 'react-md-spinner';

import { Icon } from 'ui/atoms';

import { upload } from 'ui/outlines';

import { font, color, transition } from 'ui/theme';

import { UPLOAD_FILE, DELETE_FILE } from 'graphql/mutations/file';


const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-family: ${font.family.secondary};
  text-transform: uppercase;
  color: ${color.text.secondary};
  background-color: ${color.primary};
  border-radius: 50%;
  transition: ${transition};
`;

const UploadAvatar = Overlay.extend`
  opacity: 0;
  visibility: hidden;
  cursor: pointer;
  
  input {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 0;
    opacity: 0;
  }
`.withComponent('label');

const RemoveAvatar = Overlay.extend`
  background-color: ${rgba(color.primary, 0.8)};
  opacity: 0;
  visibility: hidden;
  cursor: pointer;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  img {
    width: 100%;
    max-width: 100%;
  }
  
  svg {
    color: #ffffff;
  }
  
  ${p => css`
    
    ${p.size === 'lg' && css`
      width: 30rem;
      height: 30rem;
      
      svg {
        font-size: 10rem;
      }
      
      ${Overlay}, ${UploadAvatar}, ${RemoveAvatar} {
        font-size: 3.2rem;
      }
    `}
    
    ${p.size === 'md' && css`
      width: 15rem;
      height: 15rem;
      
      svg {
        font-size: 4.6rem;
      }
      
      ${Overlay}, ${UploadAvatar}, ${RemoveAvatar} {
        font-size: 1.8rem;
      }
    `}
    
    ${p.size === 'xs' && css`
      width: 4rem;
      height: 4rem;
      
      svg {
        font-size: 1.6rem;
      }
    `}
    
    ${p.new && css`
      background-color: ${color.primary};
    `}
    
    ${p.edit && css`

      &:hover {
      
        ${Overlay}, ${UploadAvatar}, ${RemoveAvatar} {
          opacity: 1;
          visibility: visible;
        }
      }
    `}
  `}
`;


export const Avatar = (props) => {

  return (
    <Wrapper
      className={ props.className }
      size={ props.size }
      new={ !props.url }
      edit={ props.edit }
    >
      {
        props.url ?
          <img src={ props.url } alt={ props.alt }/>
          :
          props.children || <Icon icon={ props.icon }/>
      }

      {
        props.edit &&
        <Mutation mutation={ UPLOAD_FILE }>
          { (uploadFile, { loading }) => {
            if (loading) {
              return (
                <Overlay>
                  <MDSpinner size={ 46 } singleColor={ '#fff' }/>
                </Overlay>
              );
            }

            return (
              props.url ?
                <React.Fragment>
                  <Mutation mutation={ DELETE_FILE }>
                    { (deleteFile) => (
                      <RemoveAvatar onClick={ () => props.onRemoveAvatarClick(deleteFile) }>
                        Delete
                      </RemoveAvatar>
                    ) }
                  </Mutation>
                </React.Fragment>
                :
                <UploadAvatar>
                  <Icon icon={ upload }/>

                  <input type={ 'file' } onChange={ (e) => props.onFileInputChange(e, uploadFile) }/>
                </UploadAvatar>
            );
          } }
        </Mutation>
      }
    </Wrapper>
  );
};


Avatar.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['lg', 'md', 'xs']),
  url: PropTypes.string,
  alt: PropTypes.string,
  icon: PropTypes.any,
  edit: PropTypes.bool,
  onRemoveAvatarClick: PropTypes.func,
  onFileInputChange: PropTypes.func,
  children: PropTypes.any,
};

Avatar.defaultProps = {
  size: 'md',
};
