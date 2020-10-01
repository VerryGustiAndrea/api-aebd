const connection = require("../../config/db");

module.exports = {
  //CHANGE PASSWORD
  getAllHistoryPoint: (id_user) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT user.name, log_history_point.total_point_before, log_history_point.total_point_operation,log_history_point.total_point_after, log_history_point.total_spend,o.role_name AS type_order,  log_history_point.created_at FROM log_history_point JOIN point ON log_history_point.id_point=point.id_point JOIN user ON point.id_user=user.id_user JOIN (SELECT * FROM role)AS  o ON log_history_point.type_order=o.id_role  WHERE point.id_user=? ORDER BY log_history_point.created_at DESC",
        id_user,
        (err, result) => {
          console.log(result);
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
