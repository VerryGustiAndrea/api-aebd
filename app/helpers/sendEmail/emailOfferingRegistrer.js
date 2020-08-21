const nodemailer = require("nodemailer");
const service = require("../../config/gmail");
const template = require("../templateEmail/templateOfferingRegister");

module.exports = {
  sendMail: (req, res, email, name) => {
    //Send Email Welcome
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: service.email,
        pass: service.password,
      },
    });
    let mailOptions = {
      from: service.email,
      to: email,
      subject: "Join Red Ruby Now!",
      html: template.offering(name),
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
