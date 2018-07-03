import gql from 'graphql-tag';

export const CREATE_PERSON_SUBSCRIPTION = gql`
  subscription personCreated {
    personCreated {
      node {
        id
        name
        position
        description
        karma
        author {
          nickname
        }
      }
    }
  }
`;

export const UPDATE_PERSON_SUBSCRIPTION = gql`
  subscription personUpdated {
    personUpdated {
      node {
        id
        name
        position
        description
        karma
        author {
          nickname
        }
      }
    }
  }
`;

export const DELETE_PERSON_SUBSCRIPTION = gql`
  subscription personDeleted {
    personDeleted {
      previousValues {
        id
      }
    }
  }
`;
