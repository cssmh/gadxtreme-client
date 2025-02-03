import { useQuery } from "@tanstack/react-query";
import { getNewArrival } from "../Api/gadgets";
import { Link } from "react-router-dom";

const NewArrivals = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["newArrival"],
    queryFn: async () => await getNewArrival(),
  });

  const getSkeletonCount = () => {
    if (window.innerWidth < 700) return 2;
    if (window.innerWidth >= 768 && window.innerWidth < 1024) return 3;
    return 6;
  };

  const skeletonCount = getSkeletonCount();

  if (isLoading)
    return (
      <div className="max-w-7xl 2xl:max-w-[90%] lg:mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mt-10 mb-2 gap-5 mx-3">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md animate-pulse"
          >
            <div className="skeleton h-40 w-full bg-gray-300 rounded-t-lg"></div>
            <div className="p-3 space-y-3">
              <div className="skeleton h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="skeleton h-4 bg-gray-200 rounded w-full"></div>
              <div className="skeleton h-4 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    );

  return (
    <div className="max-w-7xl 2xl:max-w-[90%] mx-auto px-3 lg:px-0 py-3 md:py-6 bg-gray-50">
      <h2 className="text-xl lg:text-2xl font-bold mb-6 text-center">
        <span className="text-[#00a9e1]">New</span> Arrivals
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        {data?.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <Link
              to={`/details/${product?.productName
                .toLowerCase()
                .replaceAll(/\s+/g, "_")}/${product._id}`}
            >
              <div className="relative h-40 w-full">
                <img
                  src={product.images[0]}
                  alt={product.productName}
                  className="h-full w-full object-cover rounded-t-lg"
                />
                {!product.inStock && (
                  <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center text-white text-sm font-semibold">
                    Out of Stock
                  </div>
                )}
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                  {product.productName}
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-gray-500 line-through text-xs">
                    ৳{product.price}
                  </span>
                  <span className="text-green-600 font-semibold text-sm">
                    ৳{product.discountPrice}
                  </span>
                </div>
                {product.inStock ? (
                  <span className="mt-2 inline-block px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                    In Stock
                  </span>
                ) : (
                  <span className="mt-2 inline-block px-2 py-1 text-xs font-semibold text-red-800 bg-red-200 rounded-full">
                    Out of Stock
                  </span>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;
