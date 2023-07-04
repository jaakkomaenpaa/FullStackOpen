import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`
export const ALL_BOOKS = gql`
  query get($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const ADD_BOOK = gql`
  mutation add($title: String!, $author: String!, $publishYear: Int!, $genres: [String!]!) {
    addBook (
      title: $title,
      author: $author,
      published: $publishYear,
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation edit($name: String!, $birthYear: Int!) {
    editAuthor (
      name: $name,
      setBornTo: $birthYear
    ) {
      name
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login (
      username: $username,
      password: $password
    ) {
      value
    }
  }
`

export const ALL_GENRES = gql`
  query {
    allGenres
  }
`

export const ME = gql`
  query {
    me {
      favoriteGenre
    }
  }
`