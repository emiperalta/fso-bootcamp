require('./database');
const {
  ApolloServer,
  AuthenticationError,
  gql,
  UserInputError,
} = require('apollo-server');
const jwt = require('jsonwebtoken');

const Book = require('./models/Book');
const Author = require('./models/Author');
const User = require('./models/User');

const SECRET = process.env.SECRET;

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int!
  }

  type Book {
    id: ID!
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
  }

  type User {
    id: ID!
    username: String!
    favoriteGenre: String!
  }

  type Token {
    value: String!
  }

  type Query {
    ### Authors
    authorCount: Int!
    allAuthors: [Author!]!
    ### Books
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    ### Users
    me: User
  }

  type Mutation {
    ### Authors
    editAuthor(name: String, setBornTo: Int!): Author
    ### Books
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    ### Users
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author) {
        return await Book.find({ author: args.author }).populate('author');
      }
      if (args.genre) {
        return await Book.find({ genre: args.genre });
      }
      const books = await Book.find({}).populate('author');
      return books;
    },
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => context.currentUser,
  },
  Author: {
    bookCount: async root => {
      let count = 0;
      const books = await Book.find({}).populate('author');
      books.forEach(b => {
        if (b.author.name === root.name) count += 1;
      });
      return count;
    },
  },
  Mutation: {
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) throw new AuthenticationError('wrong credentials');
      if (!args.name) return null;
      const author = await Author.findOne({ name: args.name });
      if (!author) return null;
      author.born = args.setBornTo;
      try {
        return await author.save();
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }
    },
    addBook: async (root, args, context) => {
      if (!context.currentUser) throw new AuthenticationError('wrong credentials');
      const authorInDb = await Author.findOne({ name: args.author });
      if (!authorInDb)
        throw new UserInputError('author not found', { invalidArgs: args.author });

      const book = new Book({
        title: args.title,
        author: authorInDb._id,
        published: args.published,
        genres: args.genres,
      });

      try {
        return await book.save();
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }
    },
    createUser: async (root, args) => {
      const user = new User({ ...args });
      try {
        return await user.save();
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    login: async (root, args) => {
      const userExists = await User.findOne({ username: args.username });
      if (!userExists || args.password !== 'secret')
        throw new UserInputError('User not found', { invalidArsg: args });

      const userForToken = {
        user: userExists.username,
        id: userExists._id,
      };
      const token = jwt.sign(userForToken, SECRET);
      return { value: token };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async context => {
    const authHeader = context.req.headers.authorization || null;
    if (authHeader) {
      const token = authHeader.substring(7);
      const decodedToken = jwt.verify(token, SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}graphql`);
});
