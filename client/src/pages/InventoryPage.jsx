import React, { useState, useEffect, useReducer } from "react";
import {
  addProduct,
  getUserProducts,
  updateProductQuantity,
} from "../services/api";
import ProtectedRoute from "../components/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../utils/token";
import { productActions } from "../store/productSlice";
import Input, { LabelText } from "../components/Input";
import InventoryTable from "../components/Inventory/InventoryTable";

const initialArg = {
  name: { value: "", error: "" },
  description: { value: "", error: "" },
  quantity: { value: "", error: "" },
  price: { value: "", error: "" },
};

const reducer = (prevState, action) => {
  // Name
  if (action.type === "nameVal" || action.type === "nameErr") {
    return action.type === "nameVal"
      ? {
          ...prevState,
          name: { ...prevState.name, value: action.payload },
        }
      : {
          ...prevState,
          name: { ...prevState.name, error: action.payload },
        };
  }

  // Description
  if (action.type === "descriptionVal" || action.type === "descriptionErr") {
    return action.type === "descriptionVal"
      ? {
          ...prevState,
          description: { ...prevState.description, value: action.payload },
        }
      : {
          ...prevState,
          description: { ...prevState.description, error: action.payload },
        };
  }

  // Quantity
  if (action.type === "quantityVal" || action.type === "quantityErr") {
    return action.type === "quantityVal"
      ? {
          ...prevState,
          quantity: { ...prevState.quantity, value: action.payload },
        }
      : {
          ...prevState,
          quantity: { ...prevState.quantity, error: action.payload },
        };
  }
  // Price
  if (action.type === "priceVal" || action.type === "priceErr") {
    return action.type === "priceVal"
      ? {
          ...prevState,
          price: { ...prevState.price, value: action.payload },
        }
      : {
          ...prevState,
          price: { ...prevState.price, error: action.payload },
        };
  }
  if (action.type === "reset") {
    return initialArg;
  }
  return prevState;
};

const InventoryPage = () => {
  const dispatch = useDispatch();

  const [inventory, rdcrDipchsFn] = useReducer(reducer, initialArg);

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
      await addProduct(getToken(), {
        name: inventory.name.value,
        description: inventory.description.value,
        quantity: +inventory.quantity.value,
        price: +inventory.price.value,
      });
      fetchProducts();
    } catch (error) {
      console.error("Failed to add product", error);
    }
  };

  console.log(inventory);

  return (
    <ProtectedRoute className="flex flex-col justify-center items-center gap-2 p-5">
      <form onSubmit={handleAddProduct} className="border w-1/2 p-4 space-y-5">
        <div>
          <LabelText text="Name" htmlFor="name" />
          <Input
            id="name"
            type="text"
            placeholder="Name"
            value={inventory.name.value}
            dispatch={rdcrDipchsFn}
          />
        </div>
        <div>
          <LabelText text="Description" htmlFor="description" />
          <Input
            id="description"
            type="text"
            placeholder="Description"
            value={inventory.description.value}
            dispatch={rdcrDipchsFn}
          />
        </div>
        <div>
          <LabelText text="Quantity" htmlFor="quantity" />
          <Input
            id="quantity"
            type="text"
            placeholder="Quantity"
            value={inventory.quantity.value}
            dispatch={rdcrDipchsFn}
          />
        </div>
        <div>
          <LabelText text="Price" htmlFor="price" />
          <Input
            id="price"
            type="text"
            placeholder="Price"
            value={inventory.price.value}
            dispatch={rdcrDipchsFn}
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white w-full p-2 rounded"
        >
          Add Product
        </button>
      </form>
      <InventoryTable fetchProducts={fetchProducts} />
    </ProtectedRoute>
  );
};

export default InventoryPage;
