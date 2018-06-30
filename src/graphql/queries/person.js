import gql from 'graphql-tag';

export const GET_PERSONS = gql`
  {
    persons {
      id
      name
      position
      description
      karma
      author {
        nickname
      }
    }
  }
`;

export const GET_PERSON = gql`
  query person($id: ID!) {
    person(id: $id) {
      id
      name
      position
      description
      karma
    }
  }
`;
