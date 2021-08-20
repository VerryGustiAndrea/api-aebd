const registerModel = require("../../models/member/register");
const loginModel = require("../../models/member/login");
var jwt = require("jsonwebtoken");
const MiscHelper = require("../../helpers/helpers");
const nodemailer = require("nodemailer");
const service = require("../../config/gmail");
const template = require("../../helpers/templateEmail/templateWelcome");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const axios = require("axios");
const admin = require("firebase-admin");
const serviceAccount = require("../../config/redrubygroups-f93fd-firebase-adminsdk-2hny4-454f9c9d7f.json");

const serviceEmailWelcome = require("../../helpers/sendEmail/emailWelcome");

module.exports = {
  //START REGISTER
  registerMemberEmail: async (req, res) => {
    // if (req.body.password.length < 8) {
    //   return MiscHelper.responsesCustomForbidden(
    //     res,
    //     null,
    //     "Minimum Password Length is 8 characters",
    //     false,
    //     403
    //   );
    // }
    //CHECK FULLFIELD
    //check fulfilled form
    console.log(req.body.name);
    if (!req.body.name) {
      return MiscHelper.responsesCustomForbidden(
        res,
        null,
        "Fullname not fulfilled ",
        false,
        403
      );
    } else if (!req.body.gender) {
      return MiscHelper.responsesCustomForbidden(
        res,
        null,
        "Gender not fulfilled ",
        false,
        403
      );
    } else if (!req.body.password) {
      return MiscHelper.responsesCustomForbidden(
        res,
        null,
        "Gender not fulfilled ",
        false,
        403
      )
    } else if (!req.body.dob) {
      return MiscHelper.responsesCustomForbidden(
        res,
        null,
        "Date Of Birth not fulfilled ",
        false,
        403
      );
    } else if (!req.body.email) {
      return MiscHelper.responsesCustomForbidden(
        res,
        null,
        "Email not fulfilled ",
        false,
        403
      );
    } else if (!req.body.email) {
      return MiscHelper.responsesCustomForbidden(
        res,
        null,
        "Password not fulfilled ",
        false,
        403
      );
    } else if (!req.body.phone) {
      return MiscHelper.responsesCustomForbidden(
        res,
        null,
        "Phone not fulfilled ",
        false,
        403
      );
    }

    //Hashing Password
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);

    //check AGE
    function calculate_age(dob) {
      var diff_ms = Date.now() - dob.getTime();
      var age_dt = new Date(diff_ms);

      return Math.abs(age_dt.getUTCFullYear() - 1970);
    }

    //Generate Member ID
    let generateMemberId = () => {
      let chars = "ABCDEFGHIJKLMNOPQURSTUVWXYZ";
      let huruf = chars.substr(Math.floor(Math.random() * 26), 2);
      let s = new Date().valueOf().toString();
      let number = s.substr(s.length - 3);
      let member_id = "RR-" + number + huruf;
      return member_id;
    };

    // //Generate Member ID
    // let generateMemberId = () => {
    //   let chars = "1234567890";
    //   let huruf = chars.substr(Math.floor(Math.random() * 8), 3);
    //   let s = new Date().valueOf().toString();
    //   let number = s.substr(s.length - 5);
    //   let member_id = huruf + number;
    //   return member_id;
    // };

    //GenerateToken
    let Randomtoken =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    let data = {
      name: req.body.name,
      gender: req.body.gender,
      display_picture: "profile.svg",
      dob: new Date(req.body.dob),
      email: req.body.email,
      credential: hash,
      type: "Email",
      phone: req.body.phone,
      member_id: generateMemberId(),
      // member_type: 0,
      uuid: Randomtoken,
      point_level: 50,
      facebook: "",
      instagram: "",
      verified: 0,
    };



    // console.log(data);
    if (calculate_age(new Date(data.dob)) < 18) {
      return MiscHelper.responsesCustomForbidden(
        res,
        null,
        "You are not old enough",
        false,
        403
      );
    }

    //check phone number
    let checkPhone = [];
    try {
      checkPhone = await registerModel.checkPhone(data.phone);
    } catch (error) {
      MiscHelper.badRequest(res, error);
    }
    if (checkPhone[0]) {
      return MiscHelper.responsesCustomForbidden(
        res,
        null,
        "Phone Number Already Registered!",
        false,
        403
      );
    }

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
                .then(async (result) => {
                  // //INSERT TO DATABASE RAPTOR

                  // let sex = "";
                  // if (data.gender == "male") {
                  //   sex = "M";
                  // } else if (data.gender == "female") {
                  //   sex = "F";
                  // } else {
                  //   sex = "O";
                  // }
                  // let dataRaptor = [
                  //   {
                  //     MembershipId: result.insertId,
                  //     CardNumber: data.member_id,
                  //     FirstName: data.name,
                  //     Sex: sex,
                  //     eMail: data.email,
                  //     ExpiryDate: new Date(),
                  //     DateJoined: new Date(),
                  //     MemberType: 0,
                  //   },
                  // ];

                  // try {
                  //   await registerModel.insertMembers(dataRaptor);
                  //   console.log("register success");
                  // } catch (error) {
                  //   console.log(error);
                  // }

                  // console.log(result);
                  data.id_user = result.insertId;

                  // try {
                  let dataPointReward = {
                    name: data.name,
                    email: data.email,
                    order_id: new Date().valueOf(),
                    order_picture: "",
                    total_price: 125000,
                    type_order: 8, //identy beli dari siapa web/club/terrace(menggunakan role)
                    status: 1,
                    desc: "Welcome Point",
                    payment_date: new Date(),
                    created_at: new Date(),
                  };

                  //Earn Point
                  try {
                    await axios({
                      method: "post",
                      url:
                        "http://" + process.env.HOST_POINT + "/api/point/transactionPoint", //to Endpoint Check Point
                      headers: {},
                      data: dataPointReward,
                    })
                      .then((result) => {
                        // console.log(result);
                        // return MiscHelper.responses(res, result.data);
                        console.log("suscess insert log_history_point");
                      })
                      .catch((err) => MiscHelper.badRequest(res, err));
                  } catch (error) {
                    console.log("Error Earn Point");
                    return MiscHelper.badRequest(res, error);
                  }

                  data.display_picture =
                    "https://" + process.env.HOST_MEMBER + "/dp/profile.svg";
                  data.member_type = 0;


                  //insert new fcm token
                  if (req.body.fcm_token) {
                    let data_fcm_token = {
                      id_user: data.id_user,
                      fcm_token: req.body.fcm_token
                    }
                    loginModel
                      .checkFcmToken(data_fcm_token.fcm_token).then((result) => {
                        if (result.length > 0) {
                          console.log("Device Already registered on FCM")
                        }
                        else {
                          loginModel
                            .insertFcmToken(data_fcm_token)
                            .then((result) => {
                              if (result > 0) {
                                console.log("Success update FCM Token")
                              }
                            }).catch((err) =>
                              console.log("Error update FCM Token ", err)
                            );
                        }
                      })
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
              // generateMemberId();
              // data.member_id = generateMemberId();
              //insert into member
              res.json({
                message: "Sorry Please Try Again Later",
                status: false,
                code: 403,
                data: null,
              });
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
    let tokenGoogle = req.body.tokenGoogle;
    // const hash = bcrypt.hashSync(req.body.tokenGoogle, salt);
    // console.log(tokenGoogle);

    //Cheking token Google
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://redrubygroups-f93fd.firebaseio.com",
      });
    }
    // idToken comes from the client app
    admin
      .auth()
      .verifyIdToken(tokenGoogle)
      .then(async function (decodedToken) {
        console.log("accept");
        ////

        //Hashing Password
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(req.body.tokenGoogle, salt);

        //check AGE
        function calculate_age(dob) {
          var diff_ms = Date.now() - dob.getTime();
          var age_dt = new Date(diff_ms);

          return Math.abs(age_dt.getUTCFullYear() - 1970);
        }

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
          display_picture: "profile.svg",
          email: req.body.email,
          credential: hash,
          type: "Google",
          phone: req.body.phone,
          member_id: generateMemberId(),
          uuid: Randomtoken,
          point_level: 50,
          facebook: "",
          instagram: "",
          verified: 0,
        };

        // console.log(data);
        if (calculate_age(new Date(data.dob)) < 18) {
          return MiscHelper.responsesCustomForbidden(
            res,
            null,
            "You are not old enough",
            false,
            403
          );
        }

        //check phone number
        let checkPhone = [];
        try {
          checkPhone = await registerModel.checkPhone(data.phone);
        } catch (error) {
          MiscHelper.badRequest(res, error);
        }
        if (checkPhone[0]) {
          return MiscHelper.responsesCustomForbidden(
            res,
            null,
            "Phone Number Already Registered!",
            false,
            403
          );
        }

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
                        desc: "Welcome Point",
                        payment_date: new Date(),
                        created_at: new Date(),
                      };

                      // console.log(dataPointReward);

                      //Earn Point
                      try {
                        axios({
                          method: "post",
                          url:
                            "https://" +
                            process.env.HOST_POINT +
                            "/api/point/transactionPoint", //to Endpoint Check Point
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

                      data.display_picture =
                        "https://" +
                        process.env.HOST_MEMBER +
                        "/dp/profile.svg";
                      res.json({
                        message: "Register Success",
                        status: true,
                        code: 200,
                        data,
                      });
                    })
                    .catch((err) => MiscHelper.badRequest(res, err));
                } else {
                  //dupllicate id member please reload page
                  res.json({
                    message: "Sorry Please Try Again Later",
                    status: false,
                    code: 403,
                    data: null,
                  });
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

        /////
      })
      .catch(function (error) {
        MiscHelper.responsesCustomForbidden(
          res,
          null,
          "Token Google Not Valid",
          false,
          403
        );
      });
  },
};
