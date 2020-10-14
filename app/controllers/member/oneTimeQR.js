const oneTimeQRModel = require("../../models/member/oneTimeQR");
const MiscHelper = require("../../helpers/helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  insertOTQR: (req, res) => {
    let id_user = req.headers["id_user"];
    let OTQR = new Date().toJSON() + id_user;

    console.log("ini", OTQR);

    //JWT set expired 5 minutes
    var token = jwt.sign({ id: id_user, data: OTQR }, "GenerasiOptimis", {
      expiresIn: 60 * 5,
    });

    oneTimeQRModel
      .updateQRUser(token, id_user)
      .then((result) => {
        return MiscHelper.responses(res, OTQR);
      })
      .catch((err) => MiscHelper.badRequest(res, err));
  },
};
