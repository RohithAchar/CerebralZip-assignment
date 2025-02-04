import { useEffect, useState } from "react";
import { Product } from "../utils/types";
import { getProductsData } from "../utils/api";

function ProductsTable() {
  const [products, setProducts] = useState<Product[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProductsData();
        console.log(response);
        setProducts(response);
      } catch (error) {
        console.error("Error fetching products data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!products) {
    return <div>Loading...</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white w-full">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Top Products</h2>
          <button className="text-gray-500 text-sm hover:text-gray-700 rounded-full border border-black/10 px-3 py-2 bg-white">
            Full results
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500">
                <th className="pb-4 font-medium">Product</th>
                <th className="pb-4 font-medium">Sold amount</th>
                <th className="pb-4 font-medium">Unit price</th>
                <th className="pb-4 font-medium">Revenue</th>
                <th className="pb-4 font-medium">Rating</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-gray-100">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <span className="text-sm font-medium text-gray-900">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="text-sm text-gray-700">
                      {product.soldAmount}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className="text-sm text-gray-700">
                      ${product.unitPrice}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className="text-sm text-gray-700">
                      ${product.revenue.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium text-gray-700">
                        {product.rating.toFixed(2)}
                      </span>
                      <svg
                        className="w-4 h-4 text-yellow-400 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductsTable;
