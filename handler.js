const serverless = require("serverless-http");
const express = require("express");
var bodyParser = require('body-parser')
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.post("/forward-mail", (req, res, next) => {

  console.log("req === ", req)
  console.log("req.body === ", req.body)
  console.log("res === ", res)
  console.log("next === ", next)

  return res.status(200).json({
    message: "Good!",
  });

})


app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.get("/hello", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});



module.exports.handler = serverless(app);
