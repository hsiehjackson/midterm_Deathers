require('dotenv').config();
require("./server/db/mongoose");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());

  
app.use("/api",require("./server/routes/TodosApi"));

let DIR, SEND;
console.log('App Environment:',process.env.ENV);
if (process.env.ENV == "development"){
  DIR = "public";
  SEND = "./public/index.html";
}
else if (process.env.ENV == "deployment"){
  DIR = "build";
  SEND = "./build/index.html";
}

app.use(express.static(DIR));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, SEND))
);

app.listen(port, () =>
  console.log(`Todos server running on port ${port}...`)
);

module.exports = app;