import Invoice from "../models/Invoice.js";

export const create = async (data) => {
  const invoice = new Invoice(data);
  await invoice.save();
  return invoice;
};

export const find = async (data) => {
  const invoices = await Invoice.find(data);
  return invoices;
};
