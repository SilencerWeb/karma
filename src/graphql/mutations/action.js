import gql from 'graphql-tag';

export const CREATE_ACTION = gql`
  mutation createAction(
    $title: String!,
    $date: String!,
    $description: String,
    $karma: String!,
    $executors: String!,
    $members: [CreateActionMemberInput!]!,
  ) {
    createAction(
      title: $title,
      date: $date,
      description: $description,
      karma: $karma,
      executors: $executors,
      members: $members,
    ) {
      id
      title
      date
      description
      karma
      executors
      members {
        id
        person {
          id
          name
        }
        user {
          id
          name
        }
        isUser
        side
      }
    }
  }
`;

export const UPDATE_ACTION = gql`
  mutation updateAction(
    $id: ID!,
    $title: String,
    $date: String,
    $description: String,
    $karma: String,
    $executors: String,
    $members: [UpdateActionMemberInput!],
  ) {
    updateAction(
      id: $id,
      title: $title,
      date: $date,
      description: $description,
      karma: $karma,
      executors: $executors,
      members: $members,
    ) {
      id
      title
      date
      description
      karma
      executors
      members {
        id
        person {
          id
          name
        }
        user {
          id
          name
        }
        isUser
        side
      }
    }
  }
`;

export const DELETE_ACTION = gql`
  mutation deleteAction(
    $id: ID!,
  ) {
    deleteAction(
      id: $id,
    ) {
      id
      title
    }
  }
`;
