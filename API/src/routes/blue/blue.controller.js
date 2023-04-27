const { getAllPrices, getLastPrices } = require("../../models/blue/blue.model");
const { getPagination } = require("../../services/query");

async function httpGetAllPrices(req, res) {
  try {
    const { skip, limit } = getPagination(req.query);
    const response = await getAllPrices(skip, limit);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

async function httpGetLastPrices(req, res) {
  try {
    const response = await getLastPrices();
    return res.status(200).json(response);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

module.exports = {
  httpGetAllPrices,
  httpGetLastPrices,
};
