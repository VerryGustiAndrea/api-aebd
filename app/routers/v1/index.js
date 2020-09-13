const express = require("express");

const member = require("./member");
const backOffice = require("./backOffice");

// const profile = require("./profile");

const Router = express.Router();

Router.use("/member", member);
Router.use("/backOffice", backOffice);

module.exports = Router;
