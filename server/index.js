var express = require("express");
const path = require('path')
const fs = require('fs') 
const envfile = require('envfile')
var cors = require('cors');
var app = express();
app.use(cors());
const port = 5000;

// Get a environment variables for particular process 
app.get("/getEnvironment/:process", (req, res) => {
  const sourcePath = path.resolve(__dirname, `${req.params.process}/.env`)
  if(sourcePath){
    res.json(envfile.parseFileSync(sourcePath))
  }
  else {
    res.json({"status":"Process name is wrong."})
  }
});

// Create the environment variables for partcular process
app.post("/setEnvironment/:process/:key/:value", (req, res) => {
  const sourcePath = path.resolve(__dirname, `${req.params.process}/.env`)
  if(sourcePath){
    let parsedFile = envfile.parseFileSync(sourcePath);
    parsedFile[req.params.key] = req.params.value;
    fs.writeFileSync(sourcePath, envfile.stringifySync(parsedFile)); 
    envfile.stringifySync(parsedFile)
    res.json(envfile.parseFileSync(sourcePath));
  }
  else {
    res.json({"status":"Process name is wrong."})
  }
});

// Listening server port
app.listen(port, () => {
    console.log(`Server running on ${port} `);
});

