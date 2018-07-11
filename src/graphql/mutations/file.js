import gql from 'graphql-tag';

export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      id
      url
    }
  }
`;

export const DELETE_FILE = gql`
  mutation deleteFile($id: ID!) {
    deleteFile(id: $id) {
      id
      url
    }
  }
`;
