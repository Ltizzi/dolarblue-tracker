const mongoose = require("mongoose");

const dolarBlueSchema = new mongoose.Schema({
  blueId: {
    type: Number,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  buyPrice: {
    type: Number,
    required: true,
  },
  sellPrice: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("DolarBLue", dolarBlueSchema);
