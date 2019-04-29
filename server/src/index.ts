import http from "http"
import express from "express"
import { server } from "#graphql/server"

import Settings from "./constants"

import "./utils/carEvent"
import "./gui"

const { MUSICFOLDER } = Settings[process.argv[2]]

const PORT = 4000
const app: express.Application = express()

app.use("/static", express.static(MUSICFOLDER))

server.applyMiddleware({ app })
console.log(MUSICFOLDER)

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

httpServer.listen(PORT, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${
      server.subscriptionsPath
    }`
  )
})
