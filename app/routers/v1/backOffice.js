const express = require("express");
const Router = express.Router();

const backOfficeController = require("../../controllers/backOffice/getAllMember.");

Router

  //Banner Menu Club
  .get("/getAllMember", backOfficeController.getAllMember);

module.exports = Router;
