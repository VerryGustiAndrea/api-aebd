const connection = require("../../config/db");

module.exports = {
  //CHANGE PASSWORD
  getAllHistoryPoint: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT log_history_point.email, log_history_point.order_id, log_history_point.order_picture, log_history_point.total_point_before, log_history_point.total_point_operation,log_history_point.total_point_after, log_history_point.total_spend,o.role_name AS type_order,log_history_point.description,  log_history_point.created_at FROM log_history_point JOIN (SELECT * FROM role)AS  o ON log_history_point.type_order=o.id_role  WHERE log_history_point.email=? ORDER BY log_history_point.created_at DESC",
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
