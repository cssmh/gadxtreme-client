import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { getCategoryGadget } from "../Api/gadgets";
import SkeletonHome from "./SkeletonHome";

const Category = () => {
  const { cate } = useParams();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [priceRange, setPriceRange] = useState([0, Infinity]);
  const [sortOrder, setSortOrder] = useState("relevant");

  const { data = [], isLoading } = useQuery({
    queryKey: ["categoriesGadgets", cate, page, limit],
    queryFn: () => getCategoryGadget(cate, page, limit),
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

  const handlePriceRangeChange = (min, max) => {
    setPriceRange([min, max === Infinity ? Infinity : max]); 
    // Ensure max is Infinity if "Unlimited" is checked
    setPage(1); // Reset to page 1 after price range change
  };

  const filteredProducts = data?.result?.filter((product) => {
    const productPrice = product.discountPrice || product.price;
    return (
      productPrice >= priceRange[0] &&
      (priceRange[1] === Infinity || productPrice <= priceRange[1])
    );
  });

  const sortedProducts = filteredProducts?.sort((a, b) => {
    const priceA = a.discountPrice || a.price;
    const priceB = b.discountPrice || b.price;
    if (sortOrder === "lowToHigh") {
      return priceA - priceB;
    } else if (sortOrder === "highToLow") {
      return priceB - priceA;
    }
    return 0;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN").format(price);
  };

  return (
    <div className="max-w-7xl 2xl:max-w-[90%] mx-auto px-4 py-3 md:py-6 mb-5 md:mb-3">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/4 pr-4">
          <div className="mb-4 bg-white rounded-lg shadow p-4">
            <h2 className="text-lg 2xl:text-xl font-semibold mb-2">
              Filter by Price
            </h2>
            <div className="space-y-2 2xl:text-lg">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  onChange={() => handlePriceRangeChange(0, 2000)}
                />
                ৳0 - ৳2,000
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  onChange={() => handlePriceRangeChange(2001, 5000)}
                />
                ৳2,001 - ৳5,000
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  onChange={() => handlePriceRangeChange(5001, 10000)}
                />
                ৳5,001 - ৳10,000
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  onChange={() => handlePriceRangeChange(10001, 100000)}
                />
                Above ৳10,000
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  onChange={() => handlePriceRangeChange(0, Infinity)} // Set max to Infinity for "Unlimited"
                />
                Unlimited (No Max)
              </label>
            </div>
          </div>
          <div className="mb-4 bg-white rounded-lg shadow p-4">
            <h2 className="text-lg 2xl:text-xl font-semibold mb-2">
              Price Range
            </h2>
            <input
              type="range"
              min="0"
              max="300000"
              value={priceRange[0]}
              onChange={(e) =>
                handlePriceRangeChange(
                  Number(e.target.value),
                  priceRange[1] === Infinity ? Infinity : priceRange[1]
                )
              }
              className="w-full"
            />
            <input
              type="range"
              min="0"
              max="300000"
              value={priceRange[1] === Infinity ? 300000 : priceRange[1]}
              onChange={(e) =>
                handlePriceRangeChange(
                  priceRange[0],
                  Number(e.target.value) === 300000
                    ? Infinity
                    : Number(e.target.value)
                )
              }
              className="w-full"
            />
            <div className="flex justify-between">
              <span>Min: ৳{priceRange[0]}</span>
              <span>
                Max:{" "}
                {priceRange[1] === Infinity ? "Unlimited" : `৳${priceRange[1]}`}
              </span>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-3/4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            {/* <div className="mb-2 md:mb-0 flex items-center">
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
            </div> */}
            <div className="mb-2 md:mb-0 flex items-center">
              <label htmlFor="itemsPerPage" className="mr-2 font-medium">
                Show:
              </label>
              <div className="flex space-x-2">
                <div
                  onClick={() => setLimit(3)}
                  className={`cursor-pointer border border-gray-300 rounded px-4 py-1 text-center ${
                    limit === 3
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  3
                </div>
                <div
                  onClick={() => setLimit(6)}
                  className={`cursor-pointer border border-gray-300 rounded px-4 py-1 text-center ${
                    limit === 6
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  6
                </div>
                <div
                  onClick={() => setLimit(12)}
                  className={`cursor-pointer border border-gray-300 rounded px-4 py-1 text-center ${
                    limit === 12
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  12
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <label htmlFor="sortOrder" className="mr-2 font-medium">
                Sort by:
              </label>
              <select
                id="sortOrder"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 2xl:py-2 outline-none"
              >
                <option value="relevant">Relevant</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
            </div>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(limit)].map((_, index) => (
                <SkeletonHome key={index} height={208} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedProducts?.map((product) => (
                <Link
                  key={product._id}
                  to={`/details/${product?.productName
                    .toLowerCase()
                    .replaceAll(/\s+/g, "_")}/${product._id}`}
                  className="flex flex-col"
                >
                  <div className="p-2 bg-white shadow-lg rounded-xl transition duration-300 ease-in-out relative group h-full flex flex-col">
                    {product.discountPrice && product.price && (
                      <div className="absolute top-3 left-3 bg-gadDarkBlue text-white rounded-full px-2 py-3 font-semibold text-xs z-10">
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
                        className="w-full h-64 md:h-44 2xl:h-52 object-cover rounded-md transition-transform duration-500 group-hover:scale-110"
                      />
                      {product?.images[1] && (
                        <img
                          src={product?.images[1]}
                          alt={product.productName}
                          className="absolute inset-0 w-full md:h-52 object-cover rounded-md transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                        />
                      )}
                    </div>
                    <div className="flex flex-col flex-grow">
                      <h3 className="text-sm mt-3 2xl:text-lg">
                        {product.productName}
                      </h3>
                      <p
                        className={`2xl:text-lg ${
                          product.inStock ? "text-green-600" : "text-red-500"
                        } mt-1`}
                      >
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </p>
                      <div className="text-sm 2xl:text-lg mt-2">
                        {product.discountPrice ? (
                          <>
                            <span className="line-through text-gray-500">
                              ৳{formatPrice(product.price)}
                            </span>
                            <span className="ml-2 text-blue-700 font-medium">
                              ৳{formatPrice(product.discountPrice)}
                            </span>
                          </>
                        ) : (
                          <span className="text-blue-700 font-medium">
                            ৳{formatPrice(product.price)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          {data?.result?.length > 0 && sortedProducts.length > 0 && (
            <div className="flex justify-center mt-8 space-x-2">
              <button
                onClick={handlePrevious}
                disabled={page === 1}
                className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Previous
              </button>
              {Array.from({ length: data?.totalPages }, (_, idx) => (
                <button
                  key={idx}
                  onClick={() => setPage(idx + 1)}
                  className={`px-4 py-2 rounded-md border transition-all ${
                    page === idx + 1
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                onClick={handleNext}
                disabled={page === data?.totalPages}
                className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
