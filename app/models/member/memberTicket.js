const connection = require("../../config/db");

module.exports = {
  //CHANGE PASSWORD
  getMemberTicket: (member_id) => {
    let data = "";

    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM ticket JOIN event ON ticket.id_event=event.id_event WHERE member_id=? ORDER BY date_started DESC",
        member_id,
        (err, result) => {
          let data = result.map((e) => {
            return {
              name_event: e.name_event,
              fullname: e.fullname,
              email: e.email,
              phone: e.phone,
              value_qr: e.value_qr,
              time: e.time,
              type: e.type,
              pax: 7,
              no_ticket: 1,
              date_started: e.date_started,
              date_ended: e.date_ended,
              used: 0,
              svg: process.env.PATH_SVG + e.svg,
              created_at: e.created_at,
            };
          });

          if (!err) {
            resolve(data);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
};
