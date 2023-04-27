const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const apiRouter = require("./routes/api.router");

require("dotenv").config();

const { scrapDolarBlue } = require("./services/scrapper");
const { saveBlue } = require("./models/blue/blue.model");

const WEB_URL = "http://localhost:5173";

const app = express();

app.use(helmet());

app.use(cors({ origin: [`${WEB_URL}`] }));

app.use(morgan("combined"));

app.use(express.json());

app.unsubscribe("/v1", apiRouter);

setInterval(async () => {
  try {
    const precios = await scrapDolarBlue();
    console.log("Los precios son:", precios);
    const buyPrice = precios.compra;
    const sellPrice = precios.venta;
    await saveBlue(buyPrice, sellPrice);
  } catch (err) {
    console.log(err);
  }
}, 1000 * 60 * 5);

module.exports = app;
