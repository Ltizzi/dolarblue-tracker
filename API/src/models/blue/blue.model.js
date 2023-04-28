const blueRepo = require("./blue.mongo");

const DEFAULT_BLUE_ID = 0;

async function getLastBlueId() {
  const lastPrice = await blueRepo.findOne().sort("-blueId");
  if (!lastPrice) {
    return DEFAULT_BLUE_ID;
  }
  return lastPrice.blueId;
}

async function saveBlue(buyPrice, sellPrice) {
  const newBlueId = (await getLastBlueId()) + 1;
  const newBlue = {
    blueId: newBlueId,
    createdAt: Date.now(),
    buyPrice: buyPrice,
    sellPrice: sellPrice,
  };
  return await blueRepo.findOneAndUpdate(
    {
      blueId: newBlue.blueId,
    },
    newBlue,
    { upsert: true }
  );
}

async function getAllPrices(skip, limit) {
  return await blueRepo
    .find({}, { _id: 0, __v: 0 })
    .sort({ blueId: 1 })
    .skip(skip)
    .limit(limit);
}

async function getLastPrices() {
  return await blueRepo.find().sort("-blueId").limit(2);
}

module.exports = {
  saveBlue,
  getAllPrices,
  getLastPrices,
};
