import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name,
      born,
      bookCount,
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title,
      published,
      author,
      genres,
      id
    }
  }
`

export const ADD_BOOK = gql`
  mutation newBook($title: String!, $published: Int!, $author: String!, $genres: [String]) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      title
      published
      author
      genres
      id
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation changeBorn($name: String!, $born: Int!) {
    editAuthor(name: $name, setBirth: $born) {
      name
      born
      bookCount
      id
    }
  }
`