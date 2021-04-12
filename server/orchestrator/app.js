const { ApolloServer, makeExecutableSchema } = require("apollo-server");
const postSchema = require("./schemas/postSchema");
const userShema = require("./schemas/userSchema");

const typeDefs = `
  type Query
  type Mutation
`;

const schema = makeExecutableSchema({
  typeDefs: [typeDefs, postSchema.typeDefs, userShema.typeDefs],
  resolvers: [userShema.resolvers, postSchema.resolvers],
});

const server = new ApolloServer({
  schema,
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
