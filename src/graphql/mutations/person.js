import gql from 'graphql-tag';

export const CREATE_PERSON = gql`
  mutation createPerson(
    $name: String!, 
    $position: String!, 
    $description: String 
  ) {
    createPerson(
      name: $name,
      position: $position,
      description: $description,
    ) {
      id
      name
      position
      description
      karma
    }
  }
`;
