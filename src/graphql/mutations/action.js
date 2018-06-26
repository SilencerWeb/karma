import gql from 'graphql-tag';

export const CREATE_ACTION = gql`
  mutation createAction(
    $title: String!,
    $date: String!,
    $description: String!,
    $karma: String!,
    $executors: String!,
    $authorId: ID!
  ) {
    createAction(
      title: $title,
      date: $date,
      description: $description,
      karma: $karma,
      executors: $executors,
      authorId: $authorId,
    ) {
      id
      title
      date
      description
      karma
      executors
    }
  }
`;
