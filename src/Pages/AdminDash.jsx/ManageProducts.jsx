const ManageProducts = () => {
  // Sample product data
  const products = [
    {
      id: 1,
      productName: "Bluetooth Headphones",
      price: 1500,
      discountPrice: 1200,
      inStock: true,
      category: "Headphones",
    },
    {
      id: 2,
      productName: "Smartwatch",
      price: 3000,
      discountPrice: 2500,
      inStock: true,
      category: "Smartwatch",
    },
    {
      id: 3,
      productName: "Powerbank",
      price: 800,
      discountPrice: null,
      inStock: false,
      category: "Powerbank",
    },
    // Add more products as needed
  ];

  // Handle edit action
  const handleEdit = (id) => {
    console.log(`Editing product with id: ${id}`);
    // You can implement the edit functionality here (e.g., navigate to edit page)
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Manage Products</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="py-2 px-4 border-b text-center">Product Name</th>
            <th className="py-2 px-4 border-b text-center">Price (৳)</th>
            <th className="py-2 px-4 border-b text-center">
              Discount Price (৳)
            </th>
            <th className="py-2 px-4 border-b text-center">In Stock</th>
            <th className="py-2 px-4 border-b text-center">Category</th>
            <th className="py-2 px-4 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b text-center">
                {product.productName}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {product.price}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {product.discountPrice !== null ? product.discountPrice : "N/A"}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {product.inStock ? "Yes" : "No"}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {product.category}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={() => handleEdit(product.id)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;
