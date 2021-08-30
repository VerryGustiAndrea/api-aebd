const nodemailer = require("nodemailer");
const service = require("../../config/gmail");
const template = require("../templateEmail/templateOfferingRegister");

module.exports = {
  sendMail: (req, res, email, name) => {
    let transporter = nodemailer.createTransport({
      //gmail
      // service: "gmail",
      // auth: {
      //   user: service.email,
      //   pass: service.password,
      // },

      host: "islandconcepts.com",
      port: 465,
      secure: true,
      auth: {
        user: "noreply@redrubygroup.com",
        pass: "generasioptimis",
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
