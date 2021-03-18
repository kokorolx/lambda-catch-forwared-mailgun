const serverless = require("serverless-http");
const express = require("express");
var bodyParser = require('body-parser')
var decode = require('urldecode')
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const multer = require('multer')
const mailgun = require("mailgun-js");


const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 332629e0e53b7008773e4e21696c171d-73e57fef-9c865c030



app.post("/forward-mail", multer().none(), async (req, res, next) => {
  const options = {
    host: "mail.tradesorg.team",
    port: 587,
    secure: true, // upgrade later with STARTTLS
    auth: {
      user: "mailgun@xtradesorg.team",
      pass: "j{muLfKSR90"
    }
  }
  
  
  const nodemailerMailgun = nodemailer.createTransport(options);

  try {
    console.log("=============req", req)
    console.log("=============req.apiGateway", req.apiGateway)


    const email = req.body.recipient;
    const event = req.body.event;


    console.log("===body===", req.body)
    console.log("===recipient===", email)
    console.log("===event===", event)


    const _mail = req.apiGateway.event.body
    const decodeMail = decode(_mail)
  
    console.log("req === ", _mail)
    console.log("\n decode === ", decodeMail)
  

    let recipients = req.body.recipient


    if(Array.isArray(recipients)){
      console.log("====array of recipient")
      recipients = recipients.map(mail => {
        return mail.replace(/@tradesorg.team/, '@mail.tradesorg.team')
      })

    }else {
      recipients = recipients.replace(/@tradesorg.team/, '@mail.tradesorg.team')
    }


    nodemailerMailgun.sendMail({
      from: req.body.from,
      to: recipients,
      subject: `${req.body.subject} ${new Date()}`,
      html: `${req.body['body-html']} <b>${new Date()}</b>`,
      text: req.body['body-plain']
    }).then(response => {
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
  }


  console.log(`===========log at ==== ${new Date()}`)


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
