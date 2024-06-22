import React, { useState, useEffect } from "react";
import { getUserInvoices } from "../services/api";

const InvoicesPage = ({ token }) => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const { data } = await getUserInvoices(token);
      setInvoices(data);
    } catch (error) {
      console.error("Failed to fetch invoices", error);
    }
  };

  return (
    <div>
      <h1>Your Invoices</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Total Cost</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice._id}>
              <td>{new Date(invoice.date).toLocaleDateString()}</td>
              <td>${invoice.totalCost}</td>
              <td>
                {invoice.products.map((product, index) => (
                  <div key={index}>
                    <span>Product ID: {product.productId}</span>
                    <span>Quantity: {product.quantity}</span>
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoicesPage;
