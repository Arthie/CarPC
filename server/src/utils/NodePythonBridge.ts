//This module was makes a bridge between node and python processes
//The module will take python output to the node processes

import { spawn } from "child_process"

/**
 * @param  { string } file -python script file path
 * @param  { function } dataCB -callback function for script output
 */
//args: file:__dirname+'/obd.py', data, error, end, kill
const PythonToNode = (
  file: string,
  dataCB: (data: string) => void,
  arg1: string
) => {
  console.log("python script started", file)
  const py = spawn("py", [file, arg1])

  //when python script outputs data this event wil fire
  py.stdout.on("data", data => {
    try {
      dataCB(data.toString())
    } catch (err) {
      console.log("Error in parsing data:", data.toString(), "err:", err)
    }
  })

  //when python script outputs error this event wil fire
  py.stderr.on("data", data => console.log("py script error:", data.toString()))

  //when python script ends this event wil fire
  py.stdout.on("end", () => console.log("py script ended"))

  //when python script closes this event wil fire
  py.on("close", code => console.log(`child process exited with code:${code}`))

  //return py (to kill py script)
  return py
}

export default PythonToNode
