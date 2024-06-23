import { useSelector } from "react-redux";
import InventoryRow from "./InventoryRow";

const InventoryTable = ({ fetchProducts }) => {
  const { products: inventory } = useSelector((state) => state.product);

  return (
    <table className="table-auto text-sm border w-1/2">
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
  );
};

export default InventoryTable;
