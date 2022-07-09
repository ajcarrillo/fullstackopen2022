import { gql } from "@apollo/client"

export const ALL_BOOKS = gql`
  query allBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      title
      author {
        name
      }
      published
    }
  }
`

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
    }
  }
`

export const BOOK_ADDED_SUBSCRIPTION = gql`
  subscription {
    bookAdded {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const updateCache = (cache, query, newBook) => {
  console.log("updateCache", query, newBook, cache)
  cache.updateQuery(query, (data) => {
    if (!data) {
      return
    }
    return {
      allBooks: data.allBooks.concat(newBook),
    }
  })
}
