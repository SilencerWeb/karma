import gql from 'graphql-tag';

export const PERSONS = gql`
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
