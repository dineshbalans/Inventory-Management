import mongoose from "mongoose";
const { Schema } = mongoose;

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

export default mongoose.model("Product", ProductSchema);
