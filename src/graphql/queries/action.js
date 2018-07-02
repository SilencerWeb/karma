import gql from 'graphql-tag';

export const GET_ACTIONS = gql`
  {
    actions {
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
