const express = require("express");
const blueRouter = require("./blue/blue.router");

const apiRouter = express.Router();

apiRouter.use("/blue", blueRouter);

module.exports = apiRouter;
