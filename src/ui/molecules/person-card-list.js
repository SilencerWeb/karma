import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { PersonCard, CreatePersonCard } from 'ui/molecules';


const PersonCardWrapper = styled.div`
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  grid-column-gap: 1.6rem;
  grid-row-gap: 2rem;
  grid-auto-rows: 1fr;
`;


export const PersonCardList = (props) => {
  return (
    <Wrapper className={ props.className }>
      { props.persons.map((person) => {
        return (
          <PersonCardWrapper key={ person.id }>
            <PersonCard
              avatar={ person.avatar }
              name={ person.name }
              position={ person.position }
              karma={ person.karma }
              description={ person.description }
            />
          </PersonCardWrapper>
        );
      }) }
      <CreatePersonCard onSaveButtonClick={ props.onSaveButtonClick }/>
    </Wrapper>
  );
};


PersonCardList.propTypes = {
  className: PropTypes.string,
  persons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      avatar: PropTypes.shape({
        _1x: PropTypes.string.isRequired,
        _2x: PropTypes.string.isRequired,
      }),
      name: PropTypes.string.isRequired,
      position: PropTypes.string.isRequired,
      karma: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
    }),
  ),
  onSaveButtonClick: PropTypes.func.isRequired,
};
