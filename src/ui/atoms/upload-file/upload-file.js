import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { Button } from 'ui/atoms';

import { attachmentClip } from 'ui/outlines';


const FileInput = styled.input.attrs({ type: 'file' })`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: inline-block;
  vertical-align: top;
  width: 100%;
  height: 100%;
  font-size: 0;
  opacity: 0;
  cursor: pointer;
`;

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  vertical-align: top;
`;


export const UploadFile = (props) => {
  return (
    <Wrapper className={ props.className }>
      <Button
        type={ 'flat' }
        icon={ attachmentClip }
        iconPosition={ 'left' }
      >
        { props.children }

        <FileInput name={ props.name }/>
      </Button>
    </Wrapper>
  );
};


UploadFile.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  children: PropTypes.string.isRequired,
};
