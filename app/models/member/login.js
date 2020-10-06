const connection = require("../../config/db");

module.exports = {
  checkUserEmailLogin: (email) => {
    return new Promise((resolve, reject) => {
      let data = {
        id_user: "",
        name: "",
        gender: "",
        display_picture: "",
        dob: "",
        email: "",
        passwordsql: "",
        member_type: "",
        phone: 0,
        member_id: "",
        uuid: "",
        point_level: 0,
        facebook: "",
        instagram: "",
      };
      connection.query(
        "SELECT * FROM user WHERE email= ? ",
        email,
        (err, result) => {
          result.forEach((e) => {
            data.id_user = e.id_user;
            data.name = e.name;
            data.gender = e.gender;
            data.display_picture = e.display_picture;
            data.dob = e.dob;
            data.email = e.email;
            data.passwordsql = e.credential;
            // data.type = e.type;
            data.phone = e.phone;
            data.member_id = e.member_id;
            data.uuid = e.uuid;
            data.point_level = e.point_level;
            data.facebook = e.facebook;
            data.instagram = e.instagram;
          });

          if (!err && result.length > 0) {
            resolve(data);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },

  checkUserGoogleLogin: (email) => {
    return new Promise((resolve, reject) => {
      let data = {
        id_user: "",
        name: "",
        gender: "",
        display_picture: "",
        dob: "",
        email: "",
        // passwordsql: "",
        member_type: "",
        phone: 0,
        member_id: "",
        uuid: "",
        point_level: 0,
        facebook: "",
        instagram: "",
      };
      connection.query(
        "SELECT * FROM user WHERE email= ? AND type='Google'",
        email,
        (err, result) => {
          result.forEach((e) => {
            data.id_user = e.id_user;
            data.name = e.name;
            data.gender = e.gender;
            data.display_picture = e.display_picture;
            data.dob = e.dob;
            data.email = e.email;
            // data.passwordsql = e.credential;
            // data.type = e.type;
            data.phone = e.phone;
            data.member_id = e.member_id;
            data.uuid = e.uuid;
            data.point_level = e.point_level;
            data.facebook = e.facebook;
            data.instagram = e.instagram;
          });

          if (data.point_level < 10000) {
            data.member_type = "RED MEMBER";
          } else if (data.point_level < 100000) {
            data.member_type = "GOLD MEMBER";
          } else if (data.point_level >= 10000) {
            data.member_type = "BLACK MEMBER";
          }

          if (!err && result.length > 0) {
            resolve(data);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },

  insertToken: (randomToken, id_user) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE user SET uuid=? WHERE id_user=?",
        [randomToken, id_user],
        (err, result) => {
          if (!err) {
            resolve(result.insertId);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },

  //FORGOT PASSWORD

  checkEmail: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM user WHERE email =?",
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

  newPassword: (hash, email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE user SET credential=? WHERE email=?",
        [hash, email],
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

  //END FORGOT PASSWORD
};
