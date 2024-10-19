import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { getCategoryGadget } from "../Api/gadgets";
import { useEffect, useState } from "react";
import SmallLoader from "../Component/SmallLoader";

const Category = () => {
  const { cate } = useParams();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const { data = [], isLoading } = useQuery({
    queryKey: ["categoriesGadgets", cate, page, limit],
    queryFn: async () => await getCategoryGadget(cate, page, limit),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const calculateDiscount = (price, discountPrice) => {
    const discount = ((price - discountPrice) / price) * 100;
    return Math.round(discount);
  };

  const handlePrevious = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < data?.totalPages) setPage((prev) => prev + 1);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-1/4 hidden md:block pr-4">
          {/* Filter by Price */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Filter by Price</h2>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                ৳0 - ৳2,000
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                ৳2,001 - ৳5,000
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                ৳4,001 - ৳10,000
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Above ৳10,000
              </label>
            </div>
          </div>
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
                value={limit}
                onChange={(e) => setLimit(parseInt(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1 outline-none"
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
                // value={sortOrder}
                // onChange={(e) => setSortOrder(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 outline-none"
              >
                <option value="lowToHigh">Relevant</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product Cards */}
          {isLoading ? (
            <SmallLoader size="60" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data?.result?.map((product) => (
                <Link key={product._id} to={`/details/${product._id}`}>
                  <div className="p-4 bg-white shadow-lg rounded-lg transition duration-300 ease-in-out relative group">
                    {product.discountPrice && product.price && (
                      <div className="absolute top-2 left-2 bg-blue-500 text-white rounded-full px-2 py-1 text-xs z-10">
                        -
                        {calculateDiscount(
                          product.price,
                          product.discountPrice
                        )}
                        %
                      </div>
                    )}
                    <div className="relative overflow-hidden">
                      <img
                        src={product?.images[0]}
                        alt={product.productName}
                        className="w-full md:h-52 object-cover rounded-md transition-transform duration-500 group-hover:scale-110"
                      />
                      <img
                        src={product?.images[1]}
                        alt={product.productName}
                        className="absolute inset-0 w-full md:h-52 object-cover rounded-md transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                      />
                    </div>
                    <h3 className="text-sm mt-3">{product.productName}</h3>
                    <p className="text-green-600">
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </p>
                    <div className="text-sm mt-2">
                      {product.discountPrice ? (
                        <>
                          <span className="line-through text-gray-500">
                            ৳{product.price}
                          </span>
                          <span className="ml-2 text-blue-700 font-medium">
                            ৳{product.discountPrice}
                          </span>
                        </>
                      ) : (
                        <span className="text-blue-700 font-medium">
                          ৳{product.price}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          {data?.result?.length > 0 && (
            <div className="flex justify-center mt-4">
              <button
                onClick={handlePrevious}
                disabled={page === 1}
                className="px-3 py-2 rounded-l bg-blue-500 text-white disabled:bg-gray-300"
              >
                Previous
              </button>
              {Array.from({ length: data?.totalPages || 1 }, (_, idx) => (
                <button
                  key={idx + 1}
                  onClick={() => setPage(idx + 1)}
                  className={`px-3 py-2 mx-1 ${
                    page === idx + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                onClick={handleNext}
                disabled={page === data?.totalPages}
                className="px-3 py-2 rounded-r bg-blue-500 text-white disabled:bg-gray-300"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
