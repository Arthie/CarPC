import PythonToNode from "#utils/NodePythonBridge"
import Settings from "../constants"
import { pubsub, CAR_EVENT } from "../graphql/resolvers/index"

const { OBDSERIALPORT, PYTHONSCRIPT } = Settings[process.argv[2]]

const data = (res: string) => {
  //get json from pyscript get first item from res string

  // console.log(res)
  const data = res.split("\n")
  data
    .filter(item => item !== "")
    .forEach(obj => {
      const event = JSON.parse(obj)
      console.log(event)
      pubsub.publish(CAR_EVENT, {
        carEvent: event
      })
    })
}

const py = PythonToNode(__dirname + PYTHONSCRIPT, data, OBDSERIALPORT)
