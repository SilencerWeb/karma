import gql from 'graphql-tag';

export const CREATE_ACTION = gql`
  mutation createAction(
    $title: String!,
    $date: String!,
    $description: String!,
    $karma: String!,
    $executors: String!,
    $members: [ActionMemberInput!]!,
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
