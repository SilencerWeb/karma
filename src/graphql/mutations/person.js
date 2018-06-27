import gql from 'graphql-tag';

export const CREATE_PERSON = gql`
  mutation createPerson(
    $name: String!, 
    $position: String!, 
    $description: String 
    $karma: Int!, 
  ) {
    createPerson(
      name: $name,
      position: $position,
      description: $description,
      karma: $karma,
    ) {
      id
      name
      position
      description
      karma
    }
  }
`;
