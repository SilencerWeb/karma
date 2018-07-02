import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { ActionCard, CreateActionCard } from 'ui/molecules';


const ActionCardWrapper = styled.div`
`;

const Wrapper = styled.div`
  display: grid;
  grid-row-gap: 1.2rem;
`;


export const ActionCardList = (props) => {
  return (
    <Wrapper className={ props.className }>
      { props.actions && props.actions.map((action) => {
        return (
          <ActionCardWrapper key={ action.id }>
            <ActionCard
              id={ action.id }
              title={ action.title }
              date={ action.date }
              description={ action.description }
              karma={ action.karma }
              executors={ action.executors }
              members={ action.members }
            />
          </ActionCardWrapper>
        );
      }) }

      <CreateActionCard
        isCreating={ props.isActionCreating }
        onCancelButtonClick={ props.onCancelButtonClick }
        onSaveButtonClick={ props.onSaveButtonClick }
      />
    </Wrapper>
  );
};


ActionCardList.propTypes = {
  className: PropTypes.string,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      karma: PropTypes.string.isRequired,
      executors: PropTypes.string.isRequired,
      members: PropTypes.arrayOf(
        PropTypes.shape({
          person: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
          }),
          user: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
          }),
          isUser: PropTypes.bool.isRequired,
          side: PropTypes.string.isRequired,
        }),
      ),
    }),
  ),
  isActionCreating: PropTypes.bool,
  onCancelButtonClick: PropTypes.func,
  onSaveButtonClick: PropTypes.func,
};
