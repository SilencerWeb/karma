import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { ActionConfirmation } from 'ui/molecules';


export const CancelCreatingPersonConfirmation = (props) => {
  if (!props.person) return null;

  return (
    <div className={ props.className }>
      <ActionConfirmation
        title={ `Are you sure that you want to cancel creating person '${props.person.name}'?` }
        note={ 'You will not be able to restore data, even I will not be able to help you :(' }
        rejectButtonText={ 'No, continue creating' }
        confirmButtonText={ 'Yes, cancel creating' }
        onRejectButtonClick={ props.onRejectButtonClick }
        onConfirmButtonClick={ props.onConfirmButtonClick }
      />
    </div>
  );
};


CancelCreatingPersonConfirmation.propTypes = {
  className: PropTypes.string,
  person: PropTypes.object.isRequired,
  onRejectButtonClick: PropTypes.func.isRequired,
  onConfirmButtonClick: PropTypes.func,
};
