const connection = require("../../config/db");

module.exports = {
  checkPoint: (id_user) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM point WHERE id_user=?`,
        id_user,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
};
