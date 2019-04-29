import carlo from "carlo"

export const startGui = async () => {
  // Launch the browser.
  const app = await carlo.launch()

  // Terminate Node.js process on app window closing.
  app.on("exit", () => process.exit())

  const pathName = `${__dirname}/../../web/build/`

  // Tell carlo where your web files are located.
  app.serveFolder(pathName)

  // Navigate to the main page of your app.
  await app.load("index.html")
}

startGui()
