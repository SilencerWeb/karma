import gql from 'graphql-tag';

export const CREATE_ACTION_SUBSCRIPTION = gql`
  subscription actionCreated {
    actionCreated {
      node {
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
  }
`;

export const UPDATE_ACTION_SUBSCRIPTION = gql`
  subscription actionUpdated {
    actionUpdated {
      node {
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
  }
`;

export const DELETE_ACTION_SUBSCRIPTION = gql`
  subscription actionDeleted {
    actionDeleted {
      previousValues {
        id
      }
    }
  }
`;
