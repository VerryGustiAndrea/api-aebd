const connection = require("../../config/db");
const sql = require("mssql");

//mssql
const config = {
  user: "sa",
  password: "123456",
  server: "192.168.1.65",
  database: "dbElektrik",
  port: 1034,
  pool: {
    max: 230,
    min: 0,
  },
  encrypt: false,
  options: {
    enableArithAbort: true,
    database: "dbElektrik",
    instancename: "SQLEXPRESS",
    port: 1034,
  },
};

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

  insertMembers: (data) => {
    console.log(data);
    return new Promise((resolve, reject) => {
      sql.connect(config, (err) => {
        console.log(data.length);

        data.forEach((element) => {
          const request = new sql.Request();
          console.log(element);
          // insert;
          let cols = [];
          let inputs = [];
          for (let k in element) {
            request.input(k, element[k]);
            cols.push(k);
            inputs.push("@" + k);
          }
          request.query(
            `INSERT INTO Members (${cols.toString()}) values (${inputs.toString()})`,
            (err, result) => {
              if (!err) {
                // console.log(result);
                resolve(result);
              } else {
                reject(new Error(err));
              }
            }
          );
        });
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
        "SELECT * FROM log_history_point WHERE email=? ORDER BY created_at DESC LIMIT 1",
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
