const express = require("express");

const member = require("./member");

// const profile = require("./profile");

const Router = express.Router();

Router.use("/member", member);

module.exports = Router;
