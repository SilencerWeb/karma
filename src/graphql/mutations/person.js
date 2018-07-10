import gql from 'graphql-tag';

export const CREATE_PERSON = gql`
  mutation createPerson(
    $avatar: ID,
    $name: String!,
    $position: String!,
    $description: String
  ) {
    createPerson(
      avatar: $avatar,
      name: $name,
      position: $position,
      description: $description,
    ) {
      id
      avatar {
        url
      }
      name
      position
      description
      karma
    }
  }
`;

export const UPDATE_PERSON = gql`
  mutation updatePerson(
    $id: ID!,
    $name: String, 
    $position: String, 
    $description: String
  ) {
    updatePerson(
      id: $id,
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

export const DELETE_PERSON = gql`
  mutation deletePerson(
    $id: ID!,
  ) {
    deletePerson(
      id: $id,
    ) {
      id
    }
  }
`;
