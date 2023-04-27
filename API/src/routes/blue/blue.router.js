const express = require("express");
const { httpGetAllPrices, httpGetLastPrices } = require("./blue.controller");

const blueRouter = express.Router();

blueRouter.get("/all", httpGetAllPrices);
blueRouter.get("/last", httpGetLastPrices);

module.exports = blueRouter;
