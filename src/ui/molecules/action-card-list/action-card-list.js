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
      { props.actions.map((action) => {
        return (
          <ActionCardWrapper key={ action.id }>
            <ActionCard
              title={ action.title }
              date={ action.date }
              description={ action.description }
              karma={ action.karma }
              executors={ action.executors }
              members={ action.members }
              // eslint-disable-next-line
              onEditButtonClick={ () => console.log('edited!') }
              // eslint-disable-next-line
              onMoreButtonClick={ () => console.log('more') }
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
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      karma: PropTypes.string.isRequired,
      executors: PropTypes.string.isRequired,
      members: PropTypes.object,
    }),
  ).isRequired,
  isActionCreating: PropTypes.bool,
  onCancelButtonClick: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};
