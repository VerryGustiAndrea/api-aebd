const registerModel = require("../../models/member/register");
var jwt = require("jsonwebtoken");
const MiscHelper = require("../../helpers/helpers");
const nodemailer = require("nodemailer");
const service = require("../../config/gmail");
const template = require("../../helpers/templateEmail/templateWelcome");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const axios = require("axios");

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
      gender: req.body.gender,
      dob: new Date(req.body.dob),
      email: req.body.email,
      credential: hash,
      type: "Email",
      phone: req.body.phone,
      member_id: generateMemberId(),
      uuid: Randomtoken,
      point_level: 0,
      facebook: "",
      instagram: "",
      verified: 0,
    };

    // console.log(data);

    //get email from database where email=email_inputan
    registerModel
      .checkEmailRegister(data.email)
      .then((e) => {
        //check email sudah terdaftar atau belum
        if (e.length == 0) {
          //check if member_id exist in database
          registerModel.checkToken(data.member_id).then(async (f) => {
            if (f.length == 0) {
              //insert into member

              //insert into member
              let tmpData = [];
              try {
                tmpData = await registerModel.checkTmpUser(data.email);
              } catch (error) {
                console.log("error check tmp data");
              }
              if (tmpData.length == 0) {
              } else {
                //check Point TMP

                let pointTMP = [];
                try {
                  pointTMP = await registerModel.checkPointTMP(data.email);
                } catch (error) {
                  console.log("error check point TMP");
                  return MiscHelper.badRequest(res, error);
                }
                //set New Point
                data.point_level = pointTMP[0].total_point_after + 50;
                //reward 50 point started
              }

              registerModel
                .registerUser(data)
                .then((result) => {
                  // try {
                  let dataPointReward = {
                    name: data.name,
                    email: data.email,
                    order_id: new Date().valueOf(),
                    order_picture: "",
                    total_price: 125000,
                    type_order: 7, //identy beli dari siapa web/club/terrace(menggunakan role)
                    status: 1,
                    desc: "registration reward",
                    payment_date: new Date(),
                    created_at: new Date(),
                  };

                  // console.log(dataPointReward);

                  //Earn Point
                  try {
                    axios({
                      method: "post",
                      url:
                        "http://" +
                        process.env.HOST +
                        ":4004/api/point/transactionPoint", //to Endpoint Check Point
                      headers: {},
                      data: dataPointReward,
                    })
                      .then((result) => {
                        // console.log(result);
                        // return MiscHelper.responses(res, result.data);
                        console.log("suscess insert log_history_point");
                      })
                      .catch((err) => console.log(err));
                  } catch (error) {
                    console.log("Error Earn Point");
                    return MiscHelper.badRequest(res, error);
                  }

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
            // console.log(data.email, data.name);
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
      point_level: 0,
      verified: 0,
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
