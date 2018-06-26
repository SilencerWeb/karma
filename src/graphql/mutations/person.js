import gql from 'graphql-tag';

export const CREATE_PERSON = gql`
  mutation createPerson(
    $name: String!, 
    $position: String!, 
    $description: String! 
    $karma: Int!, 
    $authorId: ID!
  ) {
    createPerson(
      name: $name,
      position: $position,
      description: $description,
      karma: $karma,
      authorId: $authorId
    ) {
      id
      name
      position
      description
      karma
    }
  }
`;
