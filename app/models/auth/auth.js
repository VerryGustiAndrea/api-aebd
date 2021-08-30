const connection = require("../../config/db");

module.exports = {
  checkMember: (id_user) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM user WHERE id_user= ? ",
        id_user,
        (err, result) => {
          if (result[0].facebook.length == 0) {
            result[0].facebook = "";
          }
          if (result[0].instagram.length == 0) {
            result[0].instagram = "";
          }

          let point_level = result[0].point_level
          let member_type = 0

          if (point_level < 10000) {
            member_type = 0;
          }
          else if (point_level < 100000) {
            member_type = 1;
          } else if (point_level >= 100000) {
            member_type = 2;
          }
          result[0].member_type = member_type
          if (!err && result.length > 0) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },


};
