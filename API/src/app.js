const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const apiRouter = require("./routes/api.router");

require("dotenv").config();

const WEB_URL = "http://localhost:5173";

const app = express();

app.use(helmet());

app.use(cors({ origin: [`${WEB_URL}`] }));

app.use(morgan("combined"));

app.use(express.json());

app.unsubscribe("/v1", apiRouter);

module.exports = app;
