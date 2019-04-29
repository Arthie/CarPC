import { ApolloClient } from "apollo-client"
import { HttpLink } from "apollo-link-http"
// import { setContext } from "apollo-link-context"
import { InMemoryCache } from "apollo-cache-inmemory"

import { split } from "apollo-link"
import { WebSocketLink } from "apollo-link-ws"
import { getMainDefinition } from "apollo-utilities"

// const authLink = setContext(async (_, { headers }) => {
//   let token

//   return {
//     headers: {
//       ...headers,
//       Authorization: token ? `Bearer ${token}` : ""
//     }
//   }
// })

// Create an http link:
const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql"
})

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true
  }
})

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    //@ts-ignore
    const { kind, operation } = getMainDefinition(query)
    return kind === "OperationDefinition" && operation === "subscription"
  },
  wsLink,
  httpLink
)

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  resolvers: {},
  connectToDevTools: true
})

// export const initData = () =>
//   client.writeData({
//     data: {}
//   })

// initData()

// // client.resetStore()
// client.onResetStore(async () => {
//   initData()
// })
// // client.clearStore()
// client.onClearStore(async () => {
//   initData()
// })
