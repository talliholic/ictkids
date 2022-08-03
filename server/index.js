const path = require("path");
const express = require("express");
var cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get("", (req) => {
    req.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
