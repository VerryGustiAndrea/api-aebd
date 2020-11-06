const express = require("express");

const member = require("./member");
const backOffice = require("./backOffice");
// const donate = require("./donate");

// const profile = require("./profile");

const Router = express.Router();

Router.use("/", member);

module.exports = Router;
