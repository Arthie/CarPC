import { ApolloServer } from "apollo-server-express"
import { GraphQLError } from "graphql/error"
import resolvers from "#graphql/resolvers"
import typeDefs from "#graphql/schema.graphql"

// interface ServerContext {}

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  debug: true,
  introspection: true,
  playground: true,
  formatError: (error: GraphQLError) => {
    console.log("###START GRAPH ERROR###")
    console.dir(error, { depth: null })
    console.log("###END GRAPH ERROR###")
    return error
  },
  formatResponse: (response: any) => {
    console.log("###START GRAPH RESPONSE###")
    console.dir(response, { depth: null })
    console.log("###END GRAPH RESPONSE###")
    return response
  }
  // context: async ({request: ServerContext, connection}) => {
  // if (connection) {
  //   // check connection for metadata
  //   return connection.context;
  // } else {
  //   // check from req
  //   const token = req.headers.authorization || "";

  //   return { token };
  // },
  // subscriptions: {
  //   onConnect: (connectionParams, webSocket, context) => {
  //     // ...
  //   },
  //   onDisconnect: (webSocket, context) => {
  //     // ...
  //   },
  // },
})
