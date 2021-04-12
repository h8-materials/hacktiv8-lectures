const { gql } = require("apollo-server");
const axios = require("axios");
const apiUrl = "http://localhost:3002/posts";

const typeDefs = gql`
  type Post {
    id: ID
    title: String
    description: String
  }

  input PostInput {
    title: String
    description: String
  }

  type PostMessage {
    status: String
  }

  extend type Query {
    getPosts: [Post]
    getPost(id: ID): Post
  }

  extend type Mutation {
    addPost(post: PostInput): Post
    updatePost(id: ID, post: PostInput): Post
    deletePost(id: ID): PostMessage
  }
`;

const resolvers = {
  Query: {
    getPosts: async (parent, args, context, info) => {
      try {
        const { data: posts } = await axios.get(apiUrl);
        return posts;
      } catch (error) {
        console.log(error);
      }
    },
    getPost: async (parent, args, context, info) => {
      try {
        const { data: post } = await axios.get(`${apiUrl}/${args.id}`);
        return post;
      } catch (error) {
        console.log(error);
      }
    },
  },

  Mutation: {
    addPost: async (parent, args) => {
      try {
        const { data: post } = await axios.post(`${apiUrl}`, args.post);
        return post;
      } catch (error) {
        console.log(error);
      }
    },
    updatePost: async (parent, args) => {
      try {
        const { data: post } = await axios.put(
          `${apiUrl}/${args.id}`,
          args.post
        );
        return post;
      } catch (error) {
        console.log(error);
      }
    },
    deletePost: async (parent, args) => {
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
