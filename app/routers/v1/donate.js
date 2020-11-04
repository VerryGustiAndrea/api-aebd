const express = require("express");
const Router = express.Router();

const multer = require("multer");

const donateController = require("../../controllers/donate/donate");

const auth = require("../../helpers/auth");

Router
  // Member
  .get("/:id_user", donateController.donate);

module.exports = Router;
