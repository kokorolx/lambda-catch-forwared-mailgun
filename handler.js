const serverless = require("serverless-http");
const express = require("express");
var bodyParser = require('body-parser')
var decode = require('urldecode')
const nodemailer = require('nodemailer');
const multer = require('multer')
var axios = require('axios');

const port = 3000

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.post("/", multer().any(), async (req, res, next) => {


  const options = {
    host: process.env.SMTP_HOST,
    port: 587,

    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PWD
    },
    tls:{
      ciphers:'SSLv3'
    }
  }

  const messageUrl = req.body['message-url']
  var config = {
    method: 'get',
    url: messageUrl,
    headers: { 
      'Accept': 'message/rfc2822', 
      'Authorization': `Basic ${process.env.MAILGUN_API_KEY}`
    }
  };

  const nodemailerMailgun = nodemailer.createTransport(options);
  nodemailerMailgun.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  axios(config)
  .then(function (response) {
    const bodyMime = response.data['body-mime']
    nodemailerMailgun.sendMail({to: response.data.recipients, from: response.data.From, raw: bodyMime }).then(response => {
      console.log("============ sendmail", response)
    }).catch(err => {
      console.log("============ sendmail err", err)
    })
  })
  .catch(function (error) {
    console.log(error);
  });


})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports.handler = serverless(app);






