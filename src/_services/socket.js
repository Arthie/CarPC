import io from "socket.io-client"
const socket = io("http://localhost:3010")

const subscribeToSPEED = cb => {
  socket.on("SPEED", value => cb(null, value))
}

const subscribeToRPM = cb => {
  socket.on("RPM", value => cb(null, value))
}

export { subscribeToSPEED, subscribeToRPM }
