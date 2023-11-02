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
const memberController = require("../../controllers/member/member");

Router
  // Member
  .post("/loginEmail", LoginController.loginEmail)
  .post("/loginGoogle", LoginController.loginGoogle)
  .post("/registerEmail", RegisterController.registerMemberEmail)
  .post("/registerGoogle", RegisterController.registerMemberGoogle)
  .post("/forgotPassword", LoginController.forgotPassword)
  .put("/changePassword", jwt.verifyToken, ProfileController.changePassword)
  // .put(
  //   "/changePhotoProfile",
  //   upload.single("image"), jwt.verifyToken,
  //   ProfileController.changePhotoProfile
  // )

  //check member
  .get("/checkMember/:email", memberController.checkMemberEmail);



module.exports = Router;
