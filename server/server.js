//express
const express = require("express")
const app = express()
const path = require("path")

//graphql
const bodyParser = require("body-parser")
const { graphqlExpress } = require("apollo-server-express")
const { graphiqlExpress } = require("apollo-server-express")

//socket.io
const http = require("http")
const server = new http.Server(app)
const io = require("socket.io")(server)

//import custom modules
const folderData = require("./utils/folderData")
const PythonToNode = require("./utils/NodePythonBridge")

///////////
//Express//
///////////

const ROOTFOLDER = "C:/Users/Arthie/Music"

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  //res.header("Access-Control-Allow-Origin", "http://192.168.1.55:3005")
  res.header("Access-Control-Allow-Credentials", "true")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
})

console.log(path.join(__dirname + "../../build/"))
app.use(express.static(path.join(__dirname + "../../build/")))

//warning known vunrability: path traversal https://www.owasp.org/index.php/Path_Traversal
//warning known vunrability: user input not sanitized
app.get("/folder", (req, res) => {
  const data = folderData.get(ROOTFOLDER, req.query.path)
  data.then(result => res.send(result))
})

app.use("/song", express.static(ROOTFOLDER))

app.listen(3005, _ => console.log("Express running on port:3005"))

///////////
//Graphql//
///////////

const myGraphQLSchema = {}

app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress({ schema: myGraphQLSchema })
)
app.get("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }))

/////////////
//Socket.io//
/////////////

io.on("connection", socket => {
  console.log("users", io.engine.clientsCount)
  if (io.engine.clientsCount <= 1) {
    const data = res => {
      //get json from pyscript get first item from res string
      const [OBDobj] = res.split("\n")
      const obj = JSON.parse(OBDobj)
      if ("SPEED" in obj) {
        io.emit("SPEED", obj)
      }
      if ("RPM" in obj) {
        io.emit("RPM", obj)
      }
    }
    const py = PythonToNode(__dirname + "/utils/test.py", data)
    console.log("a user connected")
    socket.on("disconnect", _ => {
      py.kill()
      console.log("user disconnected", io.engine.clientsCount)
    })
  }
})

server.listen(3010, _ => console.log("Socket.io listening on port:3010"))
