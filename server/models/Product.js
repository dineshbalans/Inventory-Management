const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  description: String,
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  history: [
    {
      quantity: Number,
      date: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Product", ProductSchema);
