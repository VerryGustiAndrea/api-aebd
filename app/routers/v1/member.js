const express = require("express");
const Router = express.Router();

const RegisterController = require("../../controllers/member/register");
const LoginController = require("../../controllers/member/login");
const ProfileController = require("../../controllers/member/profile");
const MemberTicketController = require("../../controllers/member/memberTicket");
const MemberHistoryController = require("../../controllers/member/historyTransaction");
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

  .get("/getMemberTicket", MemberTicketController.getMemberTicket)
  .get(
    "/getMemberHistoryTransaction",
    auth.verify,
    MemberHistoryController.getAllHistoryTransaction
  )
  //Member Generate One Time QR
  .post("/OTQR", MemberOneTimeQRController.insertOTQR);

//Member Redeem
// .post("/redeem", MemberRedeemController.redeem)

//TmpMember
// .post("/tixr", TransactionController.fromTixr);

module.exports = Router;
