const connection = require("../../config/db");

module.exports = {
  //CHANGE PASSWORD
  getAllHistoryPoint: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT transaction.email, transaction.order_id, transaction.raptor_sales_no, transaction.crypto_burger, transaction.claimed, transaction.order_picture, transaction.total_point_before, transaction.total_point_operation,transaction.total_point_after, transaction.total_spend,o.role_name AS type_order,transaction.description,  transaction.created_at FROM transaction JOIN (SELECT * FROM role)AS  o ON transaction.type_order=o.id_role  WHERE transaction.email=? ORDER BY transaction.id_transaction DESC",
        email,
        (err, result) => {
          result.map((e) => {
            if (e.order_picture != null)
              e.order_picture =
                `https://` + process.env.PATH_RECEIPT + e.order_picture;
          });
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
