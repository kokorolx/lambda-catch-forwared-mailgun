const nodemailer = require('nodemailer');

// 332629e0e53b7008773e4e21696c171d-73e57fef-9c865c030

const options = {
  host: "mail.tradesorg.team",
  port: 587,
  auth: {
    user: "sender@xtradesorg.team",
    pass: "J4tUmyb)26x"
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



nodemailerMailgun.sendMail({
  from: "hello2@gmail.com",
  to: "ricknguyen@tradesorg.team",
  subject: `Hello sender ${new Date()}`,
  html: `<p>This mail from localhost</p><b>${new Date()}</b>`,
  text: `${new Date()}`
}).then(response => {
  console.log("success")
  console.log(response)
}).catch(err => {
  console.log("err")
  console.log(err)
})

