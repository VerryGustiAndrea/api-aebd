const registerModel = require("../../models/member/register");
var jwt = require("jsonwebtoken");
const MiscHelper = require("../../helpers/helpers");
const nodemailer = require("nodemailer");
const service = require("../../config/gmail");
const template = require("../../helpers/templateEmail/templateWelcome");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const serviceEmailWelcome = require("../../helpers/sendEmail/emailWelcome");

module.exports = {
  //START REGISTER
  registerMemberEmail: (req, res) => {
    //Hashing Password
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);

    //Generate Member ID
    let generateMemberId = () => {
      let chars = "abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ";
      let huruf = chars.substr(Math.floor(Math.random() * 53), 2);
      let s = new Date().valueOf().toString();
      let number = s.substr(s.length - 3);
      let member_id = "RR-" + number + huruf;
      return member_id;
    };

    //GenerateToken
    let Randomtoken =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    let data = {
      name: req.body.name,
      email: req.body.email,
      credential: hash,
      type: "Email",
      phone: req.body.phone,
      member_id: generateMemberId(),
      uuid: Randomtoken,
    };

    //get email from database where email=email_inputan
    registerModel
      .checkEmailRegister(data.email)
      .then((e) => {
        //check email sudah terdaftar atau belum
        if (e.length == 0) {
          //check if member_id exist in database
          registerModel.checkToken(data.member_id).then((f) => {
            if (f.length == 0) {
              //insert into member
              registerModel
                .registerUser(data)
                .then((result) => {
                  res.json({
                    message: "Register Success",
                    status: true,
                    code: 200,
                    data,
                  });
                })
                .catch((err) => MiscHelper.badRequest(res, err));
            } else {
              //generate new member_id
              generateMemberId();
              data.member_id = generateMemberId();
              //insert into member
              registerModel
                .registerUser(data)
                .then((result) => {
                  res.json({
                    message: "Register Success",
                    status: true,
                    code: 200,
                    data,
                  });
                })
                .catch((err) => MiscHelper.badRequest(res, err));
            }

            //Send Email Welcome
            console.log(data.email, data.name);
            serviceEmailWelcome.sendMail(req, res, data.email, data.name);
          });
        } else {
          res.json({
            message: "Email already registered!",
            status: false,
            code: 403,
            data: null,
          });
        }
      })
      .catch((err) => MiscHelper.badRequest(res, err));
  },

  //END REGISTER

  //REGISTER MEMBER GOOGLE
  registerMemberGoogle: (req, res) => {
    //Hashing Password
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.tokenGoogle, salt);
    console.log(req.body.tokenGoogle);

    //Generate Member ID
    let generateMemberId = () => {
      let chars = "abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ";
      let huruf = chars.substr(Math.floor(Math.random() * 53), 2);
      let s = new Date().valueOf().toString();
      let number = s.substr(s.length - 3);
      let member_id = "RR-" + number + huruf;
      return member_id;
    };

    //GenerateToken
    let Randomtoken =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    let data = {
      name: req.body.name,
      email: req.body.email,
      credential: hash,
      type: "Google",
      phone: req.body.phone,
      member_id: generateMemberId(),
      uuid: Randomtoken,
    };

    //get email from database where email=email_inputan
    registerModel
      .checkEmailRegister(data.email)
      .then((e) => {
        //check email sudah terdaftar atau belum
        if (e.length == 0) {
          //check if member_id exist in database
          registerModel.checkToken(data.member_id).then((f) => {
            if (f.length == 0) {
              //insert into member
              registerModel
                .registerUser(data)
                .then((result) => {
                  res.json({
                    message: "Register Success",
                    status: true,
                    code: 200,
                    data,
                  });
                })
                .catch((err) => MiscHelper.badRequest(res, err));
            } else {
              //generate new member_id
              generateMemberId();
              data.member_id = generateMemberId();
              //insert into member
              registerModel
                .registerUser(data)
                .then((result) => {
                  res.json({
                    message: "Register Success",
                    status: true,
                    code: 200,
                    data,
                  });
                })
                .catch((err) => MiscHelper.badRequest(res, err));
            }

            //Send Email Welcome
            console.log(data.email, data.name);
            serviceEmailWelcome.sendMail(req, res, data.email, data.name);
          });
        } else {
          res.json({
            message: "Email already registered!",
            status: false,
            code: 403,
            data: null,
          });
        }
      })
      .catch((err) => MiscHelper.badRequest(res, err));
  },
};
