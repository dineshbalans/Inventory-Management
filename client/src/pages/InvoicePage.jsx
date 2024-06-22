import React, { useState, useEffect } from "react";
import { createInvoice, getUserProducts } from "../services/api";

const InvoicePage = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    calculateTotalCost();
  }, [selectedProducts]);

  const fetchProducts = async () => {
    try {
      const { data } = await getUserProducts(token);
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const handleSelectProduct = (productId, quantity) => {
    const product = products.find((p) => p._id === productId);
    if (product) {
      setSelectedProducts([
        ...selectedProducts,
        { productId, quantity, price: product.price },
      ]);
    }
  };

  const calculateTotalCost = () => {
    const total = selectedProducts.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalCost(total);
  };

  const handleCreateInvoice = async () => {
    try {
      await createInvoice(token, selectedProducts);
      setSelectedProducts([]);
      setTotalCost(0);
    } catch (error) {
      console.error("Failed to create invoice", error);
    }
  };

  return (
    <div>
      <h1>Create Invoice</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>
                <input
                  type="number"
                  onChange={(e) =>
                    handleSelectProduct(product._id, e.target.value)
                  }
                  placeholder="Quantity"
                />
              </td>
              <td>{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Total Cost: ${totalCost}</h2>
      <button onClick={handleCreateInvoice}>Finalize Invoice</button>
    </div>
  );
};

export default InvoicePage;
