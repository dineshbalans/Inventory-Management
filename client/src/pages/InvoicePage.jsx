import React, { useState, useEffect } from "react";
import { createInvoice, getUserProducts } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../store/productSlice";
import { getToken } from "../utils/token";
import ProtectedRoute from "../components/ProtectedRoute";
import InvoiceRow from "../components/InvoiceRow";
import { useNavigate } from "react-router-dom";

const InvoicePage = ({ token }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const { products } = useSelector((state) => state.product);
  console.log(selectedProducts);

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, []);

  useEffect(() => {
    calculateTotalCost();
  }, [selectedProducts]);

  const fetchProducts = async () => {
    try {
      const { data: res } = await getUserProducts(getToken());
      if (res.statusCode === 200 || res.statusCode === 201) {
        dispatch(productActions.setProducts(res.data));
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const handleSelectProduct = (productId, quantity) => {
    const product = products.find((p) => p._id === productId);

    const existingProductIndex = selectedProducts.findIndex(
      (p) => p.productId === product._id
    );

    if (existingProductIndex !== -1) {
      const existingProduct = selectedProducts[existingProductIndex];
      existingProduct.quantity = quantity;

      const filteredProducts = selectedProducts.filter(
        (p) => p.productId !== product._id
      );
      setSelectedProducts([...filteredProducts, existingProduct]);

      return;
    }

    setSelectedProducts((prevState) => [
      ...prevState,
      { productId, quantity, price: product.price },
    ]);
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
      await createInvoice(getToken(), selectedProducts);
      setSelectedProducts([]);
      setTotalCost(0);
      fetchProducts();
      navigate("/invoices");
    } catch (error) {
      console.error("Failed to create invoice", error);
    }
  };

  return (
    <ProtectedRoute className="flex flex-col items-center justify-center gap-6 p-5">
      <h1 className="title">Create Invoice</h1>
      <table className="table-auto text-sm border w-1/2">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((inventory) => (
            <InvoiceRow
              key={inventory._id}
              inventory={inventory}
              handleSelectProduct={handleSelectProduct}
            />
          ))}
        </tbody>
      </table>

      <h2>Total Cost: ${totalCost}</h2>
      <button
        onClick={handleCreateInvoice}
        className="bg-primary p-2 outline-none text-white w-1/5 rounded"
      >
        Finalize Invoice
      </button>
    </ProtectedRoute>
  );
};

export default InvoicePage;
