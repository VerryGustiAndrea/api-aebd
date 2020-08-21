const connection = require("../../config/db");

module.exports = {
  //UPDATE NEW QR USER
  updateQRUser: (token, id_user) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE user SET OTQR= ? WHERE id_user=?",
        [token, id_user],
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

  // editProfile: (data, id_user) => {
  //   return new Promise((resolve, reject) => {
  //     connection.query(
  //       `UPDATE rel_user, tb_user SET tb_user.first_name='${data.first_name}', tb_user.last_name='${data.last_name}',tb_user.identity_number='${data.identity_number}', tb_user.email='${data.email}', tb_user.phone_number='${data.phone_number}', rel_user.id_fakultas='${data.fakultas}', rel_user.id_prodi='${data.prodi}' ,rel_user.updated_at=? WHERE rel_user.id_user = tb_user.id_user and tb_user.id_user = ?`,
  //       [data.updated_at, id_user],
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

  // checkUser: (email) => {
  //   return new Promise((resolve, reject) => {
  //     let data = {
  //       id_user: 0,
  //       first_name: "",
  //       last_name: "",
  //       identity_number: 0,
  //       email: "",
  //       phone_number: 0,
  //       display_picture: "",
  //       fakultas: "",
  //       prodi: "",
  //       role: "",
  //       session_token: "",
  //       updated_at: null,
  //     };
  //     connection.query(
  //       "SELECT tb_user.*, tb_role.role_name ,tb_session.jwt_token, tb_fakultas.nama_fakultas, tb_prodi.nama_prodi, rel_user.updated_at FROM rel_user JOIN tb_role ON rel_user.id_role=tb_role.id_role JOIN tb_session ON rel_user.id_session=tb_session.id_session JOIN tb_user ON rel_user.id_user=tb_user.id_user JOIN tb_fakultas ON rel_user.id_fakultas=tb_fakultas.id_fakultas JOIN tb_prodi ON rel_user.id_prodi=tb_prodi.id_prodi WHERE tb_user.email= ?",
  //       email,
  //       (err, result) => {
  //         result.forEach((e) => {
  //           data.first_name = e.first_name;
  //           data.last_name = e.last_name;
  //           data.identity_number = e.identity_number;
  //           data.email = e.email;
  //           data.phone_number = e.phone_number;
  //           data.display_picture = e.display_picture;
  //           data.fakultas = e.nama_fakultas;
  //           data.prodi = e.nama_prodi;
  //           data.role = e.role_name;
  //           data.session_token = e.jwt_token;
  //           data.updated_at = new Date(e.updated_at + "GMT")
  //             .toISOString()
  //             .replace(/T|.000Z/g, " ");
  //         });

  //         if (!err && result.length > 0) {
  //           resolve(data);
  //         } else {
  //           reject(new Error(err));
  //         }
  //       }
  //     );
  //   });
  // },

  // //CHANGE PHOTO PROFILE
  // changePhotoProfile: (images, id_user) => {
  //   return new Promise((resolve, reject) => {
  //     connection.query(
  //       "UPDATE tb_user SET display_picture = ? WHERE id_user=?",
  //       [images, id_user],
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
