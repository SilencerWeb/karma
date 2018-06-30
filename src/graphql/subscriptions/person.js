import gql from 'graphql-tag';

export const PERSON_SUBSCRIPTION = gql`
  subscription personUpdate {
    personUpdate {
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
