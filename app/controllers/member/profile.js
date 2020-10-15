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

  changePhotoProfile: (req, res) => {
    let id_user = req.headers["id_user"];
    let images = req.file.filename;
    profileModel
      .changePhotoProfile(images, id_user)
      .then((result) => {
        if (result.length === 0) {
          return MiscHelper.responsesNull(res);
        } else {
          return MiscHelper.responses(res, process.env.PATH_DP + images);
        }
      })
      .catch((err) => MiscHelper.badRequest(res, err));
  },

  updateProfile: (req, res) => {
    let id_user = req.headers["id_user"];
    let data = {
      facebook: req.body.facebook,
      instagram: req.body.instagram,
    };
    profileModel
      .editProfile(data, id_user)
      .then((result) => {
        if (result.length === 0) {
          return MiscHelper.responsesNull(res);
        } else {
          return MiscHelper.responses(res, "success update profile");
        }
      })
      .catch((err) => MiscHelper.badRequest(res, err));
  },
};
