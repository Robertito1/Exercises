require('dotenv').config()

const { ApolloServer, UserInputError, gql, AuthenticationError, PubSub } = require('apollo-server')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
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

const pubsub = new PubSub()

const typeDefs = gql`

type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}
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
    me: User
  }
  type Subscription {
    bookAdded: Book!
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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
     me: (root, args, context) => {
      return context.currentUser
    },
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
  // Author: {
  //   bookCount: async (root) => {
  //    const books = await Book.find({author: root.id})
  //    return books.length
  //   },
  // },
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
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      // if (!author) {
      //   author = new Author({ name: args.author})
      // }
      if (!author) {
        author = new Author({ name: args.author, bookCount: 1})
      }else {
        author.bookCount = author.bookCount + 1
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
      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    editAuthor: async (root, args, context) => {
      let author = await Author.findOne({ name: args.name })
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
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
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username , favoriteGenre:args.favoriteGenre })
      try {
        await user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      } 
      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secred' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl}) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
