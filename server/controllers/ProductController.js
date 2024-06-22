import { createProduct, find, findOne } from "../service/productService.js";
import AppError from "../utils/response-handlers/AppError.js";
import AppSuccess from "../utils/response-handlers/AppSuccess.js";

export const addProduct = async (req, res, next) => {
  const { name, description, quantity, price } = req.body;
  const userId = req.userId;
  try {
    const newProduct = await createProduct({
      userId,
      name,
      description,
      quantity,
      price,
      history: [{ quantity }],
    });
    await newProduct.save();

    return next(new AppSuccess(newProduct, "Product added successfully", 201));
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

export const updateProductQuantity = async (req, res, next) => {
  const { productId, quantity } = req.body;
  const userId = req.userId;
  try {
    const product = await findOne({ _id: productId, userId });
    if (!product) return next(new AppError("Product not found", 404));

    product.quantity = quantity;
    product.history.push({ quantity });
    await product.save();

    return next(
      new AppSuccess(product, "Product quantity updated successfully", 200)
    );
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

export const getUserProducts = async (req, res, next) => {
  const userId = req.userId;
  try {
    const products = await find({ userId });
    return next(new AppSuccess(products, "Products fetched successfully", 200));
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
