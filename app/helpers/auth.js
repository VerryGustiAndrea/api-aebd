const jwt = require("jsonwebtoken");
const connection = require("../config/db");
const MiscHelper = require("../../app/helpers/helpers");

module.exports = {
  verify: (req, res, next) => {
    token = req.headers["session_token"];
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

};
