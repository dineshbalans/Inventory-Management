import { create, find } from "../service/invoiceService.js";
import { findOne } from "../service/productService.js";
import AppError from "../utils/response-handlers/AppError.js";
import AppSuccess from "../utils/response-handlers/AppSuccess.js";

export const createInvoice = async (req, res, next) => {
  const { products } = req.body; // Array of { productId, quantity }
  const userId = req.userId;
  try {
    let totalCost = 0;
    for (let { productId, quantity } of products) {
      const product = await findOne({ _id: productId, userId });

      if (!product || product.quantity < quantity) {
        return next(
          new AppError("Invalid product or insufficient quantity", 400)
        );
      }

      totalCost += product.price * quantity;
      product.quantity -= quantity;
      product.history.push({ quantity: product.quantity });
      await product.save();
    }

    const newInvoice = create({ userId, products, totalCost });
    await newInvoice.save();
    return next(
      new AppSuccess(newInvoice, "Invoice created successfully", 201)
    );
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

export const getUserInvoices = async (req, res, next) => {
  const userId = req.userId;
  try {
    const invoices = await find({ userId });
    return next(new AppSuccess(invoices, "Invoices fetched successfully", 200));
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
