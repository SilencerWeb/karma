import gql from 'graphql-tag';

export const CREATE_PERSON_SUBSCRIPTION = gql`
  subscription personUpdate {
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
