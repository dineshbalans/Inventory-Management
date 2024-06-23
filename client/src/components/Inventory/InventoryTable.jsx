import { useSelector } from "react-redux";
import InventoryRow from "./InventoryRow";

const InventoryTable = ({ fetchProducts }) => {
  const { products: inventory } = useSelector((state) => state.product);

  return (
    <div className="w-1/2">
      <h1 className="text-lg mb-1 px-2">List of Products : </h1>
      <table className="table-auto text-sm border w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Price</th>

            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {inventory?.map((inventory) => (
            <InventoryRow
              key={inventory._id}
              inventory={inventory}
              fetchProducts={fetchProducts}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
