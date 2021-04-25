require('./database');
const {
  ApolloServer,
  AuthenticationError,
  gql,
  UserInputError,
} = require('apollo-server');
const jwt = require('jsonwebtoken');

const Person = require('./models/Person');
const User = require('./models/User');

const SECRET = process.env.SECRET;

const typeDefs = gql`
  type Address {
    street: String!
    city: String!
  }

  type Person {
    id: ID!
    name: String!
    phone: String
    address: Address!
  }

  type User {
    id: ID!
    username: String!
    friends: [Person!]!
  }

  type Token {
    value: String!
  }

  type Query {
    personCount: Int!
    allPersons: [Person!]!
    findPerson(name: String!): Person
    me: User
  }

  type Mutation {
    addPerson(name: String!, phone: String, street: String!, city: String!): Person
    addAsFriend(name: String!): User
    editNumber(name: String!, phone: String!): Person
    createUser(username: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    personCount: () => Person.collection.countDocuments(),
    allPersons: (root, args) => Person.find({}),
    findPerson: (root, args) => Person.findOne({ name: args.name }),
    me: (root, args, context) => context.currentUser,
  },
  Person: {
    address: root => {
      return {
        street: root.street,
        city: root.city,
      };
    },
  },
  Mutation: {
    addPerson: async (root, args, { currentUser }) => {
      const person = new Person({ ...args });

      if (!currentUser) throw new AuthenticationError('not authenticated');

      try {
        await person.save();
        currentUser.friends = currentUser.friends.concat(person);
        await currentUser.save();
        return person;
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }
    },
    addAsFriend: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('not authenticated');

      const nonFriendAlready = person => {
        return !currentUser.friends.map(f => f._id).includes(person._id);
      };

      const person = await Person.findOne({ name: args.name });
      if (nonFriendAlready(person)) {
        currentUser.friends = currentUser.friends.concat(person);
      }
      await currentUser.save();
      return currentUser;
    },
    editNumber: async (root, args) => {
      const person = await Person.findOne({ name: args.name });
      if (!person) return null;
      person.phone = args.phone;
      try {
        return person.save();
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username });
      try {
        return user.save();
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }
    },
    login: async (root, args) => {
      const userExists = await User.findOne({ username: args.username });
      if (!userExists || args.password !== 'secred') {
        throw new UserInputError('wrong credentials');
      }
      const userForToken = {
        username: userExists.username,
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
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), SECRET);
      const currentUser = await User.findById(decodedToken.id).populate('friends');
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => console.log(`Server ready at ${url}graphql`));
