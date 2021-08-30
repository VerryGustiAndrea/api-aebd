const memberModels = require("../../models/member/historyTransaction");
const MiscHelper = require("../../helpers/helpers");

module.exports = {
  getAllHistoryTransaction: (req, res) => {
    let email = req.res.user.email

    memberModels
      .getAllHistoryTransaction(email)
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
