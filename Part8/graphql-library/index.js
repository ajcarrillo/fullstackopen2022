require("dotenv").config()
const { ApolloServer, gql, UserInputError } = require("apollo-server")
const mongoose = require("mongoose")
const Book = require("./models/Book")
const Author = require("./models/Author")

let MONGODB_URI = process.env.MONGODB_URI

console.log("Connecting to MongoDB...", MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message)
  })

const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    id: ID!
    name: String
    born: Int
    bookCount: Int
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int
      genres: [String]
    ): Book!
    editAuthor(name: String, setBornTo: Int): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        return Book.find({ author: author.id })
      }
      if (args.genre) {
        return Book.find({ genres: args.genre })
      }
      return await Book.find({}).populate("author")
    },
    allAuthors: async () => await Author.find({}),
  },
  Author: {
    bookCount: async (author) =>
      await Book.find({ author: author.id }).countDocuments(),
  },
  Mutation: {
    addBook: async (root, args) => {
      const { title, published, genres } = args
      const book = new Book({ title, published, genres })
      let author = await Author.findOne({ name: args.author })

      if (!author) {
        newAuthor = new Author({ name: args.author })
        try {
          author = await newAuthor.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }

      book.author = author._id
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      author.save()
      return author
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
