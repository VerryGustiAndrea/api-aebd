const profileModel = require("../../models/member/profile");
const MiscHelper = require("../../helpers/helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  checkMemberEmail: (req, res) => {
    let email = req.params.email

    console.log(email);

    profileModel
      .checkMemberByEmail(email)
      .then((result) => {
        if (result) {
          if (result.length > 0) {
            let data = result[0]
            data.display_picture = process.env.PATH_DP + data.display_picture
            delete data["uuid"]
            delete data["OTQR"]
            delete data["credential"]
            return MiscHelper.responses(res, data);
          } else {
            console.log("disini")
            return MiscHelper.responsesNull(res, "")
          }
        } else {
          return MiscHelper.badRequest(res, "")
        }
      })
      .catch((err) => MiscHelper.badRequest(res, err));
  },
};
