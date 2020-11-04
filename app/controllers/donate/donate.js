const donateModel = require("../../models/donate/donate");
const MiscHelper = require("../../helpers/helpers");

module.exports = {
  donate: (req, res) => {
    let id_user = req.params.id_user;
    let total_donate = req.body.total_donate;
    console.log(id_user, total_donate);

    //check point
    donateModel
      .checkPoint(id_user)
      .then(async (result) => {
        console.log(result);
        if (result.length === 0) {
          return MiscHelper.serverNotFound(res);
        } else {
          if (total_donate <= result[0].total_point) {
            //donate
            let DataHistoryPointUser = {
              id_point: result[0].id_point,
              email: result[0].email,
              order_id: new Date().valueOf(),
              order_picture: null,
              total_point_before: result[0].total_point,
              total_point_operation: parseInt(total_donate),
              total_point_after: result[0].total_point - parseInt(total_donate),
              type_order: 7,
              total_spend: 0,
              desc: "Donation to Red Ruby",
              created_at: new Date(),
            };

            let dataPoint = [];
            try {
              dataPoint = await donateModel.checkPoint(2);
            } catch (error) {
              console.log(error);
            }

            console.log(dataPoint);
            //donate
            let DataHistoryPointDonateUser = {
              id_point: 2,
              email: "redrubygroups@gmail.com",
              order_id: new Date().valueOf(),
              order_picture: null,
              total_point_before: dataPoint[0].total_point,
              total_point_operation: parseInt(total_donate),
              total_point_after:
                dataPoint[0].total_point + parseInt(total_donate),
              type_order: 7,
              total_spend: 0,
              desc: "Accept Donation From " + result[0].email,
              created_at: new Date(),
            };

            try {
              await donateModel.updatePointDonation(total_donate);
              await donateModel.updatePointUser(total_donate, id_user);
              await donateModel.insertLogHistoryPoint(DataHistoryPointUser);
              await donateModel.insertLogHistoryPoint(
                DataHistoryPointDonateUser
              );
            } catch (error) {
              MiscHelper.badRequest(res, error);
            }

            return MiscHelper.responsesCustom(
              res,
              DataHistoryPointUser,
              "Succes Donating Point",
              true
            );
          } else {
            return MiscHelper.responsesCustomForbidden(
              res,
              null,
              "your point isn't enough",
              false,
              403
            );
          }
        }
      })
      .catch((err) => console.log(err));
  },
};
