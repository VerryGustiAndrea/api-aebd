const memberModels = require("../../models/member/memberTicket");
const MiscHelper = require("../../../app/helpers/helpers");
const bcrypt = require("bcrypt");

module.exports = {
  getMemberTicket: (req, res) => {
    let member_id = req.headers["member_id"];
    memberModels
      .getMemberTicket(member_id)
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
