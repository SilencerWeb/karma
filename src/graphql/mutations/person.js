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
        id
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
    $avatar: ID,
    $deleteAvatar: Boolean,
    $name: String, 
    $position: String, 
    $description: String
  ) {
    updatePerson(
      id: $id,
      avatar: $avatar,
      deleteAvatar: $deleteAvatar,
      name: $name,
      position: $position,
      description: $description,
    ) {
      id
      avatar {
        id
        url
      }
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
