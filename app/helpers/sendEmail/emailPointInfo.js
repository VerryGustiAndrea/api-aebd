const nodemailer = require("nodemailer");
const service = require("../../config/gmail");
const template = require("../templateEmail/templatePointInfo");

module.exports = {
  sendMail: (
    req,
    res,
    email,
    name,
    payment_date,
    pointGet,
    total_price,
    totalPoint
  ) => {
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
      subject: "RedRuby Point Info",
      html: template.point(
        name,
        payment_date,
        pointGet,
        total_price,
        totalPoint
      ),
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
