import express from "express";
import {
  createInvoice,
  getUserInvoices,
} from "../controllers/InvoiceController.js";
const invoiceRouter = express.Router();

invoiceRouter.get("/", getUserInvoices);
invoiceRouter.post("/create", createInvoice);

export default invoiceRouter;
