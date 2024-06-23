import React, { useState, useEffect } from "react";
import {
  addProduct,
  getUserProducts,
  updateProductQuantity,
} from "../services/api";
import ProtectedRoute from "../components/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../utils/token";
import { productActions } from "../store/productSlice";

const InventoryPage = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await addProduct(getToken(), { name, description, quantity, price });
      fetchProducts();
    } catch (error) {
      console.error("Failed to add product", error);
    }
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    try {
      await updateProductQuantity(getToken(), productId, newQuantity);
      fetchProducts();
    } catch (error) {
      console.error("Failed to update product quantity", error);
    }
  };

  console.log(products);

  return (
    <ProtectedRoute>
      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
          required
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required
        />
        <button type="submit">Add Product</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
              <td>
                <input
                  type="number"
                  onChange={(e) =>
                    handleUpdateQuantity(product._id, e.target.value)
                  }
                  placeholder="Update Quantity"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ProtectedRoute>
  );
};

export default InventoryPage;
