const connection = require("../../config/db");

module.exports = {
  //CHANGE PASSWORD
  getAllHistoryTransaction: (email) => {
    let data = "";

    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT log_history.*, role.role_name as type_order FROM log_history join role ON  log_history.type_order=role.id_role WHERE email=? ORDER BY id_log_history DESC",
        email,
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
