const { gql } = require("apollo-server");
const axios = require("axios");
const apiUrl = "http://localhost:3001/users";

const typeDefs = gql`
  type User {
    id: ID
    name: String
    age: Int
  }

  input UserInput {
    name: String
    age: Int
  }

  type UserMessage {
    status: String
  }

  extend type Query {
    getUsers: [User]
    getUser(id: ID): User
  }

  extend type Mutation {
    addUser(user: UserInput): User
    updateUser(id: ID, user: UserInput): User
    deleteUser(id: ID): UserMessage
  }
`;

const resolvers = {
  Query: {
    getUsers: async (parent, args, context, info) => {
      try {
        const { data: users } = await axios.get(apiUrl);
        return users;
      } catch (error) {
        console.log(error);
      }
    },
    getUser: async (parent, args, context, info) => {
      try {
        const { data: user } = await axios.get(`${apiUrl}/${args.id}`);
        return user;
      } catch (error) {
        console.log(error);
      }
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      try {
        const { data: user } = await axios.post(`${apiUrl}`, args.user);
        return user;
      } catch (error) {
        console.log(error);
      }
    },
    updateUser: async (parent, args) => {
      try {
        const { data: user } = await axios.put(
          `${apiUrl}/${args.id}`,
          args.user
        );
        return user;
      } catch (error) {
        console.log(error);
      }
    },
    deleteUser: async (parent, args) => {
      try {
        await axios.delete(`${apiUrl}/${args.id}`);
        return {
          status: "ok",
        };
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
