const jwt = require("jsonwebtoken");
const connection = require("../config/db");
const MiscHelper = require("../../app/helpers/helpers");
const redeemModels = require("../models/member/redeem");

module.exports = {
  verify: (req, res, next) => {
    token = req.headers["x-access-token"];
    id_user = req.headers["id_user"];
    member_id = req.headers["member_id"];
    console.log(token, id_user);
    connection.query(
      "SELECT uuid FROM user WHERE id_user=?",
      id_user,
      (err, result) => {
        console.log(result);
        console.log(token, id_user, member_id);
        // console.log(result);
        if ((result == undefined) | (result.length == 0)) {
          console.log("Token Expried");
          MiscHelper.sessionExpried(res, err);
        } else if (result[0].uuid == token) {
          console.log("Token Valid");
          next();
        } else {
          console.log("Token Expried");
          MiscHelper.sessionExpried(res, err);
        }
      }
    );
  },

  verifyQR: (req, res, next) => {
    // console.log(req.body.OTQR.slice(24));
    let id_user = req.body.OTQR.slice(24);
    let qr = req.body.OTQR;
    redeemModels.checkMemberRedeemSession(id_user).then((result) => {
      // console.log(result);

      token = result[0].OTQR;
      try {
        //check verify
        const decoded = jwt.verify(token, "GenerasiOptimis");

        //next action
        console.log("QR Valid");
        next();
        // return member;
      } catch (err) {
        console.log(err);
        res.json({
          msg: "QR Expried",
          status: false,
        });
      }
    });
  },
};
