import express from "express";
import {
  addProduct,
  getUserProducts,
  updateProductQuantity,
} from "../controllers/ProductController.js";
import auth from "../middleware/auth.js";
const productRouter = express.Router();

productRouter.post("/create", addProduct);
productRouter.put("/update", updateProductQuantity);
productRouter.get("/getAll", getUserProducts);

export default productRouter;
