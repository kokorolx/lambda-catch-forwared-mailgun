const serverless = require("serverless-http");
const express = require("express");
var bodyParser = require('body-parser')
var decode = require('urldecode')
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const multer = require('multer')
const mailgun = require("mailgun-js");

const port = 3000

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post("/forward-mail", multer().any(), async (req, res, next) => {
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
  
  const nodemailerMailgun = nodemailer.createTransport(options);
  
  nodemailerMailgun.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });


  try {
    console.log("=============req", req)
    console.log("=============req.apiGateway", req.apiGateway)



    console.log("===body===", req.body)

    let recipients = req.body.recipient

    const emailContent = {
      from: req.body.from,
      to: recipients,
      subject: `${req.body.subject}`,
      html: `${req.body['body-html']}`,
      text: req.body['body-plain']
    }

    nodemailerMailgun.sendMail(emailContent).then(response => {
      console.log(response)
      return res.status(200).json({
        message: "sent",
        rs: response
      });
    }).catch(err => {
      console.log(err)
      return res.status(200).json({
        message: "error",
        rs: err
      })
    })
  
    

  } catch (error) {
    console.log(`==== ${new Date()}`)
    console.log("===== master of error -- ", error)
    return res.status(400).json({
      message: "somethings went wrong",
      error: error
    })
  }
})


// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })

module.exports.handler = serverless(app);
