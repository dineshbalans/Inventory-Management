import { create, find } from "../service/invoiceService.js";
import { findOne } from "../service/productService.js";
import LinkedList from "../utils/LinkedList.js";
import Queue from "../utils/Queue.js";
import AppError from "../utils/response-handlers/AppError.js";
import AppSuccess from "../utils/response-handlers/AppSuccess.js";

const invoiceQueue = new Queue();

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

      const history = new LinkedList();
      product.history.forEach((entry) => history.add(entry));
      history.add({ quantity: product.quantity, date: new Date() });
      product.history = history.toArray();

      await product.save();
    }

    const newInvoice = await create({ userId, products, totalCost });
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
