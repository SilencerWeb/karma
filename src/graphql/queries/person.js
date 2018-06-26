import gql from 'graphql-tag';

export const GET_PERSONS = gql`
  {
    persons {
      id
      name
      position
      description
      karma
    }
  }
`;
