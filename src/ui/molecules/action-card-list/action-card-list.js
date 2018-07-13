import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { AppConsumer } from 'index';

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
      <AppConsumer>
        { (context) => (
          <React.Fragment>
            {
              context.actions && context.actions.filter((action) => {
                return action.members.some((member) => {
                  return member.isUser ? member.user.id === props.activeMemberId : member.person.id === props.activeMemberId;
                });
              }).map((action) => {
                const members = action.members.map((member) => {
                  return {
                    id: member.id,
                    personId: member.isUser ? member.user.id : member.person.id,
                    name: member.isUser ? member.user.name : member.person.name,
                    isUser: member.isUser,
                    side: member.side,
                  };
                });

                return (
                  <ActionCardWrapper key={ action.id }>
                    <ActionCard
                      id={ action.id }
                      title={ action.title }
                      date={ action.date }
                      description={ action.description }
                      karma={ action.karma }
                      executors={ action.executors }
                      members={ members }
                    />
                  </ActionCardWrapper>
                );
              })
            }

            <CreateActionCard
              activeMemberId={ props.activeMemberId }
              isCreating={ props.isActionCreating }
              onCancelButtonClick={ props.onCancelButtonClick }
              onSaveButtonClick={ props.onSaveButtonClick }
            />
          </React.Fragment>
        ) }
      </AppConsumer>
    </Wrapper>
  );
};


ActionCardList.propTypes = {
  className: PropTypes.string,
  activeMemberId: PropTypes.string,
  isActionCreating: PropTypes.bool,
  onCancelButtonClick: PropTypes.func,
  onSaveButtonClick: PropTypes.func,
};
