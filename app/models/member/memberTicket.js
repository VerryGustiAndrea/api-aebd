const connection = require("../../config/db");

module.exports = {
  //CHANGE PASSWORD
  getMemberTicket: (member_id) => {
    let data = "";

    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM ticket  JOIN booking_order ON ticket.id_booking_order=booking_order.id_booking_order JOIN event ON booking_order.id_event=event.id_event WHERE ticket.used=0 AND booking_order.member_id=? AND booking_order.status=3 ORDER BY ticket.id_ticket DESC",
        member_id,
        (err, result) => {
          console.log(result);

          // console.log(result);

          if (!err) {
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
                description: e.description,
                created_at: e.created_at,
              };
            });
            resolve(data);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
};
