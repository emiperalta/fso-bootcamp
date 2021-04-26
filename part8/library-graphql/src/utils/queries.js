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
  query getBooks($genre: String) {
    allBooks(genre: $genre) {
      id
      title
      author {
        id
        name
        born
      }
      published
      genres
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
      author {
        name
        born
      }
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

export const LOGIN = gql`
  mutation userLogin($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const LOGGED_USER = gql`
  query loggedUser {
    me {
      username
      favoriteGenre
    }
  }
`;
