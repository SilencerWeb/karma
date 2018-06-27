import gql from 'graphql-tag';

export const SIGNUP = gql`
  mutation signup(
    $email: String!,
    $password: String!,
    $nickname: String!,
    $name: String
  ) {
    signup(
      email: $email,
      password: $password,
      nickname: $nickname,
      name: $name
    ) {
      token
      user {
        id
        email
        nickname
        name
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login(
    $login: String!,
    $password: String!,
  ) {
    login(
      login: $login,
      password: $password,
    ) {
      token
      user {
        id
        email
        nickname
        name
      }
    }
  }
`;
