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



const options = {
  host: "mail.tradesorg.team",
  port: 587,
  auth: {
    user: "sender@tradesorg.team",
    pass: "J4tUmyb)26"
  },
  tls:{
    ciphers:'SSLv3'
  }
}

const nodemailerMailgun = nodemailer.createTransport(options);


var config = {
  method: 'get',
  url: 'https://se.api.mailgun.net/v3/domains/tradesorg.team/messages/AgEFT5G-DepWJuecMjBHRKyA9DpHRUTaZg==',
  headers: { 
    'Accept': 'message/rfc2822', 
    'Authorization': 'Basic YXBpOmE1ODdkMjg1MWRmODVjMDc5MjJhYzM0YjFhNWIzMWE2LWQzMmQ4MTdmLWU3OTZlZWU4'
  }
};

axios(config)
.then(function (response) {
  const bodyMime = response.data['body-mime']

  console.log(bodyMime.substr(0, 10000))
  
  nodemailerMailgun.sendMail({to: response.data.recipients, from: response.data.From, raw: bodyMime }).then(response => {
    console.log(response)
    // return res.status(200).json({
    //   message: "sent",
    //   rs: response
    // });
  }).catch(err => {
    console.log(err)
    // return res.status(200).json({
    //   message: "error",
    //   rs: err
    // })
  })

})
.catch(function (error) {
  console.log(error);
});





// app.post("/", multer().any(), async (req, res, next) => {})
//   // const options = {
//   //   host: process.env.SMTP_HOST,
//   //   port: 587,
//   //   auth: {
//   //     user: process.env.SMTP_USER,
//   //     pass: process.env.SMTP_PWD
//   //   },
//   //   tls:{
//   //     ciphers:'SSLv3'
//   //   }
//   // }

  // const options = {
  //   host: "mail.tradesorg.team",
  //   port: 587,
  //   auth: {
  //     user: "sender@tradesorg.team",
  //     pass: "J4tUmyb)26"
  //   },
  //   tls:{
  //     ciphers:'SSLv3'
  //   }
  // }

  // const nodemailerMailgun = nodemailer.createTransport(options);
  
//   nodemailerMailgun.verify(function(error, success) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Server is ready to take our messages");
//     }
//   });


//   try {
//     console.log("=============req", req)

//     var config = {
//       method: 'get',
//       url: 'https://se.api.mailgun.net/v3/domains/tradesorg.team/messages/AgMFNAtXm3ID3iH-JL1Mt7xMZGq6GH6ARA==',
//       headers: { 
//         'Accept': 'message/rfc2822', 
//         'Authorization': 'Basic YXBpOmE1ODdkMjg1MWRmODVjMDc5MjJhYzM0YjFhNWIzMWE2LWQzMmQ4MTdmLWU3OTZlZWU4'
//       }
//     };
    
//     axios(config)
//     .then(function (response) {
//       console.log(JSON.stringify(response.data));
//       const bodyMime = response.data['body-mime']
      
//       nodemailerMailgun.sendMail({raw: bodyMime }).then(response => {
//         console.log(response)
//         return res.status(200).json({
//           message: "sent",
//           rs: response
//         });
//       }).catch(err => {
//         console.log(err)
//         return res.status(200).json({
//           message: "error",
//           rs: err
//         })
//       })

//     })
//     .catch(function (error) {
//       console.log(error);
//     });

//     // const emailContent = {
//     //   raw: req.apiGateway.event.body
//     // }

//     // console.log("==========emailContent ", emailContent)

//     // nodemailerMailgun.sendMail(emailContent).then(response => {
//     //   console.log(response)
//     //   return res.status(200).json({
//     //     message: "sent",
//     //     rs: response
//     //   });
//     // }).catch(err => {
//     //   console.log(err)
//     //   return res.status(200).json({
//     //     message: "error",
//     //     rs: err
//     //   })
//     // })
  
    

    



//   } catch (error) {
//     console.log(`==== ${new Date()}`)
//     console.log("===== master of error -- ", error)
//     return res.status(400).json({
//       message: "somethings went wrong",
//       error: error
//     })
//   }
// })


// // app.listen(port, () => {
// //   console.log(`Example app listening at http://localhost:${port}`)
// // })

module.exports.handler = serverless(app);






