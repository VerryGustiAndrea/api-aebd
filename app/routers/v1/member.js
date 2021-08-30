const express = require("express");
const Router = express.Router();
const auth = require("../../helpers/auth");
const jwt = require("../../helpers/middleware/auth");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/memberDisplayPicture");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(new RegExp(":", "g"), "_")
        .replace(new RegExp(" ", "g"), "-") +
      file.originalname
        .replace(new RegExp(":", "g"), "_")
        .replace(new RegExp(" ", "g"), "-")
    );
  },
});
const upload = multer({ storage });

const RegisterController = require("../../controllers/member/register");
const LoginController = require("../../controllers/member/login");
const ProfileController = require("../../controllers/member/profile");
const MemberTicketController = require("../../controllers/member/memberTicket");
const MemberHistoryTransactionController = require("../../controllers/member/historyTransaction");
const MemberHistoryPointController = require("../../controllers/member/historyPoint");
// const MemberRedeemController = require("../../controllers/member/redeem");
const MemberOneTimeQRController = require("../../controllers/member/oneTimeQR");
const donateController = require("../../controllers/donate/donate");

Router
  // Member
  .post("/loginEmail", LoginController.loginEmail)
  .post("/loginGoogle", LoginController.loginGoogle)
  .post("/registerEmail", RegisterController.registerMemberEmail)
  .post("/registerGoogle", RegisterController.registerMemberGoogle)
  .post("/forgotPassword", LoginController.forgotPassword)
  .put("/changePassword", jwt.verifyToken, ProfileController.changePassword)
  .put(
    "/changePhotoProfile",
    upload.single("image"), jwt.verifyToken,
    ProfileController.changePhotoProfile
  )

  .put("/UpdateProfileSosmed", jwt.verifyToken, ProfileController.updateProfile)
  .get("/getUserFcmToken/:id_user", jwt.verifyToken, ProfileController.getUserFcmToken)
  .put("/UpdateFcmToken", jwt.verifyToken, ProfileController.updateFCM)

  .get("/getMemberTicket", jwt.verifyToken, MemberTicketController.getMemberTicket)
  .get(
    "/getMemberHistoryTransaction", jwt.verifyToken, MemberHistoryTransactionController.getAllHistoryTransaction
  )
  .get(
    "/getMemberHistoryPoint", jwt.verifyToken, MemberHistoryPointController.getAllHistoryPoint
  )
  //Member Generate One Time QR
  .post("/OTQR", jwt.verifyToken, MemberOneTimeQRController.insertOTQR)

  //donation
  .post("/donate/:id_user", jwt.verifyToken, donateController.donate);

//Member Redeem
// .post("/redeem", MemberRedeemController.redeem)

//TmpMember
// .post("/tixr", TransactionController.fromTixr);

module.exports = Router;
