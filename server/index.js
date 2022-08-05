const express = require("express")
var cors = require("cors")
const clientRoutes = require("./routes/client")

const app = express()
const port = process.env.PORT || 5000
app.use(cors())

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"))
  app.use(clientRoutes)
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(port, () => {
  console.log("Server is up on port " + port)
})
