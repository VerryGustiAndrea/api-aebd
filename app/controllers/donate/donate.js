const donateModel = require("../../models/donate/donate");
const MiscHelper = require("../../helpers/helpers");

module.exports = {
  donate: (req, res) => {
    let id_user = req.headers["id_user"];
    // console.log(id_user);

    donateModel
      .checkPoint(id_user)
      .then((result) => {
        if (result.length === 0) {
          return MiscHelper.responsesNull(res);
        } else {
          // console.log(result);
          return MiscHelper.responses(res, result);
        }
      })
      .catch((err) => MiscHelper.badRequest(res, err));
  },
};
