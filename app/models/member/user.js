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

  checkUserEmailLogin: (email) => {
    return new Promise((resolve, reject) => {
 
      connection.query(
        "SELECT * FROM user WHERE email= ? ",
        email,
        (err, result) => {        
          if (!err && result.length > 0) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },

  insertToken: (token, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE user SET token=? , updatedAt=? WHERE id=?",
        [token,Date.now(),  id],
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
