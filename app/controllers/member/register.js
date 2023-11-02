const userModel = require("../../models/member/user");
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
    console.log(req.body.name);
    if (!req.body.name) {
      return MiscHelper.responsesCustomForbidden(
        res,
        null,
        "Name not fulfilled ",
        false,
        403
      );
    } else if (!req.body.password) {
      return MiscHelper.responsesCustomForbidden(
        res,
        null,
        "Password not fulfilled ",
        false,
        403
      )
    }  else if (!req.body.email) {
      return MiscHelper.responsesCustomForbidden(
        res,
        null,
        "Email not fulfilled ",
        false,
        403
      );
    } else if (!req.body.roleId) {
      return MiscHelper.responsesCustomForbidden(
        res,
        null,
        "Role id not fulfilled ",
        false,
        403
      );
    }  else if (!req.body.phone) {
      return MiscHelper.responsesCustomForbidden(
        res,
        null,
        "Phone Number not fulfilled ",
        false,
        403
      );
    }   
    //Hashing Password
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);


    //GenerateToken
    let Randomtoken =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    let data = {
      name: req.body.name,
      email: req.body.email,
      password: hash,
      roleId: req.body.roleId,
      phone: req.body.phone,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    //get email from database where email=email_inputan
    userModel
      .checkEmailRegister(data.email)
      .then((e) => {
        //check email sudah terdaftar atau belum
        if (e.length == 0) {
          console.log("register")
          
          userModel
          .registerUser(data)
          .then(async (result) => {
            data.id_user = result.insertId;
            console.log("success")
            res.status(200).json({message: "Register Success",
            status: true,
            code: 200,
            data, });
          })
          .catch((err) => MiscHelper.badRequest(res, err));
        
        } else {
         return res.status(403).json({
            message: "Email already registered!",
            status: false,
            code: 403,
            data: null,
          });
        }
      })
      .catch((err) => 
      MiscHelper.badRequest(res, err)
      );
  },

  loginEmail: (req, res) => {
    let email = req.body.email;
    let password = req.body.password;


    userModel
      .checkUserEmailLogin(email)
      .then((data) => {
        data=data[0]

        let passwordCheck = bcrypt.compareSync(password, data.password);
        if (passwordCheck == true) {
          //cek password
          console.log("Password match");
          //jwt
          const payload = { id: data.id, email }
          const token = jwt.sign(payload, process.env.TOKEN_KEY);
          data.token=token

          userModel
            .insertToken(token, data.id)
            .then((result) => {
              console.log(result)

            //   //insert new token to member
            res.status(200).json({message: "Success",
            status: true,
            code: 200,
            data:data });
            })
            .catch((err) => res.json({
              message: "Email or Password Incorrecta !",
              status: false,
              code: 403,
              data: null,
            }));
            
        } else {
          console.log("Password incorrect");
          res.json({
            message: "Email or Password Incorrects !",
            status: false,
            code: 403,
            data: null,
          });
        }
      })
      .catch((err) =>
        res.json({
          message: "Email or Password Incorrect !",
          status: false,
          code: 403,
          data: null,
        })
      );
  },

};
