import express from "express";
import {
  addProduct,
  getUserProducts,
  updateProductQuantity,
} from "../controllers/ProductController.js";
const productRouter = express.Router();

productRouter.post("/get", addProduct);
productRouter.put("/update", updateProductQuantity);
productRouter.get("/getAll", getUserProducts);

export default productRouter;
