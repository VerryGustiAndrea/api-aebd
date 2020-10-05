const express = require("express");
const Router = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/memberDisplayPicture");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname.replace(/\s+/g, "-"));
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
// const TransactionController = require("../../controllers/transaction/transaction");
const auth = require("../../helpers/auth");

Router
  // Member
  .post("/loginEmail", LoginController.loginEmail)
  .post("/loginGoogle", LoginController.loginGoogle)
  .post("/registerEmail", RegisterController.registerMemberEmail)
  .post("/registerGoogle", RegisterController.registerMemberGoogle)
  .post("/forgotPassword", LoginController.forgotPassword)
  .put("/changePassword", auth.verify, ProfileController.changePassword)
  .put(
    "/changePhotoProfile",
    upload.single("image"),
    ProfileController.changePhotoProfile
  )
  .put("/UpdateProfileSosmed", ProfileController.updateProfile)

  .get("/getMemberTicket", MemberTicketController.getMemberTicket)
  .get(
    "/getMemberHistoryTransaction",
    // auth.verify,
    MemberHistoryTransactionController.getAllHistoryTransaction
  )
  .get(
    "/getMemberHistoryPoint",
    MemberHistoryPointController.getAllHistoryPoint
  )
  //Member Generate One Time QR
  .post("/OTQR", MemberOneTimeQRController.insertOTQR);

//Member Redeem
// .post("/redeem", MemberRedeemController.redeem)

//TmpMember
// .post("/tixr", TransactionController.fromTixr);

module.exports = Router;
