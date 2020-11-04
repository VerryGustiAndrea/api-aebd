const connection = require("../../config/db");

module.exports = {
  checkPoint: (id_user) => {
    console.log(id_user);
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT point.* , user.email  FROM point JOIN user ON point.id_user=user.id_user WHERE point.id_user=?`,
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

  updatePointDonation: (total_point) => {
    let updated_at = new Date();
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE point SET updated_at=?, total_point=total_point+? WHERE id_user=2",
        [updated_at, total_point],
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

  updatePointUser: (total_point, id_user) => {
    let updated_at = new Date();
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE point SET updated_at=?, total_point=total_point-? WHERE id_user=?",
        [updated_at, total_point, id_user],
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

  insertLogHistoryPoint: (data) => {
    return new Promise((resolve, reject) => {
      console.log(data);
      connection.query(
        `INSERT INTO log_history_point SET id_point=${data.id_point}, email="${data.email}", order_id=${data.order_id}, order_picture="${data.order_picture}", total_point_before=${data.total_point_before}, total_point_operation=${data.total_point_operation}, total_point_after=${data.total_point_after},type_order=${data.type_order}, total_spend=${data.total_spend}, description="${data.desc}"`,

        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            console.log(err);
            // reject(new Error(err));
          }
        }
      );
    });
  },
};
