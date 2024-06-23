import React, { useState, useEffect } from "react";
import { getUserInvoices } from "../services/api";
import { getToken } from "../utils/token";
import ProtectedRoute from "../components/ProtectedRoute";

const InvoicesPage = ({ token }) => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const { data: res } = await getUserInvoices(getToken());
      console.log(res.data);
      setInvoices(res.data);
    } catch (error) {
      console.error("Failed to fetch invoices", error);
    }
  };

  return (
    <ProtectedRoute className="flex flex-col justify-center items-center gap-10 p-5">
      <h1 className="title">Your Invoices</h1>
      <table className="table-auto text-sm border w-1/2">
        <thead>
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Total Cost</th>
            <th className="px-4 py-2">Products</th>
          </tr>
        </thead>

        <tbody className="text-center">
          {invoices.map((invoice) => (
            <tr key={invoice._id}>
              <td className="border px-2 py-2">
                {new Date(invoice.date).toLocaleDateString()}
              </td>
              <td className="border px-2 py-2">${invoice.totalCost}</td>
              <td className="border px-2 py-2 space-y-2 divide-y">
                {invoice.products.map((product, index) => (
                  <div key={index} className="flex flex-col p-1">
                    <span>Product ID: {product.productId}</span>
                    <span>Quantity: {product.quantity}</span>
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ProtectedRoute>
  );
};

export default InvoicesPage;
