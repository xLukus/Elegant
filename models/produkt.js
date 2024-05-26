const mongoose = require("mongoose");
const produktSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: { type: String, required: true },
  val: {
    type: Number,
    min: 1,
  },
  image: { type: String, required: true },
  measurments: mongoose.Schema.Types.Mixed,
  category: {
    type: String,
    enum: [
      "Living Room",
      "Bedroom",
      "Kitchen",
      "Bathroom",
      "Dining",
      "Outdoor",
    ],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});
module.exports = mongoose.model("Produkt", produktSchema);
