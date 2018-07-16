import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { ActionConfirmation } from 'ui/molecules';


export const CancelActionConfirmation = (props) => {
  const title = props.title ?
    `Are you sure that you want to cancel ${props.actionType} ${props.type} '${props.title}'?`
    :
    `Are you sure that you want to cancel ${props.actionType} this ${props.type}?`;

  const rejectButtonText = props.actionType === 'updating' ? 'No, continue editing' : `No, continue ${props.actionType}`;
  const confirmButtonText = props.actionType === 'updating' ? 'Yes, discard changes' : `Yes, cancel ${props.actionType}`;

  return (
    <div className={ props.className }>
      <ActionConfirmation
        title={ title }
        note={ 'You will not be able to restore data, even I will not be able to help you :(' }
        rejectButtonText={ rejectButtonText }
        confirmButtonText={ confirmButtonText }
        onRejectButtonClick={ props.onRejectButtonClick }
        onConfirmButtonClick={ props.onConfirmButtonClick }
      />
    </div>
  );
};


CancelActionConfirmation.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(['person', 'action']).isRequired,
  actionType: PropTypes.oneOf(['updating', 'creating']).isRequired,
  title: PropTypes.string.isRequired,
  onRejectButtonClick: PropTypes.func.isRequired,
  onConfirmButtonClick: PropTypes.func,
};
