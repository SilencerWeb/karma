import gql from 'graphql-tag';

export const GET_USER = gql`
  {
    user {
      id
      email
      name
      nickname
    }
  }
`;
