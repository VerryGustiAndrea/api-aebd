
const jwt = require("jsonwebtoken");
const config = process.env;
const MiscHelper = require("../../../app/helpers/helpers");
const authModel = require("../../models/auth/auth");



module.exports = {
   verifyToken: async (req, res, next) => {
      if (!req.headers["authorization"]) {
         return MiscHelper.sessionExpried(res);
      }
      let bearer = req.headers["authorization"]
      // console.log(bearer)
      const token = bearer.slice(7)
      if (!token) {
         return res.status(403).send("A token is required for authentication");
      }
      try {
         const decoded = jwt.verify(token, config.TOKEN_KEY);
         // console.log(decoded)
         const user = await authModel
            .checkMember(decoded.id_user)
         delete user[0]['uuid']
         delete user[0]['OTQR']
         delete user[0]['credential']
         res.user = user[0];
         return next();

      } catch (err) {
         return MiscHelper.sessionExpried(res, err);
      }
   }
}