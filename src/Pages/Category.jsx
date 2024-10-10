import { useState, useEffect } from "react";

const Category = () => {
  // Sample product data
  const initialProducts = [
    {
      id: 1,
      name: "Wireless Earbuds",
      image: "https://i.ibb.co/RTs9FXm/buds-t100-01-500x500.webp",
      originalPrice: 4500.0,
      discountPrice: 3650.0,
      discountPercent: 20,
    },
    {
      id: 2,
      name: "Earbuds Pro",
      image: "https://i.ibb.co/z28ZZf0/2878-41130.jpg",
      originalPrice: 5000.0,
      discountPrice: 4000.0,
      discountPercent: 20,
    },
    {
      id: 3,
      name: "Asus Vivobook A125 Laptop",
      image:
        "https://i.ibb.co/4FHQWpk/macbook-air-m1-chip-silver-3-500x500.jpg",
      originalPrice: 90000.0,
      discountPrice: 85000.0,
      discountPercent: 6,
    },
    // Add more products as needed
  ];

  const [products] = useState(initialProducts);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [sortOrder, setSortOrder] = useState("lowToHigh");
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);

  // Sorting products based on the selected sort order
  useEffect(() => {
    let sortedProducts = [...products];

    if (sortOrder === "lowToHigh") {
      sortedProducts.sort((a, b) => a.discountPrice - b.discountPrice);
    } else if (sortOrder === "highToLow") {
      sortedProducts.sort((a, b) => b.discountPrice - a.discountPrice);
    }

    setFilteredProducts(sortedProducts);
  }, [sortOrder, products]);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-1/4 hidden md:block pr-4">
          {/* Filter by Price */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Filter by Price</h2>
            {/* Price filter options */}
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                ৳0 - ৳5,000
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                ৳5,001 - ৳10,000
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                ৳10,001 - ৳50,000
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Above ৳50,000
              </label>
            </div>
          </div>
          {/* Additional filters can be added here */}
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4">
          {/* Top Bar with items per page and sort options */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="mb-2 md:mb-0 flex items-center">
              <label htmlFor="itemsPerPage" className="mr-2 font-medium">
                Show:
              </label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1"
              >
                <option value={3}>3</option>
                <option value={6}>6</option>
                <option value={12}>12</option>
              </select>
            </div>
            <div className="flex items-center">
              <label htmlFor="sortOrder" className="mr-2 font-medium">
                Sort by:
              </label>
              <select
                id="sortOrder"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1"
              >
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.slice(0, itemsPerPage).map((product) => (
              <div
                key={product.id}
                className="border border-gray-200 rounded p-4 relative"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded"
                  />
                  {product.discountPercent > 0 && (
                    <span className="absolute top-[-2px] bg-red-500 text-white text-xs px-2 py-1 rounded">
                      -{product.discountPercent}%
                    </span>
                  )}
                </div>
                <h3 className="mt-2 font-semibold text-lg">{product.name}</h3>
                <div className="mt-1">
                  <span className="text-gray-500 line-through mr-2">
                    ৳{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-green-600 font-semibold">
                    ৳{product.discountPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination or Load More functionality can be added here */}
        </div>
      </div>
    </div>
  );
};

export default Category;
