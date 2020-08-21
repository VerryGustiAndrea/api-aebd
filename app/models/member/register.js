const connection = require("../../config/db");

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
