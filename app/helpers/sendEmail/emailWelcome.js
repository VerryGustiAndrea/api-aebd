const nodemailer = require("nodemailer");
const service = require("../../config/gmail");
const template = require("../templateEmail/templateWelcome");

module.exports = {
  sendMail: (req, res, email, name) => {
    //Send Email Welcome
    let transporter = nodemailer.createTransport({
      //gmail
      service: "gmail",
      auth: {
        user: service.email,
        pass: service.password,
      },

   
    });
    let mailOptions = {
      from: service.email,
      to: email,
      subject: "Welcome To AEBD Conference",
      html: template.welcome(name),
    };
    transporter
      .sendMail(mailOptions)
      .then(() => {
        console.log("email sent");
      })
      .catch((err) => {
        res.status(500).json({
          message: err,
          status: false,
          code: 500,
          data: null,
        });
      });
  },
};
