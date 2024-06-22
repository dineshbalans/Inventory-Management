import mongoose from "mongoose";
const { Schema } = mongoose;


const InvoiceSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  totalCost: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Invoice", InvoiceSchema);
