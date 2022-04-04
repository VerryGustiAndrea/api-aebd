const loginModel = require("../../models/member/login");
const MiscHelper = require("../../helpers/helpers");
const nodemailer = require("nodemailer");
const service = require("../../config/gmail");
const bcrypt = require("bcrypt");
const admin = require("firebase-admin");
const serviceAccount = require("../../config/redrubygroups-f93fd-firebase-adminsdk-2hny4-454f9c9d7f.json");
const templateForgot = require("../../helpers/templateEmail/forgetPassword");
const jwt = require("jsonwebtoken");


module.exports = {
  //START LOGIN EMAIL
  loginEmail: (req, res) => {
    let email = req.body.email;
    let password = req.body.password;


    loginModel
      .checkUserEmailLogin(email)
      .then((data) => {
        let dataTmp = data;
        let passwordCheck = bcrypt.compareSync(password, dataTmp.passwordsql);
        console.log(passwordCheck)
        if (passwordCheck == true) {
          //cek password
          console.log("Password match");
          //jwt
          console.log(dataTmp)
          const payload = { id_user: dataTmp.id_user, email }
          const token = jwt.sign(payload, process.env.TOKEN_KEY);
          console.log(token)
          loginModel
            .insertToken(token, dataTmp.id_user)
            .then((result) => {

              //insert new token to member
              let dataUser = {
                id_user: dataTmp.id_user,
                name: dataTmp.name,
                gender: dataTmp.gender,
                display_picture:
                  `https://` +
                  process.env.HOST_MEMBER +
                  "/dp/" +
                  dataTmp.display_picture,
                dob: dataTmp.dob,
                email: dataTmp.email,
                member_type: dataTmp.member_type,
                phone: dataTmp.phone,
                member_id: dataTmp.member_id,
                session_token: token,
                facebook: dataTmp.facebook,
                instagram: dataTmp.instagram,
              };
              console.log(dataUser)

              //insert new fcm token
              if (req.body.fcm_token) {
                let data_fcm_token = {
                  id_user: dataUser.id_user,
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
                message: "success",
                status: true,
                code: 200,
                data: dataUser,
              });
            })
            .catch((err) => console.log(err));
        } else {
          console.log("Password incorrect");
          res.json({
            message: "Email or Password Incorrect !",
            status: false,
            code: 403,
            data: null,
          });
        }
      })
      .catch((err) =>
        console.log(err),
        res.json({
          message: "Email or Password Incorrect !",
          status: false,
          code: 403,
          data: null,
        })
      );
  },
  //END LOGIN EMAIL

  // //firebase

  //START LOGIN GOOGLE
  loginGoogle: (req, res) => {
    let email = req.body.email;
    let tokenGoogle = req.body.tokenGoogle;
    // console.log(tokenGoogle);
    //Check Token Google

    // idToken comes from the client app
    admin
      .auth()
      .verifyIdToken(tokenGoogle)
      .then(function (decodedToken) {
        //
        //Accept
        console.log("accept");
        loginModel
          .checkUserGoogleLogin(email)
          .then((data) => {
            // console.log(data);
            let dataTmp = data;

            //genereate random token
            let Randomtoken =
              Math.random().toString(36).substring(2, 15) +
              Math.random().toString(36).substring(2, 15);

            loginModel
              .insertToken(Randomtoken, dataTmp.id_user)
              .then((result) => {
                //insert new token to member
                let dataUser = {
                  id_user: dataTmp.id_user,
                  name: dataTmp.name,
                  gender: dataTmp.gender,
                  display_picture:
                    `https://` +
                    process.env.HOST_MEMBER +
                    `/dp/` +
                    dataTmp.display_picture,
                  dob: dataTmp.dob,
                  email: dataTmp.email,
                  member_type: dataTmp.member_type,
                  phone: dataTmp.phone,
                  member_id: dataTmp.member_id,
                  session_token: Randomtoken,
                  facebook: dataTmp.facebook,
                  instagram: dataTmp.instagram,
                };
                // console.log(dataUser);
                res.json({
                  message: "success",
                  status: true,
                  // code: 200,
                  data: dataUser,
                });
              })
              .catch((err) => MiscHelper.badRequest(res, err));
          })
          .catch((err) =>
            res.json({
              message: "Email or Password Incorrect !",
              status: false,
              code: 403,
              data: null,
            })
          );
      })
      .catch((error) => {
        //Reject
        MiscHelper.responsesCustomForbidden(
          res,
          null,
          "Token Google Not Valid",
          false,
          403
        );
      });
    // console.log("google error");3
  },
  //END LOGIN GOOGLE

  //START FORGOT PASSWORD

  forgotPassword: (req, res) => {
    console.log("checkkk");
    let email = req.body.email;
    // console.log(email);
    // password generator
    let newPassword = Math.random().toString(36).substring(2, 8);
    console.log(newPassword)
    //check email
    loginModel
      .checkEmail(email)
      .then((e) => {
        if (e.length == 0) {
          res.json({
            message: "Email tidak terdaftar !",
            status: false,
            code: 403,
            data: null,
          });
        } else {
          const saltRounds = 10;
          const salt = bcrypt.genSaltSync(saltRounds);
          const hash = bcrypt.hashSync(newPassword, salt);
          loginModel.newPassword(hash, email).then(() => {
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
              from: "noreply@redrubygroup.com",
              to: email,
              subject: "Forgot Password",
              html: templateForgot.welcome(email, newPassword),
            };
            transporter
              .sendMail(mailOptions)
              .then(() => {
                res.json({
                  message: "success",
                  status: true,
                  code: 200,
                  data: null,
                });
              })
              .catch((err) => {
                console.log(err)
                res.status(500).json({
                  message: err,
                  status: false,
                  code: 500,
                  data: null,
                });
              });
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: err,
          status: false,
          code: 500,
        });
      });
  },

  //CHANGE PASSWORD
};
