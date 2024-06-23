import { useState } from "react";
import { updateProductQuantity } from "../../services/api";
import { getToken } from "../../utils/token";

const InventoryRow = ({ inventory, fetchProducts }) => {
  const [updteQnty, setUpdteQnty] = useState(false);
  const [newQuantity, setNewQuantity] = useState("");

  const handleUpdateQuantity = async (productId, newQuantity) => {
    try {
      await updateProductQuantity(getToken(), productId, newQuantity);
      fetchProducts();
    } catch (error) {
      console.error("Failed to update product quantity", error);
    }
  };

  return (
    <tr className="text-sm">
      <td className="border px-2 py-2">{inventory.name}</td>
      <td className="border px-2 py-2">{inventory.description}</td>
      <td className="border px-2 py-2">{inventory.quantity}</td>
      <td className="border px-2 py-2">{inventory.price}</td>
      <td className="border px-2 py-2">
        {updteQnty ? (
          <div className="flex flex-col w-full gap-2">
            <input
              type="text"
              className="border p-2 outline-none"
              placeholder="Quantity"
              value={newQuantity}
              onChange={(e) => setNewQuantity(e.target.value)}
            />
            <button
              className="border w-full p-1 rounded bg-secondary/50 text-white"
              onClick={() => {
                handleUpdateQuantity(inventory._id, +newQuantity);
                setUpdteQnty(false);
                setNewQuantity("");
              }}
            >
              Save
            </button>
            <button
              className="border w-full p-1 rounded bg-secondary/50 text-white"
              onClick={() => setUpdteQnty(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="border w-full p-1 rounded bg-secondary/50 text-white"
            onClick={() => setUpdteQnty(true)}
          >
            Update Quantity
          </button>
        )}
      </td>
    </tr>
  );
};

export default InventoryRow;
