const connection = require("../../config/db");
const sql = require("mssql");

module.exports = {
  checkEmailRegister: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT email from user WHERE email=?",
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

  checkPhone: (phone) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT phone from user WHERE phone=?",
        phone,
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

  registerUser: (data) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO user SET ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },


  checkToken: (member_id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT uuid FROM user WHERE member_id=?",
        member_id,
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

  checkTmpUser: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM tmp_user WHERE email=?",
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

  checkPointTMP: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM transaction WHERE email=? ORDER BY created_at DESC LIMIT 1",
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

  // insertRelUser: (dataUserNew) => {
  //   return new Promise((resolve, reject) => {
  //     connection.query(
  //       "INSERT INTO rel_user SET ?",
  //       dataUserNew,
  //       (err, result) => {
  //         if (!err) {
  //           resolve(result);
  //         } else {
  //           reject(new Error(err));
  //         }
  //       }
  //     );
  //   });
  // },
};
