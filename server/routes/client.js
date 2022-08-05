const express = require("express")
const path = require("path")
const router = express.Router()

const reactRoute = (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../build", "index.html"))
}

router.get("", reactRoute)
router.get("/video-activit*", reactRoute)
