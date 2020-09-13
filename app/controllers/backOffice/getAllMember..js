const backOfficeModel = require("../../models/backOffice/backOffice");
const MiscHelper = require("../../helpers/helpers");

module.exports = {
  getAllMember: (req, res) => {
    backOfficeModel
      .getAllUser()
      .then((result) => {
        if (result.length === 0) {
          return MiscHelper.responsesNull(res);
        } else {
          return MiscHelper.responses(res, result);
        }
      })
      .catch((err) => MiscHelper.badRequest(res, err));
  },

  getlMemberById: (req, res) => {
    backOfficeModel
      .getAllUser()
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
