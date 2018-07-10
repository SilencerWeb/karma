import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { AppConsumer } from 'index';

import { PersonCard, CreatePersonCard } from 'ui/molecules';


const PersonCardWrapper = styled.div`
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  grid-column-gap: 1.6rem;
  grid-row-gap: 2rem;
`;


export const PersonCardList = (props) => {
  return (
    <AppConsumer>
      { (context) => (
        <Wrapper className={ props.className }>
          { context.persons && context.persons.length > 0 && context.persons.map((person) => {
            return (
              <PersonCardWrapper key={ person.id }>
                <PersonCard
                  id={ person.id }
                  avatar={ person.avatar ? person.avatar.url : null }
                  name={ person.name }
                  position={ person.position }
                  karma={ person.karma }
                  description={ person.description }
                  authorNickname={ person.author.nickname }
                />
              </PersonCardWrapper>
            );
          }) }
          <CreatePersonCard/>
        </Wrapper>
      ) }
    </AppConsumer>
  );
};


PersonCardList.propTypes = {
  className: PropTypes.string,
};
