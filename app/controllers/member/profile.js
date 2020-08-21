const profileModel = require("../../models/member/profile");
const MiscHelper = require("../../../app/helpers/helpers");
const bcrypt = require("bcrypt");

module.exports = {
  changePassword: (req, res) => {
    let id_user = req.headers["id_user"];
    let new_password = req.body.new_password;
    let old_password = req.body.old_password;
    const saltRounds = 10;

    profileModel
      .checkOldPassword(id_user)
      .then((result) => {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(new_password, salt);
        let passwordCheck = bcrypt.compareSync(
          old_password,
          result[0].credential
        );
        //cek password
        if (passwordCheck == true) {
          profileModel
            .changePassword(hash, id_user)
            .then(() => {
              res.json({
                message: "Success change password",
                status: true,
                code: 200,
                data: null,
              });
            })
            .catch((err) => MiscHelper.badRequest(res, err));
        } else {
          console.log("Password incorrect");
          res.json({
            message: "Old Password Incorrect !",
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

  // updateProfile: (req, res) => {
  //   let id_user = req.headers["id_user"];
  //   let data = {
  //     first_name: req.body.first_name,
  //     last_name: req.body.last_name,
  //     identity_number: req.body.identity_number,
  //     email: req.body.email,
  //     phone_number: req.body.phone_number,
  //     fakultas: req.body.fakultas,
  //     prodi: req.body.prodi,
  //     updated_at: new Date(),
  //   };
  //   profileModel
  //     .editProfile(data, id_user)
  //     .then((result) => {
  //       if (result.length === 0) {
  //         return MiscHelper.responsesNull(res);
  //       } else {
  //         profileModel
  //           .checkUser(data.email)
  //           .then((result) => {
  //             return MiscHelper.responses(res, result);
  //           })
  //           .catch((err) => MiscHelper.badRequest(res, err));
  //       }
  //     })
  //     .catch((err) => MiscHelper.badRequest(res, err));
  // },

  // changePhotoProfile: (req, res) => {
  //   let id_user = req.headers["id_user"];
  //   let images = `http://54.166.135.115:4000/uploads/${req.file.filename}`;
  //   profileModel
  //     .changePhotoProfile(images, id_user)
  //     .then((result) => {
  //       if (result.length === 0) {
  //         return MiscHelper.responsesNull(res);
  //       } else {
  //         return MiscHelper.responses(res, images);
  //       }
  //     })
  //     .catch((err) => MiscHelper.badRequest(res, err));
  // },
};
