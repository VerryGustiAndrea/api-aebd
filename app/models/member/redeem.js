const connection = require("../../config/db");

module.exports = {
  //CHECK MEMBER CARD
  checkOTQR: (id_user) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT OTQR FROM user WHERE id_user=?",
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

  //CHECK MEMBER CARD
  checkMemberCard: (id_user) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM user WHERE id_user=?",
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

  //CHECK MEMBER REDEEM SESSION
  checkMemberRedeemSession: (id_user) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT OTQR FROM user WHERE id_user=?",
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

  //CHANGE PASSWORD
  redeem: (id_user, itemPrice) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE point SET total_point=total_point-${itemPrice} WHERE id_user=?`,
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
