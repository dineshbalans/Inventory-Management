import { useState } from "react";
import { updateProductQuantity } from "../services/api";
import { getToken } from "../utils/token";

const InvoiceRow = ({ inventory, handleSelectProduct }) => {
  const [addQnty, setAddQnty] = useState(false);
  const [newQuantity, setNewQuantity] = useState(0);

  const saveHandler = () => {
    setAddQnty(false);
    handleSelectProduct(inventory._id, +newQuantity);
  };

  return (
    <tr className="text-sm">
      <td className="border px-2 py-2">{inventory.name}</td>
      <td className="border px-2 py-2">{inventory.price}</td>
      <td className="border px-2 py-2">
        {addQnty ? (
          <input
            type="text"
            className="border p-2 outline-none w-full"
            placeholder="Quantity"
            value={newQuantity}
            onChange={(e) => setNewQuantity(e.target.value)}
          />
        ) : (
          <h1 className="w-fit ">{newQuantity}</h1>
        )}
      </td>
      <td className="border px-2 py-2">
        <button
          className="border w-full p-1 rounded bg-secondary/50 text-white"
          onClick={() => (addQnty ? saveHandler() : setAddQnty(true))}
        >
          {addQnty ? "Save" : "Add"}
        </button>
        {addQnty && (
          <button
            className="border w-full p-1 rounded bg-secondary/50 text-white mt-1"
            onClick={() => setAddQnty(false)}
          >
            Cancel
          </button>
        )}
      </td>
    </tr>
  );
};

export default InvoiceRow;
// {addQnty ? (
//   <div className="flex flex-col w-full gap-2">
//     <input
//       type="text"
//       className="border p-2 outline-none"
//       placeholder="Quantity"
//       value={newQuantity}
//       onChange={(e) => setNewQuantity(e.target.value)}
//     />
//     <button
//       className="border w-full p-1 rounded bg-secondary/50 text-white"
//       onClick={() => {
//         handleUpdateQuantity(inventory._id, +newQuantity);
//         setUpdteQnty(false);
//         setNewQuantity("");
//       }}
//     >
//       Save
//     </button>
//   </div>
// ) : (

// )}
