const historyPointModel = require("../../models/member/historyPoint");
const MiscHelper = require("../../helpers/helpers");

module.exports = {
  getAllHistoryPoint: (req, res) => {
    let id_user = req.headers["id_user"];
    console.log(id_user);

    historyPointModel
      .getAllHistoryPoint(id_user)
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
