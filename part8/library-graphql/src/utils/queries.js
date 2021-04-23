import { gql } from '@apollo/client';

export const GET_AUTHORS = gql`
  query getAuthors {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`;

export const GET_BOOKS = gql`
  query getBooks {
    allBooks {
      id
      title
      author
      published
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation createNewBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      id
      title
      author
      published
      genres
    }
  }
`;

export const EDIT_BIRTHYEAR = gql`
  mutation edit_birthyear($name: String!, $newYear: Int!) {
    editAuthor(name: $name, setBornTo: $newYear) {
      id
      name
      born
    }
  }
`;
