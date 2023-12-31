const profileModel = require("../../models/member/profile");
const MiscHelper = require("../../../app/helpers/helpers");
const bcrypt = require("bcrypt");
const sharp = require("sharp");

module.exports = {
  changePassword: (req, res) => {
    let id_user = req.res.user.id_user
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
              return MiscHelper.responsesCustom(
                res,
                null,
                "Success cange password, true"
              );
            })
            .catch((err) => MiscHelper.badRequest(res, err));
        } else {
          console.log("Password incorrect");
          return MiscHelper.responsesCustomForbidden(
            res,
            null,
            "Old Password Incorrect !",
            false,
            403
          );
        }
      })
      .catch((err) =>
        MiscHelper.responsesCustomForbidden(
          res,
          null,
          "Email or Password Incorrect !",
          false,
          403
        )
      );
  },

  changePhotoProfile: (req, res) => {
    console.log(req.res.user)

    if (req.file == undefined) {
      return MiscHelper.responsesCustomForbidden(
        res,
        null,
        "Error No Image",
        false,
        403
      );
    }

    //compress
    sharp("./uploads/memberDisplayPicture/" + req.file.filename)
      .toBuffer()
      .then((data) => {
        sharp(data)
          .jpeg({ quality: 30 })
          .toFile("./uploads/memberDisplayPicture/" + req.file.filename);
      })
      .catch((err) => {
        console.log("error compressing file");
      });

    let id_user = req.res.user.id_user
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
    let id_user = req.res.user.id_user
    let data = {
      facebook: req.body.facebook,
      instagram: req.body.instagram,
    };
    if (data.facebook == undefined) {
      data.facebook = "";
    }
    if (data.instagram == undefined) {
      data.instagram = "";
    }
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


  updateFCM: (req, res) => {
    let data = {
      id_user: req.res.user.id_user,
      fcm_token: req.body.fcm_token
    }

    profileModel
      .checkFcmToken(data.fcm_token).then((result) => {
        if (result.length > 0) {
          return MiscHelper.responsesCustomForbidden(
            res,
            null,
            "Device Already registered on FCM",
            false,
            403
          );
        }
        else {
          profileModel.updateFCM(data)
            .then((result) => {
              return MiscHelper.responses(res, "Success update FCM Token");
            }).catch((err) =>
              MiscHelper.responsesCustomForbidden(
                res,
                null,
                "Error update FCM Token ",
                false,
                403
              )
            )
        }
      })
  },


  getUserFcmToken: (req, res) => {
    let id_user = req.params.id_user
    profileModel.getUserFcmToken(id_user)
      .then((result) => {
        return MiscHelper.responses(res, result);
      })
      .catch((err) => MiscHelper.badRequest(res, err));
  }
};
