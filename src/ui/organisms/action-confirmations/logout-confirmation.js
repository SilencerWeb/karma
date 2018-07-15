import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { AppConsumer } from 'index';

import { ActionConfirmation } from 'ui/molecules';


export const LogoutConfirmation = (props) => {
  return (
    <div className={ props.className }>
      <AppConsumer>
        { (context) => (
          <ActionConfirmation
            title={ 'Are you sure that you want to logout?' }
            rejectButtonText={ 'No, stay logged in' }
            confirmButtonText={ 'Yes, logout' }
            onRejectButtonClick={ props.onRejectButtonClick }
            onConfirmButtonClick={ props.onConfirmButtonClick }
          />
        ) }
      </AppConsumer>
    </div>
  );
};


LogoutConfirmation.propTypes = {
  className: PropTypes.string,
  onRejectButtonClick: PropTypes.func.isRequired,
  onConfirmButtonClick: PropTypes.func.isRequired,
};
