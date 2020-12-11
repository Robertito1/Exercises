import { gql  } from '@apollo/client'

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
  query {
    allBooks {
       title
       author{
         name
       }
       genres
       published
    }
  }
`
export const USER = gql`
query {
  me {
    username
    favoriteGenre
  }
}
`
export const RECOMMENDED = gql`
query getRecommended($genre: String!) {
  allBooks (genre: $genre){
  title
     author{
       name
     }
     genres
     published
    }
}
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
        title: $title
        author: $author
        published: $published
        genres: $genres
        ) {
            title
            published
            genres
  }
}
`
export const UPDATE_AUTHOR = gql`
mutation updateAuthor($name: String!, $setBornTo: Int!){
    editAuthor(
        name: $name
        setBornTo: $setBornTo
    ) {
        name
        born
   }
}
`

export const LOGIN = gql`
mutation loginUser($username: String!, $password: String!){
  login(
    username: $username
    password: $password
  ){
    value
  }
}
`
