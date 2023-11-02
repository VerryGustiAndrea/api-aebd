const express = require("express");

const member = require("./member");

const Router = express.Router();

Router.use("/", member);

module.exports = Router;
