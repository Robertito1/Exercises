require('dotenv').config()

const { ApolloServer, UserInputError, gql, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'


mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const typeDefs = gql`
  type Author{
    name: String
    id: ID!
    born: String
    bookCount: Int!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(
      author: String
      genre: String 
      ): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
      ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: async () => {
     const books = await Book.find({})
     return books.length
    },
    authorCount: async () => {
     const authors = await Author.find({})
     return authors.length
    },
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({})
      }else if(!args.genre){
        return Book.find({})
      }else if(!args.author){
      return Book.find({ genres: { $in: [args.genre] } })
      }else{
        return Book.find({ genres: { $in: [args.genre] } })
      }
    },
    allAuthors: () => Author.find({})
  },
  Author: {
    bookCount: async (root) => {
     const books = await Book.find({author: root.id})
     return books.length
    },
  },
  Book: {
    author: async (root) => {
      console.log(root)
      const authorObject = await Author.findOne({_id: root.author})
        return authorObject
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author})
      }
      let book = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
        author: author
      })
      try {
        await book.save()
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book
    },
    editAuthor: async (root, args) => {
      let author = await Author.findOne({ name: args.name })
      if(!author){
          return null
        }
        author.born = args.setBornTo
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }  
      return author
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
