const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  status: { type: String, enum: ["pris", "non pris"], default: "non pris" },
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true }
});

module.exports = mongoose.model("Item", ItemSchema);
