const historyPointModel = require("../../models/member/historyPoint");
const MiscHelper = require("../../helpers/helpers");

module.exports = {
  getAllHistoryPoint: (req, res) => {
    let email = req.headers["email"];
    // console.log(id_user);

    historyPointModel
      .getAllHistoryPoint(email)
      .then((result) => {
        if (result.length === 0) {
          return MiscHelper.responsesNull(res);
        } else {
          return MiscHelper.responses(res, result);
        }
      })
      .catch((err) => MiscHelper.badRequest(res, err));
  },
};
