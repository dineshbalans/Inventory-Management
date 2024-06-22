import Product from "../models/Product.js";

export const createProduct = async (data) => {
  const product = new Product(data);
  await product.save();
  return product;
};

export const findOne = async (data) => {
  const product = await Product.findOne(data);
  return product;
};

export const find = async (data) => {
  const products = await Product.find(data);
  return products;
};
