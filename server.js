require('dotenv').config();
require("./server/db/mongoose");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

  
app.use("/api",require("./server/routes/TodosApi"));

app.use(express.static("static"));

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "./static/index.html"))
);

app.listen(port, () =>
  console.log(`Todos server running on port ${port}...`)
);

module.exports = app;