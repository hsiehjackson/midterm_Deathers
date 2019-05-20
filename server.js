require('dotenv').config();
require("./server/db/mongoose");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const port = 8000;

app.use(bodyParser.json());
app.use(cors());

  
app.use("/api",require("./server/routes/TodosApi"));

app.use(express.static("public"));

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);

app.listen(port, () =>
  console.log(`Todos server running on port ${port}...`)
);

module.exports = app;